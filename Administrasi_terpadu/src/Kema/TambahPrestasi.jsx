import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const TambahPrestasi = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nama: "",
        nim: "",
        kategori_peserta: "",
        tingkatan: "",
        nama_perlombaan: "",
        bidang_perlombaan: "",
    });

    const [files, setFiles] = useState({
        sertifikat: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFiles(prev => ({ ...prev, [name]: files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });
        Object.entries(files).forEach(([key, file]) => {
            if (file) data.append(key, file);
        });

        try {
            await axios.post("http://localhost:5000/prestasi", data, {
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
                kategori_peserta: "",
                tingkatan: "",
                nama_perlombaan: "",
                bidang_perlombaan: "",
            });
            setFiles({ sertifikat: null });

            navigate("/akademik/dashboard");

        } catch (error) {
            console.error("Gagal tambah data:", error);

            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: error.response?.data?.msg || 'Terjadi kesalahan saat menambahkan data.',
                position: 'center',
                showConfirmButton: true,
            });
        }
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
                    <Form onSubmit={handleSubmit}>
                        {[
                            { label: "Nama", name: "nama", placeholder: "Masukkan Nama Ketua" },
                            { label: "NIM", name: "nim", placeholder: "Masukkan NIM" },
                            { label: "Nama Perlombaan", name: "nama_perlombaan", placeholder: "Masukkan Nama Perlombaan" },
                            { label: "Bidang Perlombaan", name: "bidang_perlombaan", placeholder: "Masukkan Bidang Perlombaan" },
                        ].map(({ label, name, placeholder }) => (
                            <Row className="align-items-center mb-3" key={name}>
                                <Col md={3}><Form.Label>{label}</Form.Label></Col>
                                <Col md={8}>
                                    <Form.Control
                                        type="text"
                                        name={name}
                                        value={formData[name]}
                                        onChange={handleChange}
                                        placeholder={placeholder}
                                        required
                                    />
                                </Col>
                            </Row>
                        ))}

                        <Row className="align-items-center mb-3">
                            <Col md={3}><Form.Label>Kategori Peserta</Form.Label></Col>
                            <Col md={8}>
                                <Form.Select
                                    name="kategori_peserta"
                                    value={formData.kategori_peserta}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">-- Pilih Kategori --</option>
                                    <option value="Individu">Individu</option>
                                    <option value="Tim">Tim</option>
                                </Form.Select>
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}><Form.Label>Tingkatan</Form.Label></Col>
                            <Col md={8}>
                                <Form.Select
                                    name="tingkatan"
                                    value={formData.tingkatan}
                                    onChange={handleChange}
                                >
                                    <option value="">-- Pilih Tingkatan --</option>
                                    <option value="Internasional">Internasional</option>
                                    <option value="Nasional">Nasional</option>
                                    <option value="Provinsi">Provinsi</option>
                                </Form.Select>
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}><Form.Label>Sertifikat</Form.Label></Col>
                            <Col md={8}>
                                <Form.Control
                                    type="file"
                                    name="sertifikat"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                    required
                                />
                            </Col>
                        </Row>

                        <div className="ms-auto col-md-3 col-lg-2">
                            <Button type="submit" variant="primary" size="sm" className="py-2 px-4">
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
