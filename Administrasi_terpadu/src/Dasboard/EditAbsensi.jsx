import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Alert, CardHeader } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditAbsensi = () => {
    const [dosenList, setDosenList] = useState([]);
    const [matakuliahList, setMataKuliahList] = useState([]);
    const [name, setName] = useState("");
    const [mata_kuliah, setMataKuliah] = useState("");
    const [jam, setJam] = useState("");
    const [hari, setHari] = useState("");
    const [kelas, setKelas] = useState("");
    const [msg, setMsg] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const name = localStorage.getItem("name");
        if (name) setName(name);

        getMataKuliahList();
        getDosenList();
        getAbsensiById();
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

    const getAbsensiById = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/absensi/${id}`);
            const absensi = response.data;

            setName(absensi.name);
            setMataKuliah(absensi.mata_kuliah);
            setKelas(absensi.kelas);
            setHari(absensi.hari);
            setJam(absensi.jam);
        } catch (error) {
            console.error("Gagal mengambil data absensi:", error);
            setMsg("Terjadi kesalahan saat mengambil data absensi.");
        }
    };

    const updateAbsensi = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/absensi/${id}`, {
                name,
                mata_kuliah,
                kelas,
                hari,
                jam
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
                        {/* <Row className="align-items-center mb-3">
                            <Col md={3}><Form.Label>Nama Dosen</Form.Label></Col>
                            <Col md={8}>
                                <Form.Select value={name} onChange={(e) => setName(e.target.value)}>
                                    <option value="">-- Pilih Dosen Pengampu --</option>
                                    {dosenList.map((dosen) => (
                                        <option key={dosen.id} value={dosen.name}>{dosen.name}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Row> */}

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
                                <Form.Label>Kelas</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan Kelas"
                                    value={kelas}
                                    onChange={(e) => setKelas(e.target.value)}
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label>Hari</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan Hari "
                                    value={hari}
                                    onChange={(e) => setHari(e.target.value)}
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label>Jam</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan Jam Pelajarang"
                                    value={jam}
                                    onChange={(e) => setJam(e.target.value)}
                                    required
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
