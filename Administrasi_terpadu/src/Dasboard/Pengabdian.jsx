import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Card, Table, Button, Row, Col, Form, InputGroup, Modal } from "react-bootstrap";
import { FiPlus, FiSearch, FiFilter, FiEdit2, FiTrash2, FiBookOpen, FiEye, FiFile } from "react-icons/fi";
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

            <Card.Body className="p-0 text-center">
              <div className="table-responsive" ref={printRef}>
                <div className="print-only">
                  <h4 className="text-uppercase">Pengabdian</h4>
                  <p>Tanggal Cetak: {new Date().toLocaleDateString()}</p>
                </div>
                <Table striped bordered hover className="align-middle mb-0" size="sm">
                  <thead>
                    <tr className="bg-light">
                      <th className="px-2 py-3">No</th>
                      <th className="px-5 py-3">Judul Pengabdian</th>
                      <th className="px-5 py-3">Nama Dosen</th>
                      <th className="px-5 py-3">Mitra</th>
                      <th className="px-5 py-2">Bentuk Kegiatan</th>
                      <th className="px-5 py-3">Lokasi</th>
                      <th className="px-3 py-3">Tahun</th>
                      <th className="px-3 py-2">Bukti Kegiatan</th>
                      <th className=" py-3 no-print">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedPengabdian.length > 0 ? (
                      paginatedPengabdian.map((pengabdian, index) => (
                        <tr key={pengabdian.id}>
                          <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                          <td>{pengabdian.judul_pengabdian}</td>
                          <td>{pengabdian.nama_dosen}</td>
                          <td>{pengabdian.mitra}</td>
                          <td>{pengabdian.bentuk_kegiatan}</td>
                          <td>{pengabdian.lokasi}</td>
                          <td>{pengabdian.tahun}</td>
                          <td>
                            <a
                              href={`http://localhost:5000/uploads/pengabdian/${pengabdian.file_kegiatan}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Lihat PDF
                            </a>
                          </td>
                          <td className="no-print">
                            <div className="d-flex justify-content-center gap-2">
                              <Button
                                variant="outline-warning"
                                size="sm"
                                title="Lihat Detail"
                                onClick={() => handleShowDetail(pengabdian)}
                              >
                                <FiEye size={16} />
                              </Button>
                              <Button
                                variant="outline-success"
                                size="sm"
                                onClick={() => navigate(`/admin/dashboard/pengabdian/editpengabdian/${pengabdian.id}`)}
                              >
                                <FiEdit2 size={15} />
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => deletePengabdian(pengabdian.id)}
                              >
                                <FiTrash2 size={15} />
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