import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Container, Card, Table, Button, Row, Col, Form, InputGroup, Modal } from "react-bootstrap";
import { FiPlus, FiSearch } from "react-icons/fi";

const UserDosen = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token tidak ditemukan. Silakan login.");
        navigate("/login");
        return;
      }

      const response = await axios.get("http://localhost:5000/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(response.data);
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      console.error("Error fetching users:", msg);


      if (msg.includes("kadaluarsa") || msg.includes("tidak valid")) {
        alert("Sesi Anda telah berakhir. Silakan login kembali.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/users/${selectedUser.uuid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter(user => user.uuid !== selectedUser.uuid));
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting user:", error.response?.data?.message || error.message);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterRole === "" || user.role === filterRole)
  );

  return (
    <Container fluid className="p-4">
      <Card className="mb-4 shadow border-0">
        <Card.Body>
          <Row className="align-items-center">
            <Col>
              <h2 className="fw-bold">USER DOSEN</h2>
              <p className="text-muted">Daftar Akun User Dosen Sistem Informasi</p>
            </Col>
            <Col xs="auto">
              <Button onClick={() => navigate("/admin/dashboard/userdosen/TambahUser")} variant="primary">
                <FiPlus size={16} className="me-2" /> Tambah User
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="shadow border-0">
        <Card.Body className="p-0">
          <div className="p-3 border-bottom bg-light">
            <Row className="align-items-center g-3">
              <Col lg={5}>
                <InputGroup>
                  <InputGroup.Text className="bg-light border-end-0">
                    <FiSearch size={14} />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Cari nama dosen atau email..."
                    className="border-start-0 bg-light"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col md={4} lg={2}>
                <Form.Select className="bg-light" value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
                  <option value="">Semua Role</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </Form.Select>
              </Col>
            </Row>
          </div>

          <div className="table-responsive text-center">
            <Table striped bordered hover className="align-middle mb-0">
              <thead className="bg-dark text-white text-center">
                <tr>
                  <th>No</th>
                  <th>Nama Dosen</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th className="text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <tr key={user.uuid}>
                      <td className="text-center">{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`badge ${user.role === "Admin" ? "bg-danger" : "bg-primary"}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="text-center">
                        <Button as={Link} to={`/users/edit/${user.uuid}`} variant="info" size="sm" className="me-2">
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user);
                            setShowModal(true);
                          }}
                        >
                          Hapus
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-3">Tidak ada data pengguna.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Hapus</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda yakin ingin menghapus user <strong>{selectedUser?.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserDosen;
