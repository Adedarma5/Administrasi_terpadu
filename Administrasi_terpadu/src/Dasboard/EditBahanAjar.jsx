import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Alert, CardHeader } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditBahanAjar = () => {
  const [mataKuliahList, setMataKuliahList] = useState([]);
  const [dosenList, setDosenList] = useState([]);
  const [name, setName] = useState("");
  const [judul_materi, setJudulMateri] = useState("");
  const [dosen_pengampu, setDosenPengampu] = useState("");
  const [pertemuan, setPertemuan] = useState("");
  const [file_pendukung, setFilePendukung] = useState(null);
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
    setFilePendukung(e.target.files[0]);
  };

  const updateBahanAjar = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("judul_materi", judul_materi);
      formData.append("dosen_pengampu", dosen_pengampu);
      formData.append("pertemuan", pertemuan);
      if (file_pendukung) {
        formData.append("file_pendukung", file_pendukung);
      }

      await axios.patch(`http://localhost:5000/bahan_ajar/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/admin/dashboard/bahanajar");
    } catch (error) {
      console.error("Error saat memperbarui data:", error);
      setMsg("Terjadi kesalahan saat memperbarui data.");
    }
  };

  return (
    <Container fluid className="p-4">
      <Row className="align-items-center p-4">
        <Col>
          <h2 className="fw-bold text-white"> BAHAN AJAR</h2>
          <p className="text-muted">Perbarui Data Bahan Ajar</p>
        </Col>
      </Row>

      <Card className="shadow border-0">
        <CardHeader className="bg-white">
          <h5 className="mb-0 fw-semibold">Edit Bahan Ajar </h5>
        </CardHeader>
        <Card.Body>
          {msg &&
            <Alert variant="danger">{msg}
            </Alert>}

          <Form onSubmit={updateBahanAjar}>
            <Row className="mb-3">
              <Col md={3}>
                <Form.Label>Mata Kuliah</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Select value={name} onChange={(e) => setName(e.target.value)} required>
                  <option value="">Pilih Mata Kuliah</option>
                  {mataKuliahList.map((mata_kuliah) => (
                    <option key={mata_kuliah.id} value={mata_kuliah.name}>{mata_kuliah.name}</option>
                  ))}
                </Form.Select>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={3}><Form.Label>Judul Materi</Form.Label></Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  value={judul_materi}
                  onChange={(e) => setJudulMateri(e.target.value)}
                  required />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={3}><Form.Label>Dosen Pengampu</Form.Label></Col>
              <Col md={8}>
                <Form.Select value={dosen_pengampu} onChange={(e) => setDosenPengampu(e.target.value)} required>
                  <option value="">Pilih Dosen</option>
                  {dosenList.map((dosen) => (
                    <option key={dosen.id} value={dosen.name}>{dosen.name}</option>
                  ))}
                </Form.Select>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={3}><Form.Label>Pertemuan</Form.Label></Col>
              <Col md={8}>
                <Form.Select value={pertemuan} onChange={(e) => setPertemuan(e.target.value)} required>
                  <option value="">Pilih Pertemuan</option>
                  {[...Array(16).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>{num + 1}</option>
                  ))}
                </Form.Select>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={3}><Form.Label>File Pendukung (PDF)</Form.Label></Col>
              <Col md={8}>
                <Form.Control type="file" onChange={handleFileChange} accept=".pdf" />
              </Col>
            </Row>

            <Card.Footer className="bg-white border-0 p-3 d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={() => navigate("/admin/dashboard/bahanajar")}>
                Kembali
              </Button>
              <Button variant="primary" type="submit">Simpan Perubahan</Button>
            </Card.Footer>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditBahanAjar;
