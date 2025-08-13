import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert, CardHeader } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TambahJurnal = () => {
    const [judul_jurnal, setJudulJurnal] = useState("");
    const [link_jurnal, setLinkJurnal] = useState("");
    const [penulis, setPenulis] = useState("");
    const [tahun_terbit, setTahunTerbit] = useState("");
    const [volume, setVolume] = useState("");
    const [penerbit, setPenerbit] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const TambahJurnal = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            await axios.post("http://localhost:5000/jurnal", {
                penulis,
                judul_jurnal,
                link_jurnal,
                tahun_terbit,
                volume,
                penerbit,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            navigate("/admin/dashboard/jurnal");
        } catch (error) {
            console.error(error);
            setMsg(error.response?.data?.msg || "Terjadi kesalahan saat menyimpan jurnal.");
        }
    };


    return (
        <Container fluid className="p-4">
            <Row className="align-items-center p-4">
                <Col>
                    <h2 className="mb-1 fw-bold text-white"> Jurnal</h2>
                    <p className="text-muted mb-0">Tambah Jurnal Sistem Informasi</p>
                </Col>
            </Row>

            <Card className="shadow border-0">
                <CardHeader className="bg-white">
                    <h5 className="mb-0 fw-semibold ">Tambah Jurnal </h5>
                </CardHeader>
                <Card.Body className="p-4">
                    {msg && (
                        <Alert variant="danger" className="mb-4">
                            {msg}
                        </Alert>
                    )}

                    <Form onSubmit={TambahJurnal}>
                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Penulis </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    value={penulis}
                                    onChange={(e) => setPenulis(e.target.value)}
                                    placeholder="Masukkan Nama Penulis"
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Judul Jurnal </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan Judul Jurnal"
                                    value={judul_jurnal}
                                    onChange={(e) => setJudulJurnal(e.target.value)}
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Link Jurnal </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan Link Jurnal Yang Sudah Di Publish"
                                    value={link_jurnal}
                                    onChange={(e) => setLinkJurnal(e.target.value)}
                                    required
                                />
                            </Col>
                        </Row>
                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Tahun Terbit </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan Tahun Terbit Jurnal"
                                    value={tahun_terbit}
                                    onChange={(e) => setTahunTerbit(e.target.value)}
                                    required
                                />
                            </Col>
                        </Row>
                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Volume </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan Volume Jurnal"
                                    value={volume}
                                    onChange={(e) => setVolume(e.target.value)}
                                    required
                                />
                            </Col>
                        </Row>
                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Penerbit </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan Penerbit Jurnal"
                                    value={penerbit}
                                    onChange={(e) => setPenerbit(e.target.value)}
                                    required
                                />
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>

                <Card.Footer className="bg-white border-0 p-3 d-flex justify-content-end">
                    <Button variant="secondary" size="sm" className="me-2" onClick={() => navigate("/admin/dashboard/jurnal")}>
                        Kembali
                    </Button>
                    <Button variant="primary" size="sm" onClick={TambahJurnal}>
                        Tambah
                    </Button>
                </Card.Footer>
            </Card>

        </Container>
    );

};

export default TambahJurnal;