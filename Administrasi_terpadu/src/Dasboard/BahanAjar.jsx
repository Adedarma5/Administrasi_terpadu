import React, { useState, useEffect } from "react";
import { Container, Card, Table, Button, Row, Col, Form, InputGroup, Spinner, Alert } from "react-bootstrap";
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BahanAjar = () => {
  const navigate = useNavigate();
  const [bahanajarList, setBahanAjarList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchBahanAjar();
  }, []);

  const fetchBahanAjar = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5000/bahan_ajar");
      setBahanAjarList(response.data);
    } catch (error) {
      setError("Gagal memuat data bahan ajar.");
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const deleteBahanAjar = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus bahan ajar ini?")) {
      try {
        await axios.delete(`http://localhost:5000/bahan_ajar/${id}`);
        fetchBahanAjar();
      } catch (error) {
        alert("Gagal menghapus bahan ajar.");
        console.error("Error deleting bahan ajar:", error);
      }
    }
  };

  

  const filteredBahanAjar = bahanajarList.filter((bahan_ajar) =>
    bahan_ajar.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bahan_ajar.dosen_pengampu.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredBahanAjar.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedBahanAjar = filteredBahanAjar.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Container fluid className="p-4">
      <Card className="mb-4 shadow border-0">
        <Card.Body className="p-4">
          <Row className="align-items-center">
            <Col>
              <h2 className="mb-1 fw-bold">BAHAN AJAR</h2>
              <p className="text-muted mb-0">Daftar bahan ajar mata kuliah</p>
            </Col>
            <Col xs="auto">
              <Button
                variant="primary"
                className="d-flex align-items-center gap-2"
                onClick={() => navigate('/admin/dashboard/BahanAjar/TambahBahanAjar')}
              >
                <FiPlus size={18} />
                <span>Tambah Bahan Ajar</span>
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="shadow border-0">
        <Card.Body className="p-0">
          <div className="p-3 border-bottom">
            <Row className="align-items-center g-3">
              <Col lg={4}>
                <InputGroup>
                  <InputGroup.Text className="bg-light border-end-0">
                    <FiSearch size={16} />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Cari bahan ajar..."
                    className="border-start-0 bg-light"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>
            </Row>
          </div>

          <div className="table-responsive">
            {loading ? (
              <div className="text-center p-4">
                <Spinner animation="border" />
              </div>
            ) : error ? (
              <Alert variant="danger" className="text-center">
                {error}
              </Alert>
            ) : (
              <Table striped bordered hover className="align-middle mb-0 text-center">
                <thead className="bg-light">
                  <tr>
                    <th className="py-3">No</th>
                    <th className="py-3">Nama Mata Kuliah</th>
                    <th className="py-3">Judul Materi</th>
                    <th className="py-3">Dosen Pengampu</th>
                    <th className="py-3">Pertemuan</th>
                    <th className="py-3">File Pendukung</th>
                    <th className="py-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedBahanAjar.length > 0 ? (
                    paginatedBahanAjar.map((bahan_ajar, index) => (
                      <tr key={bahan_ajar.id}>
                        <td className="fw-medium">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                        <td>{bahan_ajar.name}</td>
                        <td>{bahan_ajar.judul_materi}</td>
                        <td>{bahan_ajar.dosen_pengampu}</td>
                        <td>{bahan_ajar.pertemuan}</td>
                        <td>
                          <a
                            href={`http://localhost:5000/uploads/bahan_ajar/${bahan_ajar.file_pendukung}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Lihat PDF
                          </a>
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
                              onClick={() => navigate(`/admin/dashboard/bahanajar/editbahanajar/${bahan_ajar.id}`)}
                            >
                              <FiEdit2 size={16} />
                            </Button>
                            <Button variant="light" size="sm" title="Hapus" onClick={() => deleteBahanAjar(bahan_ajar.id)}>
                              <FiTrash2 size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center text-muted py-3">
                        Tidak ada data
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            )}
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

export default BahanAjar;
