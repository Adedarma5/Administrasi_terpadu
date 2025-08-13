import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Card, Table, Button, Row, Col, Form, InputGroup, Modal } from "react-bootstrap";
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiBookOpen, FiEye, FiFile, FiHeart, FiCalendar, FiUser, FiUsers, FiMapPin, FiActivity, FiFileText, FiDownload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import "../Dist/Home.css"
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const Pengabdian = () => {
  const [pengabdianList, setPengabdianList] = useState([]);
  const [dosenList, setDosenList] = useState([]);
  const [selectedDosen, setSelectedDosen] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const printRef = useRef();

  useEffect(() => {
    fetchPengabdian();
    fetchDosen();
  }, []);

  const fetchPengabdian = async () => {
    try {
      let url = "http://localhost:5000/pengabdian";

      if (user?.role === "user") {
        url = `http://localhost:5000/pengabdian?userId=${user.id}`;
      }

      const token = localStorage.getItem('token');

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPengabdianList(response.data);
    } catch (error) {
      console.error("Error fetching pengabdian:", error);
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

  const deletePengabdian = async (id) => {
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
        await axios.delete(`http://localhost:5000/pengabdian/${id}`);
        fetchPengabdian();
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
    documentTitle: "Pengabdian",
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
    const worksheet = workbook.addWorksheet("Pengabdian");

    worksheet.addRow(["No", "Judul Pengabdian", "Nama Dosen", "Mitra", "Bentuk Kegiatan", "Lokasi", "Tahun", "File Kegiatan"]);

    for (let i = 0; i < filteredPengabdian.length; i++) {
      const pengabdian = filteredPengabdian[i];
      worksheet.addRow([]);
      const row = worksheet.getRow(i + 2);

      row.getCell(1).value = i + 1;
      row.getCell(2).value = pengabdian.judul_pengabdian;
      row.getCell(3).value = pengabdian.nama_dosen;
      row.getCell(4).value = pengabdian.mitra;
      row.getCell(5).value = pengabdian.bentuk_kegiatan;
      row.getCell(6).value = pengabdian.lokasi;
      row.getCell(7).value = pengabdian.tahun;

      const fileUrl = `http://localhost:5000/uploads/pengabdian/${pengabdian.file_kegiatan}`;
      row.getCell(8).value = {
        text: "Lihat File",
        hyperlink: fileUrl,
      };
      row.getCell(8).font = { color: { argb: 'FF0000FF' }, underline: true };
    }

    worksheet.columns = [
      { width: 5 },
      { width: 30 },
      { width: 30 },
      { width: 55 },
      { width: 15 },
      { width: 30 },
    ];

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "Pengabdian.xlsx");
  };

  const handleShowDetail = (pengabdian) => {
    setSelectedDetail(pengabdian);
    setShowDetailModal(true);
  };

  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setSelectedDetail(null);
  };

  const filteredPengabdian = pengabdianList.filter((pengabdian) => {
    const judulMatch = pengabdian.judul_pengabdian?.toLowerCase().includes(searchTerm.toLowerCase());
    const dosenMatch = selectedDosen === "" || pengabdian.nama_dosen === selectedDosen;
    return judulMatch && dosenMatch;
  });

  const totalItems = filteredPengabdian.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedPengabdian = filteredPengabdian.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container fluid className="p-4">
      <Row className="align-items-center p-4">
        <Col>
          <h2 className="mb-1 fw-bold text-white">PENGABDIAN</h2>
          <p className="text-muted mb-0">Daftar Pengabdian Dosen Sistem Informasi</p>
        </Col>
        <Col xs="auto">
          <Button variant="success" onClick={() => navigate("/admin/dashboard/pengabdian/tambahpengabdian")} className="shadow d-flex align-items-center gap-2">
            <FiPlus size={18} />
            <span>Tambah Pengabdian</span>
          </Button>
        </Col>
      </Row>

      <Card className="shadow border-0">
        <Card.Body className="p-0">
          <div className="p-3 border-bottom">
            <Row className="align-items-center g-3">
              <Col md={6} lg={5}>
                <h5 className="mb-0 fw-semibold">Daftar Pengabdian Dosen  Sistem Informasi</h5>
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
                      placeholder="Cari judul pengabdian..."
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

            <div ref={printRef} className="d-none d-print-block">
              <h4 className="text-center">Laporan Pengabdian</h4>
              <Table striped bordered size="sm" className="mt-3">
                <thead>
                  <tr className="text-center">
                    <th className="px-2 py-4">No</th>
                    <th className="px-5 py-4">Judul</th>
                    <th className="px-4 py-2">Nama Dosen</th>
                    <th className="px-3 py-4 ">Mitra</th>
                    <th className="px-2 py-4">Bentuk Kegiatan</th>
                    <th className="px-2 py-4">Lokasi</th>
                    <th className="px-2 py-4">Tahun</th>
                    <th className="px-2 py-2">File Kegiatan</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPengabdian.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.judul_pengabdian}</td>
                      <td>{item.nama_dosen}</td>
                      <td>{item.mitra}</td>
                      <td>{item.bentuk_kegiatan}</td>
                      <td>{item.lokasi}</td>
                      <td>{item.tahun}</td>
                      <td>
                        <a href={`http://localhost:5000/uploads/pengabdian/${item.file_kegiatan}`}
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
              {paginatedPengabdian.length > 0 ? (
                <div>

                  <Row className="g-4">
                    {paginatedPengabdian.map((pengabdian, index) => (
                      <Col lg={6} xl={4} key={pengabdian.id}>
                        <Card className="h-100 shadow border-0 service-card small" style={{
                          borderRadius: '16px',
                          transition: 'all 0.3s ease',
                          overflow: 'hidden'
                        }}>
                          <div
                            className="position-relative"
                            style={{
                              background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
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
                                    PENGABDIAN
                                  </small>
                                </div>
                              </div>

                              <div
                                className="bg-white bg-opacity-20 rounded-pill px-3 py-1"
                                style={{ backdropFilter: 'blur(10px)' }}
                              >
                                <small className="text-black fw-semibold">
                                  <FiCalendar size={12} className="me-1 mb-1" />
                                  {pengabdian.tahun}
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
                                className="fw-bold text-dark mb-0 lh-sm"
                                style={{
                                  fontSize: '1.05rem',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden'
                                }}
                                title={pengabdian.judul_pengabdian}
                              >
                                {pengabdian.judul_pengabdian}
                              </h5>
                            </div>

                            <div className="bg-light rounded-3 p-3 mb-3">
                              <div className="d-flex align-items-center gap-2 mb-2">
                                <div
                                  className="bg-primary bg-opacity-10 rounded-circle p-2 me-3 d-flex align-items-center justify-content-center"
                                  style={{ width: 28, height: 28 }}
                                >
                                  <FiUser size={14} className="text-primary" />
                                </div>
                                <small className="text-muted fw-semibold text-uppercase" style={{ letterSpacing: '0.5px' }}>
                                  Dosen Pengabdi
                                </small>
                              </div>
                              <div className="ps-4">
                                <p className="mb-0 fw-semibold text-dark" style={{ fontSize: '0.9rem' }}>
                                  {pengabdian.nama_dosen}
                                </p>
                              </div>
                            </div>

                            <div className="bg-info bg-opacity-10 rounded-3 p-3 mb-2">
                              <div className="d-flex align-items-center gap-2 mb-1" >
                                <FiActivity size={14} className="text-danger" />
                                <small className="text-black fw-semibold text-uppercase">Bentuk Kegiatan </small>
                              </div>
                              <p
                                className="ps-4 mb-3 text-dark fw-medium"
                                style={{ fontSize: "0.85rem", lineHeight: "1" }}
                              >
                                {pengabdian.bentuk_kegiatan}
                              </p>

                              <div className="d-flex align-items-center gap-2 mb-1">
                                <FiUsers size={14} className="text-success" />
                                <small className="text-black fw-semibold">Mitra</small>
                              </div>
                              <p
                                className="ps-4 mb-3 text-dark fw-medium"
                                style={{ fontSize: "0.85rem", lineHeight: "1" }}
                              >
                                {pengabdian.mitra}
                              </p>

                              <div className="d-flex align-items-center gap-2 mb-1">
                                <FiMapPin size={14} className="text-warning" />
                                <small className="text-black fw-semibold">Lokasi</small>
                              </div>
                              <p
                                className="ps-4 text-dark fw-medium"
                                style={{ fontSize: "0.85rem", lineHeight: "1" }}
                              >
                                {pengabdian.lokasi}
                              </p>
                            </div>


                            <div>
                              <div className="border-top">
                                <div className="d-flex align-items-center justify-content-between mt-2">
                                  <div className="d-flex align-items-center gap-2">
                                    <div
                                      className="bg-success bg-opacity-10 rounded-circle p-2 d-flex align-items-center justify-content-center"
                                      style={{ width: 32, height: 32 }}
                                    >
                                      <FiFileText size={14} className="text-success" />
                                    </div>
                                    <div>
                                      <p className="mb-0 fw-semibold" style={{ fontSize: '0.85rem' }}>
                                        File Kegiatan
                                      </p>
                                    </div>
                                  </div>
                                  <Button
                                    variant="outline-success"
                                    size="sm"
                                    className="rounded-pill px-3"
                                    onClick={() => window.open(`http://localhost:5000/uploads/pengabdian/${pengabdian.file_kegiatan}`, '_blank')}

                                    style={{ fontSize: '0.75rem' }}
                                  >
                                    <FiDownload size={12} className="me-1 mb-1" />
                                    Lihat PDF
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
                                onClick={() => handleShowDetail(pengabdian)}
                                style={{
                                  background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
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
                                  onClick={() => navigate(`/admin/dashboard/pengabdian/editpengabdian/${pengabdian.id}`)}
                                  title="Edit Pengabdian"
                                >
                                  <FiEdit2 size={12} />
                                </Button>
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() => deletePengabdian(pengabdian.id)}
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
                              background: 'linear-gradient(90deg, #11998e 0%, #38ef7d 100%)'
                            }}
                          ></div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              ) : (
                <div className="text-center py-5">
                  <div
                    className="bg-light rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{ width: '80px', height: '80px' }}
                  >
                    <FiSearch size={32} className="text-muted" />
                  </div>
                  <h5 className="text-muted mb-2">Tidak Ada Data Pengabdian</h5>
                  <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                    Tidak ada data pengabdian masyarakat yang tersedia saat ini
                  </p>
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
            Detail Pengabdian
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedDetail && (
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong className="text-secondary">Judul Pengabdian:</strong><br />
                {selectedDetail.judul_pengabdian}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Nama Dosen:</strong><br />
                {selectedDetail.nama_dosen}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Mitra:</strong><br />
                {selectedDetail.mitra}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Bentuk Kegiatana:</strong> <br />
                {selectedDetail.bentuk_kegiatan}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Lokasi:</strong> <br />
                {selectedDetail.lokasi}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Tahun:</strong> <br />
                {selectedDetail.tahun}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">File Kegiatan:</strong><br />
                <a
                  href={`http://localhost:5000/uploads/pengabdian/${selectedDetail.file_kegiatan}`}
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

export default Pengabdian;