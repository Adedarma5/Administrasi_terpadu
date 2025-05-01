import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditUserDosen = () => {
  const [nip, setNip] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    setRole(userRole?.toLowerCase());
    getUserById();
  }, []);

  const getUserById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${id}`);
      const user = response.data;
      setNip(user.nip);
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    } catch (error) {
      console.error("Gagal mengambil data user:", error);
      setMsg("Terjadi kesalahan saat mengambil data user.");
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
        nip,
        name,
        email,
        password,
        confPassword,
        role,
      });
      navigate("/admin/dashboard/userdosen");
    } catch (error) {
      console.error("Error saat memperbarui data:", error);
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
          <p className="text-muted mb-0">Edit Akun User Dosen Sistem Informasi</p>
        </Col>
      </Row>

      <Card className="shadow border-0">
        <Card.Header className="bg-white">
          <h5 className="mb-0 fw-semibold">Edit User</h5>
        </Card.Header>
        <Card.Body className="p-4">
          {msg && (
            <Alert variant="danger" className="mb-4">
              {msg}
            </Alert>
          )}

          <Form onSubmit={updateUser}>
            <Row className="align-items-center mb-3">
              <Col md={3}>
                <Form.Label>NIP</Form.Label>
              </Col>
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
                <Form.Label>Nama Lengkap</Form.Label>
              </Col>
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
                <Form.Label>Email</Form.Label>
              </Col>
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
                <Form.Label>Password (opsional)</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password baru jika ingin ganti"
                />
              </Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col md={3}>
                <Form.Label>Konfirmasi Password</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="password"
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                  placeholder="Konfirmasi password baru"
                />
              </Col>
            </Row>


            {role === "admin" && (
              <Row className="align-items-center mb-4">
                <Col md={3}>
                  <Form.Label>Role</Form.Label>
                </Col>
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
            )}
            
            <Card.Footer className="bg-white border-0 p-3 d-flex justify-content-end">
              <Button variant="secondary" size="sm" className="me-2" onClick={() => navigate("/admin/dashboard/userdosen")}>
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

export default EditUserDosen;
