import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TambahRps = () => {

    const [mataKuliahList, setMataKuliahList] = useState([]);
    const [name, setName] = useState("");
    const [semester, setSemester] = useState("");
    const [file_rps, setFileRps] = useState(null);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getMataKuliah();
    }, []);

    const getMataKuliah = async () => {
        try {
            const response = await axios.get("http://localhost:5000/mata_kuliah");
            setMataKuliahList(response.data);
        } catch (error) {
            console.error("Gagal mengambil data mata kuliah:", error);
        }
    };

    const TambahRps = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("semester", semester);
        formData.append("file_rps", file_rps);

        try {
            const response = await axios.post("http://localhost:5000/rps", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            console.log("Upload berhasil:", response.data);
            navigate("/admin/dashboard/rps");
        } catch (error) {
            setMsg(error.response?.data?.msg || "Terjadi kesalahan");
            console.error("Error saat upload:", error);
        }
    };

    return (
        <Container fluid className="p-4">
            <Row className="align-items-center p-4">
                <Col>
                    <h2 className="mb-1 fw-bold text-white">Rencana Pembelajaran Semester</h2>
                    <p className="text-muted mb-0">Daftar RPS Sistem Informasi</p>
                </Col>
            </Row>

            <Card className="shadow border-0">
                <Card.Header className="bg-white">
                    <h5 className="mb-0 fw-semibold">Tambah Rencana Pembelajaran Semester</h5>
                </Card.Header>
                <Card.Body className="p-4">
                    {msg && <Alert variant="danger" className="mb-4">{msg}</Alert>}

                    <Form onSubmit={TambahRps}>
                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label>Nama</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Select
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} required>
                                    <option value="">-- Pilih Mata Kuliah --</option>
                                    {mataKuliahList.map((mata_kuliah) => (
                                        <option key={mata_kuliah.id} value={mata_kuliah.name}>{mata_kuliah.name}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label>Semester</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Select value={semester} onChange={(e) => setSemester(e.target.value)} required>
                                    <option value="">Pilih Semester</option>
                                    <option value="Semester 1">Semester 1</option>
                                    <option value="Semester 2">Semester 2</option>
                                    <option value="Semester 3">Semester 3</option>
                                    <option value="Semester 4">Semester 4</option>
                                    <option value="Semester 5">Semester 5</option>
                                    <option value="Semester 6">Semester 6</option>
                                    <option value="Semester 7">Semester 7</option>
                                    <option value="Semester 8">Semester 8</option>
                                </Form.Select>
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label>File RPS</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => setFileRps(e.target.files[0])}
                                    required
                                />
                            </Col>
                        </Row>

                        <Card.Footer className="bg-white border-0 p-3 d-flex justify-content-end">
                            <Button variant="secondary" size="sm" className="me-2" onClick={() => navigate("/admin/dashboard/rps")}>
                                Kembali
                            </Button>
                            <Button variant="primary" size="sm" type="submit">
                                Tambah
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default TambahRps;
