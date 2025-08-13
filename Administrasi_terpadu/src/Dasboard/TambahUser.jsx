import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";

const TambahUser = () => {
  const [foto_users, setFotoUsers] = useState(null);
  const [nip, setNip] = useState("");
  const [nidn, setNidn] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const Tambah = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("foto_users", foto_users);
    formData.append("nip", nip);
    formData.append("nidn", nidn);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confPassword", confPassword);
    formData.append("role", role);

    try {
      await axios.post("http://localhost:5000/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
          <h5 className="mb-0 fw-semibold">Tambah Users</h5>
        </Card.Header>

        <Card.Body className="p-4">
          {msg && <Alert variant="danger">{msg}</Alert>}

          <Form onSubmit={Tambah}>
            <Row className="mb-3 align-items-center">
              <Col md={3}><Form.Label>Foto Users</Form.Label></Col>
              <Col md={8}>
                <Form.Control
                  type="file"
                  onChange={(e) => setFotoUsers(e.target.files[0])}
                  required
                />
              </Col>
            </Row>

            <Row className="mb-3 align-items-center">
              <Col md={3}><Form.Label>NIP</Form.Label></Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  value={nip}
                  onChange={(e) => setNip(e.target.value)}
                  required
                />
              </Col>
            </Row>

            <Row className="mb-3 align-items-center">
              <Col md={3}><Form.Label>Nidn</Form.Label></Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  value={nidn}
                  onChange={(e) => setNidn(e.target.value)}
                  required
                />
              </Col>
            </Row>

            <Row className="mb-3 align-items-center">
              <Col md={3}><Form.Label>Nama Lengkap</Form.Label></Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Col>
            </Row>

            <Row className="mb-3 align-items-center">
              <Col md={3}><Form.Label>Email</Form.Label></Col>
              <Col md={8}>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Col>
            </Row>

            <Row className="mb-3 align-items-center">
              <Col md={3}><Form.Label>Password</Form.Label></Col>
              <Col md={8}>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Col>
            </Row>

            <Row className="mb-3 align-items-center">
              <Col md={3}><Form.Label>Konfirmasi Password</Form.Label></Col>
              <Col md={8}>
                <Form.Control
                  type="password"
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                  required
                />
              </Col>
            </Row>

            <Row className="mb-4 align-items-center">
              <Col md={3}><Form.Label>Role</Form.Label></Col>
              <Col md={8}>
                <Form.Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="">-- Pilih Role --</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </Form.Select>
              </Col>
            </Row>

            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate("/admin/dashboard/userdosen")}
              >
                Kembali
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Tambah
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TambahUser;
