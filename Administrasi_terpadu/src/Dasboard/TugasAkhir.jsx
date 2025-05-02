import { Container, Card, Table, Button, Row, Col, Form, InputGroup, Modal } from "react-bootstrap";
import { FiPlus, FiSearch, FiFilter, FiEye, FiTrash2, FiFile } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import "../Dist/Home.css"
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const TugasAkhir = () => {
  const navigate = useNavigate();
  const [tugasakhirList, setTugasAkhirList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const itemsPerPage = 10;
  const printRef = useRef();

  useEffect(() => {
    fetchTugasAkhir();
  }, []);

  const fetchTugasAkhir = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tugas_akhir");
      setTugasAkhirList(response.data);
    } catch (error) {
      console.error("Gagal mengambil data TGA:", error);
    }
  };

  const deleteTugasAkhir = async (id) => {
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
        await axios.delete(`http://localhost:5000/tugas_akhir/${id}`);
        fetchTugasAkhir();
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

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Tugas Akhir",
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
    const worksheet = workbook.addWorksheet("Tugas Akhir");

    worksheet.addRow([
      "No", "Nama", "NIM", "No HP", "Skripsi", "Program TGA", "Jurnal Sisfo"
    ]);

    const dataWithFiles = filteredTugasAkhir.filter(tugas_akhir =>
      tugas_akhir.skripsi || tugas_akhir.program_tga || tugas_akhir.jurnal_sisfo
    );

    dataWithFiles.forEach((tugas_akhir, index) => {
      const row = worksheet.addRow([
        index + 1,
        tugas_akhir.nama,
        tugas_akhir.nim,
        tugas_akhir.no_hp,
        tugas_akhir.skripsi ? { text: "Lihat", hyperlink: `http://localhost:5000/uploads/kegiatan_mahasiswa/${tugas_akhir.skripsi}` } : "",
        tugas_akhir.program_tga ? { text: "Lihat", hyperlink: `http://localhost:5000/uploads/kegiatan_mahasiswa/${tugas_akhir.program_tga}` } : "",
        tugas_akhir.jurnal_sisfo ? { text: "Lihat", hyperlink: `http://localhost:5000/uploads/kegiatan_mahasiswa/${tugas_akhir.jurnal_sisfo}` } : "",
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
    saveAs(blob, "Tugas Akhir.xlsx");
  };


  const handleShowDetail = (tugas_akhir) => {
    setSelectedDetail(tugas_akhir);
    setShowDetailModal(true);
  };

  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setSelectedDetail(null);
  };

  const filteredTugasAkhir = tugasakhirList.filter((tugas_akhir) => {
    return tugas_akhir.nama.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalItems = filteredTugasAkhir.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedTugasAkhir = filteredTugasAkhir.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container fluid className="p-4">
      <Row className="align-items-center p-4">
        <Col>
          <h2 className="mb-1 fw-bold text-white">Tugas Akhir</h2>
          <p className="text-muted mb-0">
            Daftar Tugas Akhir Mahasiswa Sistem Informasi
          </p>
        </Col>
      </Row>


      <Card className="shadow border-0">
        <Card.Body className="p-0">
          <div className="p-3 border-bottom">
            <Row className="align-items-center g-3">
              <Col md={6} lg={5}>
                <h5 className="mb-0 fw-semibold">Daftar Tugas Akhir Mahasiswa Sistem Informasi</h5>
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
                  <th className="py-3">NO Hp</th>
                  <th className="py-3">Skripsi Versi Distribusi</th>
                  <th className="py-3">Program TGA</th>
                  <th className="py-3">Jurnal Skripsi Dengan Format Sisfo</th>
                  <th className="py-3 no-print">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTugasAkhir.length > 0 ? (
                  paginatedTugasAkhir.map((tugas_akhir, index) => (
                    <tr key={tugas_akhir.id}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{tugas_akhir.nama}</td>
                      <td>{tugas_akhir.nim}</td>
                      <td>{tugas_akhir.no_hp}</td>
                      <td>
                        {tugas_akhir.skripsi && (
                          <Button
                            size="sm"
                            variant="link"
                            onClick={() => handleDownload(tugas_akhir.skripsi)}
                          >
                            Lihat
                          </Button>
                        )}
                      </td>
                      <td>
                        {tugas_akhir.program_tga && (
                          <Button
                            size="sm"
                            variant="link"
                            onClick={() => handleDownload(tugas_akhir.program_tga)}
                          >
                            Lihat
                          </Button>
                        )}
                      </td>
                      <td>
                        {tugas_akhir.jurnal_sisfo && (
                          <Button
                            size="sm"
                            variant="link"
                            onClick={() => handleDownload(tugas_akhir.jurnal_sisfo)}
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
                            onClick={() => handleShowDetail(tugas_akhir)}
                          >
                            <FiEye size={16} />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="rounded-2 px-2 py-1"
                            title="Hapus"
                            onClick={() => deleteTugasAkhir(tugas_akhir.id)}
                          >
                            <FiTrash2 size={16} />
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
                <strong className="text-secondary">No HP:</strong><br />
                {selectedDetail.no_hp}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">File Pendukung:</strong>
                <div className="mt-2 d-flex flex-column gap-2">

                  {selectedDetail.skripsi && (
                    <a
                      href={`http://localhost:5000/uploads/kegiatan_mahasiswa/${selectedDetail.skripsi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-primary"
                    >
                      <FiFile className="me-2" />
                      Skripsi
                    </a>
                  )}
                  {selectedDetail.program_tga && (
                    <a
                      href={`http://localhost:5000/uploads/kegiatan_mahasiswa/${selectedDetail.program_tga}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-primary"
                    >
                      <FiFile className="me-2" />
                      Program TGA
                    </a>
                  )}
                  {selectedDetail.jurnal_sisfo && (
                    <a
                      href={`http://localhost:5000/uploads/kegiatan_mahasiswa/${selectedDetail.jurnal_sisfo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-primary"
                    >
                      <FiFile className="me-2" />
                      Jurnal Sisfo
                    </a>
                  )}
                  {!selectedDetail.skripsi && !selectedDetail.program_tga && !selectedDetail.jurnal_sisfo && (
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

export default TugasAkhir;