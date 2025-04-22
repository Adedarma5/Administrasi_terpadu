import React from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TambahMsib = () => {
    const navigate = useNavigate();

    return (
        <Container fluid className="p-4">
            <Card className="mb-4 shadow border-0">
                <Card.Body className="p-4">
                    <Row className="align-items-center">
                        <Col>
                            <h2 className="mb-1 fw-bold">Tambah MSIB</h2>
                            <p className="text-muted mb-0">Form untuk menambahkan kegiatan MSIB</p>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <Card className="shadow border-0">
                <Card.Body className="p-4">
                    <h4 className="mb-4">Form Tambah MSIB</h4>
                    <Form>
                        <Row className="mb-3">
                            <Col md={3}>
                                <Form.Label>Nama</Form.Label>
                            </Col>
                            <Col md={9}>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan nama lengkap"
                                    required />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={3}><Form.Label>NIM</Form.Label></Col>
                            <Col md={9}><Form.Control type="text" placeholder="Masukkan NIM" required /></Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={3}><Form.Label>Program Yang Diikuti</Form.Label></Col>
                            <Col md={9}><Form.Control type="text" placeholder="Masukkan nama program" required /></Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={3}><Form.Label>Judul</Form.Label></Col>
                            <Col md={9}><Form.Control type="text" placeholder="Masukkan judul" required /></Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={3}><Form.Label>Mitra MSIB</Form.Label></Col>
                            <Col md={9}><Form.Control type="text" placeholder="Masukkan nama mitra" required /></Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={3}><Form.Label>Tanggal Mulai</Form.Label></Col>
                            <Col md={9}><Form.Control type="date" required /></Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={3}><Form.Label>Tanggal Selesai</Form.Label></Col>
                            <Col md={9}><Form.Control type="date" required /></Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={3}><Form.Label>Lembar Pengesahan Pembimbing</Form.Label></Col>
                            <Col md={9}><Form.Control type="file" /></Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={3}><Form.Label>Laporan MSIB</Form.Label></Col>
                            <Col md={9}><Form.Control type="file" /></Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={3}><Form.Label>Program</Form.Label></Col>
                            <Col md={9}><Form.Control type="file" /></Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={3}><Form.Label>Lembar Nilai dan Sertifikat</Form.Label></Col>
                            <Col md={9}><Form.Control type="file" /></Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={3}><Form.Label>Konversi Nilai</Form.Label></Col>
                            <Col md={9}><Form.Control type="file" /></Col>
                        </Row>
                    </Form>
                </Card.Body>

                <Card.Footer className="bg-white border-0 p-3 d-flex justify-content-end">
                    <Button variant="secondary" size="sm" className="me-2" onClick={() => navigate("/admin/dashboard/msib")}>
                        Kembali
                    </Button>
                    <Button variant="primary" size="sm">
                        Tambah
                    </Button>
                </Card.Footer>
            </Card>
        </Container>
    );
};

export default TambahMsib;
