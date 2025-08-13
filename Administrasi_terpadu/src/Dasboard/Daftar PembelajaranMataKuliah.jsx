import React, { useEffect, useState, useRef } from "react";
import { Container, Card, Button, Row, Col, Form, InputGroup, Modal, Table } from "react-bootstrap";
import { FiPlus, FiSearch, FiTrash2, FiEye, FiBookOpen, FiFile, FiEdit2, FiUser, FiCalendar, FiFileText, FiDownload, FiBook, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useReactToPrint } from 'react-to-print';
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import '../Dist/admin.css'

const DaftarPembelajaranMataKuliah = () => {
    const navigate = useNavigate();
    const [pembelajaranmatakuliahList, setPembelajaranMataKuliahList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [userRole, setUserRole] = useState("");
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedSemester, setSelectedSemester] = useState("Semua");
    const [bahanAjarList, setBahanAjarList] = useState([]);
    const printRef = useRef();
    const itemsPerPage = 6;


    useEffect(() => {
        fetchPembelajaranMataKuliah();
    }, []);

    const fetchPembelajaranMataKuliah = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:5000/pembelajaran_mata_kuliah/all", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPembelajaranMataKuliahList(response.data);
            const decoded = jwtDecode(token);
            setUserRole(decoded.role);
        } catch (error) {
            console.error("Gagal mengambil data", error);
        }
    };

    const fetchBahanAjar = async (pembelajaranId) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`http://localhost:5000/bahan_ajar`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const filtered = res.data.filter((bahan) => bahan.pembelajaran_id === pembelajaranId);
            filtered.sort((a, b) => a.pertemuan - b.pertemuan);
            setBahanAjarList(filtered);
        } catch (err) {
            console.error("Gagal fetch bahan ajar:", err);
            setBahanAjarList([]);
        }
    };


    const deleteData = async (id) => {
        const result = await Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Data yang dihapus tidak bisa dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal",
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:5000/pembelajaran_mata_kuliah/${id}`);
                fetchPembelajaranMataKuliah();

                Swal.fire({
                    icon: "success",
                    title: "Berhasil!",
                    text: "Data berhasil dihapus.",
                    timer: 2000,
                    showConfirmButton: false,
                });
            } catch (error) {
                console.error("Error deleting:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops!",
                    text: "Terjadi kesalahan saat menghapus data.",
                });
            }
        }
    };

    const handleDownload = (filename) => {
        if (!filename) return;
        window.open(`http://localhost:5000/uploads/pembelajaran_mata_kuliah/${filename}`, "_blank");
    };

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: "Pembelajaran_Mata_Kuliah",
        onBeforeGetContent: () => new Promise((resolve) => setTimeout(resolve, 100)),
    });

    const exportToExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("pembelajaran_mata_kuliah");

        worksheet.addRow([
            "No",
            "Nama Dosen",
            "Mata Kuliah",
            "Semester",
            "Kontrak Kuliah",
            "RPS",
        ]);

        pembelajaranmatakuliahList.forEach((item, index) => {
            const row = worksheet.addRow([
                index + 1,
                item.nama_dosen,
                item.mata_kuliah,
                item.semester,
                "",
                "",
            ]);

            const kontrakUrl = `http://localhost:5000/uploads/pembelajaran_mata_kuliah/${item.file_kontrak_kuliah}`;
            row.getCell(5).value = { text: "Lihat PDF", hyperlink: kontrakUrl };
            row.getCell(5).font = { color: { argb: "FF0000FF" }, underline: true };

            const rpsUrl = `http://localhost:5000/uploads/pembelajaran_mata_kuliah/${item.file_rps_pembelajaran}`;
            row.getCell(6).value = { text: "Lihat PDF", hyperlink: rpsUrl };
            row.getCell(6).font = { color: { argb: "FF0000FF" }, underline: true };
        });

        worksheet.columns = [
            { width: 5 },
            { width: 25 },
            { width: 25 },
            { width: 12 },
            { width: 20 },
            { width: 20 },
        ];

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, "pembelajaran_mata_kuliah.xlsx");
    };
    
    const semesterList = [...new Set(pembelajaranmatakuliahList.map(item => item.semester))];

    const filtered = pembelajaranmatakuliahList.filter(item => {
        const matchSearch = item.mata_kuliah.toLowerCase().includes(searchTerm.toLowerCase());
        const matchSemester = selectedSemester === "Semua" || item.semester === selectedSemester;
        return matchSearch && matchSemester;
    });


    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


    const handleShowDetail = async (item) => {
        setSelectedItem(item);
        await fetchBahanAjar(item.id);
        setShowDetailModal(true);
    };


    const handleCloseDetailModal = () => {
        setShowDetailModal(false);
        setSelectedItem(null);
        setBahanAjarList([]);
    };

    return (
        <Container fluid className="p-4">
            <Row className="align-items-center p-4">
                <Col>
                    <h2 className="mb-1 fw-bold text-white">Pembelajaran Mata Kuliah</h2>
                    <p className="text-muted mb-0">Daftar Pembelajaran Mata Kuliah Sistem Informasi</p>
                </Col>
            </Row>

            <Card className="shadow border-0">
                <div className="d-flex gap-2 py-2 border-bottom">
                    <Button
                        variant="link"
                        onClick={() => navigate("/admin/dashboard/daftarpembelajaranmatakuliah")}
                        className="fs-5 text-decoration-none"
                    >
                        Daftar Pembelajaran MK
                    </Button>
                    <Button
                        variant="link"
                        onClick={() => navigate("/admin/dashboard/PembelajaranMataKuliah")}
                        className="fs-5 text-decoration-none"
                    >
                        Pembelajaran MK Anda
                    </Button>
                </div>


                <Card.Header className="bg-white py-2 border-bottom">
                    <div className="d-flex align-items-center flex-wrap gap-3">
                        <Button variant="danger" size="sm" onClick={handlePrint}>
                            Cetak Laporan PDF
                        </Button>
                        <Button variant="secondary" size="sm" onClick={exportToExcel} className="ms-2">
                            Ekspor ke Excel
                        </Button>
                        <div className="ms-auto col-12 col-md-6 col-lg-6">
                            <Row className="g-2">
                                <Col xs={12} md={6}>
                                    <InputGroup>
                                        <InputGroup.Text className="bg-light border-end-0">
                                            <FiSearch size={16} />
                                        </InputGroup.Text>
                                        <Form.Control
                                            placeholder="Cari Mata Kuliah..."
                                            className="border-start-0 bg-light"
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </InputGroup>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Select
                                        value={selectedSemester}
                                        onChange={(e) => setSelectedSemester(e.target.value)}
                                    >
                                        <option value="Semua">Semua Semester</option>
                                        {semesterList.map((semester, index) => (
                                            <option key={index} value={semester}>{semester}</option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Card.Header>


                <div ref={printRef} className="d-none d-print-block">
                    <h4 className="text-center">Laporan Pembelajaran Mata Kuliah</h4>
                    <Table striped bordered size="sm" className="mt-3">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Dosen</th>
                                <th>Mata Kuliah</th>
                                <th>Semester</th>
                                <th>Kontrak Kuliah</th>
                                <th>RPS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.nama_dosen}</td>
                                    <td>{item.mata_kuliah}</td>
                                    <td>{item.semester}</td>
                                    <td>
                                        <a href={`http://localhost:5000/uploads/pembelajaran_mata_kuliah/${item.file_kontrak_kuliah}`}
                                            target="_blank"
                                            rel="noreferrer">
                                            Lihat PDF
                                        </a>
                                    </td>
                                    <td>
                                        <a href={`http://localhost:5000/uploads/pembelajaran_mata_kuliah/${item.file_rps_pembelajaran}`}
                                            target="_blank"
                                            rel="noreferrer">
                                            Lihat PDF
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

                <Card.Body>
                    <Row>
                        {paginated.map((item, index) => (
                            <Col lg={4} md={6} key={item.id} className="mb-4">
                                <Card className="h-100 shadow border-0 course-card small"
                                    style={{
                                        transition: 'all 0.3s ease',
                                        borderRadius: '12px'
                                    }}>
                                    <Card.Header
                                        className="border-0 text-white position-relative overflow-hidden"
                                        style={{
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            borderRadius: '12px 12px 0 0',
                                            padding: '1.25rem'
                                        }}
                                    >
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h6 className="mb-0 fw-bold text-uppercase letter-spacing-1">
                                                    Pembelajaran
                                                </h6>
                                                <small className="opacity-75">Mata Kuliah</small>
                                            </div>
                                            <div
                                                className="bg-white bg-opacity-20 rounded-circle p-2"
                                                style={{ backdropFilter: 'blur(10px)' }}
                                            >
                                                <FiBookOpen size={22} className="text-black" />
                                            </div>
                                        </div>
                                        <div
                                            className="position-absolute"
                                            style={{
                                                top: '-20px',
                                                right: '-20px',
                                                width: '80px',
                                                height: '80px',
                                                background: 'rgba(255,255,255,0.1)',
                                                borderRadius: '50%'
                                            }}
                                        ></div>
                                    </Card.Header>

                                    <Card.Body className="p-4">
                                        <div className="mb-4">
                                            <div className="d-flex align-items-center mb-3">
                                                <div
                                                    className="bg-primary bg-opacity-10 rounded-circle p-2 me-3"
                                                    style={{ width: '40px', height: '40px' }}
                                                >
                                                    <FiUser size={16} className="text-primary d-block mx-auto mt-1" />
                                                </div>
                                                <div>
                                                    <p className="mb-0 text-muted small">Dosen Pengampu</p>
                                                    <h6 className="mb-0 fw-semibold text-dark">{item.nama_dosen}</h6>
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <p className="mb-1 text-muted small">Mata Kuliah</p>
                                                <h5 className="mb-0 fw-bold text-primary" style={{ lineHeight: '1.3' }}>
                                                    {item.mata_kuliah}
                                                </h5>
                                            </div>

                                            <div className="d-flex align-items-center">
                                                <span
                                                    className="badge bg-light text-dark rounded-pill"
                                                    style={{ fontSize: '0.85rem' }}
                                                >
                                                    <FiCalendar size={14} className="me-1" />
                                                    {item.semester}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="border-top pt-2">
                                            <p className="text-muted small mb-2 fw-semibold">DOKUMEN PEMBELAJARAN</p>
                                            <div className="d-flex flex-column gap-2">
                                                <Button
                                                    variant="outline-primary"
                                                    size="sm"
                                                    className="d-flex align-items-center justify-content-start text-start border-0 "
                                                    onClick={() => handleDownload(item.file_kontrak_kuliah)}
                                                    style={{
                                                        borderRadius: '8px',
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                >
                                                    <FiFileText className="me-2" size={16} />
                                                    <span>Kontrak Kuliah</span>
                                                    <FiDownload className="ms-auto" size={14} />
                                                </Button>

                                                <Button
                                                    variant="outline-success"
                                                    size="sm"
                                                    className="d-flex align-items-center justify-content-start text-start border-0 "
                                                    onClick={() => handleDownload(item.file_rps_pembelajaran)}
                                                    style={{
                                                        borderRadius: '8px',
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                >
                                                    <FiFile className="me-2" size={16} />
                                                    <span>RPS (Rencana Pembelajaran)</span>
                                                    <FiDownload className="ms-auto" size={14} />
                                                </Button>

                                                <Button
                                                    variant="outline-info"
                                                    size="sm"
                                                    className="d-flex align-items-center justify-content-start text-start border-0 "
                                                    onClick={() => handleShowDetail(item)}
                                                    style={{
                                                        borderRadius: '8px',
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                >
                                                    <FiBook className="me-2" size={16} />
                                                    <span>Bahan Ajar</span>
                                                    <FiChevronRight className="ms-auto" size={14} />
                                                </Button>
                                            </div>
                                        </div>
                                    </Card.Body>

                                    <Card.Footer
                                        className="bg-white border-0 p-3"
                                    >
                                        <div className="d-flex justify-content-between align-items-center">
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                className="px-3 rounded-pill"
                                                onClick={() => handleShowDetail(item)}
                                                style={{
                                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                    border: 'none'
                                                }}
                                            >
                                                <FiEye className="me-1 mb-1" size={14} />
                                                Detail
                                            </Button>

                                            {userRole === "admin" && (
                                                <div className="d-flex gap-2">
                                                    <Button
                                                        variant="outline-success"
                                                        size="sm"
                                                        onClick={() => navigate(`/admin/dashboard/pembelajaranmatakuliah/editpembelajaran/${item.id}`)}
                                                        title="Edit"
                                                    >
                                                        <FiEdit2 size={14} />
                                                    </Button>
                                                    <Button
                                                        variant="outline-danger"
                                                        size="sm"
                                                        onClick={() => deleteData(item.id)}
                                                        title="Hapus"
                                                    >
                                                        <FiTrash2 size={14} />
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Card.Body>

                <Card.Footer className="d-flex justify-content-between">
                    <small className="text-muted">
                        Menampilkan {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems} entri
                    </small>
                    <div>
                        <Button size="sm" variant="outline-primary" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Sebelumnya</Button>
                        <Button size="sm" variant="outline-primary" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="ms-2">Selanjutnya</Button>
                    </div>
                </Card.Footer>
            </Card>

            <Modal show={showDetailModal} onHide={handleCloseDetailModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FiBookOpen className="me-2" /> Detail Pembelajaran Mata Kuliah
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedItem && (
                        <div className="px-1">
                            <div className="mb-3 border-bottom pb-2">
                                <strong>Nama Dosen:</strong>
                                <div>{selectedItem.nama_dosen}</div>
                            </div>
                            <div className="mb-3 border-bottom pb-2">
                                <strong>Mata Kuliah:</strong>
                                <div>{selectedItem.mata_kuliah}</div>
                            </div>
                            <div className="mb-3 border-bottom pb-2">
                                <strong>Semester:</strong>
                                <div>{selectedItem.semester}</div>
                            </div>
                            <div className="mb-3 border-bottom pb-2">
                                <strong>File Kontrak Kuliah:</strong>
                                <div>
                                    <a
                                        href={`http://localhost:5000/uploads/pembelajaran_mata_kuliah/${selectedItem.file_kontrak_kuliah}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-outline-primary btn-sm"
                                    >
                                        <FiFile className="me-1" /> Lihat Kontrak Kuliah
                                    </a>
                                </div>
                            </div>
                            <div className="mb-3 border-bottom pb-2">
                                <strong>File RPS:</strong>
                                <div>
                                    <a
                                        href={`http://localhost:5000/uploads/pembelajaran_mata_kuliah/${selectedItem.file_rps_pembelajaran}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-outline-primary btn-sm"
                                    >
                                        <FiFile className="me-1" /> Lihat RPS
                                    </a>
                                </div>
                            </div>

                            <hr />
                            <h5 className="mb-3">Bahan Ajar</h5>

                            {bahanAjarList.length === 0 ? (
                                <p className="text-muted">Belum ada bahan ajar ditambahkan.</p>
                            ) : (
                                <div className="row g-3">
                                    {bahanAjarList
                                        .slice()
                                        .sort((a, b) => a.pertemuan - b.pertemuan)
                                        .map((bahan, index) => (
                                            <div key={index} className="col-12 col-md-4">
                                                <div className="border rounded p-3 h-100 d-flex flex-column justify-content-between shadow-sm">
                                                    <div>
                                                        <div className="mb-2 text-primary fw-bold">
                                                            Pertemuan {bahan.pertemuan}
                                                        </div>
                                                        <div className="mb-3" style={{ minHeight: "3rem", fontWeight: "600" }}>
                                                            {bahan.judul_materi}
                                                        </div>
                                                    </div>
                                                    <a
                                                        href={`http://localhost:5000/uploads/bahan_ajar/${bahan.file_pendukung}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn btn-sm btn-outline-primary d-flex align-items-center justify-content-center mt-auto"
                                                    >
                                                        <FiFile className="me-1" /> Lihat File PDF
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseDetailModal}>
                        Tutup
                    </Button>
                </Modal.Footer>
            </Modal>

        </Container >
    );
};

export default DaftarPembelajaranMataKuliah;
