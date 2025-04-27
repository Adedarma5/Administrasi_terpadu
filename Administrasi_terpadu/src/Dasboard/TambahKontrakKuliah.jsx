import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Alert, CardHeader } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TambahKontrakKuliah = () => {
    const [dosenList, setDosenList] = useState([]);
    const [mataKuliahList, setMataKuliahList] = useState([]);
    const [nama_dosen, setNamaDosen] = useState("");
    const [mata_kuliah, setMataKuliah] = useState("");
    const [semester, setSemester] = useState("");
    const [file_kontrak_kuliah, setFileKontrakKuliah] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

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
            console.error("Gagal mengambil data mata kuliah:", error);
        }
    };

    const TambahKontrakKuliah = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nama_dosen", nama_dosen);
        formData.append("mata_kuliah", mata_kuliah);
        formData.append("semester", semester);
        formData.append("file_kontrak_kuliah", file_kontrak_kuliah);

        axios.post("http://localhost:5000/kontrak_kuliah", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        }).then(response => {
            console.log(response.data);
            navigate("/admin/dashboard/kontrakkuliah");
        }).catch(error => {
            console.error(error.response.data);

        });
    };

    return (
        <Container fluid className="p-4">
            <Row className="align-items-center p-4">
                <Col>
                    <h2 className="mb-1 fw-bold text-white text-uppercase">Kontrak Kuliah</h2>
                    <p className="text-muted mb-0">Tambah Kontrak Kuliah Sistem Informasi</p>
                </Col>
            </Row>

            <Card className="shadow border-0">
                <CardHeader className="bg-white">
                    <h5 className="mb-0 fw-semibold">Tambah Kontrak Kuliah </h5>
                </CardHeader>
                <Card.Body className="p-4">
                    {msg && (
                        <Alert variant="danger" className="mb-4">
                            {msg}
                        </Alert>
                    )}

                    <Form onSubmit={TambahKontrakKuliah}>
                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Nama Dosen</Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Select value={nama_dosen} onChange={(e) => setNamaDosen(e.target.value)} required>
                                    <option value="">-- Pilih Dosen Pengampu --</option>
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
                                    onChange={(e) => setMataKuliah(e.target.value)} required>
                                    <option value="">-- Pilih Mata Kuliah --</option>
                                    {mataKuliahList.map((mata_kuliah) => (
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
                                    type="text"
                                    value={semester}
                                    onChange={(e) => setSemester(e.target.value)}>
                                        <option value="">-- Pilih Semester --</option>
                                    {Array.from({ length: 8 }, (_, i) => (
                                        <option key={i + 1} value={`Semester ${i + 1}`}>
                                            Semester {i + 1}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Kontrak Kuliah (PDF) </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => setFileKontrakKuliah(e.target.files[0])}
                                    required
                                />
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>

                <Card.Footer className="bg-white border-0 p-3 d-flex justify-content-end">
                    <Button variant="secondary" size="sm" className="me-2" onClick={() => navigate("/admin/dashboard/kontrakkuliah")}>
                        Kembali
                    </Button>
                    <Button variant="primary" size="sm" onClick={TambahKontrakKuliah}>
                        Tambah
                    </Button>
                </Card.Footer>
            </Card>

        </Container>
    );

};

export default TambahKontrakKuliah;