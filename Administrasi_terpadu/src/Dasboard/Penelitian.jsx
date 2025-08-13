import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Card, Table, Button, Row, Col, Form, InputGroup, Modal, } from "react-bootstrap";
import { FiPlus, FiSearch, FiFilter, FiEdit2, FiTrash2, FiBookOpen, FiEye, FiFile, FiUser, FiStar, FiUsers, FiFileText, FiDownload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import "../Dist/Home.css"
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const Penelitian = () => {
  const [penelitianList, setPenelitianList] = useState([]);
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
    fetchPenelitian();
    fetchDosen();
  }, []);

  const fetchPenelitian = async () => {
    try {
      let url = "http://localhost:5000/penelitian";

      if (user?.role === "user") {
        url = `http://localhost:5000/penelitian?userId=${user.id}`;
      }

      const token = localStorage.getItem('token');

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
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

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Penelitian",
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
    const worksheet = workbook.addWorksheet("Penelitian");


    worksheet.addRow(["No", "Judul Penelitian", "Nama Dosen", "Ketua Tim", "Anggota Tim", "File Laporan"]);


    for (let i = 0; i < filteredPenelitian.length; i++) {
      const penelitian = filteredPenelitian[i];
      worksheet.addRow([]);
      const row = worksheet.getRow(i + 2);

      row.getCell(1).value = i + 1;
      row.getCell(2).value = penelitian.judul_penelitian;
      row.getCell(3).value = penelitian.nama_dosen;
      row.getCell(4).value = penelitian.ketua_tim;
      row.getCell(5).value = penelitian.anggota_tim;

      const fileUrl = `http://localhost:5000/uploads/penelitian/${penelitian.file_laporan}`;
      row.getCell(6).value = {
        text: "Lihat File",
        hyperlink: fileUrl,
      };
      row.getCell(6).font = { color: { argb: 'FF0000FF' }, underline: true };
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
    saveAs(blob, "Penelitian.xlsx");
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


  const handleShowDetail = (item) => {
    setSelectedDetail(item);
    setShowDetailModal(true);
  };

  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setSelectedDetail(null);
  };

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
          <div className="p-2 border-bottom">
            <Row className="align-items-center g-0">
              <Col md={2} lg={2}>
                <Button
                  variant="link"
                  onClick={() => navigate("/admin/dashboard/DaftarPenelitian")}
                  className="d-flex align-items-center fs-5 text-decoration-none"
                >
                  Daftar Penelitian
                </Button>
              </Col>
              <Col >
                <Button
                  variant="link"
                  onClick={() => navigate("/admin/dashboard/Penelitian")}
                  className="d-flex align-items-center fs-5 text-decoration-none"
                >
                  Penelitian Anda
                </Button>
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
              <h4 className="text-center">Laporan Penelitian</h4>
              <Table striped bordered size="sm" className="mt-3">
                <thead>
                  <tr className="text-center">
                    <th className="px-2 py-3">No</th>
                    <th className="px-5 py-3">Judul</th>
                    <th className="px-4 py-3">Nama Dosen</th>
                    <th className="px-3 ">Ketua Tim</th>
                    <th className="px-2 py-3">Anggota Tim</th>
                    <th className="px-2 py-3">RPS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPenelitian.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.judul_penelitian}</td>
                      <td>{item.nama_dosen}</td>
                      <td>{item.ketua_tim}</td>
                      <td>{item.anggota_tim}</td>
                      <td>
                        <a href={`http://localhost:5000/uploads/penelitian/${item.file_laporan}`}
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
              {paginatedPenelitian.length > 0 ? (
                <div>

                  <Row className="g-4">
                    {paginatedPenelitian.map((item, index) => (
                      <Col lg={6} xl={4} key={item.id}>
                        <Card className="h-100 shadow border-0 research-detail-card small" style={{
                          borderRadius: '16px',
                          transition: 'all 0.3s ease',
                          overflow: 'hidden'
                        }}>
                          <div
                            className="position-relative"
                            style={{
                              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                              padding: '1rem 1.25rem 0.5rem',
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
                                  <small className="text-black opacity-75 fw-medium d-block">
                                    PENELITIAN
                                  </small>
                                </div>
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
                                title={item.judul_penelitian}
                              >
                                {item.judul_penelitian}
                              </h5>
                            </div>

                            <div className="mb-4">
                              <div className="bg-light rounded-3 p-3 mb-3">
                                <div className="d-flex align-items-center gap-2 mb-2">
                                  <div
                                    className="bg-primary bg-opacity-10 rounded-circle p-2 me-3 d-flex align-items-center justify-content-center"
                                    style={{ width: 28, height: 28 }}
                                  >
                                    <FiUser size={14} className="text-primary" />
                                  </div>
                                  <small className="text-muted fw-semibold text-uppercase" style={{ letterSpacing: '0.5px' }}>
                                    Dosen Pembimbing
                                  </small>
                                </div>
                                <div className="ps-4">
                                  <p className="mb-0 fw-semibold text-dark" style={{ fontSize: '0.9rem' }}>
                                    {item.nama_dosen}
                                  </p>
                                </div>
                              </div>

                              <div className="bg-primary bg-opacity-10 rounded-3 p-3 mb-3">
                                <div className="d-flex align-items-center gap-2 mb-1">
                                  <small
                                    className="text-black fw-semibold text-uppercase"
                                    style={{ letterSpacing: "0.5px" }}
                                  >
                                    Ketua Tim:
                                  </small>
                                </div>
                                <div className="ps-3 mb-2">
                                  <p
                                    className="mb-0 fw-semibold text-dark"
                                    style={{ fontSize: "0.9rem" }}
                                  >
                                    {item.ketua_tim}
                                  </p>
                                </div>

                                {item.anggota_tim && (
                                  <>
                                    <div className="d-flex align-items-center gap-2 mb-1">
                                      <small
                                        className="text-black fw-semibold text-uppercase"
                                        style={{ letterSpacing: "0.5px" }}
                                      >
                                        Anggota Tim:
                                      </small>
                                    </div>
                                    <div className="ps-3">
                                      <p
                                        className="mb-0 fw-medium text-dark"
                                        style={{ fontSize: "0.85rem", lineHeight: "1.4" }}
                                      >
                                        {item.anggota_tim}
                                      </p>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>

                            <div>
                              <div className="border-top">
                                <div className="d-flex align-items-center justify-content-between mt-2">
                                  <div className="d-flex align-items-center gap-2">
                                    <div
                                      className="bg-danger bg-opacity-10 rounded-circle p-2 d-flex align-items-center justify-content-center"
                                      style={{ width: 32, height: 32 }}
                                    >
                                      <FiFileText size={14} className="text-danger" />
                                    </div>
                                    <div>
                                      <p className="mb-0 fw-semibold" style={{ fontSize: '0.85rem' }}>Laporan Penelitian</p>
                                    </div>
                                  </div>
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    className="rounded-pill px-3"
                                    onClick={() => window.open(`http://localhost:5000/uploads/penelitian/${item.file_laporan}`, '_blank')}

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
                                onClick={() => handleShowDetail(item)}
                                style={{
                                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                                  border: 'none',
                                  fontSize: '0.8rem'
                                }}
                              >
                                <FiEye className="me-1" size={12} />
                                Detail
                              </Button>

                              <div className="d-flex gap-2">
                                <Button
                                  variant="outline-success"
                                  size="sm"
                                  onClick={() => navigate(`/admin/dashboard/penelitian/editpenelitian/${item.id}`)}
                                  title="Edit Penelitian"
                                >
                                  <FiEdit2 size={12} />
                                </Button>
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() => deletePenelitian(item.id)}
                                  title="Hapus Penelitian"
                                >
                                  <FiTrash2 size={12} />
                                </Button>
                              </div>
                            </div>
                          </Card.Footer>

                          <div
                            style={{
                              height: '3px',
                              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
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
                    <FiFilter size={32} className="text-muted" />
                  </div>
                  <h5 className="text-muted mb-2">Tidak Ada Data Penelitian</h5>
                  <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                    Tidak ada data penelitian yang tersedia saat ini
                  </p>

                  <div className="mt-4">
                    <div className="d-flex justify-content-center gap-2">
                      <div
                        className="bg-primary bg-opacity-10 rounded-circle"
                        style={{ width: '8px', height: '8px' }}
                      ></div>
                      <div
                        className="bg-primary bg-opacity-20 rounded-circle"
                        style={{ width: '8px', height: '8px' }}
                      ></div>
                      <div
                        className="bg-primary bg-opacity-10 rounded-circle"
                        style={{ width: '8px', height: '8px' }}
                      ></div>
                    </div>
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
            Detail Penelitian
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedDetail && (
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong className="text-secondary">Judul Penelitian:</strong><br />
                {selectedDetail.judul_penelitian}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Nama Dosen:</strong><br />
                {selectedDetail.nama_dosen}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Ketua Tim:</strong><br />
                {selectedDetail.ketua_tim}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Anggota Tim:</strong> <br />
                {selectedDetail.anggota_tim}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">File Laporan:</strong><br />
                <a
                  href={`http://localhost:5000/uploads/penelitian/${selectedDetail.file_laporan}`}
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

export default Penelitian;
