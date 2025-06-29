import React, { useState, useEffect } from "react";
import { Container, Card, Table, Button, Row, Col, Form, InputGroup, Modal } from "react-bootstrap";
import { FiPlus, FiSearch, FiFilter, FiEdit2, FiTrash2, FiBookOpen, FiEye, FiFile } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import "../Dist/Home.css"
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const Pengajaran = () => {
  const navigate = useNavigate();
  const [pengajaranList, setPengajaranList] = useState([]);
  const [dosenList, setDosenList] = useState([]);
  const [matakuliahList, setMataKuliahList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedmatakuliah, setSelectedMataKuliah] = useState("");
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const user = JSON.parse(localStorage.getItem('user'));
  const printRef = useRef();

  useEffect(() => {
    fetchPengajaran();
    fetchMataKuliah();
    fetchDosen();
  }, []);


  const fetchPengajaran = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = "http://localhost:5000/pengajaran";

      if (user?.role === "user") {
        url = `http://localhost:5000/pengajaran?userId=${user.id}`;
      }

      const token = localStorage.getItem('token');

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPengajaranList(response.data);
    } catch (error) {
      setError("Gagal memuat data pengajaran.");
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const fetchMataKuliah = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5000/mata_kuliah");
      setMataKuliahList(response.data);
    } catch (error) {
      setError("Gagal memuat data Mata Kuliah.");
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const fetchDosen = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5000/dosen");
      setMataKuliahList(response.data);
    } catch (error) {
      setError("Gagal memuat data Dosen.");
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const deletePengajaran = async (id) => {
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
        await axios.delete(`http://localhost:5000/pengajaran/${id}`);
        fetchPengajaran();
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
    documentTitle: "",
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
    const worksheet = workbook.addWorksheet("Pengajaran");


    worksheet.addRow(["No", "Nama Dosen", "Mata Kuliah", "Semester", "Kelas", "Metode Pengajaran", "Keterlibatan Praktisi", "Nama Praktisi", "Institusi Praktisi", "File Pengajaran"]);


    for (let i = 0; i < filteredPengajaran.length; i++) {
      const pengajaran = filteredPengajaran[i];
      worksheet.addRow([]);
      const row = worksheet.getRow(i + 2);

      row.getCell(1).value = i + 1;
      row.getCell(2).value = pengajaran.nama_dosen,
        row.getCell(3).value = pengajaran.mata_kuliah,
        row.getCell(4).value = pengajaran.semester,
        row.getCell(5).value = pengajaran.kelas,
        row.getCell(6).value = pengajaran.metode_pengajaran,
        row.getCell(7).value = pengajaran.keterlibatan_praktisi
      row.getCell(8).value = pengajaran.nama_praktisi
      row.getCell(9).value = pengajaran.institusi_praktisi

      const fileUrl = `http://localhost:5000/uploads/pengajaran/${pengajaran.file_pengajaran}`;
      row.getCell(10).value = {
        text: "Lihat File",
        hyperlink: fileUrl,
      };
      row.getCell(10).font = { color: { argb: 'FF0000FF' }, underline: true };

    }

    worksheet.columns = [
      { width: 5 },
      { width: 30 },
      { width: 55 },
      { width: 40 },
      { width: 30 },
      { width: 20 },
    ];

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "Pengajaran.xlsx");
  };


  const handleShowDetail = (item) => {
    setSelectedDetail(item);
    setShowDetailModal(true);
  };

  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setSelectedDetail(null);
  };

  const filteredPengajaran = pengajaranList.filter((pengajaran) => {
    const nameMatch = pengajaran.nama_dosen?.toLowerCase().includes(searchTerm.toLowerCase());
    const matakuliahMatch = selectedmatakuliah === "" || pengajaran.mata_kuliah?.toString() === selectedmatakuliah;
    return nameMatch && matakuliahMatch;
  });

  const sortedBahanAjar = filteredPengajaran.sort((a, b) => a.pertemuan - b.pertemuan);
  const totalItems = sortedBahanAjar.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedPengajaran = sortedBahanAjar.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);



  return (
    <Container fluid className="p-4">
      <Row className="align-items-center p-4">
        <Col>
          <h2 className="mb-1 fw-bold text-white">PENGAJARAN</h2>
          <p className="text-muted mb-0">Daftar Mata Kuliah yang Diajar oleh Dosen</p>
        </Col>
        <Col xs="auto">
          <Button variant="success" onClick={() => navigate("/admin/dashboard/pengajaran/tambahpengajaran")} className=" shadow d-flex align-items-center gap-2">
            <FiPlus size={16} />
            <span>Tambah Pengajaran</span>
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
                    value={selectedmatakuliah}
                    onChange={(e) => {
                      setSelectedMataKuliah(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="shadow-none py-1"
                  >
                    <option value="">-- Semua Mata Kuliah --</option>
                    {matakuliahList.map((mata_kuliah) => (
                      <option key={mata_kuliah.id} value={mata_kuliah.name}>
                        {mata_kuliah.name}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </div>
            </Card.Header>

            <Card.Body className="p-0 text-center">
              <div className="table-responsive" ref={printRef}>
                <div className="print-only">
                  <h4 className="text-uppercase">Pengajaran</h4>
                  <p>Tanggal Cetak: {new Date().toLocaleDateString()}</p>
                </div>
                <Table striped bordered hover className="align-middle mb-0" size="sm">
                  <thead>
                    <tr className="bg-light">
                      <th className="px-2 py-4">No</th>
                      <th className="px-5 py-2">Nama Dosen</th>
                      <th className="px-5 py-2">Mata Kuliah</th>
                      <th className="px-3 py-4">Semester</th>
                      <th className="px-3 py-4">Kelas</th>
                      <th className="px-5 py-2">Metode Pengajaran</th>
                      <th className="px-2 py-2">Keterlibatan Praktisi</th>
                      <th className="px-5 py-2">Nama Praktisi</th>
                      <th className="px-5 py-2">Institusi Praktisi</th>
                      <th className="px-3 py-2">File Pengajaran</th>
                      <th className="px-2 py-4 no-print">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedPengajaran.length > 0 ? (
                      paginatedPengajaran.map((item, index) => (
                        <tr key={item.id}>
                          <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                          <td>{item.nama_dosen}</td>
                          <td>{item.mata_kuliah}</td>
                          <td>{item.semester}</td>
                          <td>{item.kelas}</td>
                          <td>{item.metode_pengajaran}</td>
                          <td>{item.keterlibatan_praktisi}</td>
                          <td>{item.nama_praktisi}</td>
                          <td>{item.institusi_praktisi}</td>
                          <td>
                            <a
                              href={`http://localhost:5000/uploads/pengajaran/${item.file_pengajaran}`}
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
                                title="Edit"
                                onClick={() => navigate(`/admin/dashboard/pengajaran/editpengajaran/${item.id}`)}
                              >
                                <FiEdit2 size={16} />
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => deletePengajaran(item.id)}>
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
                            <p className="text-muted mb-0">Tidak ada data  yang tersedia</p>
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
            Detail Pengajaran
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedDetail && (
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong className="text-secondary">Nama Dosen:</strong><br />
                {selectedDetail.nama_dosen}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Mata Kuliah:</strong><br />
                {selectedDetail.mata_kuliah}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Semester:</strong><br />
                {selectedDetail.semester}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Kelas:</strong> <br />
                {selectedDetail.kelas}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Metode Pengajaran:</strong> <br />
                {selectedDetail.metode_pengajaran}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Keterlibatan Praktisi:</strong> <br />
                {selectedDetail.keterlibatan_praktisi}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Nama Praktisi:</strong> <br />
                {selectedDetail.nama_praktisi}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">Institusi Praktisi:</strong> <br />
                {selectedDetail.institusi_praktisi}
              </li>
              <li className="list-group-item">
                <strong className="text-secondary">File Pengajaran:</strong><br />
                <a
                  href={`http://localhost:5000/uploads/pengajaran/${selectedDetail.file_pengajaran}`}
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

export default Pengajaran;
