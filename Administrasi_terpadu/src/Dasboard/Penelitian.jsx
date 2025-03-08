import React, { useState } from "react";
import {
  Container,
  Card,
  Table,
  Button,
  Badge,
  Row,
  Col,
  Form,
  InputGroup,
} from "react-bootstrap";
import {
  FiPlus,
  FiSearch,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Penelitian = () => {
  const navigate = useNavigate();

  return (
    <Container fluid className="p-4">
      <Card className="mb-4 shadow border-0">
        <Card.Body className="p-4">
          <Row className="align-items-center">
            <Col>
              <h2 className="mb-1 fw-bold">PENELITIAN</h2>
              <p className="text-muted mb-0">Daftar Penelitian Dosen Sistem Informasi</p>
            </Col>
            <Col xs="auto">
              <Button variant="primary" onClick={() => navigate("/admin/dashboard/penelitian/tambahpenelitian")} className="d-flex align-items-center gap-2">
                <FiPlus size={18} />
                <span>Tambah Penelitian</span>
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
                  <Form.Control placeholder="Cari judul penelitian..." className="border-start-0 bg-light" />
                </InputGroup>
              </Col>
            </Row>
          </div>

          <div className="table-resp  onsive">
            <Table striped bordered hover className="align-middle mb-0 text-center">
              <thead className="bg-light">
                <tr>
                  <th className="py-3">No</th>
                  <th className="py-3">Judul Penelitian</th>
                  <th className="py-3">Dosen Pembimbing</th>
                  <th className="py-3">Ketua</th>
                  <th className="py-3">Sumber Dana</th>
                  <th className="py-3">Dampak Bagi Masyarakat</th>
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

          <div className="p-3 border-top d-flex justify-content-between align-items-center">
            <div className="small text-muted">Menampilkan 1-2 dari 2 entri</div>
            <div>
              <Button variant="outline-primary" size="sm" className="me-2" disabled>
                Sebelumnya
              </Button>
              <Button variant="outline-primary" size="sm" disabled>
                Selanjutnya
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Penelitian;