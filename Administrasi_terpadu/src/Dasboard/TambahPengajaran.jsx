import React from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const TambahPengajaran = () => {
    const navigate = useNavigate();

    return (
        <Container fluid className="p-4">
            <Card className="mb-4 shadow border-0">
                   <Card.Body className="p-4">
                     <Row className="align-items-center">
                       <Col>
                         <h2 className="mb-1 fw-bold">PENGAJARAN</h2>
                         <p className="text-muted mb-0">Daftar Mata Kuliah yang Diajar oleh Dosen</p>
                       </Col>
                     </Row>
                   </Card.Body>
                 </Card>

            <Card className="shadow border-0">
                <h4 className="p-4">Tambah Pengajaran </h4>
                <Card.Body className="p-4">

                    <Form >
                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Nama Lengkap </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan nama lengkap"
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Email </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="email"
                                    placeholder="Masukkan email"
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Password </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="password"
                                    placeholder="Masukkan password"
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Konfirmasi Password </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="password"
                                    placeholder="Masukkan ulang password"
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-4">
                            <Col md={3}>
                                <Form.Label >Role </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Select >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </Form.Select>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>

                <Card.Footer className="bg-white border-0 p-3 d-flex justify-content-end">
                    <Button variant="secondary" size="sm" className="me-2" onClick={() => navigate("/admin/dashboard/pengajaran")}>
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

export default TambahPengajaran;