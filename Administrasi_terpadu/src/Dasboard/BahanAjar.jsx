import React, { useState, useEffect } from "react";
import { Container, Card, Table, Button, Row, Col, Form, InputGroup, Spinner, Alert } from "react-bootstrap";
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const BahanAjar = () => {
  const navigate = useNavigate();
  const [bahanajarList, setBahanAjarList] = useState([]);
  const [matakuliahList, setMataKuliahList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedmatakuliah, setSelectedMataKuliah] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchBahanAjar();
    fetchMataKuliah();
  }, []);

  const fetchBahanAjar = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5000/bahan_ajar");
      setBahanAjarList(response.data);
    } catch (error) {
      setError("Gagal memuat data bahan ajar.");
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const fetchMataKuliah = async () => {
    try {
      const response = await axios.get("http://localhost:5000/mata_kuliah");
      setMataKuliahList(response.data);
    } catch (error) {
      console.error("Gagal memuat mata kuliah:", error);
    }
  };


  const deleteBahanAjar = async (id) => {
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/bahan_ajar/${id}`);
        fetchBahanAjar();
        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Data berhasil dihapus.',
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error deleting:", error);
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Terjadi kesalahan saat menghapus data.',
        });
      }
    }
  };

  const filteredBahanAjar = bahanajarList.filter((bahan_ajar) => {
    const nameMatch = bahan_ajar.dosen_pengampu?.toLowerCase().includes(searchTerm.toLowerCase());
    const matakuliahMatch = selectedmatakuliah === "" || bahan_ajar.name?.toString() === selectedmatakuliah;
    return nameMatch && matakuliahMatch;
  });

  const sortedBahanAjar = filteredBahanAjar.sort((a, b) => a.pertemuan - b.pertemuan);
  const totalItems = sortedBahanAjar.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedBahanAjar = sortedBahanAjar.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Container fluid className="p-4">
      <Row className="align-items-center p-4">
        <Col>
          <h2 className="mb-1 fw-bold text-white">BAHAN AJAR</h2>
          <p className="text-muted mb-0">Daftar bahan ajar mata kuliah</p>
        </Col>
        <Col xs="auto">
          <Button
            variant="success"
            className=" shadow d-flex align-items-center gap-2"
            onClick={() => navigate('/admin/dashboard/BahanAjar/TambahBahanAjar')}
          >
            <FiPlus size={18} />
            <span>Tambah Bahan Ajar</span>
          </Button>
        </Col>
      </Row>

      <Card className="shadow border-0">
        <Card.Body className="p-0">
          <div className="p-3 border-bottom">
          <Row className="align-items-center g-3">
            <Col md={6} lg={5}>
              <h5 className="mb-0 fw-semibold">Daftar Bahan Ajar Sistem Informasi</h5>
            </Col>
          </Row>
        </div>

        <Card.Header className="bg-white py-3 border-bottom">
          <div className="d-flex align-items-center flex-wrap gap-3">
            <div className="ms-auto col-md-6 col-lg-4">
              <InputGroup size="sm" className="border rounded overflow-hidden">
                <InputGroup.Text className="bg-white border-0">
                  <FiSearch size={16} className="text-primary" />
                </InputGroup.Text>
                <Form.Control
                  size="sm"
                  placeholder="Cari nama Dosen..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="border-0 shadow-none py-1"
                />
              </InputGroup>
            </div>

            <div className="col-md-4 col-lg-3">
              <Form.Select
                value={selectedmatakuliah}
                onChange={(e) => {
                  setSelectedMataKuliah(e.target.value);
                  setCurrentPage(1);
                }}
                className="shadow-none py-1"
              >
                <option value="">-- Semua Mata Kuliah --</option>
                {matakuliahList.map((mata_kuliah) => (
                  <option key={mata_kuliah.id} value={mata_kuliah.name}>
                    {mata_kuliah.name}
                  </option>
                ))}
              </Form.Select>
            </div>
          </div>
        </Card.Header>

        <div className="table-responsive">
          {loading ? (
            <div className="text-center p-4">
              <Spinner animation="border" />
            </div>
          ) : error ? (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          ) : (
            <Table striped bordered hover className="align-middle mb-0 text-center" size="sm">
              <thead className="bg-light">
                <tr>
                  <th>No</th>
                  <th>Nama Mata Kuliah</th>
                  <th>Judul Materi</th>
                  <th>Dosen Pengampu</th>
                  <th>Pertemuan</th>
                  <th>File Pendukung</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginatedBahanAjar.length > 0 ? (
                  paginatedBahanAjar.map((item, index) => (
                    <tr key={item.id}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.judul_materi}</td>
                      <td>{item.dosen_pengampu}</td>
                      <td>{item.pertemuan}</td>
                      <td>
                        <a
                          href={`http://localhost:5000/uploads/bahan_ajar/${item.file_pendukung}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Lihat PDF
                        </a>
                      </td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <Button
                            variant="outline-success"
                            size="sm"
                            title="Edit"
                            onClick={() => navigate(`/admin/dashboard/bahanajar/editbahanajar/${item.id}`)}
                          >
                            <FiEdit2 size={16} />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => deleteBahanAjar(item.id)}>
                            <FiTrash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-muted py-3">
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </div>
      </Card.Body>

      <div className="p-3 border-top d-flex justify-content-between align-items-center">
        <div className="small text-muted">
          Menampilkan {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems} entri
        </div>
        <div>
          <Button variant="outline-primary" size="sm" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="mx-4">
            Sebelumnya
          </Button>
          <Button variant="outline-primary" size="sm" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
            Selanjutnya
          </Button>
        </div>
      </div>
    </Card>
    </Container >
  );
};

export default BahanAjar;
