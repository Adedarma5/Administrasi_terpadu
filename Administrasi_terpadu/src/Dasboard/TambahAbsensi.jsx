import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TambahAbsensi = () => {
  const [mataKuliahList, setMataKuliahList] = useState([]);
  const [dosenList, setDosenList] = useState([]);
  const [name, setName] = useState("");
  const [mata_kuliah, setMataKuliah] = useState("");
  const [jam_pelajaran, setJamPelajaran] = useState("");
  const [foto, setFoto] = useState(null);
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

  const TambahAbsensi = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("mata_kuliah", mata_kuliah);
    formData.append("jam_pelajaran", jam_pelajaran);
    formData.append("foto", foto);

    const token = localStorage.getItem('token');  
    axios.post("http://localhost:5000/absensi", formData, {
      headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`  }
    }).then(response => {
      console.log(response.data);
      navigate("/admin/dashboard/absensi");
    }).catch(error => {
      console.error(error.response.data);

    });
  }
  return (
    <Container fluid className="p-4">
      <Row className="align-items-center p-4">
        <Col>
          <h2 className="mb-1 fw-bold text-white">ABSENSI</h2>
          <p className="text-muted mb-0">Daftar Absensi Dosen Sistem Informasi</p>
        </Col>
      </Row>

      <Card className="shadow border-0">
        <Card.Header>

        <h5 className="mb-0 fw-semibold">Tambah Absensi </h5>
        </Card.Header>
        <Card.Body className="p-4">

          <Form onSubmit={TambahAbsensi} >
            <Row className="align-items-center mb-3">
              <Col md={3}>
                <Form.Label >Nama Lengkap </Form.Label>
              </Col> :
              <Col md={8}>
                <Form.Select value={name}
                  onChange={(e) => setName(e.target.value)} required>
                  <option value="">Pilih Dosen </option>
                  {dosenList.map((dosen) => (
                    <option key={dosen.id} value={dosen.name}>{dosen.name}</option>
                  ))}
                </Form.Select>
              </Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col md={3}>
                <Form.Label >Mata Kuliah </Form.Label>
              </Col> :
              <Col md={8}>
                <Form.Select
                  value={mata_kuliah}
                  onChange={(e) => setMataKuliah(e.target.value)} required>
                  <option value="">Pilih Mata Kuliah</option>
                  {mataKuliahList.map((mata_kuliah) => (
                    <option key={mata_kuliah.id} value={mata_kuliah.name}>{mata_kuliah.name}</option>
                  ))}
                </Form.Select>
              </Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col md={3}>
                <Form.Label >Hari dan Jam Pelajaran </Form.Label>
              </Col> :
              <Col md={8}>
                <Form.Control
                  type="text"
                  value={jam_pelajaran}
                  onChange={(e) => setJamPelajaran(e.target.value)}
                  placeholder="Masukkan Jam Pelajaran"
                  required
                />
              </Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col md={3}>
                <Form.Label >Foto</Form.Label>
              </Col> :
              <Col md={8}>
                <Form.Control
                  type="file"
                  onChange={(e) => setFoto(e.target.files[0])}
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