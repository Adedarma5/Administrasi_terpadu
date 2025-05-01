import React, { useState } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const TambahMsib = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nama: "",
        nim: "",
        program: "",
        judul: "",
        mitra: "",
        tanggal_mulai: "",
        tanggal_selesai: "",
    });

    const [files, setFiles] = useState({
        lembar_pengesahan: null,
        laporan: null,
        projek: null,
        sertifikat: null,
        konversi_nilai: null,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFiles({ ...files, [e.target.name]: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => data.append(key, value));
        Object.entries(files).forEach(([key, file]) => {
            if (file) data.append(key, file);
        });

        try {

            const response = await axios.post("http://localhost:5000/msib", data, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Data berhasil ditambahkan.',
                timer: 2000,
                showConfirmButton: false,
                position: 'center',
            });

            setFormData({
                nama: "",
                nim: "",
                program: "",
                judul: "",
                mitra: "",
                tanggal_mulai: "",
                tanggal_selesai: "",
            });
            setFiles({
                lembar_pengesahan: null,
                laporan: null,
                projek: null,
                sertifikat: null,
                konversi_nilai: null,
            });


            navigate("/akademik/dashboard");
        } catch (error) {
            console.error("Gagal tambah data:", error);

            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'Terjadi kesalahan saat menambahkan data.',
                position: 'center',
                showConfirmButton: true,
            });
        }
    };

    return (
        <Container fluid className="p-4">
            <Row className="align-items-center p-4">
                <Col>
                    <h2 className="mb-1 fw-bold text-white text-uppercase">Tambah MSIB</h2>
                    <p className="text-muted mb-0">Form untuk menambahkan kegiatan MSIB</p>
                </Col>
            </Row>


            <Card className="shadow border-0">
                <Card.Header>
                    <h5 className="mb-0 fw-semibold">Form Tambah MSIB</h5>
                </Card.Header>
                <Card.Body className="p-4">

                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Col md={3}>
                                <Form.Label>Nama</Form.Label>
                            </Col>
                            <Col md={9}>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan nama lengkap"
                                    name="nama"
                                    value={formData.nama}
                                    onChange={handleChange}
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={3}>
                                <Form.Label>NIM</Form.Label>
                            </Col>
                            <Col md={9}>
                                <Form.Control
                                    type="number"
                                    placeholder="Masukkan NIM"
                                    name="nim"
                                    value={formData.nim}
                                    onChange={handleChange} required /></Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={3}>
                                <Form.Label>Program Yang Diikuti</Form.Label>
                            </Col>
                            <Col md={9}>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan nama program"
                                    name="program"
                                    value={formData.program}
                                    onChange={handleChange}
                                    required /></Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={3}>
                                <Form.Label>Judul</Form.Label>
                            </Col>
                            <Col md={9}>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan judul" 
                                    name="judul"
                                    value={formData.judul}
                                    onChange={handleChange}
                                    required /></Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={3}>
                                <Form.Label>Mitra MSIB</Form.Label>
                            </Col>
                            <Col md={9}>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan nama mitra"
                                    name="mitra"
                                    value={formData.mitra}
                                    onChange={handleChange}
                                    required /></Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={3}>
                                <Form.Label>Tanggal Mulai</Form.Label>
                            </Col>
                            <Col md={9}>
                                <Form.Control
                                    type="date"
                                    name="tanggal_mulai"
                                    value={formData.tanggal_mulai}
                                    onChange={handleChange}
                                    required /></Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={3}>
                                <Form.Label>Tanggal Selesai</Form.Label>
                            </Col>
                            <Col md={9}>
                                <Form.Control
                                    type="date"
                                    name="tanggal_selesai"
                                    value={formData.tanggal_selesai}
                                    onChange={handleChange}
                                    required /></Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={3}>
                                <Form.Label>Lembar Pengesahan Pembimbing</Form.Label>
                            </Col>
                            <Col md={9}>
                                <Form.Control
                                    type="file"
                                    name="lembar_pengesahan"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                /></Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={3}>
                                <Form.Label>Laporan MSIB</Form.Label>
                            </Col>
                            <Col md={9}>
                                <Form.Control
                                    type="file"
                                    name="laporan"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                /></Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={3}>
                                <Form.Label>Projek</Form.Label>
                            </Col>
                            <Col md={9}>
                                <Form.Control
                                    type="file"
                                    name="projek"
                                    onChange={handleFileChange}
                                /></Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={3}>
                                <Form.Label>Lembar Nilai dan Sertifikat</Form.Label>
                            </Col>
                            <Col md={9}>
                                <Form.Control
                                    type="file"
                                    name="sertifikat"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                /></Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={3}>
                                <Form.Label>Konversi Nilai</Form.Label>
                            </Col>
                            <Col md={9}>
                                <Form.Control
                                    type="file"
                                    name="konversi_nilai"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                /></Col>
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

export default TambahMsib;
