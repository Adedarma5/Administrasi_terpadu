import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Alert,
  InputGroup,
  CardHeader
} from 'react-bootstrap';
import Swal from 'sweetalert2';

const TambahAlumni = () => {
  const [form, setForm] = useState({
    nama: '',
    nim: '',
    email: '',
    nomorHp: '',
    kodePt: '',
    nik: '',
    tahunMasuk: '',
    tahunLulus: '',
    npwp: '',
    bekerjaAtauTidak: '',
    berapaLamaDapatPekerjaan: '',
    berapaRataPendapatan: '',
    lokasiProvinsi: '',
    lokasiKab: '',
    jenisPerusahaan: '',
    jenisPerusahaanLainnya: '',
    namaPerusahaan: '',
    posisiJabatan: '',
    tingkatTempatKerja: '',
    sumberBiayaStudiLanjut: '',
    perguruanTinggi: '',
    programStudi: '',
    tanggalMasukStudiLanjut: '',
    sumberDanaKuliah: '',
    tingkatPendidikanTepat: '',
    a1: '', b1: '',
    a2: '', b2: '',
    a3: '', b3: '',
    a4: '', b4: '',
    a5: '', b5: '',
    a6: '', b6: '',
    a7: '', b7: '',
    penekananMetodePerkuliahan: '', penekananMetodeDemonstrasi: '',
    penekananMetodePartisipasi: '', penekananMetodeMagang: '',
    penekananMetodePraktikum: '', penekananMetodeKerjaLapangan: '',
    penekananMetodeDiskusi: '', mencariPekerjaanSebelumLulus: '',
    mencariPekerjaanSesudahLulus: '', tidakMencariPekerjaan: '',
    bagaimanaAndaMencariPekerjaanTersebut: [], berapaBulanUntukDapatPekerjaanSebelumLulus: '',
    berapaBulanUntukDapatPekerjaanSesudahLulus: '', berapaBanyakPerusahaanYangMeresponLamaran: '',
    berapaBanyakPerusahaanYangSudahDiLamar: '', berapaBanyakPerusahaanYangMengundangUntukLamaran: '',
    seberapaEratHubunganPekerjaanDenganBidangStudi: '', jikaMenurutAndaPekerjaanSaatIniTidakSesuaiDenganPilihan: [],
  });

  const [dataList, setDataList] = useState([]);

  const [selectedDetail, setSelectedDetail] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? value : '') : value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;

    setForm(prev => {
      const prevValues = Array.isArray(prev[name]) ? prev[name] : [];

      if (checked) {
        return {
          ...prev,
          [name]: [...prevValues, value]
        };
      } else {
        return {
          ...prev,
          [name]: prevValues.filter(v => v !== value)
        };
      }
    });
  };




  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/alumni', form);

      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Data alumni berhasil disimpan.',
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        window.location.href = '/akademik/dashboard';
      });

      fetchData();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Gagal menyimpan data: ' + (err.response?.data?.message || err.message),
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const kompetensiList = [
    { label: 'Etika', aKey: 'a1', bKey: 'b1' },
    { label: 'Keahlian bidang ilmu', aKey: 'a2', bKey: 'b2' },
    { label: 'Bahasa Inggris', aKey: 'a3', bKey: 'b3' },
    { label: 'Penggunaan teknologi informasi', aKey: 'a4', bKey: 'b4' },
    { label: 'Kemampuan berkomunikasi', aKey: 'a5', bKey: 'b5' },
    { label: 'Kerjasama tim', aKey: 'a6', bKey: 'b6' },
    { label: 'Pengembangan diri', aKey: 'a7', bKey: 'b7' },
  ];



  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/alumni');
      setDataList(res.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <Container className="py-4">
      {showAlert && (
        <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
          {alertMessage}
        </Alert>
      )}

      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white">
          <h3 className="mb-0">Formulir Kuesioner Alumni</h3>
        </Card.Header>

        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <div className="section-divider mb-4">
              <h5 className="text-primary border-bottom pb-2">Identitas Alumni</h5>
            </div>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formNama">
                  <Form.Label>Nama Lengkap <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formNim">
                  <Form.Label>NIM <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="nim"
                    value={form.nim}
                    onChange={handleChange}
                    placeholder="Masukkan NIM"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                  <InputGroup>
                    <InputGroup.Text><i className="bi bi-envelope"></i></InputGroup.Text>
                    <Form.Control
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formNomorHp">
                  <Form.Label>Nomor HP <span className="text-danger">*</span></Form.Label>
                  <InputGroup>
                    <InputGroup.Text><i className="bi bi-phone"></i></InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="nomorHp"
                      value={form.nomorHp}
                      onChange={handleChange}
                      placeholder="08xxxxxxxxxx"
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formKodePt">
                  <Form.Label>Kode PT</Form.Label>
                  <Form.Control
                    type="text"
                    name="kodePt"
                    value={form.kodePt}
                    onChange={handleChange}
                    placeholder="Masukkan kode PT"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formNik">
                  <Form.Label>NIK</Form.Label>
                  <Form.Control
                    type="text"
                    name="nik"
                    value={form.nik}
                    onChange={handleChange}
                    placeholder="Masukkan NIK"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="formTahunMasuk">
                  <Form.Label>Tahun Masuk <span className="text-danger">*</span></Form.Label>
                  <Form.Select
                    name="tahunMasuk"
                    value={form.tahunMasuk}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Pilih Tahun</option>
                    {years.map(year => (
                      <option key={`masuk-${year}`} value={year}>{year}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formTahunLulus">
                  <Form.Label>Tahun Lulus <span className="text-danger">*</span></Form.Label>
                  <Form.Select
                    name="tahunLulus"
                    value={form.tahunLulus}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Pilih Tahun</option>
                    {years.map(year => (
                      <option key={`lulus-${year}`} value={year}>{year}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formNpwp">
                  <Form.Label>NPWP</Form.Label>
                  <Form.Control
                    type="text"
                    name="npwp"
                    value={form.npwp}
                    onChange={handleChange}
                    placeholder="Masukkan NPWP (opsional)"
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="section-divider mt-4">
              <h5 className="text-primary ">Kuesioner Alumni</h5>
              <p className="text-muted border-bottom pb-2">Kuesioner Wajib</p>
            </div>

            <Form.Group className="mb-4">
              <Row className="align-items-center">
                <Col md={7}>
                  <Form.Label className="mb-0">
                    Apakah anda bekerja saat ini (termasuk kerja sambilan dan wirausaha)?
                  </Form.Label>
                </Col>
                <Col md={5}>
                  <div className="ps-3">
                    {[
                      { id: "bt1", value: "Ya", label: "Ya" },
                      { id: "bt2", value: "Tidak", label: "Tidak" },
                    ].map(option => (
                      <Form.Check
                        key={option.id}
                        type="radio"
                        id={option.id}
                        label={option.label}
                        name="bekerjaAtauTidak"
                        value={option.value}
                        checked={form.bekerjaAtauTidak === option.value}
                        onChange={handleChange}
                        className="mb-2"
                      />
                    ))}
                  </div>
                </Col>
              </Row>
            </Form.Group>

            <Row className="mb-4">
              <Col md={7}>
                <Form.Label>Apakah anda telah mendapatkan pekerjaan kurang dari 6 bulan / <br /> termasuk bekerja sebelum lulus / setelah Internsip</Form.Label>
              </Col>
              <Col md={5}>
                <Form.Group controlId="formberapaLamaDapatPekerjaan">
                  <Form.Control
                    type="text"
                    name="berapaLamaDapatPekerjaan"
                    value={form.berapaLamaDapatPekerjaan}
                    onChange={handleChange}
                    placeholder="Jawab Ya atau Tidak, berikan penjelasan setelah berapa bulan bekerja"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={7}>
                <Form.Label>Berapa rata-rata pendapatan anda perbulan ? (take home pay)</Form.Label>
              </Col>
              <Col md={5}>
                <Form.Group controlId="formberapaRataPendapatan">
                  <Form.Control
                    type="text"
                    name="berapaRataPendapatan"
                    value={form.berapaRataPendapatan}
                    onChange={handleChange}
                    placeholder="Rp.000"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={7} >
                <p className=''>Dimana lokasi tempat anda bekerja?</p>
              </Col>
              <Col md={5}>
                <Form.Group controlId="formlokasiProvinsi">
                  <Form.Label>Provinsi</Form.Label>
                  <Form.Control
                    type="text"
                    name="lokasiProvinsi"
                    value={form.lokasiProvinsi}
                    onChange={handleChange}
                    placeholder="Masukkan provinsi"
                  />
                </Form.Group>
                <Form.Group className='mt-2' controlId="formlokasiKab">
                  <Form.Label>kota/kab</Form.Label>
                  <Form.Control
                    type="text"
                    name="lokasiKab"
                    value={form.lokasiKab}
                    onChange={handleChange}
                    placeholder="Masukkan kota"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4">
              <Row>
                <Col md={7}>
                  <Form.Label>Jenis Perusahaan/Instansi/Institusi Tempat Anda Bekerja Sekarang</Form.Label>
                </Col>
                <Col md={5}>
                  <div className="ps-3">
                    {[
                      { id: "jp1", value: "Instansi pemerintah", label: "Instansi pemerintah (termasuk BUMN)" },
                      { id: "jp2", value: "Organisasi non-profit", label: "Organisasi non-profit/Lembaga Swadaya Masyarakat" },
                      { id: "jp3", value: "Perusahaan swasta", label: "Perusahaan swasta" },
                      { id: "jp4", value: "Wiraswasta", label: "Wiraswasta/perusahaan sendiri" },
                      { id: "jp5", value: "Lainnya", label: "Lainnya" }
                    ].map(option => (
                      <Form.Check
                        key={option.id}
                        type="radio"
                        id={option.id}
                        label={option.label}
                        name="jenisPerusahaan"
                        value={option.value}
                        checked={form.jenisPerusahaan === option.value}
                        onChange={handleChange}
                        className="mb-2"
                      />
                    ))}

                    {form.jenisPerusahaan === "Lainnya" && (
                      <Form.Control
                        type="text"
                        placeholder="Sebutkan jenis perusahaan"
                        name="jenisPerusahaanLainnya"
                        value={form.jenisPerusahaanLainnya}
                        onChange={handleChange}
                        className="mt-2 ms-4"
                        style={{ maxWidth: "50%" }}
                      />
                    )}
                  </div>
                </Col>
              </Row>
            </Form.Group>

            <Row className="mb-3">
              <Col md={7}>
                <Form.Label>Apa nama perusahaan/kantor tempat anda bekerja?</Form.Label>
              </Col>
              <Col md={5}>
                <Form.Group controlId="formNamaPerusahaan">
                  <Form.Control
                    type="text"
                    name="namaPerusahaan"
                    value={form.namaPerusahaan}
                    onChange={handleChange}
                    placeholder="Masukkan nama perusahaan/kantor"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={7}>
                <Form.Label>Posisi/Jabatan Saat Ini</Form.Label>
              </Col>
              <Col md={5}>
                <Form.Group controlId="formPosisiJabatan">
                  <Form.Control
                    type="text"
                    name="posisiJabatan"
                    value={form.posisiJabatan}
                    onChange={handleChange}
                    placeholder="Masukkan posisi/jabatan"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3 mt-3">
              <Col md={7}>
                <Form.Label>Tingkat Tempat Kerja</Form.Label>
              </Col>
              <Col>
                <Form.Group controlId="formTingkatTempatKerja">
                  <Form.Select
                    name="tingkatTempatKerja"
                    value={form.tingkatTempatKerja}
                    onChange={handleChange}
                  >
                    <option value="">Pilih Tingkatan</option>
                    <option value="Lokal">Lokal/Wilayah/Wiraswasta tidak berbadan hukum</option>
                    <option value="Nasional">Nasional/Wiraswasta berbadan hukum</option>
                    <option value="Multinasional">Multinasional/Internasional</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <div className="section-divider my-4">
              <h5 className="text-primary border-bottom pb-2">Informasi Studi Lanjut</h5>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Sumber Biaya Studi Lanjut</Form.Label>
              <Form.Select
                name="sumberBiayaStudiLanjut"
                value={form.sumberBiayaStudiLanjut}
                onChange={handleChange}
              >
                <option value="">Pilih Sumber Biaya</option>
                <option value="Biaya Sendiri">Biaya Sendiri</option>
                <option value="Beasiswa">Beasiswa</option>
                <option value="Bantuan Tempat Kerja">Bantuan Tempat Kerja</option>
                <option value="Lainnya">Lainnya</option>
              </Form.Select>
            </Form.Group>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formPerguruanTinggi">
                  <Form.Label>Perguruan Tinggi Studi Lanjut</Form.Label>
                  <Form.Control
                    type="text"
                    name="perguruanTinggi"
                    value={form.perguruanTinggi}
                    onChange={handleChange}
                    placeholder="Masukkan nama perguruan tinggi"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formProgramStudi">
                  <Form.Label>Program Studi</Form.Label>
                  <Form.Control
                    type="text"
                    name="programStudi"
                    value={form.programStudi}
                    onChange={handleChange}
                    placeholder="Masukkan program studi"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="formTanggalMasukStudiLanjut">
                  <Form.Label>Tanggal Masuk Studi Lanjut</Form.Label>
                  <Form.Control
                    type="date"
                    name="tanggalMasukStudiLanjut"
                    value={form.tanggalMasukStudiLanjut}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4">
              <Row>
                <Col md={7}>
                  <Form.Label>Sebutkan sumberdana dalam pembiayaan kuliah?</Form.Label>
                </Col>
                <Col md={5}>
                  <div className="ps-3">
                    {[
                      { id: "sd1", value: "Biaya Sendiri", label: "Biaya Sendiri / Keluarga" },
                      { id: "sd2", value: "Beasiswa ADIK", label: "Beasiswa ADIK" },
                      { id: "sd3", value: "Beasiswa BIDIKMISI", label: "Beasiswa BIDIKMISI" },
                      { id: "sd4", value: "Beasiswa PPA", label: "Beasiswa PPA" },
                      { id: "sd5", value: "Beasiswa AFIRMASI", label: "Beasiswa AFIRMASI" },
                      { id: "sd6", value: "Beasiswa Perusahaan/Swasta", label: "Beasiswa Perusahaan/Swasta" }
                    ].map(option => (
                      <Form.Check
                        key={option.id}
                        type="radio"
                        id={option.id}
                        label={option.label}
                        name="sumberDanaKuliah"
                        value={option.value}
                        checked={form.sumberDanaKuliah === option.value}
                        onChange={handleChange}
                        className="mb-2"
                      />
                    ))}
                  </div>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-4">
              <Row>
                <Col md={7}>
                  <Form.Label>Tingkat pendidikan apa yang paling tepat/sesuai untuk pekerjaan anda saat ini?</Form.Label>
                </Col>
                <Col>
                  <div className="ps-3">
                    {[
                      { id: "tp1", value: "Setingkat Lebih Tinggi", label: "Setingkat Lebih Tinggi" },
                      { id: "tp2", value: "Tingkat yang Sama", label: "Tingkat yang Sama" },
                      { id: "tp3", value: "Setingkat Lebih Rendah", label: "Setingkat Lebih Rendah" },
                      { id: "tp4", value: "Tidak Perlu Pendidikan Tinggi", label: "Tidak Perlu Pendidikan Tinggi" }
                    ].map(option => (
                      <Form.Check
                        key={option.id}
                        type="radio"
                        id={option.id}
                        label={option.label}
                        name="tingkatPendidikanTepat"
                        value={option.value}
                        checked={form.tingkatPendidikanTepat === option.value}
                        onChange={handleChange}
                        className="mb-2"
                      />
                    ))}
                  </div>
                </Col>
              </Row>
            </Form.Group>

            <div className="table-responsive">
              <table className="table table-bordered text-center align-middle">
                <thead className="table-light">
                  <tr>
                    <th rowSpan="2" className="text-center py-4">Kompetensi</th>
                    <th colSpan="5">A (Saat Lulus)</th>
                    <th colSpan="5">B (Saat Ini)</th>
                  </tr>
                  <tr>
                    {[1, 2, 3, 4, 5].map(num => <th key={`aHead${num}`}>{num}</th>)}
                    {[1, 2, 3, 4, 5].map(num => <th key={`bHead${num}`}>{num}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {kompetensiList.map((item, idx) => (
                    <tr key={idx}>
                      <td className="text-start">{item.label}</td>

                      {/* A: Saat Lulus */}
                      {[1, 2, 3, 4, 5].map(num => (
                        <td key={`a-${item.aKey}-${num}`}>
                          <input
                            type="radio"
                            name={item.aKey}
                            value={num}
                            checked={form[item.aKey] === String(num)}
                            onChange={(e) => setForm({ ...form, [item.aKey]: e.target.value })}
                            required
                          />

                        </td>
                      ))}

                      {/* B: Saat Ini */}
                      {[1, 2, 3, 4, 5].map(num => (
                        <td key={`b-${item.bKey}-${num}`}>
                          <input
                            type="radio"
                            name={item.bKey}
                            value={num}
                            checked={form[item.bKey] === String(num)}
                            onChange={(e) => setForm({ ...form, [item.bKey]: e.target.value })}
                            required
                          />

                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Card.Header className='fw-semibold mb-0 mt-4 '>
              <p>Kuisioner Optional</p>
            </Card.Header>


            <Row className="mb-4 mt-4">
              <Col md={7} >
                <p className='fw-bold'>Menurut anda seberapa besar penekanan pada metode pembelajaran <br /> di bawah ini dilaksanakan di program studi anda?</p>
              </Col>

              <Col md={5}>
                <Form.Group >
                  <Form.Label className='fw-semibold'>Perkuliahan</Form.Label>
                  <Col>
                    <div className=" mb-4">
                      {[
                        { id: "p1", value: "Sangat Besar", label: "Sangat Besar" },
                        { id: "p2", value: "Cukup Besar", label: "Cukup Besar" },
                        { id: "p3", value: "Kurang", label: "Kurang" },
                        { id: "p4", value: "Tidak Sama Sekali", label: "Tidak Sama Sekali" }
                      ].map(option => (
                        <Form.Check
                          key={option.id}
                          type="radio"
                          id={option.id}
                          label={option.label}
                          name="penekananMetodePerkuliahan"
                          value={option.value}
                          checked={form.penekananMetodePerkuliahan === option.value}
                          onChange={handleChange}
                          className="mb-2"
                        />
                      ))}
                    </div>
                  </Col>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className='fw-semibold'>Demonstrasi</Form.Label>
                  <Col>
                    <div >
                      {[
                        { id: "pd1", value: "Sangat Besar", label: "Sangat Besar" },
                        { id: "pd2", value: "Cukup Besar", label: "Cukup Besar" },
                        { id: "pd3", value: "Kurang", label: "Kurang" },
                        { id: "pd4", value: "Tidak Sama Sekali", label: "Tidak Sama Sekali" }
                      ].map(option => (
                        <Form.Check
                          key={option.id}
                          type="radio"
                          id={option.id}
                          label={option.label}
                          name="penekananMetodeDemonstrasi"
                          value={option.value}
                          checked={form.penekananMetodeDemonstrasi === option.value}
                          onChange={handleChange}
                          className="mb-2"
                        />
                      ))}
                    </div>
                  </Col>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className='fw-semibold'>Partisipasi dalam proyek riset</Form.Label>
                  <Col>
                    <div >
                      {[
                        { id: "pp1", value: "Sangat Besar", label: "Sangat Besar" },
                        { id: "pp2", value: "Cukup Besar", label: "Cukup Besar" },
                        { id: "pp3", value: "Kurang", label: "Kurang" },
                        { id: "pp4", value: "Tidak Sama Sekali", label: "Tidak Sama Sekali" }
                      ].map(option => (
                        <Form.Check
                          key={option.id}
                          type="radio"
                          id={option.id}
                          label={option.label}
                          name="penekananMetodePartisipasi"
                          value={option.value}
                          checked={form.penekananMetodePartisipasi === option.value}
                          onChange={handleChange}
                          className="mb-2"
                        />
                      ))}
                    </div>
                  </Col>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className='fw-semibold'>Magang</Form.Label>
                  <Col>
                    <div >
                      {[
                        { id: "pm1", value: "Sangat Besar", label: "Sangat Besar" },
                        { id: "pm2", value: "Cukup Besar", label: "Cukup Besar" },
                        { id: "pm3", value: "Kurang", label: "Kurang" },
                        { id: "pm4", value: "Tidak Sama Sekali", label: "Tidak Sama Sekali" }
                      ].map(option => (
                        <Form.Check
                          key={option.id}
                          type="radio"
                          id={option.id}
                          label={option.label}
                          name="penekananMetodeMagang"
                          value={option.value}
                          checked={form.penekananMetodeMagang === option.value}
                          onChange={handleChange}
                          className="mb-2"
                        />
                      ))}
                    </div>
                  </Col>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className='fw-semibold'>Praktikum</Form.Label>
                  <Col>
                    <div >
                      {[
                        { id: "ppra1", value: "Sangat Besar", label: "Sangat Besar" },
                        { id: "ppra2", value: "Cukup Besar", label: "Cukup Besar" },
                        { id: "ppra3", value: "Kurang", label: "Kurang" },
                        { id: "ppra4", value: "Tidak Sama Sekali", label: "Tidak Sama Sekali" }
                      ].map(option => (
                        <Form.Check
                          key={option.id}
                          type="radio"
                          id={option.id}
                          label={option.label}
                          name="penekananMetodePraktikum"
                          value={option.value}
                          checked={form.penekananMetodePraktikum === option.value}
                          onChange={handleChange}
                          className="mb-2"
                        />
                      ))}
                    </div>
                  </Col>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className='fw-semibold'>Kerja Lapangan</Form.Label>
                  <Col>
                    <div >
                      {[
                        { id: "pkl1", value: "Sangat Besar", label: "Sangat Besar" },
                        { id: "pkl2", value: "Cukup Besar", label: "Cukup Besar" },
                        { id: "pkl3", value: "Kurang", label: "Kurang" },
                        { id: "pkl4", value: "Tidak Sama Sekali", label: "Tidak Sama Sekali" }
                      ].map(option => (
                        <Form.Check
                          key={option.id}
                          type="radio"
                          id={option.id}
                          label={option.label}
                          name="penekananMetodeKerjaLapangan"
                          value={option.value}
                          checked={form.penekananMetodeKerjaLapangan === option.value}
                          onChange={handleChange}
                          className="mb-2"
                        />
                      ))}
                    </div>
                  </Col>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className='fw-semibold'>Diskusi</Form.Label>
                  <Col>
                    <div >
                      {[
                        { id: "pdi1", value: "Sangat Besar", label: "Sangat Besar" },
                        { id: "pdi2", value: "Cukup Besar", label: "Cukup Besar" },
                        { id: "pdi3", value: "Kurang", label: "Kurang" },
                        { id: "pdi4", value: "Tidak Sama Sekali", label: "Tidak Sama Sekali" }
                      ].map(option => (
                        <Form.Check
                          key={option.id}
                          type="radio"
                          id={option.id}
                          label={option.label}
                          name="penekananMetodeDiskusi"
                          value={option.value}
                          checked={form.penekananMetodeDiskusi === option.value}
                          onChange={handleChange}
                          className="mb-2"
                        />
                      ))}
                    </div>
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={7} >
                <p className=''>Kapan anda mulai mencari pekerjaan? <br /> Mohon pekerjaan sambilan tidak dimasukkan</p>
              </Col>
              <Col md={5}>
                <Form.Group controlId="formmencariPekerjaanSebelumLulus">
                  <Form.Label>Kira kira berapa bulan sebelum lulus</Form.Label>
                  <Form.Control
                    type="text"
                    name="mencariPekerjaanSebelumLulus"
                    value={form.mencariPekerjaanSebelumLulus}
                    onChange={handleChange}
                    placeholder="berapa bulan"
                  />
                </Form.Group>
                <Form.Group className='mt-2' controlId="formmencariPekerjaanSesudahLulus">
                  <Form.Label>Kira kira berapa bulan setelah lulus </Form.Label>
                  <Form.Control
                    type="text"
                    name="mencariPekerjaanSesudahLulus"
                    value={form.mencariPekerjaanSesudahLulus}
                    onChange={handleChange}
                    placeholder="berapa bulan"
                  />
                  <Col>
                    <div className='mt-3'>
                      {[
                        { id: "tmp1", value: "Saya Tidak Mecari Kerja", label: "Saya Tidak Mecari Kerja" },
                      ].map(option => (
                        <Form.Check
                          key={option.id}
                          type="radio"
                          id={option.id}
                          label={option.label}
                          name="tidakMencariPekerjaan"
                          value={option.value}
                          checked={form.tidakMencariPekerjaan === option.value}
                          onChange={handleChange}
                          className="mb-2"
                        />
                      ))}
                    </div>
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4">
              <Row>
                <Col md={7}>
                  <Form.Label>
                    Bagaimana anda mencari pekerjaan tersebut? Jawaban bisa lebih dari satu
                  </Form.Label>
                </Col>
                <Col>
                  <div>
                    {[
                      { id: "bamp1", value: "Melalui iklan di koran/majalah, brosu", label: "Melalui iklan di koran/majalah, brosu" },
                      { id: "bamp2", value: "Melamar ke perusahaan tanpa mengetahui lowongan yang ada", label: "Melamar ke perusahaan tanpa mengetahui lowongan yang ada" },
                      { id: "bamp3", value: "Pergi ke bursa/pameran kerja", label: "Pergi ke bursa/pameran kerja" },
                      { id: "bamp4", value: "Tidak Perlu Pendidikan Tinggi", label: "Tidak Perlu Pendidikan Tinggi" },
                      { id: "bamp5", value: "Dihubungi oleh perusahaan", label: "Dihubungi oleh perusahaan" },
                      { id: "bamp6", value: "Menghubungi Kemenakertrans", label: "Menghubungi Kemenakertrans" },
                      { id: "bamp7", value: "Menghubungi agen tenaga kerja komersial/swasta", label: "Menghubungi agen tenaga kerja komersial/swasta" },
                      { id: "bamp8", value: "Memeroleh informasi dari pusat/kantor pengembangan karir fakultas/universitas", label: "Memeroleh informasi dari pusat/kantor pengembangan karir fakultas/universitas" },
                      { id: "bamp9", value: "Menghubungi kantor kemahasiswaan/hubungan alumni", label: "Menghubungi kantor kemahasiswaan/hubungan alumni" },
                      { id: "bamp10", value: "Membangun jejaring (network) sejak masih kuliah", label: "Membangun jejaring (network) sejak masih kuliah" },
                      { id: "bamp11", value: "Melalui relasi (misalnya dosen, orang tua, saudara, teman, dll.)", label: "Melalui relasi (misalnya dosen, orang tua, saudara, teman, dll.)" },
                      { id: "bamp12", value: "Membangun bisnis sendiri", label: "Membangun bisnis sendiri" },
                      { id: "bamp13", value: "Melalui penempatan kerja atau magang", label: "Melalui penempatan kerja atau magang" },
                      { id: "bamp14", value: "Bekerja di tempat yang sama dengan tempat kerja semasa kuliah", label: "Bekerja di tempat yang sama dengan tempat kerja semasa kuliah" },
                    ].map(option => (
                      <Form.Check
                        key={option.id}
                        type="checkbox"
                        id={option.id}
                        label={option.label}
                        value={option.value}
                        name="bagaimanaAndaMencariPekerjaanTersebut"
                        checked={form.bagaimanaAndaMencariPekerjaanTersebut?.includes(option.value)}
                        onChange={handleCheckboxChange}
                        className="mb-2"
                      />
                    ))}
                  </div>
                </Col>
              </Row>
            </Form.Group>


            <Row className="mb-4">
              <Col md={7} >
                <p className=''>Berapa bulan waktu yang dihabiskan (sebelum dan sesudah kelulusan) <br /> untuk memeroleh pekerjaan pertama?</p>
              </Col>
              <Col md={5}>
                <Form.Group controlId="formberapaBulanUntukDapatPekerjaanSebelumLulus">
                  <Form.Label>Kira kira berapa bulan sebelum lulus</Form.Label>
                  <Form.Control
                    type="text"
                    name="berapaBulanUntukDapatPekerjaanSebelumLulus"
                    value={form.berapaBulanUntukDapatPekerjaanSebelumLulus}
                    onChange={handleChange}
                    placeholder="Sebelum lulus"
                  />
                </Form.Group>
                <Form.Group className='mt-2' controlId="formberapaBulanUntukDapatPekerjaanSesudahLulus">
                  <Form.Label>Kira kira berapa bulan setelah lulus </Form.Label>
                  <Form.Control
                    type="text"
                    name="berapaBulanUntukDapatPekerjaanSesudahLulus"
                    value={form.berapaBulanUntukDapatPekerjaanSesudahLulus}
                    onChange={handleChange}
                    placeholder="Setelah lulus"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={7}>
                <Form.Label>Berapa perusahaan/instansi/institusi yang sudah anda lamar (lewat surat atau e-mail) <br /> sebelum anda memeroleh pekerjaan pertama?</Form.Label>
              </Col>
              <Col md={5}>
                <Form.Group controlId="formberapaBanyakPerusahaanYangSudahDiLamar">
                  <Form.Control
                    type="text"
                    name="berapaBanyakPerusahaanYangSudahDiLamar"
                    value={form.berapaBanyakPerusahaanYangSudahDiLamar}
                    onChange={handleChange}
                  />
                  <p>perusahaan/instansi/institusi</p>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={7}>
                <Form.Label>Berapa banyak perusahaan/instansi/institusi yang merespons lamaran anda?</Form.Label>
              </Col>
              <Col md={5}>
                <Form.Group controlId="formberapaBanyakPerusahaanYangMeresponLamaran">
                  <Form.Control
                    type="text"
                    name="berapaBanyakPerusahaanYangMeresponLamaran"
                    value={form.berapaBanyakPerusahaanYangMeresponLamaran}
                    onChange={handleChange}
                  />
                  <p>perusahaan/instansi/institusi</p>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={7}>
                <Form.Label>Berapa banyak perusahaan/instansi/institusi yang mengundang anda untuk wawancara?</Form.Label>
              </Col>
              <Col md={5}>
                <Form.Group controlId="formberapaBanyakPerusahaanYangMengundangUntukLamaran">
                  <Form.Control
                    type="text"
                    name="berapaBanyakPerusahaanYangMengundangUntukLamaran"
                    value={form.berapaBanyakPerusahaanYangMengundangUntukLamaran}
                    onChange={handleChange}
                  />
                  <p>perusahaan/instansi/institusi</p>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4">
              <Row>
                <Col md={7}>
                  <Form.Label>
                    Seberapa erat hubungan antara bidang studi dengan pekerjaan anda?
                  </Form.Label>
                </Col>
                <Col>
                  <div>
                    {[
                      { id: "pmt1", value: "Sangat erat", label: "Sangat erat" },
                      { id: "pmt2", value: "Erat", label: "Erat" },
                      { id: "pmt3", value: "Cukup Erat", label: "Cukup Erat" },
                      { id: "pmt4", value: "Kurang Erat", label: "Kurang Erat" },
                    ].map(option => (
                      <Form.Check
                        key={option.id}
                        type="radio"
                        id={option.id}
                        label={option.label}
                        value={option.value}
                        name="seberapaEratHubunganPekerjaanDenganBidangStudi"
                        checked={form.seberapaEratHubunganPekerjaanDenganBidangStudi?.includes(option.value)}
                        onChange={handleChange}
                        className="mb-2"
                      />
                    ))}
                  </div>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-4">
              <Row>
                <Col md={7}>
                  <Form.Label>
                    Jika menurut anda pekerjaan anda saat ini tidak sesuai dengan pendidikan anda, <br /> mengapa anda mengambilnya? Jawaban bisa lebih dari satu
                  </Form.Label>
                </Col>
                <Col>
                  <div>
                    {[
                      { id: "tdp1", value: "Pertanyaan tidak sesuai; pekerjaan saya sekarang sudah sesuai dengan pendidikan saya", label: "Pertanyaan tidak sesuai; pekerjaan saya sekarang sudah sesuai dengan pendidikan saya" },
                      { id: "tdp2", value: "Saya belum mendapatkan pekerjaan yang lebih sesuai", label: "Saya belum mendapatkan pekerjaan yang lebih sesuai" },
                      { id: "tdp3", value: "Di pekerjaan ini saya memeroleh prospek karir yang baik.", label: "Di pekerjaan ini saya memeroleh prospek karir yang baik." },
                      { id: "tdp4", value: "Saya lebih suka bekerja di area pekerjaan yang tidak ada hubungannya dengan pendidikan saya", label: "Saya lebih suka bekerja di area pekerjaan yang tidak ada hubungannya dengan pendidikan saya" },
                      { id: "tdp5", value: "Saya dipromosikan ke posisi yang kurang berhubungan dengan pendidikan saya dibanding posisi sebelumnya.", label: "Saya dipromosikan ke posisi yang kurang berhubungan dengan pendidikan saya dibanding posisi sebelumnya." },
                      { id: "tdp6", value: "Saya dapat memeroleh pendapatan yang lebih tinggi di pekerjaan ini", label: "Saya dapat memeroleh pendapatan yang lebih tinggi di pekerjaan ini" },
                      { id: "tdp7", value: "Pekerjaan saya saat ini lebih aman/terjamin/secure", label: "Menghubungi agen tenaga kerja komersial/swasta" },
                      { id: "tdp8", value: "Pekerjaan saya saat ini lebih menarik", label: "Pekerjaan saya saat ini lebih menarik" },
                      { id: "tdp9", value: "Pekerjaan saya saat ini lebih memungkinkan saya mengambil pekerjaan tambahan/jadwal yang fleksibel", label: "Pekerjaan saya saat ini lebih memungkinkan saya mengambil pekerjaan tambahan/jadwal yang fleksibel" },
                      { id: "tdp10", value: "Pekerjaan saya saat ini lokasinya lebih dekat dari rumah saya", label: "Pekerjaan saya saat ini lokasinya lebih dekat dari rumah saya" },
                      { id: "tdp11", value: "Pada awal meniti karir ini, saya harus menerima pekerjaan yang tidak berhubungan dengan pendidikan saya.", label: "Pada awal meniti karir ini, saya harus menerima pekerjaan yang tidak berhubungan dengan pendidikan saya." },
                    ].map(option => (
                      <Form.Check
                        key={option.id}
                        type="checkbox"
                        id={option.id}
                        label={option.label}
                        value={option.value}
                        name="jikaMenurutAndaPekerjaanSaatIniTidakSesuaiDenganPilihan"
                        checked={form.jikaMenurutAndaPekerjaanSaatIniTidakSesuaiDenganPilihan?.includes(option.value)}
                        onChange={handleCheckboxChange}
                        className="mb-2"
                      />
                    ))}
                  </div>
                </Col>
              </Row>
            </Form.Group>




            <div className="ms-auto col-md-3 col-lg-2">
              <Button
                variant="primary"
                type="submit"
                disabled={loading}
                className="py-2 px-4"
              >
                {loading ? 'Menyimpan...' : 'Simpan Data'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TambahAlumni;