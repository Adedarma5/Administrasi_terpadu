import React, { useState, useEffect } from "react";
import { Container, Card, Table, Button, Badge, Row, Col, Form, InputGroup  } from "react-bootstrap";
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const MataKuliah = () => {
const Navigate = useNavigate();
  const [matakuliahList, setMataKuliahList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


const fetchMataKuliah = async () => {
    try {
      const response = await axios.get("http://localhost:5000/mata_kuliah"); 
      setMataKuliahList(response.data);
    } catch (error) {
      console.error("Error fetching mata kuliah data:", error);
    }
  };

  useEffect(() => {
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

  return (
    <Container fluid className="p-4">
      <Card className="mb-4 shadow border-0">
        <Card.Body className="p-4">
          <Row className="align-items-center">
            <Col>
              <h2 className="mb-1 fw-bold">MATA KULIAH</h2>
              <p className="text-muted mb-0">Daftar Mata Kuliah</p>
            </Col>
            <Col xs="auto">
              <Button variant="primary" className="d-flex align-items-center gap-2" onClick={() => Navigate('/admin/dashboard/MataKuliah/TambahMataKuliah')}>
                <FiPlus size={18} />
                <span>Tambah Mata Kuliah</span>
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="shadow border-0">
        <Card.Body className="p-0">
          <div className="p-3 border-bottom">
            <Row className="align-items-center g-3">
              <Col lg={4}>
                <InputGroup>
                  <InputGroup.Text className="bg-light border-end-0">
                    <FiSearch size={16} />
                  </InputGroup.Text>
                  <Form.Control placeholder="Cari bahan ajar..." className="border-start-0 bg-light" />
                </InputGroup>
              </Col>
              <Col md={6} lg={3}>
                <Form.Select className="bg-light">
                  <option value="">Semua Sks</option>
                  <option value="Aktif">2 Sks</option>
                  <option value="Tidak Aktif">3 Sks</option>
                </Form.Select>
              </Col>
            </Row>
          </div>

          <div className="table-responsive">
            <Table striped bordered hover className="align-middle mb-0 text-center">
              <thead className="bg-light">
                <tr>
                  <th className="py-3">No</th>
                  <th className="py-3">Nama Mata Kuliah</th>
                  <th className="py-3">SKS</th>
                  <th className="py-3">Semester</th>
                  <th className="py-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {matakuliahList.length > 0 ? (
                    matakuliahList
                    .filter((mata_kuliah) =>
                    mata_kuliah.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    mata_kuliah.sks.toString().includes(searchTerm)
                    )
                
                .map((mata_kuliah, index) => (
                  <tr key={mata_kuliah.id}>
                    <td className="fw-medium">{index + 1}</td>
                    <td>{mata_kuliah.name}</td>
                    <td>{mata_kuliah.sks}</td>
                    <td>{mata_kuliah.semester}</td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <Button variant="light" size="sm" title="Lihat Detail">
                          <FiEye size={16} />
                        </Button>
                        <Button 
                        variant="light" 
                        size="sm" 
                        title="Edit"
                        onClick={() => Navigate(`/admin/dashboard/matakuliah/editmatakuliah/${mata_kuliah.id}`)}
                        >
                          <FiEdit2 size={16} />
                        </Button>
                        <Button variant="light" size="sm" title="Hapus" onClick={() => deleteMataKuliah(mata_kuliah.id)} >
                          <FiTrash2 size={16} />
                        </Button>
                      </div>
                      </td>
                    </tr>
                ))
            ) : (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-3">
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
            </Table>
          </div>

          <div className="p-3 border-top d-flex justify-content-between align-items-center">
            <div className="small text-muted">Menampilkan 1-5 dari 5 entri</div>
            <div>
              <Button variant="outline-primary" size="sm" className="me-2" disabled>
                Sebelumnya
              </Button>
              <Button variant="outline-primary" size="sm" disabled>
                Selanjutnya
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MataKuliah;
