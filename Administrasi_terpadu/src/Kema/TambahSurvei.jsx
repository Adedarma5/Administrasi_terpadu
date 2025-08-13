import React, { useState } from 'react';
import axios from 'axios';
import {
  Form,
  Button,
  Container,
  Card,
  Row,
  Col,
  Alert
} from 'react-bootstrap';
import Swal from 'sweetalert2';

const TambahSurvei = () => {
  const [form, setForm] = useState({
    namaPerusahaanPengguna: '', alamatPerusahaan: '', namaPengisi: '', jabatanPengisi: '', emailPengisi: '', teleponPengisi: '', namaAlumni: '',
    jabatanAlumni: '', waktuBekerjaDiPerusahaan: '', tahunLulus: '',
    penilaian: {},
    kesesuaianBidangStudi: '', waktuAdaptasi: '', saranKompetensiTambahan: '',
  });

  const [loading, setLoading] = useState(false);

  const aspekPenilaian = [
    { label: 'Sikap/Etika', key: 'etikaKerja' },
    { label: 'Keahlian Pada Bidang Ilmu (Kompetensi Utama)', key: 'keahlian' },
    { label: 'Kemampuan Berbahasa Asing', key: 'bahasaasing' },
    { label: 'Pengunaan Teknologi Informasi', key: 'teknologiinformasi' },
    { label: 'Komunikasi', key: 'komunikasi' },
    { label: 'Penguasaan Teknologi', key: 'teknologi' },
    { label: 'Kerja Sama', key: 'kerjasama' },
    { label: 'Pengembangan Diri', key: 'pengembangandiri' },
  ];

  const identitasPengguna = [
    { key: 'namaPerusahaanPengguna', label: 'Nama Perusahaan', type: 'text', placeholder: 'Masukkan Nama Perusahaan ' },
    { key: 'alamatPerusahaan', label: 'Alamat Perusahaan', type: 'textarea', placeholder: 'Masukkan Alamat Perusahaan ' },
    { key: 'namaPengisi', label: 'Nama Pengisi', type: 'text', placeholder: 'Masukkan Nama ' },
    { key: 'jabatanPengisi', label: 'Jabatan Pengisi', type: 'text', placeholder: 'Masukkan Jabatan ' },
    { key: 'emailPengisi', label: 'Email Pengisi', type: 'email', placeholder: 'Masukkan Email ' },
    { key: 'teleponPengisi', label: 'Telepon Pengisi', type: 'number', placeholder: 'Masukkan No Telpon ' }
  ];

  const identitasAlumni = [
    { key: 'namaAlumni', label: 'Nama Alumni', type: 'text', placeholder: 'Masukkan Nama' },
    { key: 'jabatanAlumni', label: 'Jabatan Alumni', type: 'text', placeholder: 'Masukkan Jabatan' },
    { key: 'waktuBekerjaDiPerusahaan', label: 'Berapa lama alumni tersebut telah bekerja di tempat Anda?', type: 'text', placeholder: 'Masukkan Berapa Lama Waktu Bekerja, Contoh: 6 bulan' },
    { key: 'tahunLulus', label: 'Tahun Lulus Dari Universitas', type: 'text', placeholder: 'Masukkan Tahun Lulus ' },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('A_') || name.includes('B_')) {
      setForm(prev => ({
        ...prev,
        penilaian: {
          ...prev.penilaian,
          [name]: value
        }
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (checked ? value : '') : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/survei', form);
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Data survei berhasil disimpan.',
        showConfirmButton: false,
        timer: 2000
      });
      setTimeout(() => {
        window.location.href = '/akademik/dashboard';
      }, 2000);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Gagal menyimpan data: ' + (err.response?.data?.message || err.message)
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <Container>
      <div className="p-3">
        <h1 className="fw-bold text-white text-uppercase mb-0"> Survei Pengguna Alumni </h1>
        <p className="text-muted mt-0">Evaluasi kinerja dan kontribusi alumni di dunia kerja</p>
      </div>

      <Form onSubmit={handleSubmit}>
        <Card className="shadow mb-4 ">
          <Card.Header className="bg-light border-bottom">
            <h5 className="mb-0 text-uppercase">Identitas Pengguna</h5>
          </Card.Header>
          <Card.Body>
            <Row>
              {identitasPengguna.map((field) => (
                <Col md={6} key={field.key} className="mb-3">
                  <Form.Group>
                    <Form.Label>{field.label}</Form.Label>
                    {field.type === 'textarea' ? (
                      <Form.Control
                        as="textarea"
                        placeholder={field.placeholder}
                        rows={3}
                        name={field.key}
                        value={form[field.key]}
                        onChange={handleChange}
                      />
                    ) : (
                      <Form.Control
                        placeholder={field.placeholder}
                        type={field.type}
                        name={field.key}
                        value={form[field.key]}
                        onChange={handleChange}
                      />
                    )}
                  </Form.Group>
                </Col>
              ))}
            </Row>
          </Card.Body>
          <Card.Header className="bg-light border-bottom">
            <h5 className="mb-0 text-uppercase">Identitas Alumni</h5>
          </Card.Header>

          <Card.Body>
            <Row>
              {identitasAlumni.map((field) => (
                <Col md={6} key={field.key} className="mb-3">
                  <Form.Group>
                    <Form.Label>{field.label}</Form.Label>
                    <Form.Control
                      placeholder={field.placeholder}
                      type={field.type}
                      name={field.key}
                      value={form[field.key]}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              ))}
            </Row>
          </Card.Body>

          <Card.Header className="bg-light border-bottom">
            <h5 className="mb-0 text-uppercase">Penilaian Terhadap Alumni</h5>
          </Card.Header>
          <Card.Body>
            <div className="table-responsive">
              <table className="table table-bordered text-center align-middle">
                <thead className="table-light">
                  <tr>
                    <th rowSpan="2" className='py-4' >Aspek</th>
                    <th colSpan="5">Penilaian (1 = Sangat Kurang, 5 = Sangat Baik)</th>
                  </tr>
                  <tr>
                    {[1, 2, 3, 4, 5].map(val => <th key={val}>{val}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {aspekPenilaian.map((item, idx) => (
                    <tr key={idx}>
                      <td className="text-start">{item.label}</td>
                      {[1, 2, 3, 4, 5].map(num => (
                        <td key={`${item.key}-${num}`}>
                          <input
                            type="radio"
                            name={item.key}
                            value={num}
                            checked={form[item.key] === String(num)}
                            onChange={handleChange}
                            required
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card.Body>

          <Card.Header className="bg-light border-bottom">
            <h5 className="mb-0 text-uppercase">Kesesuaian dan Saran</h5>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Kesesuaian Bidang Studi dengan Pekerjaan</Form.Label>
                  <Form.Select
                    name="kesesuaianBidangStudi"
                    value={form.kesesuaianBidangStudi}
                    onChange={handleChange}
                  >
                    <option value="">-- Pilih --</option>
                    <option value="Sangat Sesuai">Sangat Sesuai</option>
                    <option value="Sesuai">Sesuai</option>
                    <option value="Kurang Sesuai">Kurang Sesuai</option>
                    <option value="Tidak Sesuai">Tidak Sesuai</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Waktu Adaptasi</Form.Label>
                  <Form.Control
                    name="waktuAdaptasi"
                    placeholder='Waktu Adaptasi Di Lingkungan Pekerjaan'
                    type="text"
                    value={form.waktuAdaptasi}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} className="mb-3">
                <Form.Group>
                  <Form.Label>Saran Kompetensi Tambahan</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="saranKompetensiTambahan"
                    value={form.saranKompetensiTambahan}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>

          <div className=" ms-auto col-md-3 col-lg-2 mb-3">
            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              className="py-2 px-4">
              {loading ? 'Menyimpan...' : 'Simpan Data '}
            </Button>
          </div>
        </Card>
      </Form>
    </Container>
  );
};

export default TambahSurvei;
