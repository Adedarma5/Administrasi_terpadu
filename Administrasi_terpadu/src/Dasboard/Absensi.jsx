import React, { useState, useEffect, useRef } from "react";
import {
  Container, Card, Table, Button, Row, Col, Form, InputGroup,
  Spinner, Alert, Modal
} from "react-bootstrap";
import { FiPlus, FiSearch, FiBookOpen, FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useReactToPrint } from 'react-to-print';
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import "../Dist/Home.css";

const Absensi = () => {
  const navigate = useNavigate();
  const [absensiList, setAbsensiList] = useState([]);
  const [matakuliahList, setMataKuliahList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedmatakuliah, setSelectedMataKuliah] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAbsensi, setSelectedAbsensi] = useState(null);
  const [absensiPertemuanList, setAbsensiPertemuanList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const printRef = useRef();

  useEffect(() => {
    fetchAbsensi();
    fetchMataKuliah();
  }, []);

  const fetchAbsensi = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token');
    if (!token) {
      setError("Token tidak ditemukan. Silakan login ulang.");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get("http://localhost:5000/absensi", {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setAbsensiList(response.data);
    } catch (error) {
      setError("Gagal memuat data Absensi.");
    } finally {
      setLoading(false);
    }
  };

  const fetchMataKuliah = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5000/mata_kuliah");
      setMataKuliahList(response.data);
    } catch (error) {
      setError("Gagal memuat data Mata Kuliah.");
    }
    setLoading(false);
  };

  const deleteAbsensi = async (id) => {
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      const token = localStorage.getItem('token'); 

      try {
        await axios.delete(`http://localhost:5000/absensi/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        fetchAbsensi();
        Swal.fire("Berhasil!", "Data berhasil dihapus.", "success");
      } catch (error) {
        console.error(error); 
        Swal.fire("Gagal", "Terjadi kesalahan saat menghapus data.", "error");
      }
    }
  };


  const handleShowDetail = async (absensi) => {
    const token = localStorage.getItem("token");
    const url = `http://localhost:5000/absensipertemuan/byuser?absensi_id=${absensi.id}`;

    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSelectedAbsensi(absensi);
      setAbsensiPertemuanList(res.data);
      setShowDetailModal(true);
    } catch (err) {
      console.error("Gagal mengambil absensi pertemuan", err);
    }
  };




  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedAbsensi(null);
    setAbsensiPertemuanList([]);
  };

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "",
    onBeforeGetContent: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 100);
      });
    },
  });

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Laporan Absensi");

    worksheet.addRow(["No", "Nama", "Mata Kuliah", "kelas", "Jam", "Hari"]);

    for (let i = 0; i < filteredAbsensi.length; i++) {
      const absensi = filteredAbsensi[i];
      const row = worksheet.addRow([
        i + 1,
        absensi.name,
        absensi.mata_kuliah,
        absensi.kelas,
        absensi.jam,
        absensi.hari,

      ]);

      try {
        const blob = await response.blob();
        const buffer = await blob.arrayBuffer();

        const imageId = workbook.addImage({
          buffer,
          extension: 'jpeg',
        });

        worksheet.addImage(imageId, {
          tl: { col: 4, row: row.number - 1 },
          ext: { width: 100, height: 100 }
        });

        worksheet.getRow(row.number).height = 80;
      } catch (err) {
        console.warn("Gagal menambahkan gambar ke Excel:", err);
      }
    }

    worksheet.columns = [
      { width: 5 },
      { width: 30 },
      { width: 25 },
      { width: 15 },
      { width: 20 }
    ];

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });
    saveAs(blob, "Laporan_Absensi.xlsx");
  };

  const filteredAbsensi = absensiList.filter((absensi) => {
    const jamMatch = absensi.jam?.toLowerCase().includes(searchTerm.toLowerCase());
    const mkMatch = selectedmatakuliah === "" || absensi.mata_kuliah === selectedmatakuliah;
    return jamMatch && mkMatch;
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
          <div className="p-3 border-bottom">
            <Row className="align-items-center g-3">
              <Col md={6} lg={5}>
                <h5 className="mb-0 fw-semibold">Daftar Absensi Sistem Informasi</h5>
              </Col>
            </Row>
          </div>


          <Card.Header className="bg-white py-3 border-bottom">
            <div className="d-flex align-items-center flex-wrap gap-3">
              <Button variant="danger" size="sm" onClick={handlePrint}>
                Cetak Laporan PDF
              </Button>
              <Button variant="secondary" size="sm" onClick={exportToExcel} className="ms-2">
                Ekspor ke Excel
              </Button>
              <div className="ms-auto col-lg-4 col-12">
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

              <div className="col-lg-3 col-12 " >
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


          <div ref={printRef}>
            <div className="print-only">
              <h4 className="text-uppercase">Laporan Absensi</h4>
              <p>Tanggal Cetak: {new Date().toLocaleDateString()}</p>
            </div>
            {loading ? (
              <div className="text-center p-4">
                <Spinner animation="border" />
              </div>
            ) : error ? (
              <Alert variant="danger" className="text-center">
                {error}
              </Alert>
            ) : (
              <div className="table-responsive">
                <Table striped bordered responsive className="align-middle mb-0 text-center small">
                  <thead className="bg-light">
                    <tr>
                      <th className="py-3">No</th>
                      <th className="py-3">Nama</th>
                      <th className="py-3">Mata Kuliah</th>
                      <th className="py-3">Kelas</th>
                      <th className="py-3">Hari</th>
                      <th className="py-3">Jam</th>
                      <th className="py-3 no-print">Foto</th>
                      <th className="py-3 no-print">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedAbsensi.length > 0 ? (
                      paginatedAbsensi.map((absensi, index) => (
                        <tr key={absensi.id}>
                          <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                          <td>{absensi.name}</td>
                          <td>{absensi.mata_kuliah}</td>
                          <td>{absensi.kelas}</td>
                          <td>{absensi.hari}</td>
                          <td>{absensi.jam}</td>
                          <td className="no-print">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() =>
                                navigate(`/admin/dashboard/Absensi/tambahabsensipertemuan`)
                              }
                            >
                              <span>Tambah FOTO</span>
                            </Button>
                          </td>
                          <td className="no-print">
                            <div className="d-flex justify-content-center gap-2">
                              <Button
                                variant="outline-warning"
                                size="sm"
                                onClick={() => handleShowDetail(absensi)}
                              >
                                <FiEye />
                              </Button>
                              <Button
                                variant="outline-success"
                                size="sm"
                                onClick={() =>
                                  navigate(`/admin/dashboard/absensi/editabsensi/${absensi.id}`)
                                }
                              >
                                <FiEdit2 />
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => deleteAbsensi(absensi.id)}
                              >
                                <FiTrash2 />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center text-muted py-3">
                          Tidak ada data
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            )}

          </div>

          <div className="p-3 border-top d-flex justify-content-between align-items-center">
            <div className="small text-muted">
              Menampilkan {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems} entri
            </div>
            <div className="mx-4">
              <Button variant="outline-primary" size="sm" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="mx-2 mb-2">
                Sebelumnya
              </Button>
              <Button variant="outline-primary" size="sm" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className="mx-2 mb-2">
                Selanjutnya
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>


      <Modal show={showDetailModal} onHide={handleCloseDetailModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <FiBookOpen className="me-2" /> Detail Absensi Pertemuan
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAbsensi && (
            <>
              <div className="mb-2"><strong>Nama Dosen:</strong> {selectedAbsensi.name}</div>
              <div className="mb-2"><strong>Mata Kuliah:</strong> {selectedAbsensi.mata_kuliah}</div>
              <div className="mb-2"><strong>Kelas:</strong> {selectedAbsensi.kelas}</div>
              <div className="mb-2"><strong>Hari:</strong> {selectedAbsensi.hari}</div>
              <div className="mb-2"><strong>Jam:</strong> {selectedAbsensi.jam}</div>

              <h5 className="mt-4 mb-3">Absensi Pertemuan</h5>
              {absensiPertemuanList.length === 0 ? (
                <p className="text-muted">Belum ada absensi pertemuan.</p>
              ) : (
                <div className="row g-3">
                  {absensiPertemuanList.map((item, index) => (
                    <div key={index} className="col-md-4">
                      <div className="border-none  shadow">
                        <div className=" p-2 d-flex justify-content-between align-items-center">
                          <strong>Pertemuan {item.pertemuan}</strong>
                          <span className={`badge ${item.keterangan === 'Telat' ? 'bg-danger' : 'bg-success'}`}>
                            {item.keterangan}
                          </span>
                        </div>
                        <img
                          src={`http://localhost:5000/uploads/absensi_pertemuan/${item.foto}`}
                          alt={`Foto pertemuan ${item.pertemuan}`}
                          className="img-fluid "
                        />

                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetailModal}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>

    </Container >
  );
};

export default Absensi;