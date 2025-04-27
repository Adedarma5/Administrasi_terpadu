import React, { useEffect, useState } from "react";
import { Container, Card, Table, Button, Row, Col, Form, InputGroup, Modal } from "react-bootstrap";
import { FiPlus, FiSearch, FiFilter, FiEye, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MagangMandiri = () => {
  const navigate = useNavigate();
  const [magangmandiriList, setMagangMandiriList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMagangMandiri, setSelectedMagangMandiri] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchMagangMandiri();
  }, []);

  const fetchMagangMandiri = async () => {
    try {
      const response = await axios.get("http://localhost:5000/magang_mandiri");
      setMagangMandiriList(response.data);
    } catch (error) {
      console.error("Gagal mengambil data Magang Mandiri:", error);
    }
  };

  const deleteMagangMandiri = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus Magang Mandiri ini?")) {
      try {
        await axios.delete(`http://localhost:5000/magang_mandiri/${id}`);
        fetchMagangMandiri();
      } catch (error) {
        console.error("Error deleting magang mandiri:", error);
      }
    }
  };

  const handleDownload = (filename) => {
    if (!filename) return;
    window.open(`http://localhost:5000/uploads/kegiatan_mahasiswa/${filename}`, "_blank");
  };

  const handleShowDetail = (magang_mandiri) => {
    setSelectedMagangMandiri(magang_mandiri);
    setShowDetailModal(true);
  };

  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setSelectedMagangMandiri(null);
  };

  const filteredMagangMandiri = magangmandiriList.filter((magang_mandiri) => {
    return magang_mandiri.nama.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalItems = filteredMagangMandiri.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedMagangMandiri = filteredMagangMandiri.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container fluid className="p-4">
      <Row className="align-items-center p-4">
        <Col>
          <h2 className="mb-1 fw-bold text-white">MAGANG MANDIRI</h2>
          <p className="text-muted mb-0">Daftar Magang Mandiri Mahasiswa Sistem Informasi</p>
        </Col>
      </Row>

      <Card className="shadow border-0">
        <Card.Body className="p-0">
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
            <Table striped bordered className="align-middle mb-0 text-center">
              <thead className="bg-light">
                <tr>
                  <th className="py-3">No</th>
                  <th className="py-3">Nama</th>
                  <th className="py-3">Nim</th>
                  <th className="py-3">Nama Perusahaan</th>
                  <th className="py-3">Tanggal Mulai</th>
                  <th className="py-3">Tanggal Selesai</th>
                  <th className="py-3">Sertifikat</th>
                  <th className="py-3">Konversi Nilai</th>
                  <th className="py-3">File Laporan</th>
                  <th className="py-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginatedMagangMandiri.length > 0 ? (
                  paginatedMagangMandiri.map((magang_mandiri, index) => (
                    <tr key={magang_mandiri.id}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{magang_mandiri.nama}</td>
                      <td>{magang_mandiri.nim}</td>
                      <td>{magang_mandiri.nama_perusahaan}</td>
                      <td>{magang_mandiri.tanggal_mulai?.slice(0, 10)}</td>
                      <td>{magang_mandiri.tanggal_selesai?.slice(0, 10)}</td>
                      <td>
                        {magang_mandiri.sertifikat && (
                          <Button
                            size="sm"
                            variant="link"
                            onClick={() => handleDownload(magang_mandiri.sertifikat)}
                          >
                            Lihat
                          </Button>
                        )}
                      </td>
                      <td>
                        {magang_mandiri.konversi_nilai && (
                          <Button
                            size="sm"
                            variant="link"
                            onClick={() => handleDownload(magang_mandiri.konversi_nilai)}
                          >
                            Lihat
                          </Button>
                        )}
                      </td>
                      <td>
                        {magang_mandiri.laporan && (
                          <Button
                            size="sm"
                            variant="link"
                            onClick={() => handleDownload(magang_mandiri.laporan)}
                          >
                            Lihat
                          </Button>
                        )}
                      </td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <Button
                            variant="outline-warning"
                            size="sm"
                            className="rounded-2 px-2 py-1"
                            title="Lihat Detail"
                            onClick={() => handleShowDetail(magang_mandiri)}
                          >
                            <FiEye size={16} />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="rounded-2 px-2 py-1"
                            title="Hapus"
                            onClick={() => deleteMagangMandiri(magang_mandiri.id)}
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
          {selectedMagangMandiri && (
            <div className="">
              <p><strong>Nama:</strong> {selectedMagangMandiri.nama}</p>
              <p><strong>NIM:</strong> {selectedMagangMandiri.nim}</p>
              <p><strong>Nama Perusahaan:</strong> {selectedMagangMandiri.nama_perusahaan}</p>
              <p><strong>Tanggal Mulai:</strong> {selectedMagangMandiri.tanggal_mulai?.slice(0, 10)}</p>
              <p><strong>Tanggal Selesai:</strong> {selectedMagangMandiri.tanggal_selesai?.slice(0, 10)}</p>
              <p><strong>Sertifikat:</strong> <Button variant="link" onClick={() => handleDownload(selectedMagangMandiri.sertifikat)}>Lihat</Button></p>
              <p><strong>Konversi Nilai:</strong> <Button variant="link" onClick={() => handleDownload(selectedMagangMandiri.konversi_nilai)}>Lihat</Button></p>
              <p><strong>Laporan:</strong> <Button variant="link" onClick={() => handleDownload(selectedMagangMandiri.laporan)}>Lihat</Button></p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetail}>Tutup</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MagangMandiri;
