import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const TambahKerjaPraktik = () => {
    const navigate = useNavigate();
    const [dosenList, setDosenList] = useState([]);

    useEffect(() => {
        getDosen();
    }, [])

    const getDosen = async () => {
        try {
            const response = await axios.get("http://localhost:5000/dosen");
            setDosenList(response.data);
        } catch (error) {
            console.error("Gagal mengambil data Dosen:", error);
        }
    };

    const [formData, setFormData] = useState({
        nama: "",
        nim: "",
        dosen_pembimbing: "",
        judul: "",
        tempat_kp: "",
        nama_perusahaan: "",
        tanggal_mulai: "",
        tanggal_selesai: "",
    });

    const [files, setFiles] = useState({
        krs_terakhir: null,
        pengesahan_prodi: null,
        pengesahan_pembimbing: null,
        nilai_perusahaan: null,
        daftar_hadir: null,
        laporan: null,
        projek: null,
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

            const response = await axios.post("http://localhost:5000/kerja_praktik", data, {
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
                dosen_pembimbing: "",
                judul: "",
                tempat_kp: "",
                nama_perusahaan: "",
                tanggal_mulai: "",
                tanggal_selesai: "",
            });
            setFiles({
                krs_terakhir: null,
                pengesahan_prodi: null,
                pengesahan_pembimbing: null,
                nilai_perusahaan: null,
                daftar_hadir: null,
                laporan: null,
                projek: null,
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
                    <h2 className="mb-1 fw-bold text-white text-uppercase">Kerja Praktik</h2>
                    <p className="text-muted mb-0">Daftar Kerja Praktik Mahasiswa Sistem Informasi </p>
                </Col>
            </Row>


            <Card className="shadow border-0">
                    <Card.Header>
                        <h5 className="mb-0 fw-semibold">Tambah Kerja Praktik </h5>
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
                                    type="number"
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
                                <Form.Label >Dosen Pembimbing </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Select
                                    name="dosen_pembimbing"
                                    value={formData.dosen_pembimbing}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">-- Pilih Dosen Pembimbing --</option>
                                    {dosenList.map((dosen) => (
                                        <option key={dosen.id} value={dosen.name}>{dosen.name}</option>
                                    ))}
                                </Form.Select>
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
                                <Form.Label >Nama Perusahaan Tempat Kp </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan Nama Tempat Kerja Praktik"
                                    name="tempat_kp"
                                    value={formData.tempat_kp}
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
                                <Form.Label>Krs Terakhir </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="file"
                                    accept=".pdf"
                                    name="krs_terakhir"
                                    onChange={handleFileChange}
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-4">
                            <Col md={3}>
                                <Form.Label>Pengesahan Prodi </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="file"
                                    accept=".pdf"
                                    name="pengesahan_prodi"
                                    onChange={handleFileChange}
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-4">
                            <Col md={3}>
                                <Form.Label>Pengesahan Pembimbing </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="file"
                                    accept=".pdf"
                                    name="pengesahan_pembimbing"
                                    onChange={handleFileChange}
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-4">
                            <Col md={3}>
                                <Form.Label >Lembar Nilai Perusahaan </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="file"
                                    accept=".pdf"
                                    name="nilai_perusahaan"
                                    onChange={handleFileChange}
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-4">
                            <Col md={3}>
                                <Form.Label >Daftar Hadir Di Tempat KP </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="file"
                                    accept=".pdf"
                                    name="daftar_hadir"
                                    onChange={handleFileChange}
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-4">
                            <Col md={3}>
                                <Form.Label >Laporan </Form.Label>
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

                        <Row className="align-items-center mb-4">
                            <Col md={3}>
                                <Form.Label >Projek  </Form.Label>
                            </Col> :
                            <Col md={8}>
                                <Form.Control
                                    type="file"
                                    name="projek"
                                    onChange={handleFileChange}
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

export default TambahKerjaPraktik;