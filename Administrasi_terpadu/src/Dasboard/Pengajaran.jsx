import React, { useState } from "react";
import { Container, Card, Table, Button, Badge, Row, Col, Form, InputGroup } from "react-bootstrap";
import { FiPlus, FiSearch, FiEdit, FiTrash, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Pengajaran = () => {
  const navigate = useNavigate();

  return (
    <Container fluid className="p-4">
      <Card className="mb-4 shadow border-0">
        <Card.Body className="p-4">
          <Row className="align-items-center">
            <Col>
              <h2 className="mb-1 fw-bold">PENGAJARAN</h2>
              <p className="text-muted mb-0">Daftar Mata Kuliah yang Diajar oleh Dosen</p>
            </Col>
            <Col xs="auto">
              <Button variant="primary" onClick={() => navigate("/admin/dashboard/pengajaran/tambahpengajaran")} className="d-flex align-items-center gap-2">
                <FiPlus size={16} />
                <span>Tambah Pengajaran</span>
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="shadow border-0">
        <Card.Body className="p-0">
          <div className="p-3 border-bottom bg-light">
            <Row className="align-items-center g-3">
              <Col md={6}>
                <InputGroup>
                  <InputGroup.Text className="bg-white border-end-0">
                    <FiSearch size={14} />
                  </InputGroup.Text>
                  <Form.Control placeholder="Cari mata kuliah atau dosen..." className="border-start-0 bg-white" />
                </InputGroup>
              </Col>
              <Col md={3}>
                <Form.Select className="bg-white">
                  <option value="">Semua Semester</option>
                  {[...Array(8).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>{num + 1}</option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </div>


          <div className="table-responsive">
            <Table striped bordered hover className="align-middle mb-0">
              <thead className="bg-dark text-white text-center">
                <tr>
                  <th className="py-3">Mata Kuliah</th>
                  <th className="py-3">Dosen Pengampu</th>
                  <th className="py-3">SKS</th>
                  <th className="py-3">Semester</th>
                  <th className="py-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                 {/* {d.map((dosen) => (
                  <tr key={dosen.id}>
                    <td className="fw-medium">{dosen.nip}</td>
                    <td>{dosen.nama}</td>
                    <td>{dosen.pendidikan}</td>
                    <td>{dosen.bidang}</td>
                      <div className="d-flex justify-content-center gap-2">
                        <Button variant="light" size="sm" title="Lihat Detail">
                          <FiEye size={16} />
                        </Button>
                        <Button variant="light" size="sm" title="Edit">
                          <FiEdit2 size={16} />
                        </Button>
                        <Button variant="light" size="sm" title="Hapus">
                          <FiTrash2 size={16} />
                        </Button>
                      </div>
                    </tr>
                ))} */}
                <tr>
                    <td colSpan="7" className="text-center text-muted py-3">
                      Tidak ada data
                    </td>
                  </tr>
              </tbody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="p-3 border-top d-flex justify-content-between align-items-center bg-light">
            <div className="small text-muted">Menampilkan 1-5 dari 5 entri</div>
            <div>
              <Button variant="outline-dark" size="sm" className="me-2" disabled>
                Sebelumnya
              </Button>
              <Button variant="outline-dark" size="sm" disabled>
                Selanjutnya
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Pengajaran;
