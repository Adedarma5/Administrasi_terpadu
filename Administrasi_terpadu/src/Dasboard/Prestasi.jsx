import { Container, Card, Table, Button, Row, Col, Form, InputGroup, Modal } from "react-bootstrap";
import { FiPlus, FiSearch, FiFilter, FiEye, FiTrash2, FiFile } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import "../Dist/Home.css"
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const Prestasi = () => {
  const navigate = useNavigate();
  const [prestasiList, setPrestasiList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const itemsPerPage = 10;
  const printRef = useRef();

  useEffect(() => {
    fetchPrestasi();
  }, []);

  const fetchPrestasi = async () => {
    try {
      const response = await axios.get("http://localhost:5000/prestasi");
      setPrestasiList(response.data);
    } catch (error) {
      console.error("Gagal mengambil data Prestasi:", error);
    }
  };

  const handleDownload = (filename) => {
    if (!filename) return;
    window.open(`http://localhost:5000/uploads/kegiatan_mahasiswa/${filename}`, "_blank");
  };

  const deletePrestasi = async (id) => {
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
        await axios.delete(`http://localhost:5000/prestasi/${id}`);
        fetchPrestasi();
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
    documentTitle: "Prestasi",
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
    const worksheet = workbook.addWorksheet("Prestasi");

    worksheet.addRow(["No", "Nama", "Nim", "Kategori Peserta", "Tingkatan", "Nama Perlombaan", "Bidang Perlombaan", "Sertifikat"]);

    for (let i = 0; i < filteredPrestasi.length; i++) {
      const prestasi = filteredPrestasi[i];
      worksheet.addRow([]);
      const row = worksheet.getRow(i + 2);

      row.getCell(1).value = i + 1;
      row.getCell(2).value = prestasi.nama;
      row.getCell(3).value = prestasi.nim;
      row.getCell(4).value = prestasi.kategori_peserta;
      row.getCell(5).value = prestasi.tingkatan;
      row.getCell(6).value = prestasi.nama_perlombaan;
      row.getCell(7).value = prestasi.bidang_perlombaan;

      const fileUrl = `http://localhost:5000/uploads/kegiatan_mahasiswa/${prestasi.sertifikat}`;
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
      { width: 20 },
      { width: 20 },
      { width: 20 },
    ];

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "Laporan_prestasi.xlsx");
  };


  const handleShowDetail = (item) => {
    setSelectedDetail(item);
    setShowDetailModal(true);
  };

  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setSelectedDetail(null);
  };

  const filteredPrestasi = prestasiList.filter((prestasi) => {
    return prestasi.nama.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalItems = filteredPrestasi.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedPrestasi = filteredPrestasi.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container fluid className="p-4">
      <Row className="align-items-center p-4">
        <Col>
          <h2 className="mb-1 fw-bold text-white text-uppercase">Prestasi</h2>
          <p className="text-muted mb-0">
            Daftar Prestasi Mahasiswa Sistem Informasi
          </p>
        </Col>
      </Row>


      <Card className="shadow border-0">
        <Card.Body className="p-0">
          <div className="p-3 border-bottom">
            <Row className="align-items-center g-3">
              <Col md={6} lg={5}>
                <h5 className="mb-0 fw-semibold">Daftar Prestasi Sistem Informasi</h5>
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
              <h4 className="text-uppercase">Prestasi</h4>
              <p>Tanggal Cetak: {new Date().toLocaleDateString()}</p>
            </div>
            <Table striped bordered className="align-middle mb-0 text-center">
              <thead className="bg-light">
                <tr>
                  <th className="py-3">No</th>
                  <th className="py-3">Nama</th>
                  <th className="py-3">Nim</th>
                  <th className="py-3">Kategori Peserta</th>
                  <th className="py-3">Tingkatan</th>
                  <th className="py-3">Nama Perlombaan</th>
                  <th className="py-3">Bidang Perlombaan</th>
                  <th className="py-3">Sertifikat</th>
                  <th className="py-3 no-print">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPrestasi.length > 0 ? (
                  paginatedPrestasi.map((prestasi, index) => (
                    <tr key={prestasi.id}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{prestasi.nama}</td>
                      <td>{prestasi.nim}</td>
                      <td>{prestasi.kategori_peserta}</td>
                      <td>{prestasi.tingkatan}</td>
                      <td>{prestasi.nama_perlombaan}</td>
                      <td>{prestasi.bidang_perlombaan}</td>
                      <td>
                        {prestasi.sertifikat && (
                          <Button
                            size="sm"
                            variant="link"
                            onClick={() => handleDownload(prestasi.sertifikat)}
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
                            onClick={() => handleShowDetail(prestasi)}
                          >
                            <FiEye size={16} />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="rounded-2 px-2 py-1"
                            title="Hapus"
                            onClick={() => deletePrestasi(prestasi.id)}
                          >
                            <FiTrash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12" className="text-center py-4">
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
            <div className="mx-4" >
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
                <strong className="text-secondary">Kategori Peserta:</strong><br />
                {selectedDetail.kategori_peserta}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Tingkatan:</strong>< br />
                {selectedDetail.tingkatan}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Nama Perlombaan:</strong>< br />
                {selectedDetail.nama_perlombaan}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Bidang Perlombaan:</strong>< br />
                {selectedDetail.bidang_perlombaan}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Sertifikat:</strong><br />
                <a
                  href={`http://localhost:5000/uploads/kegiatan_mahasiswa/${selectedDetail.sertifikat}`}
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

export default Prestasi;