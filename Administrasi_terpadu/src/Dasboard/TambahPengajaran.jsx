import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Alert, CardHeader } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TambahPengajaran = () => {
    const navigate = useNavigate();
    const [dosenList, setDosenList] = useState([]);
    const [matakuliahList, setMataKuliahList] = useState([]);
    const [nama_dosen, setNamaDosen] = useState("");
    const [mata_kuliah, setMataKuliah] = useState("");
    const [semester, setSemester] = useState("");
    const [kelas, setKelas] = useState("");
    const [metode_pengajaran, setMetodePengajaran] = useState("");
    const [keterlibatan_praktisi, setKeterlibatanPraktisi] = useState("");
    const [nama_praktisi, setNamaPraktisi] = useState("");
    const [institusi_praktisi, setInstitusiPraktisi] = useState("");
    const [file_pengajaran, setFilePengajaran] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        getDosen();
        getMataKuliah();
    }, []);

    const getDosen = async () => {
        try {
            const response = await axios.get("http://localhost:5000/dosen");
            setDosenList(response.data);
        } catch (error) {
            console.error("Gagal mengambil data dosen:", error);
        }
    };


    const getMataKuliah = async () => {
        try {
            const response = await axios.get("http://localhost:5000/mata_kuliah");
            setMataKuliahList(response.data);
        } catch (error) {
            console.error("Gagal mengambil data Mata Kuliah:", error);
        }
    };


    const TambahPengajaran = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nama_dosen", nama_dosen);
        formData.append("mata_kuliah", mata_kuliah);
        formData.append("semester", semester);
        formData.append("kelas", kelas);
        formData.append("metode_pengajaran", metode_pengajaran);
        formData.append("keterlibatan_praktisi", keterlibatan_praktisi);
        formData.append("nama_praktisi", nama_praktisi);
        formData.append("institusi_praktisi", institusi_praktisi);
        formData.append("file_pengajaran", file_pengajaran);

        const token = localStorage.getItem('token');
        axios.post("http://localhost:5000/pengajaran", formData, {
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` }
        }).then(response => {
            console.log(response.data);
            navigate("/admin/dashboard/pengajaran");
        }).catch(error => {
            console.error(error.response.data);

        });
    };

    return (
        <Container fluid className="p-4">
                    <Row className="align-items-center p-4">
                        <Col>
                            <h2 className="mb-1 fw-bold text-white text-uppercase">PENGAJARAN</h2>
                            <p className="text-muted mb-0">Daftar Mata Kuliah yang Diajar oleh Dosen</p>
                        </Col>
                    </Row>
            <Card className="shadow border-0">
                <Card.Header>
                <h5 className="mb-0 fw-semibold">Tambah Pengajaran </h5>
                </Card.Header>
                <Card.Body className="p-4">

                    <Form onSubmit={TambahPengajaran} >
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
                                <Form.Label >Mata Kuliah </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Select
                                    value={mata_kuliah}
                                    onChange={(e) => setMataKuliah(e.target.value)}
                                    required
                                >
                                    <option value="">-- Pilih Mata Kuliah  --</option>
                                    {matakuliahList.map((mata_kuliah) => (
                                        <option key={mata_kuliah.id} value={mata_kuliah.name}>{mata_kuliah.name}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Semester </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Select
                                    value={semester}
                                    onChange={(e) => setSemester(e.target.value)}
                                    required
                                >
                                    <option value="">-- Pilih Semester </option>
                                    <option value="Semester Ganjil">Semester Ganjil </option>
                                    <option value="Semester Genap">Semester Genap</option>
                                </Form.Select>
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Kelas </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    value={kelas}
                                    onChange={(e) => setKelas(e.target.value)}
                                    placeholder="Masukkan Kelas Yang di Ajar"
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-4">
                            <Col md={3}>
                                <Form.Label >Metode Pengajaran </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Select
                                    value={metode_pengajaran}
                                    onChange={(e) => setMetodePengajaran(e.target.value)}
                                    required
                                >
                                    <option value="">-- Pilih Metode --</option>
                                    <option value="Case Study">Case Study</option>
                                    <option value="Project Based Learning">Project Based Learning</option>
                                    <option value="Regular">Regular</option>
                                </Form.Select>
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-4">
                            <Col md={3}>
                                <Form.Label >Keterlibatan Praktisi </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Select
                                    value={keterlibatan_praktisi}
                                    onChange={(e) => setKeterlibatanPraktisi(e.target.value)}
                                >
                                    <option value="">-- Pilih Keterlibatan Praktisi --</option>
                                    <option value="Ya">Ya</option>
                                    <option value="Tidak">Tidak</option>
                                </Form.Select>
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-4">
                            <Col md={3}>
                                <Form.Label >Nama Praktisi </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    value={nama_praktisi}
                                    onChange={(e) => setNamaPraktisi(e.target.value)}
                                    placeholder="Masukkan Nama Praktisi Kalau Ada"
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-4">
                            <Col md={3}>
                                <Form.Label >Institusi Praktisi </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    value={institusi_praktisi}
                                    onChange={(e) => setInstitusiPraktisi(e.target.value)}
                                    placeholder="Masukkan Institusi Praktisi"
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-4">
                            <Col md={3}>
                                <Form.Label >File Pengajaran </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="file"
                                    onChange={(e) => setFilePengajaran(e.target.files[0])}
                                    required
                                />
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>

                <Card.Footer className="bg-white border-0 p-3 d-flex justify-content-end">
                    <Button variant="secondary" size="sm" className="me-2" onClick={() => navigate("/admin/dashboard/pengajaran")}>
                        Kembali
                    </Button>
                    <Button variant="primary" size="sm" type="submit" onClick={TambahPengajaran}>
                        Tambah
                    </Button>
                </Card.Footer>
            </Card>

        </Container>
    );

};

export default TambahPengajaran;