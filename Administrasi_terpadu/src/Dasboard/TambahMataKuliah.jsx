import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert, CardHeader } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TambahMataKuliah = () => {
  const [name, setName] = useState("");
  const [sks, setSks] = useState("");
  const [semester, setSemester] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const TambahMataKuliah = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/mata_kuliah', {
        name: name,
        sks: sks,
        semester: semester,
      });
      navigate("/admin/dashboard/matakuliah");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <Container fluid className="p-4">
      <Row className="align-items-center p-4">
        <Col>
          <h2 className="mb-1 fw-bold text-white"> MATA KULIAH</h2>
          <p className="text-muted mb-0">Tambah Data Mata Kuliah Sistem Informasi</p>
        </Col>
      </Row>

      <Card className="shadow border-0">
        <CardHeader className="bg-white">
        <h5 className="mb-0 fw-semibold ">Tambah Mata Kuliah </h5>
        </CardHeader>
        <Card.Body className="p-4">
          {msg && (
            <Alert variant="danger" className="mb-4">
              {msg}
            </Alert>
          )}

          <Form onSubmit={TambahMataKuliah}>
            <Row className="align-items-center mb-3">
              <Col md={3}>
                <Form.Label >Nama Mata Kuliah </Form.Label>
              </Col> :
              <Col md={8}>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan Mata Kuliah"
                  required
                />
              </Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col md={3}>
                <Form.Label >SKS </Form.Label>
              </Col> :
              <Col md={8}>
                <Form.Select
                  value={sks}
                  onChange={(e) => setSks(e.target.value)}
                >
                  <option value="">Pilih SKS</option>
                  <option value="1 SKS">1 SKS</option>
                  <option value="2 SKS">2 SKS</option>
                  <option value="3 SKS">3 SKS</option>
                  <option value="6 SKS">6 SKS</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col md={3}>
                <Form.Label >Semester </Form.Label>
              </Col> :
              <Col md={8}>
                <Form.Select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                >
                  <option value="">Pilih Semester</option>
                  <option value="Semester 1">Semester 1</option>
                  <option value="Semester 2">Semester 2</option>
                  <option value="Semester 3">Semester 3</option>
                  <option value="Semester 4">Semester 4</option>
                  <option value="Semester 5">Semester 5</option>
                  <option value="Semester 6">Semester 6</option>
                  <option value="Semester 7">Semester 7</option>
                  <option value="Semester 8">Semester 8</option>
                </Form.Select>
              </Col>
            </Row>
          </Form>
        </Card.Body>

        <Card.Footer className="bg-white border-0 p-3 d-flex justify-content-end">
          <Button variant="secondary" size="sm" className="me-2" onClick={() => navigate("/admin/dashboard/matakuliah")}>
            Kembali
          </Button>
          <Button variant="primary" size="sm" onClick={TambahMataKuliah}>
            Tambah
          </Button>
        </Card.Footer>
      </Card>

    </Container>
  );

};

export default TambahMataKuliah;