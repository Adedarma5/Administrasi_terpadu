import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Form,
  InputGroup,
  Table,
} from "react-bootstrap";
import {
  FiPlus,
  FiFilter,
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiFileText,
  FiBookOpen,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import "../Dist/Home.css";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import Swal from "sweetalert2";

const Rps = () => {
  const navigate = useNavigate();
  const [rpsList, setRpsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedsemester, setSelectedSemester] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const printRef = useRef();

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole?.toLowerCase());
    fetchRps();
  }, []);

  const fetchRps = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5000/rps");
      setRpsList(response.data);
    } catch (error) {
      setError("Gagal memuat data RPS.");
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const deleteRps = async (id) => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/rps/${id}`);
        fetchRps();

        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Data berhasil dihapus.",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error deleting:", error);
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Terjadi kesalahan saat menghapus data.",
        });
      }
    }
  };

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Laporan RPS ",
    onBeforeGetContent: () => new Promise((resolve) => setTimeout(resolve, 100)),
  });

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Laporan Bahan Ajar");
    worksheet.addRow(["No", "Mata Kuliah", "Semester", "File RPS"]);

    filteredRps.forEach((rps, i) => {
      const row = worksheet.addRow([i + 1, rps.name, rps.semester]);
      const fileUrl = `http://localhost:5000/uploads/rps/${rps.file_rps}`;
      row.getCell(4).value = { text: "Lihat File", hyperlink: fileUrl };
      row.getCell(4).font = { color: { argb: "FF0000FF" }, underline: true };
    });

    worksheet.columns = [
      { width: 5 },
      { width: 30 },
      { width: 30 },
      { width: 55 },
    ];

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "RPS.xlsx");
  };

  const filteredRps = rpsList
    .filter((rps) => {
      const nameMatch = rps.name.toLowerCase().includes(searchTerm.toLowerCase());
      const semesterMatch =
        selectedsemester === "" ||
        rps.semester.toLowerCase() === `semester ${selectedsemester}`.toLowerCase();
      return nameMatch && semesterMatch;
    })
    .sort((a, b) => {
      const semesterA = parseInt(a.semester.replace(/\D/g, "")) || 0;
      const semesterB = parseInt(b.semester.replace(/\D/g, "")) || 0;
      return semesterA - semesterB;
    });

  const totalItems = filteredRps.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedRps = filteredRps.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container fluid className="p-4">
      <Row className="align-items-center p-4">
        <Col>
          <h2 className="mb-1 fw-bold text-white text-uppercase">Rencana Pembelajaran Semester</h2>
          <p className="text-muted mb-0">Sistem Informasi</p>
        </Col>
        <Col xs="auto">
          {role === "admin" && (
            <Button
              variant="success"
              className="shadow d-flex align-items-center gap-2"
              onClick={() => navigate("/admin/dashboard/Rps/TambahRps")}
            >
              <FiPlus size={18} />
              <span>Tambah RPS</span>
            </Button>
          )}
        </Col>
      </Row>

      <Card className="shadow border-0">
        <Card.Body className="p-0">
          <div className="p-3 border-bottom">
            <Row className="align-items-center g-3">
              <Col md={6} lg={4}>
                <h5 className="mb-0 fw-semibold">Daftar RPS Sistem Informasi</h5>
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

              <div className="col-12 col-md-4 col-lg-3">
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

          <div className="d-none d-print-block" ref={printRef}>
            <h5 className="text-center">Laporan RPS</h5>
            <p>Tanggal Cetak: {new Date().toLocaleDateString()}</p>
            <Table striped bordered size="sm" className="mt-3">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Mata Kuliah</th>
                  <th>Semester</th>
                  <th>File RPS</th>
                </tr>
              </thead>
              <tbody>
                {filteredRps.map((rps, index) => (
                  <tr key={rps.id}>
                    <td>{index + 1}</td>
                    <td>{rps.name}</td>
                    <td>{rps.semester}</td>
                    <td>
                      <a href={`http://localhost:5000/uploads/rps/${rps.file_rps}`} target="_blank" rel="noreferrer">
                        Lihat PDF
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <div className="p-4 d-print-none">
            <Row xs={1} sm={1} md={2} lg={3} xl={3} className="g-3">
              {paginatedRps.length > 0 ? (
                paginatedRps.map((rps) => (
                  <Col key={rps.id}>
                    <Card className="h-100 shadow border-0 small">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-1">
                          <h6 className="fw-bold text-uppercase">{rps.name}</h6>
                          <FiBookOpen size={20} className="text-primary" />
                        </div>
                        <p className="mb-1">
                          <strong>Semester:</strong> {rps.semester}
                        </p>
                        <p className="mb-0">
                          <a
                            href={`http://localhost:5000/uploads/rps/${rps.file_rps}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none"
                          >
                            <FiFileText className="me-1" /> Lihat PDF
                          </a>
                        </p>
                      </Card.Body>
                      {role === "admin" && (
                        <Card.Footer className="bg-light d-flex justify-content-end gap-2">
                          <Button
                            variant="outline-success"
                            size="sm"
                            title="Edit"
                            onClick={() => navigate(`/admin/dashboard/rps/editrps/${rps.id}`)}
                          >
                            <FiEdit2 />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            title="Hapus"
                            onClick={() => deleteRps(rps.id)}
                          >
                            <FiTrash2 />
                          </Button>
                        </Card.Footer>
                      )}
                    </Card>
                  </Col>
                ))
              ) : (
                <Col>
                  <div className="text-center text-muted ">
                    <FiFilter size={32} className="mb-2" />
                    <p>Tidak ada data RPS yang tersedia</p>
                  </div>
                </Col>
              )}
            </Row>
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
    </Container>
  );
};

export default Rps;