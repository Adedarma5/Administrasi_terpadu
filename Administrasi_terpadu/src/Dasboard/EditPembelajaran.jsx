import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Alert, CardHeader } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditPembelajaran = () => {
  const [dosenList, setDosenList] = useState([]);
  const [rpsList, setRpsList] = useState([]);
  const [nama_dosen, setNamaDosen] = useState("");
  const [mata_kuliah, setMataKuliah] = useState("");
  const [semester, setSemester] = useState("");
  const [file_kontrak_kuliah, setFileKontrakKuliah] = useState(null);
  const [file_rps, setFileRps] = useState(null);
  const [msg, setMsg] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) setNamaDosen(name);

    getRpsList();
    getDosen();
    getPembelajaranMataKuliahById();
  }, []);

  const getDosen = async () => {
    const response = await axios.get("http://localhost:5000/dosen");
    setDosenList(response.data);
  };

  const getRpsList = async () => {
    try {
      const response = await axios.get("http://localhost:5000/rps");
      setRpsList(response.data);
    } catch (error) {
      console.error("Gagal mengambil data RPS:", error);
    }
  };

  const handleMataKuliahChange = async (selected) => {
    setMataKuliah(selected);
    setFileRps(null);

    const rps = rpsList.find(item => item.name === selected);
    if (rps && rps.file_rps) {
      try {
        const fileUrl = `http://localhost:5000/uploads/rps/${rps.file_rps}`;
        const fileBlob = await fetch(fileUrl).then(r => r.blob());
        const file = new File([fileBlob], rps.file_rps, { type: "application/pdf" });
        setFileRps(file);
      } catch (err) {
        console.error("Gagal memuat file RPS:", err);
      }
    }
  };

  const getPembelajaranMataKuliahById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/pembelajaran_mata_kuliah/${id}`);
      const data = response.data;

      setNamaDosen(data.nama_dosen);
      setMataKuliah(data.mata_kuliah);
      setSemester(data.semester);

      await handleMataKuliahChange(data.mata_kuliah);
    } catch (error) {
      console.error("Gagal mengambil data pembelajaran:", error);
      setMsg("Terjadi kesalahan saat mengambil data pembelajaran.");
    }
  };

  const updatePembelajaranMataKuliah = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nama_dosen", nama_dosen);
    formData.append("mata_kuliah", mata_kuliah);
    formData.append("semester", semester);
    if (file_kontrak_kuliah) formData.append("file_kontrak_kuliah", file_kontrak_kuliah);
    if (file_rps) formData.append("file_rps", file_rps);

    try {
      await axios.patch(`http://localhost:5000/pembelajaran_mata_kuliah/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      navigate("/admin/dashboard/pembelajaranmatakuliah");
    } catch (error) {
      setMsg("Gagal memperbarui kontrak kuliah.");
    }
  };

  return (
    <Container fluid className="p-4">
      <Row className="align-items-center p-4">
        <Col>
          <h2 className="mb-1 fw-bold text-white text-uppercase">Edit Pembelajaran Mata Kuliah</h2>
          <p className="text-muted mb-0">Perbarui Data Pembelajaran Mata Kuliah</p>
        </Col>
      </Row>

      <Card className="shadow border-0">
        <CardHeader className="bg-white">
          <h5 className="mb-0 fw-semibold">Edit Pembelajaran Mata Kuliah</h5>
        </CardHeader>
        <Card.Body className="p-4">
          {msg && <Alert variant="danger">{msg}</Alert>}

          <Form onSubmit={updatePembelajaranMataKuliah}>
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
                <Form.Select
                  value={mata_kuliah}
                  onChange={(e) => handleMataKuliahChange(e.target.value)}
                  required
                >
                  <option value="">-- Pilih Mata Kuliah --</option>
                  {rpsList.map((rps) => (
                    <option key={rps.id} value={rps.name}>{rps.name}</option>
                  ))}
                </Form.Select>
              </Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col md={3}><Form.Label>Semester</Form.Label></Col>
              <Col md={8}>
                <Form.Select value={semester} onChange={(e) => setSemester(e.target.value)} required>
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
              <Col md={3}><Form.Label>Ganti File Kontrak (PDF)</Form.Label></Col>
              <Col md={8}>
                <Form.Control
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFileKontrakKuliah(e.target.files[0])}
                />
              </Col>
            </Row>

            <Row className="align-items-start mb-3">
              <Col md={3}><Form.Label>Ganti File RPS (PDF)</Form.Label></Col>
              <Col md={8}>
                <Form.Control
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFileRps(e.target.files[0])}
                  disabled={!!file_rps}
                />
                {file_rps ? (
                  <div className="mt-2">
                    <a href={URL.createObjectURL(file_rps)} target="_blank" rel="noopener noreferrer">Lihat RPS Otomatis</a>
                    <p className="text-success mt-1 mb-0">File RPS berhasil dimuat otomatis.</p>
                  </div>
                ) : (
                  <p className="text-warning mt-2 mb-0">RPS belum tersedia, silakan unggah manual.</p>
                )}
              </Col>
            </Row>

            <Card.Footer className="bg-white border-0 p-3 d-flex justify-content-end">
              <Button variant="secondary" size="sm" className="me-2" onClick={() => navigate("/admin/dashboard/pembelajaranmatakuliah")}>
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

export default EditPembelajaran;
