import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, Form, Spinner, Row, Col, Modal } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { FiEdit, FiTrash } from "react-icons/fi";

const TambahBahanAjar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [bahanAjarList, setBahanAjarList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({ id: "", judul_materi: "", file: null });
  const [formBahanAjar, setFormBahanAjar] = useState([
    { pertemuan: "", judul_materi: "", file: null }
  ]);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");



  useEffect(() => {
    fetchBahanAjar();
  }, [id]);


  useEffect(() => {
    fetchPembelajaran();
  }, []);

  const fetchPembelajaran = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pembelajaran_mata_kuliah/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItem(res.data);
    } catch (err) {
      console.error("Gagal memuat pembelajaran:", err);
    }
  };

  const handleChangeForm = (index, field, value) => {
    const newForm = [...formBahanAjar];
    newForm[index][field] = value;
    setFormBahanAjar(newForm);
  };

  const handleAddForm = () => {
    setFormBahanAjar([
      ...formBahanAjar,
      { pertemuan: "", judul_materi: "", file: null }
    ]);
  };

  const fetchBahanAjar = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/bahan_ajar/by-user-and-pembelajaran?userId=${userId}&pembelajaran_id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBahanAjarList(res.data);

    } catch (err) {
      console.error("Gagal memuat bahan ajar:", err);
    }
  };

  const handleOpenEditModal = (data) => {
    setEditData({
      id: data.id,
      judul_materi: data.judul_materi,
      file: null
    });
    setShowModal(true);
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("judul_materi", editData.judul_materi);
      if (editData.file) {
        formData.append("file_pendukung", editData.file);
      }

      await axios.patch(`http://localhost:5000/bahan_ajar/${editData.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      setShowModal(false);
      fetchBahanAjar();
      Swal.fire("Sukses", "Bahan ajar berhasil diperbarui", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Gagal mengedit data", "error");
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Yakin hapus?",
      text: "Data tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/bahan_ajar/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          fetchBahanAjar();
          Swal.fire("Terhapus!", "Data telah dihapus.", "success");
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Gagal menghapus data", "error");
        }
      }
    });
  };



  const handleSubmit = async () => {
    setLoading(true);
    try {
      const pertemuanSet = new Set();
      for (const entry of formBahanAjar) {
        if (pertemuanSet.has(entry.pertemuan)) {
          Swal.fire("Gagal", `Pertemuan ${entry.pertemuan} sudah diinput dua kali.`, "warning");
          return;
        }
        pertemuanSet.add(entry.pertemuan);
      }

      for (const entry of formBahanAjar) {
        if (entry.pertemuan && (entry.judul_materi || entry.file)) {
          const formData = new FormData();
          formData.append("judul_materi", entry.judul_materi);
          formData.append("pertemuan", entry.pertemuan);
          formData.append("userId", userId);
          formData.append("pembelajaran_id", id);
          if (entry.file) {
            formData.append("file_pendukung", entry.file);
          }

          await axios.post("http://localhost:5000/bahan_ajar", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });
        }
      }

      Swal.fire("Berhasil", "Data bahan ajar disimpan", "success").then(() => {
        navigate(-1);
      });
    } catch (err) {
      Swal.fire("Gagal", "Terjadi kesalahan", "error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="p-4">
      <Row className="align-items-center p-4">
        <Col>
          <h2 className="mb-1 fw-bold text-white">BAHAN AJAR</h2>
          <p className="text-muted mb-0">Tambah Bahan Ajar (Manual per Pertemuan)</p>
        </Col>
      </Row>

      <Card className="shadow">
        <Card.Header><h5>Form Bahan Ajar</h5></Card.Header>
        <Card.Body className="p-4">
          {item ? (
            <>
              <p><strong>Dosen:</strong> {item.nama_dosen}</p>
              <p><strong>Mata Kuliah:</strong> {item.mata_kuliah}</p>
              <p><strong>Semester:</strong> {item.semester}</p>
              <hr />

              {formBahanAjar.map((entry, i) => (
                <Form.Group key={i} className="mb-4">
                  <Row className="align-items-center">
                    <Col md={2}>
                      <Form.Label>Pertemuan</Form.Label>
                      <Form.Select
                        value={entry.pertemuan}
                        onChange={(e) => handleChangeForm(i, "pertemuan", e.target.value)}
                        
                      >
                        <option value="">Pilih</option>
                        {[...Array(16)].map((_, idx) => (
                          <option key={idx + 1} value={idx + 1}>
                            Pertemuan {idx + 1}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col md={4}>
                      <Form.Label>Judul Materi</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Judul Materi"
                        value={entry.judul_materi}
                        onChange={(e) => handleChangeForm(i, "judul_materi", e.target.value)}
                        required
                      />
                    </Col>
                    <Col md={4}>
                      <Form.Label>File (PDF)</Form.Label>
                      <Form.Control
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleChangeForm(i, "file", e.target.files[0])}
                        required
                      />
                    </Col>
                  </Row>
                </Form.Group>
              ))}

              <Button variant="outline-primary" onClick={handleAddForm}>
                + Tambah Form Pertemuan
              </Button>
            </>
          ) : (
            <Spinner animation="border" />
          )}
        </Card.Body>
        {bahanAjarList.length > 0 && (
          <div className="mt-4 px-4">
            <h5 className="fw-bold mb-3">Daftar Bahan Ajar</h5>
            <div className="table-responsive">
              <table className="table table-bordered align-middle">
                <thead className="table-light text-center">
                  <tr>
                    <th style={{ width: "5%" }}>No</th>
                    <th style={{ width: "15%" }}>Pertemuan</th>
                    <th>Judul Materi</th>
                    <th style={{ width: "20%" }}>File</th>
                    <th style={{ width: "15%" }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {bahanAjarList.length > 0 ? (
                    bahanAjarList.map((item, index) => (
                      <tr key={item.id}>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">Pertemuan {item.pertemuan}</td>
                        <td>{item.judul_materi}</td>
                        <td className="text-center">
                          {item.file_pendukung ? (
                            <a
                              href={`http://localhost:5000/uploads/bahan_ajar/${item.file_pendukung}`}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-sm btn-outline-primary"
                            >
                              Lihat File
                            </a>
                          ) : (
                            <span className="text-muted fst-italic">Tidak ada</span>
                          )}
                        </td>
                        <td className="text-center">
                          <Button
                            variant="success"
                            size="sm"
                            className="me-2"
                            onClick={() => handleOpenEditModal(item)}
                          >
                            <FiEdit />
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
                          >
                            <FiTrash />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">
                        Tidak ada data bahan ajar
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        )}

        <Card.Footer className="text-end p-3">
          <Button variant="secondary" className="me-2" onClick={() => navigate(-1)}>Kembali</Button>
          <Button variant="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? <Spinner size="sm" animation="border" /> : "Simpan"}
          </Button>
        </Card.Footer>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Bahan Ajar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Judul Materi</Form.Label>
            <Form.Control
              type="text"
              value={editData.judul_materi}
              onChange={(e) =>
                setEditData({ ...editData, judul_materi: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ganti File (Opsional)</Form.Label>
            <Form.Control
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setEditData({ ...editData, file: e.target.files[0] })
              }
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Simpan Perubahan
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
};

export default TambahBahanAjar;
