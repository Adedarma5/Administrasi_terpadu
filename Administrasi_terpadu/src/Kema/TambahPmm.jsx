import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";

const TammbahPmm = () => {
    const navigate = useNavigate();
    const [nama, setNama] = useState("");
    const [nim, setNim] = useState("");
    const [stambuk, setStambuk] = useState("");
    const [nama_universitas, setNamaUniversitas] = useState("");
    const [konversi_nilai, setKonversiNilai] = useState(null);
    const [msg, setMsg] = useState("");

    const TambahPmm = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("nama", nama);
        formData.append("nim", nim);
        formData.append("stambuk", stambuk);
        formData.append("nama_universitas", nama_universitas);
        formData.append("konversi_nilai", konversi_nilai);

        try {
            const response = await axios.post("http://localhost:5000/pmm", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            console.log("Upload berhasil:", response.data);
            navigate("/akademik/dashboard");
        } catch (error) {
            setMsg(error.response?.data?.msg || "Terjadi kesalahan");
            console.error("Error saat upload:", error);
        }
    };


    return (
        <Container fluid className="p-4">
            <Row className="align-items-center p-4">
                <Col>
                    <h2 className="mb-1 fw-bold text-white text-uppercase">Pertukaran Mahasiswa Merdeka</h2>
                    <p className="text-muted mb-0">Daftar PMM Mahasiswa Sistem Informasi </p>
                </Col>
            </Row>


            <Card className="shadow border-0">
                <Card.Header>
                    <h5 className="mb-0 fw-semibold">Tambah Data PMM </h5>
                </Card.Header>
                <Card.Body className="p-4">

                    <Form onSubmit={TambahPmm}  >
                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Nama </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan Nama"
                                    value={nama}
                                    onChange={(e) => setNama (e.target.value)}
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
                                    value={nim}
                                    onChange={(e) => setNim (e.target.value)}
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col md={3}>
                                <Form.Label >Stambuk </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan Stambuk"
                                    value={stambuk}
                                    onChange={(e) => setStambuk (e.target.value)}
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-4">
                            <Col md={3}>
                                <Form.Label>Nama Universitas PMM </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    value={nama_universitas}
                                    onChange={(e) => setNamaUniversitas (e.target.value)}
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
                                    onChange={(e) => setKonversiNilai (e.target.files[0])}
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

export default TammbahPmm;