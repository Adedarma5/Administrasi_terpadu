import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Alert, CardHeader } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TambahBahanAjar = () => {
  const [mataKuliahList, setMataKuliahList] = useState([]);
  const [dosenList, setDosenList] = useState([]);
  const [name, setName] = useState("");
  const [judul_materi, setJudulMateri] = useState("");
  const [dosen_pengampu, setDosenPengampu] = useState("");
  const [pertemuan, setPertemuan] = useState("");
  const [file_pendukung, setFilePendukung] = useState(null);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getMataKuliah();
    getDosen();
  }, []);

  const getMataKuliah = async () => {
    try {
      const response = await axios.get("http://localhost:5000/mata_kuliah");
      setMataKuliahList(response.data);
    } catch (error) {
      console.error("Gagal mengambil data mata kuliah:", error);
    }
  };

  const getDosen = async () => {
    try {
      const response = await axios.get("http://localhost:5000/dosen");
      setDosenList(response.data);
    } catch (error) {
      console.error("Gagal mengambil data dosen:", error);
    }
  };

  const TambahBahanAjar = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("judul_materi", judul_materi);
    formData.append("dosen_pengampu", dosen_pengampu);
    formData.append("pertemuan", pertemuan);
    formData.append("file_pendukung", file_pendukung);

    const token = localStorage.getItem('token'); 
    axios.post("http://localhost:5000/bahan_ajar", formData, {
      headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` }
    }).then(response => {
      console.log(response.data);
      navigate("/admin/dashboard/bahanajar");
    }).catch(error => {
      console.error(error.response.data);

    });
  };

  return (
    <Container fluid className="p-4">
      <Row className="align-items-center p-4">
        <Col>
          <h2 className="mb-1 fw-bold text-white">BAHAN AJAR</h2>
          <p className="text-muted mb-0">Tambah Bahan Ajar</p>
        </Col>
      </Row>

      <Card className="shadow border-0">
        <CardHeader className="bg-white">
        <h5 className="mb-0 fw-semibold">Tambah Bahan Ajar</h5>
        </CardHeader>
        <Card.Body className="p-4">
          {msg && <Alert variant="danger" className="mb-4">{msg}</Alert>}

          <Form onSubmit={TambahBahanAjar}>
            <Row className="align-items-center mb-3">
              <Col md={3}>
                <Form.Label>Nama Mata Kuliah</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Select
                  value={name}
                  onChange={(e) => setName(e.target.value)} required>
                  <option value="">-- Pilih Mata Kuliah --</option>
                  {mataKuliahList.map((mata_kuliah) => (
                    <option key={mata_kuliah.id} value={mata_kuliah.name}>{mata_kuliah.name}</option>
                  ))}
                </Form.Select>
              </Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col md={3}>
                <Form.Label>Judul Materi</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  value={judul_materi}
                  onChange={(e) => setJudulMateri(e.target.value)}
                  placeholder="Masukkan judul materi"
                  required
                />
              </Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col md={3}>
                <Form.Label>Dosen Pengampu</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Select value={dosen_pengampu} onChange={(e) => setDosenPengampu(e.target.value)} required>
                  <option value="">-- Pilih Dosen Pengampu --</option>
                  {dosenList.map((dosen) => (
                    <option key={dosen.id} value={dosen.name}>{dosen.name}</option>
                  ))}
                </Form.Select>
              </Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col md={3}>
                <Form.Label>Pertemuan</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Select value={pertemuan} onChange={(e) => setPertemuan(e.target.value)} required>
                  <option value="">-- Pilih Pertemuan --</option>
                  {[...Array(16).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>{num + 1}</option>
                  ))}
                </Form.Select>
              </Col>
            </Row>

            <Row className="align-items-center mb-4">
              <Col md={3}>
                <Form.Label>File Pendukung</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFilePendukung(e.target.files[0])}
                  required
                />
              </Col>
            </Row>

            <Card.Footer className="bg-white border-0 p-3 d-flex justify-content-end">
              <Button variant="secondary" size="sm" className="me-2" onClick={() => navigate("/admin/dashboard/BahanAjar")}>
                Kembali
              </Button>
              <Button variant="primary" size="sm" type="submit">
                Tambah
              </Button>
            </Card.Footer>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TambahBahanAjar;
