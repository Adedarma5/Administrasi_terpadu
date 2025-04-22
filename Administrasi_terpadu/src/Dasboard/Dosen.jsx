import React, { useState, useEffect } from "react";
import { Container, Card, Table, Button, Badge, Row, Col, Form, InputGroup } from "react-bootstrap";
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Dosen = () => {
  const navigate = useNavigate();
  const [dosenList, setDosenList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const filteredDosen = dosenList.filter((dosen) =>
    dosen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dosen.nip.toString().includes(searchTerm)
  );

  const totalItems = filteredDosen.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedDosen = filteredDosen.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Container fluid className="p-4">
      <Card className="mb-4 shadow border-0">
        <Card.Body className="p-4">
          <Row className="align-items-center">
            <Col>
              <h2 className="mb-1 fw-bold">DOSEN</h2>
              <p className="text-muted mb-0">Daftar Dosen Sistem Informasi</p>
            </Col>
            <Col xs="auto">
              <Button variant="primary" onClick={() => navigate("/admin/dashboard/dosen/tambahdosen")} className="d-flex align-items-center gap-2">
                <FiPlus size={18} />
                <span>Tambah Dosen</span>
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="shadow border-0">
        <Card.Body className="p-0">
          <div className="p-3 border-bottom">
            <Row className="align-items-center g-3">
              <Col md={6} lg={4}>
                <InputGroup>
                  <InputGroup.Text className="bg-light border-end-0">
                    <FiSearch size={16} />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Cari dosen berdasarkan nama atau NIP..."
                    className="border-start-0 bg-light"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>
            </Row>
          </div>

          <div className="table-responsive">
            <Table striped bordered hover className="align-middle mb-0 text-center">
              <thead className="bg-light">
                <tr>
                  <th className="py-3">No</th>
                  <th className="py-3">NIP</th>
                  <th className="py-3">Nama</th>
                  <th className="py-3">Bidang Keahlian</th>
                  <th className="py-3">Jabatan Struktural</th>
                  <th className="py-3">Jabatan Fungsional</th>
                  <th className="py-3">Status</th>
                  <th className="py-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dosenList.length > 0 ? (
                  dosenList
                    .filter((dosen) =>
                      dosen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      dosen.nip.toString().includes(searchTerm)
                    )
                    .map((dosen, index) => (
                      <tr key={dosen.id}>
                        <td className="fw-medium">{index + 1}</td>
                        <td>{dosen.nip}</td>
                        <td>{dosen.name}</td>
                        <td>{dosen.keahlian}</td>
                        <td>{dosen.jabatan_struktural}</td>
                        <td>{dosen.jabatan_fungsional}</td>
                        <td>
                          <Badge bg={dosen.status === "Aktif" ? "success" : "warning"}>{dosen.status}</Badge>
                        </td>
                        <td>
                          <div className="d-flex justify-content-center gap-2">
                            <Button variant="light" size="sm" title="Lihat Detail">
                              <FiEye size={16} />
                            </Button>
                            <Button
                              variant="light"
                              size="sm"
                              title="Edit"
                              onClick={() => navigate(`/admin/dashboard/dosen/editdosen/${dosen.id}`)}
                            >
                              <FiEdit2 size={16} />
                            </Button>
                            <Button variant="light" size="sm" title="Hapus" onClick={() => deleteDosen(dosen.id)}>
                              <FiTrash2 size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center text-muted py-3">
                      Tidak ada data
                    </td>
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
    </Container>
  );
};

export default Dosen;
