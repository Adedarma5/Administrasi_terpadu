import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TambahPrestasi = () => {
    const navigate = useNavigate();
    const [nama, setNama] = useState("");
    const [nim, setNim] = useState("");
    const [kategori_peserta, setKategoriPeserta] = useState("");
    const [tingkatan, setTingkatan] = useState("");
    const [nama_perlombaan, setNamaPerlombaan] = useState("");
    const [bidang_perlombaan, setBidangPerlombaan] = useState("");
    const [sertifikat, setSertifikat] = useState(null);
    const [msg, setMsg] = useState("");


    const TambahPrestasi = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nama", nama);
        formData.append("nim", nim);
        formData.append("kategori_peserta", kategori_peserta);
        formData.append("tingkatan", tingkatan);
        formData.append("nama_perlombaan", nama_perlombaan);
        formData.append("bidang_perlombaan", bidang_perlombaan);
        formData.append("sertifikat", sertifikat);

        axios.post("http://localhost:5000/prestasi", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        }).then(response => {
            console.log(response.data);
            navigate("/akademik/dashboard");
        }).catch(error => {
            console.error(error.response.data);

        });
    };

    return (
        <Container fluid className="p-4">
            <Row className="align-items-center p-4">
                <Col>
                    <h2 className="mb-1 fw-bold text-white text-uppercase">Prestasi</h2>
                    <p className="text-muted mb-0">Daftar Prestasi Mahasiswa Sistem Informasi</p>
                </Col>
            </Row>


            <Card className="shadow border-0">
                <Card.Header>
                    <h5 className="mb-0 fw-semibold">Tambah Prestasi</h5>
                </Card.Header>
                <Card.Body className="p-4">

                    <Form onSubmit={TambahPrestasi}>
                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Nama  </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    value={nama}
                                    onChange={(e) => setNama(e.target.value)}
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
                                    value={nim}
                                    onChange={(e) => setNim(e.target.value)}
                                    placeholder="Masukkan Nim"
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Kategori Peserta </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Select
                                    value={kategori_peserta}
                                    onChange={(e) => setKategoriPeserta(e.target.value)}
                                    required
                                >
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
                                <Form.Select
                                    value={tingkatan}
                                    onChange={(e) => setTingkatan(e.target.value)}
                                >
                                    <option value="">-- Pilih Tingkatan --</option>
                                    <option value="Internasional">Internasional</option>
                                    <option value="Nasional">Nasional</option>
                                    <option value="Provinsi">Provinsi</option>
                                </Form.Select>
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Nama Perlombaan </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    value={nama_perlombaan}
                                    onChange={(e) => setNamaPerlombaan(e.target.value)}
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
                                    value={bidang_perlombaan}
                                    onChange={(e) => setBidangPerlombaan(e.target.value)}
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
                                    accept=".pdf"
                                    onChange={(e) => setSertifikat(e.target.files[0])}
                                    required
                                />
                            </Col>
                        </Row>
                        <div className="ms-auto col-md-3 col-lg-2">
                            <Button className="py-2 px-4" variant="primary" size="sm" type="submit" >
                                Tambah
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>

        </Container>
    );

};

export default TambahPrestasi;