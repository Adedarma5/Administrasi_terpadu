import React, { useEffect, useState } from "react";
import { Container, Card, Table, Button, Row, Col, Form, InputGroup, Modal } from "react-bootstrap";
import { FiPlus, FiSearch, FiFilter, FiEye, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const KerjaPraktik = () => {
  const navigate = useNavigate();
  const [kerjapraktikList, setKerjaPraktikList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedKerjaPraktik, setSelectedKerjaPraktik] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchKerjaPraktik();
  }, []);

  const fetchKerjaPraktik = async () => {
    try {
      const response = await axios.get("http://localhost:5000/kerja_praktik");
      setKerjaPraktikList(response.data);
    } catch (error) {
      console.error("Gagal mengambil data Kerja Praktik:", error);
    }
  };

  const deleteMagangMandiri = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus Magang Mandiri ini?")) {
      try {
        await axios.delete(`http://localhost:5000/kerja_praktik/${id}`);
        fetchKerjaPraktik();
      } catch (error) {
        console.error("Error deleting magang mandiri:", error);
      }
    }
  };

  const handleDownload = (filename) => {
    if (!filename) return;
    window.open(`http://localhost:5000/uploads/kegiatan_mahasiswa/${filename}`, "_blank");
  };

  const handleShowDetail = (kerja_praktik) => {
    setSelectedKerjaPraktik(kerja_praktik);
    setShowDetailModal(true);
  };

  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setSelectedKerjaPraktik(null);
  };

  const filteredKerjaPraktik = kerjapraktikList.filter((kerja_praktik) => {
    return kerja_praktik.nama.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalItems = filteredKerjaPraktik.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedKerjaPraktik = filteredKerjaPraktik.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
          <div className="p-3 border-bottom">
            <Row className="align-items-center g-3">
              <Col md={{ span: 6, offset: 6 }} lg={{ span: 4, offset: 8 }}>
                <InputGroup>
                  <InputGroup.Text className="bg-light border-end-0">
                    <FiSearch size={16} />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Cari mahasiswa..."
                    className="border-start-0 bg-light"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>
            </Row>
          </div>

          <div className="table-responsive">
            <Table striped bordered hover className="text-center small">
              <thead className="bg-light">
                <tr>
                  <th>No</th>
                  <th className="px-5">Nama</th>
                  <th className="px-5"> NIM</th>
                  <th className="px-5">Dosen Pembimbing</th>
                  <th className="px-5">Judul</th>
                  <th className="px-3">Tempat KP</th>
                  <th>Tgl Mulai</th>
                  <th>Tgl Selesai</th>
                  <th>KRS Terakhir</th>
                  <th>Pengesahan Prodi</th>
                  <th>Pengesahan Pembimbing</th>
                  <th>Nilai Perusahaan</th>
                  <th>Daftar Hadir</th>
                  <th>Laporan</th>
                  <th>projek</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginatedKerjaPraktik.length > 0 ? (
                  paginatedKerjaPraktik.map((kerja_praktik, index) => (
                    <tr key={kerja_praktik.id}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{kerja_praktik.nama}</td>
                      <td>{kerja_praktik.nim}</td>
                      <td>{kerja_praktik.dosen_pembimbing}</td>
                      <td>{kerja_praktik.judul}</td>
                      <td>{kerja_praktik.tempat_kp}</td>
                      <td>{kerja_praktik.tanggal_mulai?.slice(0, 10)}</td>
                      <td>{kerja_praktik.tanggal_selesai?.slice(0, 10)}</td>
                      <td>
                        {kerja_praktik.krs_terakhir && (
                          <Button
                            size="sm"
                            variant="link"
                            onClick={() => handleDownload(kerja_praktik.krs_terakhir)}
                          >
                            Lihat
                          </Button>
                        )}
                      </td>
                      <td>
                        {kerja_praktik.pengesahan_prodi && (
                          <Button
                            size="sm"
                            variant="link"
                            onClick={() => handleDownload(kerja_praktik.pengesahan_prodi)}
                          >
                            Lihat
                          </Button>
                        )}
                      </td>
                      <td>
                        {kerja_praktik.pengesahan_pembimbing && (
                          <Button
                            size="sm"
                            variant="link"
                            onClick={() => handleDownload(kerja_praktik.pengesahan_pembimbing)}
                          >
                            Lihat
                          </Button>
                        )}
                      </td>
                      <td>
                        {kerja_praktik.nilai_perusahaan && (
                          <Button
                            size="sm"
                            variant="link"
                            onClick={() => handleDownload(kerja_praktik.nilai_perusahaan)}
                          >
                            Lihat
                          </Button>
                        )}
                      </td>
                      <td>
                        {kerja_praktik.daftar_hadir && (
                          <Button
                            size="sm"
                            variant="link"
                            onClick={() => handleDownload(kerja_praktik.daftar_hadir)}
                          >
                            Lihat
                          </Button>
                        )}
                      </td>
                      <td>
                        {kerja_praktik.laporan && (
                          <Button
                            size="sm"
                            variant="link"
                            onClick={() => handleDownload(kerja_praktik.laporan)}
                          >
                            Lihat
                          </Button>
                        )}
                      </td>
                      <td>
                        {kerja_praktik.projek ? (
                          <Button
                            size="sm"
                            variant="link"
                            onClick={() => handleDownload(kerja_praktik.projek)}
                            
                          >
                            Lihat
                          </Button>
                        ) : (
                          <span className="text-muted">Tidak ada file</span> 
                        )}
                      </td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <Button
                            variant="outline-warning"
                            size="sm"
                            className="rounded-2 px-2 py-1"
                            title="Lihat Detail"
                            onClick={() => handleShowDetail(kerja_praktik)}
                          >
                            <FiEye size={16} />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="rounded-2 px-2 py-1"
                            title="Hapus"
                            onClick={() => deleteMagangMandiri(kerja_praktik.id)}
                          >
                            <FiTrash2 size={16} />
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
                        <p className="text-muted mb-0">Tidak ada data yang tersedia</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          <div className="p-3 border-top d-flex justify-content-between align-items-center">
            <div className="small text-muted">
              Menampilkan {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems} entri
            </div>
            <div>
              <Button
                className="mx-2"
                variant="outline-primary"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Sebelumnya
              </Button>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Selanjutnya
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showDetailModal} onHide={handleCloseDetail} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detail Magang Mandiri</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedKerjaPraktik && (
            <div className="">
              <p><strong>Nama:</strong> {selectedKerjaPraktik.nama}</p>
              <p><strong>NIM:</strong> {selectedKerjaPraktik.nim}</p>
              <p><strong>Dosen Pembimbing:</strong> {selectedKerjaPraktik.dosen_pembimbing}</p>
              <p><strong>Judul:</strong> {selectedKerjaPraktik.judul}</p>
              <p><strong>Tempat KP:</strong> {selectedKerjaPraktik.tempat_kp}</p>
              <p><strong>Tanggal Mulai:</strong> {selectedKerjaPraktik.tanggal_mulai?.slice(0, 10)}</p>
              <p><strong>Tanggal Selesai:</strong> {selectedKerjaPraktik.tanggal_selesai?.slice(0, 10)}</p>
              <p><strong>Krs Terakhir:</strong> <Button variant="link" onClick={() => handleDownload(selectedKerjaPraktik.krs_terakhir)}>Lihat</Button></p>
              <p><strong>Pengesahan Prodi:</strong> <Button variant="link" onClick={() => handleDownload(selectedKerjaPraktik.pengesahan_prodi)}>Lihat</Button></p>
              <p><strong>Pengesahan Pembimbing:</strong> <Button variant="link" onClick={() => handleDownload(selectedKerjaPraktik.pengesahan_pembimbing)}>Lihat</Button></p>
              <p><strong>Nilai Dari Perusahaan:</strong> <Button variant="link" onClick={() => handleDownload(selectedKerjaPraktik.nilai_perusahaan)}>Lihat</Button></p>
              <p><strong>Daftar Hadir Tempat KP:</strong> <Button variant="link" onClick={() => handleDownload(selectedKerjaPraktik.daftar_hadir)}>Lihat</Button></p>
              <p><strong>Laporan:</strong> <Button variant="link" onClick={() => handleDownload(selectedKerjaPraktik.laporan)}>Lihat</Button></p>
              <p><strong>Projek:</strong> <Button variant="link" onClick={() => handleDownload(selectedKerjaPraktik.projek)}>Lihat</Button></p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetail}>Tutup</Button>
        </Modal.Footer>
      </Modal>
    </Container >
  );
};

export default KerjaPraktik;