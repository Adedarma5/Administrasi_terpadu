import React from "react";
import { Container, Card, Table, Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import { FiPlus, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Msib = () => {
  const navigate = useNavigate ();

  return (
    <Container fluid className="p-4">
      <Card className="mb-4 shadow border-0">
        <Card.Body className="p-4">
          <Row className="align-items-center">
            <Col>
              <h2 className="mb-1 fw-bold">MSIB</h2>
              <p className="text-muted mb-0">Daftar Kegiatan MSIB Mahasiswa Sistem Informasi</p>
            </Col>
            <Col xs="auto">
              <Button variant="primary" className="d-flex align-items-center gap-2" onClick={() => navigate("/admin/dashboard/msib/tambahmsib")}>
                <FiPlus size={18} />
                <span>Tambah</span>
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
                  <Form.Control placeholder="Cari dosen berdasarkan nama atau NIP..." className="border-start-0 bg-light" />
                </InputGroup>
              </Col>
              <Col md={6} lg={3}>
                <Form.Select className="bg-light">
                  <option value="">Semua Bidang Keahlian</option>
                  <option value="Kecerdasan Buatan">Kecerdasan Buatan</option>
                  <option value="Sistem Informasi">Sistem Informasi</option>
                  <option value="Algoritma & Pemrograman">Algoritma & Pemrograman</option>
                  <option value="Rekayasa Perangkat Lunak">Rekayasa Perangkat Lunak</option>
                  <option value="Jaringan Komputer">Jaringan Komputer</option>
                </Form.Select>
              </Col>
              <Col md={6} lg={3}>
                <Form.Select className="bg-light">
                  <option value="">Semua Status</option>
                  <option value="Aktif">Aktif</option>
                  <option value="Cuti">Cuti</option>
                  <option value="Tugas Belajar">Tugas Belajar</option>
                </Form.Select>
              </Col>
            </Row>
          </div>

          <div className="table-responsive">
            <Table striped bordered hover className="align-middle mb-0 text-center">
              <thead className="bg-light">
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Nim</th>
                  <th>Program</th>
                  <th>Judul</th>
                  <th>Mitra</th>
                  <th>Tanggal Mulai</th>
                  <th>Tanggal Selesai</th>
                  <th>Lembar Pengesahan</th>
                  <th>Laporan</th>
                  <th>Projek</th>
                  <th>Sertifikat</th>
                  <th>Konversi Nilai</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="14" className="text-center text-muted py-3">
                    Tidak ada data
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>

          <div className="p-3 border-top d-flex justify-content-between align-items-center">
            <div className="small text-muted">Menampilkan 1-5 dari 5 entri</div>
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

export default Msib;
