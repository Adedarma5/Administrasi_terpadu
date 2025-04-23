import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Card, Table, Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import { FiPlus, FiSearch, FiFilter, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Penelitian = () => {
  const [penelitianList, setPenelitianList] = useState([]);
  const [dosenList, setDosenList] = useState([]);
  const [selectedDosen, setSelectedDosen] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchPenelitian();
    fetchDosen();
  }, []);

  const fetchPenelitian = async () => {
    try {
      const response = await axios.get("http://localhost:5000/penelitian");
      setPenelitianList(response.data);
    } catch (error) {
      console.error("Error fetching penelitian:", error);
    }
  };

  const fetchDosen = async () => {
    try {
      const response = await axios.get("http://localhost:5000/dosen");
      setDosenList(response.data);
    } catch (error) {
      console.error("Error fetching dosen:", error);
    }
  };

  const deletePenelitian = async (id) => {
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
        await axios.delete(`http://localhost:5000/penelitian/${id}`);
        fetchPenelitian();
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

  const filteredPenelitian = penelitianList.filter((penelitian) => {
    const nameMatch = penelitian.nama_dosen?.toLowerCase().includes(searchTerm.toLowerCase());
    const dosenMatch = selectedDosen === "" || penelitian.nama_dosen === selectedDosen;
    return nameMatch && dosenMatch;
  });

  const totalItems = filteredPenelitian.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedPenelitian = filteredPenelitian.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container fluid className="p-4">
      <Row className="align-items-center p-4">
        <Col>
          <h2 className="mb-1 fw-bold text-white">PENELITIAN</h2>
          <p className="text-muted mb-0">Daftar Penelitian Dosen Sistem Informasi</p>
        </Col>
        <Col xs="auto">
          <Button variant="success" onClick={() => navigate("/admin/dashboard/penelitian/tambahpenelitian")} className="shadow d-flex align-items-center gap-2">
            <FiPlus size={18} />
            <span>Tambah Penelitian</span>
          </Button>
        </Col>
      </Row>

      <Card className="shadow border-0">
        <Card.Body className="p-0">
          <Card className="shadow-sm border-0 overflow-hidden">
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
                    value={selectedDosen}
                    onChange={(e) => {
                      setSelectedDosen(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="shadow-none py-1"
                  >
                    <option value="">-- Semua Dosen --</option>
                    {dosenList.map((dosen) => (
                      <option key={dosen.id} value={dosen.name}>
                        {dosen.name}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </div>
            </Card.Header>

            <Card.Body className="p-0 text-center">
              <div className="table-responsive">
                <Table striped bordered hover className="align-middle mb-0" size="sm">
                  <thead>
                    <tr className="bg-light">
                      <th>No</th>
                      <th>Judul Penelitian</th>
                      <th>Nama Dosen</th>
                      <th>Ketua Tim</th>
                      <th>Anggota Tim</th>
                      <th>Laporan</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedPenelitian.length > 0 ? (
                      paginatedPenelitian.map((penelitian, index) => (
                        <tr key={penelitian.id}>
                          <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                          <td>{penelitian.judul_penelitian}</td>
                          <td>{penelitian.nama_dosen}</td>
                          <td>{penelitian.ketua_tim}</td>
                          <td>{penelitian.anggota_tim}</td>
                          <td>
                            <a
                              href={`http://localhost:5000/uploads/penelitian/${penelitian.file_laporan}`}
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
                                onClick={() => navigate(`/admin/dashboard/penelitian/editpenelitian/${penelitian.id}`)}
                              >
                                <FiEdit2 size={15} />
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => deletePenelitian(penelitian.id)}
                              >
                                <FiTrash2 size={15} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center py-4">
                          <FiFilter size={32} className="text-muted mb-2" />
                          <p className="text-muted">Tidak ada data dosen yang tersedia</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>

            <div className="p-3 border-top d-flex justify-content-between align-items-center">
              <div className="small text-muted">
                Menampilkan {(currentPage - 1) * itemsPerPage + 1} -{" "}
                {Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems} entri
              </div>
              <div>
                <Button
                  variant="outline-primary"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="me-2"
                >
                  Sebelumnya
                </Button>
                <Button
                  variant="outline-primary"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Selanjutnya
                </Button>
              </div>
            </div>
          </Card>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Penelitian;
