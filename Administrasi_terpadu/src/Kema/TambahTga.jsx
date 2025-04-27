import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";

const TambahTga = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nama: "",
        nim: "",
        no_hp: "",
    });

    const [files, setFiles] = useState({
        skripsi: null,
        program_tga: null,
        jurnal_sisfo: null,
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

            const response = await axios.post("http://localhost:5000/tugas_akhir", data, {
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
                    <h2 className="mb-1 fw-bold text-white text-uppercase">Tugas Akhir</h2>
                    <p className="text-muted mb-0">Daftar Tugas Akhir Mahasiswa Sistem Informasi </p>
                </Col>
            </Row>


            <Card className="shadow border-0">
                <Card.Header>
                    <h5 className="mb-0 fw-semibold">Tambah Tugas Akhir </h5>
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
                                <Form.Label >No HP </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="number"
                                    placeholder="Masukkan No HP yang Masih Aktif"
                                    name="no_hp"
                                    value={formData.no_hp}
                                    onChange={handleChange}
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-4">
                            <Col md={3}>
                                <Form.Label>Skripsi Versi Distribusi </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="file"
                                    accept=".pdf"
                                    name="skripsi"
                                    onChange={handleFileChange}
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-4">
                            <Col md={3}>
                                <Form.Label>Program TGA </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="file"
                                    accept=".pdf"
                                    name="program_tga"
                                    onChange={handleFileChange}
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-4">
                            <Col md={3}>
                                <Form.Label >Jurnal Skripsi Dengan Format Sisfo </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="file"
                                    accept=".pdf"
                                    name="jurnal_sisfo"
                                    onChange={handleFileChange}
                                    required
                                />
                            </Col>
                        </Row>
                        <div className="ms-auto col-md-3 col-lg-2">
                            <Button className=" shadow py-2 px-4" variant="success" size="sm" type="submit" >
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

export default TambahTga;