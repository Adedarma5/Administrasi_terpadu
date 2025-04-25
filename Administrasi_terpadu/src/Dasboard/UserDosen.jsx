import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Container, Card, Table, Button, Row, Col, Form, InputGroup, Modal } from "react-bootstrap";
import { FiPlus, FiSearch, FiEdit2, FiTrash2 } from "react-icons/fi";

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
    const token = localStorage.getItem('token');

    if (!token) {
      console.error("Token tidak ditemukan di localStorage.");
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };


  const handleDelete = async () => {
    if (!selectedUser) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/users/${selectedUser.nip}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter(user => user.nip !== selectedUser.nip));
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
                  <th>NIP</th>
                  <th>Nama Dosen</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th className="text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <tr key={user.nip}>
                      <td className="text-center">{index + 1}</td>
                      <td>{user.nip}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`badge ${user.role === "Admin" ? "bg-danger" : "bg-primary"}`}>
                          {user.role}
                        </span>
                      </td>
                      <div className="d-flex justify-content-center gap-2">
                        <Button
                          variant="outline-success"
                          size="sm"
                          className="rounded-2 px-2 py-1 d-flex align-items-center justify-content-center"
                          title="Edit"
                          onClick={() => navigate(`/admin/dashboard/dosen/editdosen/${dosen.id}`)}
                        >
                          <FiEdit2 size={15} />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="rounded-2 px-2 py-1 d-flex align-items-center justify-content-center"
                          title="Hapus"
                          onClick={() => deleteDosen(dosen.id)}
                        >
                          <FiTrash2 size={15} />
                        </Button>
                      </div>
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
