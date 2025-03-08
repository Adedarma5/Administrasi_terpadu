import React  from "react";
import { Container, Card, Table, Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import { FiPlus, FiSearch  } from "react-icons/fi";

const Msib = () => {
 
  return (
    <Container fluid className="p-4">
      <Card className="mb-4 shadow border-0">
        <Card.Body className="p-4">
          <Row className="align-items-center">
            <Col>
              <h2 className="mb-1 fw-bold">MSIB</h2>
              <p className="text-muted mb-0">
                Daftar Kegiatan MSIB Mahasiswa Sistem Informasi
              </p>
            </Col>
            <Col xs="auto">
              <Button variant="primary" className="d-flex align-items-center gap-2">
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
                  />
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
            <Table striped bordered over className="align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="py-3">NIP</th>
                  <th className="py-3">Nama Lengkap</th>
                  <th className="py-3">Pendidikan</th>
                  <th className="py-3">Bidang Keahlian</th>
                  <th className="py-3">Status</th>
                  <th className="py-3">Kontak</th>
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

          {/* Pagination section */}
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