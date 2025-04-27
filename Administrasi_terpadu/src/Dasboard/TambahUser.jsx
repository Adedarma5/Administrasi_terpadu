import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";

const TambahUser = () => {
  const [nip, setNip] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const Tambah = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        nip: nip,
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
      });
      navigate("/admin/dashboard/userdosen");
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
          <h2 className="mb-1 fw-bold text-white">User Dosen</h2>
          <p className="text-muted mb-0">Tambah Akun User Dosen Sistem Informasi</p>
        </Col>
      </Row>



      <Card className="shadow border-0">
        <Card.Header>
        <h5 className="mb-0 fw-semibold">Tambah Users </h5>
        </Card.Header>
        <Card.Body className="p-4">
          {msg && (
            <Alert variant="danger" className="mb-4">
              {msg}
            </Alert>
          )}

          <Form onSubmit={Tambah}>
            <Row className="align-items-center mb-3">
              <Col md={3}>
                <Form.Label >NIP </Form.Label>
              </Col> :
              <Col md={8}>
                <Form.Control
                  type="text"
                  value={nip}
                  onChange={(e) => setNip(e.target.value)}
                  placeholder="Masukkan NIP"
                  required
                />
              </Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col md={3}>
                <Form.Label >Nama Lengkap </Form.Label>
              </Col> :
              <Col md={8}>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col md={3}>
                <Form.Label >Email </Form.Label>
              </Col> :
              <Col md={8}>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan email"
                  required
                />
              </Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col md={3}>
                <Form.Label >Password </Form.Label>
              </Col> :
              <Col md={8}>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  required
                />
              </Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col md={3}>
                <Form.Label >Konfirmasi Password </Form.Label>
              </Col> :
              <Col md={8}>
                <Form.Control
                  type="password"
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                  placeholder="Masukkan ulang password"
                  required
                />
              </Col>
            </Row>

            <Row className="align-items-center mb-4">
              <Col md={3}>
                <Form.Label >Role </Form.Label>
              </Col> :
              <Col md={8}> 
                <Form.Select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </Form.Select>
              </Col>
            </Row>
          </Form>
        </Card.Body>

        <Card.Footer className="bg-white border-0 p-3 d-flex justify-content-end">
          <Button variant="secondary" size="sm" className="me-2" onClick={() => navigate("/admin/dashboard/userdosen")}>
            Kembali
          </Button>
          <Button variant="primary" size="sm" onClick={Tambah}>
            Tambah
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default TambahUser;
