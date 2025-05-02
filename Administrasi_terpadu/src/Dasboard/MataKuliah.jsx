import React, { useState, useEffect } from "react";
import { Container, Card, Table, Button, Badge, Row, Col, Form, InputGroup, FormSelect } from "react-bootstrap";
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiFilter } from "react-icons/fi";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import "../Dist/Home.css"
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const MataKuliah = () => {
  const navigate = useNavigate();
  const [matakuliahList, setMataKuliahList] = useState([]);
  const [selectedsemester, setSelectedSemester] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [role, setRole] = useState("");
  const itemsPerPage = 10;
  const printRef = useRef();

  const fetchMataKuliah = async () => {
    try {
      const response = await axios.get("http://localhost:5000/mata_kuliah");
      setMataKuliahList(response.data);
    } catch (error) {
      console.error("Error fetching mata kuliah data:", error);
    }
  };

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    setRole(userRole?.toLowerCase());
    fetchMataKuliah();
  }, []);

  const deleteMataKuliah = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus Mata Kuliah ini?")) {
      try {
        await axios.delete(`http://localhost:5000/mata_kuliah/${id}`);
        fetchMataKuliah();
      } catch (error) {
        console.error("Error deleting mata kuliah:", error);
      }
    }
  };

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Mata Kuliah",
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
    const worksheet = workbook.addWorksheet("Laporan Absensi");


    worksheet.addRow(["No", "Nama", "SKS", "Semester"]);


    for (let i = 0; i < filteredMataKuliah.length; i++) {
      const mata_kuliah = filteredMataKuliah[i];
      const row = worksheet.addRow([
        i + 1,
        mata_kuliah.name,
        mata_kuliah.sks,
        mata_kuliah.semester,
      ]);
    }

    worksheet.columns = [
      { width: 5 },
      { width: 30 },
      { width: 55 },
      { width: 40 },
    ];

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "mata_kuliah.xlsx");
  };

  const filteredMataKuliah = matakuliahList.filter((mata_kuliah) => {
    const nameMatch = mata_kuliah.name.toLowerCase().includes(searchTerm.toLowerCase());
    const semesterMatch = selectedsemester === "" || mata_kuliah.semester.toLowerCase() === `semester ${selectedsemester}`.toLowerCase();
    return nameMatch && semesterMatch;
  });

  const totalItems = filteredMataKuliah.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedMataKuliah = filteredMataKuliah.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container fluid className="p-4">
      <Row className="align-items-center p-4 ">
        <Col>
          <h2 className="mb-1 fw-bold text-white">MATA KULIAH</h2>
          <p className="text-muted mb-0">Sistem Informasi</p>

        </Col>
        <Col xs="auto">
          {role === "admin" && (
            <Button variant="success" onClick={() => navigate('/admin/dashboard/MataKuliah/TambahMataKuliah')} className=" shadow d-flex align-items-center gap-2">
              <FiPlus size={18} />
              <span>Tambah Mata Kuliah</span>
            </Button>
          )}
        </Col>
      </Row>

      <Card className="shadow border-0">
        <Card.Body className="p-0">
          <div className="p-3 border-bottom">
            <Row className="align-items-center g-3">
              <Col md={6} lg={4}>
                <h5 className="mb-0 fw-semibold">Daftar Mata Kuliah Sistem Informasi</h5>
              </Col>
            </Row>
          </div>

          <Card.Header className="bg-white py-3 border-bottom">
            <div className="d-flex  align-items-center flex-wrap gap-3 ">
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
                    placeholder="Cari nama mata kuliah..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="border-0 shadow-none py-1"
                  />
                </InputGroup>
              </div>

              <div className=" col-12 col-md-4 col-lg-3">
                <Form.Select
                  value={selectedsemester}
                  onChange={(e) => {
                    setSelectedSemester(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="shadow-none py-1"
                >
                  <option value="">Semua Semester</option>
                  {[...Array(8)].map((_, i) => (
                    <option key={i + 1} value={(i + 1).toString()}>
                      Semester {i + 1}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>
          </Card.Header>

          <div className="table-responsive " ref={printRef}>
            <div className="print-only">
              <h4 className="text-uppercase">Mata Kuliah</h4>
              <p>Tanggal Cetak: {new Date().toLocaleDateString()}</p>
            </div>
            <Table striped bordered hover className="text-center align-middle" size="sm">
              <thead >
                <tr className="bg-light">
                  <th className="px-1 py-3">No</th>
                  <th className="px-3 py-3">Nama Mata Kuliah</th>
                  <th className="px-3 py-3">SKS</th>
                  <th className="px-3 py-3">Semester</th>
                  {role === "admin" && (
                    <th className="px-3 py-3 no-print">Aksi</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {paginatedMataKuliah.length > 0 ? (
                  paginatedMataKuliah.map((mata_kuliah, index) => (
                    <tr key={mata_kuliah.id}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{mata_kuliah.name}</td>
                      <td>{mata_kuliah.sks}</td>
                      <td>{mata_kuliah.semester}</td>
                      {role === "admin" && (
                        <td className="no-print">
                          <div className="d-flex justify-content-center gap-2">
                            <Button
                              variant="outline-success"
                              size="sm"
                              className="rounded-2 px-2 py-1 d-flex align-items-center justify-content-center"
                              title="Edit"
                              onClick={() => navigate(`/admin/dashboard/matakuliah/editmatakuliah/${mata_kuliah.id}`)}
                            >
                              <FiEdit2 size={16} />
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              className="rounded-2 px-2 py-1 d-flex align-items-center justify-content-center"
                              title="Hapus"
                              onClick={() => deleteMataKuliah(mata_kuliah.id)}
                            >
                              <FiTrash2 size={16} />
                            </Button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      <div className="d-flex flex-column align-items-center justify-content-center py-4">
                        <FiFilter size={32} className="text-muted mb-2" />
                        <p className="text-muted mb-0">Tidak ada data mata_kuliah yang tersedia</p>
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
    </Container >
  );
};

export default MataKuliah;
