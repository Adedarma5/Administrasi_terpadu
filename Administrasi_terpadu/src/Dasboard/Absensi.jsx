import React, { useState, useEffect } from "react";
import { Container, Card, Table, Button, Row, Col, Form, InputGroup, Spinner, Alert } from "react-bootstrap";
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Absensi = () => {
  const navigate = useNavigate();
  const [absensiList, setAbsensiList] = useState([]);
  const [matakuliahList, setMataKuliahList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedmatakuliah, setSelectedMataKuliah] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchAbsensi();
    fetchMataKuliah();
  }, []);

  const fetchAbsensi = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = "http://localhost:5000/absensi";
  
      if (user?.role === "user") {
        url = `http://localhost:5000/absensi?userId=${user.id}`;
      }
  
      const token = localStorage.getItem('token'); 
  
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      setAbsensiList(response.data);
    } catch (error) {
      setError("Gagal memuat data Absensi.");
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };
  

  const fetchMataKuliah = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5000/mata_kuliah");
      setMataKuliahList(response.data);
    } catch (error) {
      setError("Gagal memuat data Mata Kuliah.");
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const deleteAbsensi = async (id) => {
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
        await axios.delete(`http://localhost:5000/absensi/${id}`);
        fetchAbsensi();
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

  const filteredAbsensi = absensiList.filter((absensi) => {
    const jam_pelajaranMatch = absensi.jam_pelajaran?.toLowerCase().includes(searchTerm.toLowerCase());
    const matakuliahMatch = selectedmatakuliah === "" || absensi.mata_kuliah?.toString() === selectedmatakuliah;
    return jam_pelajaranMatch && matakuliahMatch;
  });

  const totalItems = filteredAbsensi.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedAbsensi = filteredAbsensi.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  return (
    <Container fluid className="p-4">
      <Row className="align-items-center p-4">
        <Col>
          <h2 className="mb-1 fw-bold text-white">ABSENSI DOSEN</h2>
          <p className="text-muted mb-0">
            Daftar Absensi Dosen Sistem Informasi
          </p>
        </Col>
        <Col xs="auto">
          <Button variant="success" onClick={() => navigate("/admin/dashboard/absensi/tambahabsensi")} className=" shadow d-flex align-items-center gap-2">
            <FiPlus size={18} />
            <span>Tambah Absensi</span>
          </Button>
        </Col>
      </Row>


      <Card className="shadow border-0">
        <Card.Body className="p-0">
          <Card.Header className="bg-white py-3 border-bottom">
            <div className="d-flex align-items-center flex-wrap gap-3">
              <div className="ms-auto col-md-6 col-lg-4">
                <InputGroup size="sm" className="border rounded overflow-hidden">
                  <InputGroup.Text className="bg-white border-0">
                    <FiSearch size={16} className="text-primary" />
                  </InputGroup.Text>
                  <Form.Control
                    size="sm"
                    placeholder="Cari Jadwal Jam Pelajaran Mata Kuliah"
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
              <Table striped bordered hover className="align-middle mb-0 text-center">
                <thead className="bg-light">
                  <tr>
                    <th className="py-3">No</th>
                    <th className="py-3">Nama </th>
                    <th className="py-3">Mata Kuliah</th>
                    <th className="py-3">Jam Pelajaran</th>
                    <th className="py-3">Foto</th>
                    <th className="py-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedAbsensi.length > 0 ? (
                    paginatedAbsensi.map((absensi, index) => (
                      <tr key={absensi.id}>
                        <td className="fw-medium">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                        <td>{absensi.name}</td>
                        <td>{absensi.mata_kuliah}</td>
                        <td>{absensi.jam_pelajaran}</td>
                        <td>
                          <a
                            href={`http://localhost:5000/uploads/absensi/${absensi.foto}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Lihat FOTO
                          </a>
                        </td>
                        <td>
                          <div className="d-flex justify-content-center gap-2">
                            <Button
                              variant="outline-success"
                              size="sm"
                              title="Edit"
                              onClick={() => navigate(`/admin/dashboard/absensi/editabsensi/${absensi.id}`)}

                            >
                              <FiEdit2 size={15} />
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              title="Hapus"
                              onClick={() => deleteAbsensi(absensi.id)}>
                              <FiTrash2 size={15} />
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
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Absensi;