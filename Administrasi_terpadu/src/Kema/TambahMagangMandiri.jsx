import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";

const TambahMagangMandiri = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nama: "",
        nim: "",
        judul: "",
        nama_perusahaan: "",
        tanggal_mulai: "",
        tanggal_selesai: "",
    });

    const [files, setFiles] = useState({
        sertifikat: null,
        konversi_nilai: null,
        laporan: null,
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

            const response = await axios.post("http://localhost:5000/magang_mandiri", data, {
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
                judul: "",
                nama_perusahaan: "",
                tanggal_mulai: "",
                tanggal_selesai: "",
            });
            setFiles({
                sertifikat: null,
                konversi_nilai: null,
                laporan: null,
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
                    <h2 className="mb-1 fw-bold text-white text-uppercase">Magang Mandiri</h2>
                    <p className="text-muted mb-0">Daftar Magang Mandiri Mahasiswa Sistem Informasi </p>
                </Col>
            </Row>


            <Card className="shadow border-0">
                <Card.Header>
                    <h5 className="mb-0 fw-semibold">Tambah Magang Mandiri </h5>
                </Card.Header>
                <Card.Body className="p-4">

                    <Form onSubmit={handleSubmit} >
                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Nama </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan Nama"
                                    name="nama"
                                    value={formData.nama}
                                    onChange={handleChange}
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
                                    name="nim"
                                    value={formData.nim}
                                    onChange={handleChange}
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
                                    name="judul"
                                    value={formData.judul}
                                    onChange={handleChange}
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
                                    name="nama_perusahaan"
                                    value={formData.nama_perusahaan}
                                    onChange={handleChange}
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
                                    name="tanggal_mulai"
                                    value={formData.tanggal_mulai}
                                    onChange={handleChange}
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
                                    name="tanggal_selesai"
                                    value={formData.tanggal_selesai}
                                    onChange={handleChange}
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-4">
                            <Col md={3}>
                                <Form.Label>Sertifikat </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="file"
                                    accept=".pdf"
                                    name="sertifikat"
                                    onChange={handleFileChange}
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-4">
                            <Col md={3}>
                                <Form.Label>Konversi Nilai </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="file"
                                    accept=".pdf"
                                    name="konversi_nilai"
                                    onChange={handleFileChange}
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
                                    accept=".pdf"
                                    name="laporan"
                                    onChange={handleFileChange}
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

                <Card.Footer className="bg-white border-0 p-3 d-flex justify-content-end">

                </Card.Footer>
            </Card>

        </Container>
    );

};

export default TambahMagangMandiri;