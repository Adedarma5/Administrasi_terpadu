import React, { useState } from "react";
import { Container, Card, Table, Button, Badge, Row, Col, Form, InputGroup, CardHeader } from "react-bootstrap";
import { FiPlus, FiSearch, FiEdit, FiTrash, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Pengajaran = () => {
  const navigate = useNavigate();

  return (
    <Container fluid className="p-4">
      <Row className="align-items-center p-4">
        <Col>
          <h2 className="mb-1 fw-bold text-white">PENGAJARAN</h2>
          <p className="text-muted mb-0">Daftar Mata Kuliah yang Diajar oleh Dosen</p>
        </Col>
        <Col xs="auto">
          <Button variant="success" onClick={() => navigate("/admin/dashboard/pengajaran/tambahpengajaran")} className=" shadow d-flex align-items-center gap-2">
            <FiPlus size={16} />
            <span>Tambah Pengajaran</span>
          </Button>
        </Col>
      </Row>


      <Card className="shadow border-0">
        <Card.Body className="p-0">
          <div className="p-3 border-bottom">
            <Row className="align-items-center g-3">
              <Col md={6} lg={5}>
                <h5 className="mb-0 fw-semibold">Daftar Pengabdian Dosen  Sistem Informasi</h5>
              </Col>
            </Row>
          </div>

          <Card className="shadow-sm border-0 overflow-hidden">
            <Card.Header className="bg-white py-3 border-bottom">
              <div className="d-flex align-items-center flex-wrap gap-3">
                <div className="ms-auto col-md-6 col-lg-4">
                  <InputGroup size="sm" className="border rounded overflow-hidden">
                    <InputGroup.Text className="bg-white border-0">
                      <FiSearch size={16} className="text-primary" />
                    </InputGroup.Text>
                    <Form.Control
                      size="sm"
                      placeholder="Cari judul pengabdian..."
                      // value={searchTerm}
                      onChange={(e) => {
                        // setSearchTerm(e.target.value);
                        // setCurrentPage(1);
                      }}
                      className="border-0 shadow-none py-1"
                    />
                  </InputGroup>
                </div>

                {/* <div className="col-md-4 col-lg-3">
                  <Form.Select
                    value={selectedDosen}
                    onChange={(e) => {
                      setSelectedDosen(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="shadow-none py-1"
                  >
                    <option value="">-- Semua Dosen --</option>
                    {dosenList.map((dosen) => (
                      <option key={dosen.id} value={dosen.name}>
                        {dosen.name}
                      </option>
                    ))}
                  </Form.Select>
                </div> */}
              </div>
            </Card.Header>

            <Card.Body className="p-0 text-center">
              <div className="table-responsive">
                <Table striped bordered hover className="align-middle mb-0" size="sm">
                  <thead>
                    <tr className="bg-light">
                      <th>No</th>
                      <th>Judul Pengabdian</th>
                      <th>Nama Dosen</th>
                      <th>Mitra</th>
                      <th>Bentuk Kegiatan</th>
                      <th>Lokasi</th>
                      <th>Tahun</th>
                      <th>Bukti Kegiatan</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  {/* <tbody>
                    {paginatedPengabdian.length > 0 ? (
                      paginatedPengabdian.map((pengabdian, index) => (
                        <tr key={pengabdian.id}>
                          <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                          <td>{pengabdian.judul_pengabdian}</td>
                          <td>{pengabdian.nama_dosen}</td>
                          <td>{pengabdian.mitra}</td>
                          <td>{pengabdian.bentuk_kegiatan}</td>
                          <td>{pengabdian.lokasi}</td>
                          <td>{pengabdian.tahun}</td>
                          <td>
                            <a
                              href={`http://localhost:5000/uploads/pengabdian/${pengabdian.file_kegiatan}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Lihat PDF
                            </a>
                          </td>
                          <td>
                            <div className="d-flex justify-content-center gap-2">
                              <Button
                                variant="outline-success"
                                size="sm"
                                onClick={() => navigate(`/admin/dashboard/pengabdian/editpengabdian/${pengabdian.id}`)}
                              >
                                <FiEdit2 size={15} />
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => deletePengabdian(pengabdian.id)}
                              >
                                <FiTrash2 size={15} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center py-4">
                          <FiFilter size={32} className="text-muted mb-2" />
                          <p className="text-muted">Tidak ada data pengabdian yang tersedia</p>
                        </td>
                      </tr>
                    )}
                  </tbody> */}
                </Table>
              </div>
            </Card.Body>

            <div className="p-3 border-top d-flex justify-content-between align-items-center">
              {/* <div className="small text-muted">
                Menampilkan {filteredPengabdian.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} -{" "}
                {Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems} entri
              </div> */}
              <div>
                <Button
                  variant="outline-primary"
                  size="sm"
                  // disabled={currentPage === 1}
                  // onClick={() => setCurrentPage(currentPage - 1)}
                  className="me-2"
                >
                  Sebelumnya
                </Button>
                <Button
                  variant="outline-primary"
                  size="sm"
                  // disabled={currentPage === totalPages}
                  // onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Selanjutnya
                </Button>
              </div>
            </div>
          </Card>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Pengajaran;
