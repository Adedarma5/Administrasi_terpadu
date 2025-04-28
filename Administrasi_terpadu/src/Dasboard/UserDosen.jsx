import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Card, Table, Button, Row, Col, Form, InputGroup, Modal } from "react-bootstrap";
import { FiPlus, FiSearch, FiEdit2, FiTrash2 } from "react-icons/fi";

const UserDosen = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    setRole(userRole?.toLowerCase());
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

      console.log("Data yang diterima dari API:", response.data);

      const userData = Array.isArray(response.data) ? response.data : [response.data];
      setUsers(userData);

    } catch (error) {
      console.error("Error fetching users:", error);
      if (error.response) {
        console.log("Server responded with status:", error.response.status);
        console.log("Error response data:", error.response.data);
      }
    }
  };

  const filteredUsers = users.filter(user => {
    console.log("Filtering user:", user);

    const userRole = role?.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();

    if (userRole === "admin") {
      return user.name.toLowerCase().includes(searchTermLower) &&
        (filterRole === "" || user.role.toLowerCase() === filterRole.toLowerCase());
    }
    if (userRole === "user") {
      const loggedInUserNip = localStorage.getItem("nip");
      console.log("loggedInUserNip:", loggedInUserNip);
      console.log("user.nip:", user.nip);
      return user.nip === loggedInUserNip;
    }
    return false;
  });


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



  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);



  return (
    <Container fluid className="p-4">
      <Row className="align-items-center p-4">
        <Col>
          <h2 className="fw-bold text-uppercase text-white">USER DOSEN</h2>
          <p className="text-muted">Daftar Akun User Dosen Sistem Informasi</p>
        </Col>
        <Col xs="auto">
          {role === "admin" && (
            <Button onClick={() => navigate("/admin/dashboard/userdosen/TambahUser")} variant="success">
              <FiPlus size={16} className="me-2" /> Tambah User
            </Button>
          )}
        </Col>
      </Row>


      <Card className="shadow border-0">
        <Card.Header>
          <h5 className="mb-0 fw-semibold">USER DOSEN</h5>
        </Card.Header>
        <Card.Body className="p-0">
          <div className="p-3 border-bottom bg-light">
            {role === "admin" && (
              <Row className="align-items-center g-3">
                <Col className="ms-auto" lg={5} md={6}>
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
            )}
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
                        <span
                          className={`badge rounded-pill px-3 py-1  ${user.role.toLowerCase() === "admin" ? "bg-success" : "bg-primary"}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <Button
                            variant="outline-success"
                            size="sm"
                            className="rounded-2 px-2 py-1 d-flex align-items-center justify-content-center"
                            title="Edit"
                            onClick={() => navigate(`/admin/dashboard/Userdosen/edituserdosen/${user.id}`)}
                          >
                            <FiEdit2 size={15} />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="rounded-2 px-2 py-1 d-flex align-items-center justify-content-center"
                            title="Hapus"
                            onClick={() => {
                              setSelectedUser(user);
                              setShowModal(true);
                            }}
                          >
                            <FiTrash2 size={15} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-3">Tidak ada data pengguna.</td> {/* Updated colspan to 6 */}
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          <div className="p-3 border-top d-flex justify-content-between align-items-center">
            <div className="small text-muted">
              Menampilkan {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems} entri
            </div>
            <div>
              <Button variant="outline-primary" size="sm" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="mx-4">
                Sebelumnya
              </Button>
              <Button variant="outline-primary" size="sm" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                Selanjutnya
              </Button>
            </div>
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
