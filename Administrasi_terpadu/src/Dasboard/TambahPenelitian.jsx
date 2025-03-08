import React from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const TambahPenelitian = () => {
    const navigate = useNavigate();

    return (
        <Container fluid className="p-4">
            <Card className="mb-4 shadow border-0">
                    <Card.Body className="p-4">
                      <Row className="align-items-center">
                        <Col>
                          <h2 className="mb-1 fw-bold">PENELITIAN</h2>
                          <p className="text-muted mb-0">Daftar Penelitian Dosen Sistem Informasi</p>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>

            <Card className="shadow border-0">
                <h4 className="p-4">Tambah Penelitian </h4>
                <Card.Body className="p-4">

                    <Form >
                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Judul Penelitian </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan Judul"
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Dosen Pembimbing </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan Dosen Pembimbing"
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Ketua </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan Ketua Tims"
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Sumber Dana </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan Sumber Dana Yang Didapatkan"
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-4">
                            <Col md={3}>
                                <Form.Label >Dampak Bagi Masyarakat </Form.Label>
                            </Col> :
                            <Col md={8}>
                            <Form.Control
                                    type="text"
                                    placeholder="Masukkan Dampaknya Kemasyarakat"
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
                    <Button variant="primary" size="sm" >
                        Tambah
                    </Button>
                </Card.Footer>
            </Card>

        </Container>
    );

};

export default TambahPenelitian;