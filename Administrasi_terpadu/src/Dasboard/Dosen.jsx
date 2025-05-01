import React, { useState, useEffect, useCallback } from "react";
import { Container, Card, Table, Button, Badge, Row, Col, Form, InputGroup } from "react-bootstrap";
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiFilter } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Dosen = () => {
  const navigate = useNavigate();
  const [dosenList, setDosenList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  const fetchDosen = async () => {
    try {
      const response = await axios.get("http://localhost:5000/dosen");
      setDosenList(response.data);
    } catch (error) {
      console.error("Error fetching dosen data:", error);
    }
  };

  useEffect(() => {
    fetchDosen();
  }, []);

  const deleteDosen = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus dosen ini?")) {
      try {
        await axios.delete(`http://localhost:5000/dosen/${id}`);
        fetchDosen();
      } catch (error) {
        console.error("Error deleting dosen:", error);
      }
    }
  };

  const filteredDosen = dosenList.filter(
    (dosen) =>
      dosen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dosen.nip.toString().includes(searchTerm)
  );

  const rank = {
    "Ketua Jurusan": 1,
    "Sekertaris Jurusan": 2,
    "Ketua Prodi": 3,
    "Wakil Ketua Prodi": 4,
    "Kepala Laboratorium": 5,
  };

  const sortedDosen = [...filteredDosen].sort(
    (a, b) => (rank[a.jabatan_struktural] || 99) - (rank[b.jabatan_struktural] || 99)
  );

  const totalItems = sortedDosen.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedDosen = sortedDosen.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddDosen = useCallback(() => {
    navigate("/admin/dashboard/dosen/tambahdosen");
  }, [navigate]);

  return (
    <Container fluid className="p-4">
      <Row className="align-items-center p-4">
        <Col>
          <h2 className="mb-1 fw-bold text-white">DOSEN</h2>
          <p className="text-muted mb-0">Sistem Informasi</p>
        </Col>
        <Col xs="auto">
          <Button
            variant="success"
            onClick={handleAddDosen}
            className="shadow d-flex align-items-center gap-2 text-white"
          >
            <FiPlus size={18} />
            <span>Tambah Dosen</span>
          </Button>
        </Col>
      </Row>

      <Card className="shadow border-0">
        <Card.Body className="p-0">
          <div className="p-3 border-bottom">
            <Row className="align-items-center g-3">
              <Col md={6} lg={4}>
                <h5 className="mb-0 fw-semibold">Daftar Dosen Sistem Informasi</h5>
              </Col>
            </Row>
          </div>

          <Card className="shadow-sm border-0 overflow-hidden">
            <Card.Header className="bg-white py-3 border-bottom">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div className="ms-auto col-md-4">
                  <InputGroup size="sm" className="border rounded overflow-hidden">
                    <InputGroup.Text className="bg-white border-0">
                      <FiSearch size={16} className="text-primary" />
                    </InputGroup.Text>
                    <Form.Control
                      size="sm"
                      placeholder="Cari berdasarkan nama atau NIP..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="border-0 shadow-none py-1"
                    />
                  </InputGroup>
                </div>
              </div>
            </Card.Header>

            <Card.Body className="p-0 text-center">
              <div className="table-responsive">
                <Table striped bordered hover className="align-middle mb-0" size="sm">
                  <thead>
                    <tr className="bg-light">
                      <th className="px-2 py-4">No</th>
                      <th className="px-3 py-4">NIP</th>
                      <th className="px-4 py-4">Nama</th>
                      <th className="px-3 py-4">Bidang Keahlian</th>
                      <th className="px-3 py-4">Jabatan Struktural</th>
                      <th className="px-2 py-4">Jabatan Fungsional</th>
                      <th className="px-3 py-4">Status</th>
                      <th className="px-3 py-4">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedDosen.length > 0 ? (
                      paginatedDosen.map((dosen, index) => (
                        <tr key={dosen.id}>
                          <td className="text-center border-end">
                            {index + 1 + (currentPage - 1) * itemsPerPage}
                          </td>
                          <td className="border-end">{dosen.nip}</td>
                          <td className="border-end">{dosen.name}</td>
                          <td className="border-end">{dosen.keahlian}</td>
                          <td className="border-end">{dosen.jabatan_struktural}</td>
                          <td className="border-end">{dosen.jabatan_fungsional}</td>
                          <td className="text-center border-end">
                            <Badge
                              bg={dosen.status === "Aktif" ? "success" : "warning"}
                              className="rounded-pill px-3 py-1 fw-normal"
                            >
                              {dosen.status}
                            </Badge>
                          </td>
                          <td>
                            <div className="d-flex justify-content-center gap-2">
                              <Button
                                variant="outline-success"
                                size="sm"
                                className="rounded-2 px-2 py-1 d-flex align-items-center justify-content-center"
                                title="Edit"
                                onClick={() =>
                                  navigate(`/admin/dashboard/dosen/editdosen/${dosen.id}`)
                                }
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
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center py-4">
                          <div className="d-flex flex-column align-items-center justify-content-center py-4">
                            <FiFilter size={32} className="text-muted mb-2" />
                            <p className="text-muted mb-0">Tidak ada data dosen yang tersedia</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>

          <div className="p-3 border-top d-flex justify-content-between align-items-center">
            <div className="small text-muted">
              Menampilkan {(currentPage - 1) * itemsPerPage + 1}–
              {Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems} entri
            </div>
            <div>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="mx-4"
              >
                Sebelumnya
              </Button>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Selanjutnya
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dosen;
