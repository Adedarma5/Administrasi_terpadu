import { Container, Card, Table, Button, Row, Col, Form, InputGroup, Modal } from "react-bootstrap";
import { FiPlus, FiSearch, FiFilter, FiEye, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Pmm = () => {
  const navigate = useNavigate();
  const [pmmList, setPmmList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPmm, setSelectedPmm] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchPmm();
  }, []);

  const fetchPmm = async () => {
    try {
      const response = await axios.get("http://localhost:5000/pmm");
      setPmmList(response.data);
    } catch (error) {
      console.error("Gagal mengambil data Pmm:", error);
    }
  };

  const deletePmm = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus Pmm ini?")) {
      try {
        await axios.delete(`http://localhost:5000/pmm/${id}`);
        fetchPmm();
      } catch (error) {
        console.error("Error deleting Pmm:", error);
      }
    }
  };

  const handleDownload = (filename) => {
    if (!filename) return;
    window.open(`http://localhost:5000/uploads/kegiatan_mahasiswa/${filename}`, "_blank");
  };

  const handleShowDetail = (prestasi) => {
    setSelectedPmm(prestasi);
    setShowDetailModal(true);
  };

  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setSelectedPmm(null);
  };

  const filteredPmm = pmmList.filter((prestasi) => {
    return prestasi.nama.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalItems = filteredPmm.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedPmm = filteredPmm.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container fluid className="p-4">
      <Card className="mb-4 shadow border-0">
        <Card.Body className="p-4">
          <Row className="align-items-center">
            <Col>
              <h2 className="mb-1 fw-bold text-uppercase">Pertukaran Mahasiswa</h2>
              <p className="text-muted mb-0">
                Daftar Pertukaran Mahasiswa Sistem Informasi
              </p>
            </Col>
            <Col xs="auto">
              {/* <Button variant="primary" className="d-flex align-items-center gap-2" onClick={() => navigate("/admin/dashboard/prestasi/tambahprestasi")}>
                <FiPlus size={18} />
                <span>Tambah Prestasi</span>
              </Button> */}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="shadow border-0">
        <Card.Body className="p-0">
          <div className="p-3 border-bottom">
            <Row className="align-items-center g-3">
              <Col className="ms-auto" md={6} lg={6}>
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
            <Table striped bordered over className="align-middle mb-0 text-center">
              <thead className="bg-light">
                <tr>
                  <th className="py-3">No</th>
                  <th className="py-3">Nama</th>
                  <th className="py-3">Nim</th>
                  <th className="py-3">Stambuk</th>
                  <th className="py-3">Nama Universitas</th>
                  <th className="py-3">Konversi Nilai</th>
                  <th className="py-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPmm.length > 0 ? (
                  paginatedPmm.map((pmm, index) => (
                    <tr key={pmm.id}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{pmm.nama}</td>
                      <td>{pmm.nim}</td>
                      <td>{pmm.stambuk}</td>
                      <td>{pmm.nama_universitas}</td>
                      <td>
                        {pmm.konversi_nilai && (
                          <Button
                            size="sm"
                            variant="link"
                            onClick={() => handleDownload(pmm.konversi_nilai)}
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
                            onClick={() => handleShowDetail(pmm)}
                          >
                            <FiEye size={16} />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="rounded-2 px-2 py-1"
                            title="Hapus"
                            onClick={() => deletePmm(pmm.id)}
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
          {selectedPmm && (
            <div className="">
              <p><strong>Nama:</strong> {selectedPmm.nama}</p>
              <p><strong>NIM:</strong> {selectedPmm.nim}</p>
              <p><strong>Stambuk:</strong> {selectedPmm.stambuk}</p>
              <p><strong>Nama Universitas:</strong> {selectedPmm.nama_universitas}</p>
              <p><strong>Konversi Nilai:</strong> <Button variant="link" onClick={() => handleDownload(selectedPmm.konversi_nilai)}>Lihat</Button></p>
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

export default Pmm;