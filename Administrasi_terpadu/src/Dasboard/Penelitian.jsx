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
          <div className="p-3 border-bottom">
            <Row className="align-items-center g-3">
              <Col md={6} lg={5}>
                <h5 className="mb-0 fw-semibold">Daftar Penelitian Dosen  Sistem Informasi</h5>
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

            <Card.Body className="p-0 text-center">
              <div className="table-responsive" ref={printRef}>
                <div className="print-only">
                  <h4 className="text-uppercase">Penelitian</h4>
                  <p>Tanggal Cetak: {new Date().toLocaleDateString()}</p>
                </div>
                <Table striped bordered hover className="align-middle mb-0" size="sm">
                  <thead>
                    <tr className="bg-light">
                      <th className="px-2 py-2">No</th>
                      <th className="px-5 py-2">Judul Penelitian</th>
                      <th className="px-5 py-2">Nama Dosen</th>
                      <th className="px-2 py-2">Ketua Tim</th>
                      <th className="px-5 py-2">Anggota Tim</th>
                      <th className="px-3 py-2">Laporan</th>
                      <th className=" py-2 no-print">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedPenelitian.length > 0 ? (
                      paginatedPenelitian.map((item, index) => (
                        <tr key={item.id}>
                          <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                          <td>{item.judul_penelitian}</td>
                          <td>{item.nama_dosen}</td>
                          <td>{item.ketua_tim}</td>
                          <td>{item.anggota_tim}</td>
                          <td>
                            <a
                              href={`http://localhost:5000/uploads/penelitian/${item.file_laporan}`}
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
                                onClick={() => handleShowDetail(item)}
                              >
                                <FiEye size={16} />
                              </Button>
                              <Button
                                variant="outline-success"
                                size="sm"
                                onClick={() => navigate(`/admin/dashboard/penelitian/editpenelitian/${item.id}`)}
                              >
                                <FiEdit2 size={15} />
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => deletePenelitian(item.id)}
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
