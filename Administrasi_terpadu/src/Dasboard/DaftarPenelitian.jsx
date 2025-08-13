import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Container, Card, Modal, Button, Row, Col
} from "react-bootstrap";
import {
  FiBookOpen,
  FiUser,
  FiDollarSign,
  FiHash,
  FiCheck,
  FiEye,
  FiSearch
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import '../Dist/admin.css'

const DaftarPenelitian = () => {
  const [penelitianList, setPenelitianList] = useState([]);
  const [dosenList, setDosenList] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [tahun, setTahun] = useState("2024");
  const [sumberDana, setSumberDana] = useState("02");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      await fetchDosen();
    };
    loadData();
  }, []);

  useEffect(() => {
    if (dosenList.length > 0) {
      fetchPenelitianFakultasTeknik();
    }
  }, [tahun, sumberDana, dosenList]);

  const fetchDosen = async () => {
    try {
      const response = await axios.get("http://localhost:5000/dosen");
      setDosenList(response.data);
    } catch (error) {
      console.error("Error fetching dosen:", error);
    }
  };

  const fetchPenelitianFakultasTeknik = async () => {
    try {
      const url = `http://localhost:5000/proxy-sipp/${tahun}/01/${sumberDana}`;
      const response = await axios.get(url);
      const dataSIPP = response.data;

      const namaDosenLokal = dosenList.map((d) =>
        d.name
          .replace(/(Dr\.?|Prof\.?|Ir\.?|S\.T\.?|M\.?[\w]+|ASEAN Eng|IPU|,|\.)/gi, "")
          .toLowerCase()
          .replace(/\s+/g, " ")
          .trim()
      );

      const filtered = dataSIPP.filter((item) => {
        const matchByNip = dosenList.some((d) => d.nip === item.usul_pegawai);

        const namaSIPP = `${item.td_nama_depan} ${item.td_nama_tengah} ${item.td_nama_belakang}`
          .toLowerCase().replace(/\s+/g, " ").replace(/(s\.t\.?|m\.kom|,|\.)/gi, "").trim();

        const matchByName = dosenList.some((d) => {
          const namaDosen = d.name
            .toLowerCase()
            .replace(/(prof\.?|dr\.?|ir\.?|s\.t\.?|m\.kom|ipu|asean eng|,|\.)/gi, "")
            .replace(/\s+/g, " ")
            .trim();

          return namaDosen.includes(namaSIPP) || namaSIPP.includes(namaDosen);
        });

        return matchByNip || matchByName;
      });

      setPenelitianList(filtered);
    } catch (error) {
      console.error("Gagal mengambil data dari proxy backend:", error);
    }
  };

  const totalItems = penelitianList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedPenelitian = penelitianList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleShowDetail = (item) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedItem(null);
  };

  return (
    <Container fluid className="p-4">
      <Row className="align-items-center p-4">
        <Col>
          <h2 className="mb-1 fw-bold text-white">DATA PENELITIAN DARI LPPM</h2>
          <p className="text-muted mb-0">Daftar Penelitian Dosen Sistem Informasi</p>
        </Col>
      </Row>

      <Card className="shadow border-0">
        <Card.Body className="p-0">
          <Card.Header className="bg-white py-2 border-bottom">
            <Row className="align-items-center justify-content-between">
              <Col md="auto">
                <div className="d-flex flex-wrap gap-3 mb-2 ">
                  <Button
                    variant="link"
                    onClick={() => navigate("/admin/dashboard/DaftarPenelitian")}
                    className="fs-5 text-decoration-none p-0"
                  >
                    Daftar Penelitian
                  </Button>
                  <Button
                    variant="link"
                    onClick={() => navigate("/admin/dashboard/Penelitian")}
                    className="fs-5 text-decoration-none p-0"
                  >
                    Penelitian Anda
                  </Button>
                </div>
              </Col>

              <Col md="auto">
                <div className="d-flex align-items-center gap-3 mb-2">
                  <select
                    className="form-select w-auto"
                    value={tahun}
                    onChange={(e) => setTahun(e.target.value)}
                  >
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                  </select>
                  <select
                    className="form-select  w-auto"
                    value={sumberDana}
                    onChange={(e) => setSumberDana(e.target.value)}
                  >
                    <option value="02">PNBP</option>
                    <option value="03">ADB</option>
                  </select>
                </div>
              </Col>
            </Row>
          </Card.Header>


          <Card.Body className="p-4">
            {paginatedPenelitian.length > 0 ? (
              <Row className="g-4">
                {paginatedPenelitian.map((item, index) => (
                  <Col md={6} lg={4} key={index}>
                    <Card className="h-100 shadow border-0 research-card small"
                      style={{
                        borderRadius: '16px',
                        transition: 'all 0.3s ease',
                        overflow: 'hidden'
                      }}>
                      <div
                        className="position-relative"
                        style={{
                          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                          padding: '1rem 1.25rem 0.5rem',
                        }}
                      >
                        <div className="d-flex align-items-center gap-3 mb-2">
                          <div
                            className="bg-white bg-opacity-20 backdrop-blur rounded-circle p-2 d-flex align-items-center justify-content-center"
                            style={{
                              width: 44,
                              height: 44,
                              backdropFilter: 'blur(10px)',
                              border: '1px solid rgba(255,255,255,0.2)'
                            }}
                          >
                            <FiBookOpen size={20} className="text-black" />
                          </div>
                          <div className="flex-grow-1">
                            <small className="text-black opacity-75 fw-bold d-block mb-1">
                              PENELITIAN
                            </small>
                          </div>
                        </div>

                        <svg
                          className="position-absolute bottom-0 start-0 w-100"
                          viewBox="0 0 400 20"
                          style={{ height: '20px' }}
                          preserveAspectRatio="none"
                        >
                          <path
                            d="M0,20 C100,0 300,0 400,20 L400,20 L0,20 Z"
                            fill="white"
                          />
                        </svg>
                      </div>

                      <Card.Body className="p-4 pt-3">
                        <div className="mb-3">
                          <h5
                            className="fw-bold text-dark mb-2 lh-sm"
                            style={{
                              fontSize: '1rem',
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}
                            title={item.usul_judul}
                          >
                            {item.usul_judul}
                          </h5>
                        </div>

                        <div className="bg-light rounded-3 p-3 mb-3">
                          <div className="d-flex align-items-center gap-2 mb-2">
                            <div
                              className="bg-primary bg-opacity-10 rounded-circle p-1 d-flex align-items-center justify-content-center"
                              style={{ width: 28, height: 28 }}
                            >
                              <FiUser size={14} className="text-primary" />
                            </div>
                            <small className="text-muted fw-medium text-uppercase" style={{ letterSpacing: '0.5px' }}>
                              Biodata Peneliti
                            </small>
                          </div>

                          <div className="ps-4">
                            <p className="mb-1 fw-semibold text-dark" style={{ fontSize: '0.95rem' }}>
                              {`${item.td_nama_depan} ${item.td_nama_tengah} ${item.td_nama_belakang}`.replace(/\s+/g, " ").trim()}
                            </p>
                            <div className="d-flex align-items-center gap-1">
                              <small className="text-muted">
                                NIDN: <span className="fw-medium">{item.usul_pegawai}</span>
                              </small>
                            </div>
                          </div>

                          <div
                            className="mx-4"
                          >
                            <small className="text-success fw-semibold">
                              Rp {parseInt(item.usul_dana_setuju).toLocaleString("id-ID")}
                            </small>
                          </div>
                        </div>


                      </Card.Body>



                      <Card.Footer
                        className="bg-white border-0 p-3 no-print"
                        style={{ borderRadius: '0 0 16px 16px' }}
                      >
                        <div className="d-flex justify-content-between">
                          <span
                            className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill"
                            style={{ fontSize: '0.75rem' }}
                          >
                            <FiCheck size={12} className="me-1" />
                            Dana Disetujui
                          </span>

                          <Button
                            variant="primary"
                            size="sm"
                            className="px-3 rounded-pill"
                            onClick={() => handleShowDetail(item)}
                            style={{
                              background: 'linear-gradient(135deg,rgb(68, 88, 176) 0%,rgb(102, 93, 187) 100%)',
                              border: 'none'
                            }}
                          >
                            <FiEye size={12} className="me-1" />
                            Detail
                          </Button>
                        </div>
                      </Card.Footer>
                      
                      <div
                        style={{
                          height: '3px',
                          background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)'
                        }}
                      ></div>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <div className="text-center py-5">
                <div
                  className="bg-light rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{ width: '80px', height: '80px' }}
                >
                  <FiSearch size={32} className="text-muted" />
                </div>
                <h5 className="text-muted mb-2">Tidak Ada Data Penelitian</h5>
                <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                  Tidak ada data penelitian yang cocok dengan dosen lokal saat ini
                </p>
              </div>
            )}
          </Card.Body>

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
                className="mx-1"
              >
                Sebelumnya
              </Button>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="mx-1"
              >
                Selanjutnya
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      {selectedItem && (
        <Modal show={showDetailModal} onHide={handleCloseDetailModal} centered>
          <Modal.Header closeButton
            className="position-relative"
            style={{
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              padding: '1rem 1.25rem 0.5rem',
            }}>
            <Modal.Title>Detail Penelitian</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="bg-light rounded-3 p-3 mb-2">

              <strong className="text-uppercase mb-1">Judul Penelitian:</strong><br />
              <p className="text-uppercase fw-semibold">{selectedItem.usul_judul}</p>
              <div className="d-flex align-items-center gap-2 mb-2">
                <div
                  className="bg-primary bg-opacity-10 rounded-circle p-1 d-flex align-items-center justify-content-center"
                  style={{ width: 28, height: 28 }}
                >
                  <FiUser size={14} className="text-primary" />
                </div>
                <small className="text-muted fw-medium text-uppercase" style={{ letterSpacing: '0.5px' }}>
                  Biodata Peneliti
                </small>
              </div>

              <div className="ps-4">
                <p className="mb-1 fw-semibold text-dark" style={{ fontSize: '0.95rem' }}>
                  {`${selectedItem.td_nama_depan} ${selectedItem.td_nama_tengah} ${selectedItem.td_nama_belakang}`.replace(/\s+/g, " ").trim()}
                </p>
                <div className="d-flex align-items-center gap-1">
                  <small className="text-muted">
                    NIDN: <span className="fw-medium">{selectedItem.usul_pegawai}</span>
                  </small>
                </div>
              </div>

              <div
                className="mx-4"
              >
                <small className="text-success fw-semibold">
                  Rp {parseInt(selectedItem.usul_dana_setuju).toLocaleString("id-ID")}
                </small>
              </div>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDetailModal}>
              Tutup
            </Button>
          </Modal.Footer>
        </Modal>
      )}

    </Container>
  );
};

export default DaftarPenelitian;
