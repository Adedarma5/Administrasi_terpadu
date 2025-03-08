import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditDosen = () => {
  const [nip, setNip] = useState("");
  const [name, setName] = useState("");
  const [keahlian, setKeahlian] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState("");
  const { id } = useParams(); // Ambil ID dari URL
  const navigate = useNavigate();

  // Mengambil data dosen berdasarkan ID
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
      setJabatan(dosen.jabatan);
      setStatus(dosen.status);
    } catch (error) {
      console.error("Gagal mengambil data dosen:", error);
      setMsg("Terjadi kesalahan saat mengambil data dosen.");
    }
  };

  // Fungsi untuk menyimpan perubahan
  const updateDosen = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/dosen/${id}`, {
        nip,
        name,
        keahlian,
        jabatan,
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
      <Card className="mb-4 shadow border-0">
        <Card.Body className="p-4">
          <h2 className="mb-1 fw-bold">EDIT DOSEN</h2>
          <p className="text-muted mb-0">Perbarui Data Dosen Sistem Informasi</p>
        </Card.Body>
      </Card>

      <Card className="shadow border-0">
        <h4 className="p-4">Edit Dosen</h4>
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
                <Form.Label>Jabatan</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  value={jabatan}
                  onChange={(e) => setJabatan(e.target.value)}
                  required
                />
              </Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col md={3}>
                <Form.Label>Status</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
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
