import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Alert, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TambahAbsensiPertemuan = () => {
    const [absensiList, setAbsensiList] = useState([]);
    const [absensi_id, setAbsensiId] = useState("");
    const [pertemuan, setPertemuan] = useState("");
    const [foto, setFoto] = useState(null);
    const [msg, setMsg] = useState("");
    const [statusUpload, setStatusUpload] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getAbsensi();
    }, []);

    const getAbsensi = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:5000/absensi", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAbsensiList(response.data);
        } catch (error) {
            console.error("Gagal mengambil data absensi:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = parseInt(localStorage.getItem("userId"));

        if (!userId || isNaN(userId)) {
            setMsg("User ID tidak valid.");
            return;
        }
        const formData = new FormData();
        formData.append("absensi_id", absensi_id);
        formData.append("pertemuan", pertemuan);
        formData.append("foto", foto);
        formData.append("userId", userId);

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post("http://localhost:5000/absensipertemuan", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            setStatusUpload(response.data.status);
            setMsg("Upload berhasil");
            navigate("/admin/dashboard/absensi");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };


    return (
        <Container fluid className="p-4">
            <Row className="align-items-center p-4">
                <Col>
                    <h2 className="mb-1 fw-bold text-dark">Absensi Pertemuan</h2>
                    <p className="text-muted mb-0">Tambah Foto Absensi Setiap Pertemuan</p>
                </Col>
            </Row>

            <Card className="shadow border-0">
                <Card.Header>
                    <h5 className="mb-0 fw-semibold">Tambah Absensi Pertemuan</h5>
                </Card.Header>
                <Card.Body className="p-4">
                    {msg && <Alert variant="info">{msg}</Alert>}
                    {statusUpload && (
                        <Alert variant={statusUpload === "Telat" ? "danger" : "success"}>
                            Status Upload:{" "}
                            <Badge bg={statusUpload === "Telat" ? "danger" : "success"}>
                                {statusUpload}
                            </Badge>
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                        <Row className="align-items-center mb-3">
                            <Col md={3}><Form.Label>Pertemuan</Form.Label></Col>
                            <Col md={8}>
                                <Form.Select
                                    value={pertemuan}
                                    onChange={(e) => setPertemuan(e.target.value)}
                                    required
                                >
                                    <option value="">-- Pilih Pertemuan --</option>
                                    {Array.from({ length: 16 }, (_, i) => i + 1).map((num) => (
                                        <option key={num} value={num}>{`Pertemuan ${num}`}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}><Form.Label>Jadwal Absensi</Form.Label></Col>
                            <Col md={8}>
                                <Form.Select
                                    value={absensi_id}
                                    onChange={(e) => setAbsensiId(e.target.value)}
                                    required
                                >
                                    <option value="">-- Pilih Jadwal --</option>
                                    {absensiList.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {`${item.mata_kuliah} - ${item.kelas} (${item.hari} ${item.jam})`}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}><Form.Label>Upload Foto</Form.Label></Col>
                            <Col md={8}>
                                <Form.Control
                                    type="file"
                                    onChange={(e) => setFoto(e.target.files[0])}
                                    required
                                />
                            </Col>
                        </Row>

                        <Card.Footer className="bg-white border-0 p-3 d-flex justify-content-end">
                            <Button
                                variant="secondary"
                                size="sm"
                                className="me-2"
                                onClick={() => navigate("/admin/dashboard/absensi")}
                            >
                                Kembali
                            </Button>
                            <Button variant="primary" size="sm" type="submit">
                                Upload
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default TambahAbsensiPertemuan;
