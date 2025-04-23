import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Alert, CardHeader } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditRps = () => {
  const [mataKuliahList, setMataKuliahList] = useState([]);
  const [name, setName] = useState("");
  const [semester, setSemester] = useState("");
  const [file_rps, setFile_Rps] = useState("");
  const [msg, setMsg] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getMataKuliahList();
  }, []);

  const getMataKuliahList = async () => {
    try {
      const response = await axios.get("http://localhost:5000/mata_kuliah");
      setMataKuliahList(response.data);
    } catch (error) {
      console.error("Gagal mengambil daftar mata kuliah:", error);
    }
  };

  const handleFileChange = (e) => {
    setFile_Rps(e.target.files[0]);
  };

  const updateRps = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("semester", semester);
      if (file_rps) {
        formData.append("file_rps", file_rps);
      }

      await axios.patch(`http://localhost:5000/rps/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/admin/dashboard/rps");
    } catch (error) {
      console.error("Error saat memperbarui data:", error);
      setMsg("Terjadi kesalahan saat memperbarui data.");
    }
  };

  const semesters = [...Array(17)].map((_, i) => ({
    semester: `Semester ${i + 0}`
  }));

  return (
    <Container fluid className="p-4">
      <Row className="align-items-center p-4">
        <Col>
          <h2 className="mb-1 fw-bold">EDIT Rencana Pembelejaran Semester</h2>
          <p className="text-muted mb-0">Perbarui Data RPS sistem Informasi</p>
        </Col>
      </Row>

      <Card className="shadow border-0">
        <CardHeader className="bg-white">
          <h4 className="mb-0 fw-semibold">Edit Dosen</h4>
        </CardHeader>
        <Card.Body className="p-4">
          {msg && (
            <Alert variant="danger" className="mb-4">
              {msg}
            </Alert>
          )}

          <Form onSubmit={updateRps}>
            <Row className="align-items-center mb-3">
              <Col md={3}>
                <Form.Label>Nama</Form.Label>
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

            <Row className="align-items-center mb-3">
              <Col md={3}>
                <Form.Label>Semester</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                >
                  {semesters.map((semester, index) => (
                    <option key={index} value={semester.semester}>
                      {semester.semester}
                    </option>
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
              <Button variant="secondary" size="sm" className="me-2" onClick={() => navigate("/admin/dashboard/rps")}>
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

export default EditRps;
