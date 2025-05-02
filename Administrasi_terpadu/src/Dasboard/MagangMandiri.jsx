import React, { useEffect, useState } from "react";
import { Container, Card, Table, Button, Row, Col, Form, InputGroup, Modal } from "react-bootstrap";
import { FiPlus, FiSearch, FiFilter, FiEye, FiTrash2, FiFile } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import "../Dist/Home.css"
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const MagangMandiri = () => {
  const navigate = useNavigate();
  const [magangmandiriList, setMagangMandiriList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const itemsPerPage = 10;
  const printRef = useRef();

  useEffect(() => {
    fetchMagangMandiri();
  }, []);

  const fetchMagangMandiri = async () => {
    try {
      const response = await axios.get("http://localhost:5000/magang_mandiri");
      setMagangMandiriList(response.data);
    } catch (error) {
      console.error("Gagal mengambil data Magang Mandiri:", error);
    }
  };

  const deleteMagangMandiri = async (id) => {
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
        await axios.delete(`http://localhost:5000/magang_mandiri/${id}`);
        fetchMagangMandiri();
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

  const handleDownload = (filename) => {
    if (!filename) return;
    window.open(`http://localhost:5000/uploads/kegiatan_mahasiswa/${filename}`, "_blank");
  };

  const handleShowDetail = (magang_mandiri) => {
    setSelectedDetail(magang_mandiri);
    setShowDetailModal(true);
  };

  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setSelectedDetail(null);
  };

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "magang mandiri",
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
    const worksheet = workbook.addWorksheet("magang mandiri");

    worksheet.addRow([
      "No", "Nama", "NIM", "Judul", "Nama Perusahaan", "Tanggal Mulai", "Tanggal Selesai", "Sertifikat", "Konversi Nilai", "File Laporan"
    ]);

    const dataWithFiles = filteredMagangMandiri.filter(magang_mandiri =>
      magang_mandiri.sertifikat || magang_mandiri.konversi_nilai || magang_mandiri.laporan
    );

    dataWithFiles.forEach((magang_mandiri, index) => {
      const row = worksheet.addRow([
        index + 1,
        magang_mandiri.nama,
        magang_mandiri.nim,
        magang_mandiri.judul,
        magang_mandiri.nama_perusahaan,
        magang_mandiri.tanggal_mulai?.slice(0, 10),
        magang_mandiri.tanggal_selesai?.slice(0, 10),
        magang_mandiri.sertifikat ? { text: "Lihat", hyperlink: `http://localhost:5000/uploads/kegiatan_mahasiswa/${magang_mandiri.sertifikat}` } : "",
        magang_mandiri.konversi_nilai ? { text: "Lihat", hyperlink: `http://localhost:5000/uploads/kegiatan_mahasiswa/${magang_mandiri.konversi_nilai}` } : "",
        magang_mandiri.laporan ? { text: "Lihat", hyperlink: `http://localhost:5000/uploads/kegiatan_mahasiswa/${magang_mandiri.laporan}` } : "",
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
    saveAs(blob, "magang mandiri.xlsx");
  };



  const filteredMagangMandiri = magangmandiriList.filter((magang_mandiri) => {
    return magang_mandiri.nama.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalItems = filteredMagangMandiri.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedMagangMandiri = filteredMagangMandiri.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container fluid className="p-4">
      <Row className="align-items-center p-4">
        <Col>
          <h2 className="mb-1 fw-bold text-white">MAGANG MANDIRI</h2>
          <p className="text-muted mb-0">Daftar Magang Mandiri Mahasiswa Sistem Informasi</p>
        </Col>
      </Row>

      <Card className="shadow border-0">
        <Card.Body className="p-0">
          <div className="p-3 border-bottom">
            <Row className="align-items-center g-3">
              <Col md={6} lg={5}>
                <h5 className="mb-0 fw-semibold">Daftar Magang Mandiri Mahasiswa Sistem Informasi</h5>
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
              <h4 className="text-uppercase">Magang Mandiri</h4>
              <p>Tanggal Cetak: {new Date().toLocaleDateString()}</p>
            </div>
            <Table striped bordered className="align-middle mb-0 text-center">
              <thead className="bg-light">
                <tr>
                  <th className="py-3">No</th>
                  <th className="py-3">Nama</th>
                  <th className="py-3">Nim</th>
                  <th className="py-3">Judul</th>
                  <th className="py-3">Nama Perusahaan</th>
                  <th className="py-3">Tanggal Mulai</th>
                  <th className="py-3">Tanggal Selesai</th>
                  <th className="py-3">Sertifikat</th>
                  <th className="py-3">Konversi Nilai</th>
                  <th className="py-3">File Laporan</th>
                  <th className="py-3 no-print">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginatedMagangMandiri.length > 0 ? (
                  paginatedMagangMandiri.map((magang_mandiri, index) => (
                    <tr key={magang_mandiri.id}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{magang_mandiri.nama}</td>
                      <td>{magang_mandiri.nim}</td>
                      <td>{magang_mandiri.judul}</td>
                      <td>{magang_mandiri.nama_perusahaan}</td>
                      <td>{magang_mandiri.tanggal_mulai?.slice(0, 10)}</td>
                      <td>{magang_mandiri.tanggal_selesai?.slice(0, 10)}</td>
                      <td>
                        {magang_mandiri.sertifikat && (
                          <Button
                            size="sm"
                            variant="link"
                            onClick={() => handleDownload(magang_mandiri.sertifikat)}
                          >
                            Lihat
                          </Button>
                        )}
                      </td>
                      <td>
                        {magang_mandiri.konversi_nilai && (
                          <Button
                            size="sm"
                            variant="link"
                            onClick={() => handleDownload(magang_mandiri.konversi_nilai)}
                          >
                            Lihat
                          </Button>
                        )}
                      </td>
                      <td>
                        {magang_mandiri.laporan && (
                          <Button
                            size="sm"
                            variant="link"
                            onClick={() => handleDownload(magang_mandiri.laporan)}
                          >
                            Lihat
                          </Button>
                        )}
                      </td>
                      <td className="no-print">
                        <div className="d-flex justify-content-center gap-2">
                          <Button
                            variant="outline-warning"
                            size="sm"
                            className="rounded-2 px-2 py-1"
                            title="Lihat Detail"
                            onClick={() => handleShowDetail(magang_mandiri)}
                          >
                            <FiEye size={16} />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="rounded-2 px-2 py-1"
                            title="Hapus"
                            onClick={() => deleteMagangMandiri(magang_mandiri.id)}
                          >
                            <FiTrash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="text-center py-4">
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
        </Card.Body>
      </Card>

      <Modal show={showDetailModal} onHide={handleCloseDetail} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detail Magang Mandiri</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDetail && (
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong className="text-secondary">Nama:</strong><br />
                {selectedDetail.nama}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Nim:</strong><br />
                {selectedDetail.nim}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Judul:</strong><br />
                {selectedDetail.judul}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Nama Perusahaan:</strong><br />
                {selectedDetail.nama_perusahaan}
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
                  {!selectedDetail.lembar_pengesahan && !selectedDetail.laporan && !selectedDetail.projek && !selectedDetail.sertifikat && !selectedDetail.konversi_nilai && (
                    <span className="text-muted">Tidak ada file</span>
                  )}
                </div>
              </li>
            </ul>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetail}>Tutup</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MagangMandiri;
