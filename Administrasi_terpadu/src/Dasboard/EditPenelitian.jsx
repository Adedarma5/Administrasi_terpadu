    import React, { useState, useEffect } from "react";
    import { Container, Row, Col, Card, Form, Button, Alert, CardHeader } from "react-bootstrap";
    import { useNavigate, useParams } from "react-router-dom";
    import axios from "axios";

    const EditPenelitian = () => {
        const [dosenList, setDosenList] = useState([]);
        const [judul_penelitian, setJudulPenelitian] = useState("");
        const [nama_dosen, setNamaDosen] = useState("");
        const [ketua_tim, setKetuaTim] = useState("");
        const [anggota_tim, setAnggotaTim] = useState("");
        const [file_laporan, setFileLaporan] = useState("");
        const [msg, setMsg] = useState("");
        const { id } = useParams();
        const navigate = useNavigate();

        useEffect(() => {
            getDosenList();
            getPenelitianById();
        }, []);

        const getDosenList = async () => {
            try {
                const response = await axios.get("http://localhost:5000/dosen");
                setDosenList(response.data);
            } catch (error) {
                console.error("Gagal mengambil daftar Dosen:", error);
            }
        };

        const getPenelitianById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/penelitian/${id}`);

                const penelitian = response.data;
                setJudulPenelitian(penelitian.judul_penelitian);
                setNamaDosen(penelitian.nama_dosen);
                setKetuaTim(penelitian.ketua_tim);
                setAnggotaTim(penelitian.anggota_tim);
            } catch (error) {
                console.error("Gagal mengambil data bahan ajar:", error);
                setMsg("Terjadi kesalahan saat mengambil data bahan ajar.");
            }
        };

        const handleFileChange = (e) => {
            setFileLaporan(e.target.files[0]);
        };

        const updatePenelitian = async (e) => {
            e.preventDefault();
            try {
                const formData = new FormData();
                formData.append("judul_penelitian", judul_penelitian);
                formData.append("nama_dosen", nama_dosen);
                formData.append("ketua_tim", ketua_tim);
                formData.append("anggota_tim", anggota_tim);
                if (file_laporan) {
                    formData.append("file_laporan", file_laporan);
                }

                await axios.patch(`http://localhost:5000/penelitian/${id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                navigate("/admin/dashboard/penelitian");
            } catch (error) {
                console.error("Error saat memperbarui data:", error);
                setMsg("Terjadi kesalahan saat memperbarui data.");
            }
        };


        return (
            <Container fluid className="p-4">
                <Row className="align-items-center p-4">
                    <Col>
                        <h2 className="mb-1 fw-bold text-uppercase text-white">Penelitian</h2>
                        <p className="text-muted mb-0">Perbarui Data RPS sistem Informasi</p>
                    </Col>
                </Row>

                <Card className="shadow border-0">
                    <CardHeader className="bg-white">
                        <h5 className="mb-0 fw-semibold">Edit Penelitian</h5>
                    </CardHeader>
                    <Card.Body className="p-4">
                        {msg && (
                            <Alert variant="danger" className="mb-4">
                                {msg}
                            </Alert>
                        )}

                        <Form onSubmit={updatePenelitian}>
                            <Row className="align-items-center mb-3">
                                <Col md={3}>
                                    <Form.Label>Judul Penelitian</Form.Label></Col>
                                <Col md={8}>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={judul_penelitian}
                                        onChange={(e) => setJudulPenelitian(e.target.value)}
                                        required />
                                </Col>
                            </Row>

                            <Row className="align-items-center mb-3">
                                <Col md={3}>
                                    <Form.Label>Nama Dosen</Form.Label>
                                </Col>
                                <Col md={8}>
                                    <Form.Select value={nama_dosen} onChange={(e) => setNamaDosen(e.target.value)} required>
                                        <option value="">-- Pilih Dosen --</option>
                                        {dosenList.map((dosen) => (
                                            <option key={dosen.id} value={dosen.name}>{dosen.name}</option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Row>

                            <Row className="align-items-center mb-3">
                                <Col md={3}>
                                    <Form.Label>Ketua Tim</Form.Label></Col>
                                <Col md={8}>
                                    <Form.Control
                                        type="area"
                                        value={ketua_tim}
                                        onChange={(e) => setKetuaTim(e.target.value)}
                                        required />
                                </Col>
                            </Row>

                            <Row className="align-items-center mb-3">
                                <Col md={3}>
                                    <Form.Label>Anggota Tim</Form.Label></Col>
                                <Col md={8}>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={anggota_tim}
                                        onChange={(e) => setAnggotaTim(e.target.value)}
                                        required />
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col md={3}><Form.Label>File Laporan (PDF)</Form.Label></Col>
                                <Col md={8}>
                                    <Form.Control 
                                    type="file" 
                                    accept=".pdf" 
                                    onChange={handleFileChange} 
                                    />
                                </Col>
                            </Row>

                            <Card.Footer className="bg-white border-0 p-3 d-flex justify-content-end">
                                <Button variant="secondary" size="sm" className="me-2" onClick={() => navigate("/admin/dashboard/penelitian")}>
                                    Kembali
                                </Button>
                                <Button variant="primary" size="sm" type="submit">
                                    Simpan Perubahan
                                </Button>
                            </Card.Footer>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        );
    };

    export default EditPenelitian;
