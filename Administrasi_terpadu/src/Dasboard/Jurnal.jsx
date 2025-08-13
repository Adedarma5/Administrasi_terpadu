import React, { useEffect, useState, useRef } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    Table,
    Button,
    InputGroup,
    Form,
} from "react-bootstrap";
import {
    FiSearch,
    FiBookOpen,
    FiEdit2,
    FiTrash2,
    FiPlus,
    FiEye,
    FiFileText,
    FiDownload
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";


const Jurnal = () => {
    const navigate = useNavigate();
    const [jurnalList, setJurnalList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [role, setRole] = useState("");
    const printRef = useRef()
    const user = JSON.parse(localStorage.getItem('user'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setRole(localStorage.getItem("role")?.toLowerCase());
        fetchJurnal();
    }, []);

    const fetchJurnal = async () => {
        try {
            let url = "http://localhost:5000/jurnal";

            if (user?.role === "user") {
                url = `http://localhost:5000/jurnal?userId=${user.id}`;
            }

            const token = localStorage.getItem('token');

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setJurnalList(response.data);
        } catch (error) {
            console.error("Error fetching jurnal:", error);
        }
    };

    const deleteJurnal = async (id) => {
        const result = await Swal.fire({
            title: "Yakin ingin hapus?",
            text: "Data jurnal akan dihapus permanen.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus",
            cancelButtonText: "Batal",
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:5000/jurnal/${id}`);
                fetchJurnal();
                Swal.fire("Berhasil!", "Data jurnal berhasil dihapus.", "success");
            } catch (error) {
                Swal.fire("Gagal", "Gagal menghapus jurnal.", "error");
            }
        }
    };


    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: "Data Jurnal",
        onBeforeGetContent: () => new Promise((resolve) => setTimeout(resolve, 100)),
    });

    const exportToExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Daftar Jurnal");

        worksheet.addRow([
            "No",
            "Penulis",
            "Judul Jurnal",
            "Tahun Terbit",
            "Volume",
            "Penerbit",
            "Link",
        ]);

        paginatedJurnal.forEach((item, index) => {
            const row = worksheet.addRow([
                index + 1,
                item.penulis,
                item.judul_jurnal,
                item.tahun_terbit,
                item.volume,
                item.penerbit,
                item.link_jurnal,
            ]);

            row.getCell(7).value = {
                text: "Kunjungi",
                hyperlink: item.link_jurnal,
            };
            row.getCell(7).font = { color: { argb: "FF0000FF" }, underline: true };
        });

        worksheet.columns.forEach((col) => {
            col.width = 25;
        });

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, "DaftarJurnal.xlsx");
    };


    const filteredJurnal = jurnalList.filter(
        (j) =>
            j.judul_jurnal.toLowerCase().includes(searchTerm.toLowerCase()) ||
            j.penulis.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const paginatedJurnal = filteredJurnal.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalItems = filteredJurnal.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);


    return (
        <Container fluid className="p-4">
            <Row className="align-items-center mb-4">
                <Col>
                    <h2 className="fw-bold text-white text-uppercase">Daftar Jurnal</h2>
                    <p className="text-muted mb-0">Sistem Informasi</p>
                </Col>
                <Col xs="auto">
                    <Button
                        variant="success"
                        onClick={() => navigate("/admin/dashboard/jurnal/tambahjurnal")}
                        className="d-flex align-items-center gap-2"
                    >
                        <FiPlus /> Tambah Jurnal
                    </Button>
                </Col>
            </Row>

            <Card className="shadow border-0">
                <Card.Header className="bg-white py-3 border-bottom">
                    <div className="d-flex align-items-center flex-wrap gap-3">
                        <Button variant="danger" size="sm" onClick={handlePrint}>
                            Cetak Laporan PDF
                        </Button>
                        <Button variant="secondary" size="sm" onClick={exportToExcel} className="ms-2">
                            Ekspor ke Excel
                        </Button>
                        <div className="ms-auto col-12 col-md-6 col-lg-4">
                            <InputGroup size="sm" className="border rounded overflow-hidden">
                                <InputGroup.Text className="bg-white border-0">
                                    <FiSearch size={16} className="text-primary" />
                                </InputGroup.Text>
                                <Form.Control
                                    size="sm"
                                    type="text"
                                    placeholder="Cari judul/penulis..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="border-0 shadow-none py-1"
                                />
                            </InputGroup>
                        </div>
                    </div>
                </Card.Header>

                <div ref={printRef} className="d-none d-print-block">
                    <h4 className="text-center">Laporan Jurnal</h4>
                    <div className="print-only mb-4">
                        <p>Tanggal Cetak: {new Date().toLocaleDateString()}</p>
                    </div>
                    <Table striped bordered responsive className="mt-3 " >
                        <thead >
                            <tr>
                                <th>No</th>
                                <th>Penulis</th>
                                <th>Judul Jurnal</th>
                                <th>Tahun Terbit</th>
                                <th>Volume</th>
                                <th>Penerbit</th>
                                <th>Link</th>
                                {role === "admin" && <th className="no-print">Aksi</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedJurnal.length > 0 ? (
                                paginatedJurnal.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.penulis}</td>
                                        <td>{item.judul_jurnal}</td>
                                        <td>{item.tahun_terbit}</td>
                                        <td>{item.volume}</td>
                                        <td>{item.penerbit}</td>
                                        <td>
                                            <a
                                                href={item.link_jurnal}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Kunjungi
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={role === "admin" ? 8 : 7} className="text-center text-muted">
                                        <FiBookOpen size={20} className="me-1" />
                                        Tidak ada data jurnal ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>

                <Card.Body className="p-4">
                    <div>
                        {paginatedJurnal.length > 0 ? (
                            <div className="row g-3">
                                {paginatedJurnal.map((item, index) => (
                                    <div className="col-lg-6 col-xl-4" key={item.id}>
                                        <div
                                            className="card h-100 border-0 shadow small"
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <div
                                                className="card-header bg-white border-0 d-flex justify-content-between align-items-center"
                                                style={{
                                                    background: 'linear-gradient(135deg,rgb(221, 158, 42) 0%,rgb(131, 167, 53) 100%)',
                                                    borderRadius: '12px 12px 0 0',
                                                    padding: '1.25rem'
                                                }}
                                            >
                                                <span className="badge bg-success">{item.tahun_terbit}</span>
                                                <small className="text-black fw-semibold">Volume {item.volume}</small>
                                            </div>

                                            <div className="card-body p-3">
                                                <h6 className="fw-semibold text-dark mb-2" style={{ fontSize: '1rem' }}>
                                                    {item.judul_jurnal}
                                                </h6>

                                                <div className="mb-3">
                                                    <div className="mb-1">
                                                        <small className="text-muted">Penulis:</small><br />
                                                        <span className="fw-medium">{item.penulis}</span>
                                                    </div>
                                                    <div className="mb-1">
                                                        <small className="text-muted">Penerbit:</small><br />
                                                        <span>{item.penerbit}</span>
                                                    </div>
                                                </div>

                                                <div className="border-top">
                                                    <div className="d-flex align-items-center justify-content-between mt-2">
                                                        <div className="d-flex align-items-center gap-2">
                                                            <div
                                                                className="bg-danger bg-opacity-10 rounded-circle p-2 d-flex align-items-center justify-content-center"
                                                                style={{ width: 32, height: 32 }}
                                                            >
                                                                <FiFileText size={14} className="text-danger" />
                                                            </div>
                                                            <div>
                                                                <p className="mb-0 fw-semibold" style={{ fontSize: '0.85rem' }}>Lihat Jurnal</p>
                                                            </div>
                                                        </div>
                                                        <a
                                                            href={item.link_jurnal}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="btn btn-sm btn-outline-danger rounded-pill px-3"
                                                        >
                                                            <FiDownload size={12} className="me-1 mb-1" />
                                                            Link Jurnal
                                                        </a>
                                                    </div>
                                                </div>

                                                <Card.Footer
                                                    className="bg-white border-0 p-3 no-print"
                                                    style={{ borderRadius: '0 0 16px 16px' }}
                                                >
                                                    <div className="d-flex justify-content-end gap-1">
                                                        <div className="d-flex gap-1">
                                                            <Button
                                                                variant="outline-success"
                                                                size="sm"
                                                                onClick={() => navigate(`/admin/dashboard/jurnal/editjurnal/${item.id}`)}
                                                                title="Edit jurnal"
                                                            >
                                                                <FiEdit2 size={12} />
                                                            </Button>
                                                            <Button
                                                                variant="outline-danger"
                                                                size="sm"
                                                                onClick={() => deleteJurnal(item.id)}
                                                                title="Hapus jurnal"
                                                            >
                                                                <FiTrash2 size={12} />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </Card.Footer>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-5">
                                <i className="fas fa-book-open fa-3x text-muted mb-3"></i>
                                <h5 className="text-muted">Tidak ada data jurnal</h5>
                                <p className="text-muted mb-0">Belum ada jurnal yang ditambahkan</p>
                            </div>
                        )}
                    </div>
                </Card.Body>


                <div className="p-3 border-top d-flex justify-content-between align-items-center">
                    <div className="small text-muted">
                        Menampilkan {(currentPage - 1) * itemsPerPage + 1}–
                        {Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems} entri
                    </div>
                    <div className="mx-3">
                        <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="mx-2 mb-2"
                        >
                            Sebelumnya
                        </Button>
                        <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="mx-2 mb-2"
                        >
                            Selanjutnya
                        </Button>
                    </div>
                </div>
            </Card>
        </Container >
    );
};

export default Jurnal;
