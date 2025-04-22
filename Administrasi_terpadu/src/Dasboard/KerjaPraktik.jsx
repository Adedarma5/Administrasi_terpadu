import React from "react";
import { Container, Card, Table, Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import { FiPlus, FiSearch, FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";

const KerjaPraktik = () => {
  return (
    <Container fluid className="p-4">
      <Card className="mb-4 shadow border-0">
        <Card.Body className="p-3">
          <Row className="align-items-center">
            <Col>
              <h4 className="fw-bold">Kerja Praktik</h4>
              <p className="text-muted mb-0 small">Daftar Kerja Praktik Mahasiswa Sistem Informasi</p>
            </Col>
            <Col xs="auto">
              <Button variant="primary" size="sm" className="d-flex align-items-center gap-2">
                <FiPlus size={16} />
                <span>Tambah Data</span>
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="shadow border-0">
        <Card.Body className="p-2">
          <Row className="g-2 mb-3">
            <Col md={6} lg={4}>
              <InputGroup size="sm">
                <InputGroup.Text className="bg-light border-end-0">
                  <FiSearch size={14} />
                </InputGroup.Text>
                <Form.Control placeholder="Cari nama atau NIM..." className="border-start-0" />
              </InputGroup>
            </Col>
            <Col md={6} lg={3}>
              <Form.Select size="sm">
                <option value="">Bidang Keahlian</option>
                <option value="AI">Kecerdasan Buatan</option>
                <option value="SI">Sistem Informasi</option>
              </Form.Select>
            </Col>
            <Col md={6} lg={3}>
              <Form.Select size="sm">
                <option value="">Status</option>
                <option value="Aktif">Aktif</option>
                <option value="Cuti">Cuti</option>
              </Form.Select>
            </Col>
          </Row>

          <div className="table-responsive">
            <Table striped bordered hover className="text-center small">
              <thead className="bg-light">
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>NIM</th>
                  <th>Dosen Pembimbing</th>
                  <th>Judul</th>
                  <th>Tempat KP</th>
                  <th>Tgl Mulai</th>
                  <th>Tgl Selesai</th>
                  <th>KRS Terakhir</th>
                  <th>Pengesahan Prodi</th>
                  <th>Pengesahan Pembimbing</th>
                  <th>Nilai Perusahaan</th>
                  <th>Daftar Hadir</th>
                  <th>Laporan</th>
                  <th>Program</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="16" className="text-center text-muted py-3">Tidak ada data</td>
                </tr>
              </tbody>
            </Table>
          </div>

          <div className="p-2 border-top d-flex justify-content-between align-items-center">
            <span className="small text-muted">Menampilkan 1-5 dari 5 entri</span>
            <div>
              <Button variant="outline-primary" size="sm" className="me-1" disabled>
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

export default KerjaPraktik;