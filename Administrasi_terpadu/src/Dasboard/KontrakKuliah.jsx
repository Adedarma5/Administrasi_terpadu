import React, { useState, useEffect } from "react";
import { Container, Card, Table, Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiFilter } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import "../Dist/Home.css"
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const KontrakKuliah = () => {
    const navigate = useNavigate();
    const [kontrakkuliahList, setKontrakKuliahList] = useState([]);
    const [selectedsemester, setSelectedSemester] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const printRef = useRef();


    useEffect(() => {
        fetchKontrakKuliah();
    }, []);

    const fetchKontrakKuliah = async () => {
        try {
            const response = await axios.get("http://localhost:5000/kontrak_kuliah");
            setKontrakKuliahList(response.data);
        } catch (error) {
            console.error("Error fetching mata kuliah data:", error);
        }
    };

    const handleSuccess = (message) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(""), 5000);
    };

    const deleteKontrakKuliah = async (id) => {
        const result = await Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Data yang dihapus tidak bisa dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:5000/kontrak_kuliah/${id}`);
                fetchKontrakKuliah();

                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: 'Data berhasil dihapus.',
                    timer: 2000,
                    showConfirmButton: false,
                });
            } catch (error) {
                console.error("Error deleting:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops!',
                    text: 'Terjadi kesalahan saat menghapus data.',
                });
            }
        }
    };

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: "Kontrak Kuliah",
        onBeforeGetContent: () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 100);
            });
        },
    });

    const exportToExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Kontrak Kuliah");

        worksheet.addRow(["No", "Nama Dosen", "Mata Kuliah ", "Semester", "File Kontrak Kuliah"]);

        for (let i = 0; i < filteredKontrakKuliah.length; i++) {
            const kontrak_kuliah = filteredKontrakKuliah[i];
            worksheet.addRow([]);
            const row = worksheet.getRow(i + 2);

            row.getCell(1).value = i + 1;
            row.getCell(2).value = kontrak_kuliah.nama_dosen;
            row.getCell(3).value = kontrak_kuliah.mata_kuliah;
            row.getCell(4).value = kontrak_kuliah.semester;

            const fileUrl = `http://localhost:5000/uploads/kontrak_kuliah/${kontrak_kuliah.file_kontrak_kuliah}`;
            row.getCell(5).value = {
                text: "Lihat File",
                hyperlink: fileUrl,
            };
            row.getCell(5).font = { color: { argb: 'FF0000FF' }, underline: true };
        }

        worksheet.columns = [
            { width: 5 },
            { width: 30 },
            { width: 30 },
            { width: 55 },
            { width: 15 },
            { width: 30 },
        ];

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, "Kontrak Kuliah.xlsx");
    };



    const filteredKontrakKuliah = kontrakkuliahList.filter((kontrak_kuliah) => {
        const nameMatch = kontrak_kuliah.mata_kuliah?.toLowerCase().includes(searchTerm.toLowerCase());
        const semesterMatch = selectedsemester === "" || kontrak_kuliah.semester?.toLowerCase() === `semester ${selectedsemester}`.toLowerCase();
        return nameMatch && semesterMatch;
    });

    const totalItems = filteredKontrakKuliah.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginatedMataKuliah = filteredKontrakKuliah.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <Container fluid className="p-4">
            <Row className="align-items-center p-4">
                <Col>
                    <h2 className="mb-1 fw-bold text-white text-uppercase">Kontrak Kuliah</h2>
                    <p className="text-muted mb-0">Sistem Informasi</p>
                </Col>
                <Col xs="auto">
                    <Button
                        variant="success"
                        onClick={() => navigate("/admin/dashboard/kontrakkuliah/tambahkontrakkuliah")}
                        className="shadow d-flex align-items-center gap-2 text-white"
                    >
                        <FiPlus size={18} />
                        <span>Tambah Kontrak Kuliah</span>
                    </Button>
                </Col>
            </Row>

            <Card className="shadow border-0">
                <Card.Body className="p-0">
                    <div className="p-3 border-bottom">
                        <Row className="align-items-center g-3">
                            <Col md={6} lg={4}>
                                <h5 className="mb-0 fw-semibold">Daftar Kontrak Kuliah Sistem Informasi</h5>
                            </Col>
                        </Row>
                    </div>

                    <Card className="shadow-sm border-0 overflow-hidden">
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
                                            placeholder="Cari nama Mata Kuliah..."
                                            value={searchTerm}
                                            onChange={(e) => {
                                                setSearchTerm(e.target.value);
                                                setCurrentPage(1);
                                            }}
                                            className="border-0 shadow-none py-1"
                                        />
                                    </InputGroup>
                                </div>

                                <div className="col-12 col-md-4 col-lg-3">
                                    <Form.Select
                                        value={selectedsemester}
                                        onChange={(e) => {
                                            setSelectedSemester(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="shadow-none py-1"
                                    >
                                        <option value="">-- Semua Semester --</option>
                                        {[...Array(8)].map((_, i) => (
                                            <option key={i + 1} value={(i + 1).toString()}>
                                                Semester {i + 1}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </div>
                            </div>
                        </Card.Header>

                        <Card.Body className="p-0 text-center">
                            <div className="table-responsive" ref={printRef}>
                                <div className="print-only">
                                    <h4 className="text-uppercase">Kontrak Kuliah</h4>
                                    <p>Tanggal Cetak: {new Date().toLocaleDateString()}</p>
                                </div>
                                <Table striped bordered hover className="align-middle mb-0" size="sm">
                                    <thead>
                                        <tr className="bg-light">
                                            <th className="px-1 py-3" >No</th>
                                            <th className="px-5 py-3" >Nama Dosen</th>
                                            <th className="px-2 py-3" >Mata Kuliah</th>
                                            <th className="px-3 py-3" >Semester</th>
                                            <th className="px-3 py-3" >Kontrak Kuliah</th>
                                            <th className="px-3 py-3 no-print" >Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredKontrakKuliah.length > 0 ? (
                                            paginatedMataKuliah.map((kontrak_kuliah, index) => (
                                                <tr key={kontrak_kuliah.id}>
                                                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                    <td>{kontrak_kuliah.nama_dosen}</td>
                                                    <td>{kontrak_kuliah.mata_kuliah}</td>
                                                    <td>{kontrak_kuliah.semester}</td>
                                                    <td>
                                                        <a
                                                            href={`http://localhost:5000/uploads/kontrak_kuliah/${kontrak_kuliah.file_kontrak_kuliah}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            Lihat PDF
                                                        </a>
                                                    </td>
                                                    <td className="no-print">
                                                        <div className="d-flex justify-content-center gap-2">
                                                            <Button
                                                                variant="outline-success"
                                                                size="sm"
                                                                className="rounded-2 px-2 py-1"
                                                                title="Edit"
                                                                onClick={() =>
                                                                    navigate(`/admin/dashboard/kontrakkuliah/editkontrakkuliah/${kontrak_kuliah.id}`)
                                                                }
                                                            >
                                                                <FiEdit2 size={15} />
                                                            </Button>
                                                            <Button
                                                                variant="outline-danger"
                                                                size="sm"
                                                                className="rounded-2 px-2 py-1"
                                                                title="Hapus"
                                                                onClick={() => deleteKontrakKuliah(kontrak_kuliah.id)}
                                                            >
                                                                <FiTrash2 size={15} />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="8" className="text-center py-4">
                                                    <div className="d-flex flex-column align-items-center justify-content-center py-4">
                                                        <FiFilter size={32} className="text-muted mb-2" />
                                                        <p className="text-muted mb-0">Tidak ada data dosen yang tersedia</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                        </Card.Body>
                    </Card>

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
                </Card.Body>
            </Card>
        </Container>
    );
};

export default KontrakKuliah;
