import React, { useEffect, useState } from "react";
import { Container, Card, Table, Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiEye, FiBookOpen, FiFile } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import "../Dist/Home.css"
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import Swal from "sweetalert2";

const Msib = () => {
  const navigate = useNavigate();
  const [msibList, setMsibList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const printRef = useRef();

  useEffect(() => {
    fetchMsib();
  }, []);

  const fetchMsib = async () => {
    try {
      const response = await axios.get("http://localhost:5000/msib");
      setMsibList(response.data);
    } catch (error) {
      console.error("Gagal mengambil data MSIB:", error);
    }
  };

  const handleDownload = (filename, field) => {
    if (!filename) return;
    window.open(`http://localhost:5000/uploads/kegiatan_mahasiswa/${filename}`, "_blank");
  };

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "msib",
    onBeforeGetContent: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 100);
      });
    },
  });

  const deleteMsib = async (id) => {
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
          await axios.delete(`http://localhost:5000/msib/${id}`);
          fetchMsib();
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

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("MSIB");

    worksheet.addRow([
      "No", "Nama", "NIM", "Program", "Judul", "Mitra",
      "Tanggal Mulai", "Tanggal Selesai",
      "Lembar Pengesahan", "Laporan", "Projek", "Sertifikat", "Konversi Nilai"
    ]);

    const dataWithFiles = filteredMsib.filter(msib =>
      msib.lembar_pengesahan || msib.laporan || msib.projek || msib.sertifikat || msib.konversi_nilai
    );

    dataWithFiles.forEach((msib, index) => {
      const row = worksheet.addRow([
        index + 1,
        msib.nama,
        msib.nim,
        msib.program,
        msib.judul,
        msib.mitra,
        msib.tanggal_mulai?.slice(0, 10),
        msib.tanggal_selesai?.slice(0, 10),
        msib.lembar_pengesahan ? { text: "Lihat", hyperlink: `http://localhost:5000/uploads/kegiatan_mahasiswa/${msib.lembar_pengesahan}` } : "",
        msib.laporan ? { text: "Lihat", hyperlink: `http://localhost:5000/uploads/kegiatan_mahasiswa/${msib.laporan}` } : "",
        msib.projek ? { text: "Lihat", hyperlink: `http://localhost:5000/uploads/kegiatan_mahasiswa/${msib.projek}` } : "",
        msib.sertifikat ? { text: "Lihat", hyperlink: `http://localhost:5000/uploads/kegiatan_mahasiswa/${msib.sertifikat}` } : "",
        msib.konversi_nilai ? { text: "Lihat", hyperlink: `http://localhost:5000/uploads/kegiatan_mahasiswa/${msib.konversi_nilai}` } : "",
      ]);

      for (let i = 9; i <= 13; i++) {
        if (row.getCell(i).value?.hyperlink) {
          row.getCell(i).font = { color: { argb: "FF0000FF" }, underline: true };
        }
      }
    });

    worksheet.columns = [
      { width: 5 },
      { width: 25 },
      { width: 15 },
      { width: 15 },
      { width: 30 },
      { width: 25 },
      { width: 15 },
      { width: 15 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 }
    ];

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "msib.xlsx");
  };



  const handleShowDetail = (item) => {
    setSelectedDetail(item);
    setShowDetailModal(true);
  };

  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setSelectedDetail(null);
  };


  const filteredMsib = msibList.filter((msib) => {
    return msib.nama.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const sortedMsib = filteredMsib.sort((a, b) => a.program - b.program);
  const totalItems = sortedMsib.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedMsib = sortedMsib.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  return (
    <Container fluid className="p-4">
      <Row className="align-items-center p-4">
        <Col>
          <h2 className="mb-1 fw-bold text-white">MSIB</h2>
          <p className="text-muted mb-0">Daftar Kegiatan MSIB Mahasiswa Sistem Informasi</p>
        </Col>
        {/* <Col xs="auto">
              <Button variant="primary" className="d-flex align-items-center gap-2" onClick={() => navigate("/admin/dashboard/msib/tambahmsib")}>
                <FiPlus size={18} />
                <span>Tambah</span>
              </Button>
            </Col> */}
      </Row>

      <Card className="shadow border-0">
        <Card.Body className="p-0">
          <div className="p-3 border-bottom">
            <Row className="align-items-center g-3">
              <Col md={6} lg={5}>
                <h5 className="mb-0 fw-semibold">Daftar MSIB Sistem Informasi</h5>
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
                <InputGroup>
                  <InputGroup.Text className="bg-light border-end-0">
                    <FiSearch size={16} />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Cari mahasiswa..."
                    className="border-start-0 bg-light"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </div>
            </div>
          </Card.Header>

          <div className="table-responsive" ref={printRef}>
            <div className="print-only">
              <h4 className="text-uppercase">Laporan Bahan Ajar</h4>
              <p>Tanggal Cetak: {new Date().toLocaleDateString()}</p>
            </div>
            <Table striped bordered hover className="align-middle mb-0 text-center">
              <thead className="bg-light">
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Nim</th>
                  <th>Program</th>
                  <th>Judul</th>
                  <th>Mitra</th>
                  <th>Tanggal Mulai</th>
                  <th>Tanggal Selesai</th>
                  <th>Lembar Pengesahan</th>
                  <th>Laporan</th>
                  <th>Projek</th>
                  <th>Sertifikat</th>
                  <th>Konversi Nilai</th>
                  <th className="no-print">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {msibList.length > 0 ? (
                  msibList.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.nama}</td>
                      <td>{item.nim}</td>
                      <td>{item.program}</td>
                      <td>{item.judul}</td>
                      <td>{item.mitra}</td>
                      <td>{item.tanggal_mulai?.slice(0, 10)}</td>
                      <td>{item.tanggal_selesai?.slice(0, 10)}</td>
                      <td>
                        {item.lembar_pengesahan && (
                          <Button
                            size="sm"
                            variant="link"
                            onClick={() => handleDownload(item.lembar_pengesahan)}
                          >
                            Lihat
                          </Button>
                        )}
                      </td>
                      <td >
                        {item.laporan && (
                          <Button size="sm" variant="link" onClick={() => handleDownload(item.laporan)}>
                            Lihat
                          </Button>
                        )}
                      </td>
                      <td>
                        {item.projek && (
                          <Button size="sm" variant="link" onClick={() => handleDownload(item.projek)}>
                            Lihat
                          </Button>
                        )}
                      </td>
                      <td>
                        {item.sertifikat && (
                          <Button size="sm" variant="link" onClick={() => handleDownload(item.sertifikat)}>
                            Lihat
                          </Button>
                        )}
                      </td>
                      <td>
                        {item.konversi_nilai && (
                          <Button size="sm" variant="link" onClick={() => handleDownload(item.konversi_nilai)}>
                            Lihat
                          </Button>
                        )}
                      </td>
                      <td className="no-print">
                        <div className="d-flex justify-content-center gap-2">
                          <Button
                            variant="outline-warning"
                            size="sm"
                            className="rounded-2 px-2 py-1 d-flex align-items-center justify-content-center"
                            title="Edit"
                            onClick={() => handleShowDetail(item)}
                          >
                            <FiEye size={16} />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="rounded-2 px-2 py-1 d-flex align-items-center justify-content-center"
                            title="Hapus"
                            onClick={() => deleteMsib(item.id)}
                          >
                            <FiTrash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="14" className="text-center text-muted py-3">
                      Tidak ada data
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

      <Modal show={showDetailModal} onHide={handleCloseDetail} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-semibold ">
            <FiBookOpen className="mx-2" />
            Detail MSIB
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedDetail && (
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong className="text-secondary">Nama Mahasiswa:</strong><br />
                {selectedDetail.nama}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Nim:</strong><br />
                {selectedDetail.nim}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Program:</strong><br />
                {selectedDetail.program}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Judul:</strong><br />
                {selectedDetail.judul}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Mitra:</strong><br />
                {selectedDetail.mitra}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Tanggal Mulai:</strong> <br />
                {selectedDetail.tanggal_mulai?.slice(0, 10)}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Tanggal Selesai:</strong> <br />
                {selectedDetail.tanggal_selesai?.slice(0, 10)}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">File Pendukung:</strong>
                <div className="mt-2 d-flex flex-column gap-2">
                  {selectedDetail.lembar_pengesahan && (
                    <a
                      href={`http://localhost:5000/uploads/kegiatan_mahasiswa/${selectedDetail.lembar_pengesahan}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-primary"
                    >
                      <FiFile className="me-2" />
                      Lembar Pengesahan
                    </a>
                  )}
                  {selectedDetail.laporan && (
                    <a
                      href={`http://localhost:5000/uploads/kegiatan_mahasiswa/${selectedDetail.laporan}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-primary"
                    >
                      <FiFile className="me-2" />
                      Laporan
                    </a>
                  )}
                  {selectedDetail.projek && (
                    <a
                      href={`http://localhost:5000/uploads/kegiatan_mahasiswa/${selectedDetail.projek}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-primary"
                    >
                      <FiFile className="me-2" />
                      Projek
                    </a>
                  )}
                  {selectedDetail.sertifikat && (
                    <a
                      href={`http://localhost:5000/uploads/kegiatan_mahasiswa/${selectedDetail.sertifikat}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-primary"
                    >
                      <FiFile className="me-2" />
                      Sertifikat
                    </a>
                  )}
                  {selectedDetail.konversi_nilai && (
                    <a
                      href={`http://localhost:5000/uploads/kegiatan_mahasiswa/${selectedDetail.konversi_nilai}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-primary"
                    >
                      <FiFile className="me-2" />
                      Konversi Nilai
                    </a>
                  )}
                  {!selectedDetail.lembar_pengesahan && !selectedDetail.laporan && !selectedDetail.projek && !selectedDetail.sertifikat && !selectedDetail.konversi_nilai && (
                    <span className="text-muted">Tidak ada file</span>
                  )}
                </div>
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

export default Msib;
