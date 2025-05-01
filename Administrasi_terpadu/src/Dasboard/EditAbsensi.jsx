import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Alert, CardHeader } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditAbsensi = () => {
    const [dosenList, setDosenList] = useState([]);
    const [matakuliahList, setMataKuliahList] = useState([]);
    const [name, setName] = useState("");
    const [mata_kuliah, setMataKuliah] = useState("");
    const [jam_pelajaran, setJamPelajaran] = useState("");
    const [foto, setFoto] = useState("");
    const [msg, setMsg] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getMataKuliahList();
        getDosenList();
    }, []);

    const getMataKuliahList = async () => {
        try {
            const response = await axios.get("http://localhost:5000/mata_kuliah");
            setMataKuliahList(response.data);
        } catch (error) {
            console.error("Gagal mengambil daftar mata kuliah:", error);
        }
    };

    const getDosenList = async () => {
        try {
            const response = await axios.get("http://localhost:5000/dosen");
            setDosenList(response.data);
        } catch (error) {
            console.error("Gagal mengambil daftar dosen:", error);
        }
    };

    const handleFileChange = (e) => {
        setFoto(e.target.files[0]);
    };

    const updateAbsensi = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("mata_kuliah", mata_kuliah);
            formData.append("jam_pelajaran", jam_pelajaran);
            if (foto) {
                formData.append("foto", foto);
            }

            const token = localStorage.getItem("token"); 
            await axios.patch(`http://localhost:5000/absensi/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
            });

            navigate("/admin/dashboard/absensi");
        } catch (error) {
            console.error("Error saat memperbarui data:", error);
            setMsg("Terjadi kesalahan saat memperbarui data.");
        }
    };


    return (
        <Container fluid className="p-4">
            <Row className="align-items-center p-4">
                <Col>
                    <h2 className="mb-1 fw-bold text-white text-uppercase">Absensi</h2>
                    <p className="text-muted mb-0">Perbarui Data Absensi sistem Informasi</p>
                </Col>
            </Row>

            <Card className="shadow border-0">
                <CardHeader className="bg-white">
                    <h4 className="mb-0 fw-semibold">Edit Absensi</h4>
                </CardHeader>
                <Card.Body className="p-4">
                    {msg && (
                        <Alert variant="danger" className="mb-4">
                            {msg}
                        </Alert>
                    )}

                    <Form onSubmit={updateAbsensi}>
                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label>Nama</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Select value={name} onChange={(e) => setName(e.target.value)} required>
                                    <option value="">-- Pilih Dosen --</option>
                                    {dosenList.map((dosen) => (
                                        <option key={dosen.id} value={dosen.name}>{dosen.name}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label>Mata Kuliah</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Select value={mata_kuliah} onChange={(e) => setMataKuliah(e.target.value)} required>
                                    <option value="">Pilih Mata Kuliah</option>
                                    {matakuliahList.map((mata_kuliah) => (
                                        <option key={mata_kuliah.id} value={mata_kuliah.name}>{mata_kuliah.name}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label>Hari dan Jam Pelajaran</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan Hari dan Jam Pelajarang"
                                    value={jam_pelajaran}
                                    onChange={(e) => setJamPelajaran(e.target.value)}
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={3}><Form.Label>Foto </Form.Label></Col>
                            <Col md={8}>
                                <Form.Control 
                                type="file" 
                                onChange={handleFileChange} 
                                 />
                            </Col>
                        </Row>

                        <Card.Footer className="bg-white border-0 p-3 d-flex justify-content-end">
                            <Button variant="secondary" size="sm" className="me-2" onClick={() => navigate("/admin/dashboard/absensi")}>
                                Kembali
                            </Button>
                            <Button variant="primary" size="sm" type="submit">
                                Simpan Perubahan
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card.Body>
            </Card >
        </Container >
    );
};

export default EditAbsensi;
