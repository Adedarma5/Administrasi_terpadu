import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Container,
  Card,
  Table,
  Button,
  Badge,
  Row,
  Col,
  Form,
  InputGroup,
  CardFooter,
} from "react-bootstrap";
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiFilter,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useReactToPrint } from "react-to-print";
import "../Dist/Home.css";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import Swal from "sweetalert2";

const Dosen = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [dosenList, setDosenList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const printRef = useRef();

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return <div>Loading...</div>;

  const fetchDosen = async () => {
    try {
      const response = await axios.get("http://localhost:5000/dosen");
      setDosenList(response.data);
    } catch (error) {
      console.error("Error fetching dosen data:", error);
    }
  };

  useEffect(() => {
    fetchDosen();
  }, []);

  const deleteDosen = async (id) => {
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
        await axios.delete(`http://localhost:5000/dosen/${id}`);
        fetchDosen();

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

  const filteredDosen = dosenList.filter(
    (dosen) =>
      dosen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dosen.nip.toString().includes(searchTerm)
  );

  const rank = {
    "Ketua Jurusan": 1,
    "Sekertaris Jurusan": 2,
    "Ketua Prodi": 3,
    "Wakil Ketua Prodi": 4,
    "Kepala Laboratorium": 5,
  };

  const sortedDosen = [...filteredDosen].sort(
    (a, b) =>
      (rank[a.jabatan_struktural] || 99) - (rank[b.jabatan_struktural] || 99)
  );

  const totalItems = sortedDosen.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedDosen = sortedDosen.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddDosen = useCallback(() => {
    navigate("/admin/dashboard/dosen/tambahdosen");
  }, [navigate]);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Laporan Dosen",
    onBeforeGetContent: () =>
      new Promise((resolve) => setTimeout(resolve, 100)),
  });

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Dosen");

    worksheet.addRow([
      "No",
      "NIP",
      "Nama",
      "Keahlian",
      "Jabatan Struktural",
      "Jabatan Fungsional",
      "Status",
    ]);

    filteredDosen.forEach((dosen, i) => {
      worksheet.addRow([
        i + 1,
        dosen.nip,
        dosen.name,
        dosen.keahlian,
        dosen.jabatan_struktural,
        dosen.jabatan_fungsional,
        dosen.status,
      ]);
    });

    worksheet.columns = [
      { width: 5 },
      { width: 20 },
      { width: 30 },
      { width: 30 },
      { width: 30 },
      { width: 30 },
      { width: 10 },
    ];

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "Dosen.xlsx");
  };

  return (
    <Container fluid className="p-4">
      <Row className="align-items-center p-4">
        <Col>
          <h2 className="mb-1 fw-bold text-white">DOSEN</h2>
          <p className="text-muted mb-0">Sistem Informasi</p>
        </Col>
        <Col xs="auto">
          <Button variant="success" onClick={handleAddDosen} className="shadow d-flex align-items-center gap-2 text-white">
            <FiPlus size={18} />
            <span>Tambah Dosen</span>
          </Button>
        </Col>
      </Row>

      <Card className="shadow border-0">
        <Card.Body className="p-0">
          <div className="p-3 border-bottom">
            <Row className="align-items-center g-3">
              <Col md={6} lg={4}>
                <h5 className="mb-0 fw-semibold">Daftar Dosen Sistem Informasi</h5>
              </Col>
            </Row>
          </div>

          <Card className="shadow-sm border-0 overflow-hidden ">
            <Card.Header className="bg-white py-3 border-bottom">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                {/* <Button variant="danger" size="sm" onClick={handlePrint}>
                  Cetak Laporan PDF
                </Button> */}
                <Button variant="secondary" size="sm" onClick={exportToExcel}>
                  Ekspor ke Excel
                </Button>
                <div className="ms-auto col-md-4 col-12">
                  <InputGroup size="sm" className="border rounded overflow-hidden">
                    <InputGroup.Text className="bg-white border-0">
                      <FiSearch size={16} className="text-primary" />
                    </InputGroup.Text>
                    <Form.Control
                      size="sm"
                      placeholder="Cari berdasarkan nama atau NIP..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="border-0 shadow-none py-1"
                    />
                  </InputGroup>
                </div>
              </div>
            </Card.Header>

            <Card.Body className="p-3" >
              {paginatedDosen.length > 0 ? (
                <Row xs={1} sm={1} md={2} lg={2} xl={3} className="g-3">
                  {paginatedDosen.map((dosen) => (
                    <Col key={dosen.id}>
                      <Card
                        className="h-100 shadow border-0 "
                        style={{
                          transition: "transform 0.2s ease-in-out",
                          borderRadius: "12px",
                          overflow: "hidden",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                      >
                        <div className="d-flex align-items-start gap-3 p-3">
                          <img
                            src={`http://localhost:5000/uploads/dosen/${dosen.foto_dosen}`}
                            alt="Foto Dosen"
                            style={{
                              width: "120px",
                              height: "180px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              flexShrink: 0,
                            }}
                          />

                          <div className="flex-grow-1 position-relative w-100">
                            <div className="position-absolute mb-1 top-0 end-0">
                              <Badge
                                bg={dosen.status === "Aktif" ? "success" : "warning"}
                                className="rounded-pill px-3 py-1 mt-1 me-2"
                                style={{ fontSize: "0.65rem" }}
                              >
                                {dosen.status}
                              </Badge>
                            </div>

                            <h6 className="mb-1 mt-2 fw-bold text-dark">Nama:</h6>
                            <h6 className="mb-1 text-dark">{dosen.name}</h6>
                            <small className="text-muted d-block mb-1" style={{ fontSize: "0.85rem" }}>
                              NIP/NIDN: {dosen.nip}
                            </small>
                            <div style={{ fontSize: "0.85rem" }}>
                              <div><strong>Keahlian:</strong> {dosen.keahlian}</div>
                              <div><strong>Jabatan Struktural:</strong> {dosen.jabatan_struktural}</div>
                              <div><strong>Jabatan Fungsional:</strong> {dosen.jabatan_fungsional}</div>
                            </div>
                          </div>
                        </div>

                        <div className="px-3 pb-3 d-flex justify-content-end">
                          <Button
                            variant="outline-success"
                            size="sm"
                            title="Edit"
                            onClick={() => navigate(`/admin/dashboard/dosen/editdosen/${dosen.id}`)}
                            className="me-2"
                          >
                            <FiEdit2 />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            title="Hapus"
                            onClick={() => deleteDosen(dosen.id)}
                          >
                            <FiTrash2 />
                          </Button>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <div className="text-center py-5 text-muted">
                  <FiFilter size={32} className="mb-2" />
                  <p>Tidak ada data dosen yang tersedia</p>
                </div>
              )}
            </Card.Body>
          </Card>

          <div className="p-3 border-top d-flex justify-content-between align-items-center">
            <div className="small text-muted">
              Menampilkan {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems} entri
            </div>
            <div>
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

export default Dosen;
