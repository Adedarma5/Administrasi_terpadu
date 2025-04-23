import React from "react";
import { Container, Card, Table, Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import { FiPlus, FiSearch, FiEdit, FiTrash, FiEye } from "react-icons/fi";
import { Navigate, useNavigate } from "react-router-dom";

const Pengabdian = () => {
  const navigate = useNavigate();

  return (
    <Container fluid className="p-4">
      <Row className="align-items-center p-4">
        <Col>
          <h2 className="mb-1 fw-bold text-white">PENGABDIAN</h2>
          <p className="text-muted mb-0">Daftar Pengabdian Dosen</p>
        </Col>
        <Col xs="auto">
          <Button
            variant="success"
            onClick={() => navigate("/admin/dashboard/pengabdian/tambahpengabdian")}
            className="shadwo d-flex align-items-center gap-2">
            <FiPlus size={16} />
            <span>Tambah Pengabdian</span>
          </Button>
        </Col>
      </Row>



      <Card className="shadow border-0">
        <Card.Body className="p-0">
          <div className="p-3 border-bottom bg-light">
            <Row className="align-items-center g-3">
              <Col md={6}>
                <InputGroup>
                  <InputGroup.Text className="bg-white border-end-0">
                    <FiSearch size={14} />
                  </InputGroup.Text>
                  <Form.Control placeholder="Cari judul pengabdian..." className="border-start-0 bg-white" />
                </InputGroup>
              </Col>
            </Row>
          </div>

          <div className="table-responsive">
            <Table striped bordered hover className="align-middle mb-0" size="sm">
              <thead className="bg-dark text-white text-center">
                <tr>
                  <th className="py-3">No</th>
                  <th className="py-3">Judul Pengabdian</th>
                  <th className="py-3">Nama Dosen</th>
                  <th className="py-3">Mitra</th>
                  <th className="py-3">Bentuk Kegiatan</th>
                  <th className="py-3">Lokasi</th>
                  <th className="py-3">Tahun</th>
                  <th className="py-3">Bukti Kegiatan</th>
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
                  <td colSpan="8" className="text-center text-muted py-3">
                    Tidak ada data
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>

          <div className="p-3 border-top d-flex justify-content-between align-items-center bg-light">
            <div className="small text-muted">Menampilkan 1-2 dari 2 entri</div>
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

export default Pengabdian;
