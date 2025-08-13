import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Alert, CardHeader } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditJurnal = () => {
  const [penulis, setPenulis] = useState("");
  const [judul_jurnal, setJudulJurnal] = useState("");
  const [link_jurnal, setLinkJurnal] = useState("");
  const [tahun_terbit, setTahunTerbit] = useState("");
  const [volume, setVolume] = useState("");
  const [penerbit, setPenerbit] = useState("");
  const [msg, setMsg] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getJurnalById();
  }, []);

  const getJurnalById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/jurnal/${id}`);
      const data = response.data;

      setPenulis(data.penulis);
      setJudulJurnal(data.judul_jurnal);
      setLinkJurnal(data.link_jurnal);
      setTahunTerbit(data.tahun_terbit);
      setVolume(data.volume);
      setPenerbit(data.penerbit);
    } catch (error) {
      console.error("Gagal mengambil data jurnal:", error);
      setMsg("Terjadi kesalahan saat mengambil data jurnal.");
    }
  };

  const updateJurnal = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/jurnal/${id}`, {
        penulis,
        judul_jurnal,
        link_jurnal,
        tahun_terbit,
        volume,
        penerbit,
      });
      navigate("/admin/dashboard/jurnal");
    } catch (error) {
      console.error("Gagal memperbarui jurnal:", error);
      setMsg("Terjadi kesalahan saat memperbarui jurnal.");
    }
  };

  return (
    <Container fluid className="p-4">
      <Row className="align-items-center p-4">
        <Col>
          <h2 className="fw-bold text-white">JURNAL</h2>
          <p className="text-muted">Perbarui Data Jurnal</p>
        </Col>
      </Row>

      <Card className="shadow border-0">
        <CardHeader className="bg-white">
          <h5 className="mb-0 fw-semibold">Edit Jurnal</h5>
        </CardHeader>
        <Card.Body>
          {msg && <Alert variant="danger">{msg}</Alert>}

          <Form onSubmit={updateJurnal}>
            <Form.Group className="mb-3">
              <Form.Label>Penulis</Form.Label>
              <Form.Control
                type="text"
                value={penulis}
                onChange={(e) => setPenulis(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Judul Jurnal</Form.Label>
              <Form.Control
                type="text"
                value={judul_jurnal}
                onChange={(e) => setJudulJurnal(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Link Jurnal</Form.Label>
              <Form.Control
                type="text"
                value={link_jurnal}
                onChange={(e) => setLinkJurnal(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tahun Terbit</Form.Label>
              <Form.Control
                type="number"
                value={tahun_terbit}
                onChange={(e) => setTahunTerbit(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Volume</Form.Label>
              <Form.Control
                type="text"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Penerbit</Form.Label>
              <Form.Control
                type="text"
                value={penerbit}
                onChange={(e) => setPenerbit(e.target.value)}
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={() => navigate("/admin/dashboard/jurnal")}>
                Kembali
              </Button>
              <Button variant="primary" type="submit">
                Simpan Perubahan
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditJurnal;
