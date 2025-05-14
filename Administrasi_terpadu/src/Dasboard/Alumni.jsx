import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Col, Modal, Row, Spinner, Table } from 'react-bootstrap';
import { FiEye, FiTrash2 } from 'react-icons/fi';
import Swal from 'sweetalert2';

const Alumni = () => {
  const [alumniData, setAlumniData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState([]);
  const [identitas, setIdentitas] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const pertanyaanUrut = [
    "bekerjaAtauTidak",
    "berapaLamaDapatPekerjaan",
    "berapaRataPendapatan",
    "lokasiProvinsi",
    "lokasiKab",
    "jenisPerusahaan",
    "jenisPerusahaanLainnya",
    "namaPerusahaan",
    "posisiJabatan",
    "tingkatTempatKerja",
    "sumberBiayaStudiLanjut",
    "perguruanTinggi",
    "programStudi",
    "tanggalMasukStudiLanjut",
    "sumberDanaKuliah",
    "tingkatPendidikanTepat",
    "penekananMetodePerkuliahan",
    "penekananMetodeDemonstrasi",
    "penekananMetodePartisipasi",
    "penekananMetodeMagang",
    "penekananMetodePraktikum",
    "penekananMetodeKerjaLapangan",
    "penekananMetodeDiskusi",
    "mencariPekerjaanSebelumLulus",
    "mencariPekerjaanSesudahLulus",
    "tidakMencariPekerjaan",
    "bagaimanaAndaMencariPekerjaanTersebut",
    "berapaBulanUntukDapatPekerjaanSebelumLulus",
    "berapaBulanUntukDapatPekerjaanSesudahLulus",
    "berapaBanyakPerusahaanYangMeresponLamaran",
    "berapaBanyakPerusahaanYangSudahDiLamar",
    "berapaBanyakPerusahaanYangMengundangUntukLamaran",
    "seberapaEratHubunganPekerjaanDenganBidangStudi",
    "jikaMenurutAndaPekerjaanSaatIniTidakSesuaiDenganPilihan"
  ];

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
        Swal.fire(
          'Dihapus!',
          'Data alumni telah berhasil dihapus.',
          'success'
        );
      } catch (error) {
        console.error('Error deleting alumni data:', error);
        Swal.fire(
          'Gagal!',
          'Gagal menghapus data.',
          'error'
        );
      }
    }
  };

  const filteredAlumni = alumniData; 

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

          {loading ? (
            <div className="d-flex justify-content-center py-4">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <Table striped bordered hover responsive className="align-middle mb-0 text-center">
              <thead>
                <tr>
                  {identitasKunci.map((label, i) => (
                    <th key={i}>{label}</th>
                  ))}
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginatedAlumni.map((alumni, index) => {
                  let data = alumni.datajson;
                  if (typeof data !== 'object' || data === null) data = {};

                  const identitasRow = {};
                  if (Array.isArray(data)) {
                    data.forEach((item) => {
                      if (identitasKunci.includes(item.pertanyaan)) {
                        identitasRow[item.pertanyaan] = item.jawaban;
                      }
                    });
                  } else {
                    Object.entries(data).forEach(([key, value]) => {
                      if (identitasKunci.includes(key)) {
                        identitasRow[key] = value;
                      }
                    });
                  }

                  return (
                    <tr key={index}>
                      {identitasKunci.map((label, i) => (
                        <td key={i}>{identitasRow[label] || '-'}</td>
                      ))}
                      <td>
                        <Button
                          variant="outline-warning"
                          size="sm"
                          className="mx-1 mb-1  "
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
          )}
          <div className="p-3 border-top d-flex justify-content-between align-items-center">
            <div className="small text-muted">
              Menampilkan {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems} entri
            </div>
            <div className="mx-4 ">
              <Button variant="outline-primary" size="sm" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="mx-4 mb-2">
                Sebelumnya
              </Button>
              <Button variant="outline-primary" size="sm" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className="mx-4 mb-2">
                Selanjutnya
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detail Kuisioner Alumni</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {(identitas && Object.keys(identitas).length > 0) || selectedDetail.length > 0 ? (
            <>
              <ul className="list-group list-group-flush">
                {identitasKunci?.map((key, idx) => (
                  <li key={idx} className="list-group-item">
                    <strong className="text-secondary text-capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}:
                    </strong>
                    <br />
                    {identitas[key] || '-'}
                  </li>
                ))}

                {pertanyaanUrut?.map((key, idx) => {
                  const item = selectedDetail.find(item => item.pertanyaan === key);
                  if (!item) return null;

                  const isFile = typeof item.jawaban === 'string' &&
                    (item.jawaban.includes('.pdf') || item.jawaban.includes('.jpg') || item.jawaban.includes('.png'));
                  if (isFile) return null;
                  const displayJawaban = Array.isArray(item.jawaban)
                    ? item.jawaban.length > 0 ? item.jawaban.join(', ') : '-'
                    : (item.jawaban || '-');

                  return (
                    <li key={idx} className="list-group-item">
                      <strong className="text-secondary text-capitalize">
                        {item.pertanyaan.replace(/([A-Z])/g, ' $1')}:
                      </strong>
                      <br />
                      {displayJawaban}
                    </li>
                  );
                })}
              </ul>

              {selectedDetail.some(item => item.pertanyaan?.startsWith('a') || item.pertanyaan?.startsWith('b')) && (
                <>
                  <h6 className="mt-4 fw-bold">Skala Penilaian Kompetensi Alumni</h6>
                  <div className="table-responsive">
                    <Table bordered className="text-center align-middle mt-2">
                      <thead className="table-light">
                        <tr>
                          <th rowSpan="2" className="text-center py-4">Pada saat lulus, pada tingkat mana kompetensi di bawah ini anda kuasai?</th>
                          <th colSpan="5">A (Dikuasai Saat Lulus)</th>
                          <th colSpan="5">B (Dibutuhkan Dalam Pekerjaan Saat Ini)</th>
                        </tr>
                        <tr>
                          {[1, 2, 3, 4, 5].map(num => <th key={`headA${num}`}>{num}</th>)}
                          {[1, 2, 3, 4, 5].map(num => <th key={`headB${num}`}>{num}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { label: "Etika", aKey: "a1", bKey: "b1" },
                          { label: "Keahlian bidang ilmu", aKey: "a2", bKey: "b2" },
                          { label: "Bahasa Inggris", aKey: "a3", bKey: "b3" },
                          { label: "Penggunaan teknologi informasi", aKey: "a4", bKey: "b4" },
                          { label: "Kemampuan berkomunikasi", aKey: "a5", bKey: "b5" },
                          { label: "Kerjasama tim", aKey: "a6", bKey: "b6" },
                          { label: "Pengembangan diri", aKey: "a7", bKey: "b7" },
                        ].map((item, idx) => {
                          const nilaiA = selectedDetail.find(el => el.pertanyaan === item.aKey)?.jawaban;
                          const nilaiB = selectedDetail.find(el => el.pertanyaan === item.bKey)?.jawaban;

                          return (
                            <tr key={idx}>
                              <td className="text-start">{item.label}</td>
                              {[1, 2, 3, 4, 5].map(num => (
                                <td key={`a-${idx}-${num}`}>
                                  {String(num) === String(nilaiA) ? '✓' : ''}
                                </td>
                              ))}
                              {[1, 2, 3, 4, 5].map(num => (
                                <td key={`b-${idx}-${num}`}>
                                  {String(num) === String(nilaiB) ? '✓' : ''}
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                </>
              )}
            </>
          ) : (
            <p className="text-center text-muted">Tidak ada data untuk ditampilkan.</p>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Alumni;
