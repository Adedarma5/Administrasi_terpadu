import { Container, Card, Table, Button, Row, Col, Form, InputGroup, Modal } from "react-bootstrap";
import { FiPlus, FiSearch, FiFilter, FiEye, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Prestasi = () => {
  const navigate = useNavigate();
  const [prestasiList, setPrestasiList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPrestasi, setSelectedPrestasi] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchPrestasi();
  }, []);

  const fetchPrestasi = async () => {
    try {
      const response = await axios.get("http://localhost:5000/prestasi");
      setPrestasiList(response.data);
    } catch (error) {
      console.error("Gagal mengambil data Prestasi:", error);
    }
  };

  const deletePrestasi = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus Prestasi ini?")) {
      try {
        await axios.delete(`http://localhost:5000/prestasi/${id}`);
        fetchPrestasi();
      } catch (error) {
        console.error("Error deleting Prestasi:", error);
      }
    }
  };

  const handleDownload = (filename) => {
    if (!filename) return;
    window.open(`http://localhost:5000/uploads/kegiatan_mahasiswa/${filename}`, "_blank");
  };

  const handleShowDetail = (prestasi) => {
    setSelectedPrestasi(prestasi);
    setShowDetailModal(true);
  };

  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setSelectedPrestasi(null);
  };

  const filteredPrestasi = prestasiList.filter((prestasi) => {
    return prestasi.nama.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalItems = filteredPrestasi.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedPrestasi = filteredPrestasi.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container fluid className="p-4">
      <Row className="align-items-center p-4">
        <Col>
          <h2 className="mb-1 fw-bold text-white text-uppercase">Prestasi</h2>
          <p className="text-muted mb-0">
            Daftar Prestasi Mahasiswa Sistem Informasi
          </p>
        </Col>
      </Row>


      <Card className="shadow border-0">
        <Card.Body className="p-0">
          <div className="p-3 border-bottom">
            <Row className="align-items-center g-3">
              <Col className="ms-auto" md={6} lg={4}>
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
            <Table striped bordered  className="align-middle mb-0 text-center">
              <thead className="bg-light">
                <tr>
                  <th className="py-3">No</th>
                  <th className="py-3">Nama</th>
                  <th className="py-3">Nim</th>
                  <th className="py-3">Kategori Peserta</th>
                  <th className="py-3">Tingkatan</th>
                  <th className="py-3">Nama Perlombaan</th>
                  <th className="py-3">Bidang Perlombaan</th>
                  <th className="py-3">Sertifikat</th>
                  <th className="py-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPrestasi.length > 0 ? (
                  paginatedPrestasi.map((prestasi, index) => (
                    <tr key={prestasi.id}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{prestasi.nama}</td>
                      <td>{prestasi.nim}</td>
                      <td>{prestasi.kategori_peserta}</td>
                      <td>{prestasi.tingkatan}</td>
                      <td>{prestasi.nama_perlombaan}</td>
                      <td>{prestasi.bidang_perlombaan}</td>
                      <td>
                        {prestasi.sertifikat && (
                          <Button
                            size="sm"
                            variant="link"
                            onClick={() => handleDownload(prestasi.sertifikat)}
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
                            onClick={() => handleShowDetail(prestasi)}
                          >
                            <FiEye size={16} />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="rounded-2 px-2 py-1"
                            title="Hapus"
                            onClick={() => deletePrestasi(prestasi.id)}
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
          {selectedPrestasi && (
            <div className="">
              <p><strong>Nama:</strong> {selectedPrestasi.nama}</p>
              <p><strong>NIM:</strong> {selectedPrestasi.nim}</p>
              <p><strong>Kategori Peserta:</strong> {selectedPrestasi.kategori_peserta}</p>
              <p><strong>Tingkatan:</strong> {selectedPrestasi.tingkatan}</p>
              <p><strong>Nama Perlombaan:</strong> {selectedPrestasi.nama_perlombaan}</p>
              <p><strong>Bidang Perlombaan:</strong> {selectedPrestasi.bidang_perlombaan}</p>
              <p><strong>Sertifikat:</strong> <Button variant="link" onClick={() => handleDownload(selectedPrestasi.sertifikat)}>Lihat</Button></p>
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

export default Prestasi;