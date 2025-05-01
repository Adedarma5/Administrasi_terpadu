import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Alert, CardHeader } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditKontrakKuliah = () => {
  const [dosenList, setDosenList] = useState([]);
  const [mataKuliahList, setMataKuliahList] = useState([]);
  const [nama_dosen, setNamaDosen] = useState("");
  const [mata_kuliah, setMataKuliah] = useState("");
  const [semester, setSemester] = useState("");
  const [file_kontrak_kuliah, setFileKontrakKuliah] = useState(null);
  const [msg, setMsg] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getDosen();
    getMataKuliah();
  }, []);



  const getDosen = async () => {
    const response = await axios.get("http://localhost:5000/dosen");
    setDosenList(response.data);
  };

  const getMataKuliah = async () => {
    const response = await axios.get("http://localhost:5000/mata_kuliah");
    setMataKuliahList(response.data);
  };

 

  const updateKontrakKuliah = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nama_dosen", nama_dosen);
    formData.append("mata_kuliah", mata_kuliah);
    formData.append("semester", semester);
    if (file_kontrak_kuliah) {
      formData.append("file_kontrak_kuliah", file_kontrak_kuliah);
    }

    try {
      await axios.patch(`http://localhost:5000/kontrak_kuliah/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      navigate("/admin/dashboard/kontrakkuliah");
    } catch (error) {
      setMsg("Gagal memperbarui kontrak kuliah.");
    }
  };
  

  return (
    <Container fluid className="p-4">
      <Row className="align-items-center p-4">
        <Col>
          <h2 className="mb-1 fw-bold text-white text-uppercase">Edit Kontrak Kuliah</h2>
          <p className="text-muted mb-0">Perbarui Data Kontrak Kuliah</p>
        </Col>
      </Row>

      <Card className="shadow border-0">
        <CardHeader className="bg-white">
          <h5 className="mb-0 fw-semibold">Edit Kontrak Kuliah</h5>
        </CardHeader>
        <Card.Body className="p-4">
          {msg && <Alert variant="danger">{msg}</Alert>}

          <Form onSubmit={updateKontrakKuliah}>
            <Row className="align-items-center mb-3">
              <Col md={3}><Form.Label>Nama Dosen</Form.Label></Col>
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
              <Col md={3}><Form.Label>Mata Kuliah</Form.Label></Col>
              <Col md={8}>
                <Form.Select value={mata_kuliah} onChange={(e) => setMataKuliah(e.target.value)} required>
                  <option value="">-- Pilih Mata Kuliah --</option>
                  {mataKuliahList.map((mk) => (
                    <option key={mk.id} value={mk.name}>{mk.name}</option>
                  ))}
                </Form.Select>
              </Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col md={3}><Form.Label>Semester</Form.Label></Col>
              <Col md={8}>
                <Form.Select value={semester} onChange={(e) => setSemester(e.target.value)} required>
                  <option value="">-- Pilih Semester --</option>
                  {Array.from({ length: 16 }, (_, i) => (
                    <option key={i + 1} value={`Semester ${i + 1}`}>
                      Semester {i + 1}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col md={3}><Form.Label>Ganti File Kontrak (PDF)</Form.Label></Col>
              <Col md={8}>
                <Form.Control
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFileKontrakKuliah(e.target.files[0])}
                />
              </Col>
            </Row>

            <Card.Footer className="bg-white border-0 p-3 d-flex justify-content-end">
              <Button variant="secondary" size="sm" className="me-2" onClick={() => navigate("/admin/dashboard/kontrakkuliah")}>
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

export default EditKontrakKuliah;
