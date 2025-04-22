import React, { useState, useEffect } from "react";
import { Container, Card, Table, Button, Row, Col, Form, InputGroup, Spinner } from "react-bootstrap";
import { FiPlus, FiSearch, FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const Rps = () => {
    const navigate = useNavigate();
    const [rpsList, setRpsList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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



    const filteredRps = rpsList.filter((rps) =>
        rps.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rps.semester.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalItems = filteredRps.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginatedRps = filteredRps.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <Container fluid className="p-4">
            <Card className="mb-4 shadow border-0">
                <Card.Body className="p-4">
                    <Row className="align-items-center">
                        <Col>
                            <h2 className="mb-1 fw-bold">Rencana Pembelajaran Semester</h2>
                            <p className="text-muted mb-0">
                                Daftar RPS  Sistem Informasi
                            </p>
                        </Col>
                        <Col xs="auto">
                            <Button variant="primary" className="d-flex align-items-center gap-2" onClick={() => navigate("/admin/dashboard/Rps/TambahRps")}>
                                <FiPlus size={18} />
                                <span >Tambah RPS</span>
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <Card className="shadow border-0">
                <Card.Body className="p-0">
                    <div className="p-3 border-bottom">
                        <Row className="align-items-center g-3">
                            <Col lg={4}>
                                <InputGroup>
                                    <InputGroup.Text className="bg-light border-end-0">
                                        <FiSearch size={16} />
                                    </InputGroup.Text>
                                    <Form.Control
                                        placeholder="Cari Rps..."
                                        className="border-start-0 bg-light"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                    </div>


                    <div className="table-responsive">
                        {loading ? (
                            <div className="text-center p-4">
                                <Spinner animation="border" />
                            </div>
                        ) : error ? (
                            <Alert variant="danger" className="text-center">
                                {error}
                            </Alert>
                        ) : (
                            <Table striped bordered over className="align-middle mb-0 text-center">
                                <thead className="bg-light">
                                    <tr>
                                        <th className="py-3">No</th>
                                        <th className="py-3">Nama </th>
                                        <th className="py-3">Semester</th>
                                        <th className="py-3">File_Rps</th>
                                        <th className="py-3 text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedRps.length > 0 ? (
                                        paginatedRps.map((rps, index) => (
                                            <tr key={rps.id}>
                                                <td className="fw-medium">{(currentPage - 1) * itemsPerPage + index + 1}</td>
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
                                                        <Button variant="light" size="sm" title="Lihat Detail">
                                                            <FiEye size={16} />
                                                        </Button>
                                                        <Button
                                                            variant="light"
                                                            size="sm"
                                                            title="Edit"
                                                            onClick={() => navigate(`/admin/dashboard/rps/editrps/${rps.id}`)}
                                                        >
                                                            <FiEdit2 size={16} />
                                                        </Button>
                                                        <Button variant="light" size="sm" title="Hapus" onClick={() => deleteRps(rps.id)}>
                                                            <FiTrash2 size={16} />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="text-center text-muted py-3">
                                                Tidak ada data
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        )}
                    </div>

                    <div className="p-3 border-top d-flex justify-content-between align-items-center">
                        <div className="small text-muted">Menampilkan 1-5 dari 5 entri</div>
                        <div>
                            <Button variant="outline-primary" size="sm" className="me-2" disabled>
                                Sebelumnya
                            </Button>
                            <Button variant="outline-primary" size="sm" disabled>
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