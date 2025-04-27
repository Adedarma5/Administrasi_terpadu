import React, { useEffect, useState } from "react";
import { Container, Card, Table, Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Msib = () => {
  const navigate = useNavigate();
  const [msibData, setMsibData] = useState([]);

  useEffect(() => {
    fetchMsibData();
  }, []);

  const fetchMsibData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/msib");
      setMsibData(response.data);
    } catch (error) {
      console.error("Gagal mengambil data MSIB:", error);
    }
  };

  const handleDownload = (filename, field) => {
    if (!filename) return;
    window.open(`http://localhost:5000/uploads/msib/${filename}`, "_blank");
  };

  return (
    <Container fluid className="p-4">
          <Row className="align-items-center p-4">
            <Col>
              <h2 className="mb-1 fw-bold text-white">MSIB</h2>
              <p className="text-muted mb-0">Daftar Kegiatan MSIB Mahasiswa Sistem Informasi</p>
            </Col>
            {/* <Col xs="auto">
              <Button variant="primary" className="d-flex align-items-center gap-2" onClick={() => navigate("/admin/dashboard/msib/tambahmsib")}>
                <FiPlus size={18} />
                <span>Tambah</span>
              </Button>
            </Col> */}
          </Row>

      <Card className="shadow border-0">
        <Card.Body className="p-0">
          <div className="p-3 border-bottom">
            <Row className="align-items-center g-3">
              <Col md={6} lg={4}>
                <InputGroup>
                  <InputGroup.Text className="bg-light border-end-0">
                    <FiSearch size={16} />
                  </InputGroup.Text>
                  <Form.Control placeholder="Cari berdasarkan nama atau NIM..." className="border-start-0 bg-light" />
                </InputGroup>
              </Col>
            </Row>
          </div>

          <div className="table-responsive">
            <Table striped bordered hover className="align-middle mb-0 text-center">
              <thead className="bg-light">
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Nim</th>
                  <th>Program</th>
                  <th>Judul</th>
                  <th>Mitra</th>
                  <th>Tanggal Mulai</th>
                  <th>Tanggal Selesai</th>
                  <th>Lembar Pengesahan</th>
                  <th>Laporan</th>
                  <th>Projek</th>
                  <th>Sertifikat</th>
                  <th>Konversi Nilai</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {msibData.length > 0 ? (
                  msibData.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.nama}</td>
                      <td>{item.nim}</td>
                      <td>{item.program}</td>
                      <td>{item.judul}</td>
                      <td>{item.mitra}</td>
                      <td>{item.tanggal_mulai?.slice(0, 10)}</td>
                      <td>{item.tanggal_selesai?.slice(0, 10)}</td>
                      <td>
                        {item.lembar_pengesahan && (
                          <Button
                            size="sm"
                            variant="link"
                            onClick={() => handleDownload(item.lembar_pengesahan)}
                          >
                            Lihat
                          </Button>
                        )}
                      </td>
                      <td>
                        {item.laporan && (
                          <Button size="sm" variant="link" onClick={() => handleDownload(item.laporan)}>
                            Lihat
                          </Button>
                        )}
                      </td>
                      <td>
                        {item.projek && (
                          <Button size="sm" variant="link" onClick={() => handleDownload(item.projek)}>
                            Lihat
                          </Button>
                        )}
                      </td>
                      <td>
                        {item.sertifikat && (
                          <Button size="sm" variant="link" onClick={() => handleDownload(item.sertifikat)}>
                            Lihat
                          </Button>
                        )}
                      </td>
                      <td>
                        {item.konversi_nilai && (
                          <Button size="sm" variant="link" onClick={() => handleDownload(item.konversi_nilai)}>
                            Lihat
                          </Button>
                        )}
                      </td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <Button
                            variant="outline-success"
                            size="sm"
                            className="rounded-2 px-2 py-1 d-flex align-items-center justify-content-center"
                            title="Edit"
                            onClick={() => navigate(`/admin/dashboard/msib/editmsib/${msib.id}`)}
                          >
                            <FiEdit2 size={16} />
                          </Button>
                          <Button
                            variant="outline-warning"
                            size="sm"
                            className="rounded-2 px-2 py-1 d-flex align-items-center justify-content-center"
                            title="Edit"
                            onClick={() => navigate(`/admin/dashboard/msib/lihatmsib/${msib.id}`)}
                          >
                            <FiEye size={16} />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="rounded-2 px-2 py-1 d-flex align-items-center justify-content-center"
                            title="Hapus"
                            onClick={() => deleteMsib(msib.id)}
                          >
                            <FiTrash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="14" className="text-center text-muted py-3">
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          <div className="p-3 border-top d-flex justify-content-between align-items-center">
            <div className="small text-muted">Menampilkan {msibData.length} entri</div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Msib;
