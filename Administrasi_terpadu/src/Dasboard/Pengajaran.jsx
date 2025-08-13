import React, { useState, useEffect } from "react";
import { Container, Card, Table, Button, Row, Col, Form, InputGroup, Modal } from "react-bootstrap";
import { FiPlus, FiSearch, FiFilter, FiEdit2, FiTrash2, FiBookOpen, FiEye, FiFile, FiCalendar, FiUser, FiActivity, FiUsers, FiFileText, FiDownload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import "../Dist/Home.css"
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const Pengajaran = () => {
  const navigate = useNavigate();
  const [pengajaranList, setPengajaranList] = useState([]);
  const [dosenList, setDosenList] = useState([]);
  const [matakuliahList, setMataKuliahList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedmatakuliah, setSelectedMataKuliah] = useState("");
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const user = JSON.parse(localStorage.getItem('user'));
  const printRef = useRef();

  useEffect(() => {
    fetchPengajaran();
    fetchMataKuliah();
    fetchDosen();
  }, []);


  const fetchPengajaran = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = "http://localhost:5000/pengajaran";

      if (user?.role === "user") {
        url = `http://localhost:5000/pengajaran?userId=${user.id}`;
      }

      const token = localStorage.getItem('token');

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPengajaranList(response.data);
    } catch (error) {
      setError("Gagal memuat data pengajaran.");
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

  const fetchDosen = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5000/dosen");
      setMataKuliahList(response.data);
    } catch (error) {
      setError("Gagal memuat data Dosen.");
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const deletePengajaran = async (id) => {
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
        await axios.delete(`http://localhost:5000/pengajaran/${id}`);
        fetchPengajaran();
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
    const worksheet = workbook.addWorksheet("Pengajaran");


    worksheet.addRow(["No", "Nama Dosen", "Mata Kuliah", "Semester", "Kelas", "Metode Pengajaran", "Keterlibatan Praktisi", "Nama Praktisi", "Institusi Praktisi", "File Pengajaran"]);


    for (let i = 0; i < filteredPengajaran.length; i++) {
      const pengajaran = filteredPengajaran[i];
      worksheet.addRow([]);
      const row = worksheet.getRow(i + 2);

      row.getCell(1).value = i + 1;
      row.getCell(2).value = pengajaran.nama_dosen,
        row.getCell(3).value = pengajaran.mata_kuliah,
        row.getCell(4).value = pengajaran.semester,
        row.getCell(5).value = pengajaran.kelas,
        row.getCell(6).value = pengajaran.metode_pengajaran,
        row.getCell(7).value = pengajaran.keterlibatan_praktisi
      row.getCell(8).value = pengajaran.nama_praktisi
      row.getCell(9).value = pengajaran.institusi_praktisi

      const fileUrl = `http://localhost:5000/uploads/pengajaran/${pengajaran.file_pengajaran}`;
      row.getCell(10).value = {
        text: "Lihat File",
        hyperlink: fileUrl,
      };
      row.getCell(10).font = { color: { argb: 'FF0000FF' }, underline: true };

    }

    worksheet.columns = [
      { width: 5 },
      { width: 30 },
      { width: 55 },
      { width: 40 },
      { width: 30 },
      { width: 20 },
    ];

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "Pengajaran.xlsx");
  };


  const handleShowDetail = (item) => {
    setSelectedDetail(item);
    setShowDetailModal(true);
  };

  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setSelectedDetail(null);
  };

  const filteredPengajaran = pengajaranList.filter((pengajaran) => {
    const nameMatch = pengajaran.nama_dosen?.toLowerCase().includes(searchTerm.toLowerCase());
    const matakuliahMatch = selectedmatakuliah === "" || pengajaran.mata_kuliah?.toString() === selectedmatakuliah;
    return nameMatch && matakuliahMatch;
  });

  const sortedBahanAjar = filteredPengajaran.sort((a, b) => a.pertemuan - b.pertemuan);
  const totalItems = sortedBahanAjar.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedPengajaran = sortedBahanAjar.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);



  return (
    <Container fluid className="p-4">
      <Row className="align-items-center p-4">
        <Col>
          <h2 className="mb-1 fw-bold text-white">PENGAJARAN</h2>
          <p className="text-muted mb-0">Daftar Mata Kuliah yang Diajar oleh Dosen</p>
        </Col>
        <Col xs="auto">
          <Button variant="success" onClick={() => navigate("/admin/dashboard/pengajaran/tambahpengajaran")} className=" shadow d-flex align-items-center gap-2">
            <FiPlus size={16} />
            <span>Tambah Pengajaran</span>
          </Button>
        </Col>
      </Row>


      <Card className="shadow border-0">
        <Card.Body className="p-0">
          <div className="p-3 border-bottom">
            <Row className="align-items-center g-3">
              <Col md={6} lg={5}>
                <h5 className="mb-0 fw-semibold">Daftar Pengajaran Dosen  Sistem Informasi</h5>
              </Col>
            </Row>
          </div>

          <Card className="shadow-sm border-0 overflow-hidden">
            <Card.Header className="bg-white py-3 border-bottom">
              <div className="d-flex align-items-center flex-wrap gap-3">
                <Button variant="danger" size="sm" onClick={handlePrint}>
                  Cetak Laporan PDF
                </Button>
                <Button variant="secondary" size="sm" onClick={exportToExcel} className="ms-2">
                  Ekspor ke Excel
                </Button>
                <div className="ms-auto col-12 col-md-6 col-lg-4">
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

                <div className="col-12 col-md-4 col-lg-3">
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

            <div ref={printRef} className="d-none d-print-block">
              <h4 className="text-center">Laporan Pengabdian</h4>
              <Table striped bordered size="sm" className="mt-3">
                <thead>
                  <tr className="text-center">
                    <th className="px-2 py-4">No</th>
                    <th className="px-4 py-2">Nama Dosen</th>
                    <th className="px-3 py-4 ">Mata Kuliah</th>
                    <th className="px-2 py-4">Kelas</th>
                    <th className="px-2 py-4">Semester</th>
                    <th className="px-2 py-4">Metode Pengajaran</th>
                    <th className="px-2 py-4">Keterlibatan Praktisi</th>
                    <th className="px-2 py-4">Nama Praktisi</th>
                    <th className="px-2 py-4">Institusi Praktisi</th>
                    <th className="px-2 py-2">File Pengajaran</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPengajaran.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.nama_dosen}</td>
                      <td>{item.mata_kuliah}</td>
                      <td>{item.kelas}</td>
                      <td>{item.semester}</td>
                      <td>{item.metode_pengajaran}</td>
                      <td>{item.keterlibatan_praktisi}</td>
                      <td>{item.nama_praktisi}</td>
                      <td>{item.institusi_praktisi}</td>
                      <td>
                        <a href={`http://localhost:5000/uploads/pengajaran/${item.file_pengajaran}`}
                          target="_blank"
                          rel="noreferrer">
                          Lihat PDF
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            <Card.Body className="p-4">
              {paginatedPengajaran.length > 0 ? (
                <div>
                  <div className="print-only mb-4 text-center">
                    <h4 className="text-uppercase fw-bold">Pengajaran</h4>
                    <p className="mb-0">Tanggal Cetak: {new Date().toLocaleDateString('id-ID')}</p>
                  </div>

                  <Row className="g-4">
                    {paginatedPengajaran.map((item, index) => (
                      <Col lg={6} xl={4} key={item.id}>
                        <Card className="h-100 shadow border-0 teaching-card small" style={{
                          borderRadius: '16px',
                          transition: 'all 0.3s ease',
                          overflow: 'hidden'
                        }}>
                          <div
                            className="position-relative"
                            style={{
                              background: 'linear-gradient(135deg,rgb(102, 186, 234) 0%,rgb(75, 162, 145) 100%)',
                              padding: '1.25rem',
                            }}
                          >
                            <div className="d-flex align-items-center justify-content-between mb-2">
                              <div className="d-flex align-items-center gap-3">
                                <div
                                  className="bg-white bg-opacity-20 backdrop-blur rounded-circle p-2 d-flex align-items-center justify-content-center"
                                  style={{
                                    width: 40,
                                    height: 40,
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255,255,255,0.2)'
                                  }}
                                >
                                  <FiBookOpen size={18} className="text-black" />
                                </div>
                                <div>
                                  <small className="text-black opacity-75 fw-bold d-block">
                                    PENGAJARAN
                                  </small>
                                </div>
                              </div>

                              <div
                                className="bg-white bg-opacity-20 rounded-pill px-2 py-1"
                                style={{ backdropFilter: 'blur(10px)' }}
                              >
                                <small className="text-black fw-semibold">
                                  <FiCalendar size={12} className="me-1 mb-1" />
                                  {item.semester}
                                </small>
                              </div>
                            </div>

                            <svg
                              className="position-absolute bottom-0 start-0 w-100"
                              viewBox="0 0 400 20"
                              style={{ height: '20px' }}
                              preserveAspectRatio="none"
                            >
                              <path
                                d="M0,20 C100,0 300,0 400,20 L400,20 L0,20 Z"
                                fill="white"
                              />
                            </svg>
                          </div>

                          <Card.Body className="p-4 pt-3">
                            <div className="mb-4">
                              <h5
                                className="fw-bold text-dark mb-2 lh-sm"
                                style={{
                                  fontSize: '1.05rem',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden'
                                }}
                                title={item.mata_kuliah}
                              >
                                {item.mata_kuliah}
                              </h5>
                              <div className="d-flex align-items-center gap-2">
                                <span className="badge bg-primary bg-opacity-10 text-primary px-2 py-1 rounded-pill" style={{ fontSize: '0.75rem' }}>
                                  Kelas {item.kelas}
                                </span>
                              </div>
                            </div>

                            <div className="bg-light rounded-3 p-3 mb-3">
                              <div className="d-flex align-items-center gap-2 mb-2">
                                <div
                                  className="bg-primary bg-opacity-10 rounded-circle p-2 me-1 d-flex align-items-center justify-content-center"
                                  style={{ width: 28, height: 28 }}
                                >
                                  <FiUser size={14} className="text-primary" />
                                </div>
                                <small className="text-muted fw-semibold text-uppercase" style={{ letterSpacing: '0.5px' }}>
                                  Dosen Pengajar
                                </small>
                              </div>
                              <div className="ps-4">
                                <p className="mb-0 fw-semibold text-dark" style={{ fontSize: '0.9rem' }}>
                                  {item.nama_dosen}
                                </p>
                              </div>
                            </div>

                            <div className="bg-info bg-opacity-10  rounded-3 p-3 mb-3">
                              <div className="d-flex align-items-center gap-2 mb-1" >
                                <FiActivity size={14} className="text-danger" />
                                <small className="text-black fw-semibold text-uppercase">Metode Pengajaran </small>
                              </div>
                              <p
                                className="ps-4 mb-3 text-dark fw-medium"
                                style={{ fontSize: "0.85rem", lineHeight: "1" }}
                              >
                                {item.metode_pengajaran}
                              </p>

                              {item.keterlibatan_praktisi && item.keterlibatan_praktisi !== "-" && (
                                <>
                                  <div className="d-flex align-items-center gap-2 mb-2">
                                    <FiUsers size={14} className="text-success" />
                                    <small className="text-black fw-semibold">Keterlibatan Praktisi</small>
                                  </div>
                                  <div className="ps-4">
                                    <p
                                      className="mb-1 fw-medium text-dark"
                                      style={{ fontSize: "0.85rem", lineHeight: "1.4" }}
                                    >
                                      <strong>Praktisi:</strong> {item.nama_praktisi || "-"}
                                    </p>
                                    <p
                                      className="mb-0 fw-medium text-dark"
                                      style={{ fontSize: "0.85rem", lineHeight: "1.4" }}
                                    >
                                      <strong>Institusi:</strong> {item.institusi_praktisi || "-"}
                                    </p>
                                  </div>
                                </>
                              )}
                            </div>


                            <div>
                              <div className="border-top">
                                <div className="d-flex align-items-center justify-content-between mt-2">
                                  <div className="d-flex align-items-center gap-2s">
                                    <div
                                      className="d-flex align-items-center justify-content-center"
                                      style={{ width: 32, height: 32 }}
                                    >
                                      <FiFileText size={14} className="text-info" />
                                    </div>
                                    <div>
                                      <small className="text-muted fw-medium">File Pengajaran</small>
                                    </div>
                                  </div>
                                  <Button
                                    variant="outline-info"
                                    size="sm"
                                    className="rounded-pill px-3"
                                    onClick={() => window.open(`http://localhost:5000/uploads/pengajaran/${item.file_pengajaran}`, '_blank')}
                                    style={{ fontSize: '0.75rem' }}
                                  >
                                    <FiDownload size={12} className="me-1 mb-1" />
                                    Lihat File
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Card.Body>

                          <Card.Footer
                            className="bg-white border-0 p-3 no-print"
                            style={{ borderRadius: '0 0 16px 16px' }}
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <Button
                                variant="primary"
                                size="sm"
                                className="px-3 rounded-pill"
                                onClick={() => handleShowDetail(item)}
                                style={{
                                  background: 'linear-gradient(135deg,rgb(102, 186, 234) 0%,rgb(75, 162, 145) 100%)',
                                  border: 'none',
                                  fontSize: '0.8rem'
                                }}
                              >
                                <FiEye className="me-1 mb-1" size={12} />
                                Detail
                              </Button>

                              <div className="d-flex gap-2">
                                <Button
                                  variant="outline-success"
                                  size="sm"
                                  onClick={() => navigate(`/admin/dashboard/pengajaran/editpengajaran/${item.id}`)}
                                  title="Edit Pengabdian"
                                >
                                  <FiEdit2 size={12} />
                                </Button>
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() => deletePengajaran(item.id)}
                                  title="Hapus Pengabdian"
                                >
                                  <FiTrash2 size={12} />
                                </Button>
                              </div>
                            </div>
                          </Card.Footer>

                          <div
                            style={{
                              height: '3px',
                              background: 'linear-gradient(135deg,rgb(102, 186, 234) 0%,rgb(75, 162, 145) 100%)'
                            }}
                          ></div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              ) : (
                <div className="text-center py-5">
                  <div className="d-flex flex-column align-items-center justify-content-center py-4">
                    <div
                      className="bg-light rounded-circle p-4 mb-3 d-flex align-items-center justify-content-center"
                      style={{ width: 80, height: 80 }}
                    >
                      <FiFilter size={32} className="text-muted" />
                    </div>
                    <h5 className="text-muted mb-2">Tidak ada data pengajaran</h5>
                    <p className="text-muted mb-0">Data pengajaran tidak ditemukan atau belum ada yang ditambahkan</p>
                  </div>
                </div>
              )}
            </Card.Body>

            <div className="p-3 border-top d-flex justify-content-between align-items-center">
              <div className="small text-muted">
                Menampilkan {(currentPage - 1) * itemsPerPage + 1}–
                {Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems} entri
              </div>
              <div className="mx-3">
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="mx-2 mb-2"
                >
                  Sebelumnya
                </Button>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="mx-2 mb-2"
                >
                  Selanjutnya
                </Button>
              </div>
            </div>
          </Card>
        </Card.Body>
      </Card>

      <Modal show={showDetailModal} onHide={handleCloseDetail} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-semibold ">
            <FiBookOpen className="mx-2" />
            Detail Pengajaran
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedDetail && (
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong className="text-secondary">Nama Dosen:</strong><br />
                {selectedDetail.nama_dosen}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Mata Kuliah:</strong><br />
                {selectedDetail.mata_kuliah}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Semester:</strong><br />
                {selectedDetail.semester}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Kelas:</strong> <br />
                {selectedDetail.kelas}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Metode Pengajaran:</strong> <br />
                {selectedDetail.metode_pengajaran}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Keterlibatan Praktisi:</strong> <br />
                {selectedDetail.keterlibatan_praktisi}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Nama Praktisi:</strong> <br />
                {selectedDetail.nama_praktisi}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Institusi Praktisi:</strong> <br />
                {selectedDetail.institusi_praktisi}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">File Pengajaran:</strong><br />
                <a
                  href={`http://localhost:5000/uploads/pengajaran/${selectedDetail.file_pengajaran}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline-primary mt-2"
                >
                  <FiFile className="mx-2 mb-1" />
                  Lihat File PDF
                </a>
              </li>
            </ul>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseDetail}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Pengajaran;
