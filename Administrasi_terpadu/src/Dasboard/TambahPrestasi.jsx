import React from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const TambahPrestasi = () => {
    const navigate = useNavigate();

    return (
        <Container fluid className="p-4">
            <Card className="mb-4 shadow border-0">
                   <Card.Body className="p-4">
                     <Row className="align-items-center">
                       <Col>
                         <h2 className="mb-1 fw-bold text-uppercase">Prestasi</h2>
                         <p className="text-muted mb-0">Daftar Prestasi Mahasiswa Sistem Informasi</p>
                       </Col>
                     </Row>
                   </Card.Body>
                 </Card>

            <Card className="shadow border-0">
                <h4 className="p-4">Tambah Prestasi</h4>
                <Card.Body className="p-4">

                    <Form >
                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Kategori </Form.Label>
                            </Col> :
                            <Col md={8}>
                            <Form.Select >
                                    <option value="">-- Pilih Kategori --</option>
                                    <option value="Individu">Individu</option>
                                    <option value="Tim">Tim</option>
                                </Form.Select>
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Tingkatan </Form.Label>
                            </Col> :
                            <Col md={8}>
                            <Form.Select >
                                    <option value="">-- Pilih Tingkatan --</option>
                                    <option value="Internasional">Internasional</option>
                                    <option value="Nasional">Nasional</option>
                                    <option value="Provinsi">Provinsi</option>
                                </Form.Select>
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Nama Ketua </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan Nama Ketua"
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
                                <Form.Label >Nama Anggota Tim </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    as='textarea'
                                    rows={3}
                                    placeholder="Masukkan Nama Anggota Tim"
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Nama Perlombaan </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan Nama Perlombaan"
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Bidang Perlombaan </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan BIdang Perlomban"
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Sertifikat </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="file"
                                    placeholder="Masukkan Sertifikat"
                                    required
                                />
                            </Col>
                        </Row>

                    </Form>
                </Card.Body>

                <Card.Footer className="bg-white border-0 p-3 d-flex justify-content-end">
                    <Button variant="secondary" size="sm" className="me-2" onClick={() => navigate("/admin/dashboard/rps")}>
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

export default TambahPrestasi;