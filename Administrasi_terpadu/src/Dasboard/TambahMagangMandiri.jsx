import React from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const TambahMagangMandiri = () => {
    const navigate = useNavigate();

    return (
        <Container fluid className="p-4">
            <Card className="mb-4 shadow border-0">
                    <Card.Body className="p-4">
                      <Row className="align-items-center">
                        <Col>
                          <h2 className="mb-1 fw-bold">Magang Mandiri</h2>
                          <p className="text-muted mb-0">Daftar Magang Mandiri Mahasiswa Sistem Informasi </p>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>

            <Card className="shadow border-0">
                <h4 className="p-4">Tambah Magang Mandiri </h4>
                <Card.Body className="p-4">

                    <Form >
                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Nama </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan Nama"
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Nim </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan Nim"
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Judul </Form.Label>
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
                                <Form.Label >Nama Perusahaan </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan Nama Perusahaan"
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-4">
                            <Col md={3}>
                                <Form.Label >Tanggal Mulai </Form.Label>
                            </Col> :
                            <Col md={8}>
                            <Form.Control
                                    type="date"
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-4">
                            <Col md={3}>
                                <Form.Label >Tanggal Selesai </Form.Label>
                            </Col> :
                            <Col md={8}>
                            <Form.Control
                                    type="date"
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-4">
                            <Col md={3}>
                                <Form.Label >Konversi Nilai </Form.Label>
                            </Col> :
                            <Col md={8}>
                            <Form.Control
                                    type="file"
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-4">
                            <Col md={3}>
                                <Form.Label >File Laporan </Form.Label>
                            </Col> :
                            <Col md={8}>
                            <Form.Control
                                    type="file"
                                    required
                                />
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>

                <Card.Footer className="bg-white border-0 p-3 d-flex justify-content-end">
                    <Button variant="secondary" size="sm" className="me-2" onClick={() => navigate("/admin/dashboard/magangmandiri")}>
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

export default TambahMagangMandiri;