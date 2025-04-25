import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Alert, CardHeader } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditDosen = () => {
  const [nip, setNip] = useState("");
  const [name, setName] = useState("");
  const [keahlian, setKeahlian] = useState("");
  const [jabatan_struktural, setJabatan_Strukrural] = useState("");
  const [jabatan_fungsional, setJabatan_Fungsional] = useState("");
  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getDosenById();
  }, []);

  const getDosenById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/dosen/${id}`);
      const dosen = response.data;
      setNip(dosen.nip);
      setName(dosen.name);
      setKeahlian(dosen.keahlian);
      setJabatan_Strukrural(dosen.jabatan_struktural);
      setJabatan_Fungsional(dosen.jabatan_fungsional);
      setStatus(dosen.status);
    } catch (error) {
      console.error("Gagal mengambil data dosen:", error);
      setMsg("Terjadi kesalahan saat mengambil data dosen.");
    }
  };

  const updateDosen = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/dosen/${id}`, {
        nip,
        name,
        keahlian,
        jabatan_struktural,
        jabatan_fungsional,
        status,
      });
      navigate("/admin/dashboard/dosen");
    } catch (error) {
      console.error("Error saat memperbarui data:", error);
      setMsg("Terjadi kesalahan saat memperbarui data.");
    }
  };

  return (
    <Container fluid className="p-4">
      <Row className="align-items-center p-4">
        <Col>
          <h2 className="mb-1 fw-bold text-white">DOSEN</h2>
          <p className="text-muted mb-0">Perbarui Data Dosen Sistem Informasi</p>
        </Col>
      </Row>

      <Card className="shadow border-0">
        <CardHeader className="bg-white">
          <h5 className="mb-0 fw-semibold ">Edit Dosen</h5>
        </CardHeader>
        <Card.Body className="p-4">
          {msg && (
            <Alert variant="danger" className="mb-4">
              {msg}
            </Alert>
          )}

          <Form onSubmit={updateDosen}>
            <Row className="align-items-center mb-3">
              <Col md={3}>
                <Form.Label>NIP</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="number"
                  value={nip}
                  onChange={(e) => setNip(e.target.value)}
                  required
                />
              </Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col md={3}>
                <Form.Label>Nama</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col md={3}>
                <Form.Label>Bidang Keahlian</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  value={keahlian}
                  onChange={(e) => setKeahlian(e.target.value)}
                  required
                />
              </Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col md={3}>
                <Form.Label>Jabatan Struktural</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Select
                  type="text"
                  value={jabatan_struktural}
                  onChange={(e) => setJabatan_Strukrural(e.target.value)}
                >
                  <option value="">-- Pilih Jabatan Struktural --</option>
                  <option value="Ketua Jurusan">Ketua Jurusan</option>
                  <option value="Sekertaris Jurusan">Sekertaris Jurusan</option>
                  <option value="Ketua Prodi">Ketua Prodi</option>
                  <option value="Wakil Ketua Prodi">Wakil Ketua Prodi</option>
                  <option value="Kepala Laboratorium">Kepala Laboratorium</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col md={3}>
                <Form.Label>Jabatan Fungsional</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Select
                  value={jabatan_fungsional}
                  onChange={(e) => setJabatan_Fungsional(e.target.value)}
                >
                  <option value="">-- Pilih Jabatan Fungsional --</option>
                  <option value="Profesor">Profesor</option>
                  <option value="Lektor Kepala">Lektor Kepala</option>
                  <option value="Lektor">Lektor</option>
                  <option value="Asisten Ahli">Asisten Ahli</option>
                  <option value="Tenaga Pengajar">Tenaga Pengajar</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col md={3}>
                <Form.Label>Status</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}
                >

                  <option value="">Pilih Status</option>
                  <option value="Aktif">Aktif</option>
                  <option value="Cuti">Cuti</option>
                </Form.Select>
              </Col>
            </Row>

            <Card.Footer className="bg-white border-0 p-3 d-flex justify-content-end">
              <Button variant="secondary" size="sm" className="me-2" onClick={() => navigate("/admin/dashboard/dosen")}>
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

export default EditDosen;
