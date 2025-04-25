import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, CardHeader } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TambahPenelitian = () => {
    const navigate = useNavigate();
    const [dosenList, setDosenList] = useState([]);
    const [judul_penelitian, setJudulPenelitian] = useState("");
    const [nama_dosen, setNamaDosen] = useState("");
    const [ketua_tim, setKetuaTim] = useState("");
    const [anggota_tim, setAnggotaTim] = useState("");
    const [file_laporan, setFileLaporan] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        getDosen();
    }, []);

    const getDosen = async () => {
        try {
            const response = await axios.get("http://localhost:5000/dosen");
            setDosenList(response.data);
        } catch (error) {
            console.error("Gagal mengambil data dosen:", error);
        }
    };

    const TambahPenelitian = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("judul_penelitian", judul_penelitian);
        formData.append("nama_dosen", nama_dosen);
        formData.append("ketua_tim", ketua_tim);
        formData.append("anggota_tim", anggota_tim);
        formData.append("file_laporan", file_laporan);

        axios.post("http://localhost:5000/penelitian", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        }).then(response => {
            console.log(response.data);
            navigate("/admin/dashboard/penelitian");
        }).catch(error => {
            console.error(error.response.data);

        });
    };

    return (
        <Container fluid className="p-4">
            <Row className="align-items-center p-4">
                <Col>
                    <h2 className="mb-1 fw-bold text-white">PENELITIAN</h2>
                    <p className="text-muted mb-0">Tambah Penelitian Dosen Sistem Informasi</p>
                </Col>
            </Row>

            <Card className="shadow border-0">
                <CardHeader className="bg-white">
                    <h5 className="mb-0 fw-semibold">Tambah Penelitian </h5>
                </CardHeader>
                <Card.Body className="p-4">
                    {msg && (
                        <Alert variant="danger" className="mb-4">
                            {msg}
                        </Alert>
                    )}

                    <Form onSubmit={TambahPenelitian}>
                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Judul Penelitian </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={judul_penelitian}
                                    onChange={(e) => setJudulPenelitian(e.target.value)}
                                    placeholder="Masukkan Judul"
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Nama Dosen </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Select 
                                value={nama_dosen} 
                                onChange={(e) => setNamaDosen(e.target.value)} 
                                required
                                >
                                    <option value="">-- Pilih Dosen Pengampu --</option>
                                    {dosenList.map((dosen) => (
                                        <option key={dosen.id} value={dosen.name}>{dosen.name}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Ketua Tim </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    value={ketua_tim}
                                    onChange={(e) => setKetuaTim(e.target.value)}
                                    placeholder="Masukkan Ketua Tim"
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Anggota Tim </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={anggota_tim}
                                    onChange={(e) => setAnggotaTim (e.target.value)}
                                    placeholder="Masukkan Nama-nama Anggota Tim"
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-4">
                            <Col md={3}>
                                <Form.Label >File Laporan (PDF) </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => setFileLaporan(e.target.files[0])}
                                    required
                                />
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>

                <Card.Footer className="bg-white border-0 p-3 d-flex justify-content-end">
                    <Button variant="secondary" size="sm" className="me-2" onClick={() => navigate("/admin/dashboard/penelitian")}>
                        Kembali
                    </Button>
                    <Button variant="primary" size="sm" onClick={TambahPenelitian}>
                        Tambah
                    </Button>
                </Card.Footer>
            </Card>

        </Container>
    );

};

export default TambahPenelitian;