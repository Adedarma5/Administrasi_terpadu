import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Col, Modal, Row, Spinner, Table, Tabs, Tab, Form, InputGroup } from 'react-bootstrap';
import { FiEye, FiTrash2, FiSearch, } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const Alumni = () => {
  const [alumniData, setAlumniData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchNama, setSearchNama] = useState("");
  const [tahunMasukList, setTahunMasukList] = useState([]);
  const [selectedTahunMasuk, setSelectedTahunMasuk] = useState("Semua Tahun Masuk");
  const [selectedDetail, setSelectedDetail] = useState([]);
  const [identitas, setIdentitas] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const printRef = useRef();

  const categories = {
    "Informasi Pekerjaan": [
      "bekerjaAtauTidak", "berapaLamaDapatPekerjaan", "berapaRataPendapatan",
      "lokasiProvinsi", "lokasiKab", "jenisPerusahaan", "jenisPerusahaanLainnya",
      "namaPerusahaan", "posisiJabatan", "tingkatTempatKerja",
      "sumberDanaKuliah"
    ],
    "Studi Lanjut": [
      "sumberBiayaStudiLanjut", "perguruanTinggi", "programStudi",
      "tanggalMasukStudiLanjut",
    ],
    "Metode Pembelajaran": [
      "penekananMetodePerkuliahan", "penekananMetodeDemonstrasi",
      "penekananMetodePartisipasi", "penekananMetodeMagang", "penekananMetodePraktikum",
      "penekananMetodeKerjaLapangan", "penekananMetodeDiskusi"
    ],
    "Pencarian Kerja": [
      "mencariPekerjaanSebelumLulus", "mencariPekerjaanSesudahLulus", "tidakMencariPekerjaan",
      "bagaimanaAndaMencariPekerjaanTersebut", "berapaBulanUntukDapatPekerjaanSebelumLulus",
      "berapaBulanUntukDapatPekerjaanSesudahLulus", "berapaBanyakPerusahaanYangMeresponLamaran",
      "berapaBanyakPerusahaanYangSudahDiLamar", "berapaBanyakPerusahaanYangMengundangUntukLamaran", "tingkatPendidikanTepat",
    ],
    "Kesesuaian Pekerjaan": [
      "seberapaEratHubunganPekerjaanDenganBidangStudi",
      "jikaMenurutAndaPekerjaanSaatIniTidakSesuaiDenganPilihan"
    ]
  };

  const pertanyaanUrut = [
    "bekerjaAtauTidak", "berapaLamaDapatPekerjaan", "berapaRataPendapatan",
    "lokasiProvinsi", "lokasiKab", "jenisPerusahaan", "jenisPerusahaanLainnya",
    "namaPerusahaan", "posisiJabatan", "tingkatTempatKerja", "sumberBiayaStudiLanjut",
    "perguruanTinggi", "programStudi", "tanggalMasukStudiLanjut", "sumberDanaKuliah",
    "tingkatPendidikanTepat", "penekananMetodePerkuliahan", "penekananMetodeDemonstrasi",
    "penekananMetodePartisipasi", "penekananMetodeMagang", "penekananMetodePraktikum",
    "penekananMetodeKerjaLapangan", "penekananMetodeDiskusi",
    "mencariPekerjaanSebelumLulus", "mencariPekerjaanSesudahLulus", "tidakMencariPekerjaan",
    "bagaimanaAndaMencariPekerjaanTersebut", "berapaBulanUntukDapatPekerjaanSebelumLulus",
    "berapaBulanUntukDapatPekerjaanSesudahLulus", "berapaBanyakPerusahaanYangMeresponLamaran",
    "berapaBanyakPerusahaanYangSudahDiLamar", "berapaBanyakPerusahaanYangMengundangUntukLamaran",
    "seberapaEratHubunganPekerjaanDenganBidangStudi", "jikaMenurutAndaPekerjaanSaatIniTidakSesuaiDenganPilihan"
  ];

  const labelMap = {
    'nama': 'Nama Lengkap',
    'nim': 'NIM',
    'email': 'Email',
    'nomorHp': 'Nomor HP',
    'tahunMasuk': 'Tahun Masuk',
    'tahunLulus': 'Tahun Lulus',
    'kodePt': 'Kode PT',
    'nik': 'NIK',
    'npwp': 'NPWP',

    'bekerjaAtauTidak': 'Status Pekerjaan',
    'berapaLamaDapatPekerjaan': 'Waktu Tunggu Mendapat Pekerjaan',
    'berapaRataPendapatan': 'Rata-rata Pendapatan',
    'lokasiProvinsi': 'Provinsi Tempat Kerja',
    'lokasiKab': 'Kabupaten/Kota Tempat Kerja',
    'jenisPerusahaan': 'Jenis Perusahaan',
    'jenisPerusahaanLainnya': 'Jenis Perusahaan Lainnya',
    'namaPerusahaan': 'Nama Perusahaan',
    'posisiJabatan': 'Posisi/Jabatan',
    'tingkatTempatKerja': 'Tingkat Tempat Kerja',
    'sumberBiayaStudiLanjut': 'Sumber Biaya Studi Lanjut',
    'perguruanTinggi': 'Perguruan Tinggi',
    'programStudi': 'Program Studi',
    'tanggalMasukStudiLanjut': 'Tanggal Masuk Studi Lanjut',
    'sumberDanaKuliah': 'Sumber Dana Kuliah',
    'tingkatPendidikanTepat': 'Tingkat Pendidikan yang Tepat Untuk Pekerjaan Saat Ini',
    'penekananMetodePerkuliahan': 'Metode Perkuliahan',
    'penekananMetodeDemonstrasi': 'Metode Demonstrasi',
    'penekananMetodePartisipasi': 'Metode Partisipasi',
    'penekananMetodeMagang': 'Metode Magang',
    'penekananMetodePraktikum': 'Metode Praktikum',
    'penekananMetodeKerjaLapangan': 'Metode Kerja Lapangan',
    'penekananMetodeDiskusi': 'Metode Diskusi',
    'mencariPekerjaanSebelumLulus': 'Kapan Anda Mulai Mencari Pekerjaan (Sebelum Lulus)',
    'mencariPekerjaanSesudahLulus': 'Kapan Anda Mulai Mencari Pekerjaan (Sesudah Lulus)',
    'tidakMencariPekerjaan': 'Tidak Mencari Pekerjaan',
    'bagaimanaAndaMencariPekerjaanTersebut': 'Cara Mencari Pekerjaan',
    'berapaBulanUntukDapatPekerjaanSebelumLulus': 'Berapa bulan untuk Dapat Pekerjaan (Sebelum Lulus)',
    'berapaBulanUntukDapatPekerjaanSesudahLulus': 'Berapa bulan untuk Dapat Pekerjaan (Sesudah Lulus)',
    'berapaBanyakPerusahaanYangMeresponLamaran': 'Jumlah Perusahaan yang Merespon Lamaran',
    'berapaBanyakPerusahaanYangSudahDiLamar': 'Jumlah Perusahaan yang Sudah Dilamar',
    'berapaBanyakPerusahaanYangMengundangUntukLamaran': 'Jumlah Perusahaan yang Mengundang untuk Wawancara',
    'seberapaEratHubunganPekerjaanDenganBidangStudi': 'Keterkaitan Pekerjaan dengan Bidang Studi',
    'jikaMenurutAndaPekerjaanSaatIniTidakSesuaiDenganPilihan': 'Alasan Ketidaksesuaian Pekerjaan dengan Pilihan'
  };

  const identitasKunci = [
    'nama', 'nim', 'email', 'nomorHp', 'tahunMasuk', 'tahunLulus',
    'kodePt', 'nik', 'npwp'
  ];

  useEffect(() => {
    const fetchAlumni = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/alumni');
        setAlumniData(response.data);

        const tahunMasukSet = new Set();
        response.data.forEach(alumni => {
          const data = alumni.datajson || {};
          if (Array.isArray(data)) {
            data.forEach(item => {
              if (item.pertanyaan === "tahunMasuk" && item.jawaban) {
                tahunMasukSet.add(item.jawaban);
              }
            });
          } else if (typeof data === "object") {
            if (data.tahunMasuk) tahunMasukSet.add(data.tahunMasuk);
          }
        });
        setTahunMasukList(["Semua Tahun Masuk", ...Array.from(tahunMasukSet).sort()]);

      } catch (error) {
        console.error('Error fetching alumni data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, []);


  const handleShowModal = (datajson) => {
    let identitasData = {};
    let kuisionerLain = [];

    try {
      if (Array.isArray(datajson)) {
        datajson.forEach((item) => {
          if (identitasKunci.includes(item.pertanyaan)) {
            identitasData[item.pertanyaan] = item.jawaban;
          } else {
            kuisionerLain.push(item);
          }
        });
      } else if (typeof datajson === 'object' && datajson !== null) {
        Object.entries(datajson).forEach(([key, value]) => {
          if (identitasKunci.includes(key)) {
            identitasData[key] = value;
          } else {
            kuisionerLain.push({ pertanyaan: key, jawaban: value });
          }
        });
      }
    } catch (err) {
      console.error('Error parsing datajson:', err);
    }

    setIdentitas(identitasData);
    setSelectedDetail(kuisionerLain);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIdentitas({});
    setSelectedDetail([]);
  };

  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Data ini akan dihapus secara permanen!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Hapus!',
      cancelButtonText: 'Batal'
    });

    if (confirmDelete.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/alumni/${id}`);
        setAlumniData((prevData) => prevData.filter((alumni) => alumni.id !== id));
        Swal.fire('Dihapus!', 'Data alumni telah berhasil dihapus.', 'success');
      } catch (error) {
        console.error('Error deleting alumni data:', error);
        Swal.fire('Gagal!', 'Gagal menghapus data.', 'error');
      }
    }
  };

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data Alumni Lengkap");

    const orderedKeys = Object.keys(labelMap);

    const otherQuestionsSet = new Set();

    alumniData.forEach(alumni => {
      const data = alumni.datajson || {};
      if (Array.isArray(data)) {
        data.forEach(item => {
          if (!orderedKeys.includes(item.pertanyaan)) {
            otherQuestionsSet.add(item.pertanyaan);
          }
        });
      } else if (typeof data === "object") {
        Object.keys(data).forEach(key => {
          if (!orderedKeys.includes(key)) {
            otherQuestionsSet.add(key);
          }
        });
      }
    });

    const otherQuestions = Array.from(otherQuestionsSet).sort();

    const allKeys = [...orderedKeys, ...otherQuestions];

    const headers = ["No", ...allKeys.map(k => labelMap[k] || k)];
    worksheet.addRow(headers);

    alumniData.forEach((alumni, index) => {
      const data = alumni.datajson || {};
      const row = [index + 1];

      allKeys.forEach(key => {
        let value = "";

        if (Array.isArray(data)) {
          const item = data.find(i => i.pertanyaan === key);
          value = item ? item.jawaban : "";
        } else if (typeof data === "object") {
          value = data[key] || "";
        }

        if (Array.isArray(value)) value = value.join(", ");

        row.push(value);
      });

      worksheet.addRow(row);
    });

    worksheet.columns.forEach(column => {
      let maxLength = 10;
      column.eachCell({ includeEmpty: true }, cell => {
        const cellLength = cell.value ? cell.value.toString().length : 10;
        if (cellLength > maxLength) {
          maxLength = cellLength;
        }
      });
      column.width = maxLength + 2;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "Data_Alumni_Lengkap.xlsx");
  };



  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Prestasi",
    onBeforeGetContent: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 100);
      });
    },
  });

  const formatValue = (key, value) => {
    if (!value || value === '-' || value === '') return '-';

    if (key === 'berapaRataPendapatan') {
      return typeof value === 'number' ?
        `Rp ${value.toLocaleString('id-ID')}` : value;
    }

    if (key === 'bekerjaAtauTidak') {
      return value === true || value === 'true' || value === '1' || value === 'Ya' ? 'Ya' : 'Tidak';
    }

    if (Array.isArray(value)) {
      return value.join(', ');
    }

    return value;
  };

  const getCategoryForQuestion = (question) => {
    for (const [category, questions] of Object.entries(categories)) {
      if (questions.includes(question)) {
        return category;
      }
    }
    return "Lainnya";
  };

  const getDataByCategory = (category) => {
    return selectedDetail
      .filter(item => categories[category]?.includes(item.pertanyaan))
      .sort((a, b) => {
        const idxA = pertanyaanUrut.indexOf(a.pertanyaan);
        const idxB = pertanyaanUrut.indexOf(b.pertanyaan);
        return idxA - idxB;
      });
  };

  const filteredAlumni = alumniData.filter((alumni) => {
    const data = alumni.datajson || {};
    let nama = "";
    let tahunMasuk = "";

    if (Array.isArray(data)) {
      data.forEach(item => {
        if (item.pertanyaan === "nama") nama = item.jawaban.toLowerCase();
        if (item.pertanyaan === "tahunMasuk") tahunMasuk = item.jawaban;
      });
    } else if (typeof data === "object") {
      nama = data.nama ? data.nama.toLowerCase() : "";
      tahunMasuk = data.tahunMasuk || "";
    }

    const matchNama = nama.includes(searchNama.toLowerCase());
    const matchTahun = selectedTahunMasuk === "Semua Tahun Masuk" || tahunMasuk === selectedTahunMasuk;

    return matchNama && matchTahun;
  });

  const totalItems = filteredAlumni.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedAlumni = filteredAlumni.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  return (
    <div className="container mt-4">
      <Row className="align-items-center p-4">
        <Col>
          <h2 className="mb-1 fw-bold text-white text-uppercase">Tracer Study</h2>
        </Col>
      </Row>

      <Card className="shadow border-0">
        <Card.Body className="p-0">
          <div className="p-3 border-bottom">
            <Row className="align-items-center g-3">
              <Col md={6} lg={5}>
                <h5 className="mb-0 fw-semibold">Daftar Tracer Study Alumni Sistem Informasi</h5>
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
                    placeholder="Cari Nama Mahasiswa"
                    value={searchNama}
                    onChange={(e) => setSearchNama(e.target.value)}
                    className="border-0 shadow-none py-1"
                  />
                </InputGroup>
              </div>

              <div className="col-12 col-md-4 col-lg-3">
                <Form.Select

                  placeholder="Cari Nama Mahasiswa"
                  value={selectedTahunMasuk}
                  onChange={(e) => setSelectedTahunMasuk(e.target.value)}
                >
                  {tahunMasukList.map((tahun, idx) => (
                    <option key={idx} value={tahun}>{tahun}</option>
                  ))}
                </Form.Select>
              </div>

            </div>
          </Card.Header>

          {loading ? (
            <div className="d-flex justify-content-center py-4">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <div className="table-responsive" ref={printRef}>
              <div className="print-only">
                <h4 className="text-uppercase">Prestasi</h4>
                <p>Tanggal Cetak: {new Date().toLocaleDateString()}</p>
              </div>
              <Table striped bordered hover responsive className="align-middle mb-0 text-center small">
                <thead>
                  <tr>
                    <th className="py-2">No</th>
                    {identitasKunci.map((label, i) => (
                      <th className='px-5' key={i}>{labelMap[label] || label}</th>
                    ))}
                    <th className='no-print'>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedAlumni.map((alumni, index) => {
                    const data = alumni.datajson || {};
                    const identitasRow = {};

                    if (Array.isArray(data)) {
                      data.forEach((item) => {
                        if (identitasKunci.includes(item.pertanyaan)) {
                          identitasRow[item.pertanyaan] = item.jawaban;
                        }
                      });
                    } else if (typeof data === 'object') {
                      Object.entries(data).forEach(([key, value]) => {
                        if (identitasKunci.includes(key)) {
                          identitasRow[key] = value;
                        }
                      });
                    }

                    return (
                      <tr key={index}>
                        <td className="text-center">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                        {identitasKunci.map((label, i) => (
                          <td key={i}>{identitasRow[label] || '-'}</td>
                        ))}
                        <td className='no-print'>
                          <Button
                            variant="outline-warning"
                            size="sm"
                            className="mx-1 mb-1"
                            onClick={() => handleShowModal(data)}
                          >
                            <FiEye size={16} />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="mx-1 mb-1"
                            onClick={() => handleDelete(alumni.id)}
                          >
                            <FiTrash2 size={16} />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          )}

          <div className="p-3 border-top d-flex justify-content-between align-items-center">
            <div className="small text-muted">
              Menampilkan {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems} entri
            </div>
            <div className="mx-4">
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

      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered dialogClassName="modal-90w">
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>
            <span className="fs-5">Detail Kuisioner Alumni</span>
            {identitas.nama && (
              <div className="fs-6 text-primary mt-1">{identitas.nama} - {identitas.nim}</div>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          {selectedDetail.length > 0 || Object.keys(identitas).length > 0 ? (
            <Tabs defaultActiveKey="biodata" className="mb-3">
              <Tab eventKey="biodata" title="Biodata" className="p-3">
                <Row>
                  {identitasKunci.map((key, idx) => (
                    <Col md={6} key={idx} className="mb-3">
                      <div className="d-flex flex-column">
                        <span className="text-muted mb-1 small">{labelMap[key] || key}</span>
                        <span className="fw-medium">{identitas[key] || '-'}</span>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Tab>

              {Object.keys(categories).map(category => (
                <Tab
                  eventKey={category.toLowerCase().replace(/\s/g, '-')}
                  title={category}
                  key={category}
                  className="p-3"
                >
                  <Row>
                    {getDataByCategory(category).map((item, idx) => (
                      <Col md={6} key={idx} className="mb-3">
                        <div className="d-flex flex-column">
                          <span className="text-muted mb-1 small">{labelMap[item.pertanyaan] || item.pertanyaan}</span>
                          <span className="fw-medium">{formatValue(item.pertanyaan, item.jawaban)}</span>
                        </div>
                      </Col>
                    ))}
                    {getDataByCategory(category).length === 0 && (
                      <Col className="text-center py-4">
                        <span className="text-muted">Tidak ada data untuk kategori ini</span>
                      </Col>
                    )}
                  </Row>
                </Tab>
              ))}

              {selectedDetail.some(i => /^a[1-7]|^b[1-7]/.test(i.pertanyaan)) && (
                <Tab eventKey="kompetensi" title="Kompetensi" className="p-3">
                  <div className="table-responsive">
                    <Table bordered className="text-center align-middle mt-2">
                      <thead className="table-light">
                        <tr>
                          <th rowSpan="2">Kompetensi</th>
                          <th colSpan="5">A (Saat Lulus)</th>
                          <th colSpan="5">B (Dalam Pekerjaan)</th>
                        </tr>
                        <tr>
                          {[1, 2, 3, 4, 5].map(n => <th key={`a${n}`}>{n}</th>)}
                          {[1, 2, 3, 4, 5].map(n => <th key={`b${n}`}>{n}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { label: "Etika", aKey: "a1", bKey: "b1" },
                          { label: "Keahlian bidang ilmu", aKey: "a2", bKey: "b2" },
                          { label: "Bahasa Inggris", aKey: "a3", bKey: "b3" },
                          { label: "Teknologi informasi", aKey: "a4", bKey: "b4" },
                          { label: "Komunikasi", aKey: "a5", bKey: "b5" },
                          { label: "Kerja tim", aKey: "a6", bKey: "b6" },
                          { label: "Pengembangan diri", aKey: "a7", bKey: "b7" },
                        ].map(({ label, aKey, bKey }, idx) => {
                          const nilaiA = selectedDetail.find(i => i.pertanyaan === aKey)?.jawaban;
                          const nilaiB = selectedDetail.find(i => i.pertanyaan === bKey)?.jawaban;
                          return (
                            <tr key={idx}>
                              <td className="text-start">{label}</td>
                              {[1, 2, 3, 4, 5].map(n => (
                                <td key={`a${n}`} className={n == nilaiA ? 'bg-primary text-white' : ''}>
                                  {n == nilaiA ? '✓' : ''}
                                </td>
                              ))}
                              {[1, 2, 3, 4, 5].map(n => (
                                <td key={`b${n}`} className={n == nilaiB ? 'bg-success text-white' : ''}>
                                  {n == nilaiB ? '✓' : ''}
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                </Tab>
              )}
            </Tabs>
          ) : (
            <div className="text-center py-5">
              <span className="text-muted">Tidak ada data untuk ditampilkan.</span>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Tutup</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Alumni;