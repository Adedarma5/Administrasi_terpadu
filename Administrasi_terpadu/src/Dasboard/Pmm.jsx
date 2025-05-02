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

const Pmm = () => {
  const navigate = useNavigate();
  const [pmmList, setPmmList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const itemsPerPage = 10;
  const printRef = useRef();

  useEffect(() => {
    fetchPmm();
  }, []);

  const fetchPmm = async () => {
    try {
      const response = await axios.get("http://localhost:5000/pmm");
      setPmmList(response.data);
    } catch (error) {
      console.error("Gagal mengambil data Pmm:", error);
    }
  };

  const deletePmm = async (id) => {
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
        await axios.delete(`http://localhost:5000/pmm/${id}`);
        fetchPmm();
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
    documentTitle: "Studen Mobility",
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
    const worksheet = workbook.addWorksheet("Student Mobility");

    worksheet.addRow(["No", "Nama", "Nim", "Stambuk", "Nama Universitas", "Konversi Nilai"]);

    for (let i = 0; i < filteredPmm.length; i++) {
      const pmm = filteredPmm[i];
      worksheet.addRow([]);
      const row = worksheet.getRow(i + 2);

      row.getCell(1).value = i + 1;
      row.getCell(2).value = pmm.nama;
      row.getCell(3).value = pmm.nim;
      row.getCell(4).value = pmm.stambuk;
      row.getCell(5).value = pmm.nama_universitas;

      const fileUrl = `http://localhost:5000/uploads/kegiatan_mahasiswa/${pmm.konversi_nilai}`;
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
      { width: 20 },
    ];

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "Student Mobility.xlsx");
  };

  const handleDownload = (filename) => {
    if (!filename) return;
    window.open(`http://localhost:5000/uploads/kegiatan_mahasiswa/${filename}`, "_blank");
  };

  const handleShowDetail = (prestasi) => {
    setSelectedDetail(prestasi);
    setShowDetailModal(true);
  };

  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setSelectedDetail(null);
  };

  const filteredPmm = pmmList.filter((prestasi) => {
    return prestasi.nama.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalItems = filteredPmm.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedPmm = filteredPmm.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container fluid className="p-4">
      <Row className="align-items-center p-4">
        <Col>
          <h2 className="mb-1 fw-bold text-white text-uppercase">Student Mobility</h2>
          <p className="text-muted mb-0">
            Daftar Pertukaran Mahasiswa Sistem Informasi
          </p>
        </Col>
        <Col xs="auto">
          {/* <Button variant="primary" className="d-flex align-items-center gap-2" onClick={() => navigate("/admin/dashboard/prestasi/tambahprestasi")}>
                <FiPlus size={18} />
                <span>Tambah Prestasi</span>
              </Button> */}
        </Col>
      </Row>


      <Card className="shadow border-0">
        <Card.Body className="p-0">
          <div className="p-3 border-bottom">
            <Row className="align-items-center g-3">
              <Col md={6} lg={5}>
                <h5 className="mb-0 fw-semibold">Daftar Studen Mobility Sistem Informasi</h5>
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
            </div>
          </Card.Header>


          <div className="table-responsive" ref={printRef}>
            <div className="print-only">
              <h4 className="text-uppercase">Student Mobility</h4>
              <p>Tanggal Cetak: {new Date().toLocaleDateString()}</p>
            </div>
            <Table striped bordered over className="align-middle mb-0 text-center">
              <thead className="bg-light">
                <tr>
                  <th className="py-3">No</th>
                  <th className="py-3">Nama</th>
                  <th className="py-3">Nim</th>
                  <th className="py-3">Stambuk</th>
                  <th className="py-3">Nama Universitas</th>
                  <th className="py-3">Konversi Nilai</th>
                  <th className="py-3 no-print">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPmm.length > 0 ? (
                  paginatedPmm.map((pmm, index) => (
                    <tr key={pmm.id}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{pmm.nama}</td>
                      <td>{pmm.nim}</td>
                      <td>{pmm.stambuk}</td>
                      <td>{pmm.nama_universitas}</td>
                      <td>
                        {pmm.konversi_nilai && (
                          <Button
                            size="sm"
                            variant="link"
                            onClick={() => handleDownload(pmm.konversi_nilai)}
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
                            onClick={() => handleShowDetail(pmm)}
                          >
                            <FiEye size={16} />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="rounded-2 px-2 py-1"
                            title="Hapus"
                            onClick={() => deletePmm(pmm.id)}
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
                      <strong className="text-secondary">Stambuk:</strong><br />
                      {selectedDetail.stambuk}
                    </li>
                    <li className="list-group-item">
                      <strong className="text-secondary">Nama Universitas Student Mobility:</strong>< br />
                      {selectedDetail.nama_universitas}
                    </li>
                    <li className="list-group-item">
                      <strong className="text-secondary">Konversi Nilai:</strong><br />
                      <a
                        href={`http://localhost:5000/uploads/kegiatan_mahasiswa/${selectedDetail.konversi_nilai}`}
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
                <Button variant="secondary" onClick={handleCloseDetail}>Tutup</Button>
              </Modal.Footer>
            </Modal>
    </Container>
  );
};

export default Pmm;