import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Alert, CardHeader } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TambahPengabdian = () => {
    const navigate = useNavigate();
    const [dosenList, setDosenList] = useState([]);
    const [judul_pengabdian, setJudulPengabdian] = useState("");
    const [nama_dosen, setNamaDosen] = useState("");
    const [mitra, setMitra] = useState("");
    const [bentuk_kegiatan, setBentukKegiatan] = useState("");
    const [lokasi, setLokasi] = useState("");
    const [tahun, setTahun] = useState("");
    const [file_kegiatan, setFileKegiatan] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        getDosen();
    }, []);

    const getDosen = async () => {
        try {
            const response = await axios.get("http://localhost:5000/dosen");
            setDosenList(response.data);
        } catch (error) {
            console.error("Gagal mengambil data dosen:", error);
        }
    };

    const TambahPengabdian = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("judul_pengabdian", judul_pengabdian);
        formData.append("nama_dosen", nama_dosen);
        formData.append("mitra", mitra);
        formData.append("bentuk_kegiatan", bentuk_kegiatan);
        formData.append("lokasi", lokasi);
        formData.append("tahun", tahun);
        formData.append("file_kegiatan", file_kegiatan);

        const token = localStorage.getItem('token');
        axios.post("http://localhost:5000/pengabdian", formData, {
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` }
        }).then(response => {
            console.log(response.data);
            navigate("/admin/dashboard/pengabdian");
        }).catch(error => {
            console.error(error.response.data);

        });
    };

    return (
        <Container fluid className="p-4">
            <Row className="align-items-center p-4">
                <Col>
                    <h2 className="mb-1 fw-bold text-white">PENGABDIAN</h2>
                    <p className="text-muted mb-0">Daftar Pengabdian Dosen</p>
                </Col>
            </Row>

            <Card className="shadow border-0">
                <Card.Header>
                    <h5 className="fw-semibold mb-0">Tambah Pengabdian </h5>
                </Card.Header>
                <Card.Body className="p-4">
                    {msg && (
                        <Alert variant="danger" className="mb-4">
                            {msg}
                        </Alert>
                    )}

                    <Form onSubmit={TambahPengabdian}>
                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Judul Pengabdian </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    as="textarea"
                                    value={judul_pengabdian}
                                    onChange={(e) => setJudulPengabdian(e.target.value)}
                                    placeholder="Masukkan Judul Pengabdian"
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Nama Dosen </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Select
                                    value={nama_dosen}
                                    onChange={(e) => setNamaDosen(e.target.value)}
                                    required
                                >
                                    <option value="">-- Pilih Dosen  --</option>
                                    {dosenList.map((dosen) => (
                                        <option key={dosen.id} value={dosen.name}>{dosen.name}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Mitra </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    value={mitra}
                                    onChange={(e) => setMitra(e.target.value)}
                                    placeholder="Masukkan Mitra"
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label> Bentuk Kegiatan </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Select
                                    value={bentuk_kegiatan}
                                    onChange={(e) => setBentukKegiatan(e.target.value)}
                                >
                                    <option value="">-- Pilih Kegiatan </option>
                                    <option value="Pelatihan Masyarakat">Pelatihan Masyarakat</option>
                                    <option value="Workshop">Workshop</option>
                                    <option value="Seminar/Penyuluhan">Seminar/Penyuluhan</option>
                                    <option value="	Bimbingan Teknis (Bimtek)">	Bimbingan Teknis (Bimtek)</option>
                                </Form.Select>
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Lokasi </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    value={lokasi}
                                    onChange={(e) => setLokasi(e.target.value)}
                                    placeholder="Masukkan Lokasi Kegiatan"
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Tahun </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="number"
                                    value={tahun}
                                    onChange={(e) => setTahun(e.target.value)}
                                    placeholder="Masukkan Tahun Kegiatan"
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-4">
                            <Col md={3}>
                                <Form.Label >File Kegiatan (PDF) </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => setFileKegiatan(e.target.files[0])}
                                    required
                                />
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>

                <Card.Footer className="bg-white border-0 p-3 d-flex justify-content-end">
                    <Button variant="secondary" size="sm" className="me-2" onClick={() => navigate("/admin/dashboard/pengabdian")}>
                        Kembali
                    </Button>
                    <Button variant="primary" size="sm" onClick={TambahPengabdian} >
                        Tambah
                    </Button>
                </Card.Footer>
            </Card>

        </Container>
    );

};

export default TambahPengabdian;