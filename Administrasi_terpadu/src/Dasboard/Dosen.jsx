import React, { useState, useEffect } from "react";
import { Container, Card, Table, Button, Badge, Row, Col, Form, InputGroup } from "react-bootstrap";
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiEye, FiFilter } from "react-icons/fi";
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
          <Row className="align-items-center p-4">
            <Col>
              <h2 className="mb-1 fw-bold text-white">DOSEN</h2>
              <p className="text-muted mb-0">Sistem Informasi</p>
            </Col>
            <Col xs="auto">
              <Button variant="success" onClick={() => navigate("/admin/dashboard/dosen/tambahdosen")} className="shadow d-flex align-items-center gap-2 text-white">
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
                <h5 className="mb-0 fw-semibold ">Daftar Dosen Sistem Informasi</h5>
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
                <Table striped bordered hoverr className="align-middle mb-0 " size="sm">
                  <thead>
                    <tr className="bg-light">
                      <th className="px-1 py-3" style={{ width: "5%" }}>No</th>
                      <th className="px-3 py-3 " style={{ width: "12%" }}>NIP</th>
                      <th className="px-3 py-3 " style={{ width: "18%" }}>Nama</th>
                      <th className="px-3 py-3 " style={{ width: "15%" }}>Bidang Keahlian</th>
                      <th className="px-3 py-3 " style={{ width: "15%" }}>Jabatan Struktural</th>
                      <th className="px-3 py-2 " style={{ width: "10%" }}>Jabatan Fungsional</th>
                      <th className="px-3 py-3 " style={{ width: "10%" }}>Status</th>
                      <th className="px-3 py-3 " style={{ width: "10%" }}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dosenList.length > 0 ? (
                      dosenList.filter((dosen) =>
                          dosen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          dosen.nip.toString().includes(searchTerm)
                        )
                        .map((dosen, index) => (
                          <tr key={dosen.id}>
                            <td className="text-center border-end">{index + 1}</td>
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
