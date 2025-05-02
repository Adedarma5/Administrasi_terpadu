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

const KerjaPraktik = () => {
  const navigate = useNavigate();
  const [kerjapraktikList, setKerjaPraktikList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const itemsPerPage = 10;
  const printRef = useRef();

  useEffect(() => {
    fetchKerjaPraktik();

  }, []);

  const fetchKerjaPraktik = async () => {
    try {
      const response = await axios.get("http://localhost:5000/kerja_praktik");
      setKerjaPraktikList(response.data);
    } catch (error) {
      console.error("Gagal mengambil data Kerja Praktik:", error);
    }
  };


  const handleDownload = (filename) => {
    if (!filename) return;
    window.open(`http://localhost:5000/uploads/kegiatan_mahasiswa/${filename}`, "_blank");
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
        await axios.delete(`http://localhost:5000/kerja_praktik/${id}`);
        fetchKerjaPraktik();
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
    documentTitle: "kerja praktik",
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
    const worksheet = workbook.addWorksheet("kerja praktik");

    worksheet.addRow([
      "No", "Nama", "NIM", "Dosen Pembimbing", "Judul", "Tempat KP",
      "Tanggal Mulai", "Tanggal Selesai",
      "KRS Terakhir", "Pengesahan Prodi", "Pengesahan Pembimbing", "Nilai Dari Perusahaan", "Daftar Hadir", "Laporan", "Projek"
    ]);

    const dataWithFiles = filteredKerjaPraktik.filter(kerja_praktik =>
      kerja_praktik.krs_terakhir || kerja_praktik.pengesahan_prodi || kerja_praktik.pengesahan_pembimbing || kerja_praktik.nilai_perusahaan || kerja_praktik.daftar_hadir || kerja_praktik.daftar_hadir || kerja_praktik.laporan || kerja_praktik.projek
    );

    dataWithFiles.forEach((kerja_praktik, index) => {
      const row = worksheet.addRow([
        index + 1,
        kerja_praktik.nama,
        kerja_praktik.nim,
        kerja_praktik.dosen_pembimbing,
        kerja_praktik.judul,
        kerja_praktik.tempat_kp,
        kerja_praktik.tanggal_mulai?.slice(0, 10),
        kerja_praktik.tanggal_selesai?.slice(0, 10),
        kerja_praktik.krs_terakhir ? { text: "Lihat", hyperlink: `http://localhost:5000/uploads/kegiatan_mahasiswa/${kerja_praktik.krs_terakhir}` } : "",
        kerja_praktik.pengesahan_prodi ? { text: "Lihat", hyperlink: `http://localhost:5000/uploads/kegiatan_mahasiswa/${kerja_praktik.pengesahan_prodi}` } : "",
        kerja_praktik.pengesahan_pembimbing ? { text: "Lihat", hyperlink: `http://localhost:5000/uploads/kegiatan_mahasiswa/${kerja_praktik.pengesahan_pembimbing}` } : "",
        kerja_praktik.nilai_perusahaan ? { text: "Lihat", hyperlink: `http://localhost:5000/uploads/kegiatan_mahasiswa/${kerja_praktik.nilai_perusahaan}` } : "",
        kerja_praktik.daftar_hadir ? { text: "Lihat", hyperlink: `http://localhost:5000/uploads/kegiatan_mahasiswa/${kerja_praktik.daftar_hadir}` } : "",
        kerja_praktik.laporan ? { text: "Lihat", hyperlink: `http://localhost:5000/uploads/kegiatan_mahasiswa/${kerja_praktik.laporan}` } : "",
        kerja_praktik.projek ? { text: "Lihat", hyperlink: `http://localhost:5000/uploads/kegiatan_mahasiswa/${kerja_praktik.projek}` } : "",
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
    saveAs(blob, "kerja praktik.xlsx");
  };


  const handleShowDetail = (kerja_praktik) => {
    setSelectedDetail(kerja_praktik);
    setShowDetailModal(true);
  };

  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setSelectedDetail(null);
  };

  const filteredKerjaPraktik = kerjapraktikList.filter((kerja_praktik) => {
    return kerja_praktik.nama.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalItems = filteredKerjaPraktik.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedKerjaPraktik = filteredKerjaPraktik.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container fluid className="p-4">
      <Row className="align-items-center p-4">
        <Col>
          <h2 className="fw-bold mb-1 text-white">Kerja Praktik</h2>
          <p className="text-muted mb-0">Daftar Kerja Praktik Mahasiswa Sistem Informasi</p>
        </Col>
      </Row>


      <Card className="shadow border-0">
        <Card.Body className="p-0">
          <div className="p-3 border-bottom">
            <Row className="align-items-center g-3">
              <Col md={6} lg={5}>
                <h5 className="mb-0 fw-semibold">Daftar Kerja Praktik Mahasiswa Sistem Informasi</h5>
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
            <Table striped bordered hover className="text-center small">
              <thead className="bg-light">
                <tr>
                  <th>No</th>
                  <th className="px-5">Nama</th>
                  <th className="px-5"> NIM</th>
                  <th className="px-5">Dosen Pembimbing</th>
                  <th className="px-5">Judul</th>
                  <th className="px-3">Tempat KP</th>
                  <th className="px-5">Tgl Mulai</th>
                  <th className="px-5">Tgl Selesai</th>
                  <th className="px-3">KRS Terakhir</th>
                  <th className="px-3">Pengesahan Prodi</th>
                  <th className="px-3">Pengesahan Pembimbing</th>
                  <th className="px-3">Nilai Perusahaan</th>
                  <th className="px-3">Daftar Hadir</th>
                  <th className="px-3">Laporan</th>
                  <th className="px-3">projek</th>
                  <th className="no-print ">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginatedKerjaPraktik.length > 0 ? (
                  paginatedKerjaPraktik.map((kerja_praktik, index) => (
                    <tr key={kerja_praktik.id}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{kerja_praktik.nama}</td>
                      <td>{kerja_praktik.nim}</td>
                      <td>{kerja_praktik.dosen_pembimbing}</td>
                      <td>{kerja_praktik.judul}</td>
                      <td>{kerja_praktik.tempat_kp}</td>
                      <td>{kerja_praktik.tanggal_mulai?.slice(0, 10)}</td>
                      <td>{kerja_praktik.tanggal_selesai?.slice(0, 10)}</td>
                      <td>
                        {kerja_praktik.krs_terakhir && (
                          <Button
                            size="sm"
                            variant="link"
                            onClick={() => handleDownload(kerja_praktik.krs_terakhir)}
                          >
                            Lihat
                          </Button>
                        )}
                      </td>
                      <td>
                        {kerja_praktik.pengesahan_prodi && (
                          <Button
                            size="sm"
                            variant="link"
                            onClick={() => handleDownload(kerja_praktik.pengesahan_prodi)}
                          >
                            Lihat
                          </Button>
                        )}
                      </td>
                      <td>
                        {kerja_praktik.pengesahan_pembimbing && (
                          <Button
                            size="sm"
                            variant="link"
                            onClick={() => handleDownload(kerja_praktik.pengesahan_pembimbing)}
                          >
                            Lihat
                          </Button>
                        )}
                      </td>
                      <td>
                        {kerja_praktik.nilai_perusahaan && (
                          <Button
                            size="sm"
                            variant="link"
                            onClick={() => handleDownload(kerja_praktik.nilai_perusahaan)}
                          >
                            Lihat
                          </Button>
                        )}
                      </td>
                      <td>
                        {kerja_praktik.daftar_hadir && (
                          <Button
                            size="sm"
                            variant="link"
                            onClick={() => handleDownload(kerja_praktik.daftar_hadir)}
                          >
                            Lihat
                          </Button>
                        )}
                      </td>
                      <td>
                        {kerja_praktik.laporan && (
                          <Button
                            size="sm"
                            variant="link"
                            onClick={() => handleDownload(kerja_praktik.laporan)}
                          >
                            Lihat
                          </Button>
                        )}
                      </td>
                      <td>
                        {kerja_praktik.projek ? (
                          <Button
                            size="sm"
                            variant="link"
                            onClick={() => handleDownload(kerja_praktik.projek)}
                          >
                            Lihat
                          </Button>
                        ) : (
                          <span>Tidak ada File</span>
                        )}
                      </td>
                      <td className="no-print">
                        <div className="d-flex justify-content-center gap-2">
                          <Button
                            variant="outline-warning"
                            size="sm"
                            className="rounded-2 px-2 py-1"
                            title="Lihat Detail"
                            onClick={() => handleShowDetail(kerja_praktik)}
                          >
                            <FiEye size={16} />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="rounded-2 px-2 py-1"
                            title="Hapus"
                            onClick={() => deleteMagangMandiri(kerja_praktik.id)}
                          >
                            <FiTrash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="16" className="text-center py-4">
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
              Menampilkan {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems} entri
            </div>
            <div className="mx-4">
              <Button
                className="mx-2 mb-2"
                variant="outline-primary"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Sebelumnya
              </Button>
              <Button
                className="mx-2 mb-2"
                variant="outline-primary"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
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
            <ul className="list-group list-group-flush" >
              <li className="list-group-item">
                <strong className="text-secondary">Nama:</strong><br />
                {selectedDetail.nama}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Nim:</strong><br />
                {selectedDetail.nim}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Dosen Pembimbing:</strong><br />
                {selectedDetail.dosen_pembimbing}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Judul:</strong><br />
                {selectedDetail.judul}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Tempat KP:</strong><br />
                {selectedDetail.tempat_kp}
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

                  {selectedDetail.krs_terakhir && (
                    <a
                      href={`http://localhost:5000/uploads/kegiatan_mahasiswa/${selectedDetail.krs_terakhir}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-primary"
                    >
                      <FiFile className="me-2" />
                      KRS Terakhir
                    </a>
                  )}
                  {selectedDetail.pengesahan_prodi && (
                    <a
                      href={`http://localhost:5000/uploads/kegiatan_mahasiswa/${selectedDetail.pengesahan_prodi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-primary"
                    >
                      <FiFile className="me-2" />
                      Pengesahan Prodi
                    </a>
                  )}
                  {selectedDetail.pengesahan_pembimbing && (
                    <a
                      href={`http://localhost:5000/uploads/kegiatan_mahasiswa/${selectedDetail.pengesahan_pembimbing}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-primary"
                    >
                      <FiFile className="me-2" />
                      Pengesahan Pembimbing
                    </a>
                  )}
                  {selectedDetail.nilai_perusahaan && (
                    <a
                      href={`http://localhost:5000/uploads/kegiatan_mahasiswa/${selectedDetail.nilai_perusahaan}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-primary"
                    >
                      <FiFile className="me-2" />
                      Nilai Perusahaan
                    </a>
                  )}
                  {selectedDetail.daftar_hadir && (
                    <a
                      href={`http://localhost:5000/uploads/kegiatan_mahasiswa/${selectedDetail.daftar_hadir}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-primary"
                    >
                      <FiFile className="me-2" />
                      Daftar Hadir
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
                  {!selectedDetail.krs_terakhir && !selectedDetail.pengesahan_prodi && !selectedDetail.pengesahan_pembimbing && !selectedDetail.nilai_perusahaan && !selectedDetail.daftar_hadir && !selectedDetail.laporan && !selectedDetail.projek && (
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
    </Container >
  );
};

export default KerjaPraktik;