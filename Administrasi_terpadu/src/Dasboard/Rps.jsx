import React, { useState, useEffect } from "react";
import { Container, Card, Table, Button, Row, Col, Form, } from "react-bootstrap";
import { FiPlus, FiFilter, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const Rps = () => {
    const navigate = useNavigate();
    const [rpsList, setRpsList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedsemester, setSelectedSemester] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchRps();
    }, []);

    const fetchRps = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("http://localhost:5000/rps");
            setRpsList(response.data);
        } catch (error) {
            setError("Gagal memuat data RPS.");
            console.error("Error fetching data:", error);
        }
        setLoading(false);
    };

    const deleteRps = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus RPS ini?")) {
            try {
                await axios.delete(`http://localhost:5000/rps/${id}`);
                fetchRps();
            } catch (error) {
                alert("Gagal menghapus RPS");
                console.error("Error deleting RPS:", error);
            }
        }
    };



    const filteredRps = rpsList.filter((rps) => {
        const semesterMatch = selectedsemester === "" || rps.semester.toLowerCase() === `semester ${selectedsemester}`.toLowerCase();
        return semesterMatch;
    });

    const totalItems = filteredRps.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginatedRps = filteredRps.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    return (
        <Container fluid className="p-4">
            <Row className="align-items-center p-4">
                <Col>
                    <h2 className="mb-1 fw-bold text-white">Rencana Pembelajaran Semester</h2>
                    <p className="text-muted mb-0">Sistem Informasi</p>
                </Col>
                <Col xs="auto">
                    <Button variant="success" className=" shadow d-flex align-items-center gap-2" onClick={() => navigate("/admin/dashboard/Rps/TambahRps")}>
                        <FiPlus size={18} />
                        <span >Tambah RPS</span>
                    </Button>
                </Col>
            </Row>


            <Card className="shadow border-0">
                <Card.Body className="p-0">
                    <div className="p-3 border-bottom">
                        <Row className="align-items-center g-3">
                            <Col md={6} lg={4}>
                                <h5 className="mb-0 fw-semibold">Daftar Mata Kuliah Sistem Informasi</h5>
                            </Col>
                        </Row>
                    </div>

                    <Card.Header className="bg-white py-3 border-bottom">
                        <div className="d-flex  align-items-center flex-wrap gap-3 ">
                            <div className=" ms-auto col-md-4 col-lg-3">
                                <Form.Select
                                    value={selectedsemester}
                                    onChange={(e) => {
                                        setSelectedSemester(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="shadow-none py-1"
                                >
                                    <option value="">Semua Semester</option>
                                    {[...Array(16)].map((_, i) => (
                                        <option key={i + 1} value={(i + 1).toString()}>
                                            Semester {i + 1}
                                        </option>
                                    ))}
                                </Form.Select>
                            </div>
                        </div>
                    </Card.Header>


                    <div className="table-responsive">
                        <Table striped bordered over className="align-middle  text-center" size="sm">
                            <thead className="bg-light">
                                <tr>
                                    <th className="py-3">No</th>
                                    <th className="py-3">Nama </th>
                                    <th className="py-3">Semester</th>
                                    <th className="py-3">File_Rps</th>
                                    <th className="py-3">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedRps.length > 0 ? (
                                    paginatedRps.map((rps, index) => (
                                        <tr key={rps.id}>
                                            <td >{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                            <td>{rps.name}</td>
                                            <td>{rps.semester}</td>
                                            <td>
                                                <a
                                                    href={`http://localhost:5000/uploads/rps/${rps.file_rps}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Lihat PDF
                                                </a>
                                            </td>
                                            <td>
                                                <div className="d-flex justify-content-center gap-2">
                                                    <Button
                                                        variant="outline-success"
                                                        size="sm"
                                                        className="rounded-2 px-2 py-1 d-flex align-items-center justify-content-center"
                                                        title="Edit"
                                                        onClick={() => navigate(`/admin/dashboard/rps/editrps/${rps.id}`)}
                                                    >
                                                        <FiEdit2 size={16} />
                                                    </Button>
                                                    <Button
                                                        variant="outline-danger"
                                                        size="sm"
                                                        className="rounded-2 px-2 py-1 d-flex align-items-center justify-content-center"
                                                        title="Hapus"
                                                        onClick={() => deleteRps(rps.id)}>
                                                        <FiTrash2 size={16} />
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

                    <div className="p-3 border-top d-flex justify-content-between align-items-center">
                        <div className="small text-muted">
                            Menampilkan {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems} entri
                        </div>
                        <div>
                            <Button variant="outline-primary" size="sm" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="mx-4">
                                Sebelumnya
                            </Button>
                            <Button variant="outline-primary" size="sm" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                                Selanjutnya
                            </Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Rps;