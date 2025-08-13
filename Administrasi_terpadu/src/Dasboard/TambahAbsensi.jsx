import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TambahAbsensi = () => {
  const [mataKuliahList, setMataKuliahList] = useState([]);
  const [mata_kuliah, setMataKuliah] = useState("");
  const [kelas, setKelas] = useState("");
  const [name, setName] = useState("");
  const [hari, setHari] = useState("");
  const [jam, setJam] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
      setName(name);
    }
    fetchMataKuliah();
  }, []);

  const fetchMataKuliah = async () => {
    try {
      const response = await axios.get("http://localhost:5000/mata_kuliah");
      setMataKuliahList(response.data);
    } catch (error) {
      console.error("Gagal mengambil data mata kuliah:", error);
    }
  };

  const tambahJadwal = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/absensi", {
        name,
        mata_kuliah,
        kelas,
        hari,
        jam,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/admin/dashboard/absensi");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
  };

  return (
    <Container fluid className="p-4">
      <Row className="align-items-center p-4">
        <Col>
          <h2 className="mb-1 fw-bold text-dark">ABSENSI</h2>
          <p className="text-muted mb-0">Tambah Jadwal Absensi Dosen</p>
        </Col>
      </Row>

      <Card className="shadow border-0">
        <Card.Header>
          <h5 className="mb-0 fw-semibold">Tambah Jadwal Absensi</h5>
        </Card.Header>
        <Card.Body className="p-4">
          {msg && <Alert variant="danger">{msg}</Alert>}
          <Form onSubmit={tambahJadwal}>
            <Row className="align-items-center mb-3">
              <Col md={3}>
                <Form.Label>Nama Lengkap</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  value={name}
                  disabled
                  readOnly
                />
              </Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col md={3}><Form.Label>Mata Kuliah</Form.Label></Col>
              <Col md={8}>
                <Form.Select
                  value={mata_kuliah}
                  onChange={(e) => setMataKuliah(e.target.value)}
                  required
                >
                  <option value="">-- Pilih Mata Kuliah --</option>
                  {mataKuliahList.map((mk) => (
                    <option key={mk.id} value={mk.name}>{mk.name}</option>
                  ))}
                </Form.Select>
              </Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col md={3}><Form.Label>Kelas</Form.Label></Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  value={kelas}
                  onChange={(e) => setKelas(e.target.value)}
                  placeholder="Masukkan Kelas"
                  required
                />
              </Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col md={3}><Form.Label>Hari</Form.Label></Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  value={hari}
                  onChange={(e) => setHari(e.target.value)}
                  placeholder="Masukkan Hari"
                  required
                />
              </Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col md={3}><Form.Label>Jam Pelajaran</Form.Label></Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  value={jam}
                  onChange={(e) => setJam(e.target.value)}
                  placeholder="Masukkan Jam Pelajaran"
                  required
                />
              </Col>
            </Row>

            <Card.Footer className="bg-white border-0 p-3 d-flex justify-content-end">
              <Button variant="secondary" size="sm" className="me-2" onClick={() => navigate("/admin/dashboard/absensi")}>
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

export default TambahAbsensi;
