import { Container, Card, Table, Button, Row, Col, Form, InputGroup, Modal } from "react-bootstrap";
import { FiPlus, FiSearch, FiFilter, FiEye, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const TugasAkhir = () => {
  const navigate = useNavigate();
  const [tugasakhirList, setTugasAkhirList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTugasAkhir, setSelectedTugasAkhir] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchTugasAkhir();
  }, []);

  const fetchTugasAkhir = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tugas_akhir");
      setTugasAkhirList(response.data);
    } catch (error) {
      console.error("Gagal mengambil data TGA:", error);
    }
  };

  const deleteTugasAkhir = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus TGA ini?")) {
      try {
        await axios.delete(`http://localhost:5000/tugas_akhir/${id}`);
        fetchTugasAkhir();
      } catch (error) {
        console.error("Error deleting TGA:", error);
      }
    }
  };

  const handleDownload = (filename) => {
    if (!filename) return;
    window.open(`http://localhost:5000/uploads/kegiatan_mahasiswa/${filename}`, "_blank");
  };

  const handleShowDetail = (tugas_akhir) => {
    setSelectedTugasAkhir(tugas_akhir);
    setShowDetailModal(true);
  };

  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setSelectedTugasAkhir(null);
  };

  const filteredTugasAkhir = tugasakhirList.filter((tugas_akhir) => {
    return tugas_akhir.nama.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalItems = filteredTugasAkhir.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedTugasAkhir = filteredTugasAkhir.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container fluid className="p-4">
      <Card className="mb-4 shadow border-0">
        <Card.Body className="p-4">
          <Row className="align-items-center">
            <Col>
              <h2 className="mb-1 fw-bold">Tugas Akhir</h2>
              <p className="text-muted mb-0">
                Daftar Tugas Akhir Mahasiswa Sistem Informasi
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
                  <th className="py-3">NO Hp</th>
                  <th className="py-3">Skripsi Versi Distribusi</th>
                  <th className="py-3">Program TGA</th>
                  <th className="py-3">Jurnal Skripsi Dengan Format Sisfo</th>
                  <th className="py-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTugasAkhir.length > 0 ? (
                  paginatedTugasAkhir.map((tugas_akhir, index) => (
                    <tr key={tugas_akhir.id}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{tugas_akhir.nama}</td>
                      <td>{tugas_akhir.nim}</td>
                      <td>{tugas_akhir.no_hp}</td>
                      <td>
                        {tugas_akhir.skripsi && (
                          <Button
                            size="sm"
                            variant="link"
                            onClick={() => handleDownload(tugas_akhir.skripsi)}
                          >
                            Lihat
                          </Button>
                        )}
                      </td>
                      <td>
                        {tugas_akhir.program_tga && (
                          <Button
                            size="sm"
                            variant="link"
                            onClick={() => handleDownload(tugas_akhir.program_tga)}
                          >
                            Lihat
                          </Button>
                        )}
                      </td>
                      <td>
                        {tugas_akhir.jurnal_sisfo && (
                          <Button
                            size="sm"
                            variant="link"
                            onClick={() => handleDownload(tugas_akhir.jurnal_sisfo)}
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
                            onClick={() => handleShowDetail(tugas_akhir)}
                          >
                            <FiEye size={16} />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="rounded-2 px-2 py-1"
                            title="Hapus"
                            onClick={() => deleteTugasAkhir(tugas_akhir.id)}
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
          {selectedTugasAkhir && (
            <div className="">
              <p><strong>Nama:</strong> {selectedTugasAkhir.nama}</p>
              <p><strong>NIM:</strong> {selectedTugasAkhir.nim}</p>
              <p><strong>No HP:</strong> {selectedTugasAkhir.no_hp}</p>
              <p><strong>Skripsi Versi Distribusi:</strong> <Button variant="link" onClick={() => handleDownload(selectedTugasAkhir.skripsi)}>Lihat</Button></p>
              <p><strong>Program TGA:</strong> <Button variant="link" onClick={() => handleDownload(selectedTugasAkhir.program_tga)}>Lihat</Button></p>
              <p><strong>Jurnal Skripsi Format Sisfo:</strong> <Button variant="link" onClick={() => handleDownload(selectedTugasAkhir.jurnal_sisfo)}>Lihat</Button></p>
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

export default TugasAkhir;