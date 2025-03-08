import React, { useState, useEffect } from "react";
import { Container, Card, Table, Button, Row, Col, Form, InputGroup, Spinner, Alert } from "react-bootstrap";
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/id";
import axios from "axios";

const Absensi = () => {
  const navigate = useNavigate();
  const [absensiList, setAbsensiList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchAbsensi();
  }, []);

  const fetchAbsensi = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5000/absensi");
      setAbsensiList(response.data);
    } catch (error) {
      setError("Gagal memuat data Absensi.");
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const deleteAbsensi = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus Absensi ini?")) {
      try {
        await axios.delete(`http://localhost:5000/absensi/${id}`);
        fetchAbsensi();
      } catch (error) {
        alert("Gagal menghapus Absensi.");
        console.error("Error deleting Absensi:", error);
      }
    }
  };

  const filteredAbsensi = absensiList.filter((absensi) =>
    absensi.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    absensi.dosen_pengampu.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredAbsensi.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedAbsensi = filteredAbsensi.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  
  dayjs.extend(utc);
  dayjs.extend(timezone);


  return (
    <Container fluid className="p-4">
      <Card className="mb-4 shadow border-0">
        <Card.Body className="p-4">
          <Row className="align-items-center">
            <Col>
              <h2 className="mb-1 fw-bold">ABSENSI DOSEN</h2>
              <p className="text-muted mb-0">
                Daftar Absensi Dosen Sistem Informasi
              </p>
            </Col>
            <Col xs="auto">
              <Button variant="primary" onClick={() => navigate("/admin/dashboard/absensi/tambahabsensi")} className="d-flex align-items-center gap-2">
                <FiPlus size={18} />
                <span>Tambah Absensi</span>
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
                    placeholder="Cari Mata Kuliah"
                    className="border-start-0 bg-light"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>
            </Row>
          </div>


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
                    <th className="py-3">Waktu Input</th>
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
                        <td>{dayjs(absensi.waktu_input).tz("Asia/Jakarta").locale("id").format("dddd, HH:mm")} WIB</td> 
                        <td>
                          <div className="d-flex justify-content-center gap-2">
                            <Button variant="light" size="sm" title="Lihat Detail">
                              <FiEye size={16} />
                            </Button>
                            <Button
                              variant="light"
                              size="sm"
                              title="Edit"
                              onClick={() => navigate(`/admin/dashboard/bahanajar/editabsensi/${absensi.id}`)}
                              
                            >
                              <FiEdit2 size={16} />
                            </Button>
                            <Button variant="light" size="sm" title="Hapus" onClick={() => deleteAbsensi(absensi.id)}>
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