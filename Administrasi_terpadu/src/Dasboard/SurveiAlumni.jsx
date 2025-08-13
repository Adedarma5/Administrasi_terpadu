import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Button, Card, Col, Modal, Row, Spinner, Table, Tabs, Tab, Form, InputGroup } from 'react-bootstrap';
import { FiEye, FiTrash2, FiSearch } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { useReactToPrint } from 'react-to-print';
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const SurveiAlumni = () => {
  const [surveiData, setSurveiData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchNama, setSearchNama] = useState("");
  const [tahunLulussList, setTahunLulussList] = useState([]);
  const [selectedTahunLulus, setSelectedTahunLulus] = useState("Semua Tahun Lulus");
  const [selectedDetail, setSelectedDetail] = useState([]);
  const [identitas, setIdentitas] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const printRef = useRef();

  const categories = {
    "Informasi Pekerjaan": [
      "namaAlumni",
      "jabatanAlumni", "waktuBekerjaDiPerusahaan", "tahunLulus"
    ],
    "Kesesuaian dan Saran": [
      "kesesuaianBidangStudi", "waktuAdaptasi", "saranKompetensiTambahan"
    ],
  };

  const labelMap = {
    namaPerusahaanPengguna: 'Nama Perusahaan',
    alamatPerusahaan: 'Alamat Perusahaan',
    namaPengisi: 'Nama Pengisi',
    jabatanPengisi: 'Jabatan Pengisi',
    emailPengisi: 'Email Pengisi',
    teleponPengisi: 'Telepon Pengisi',
    namaAlumni: 'Nama Alumni',
    jabatanAlumni: 'Jabatan Alumni',
    waktuBekerjaDiPerusahaan: 'Lama Bekerja',
    tahunLulus: 'Tahun Lulus',
    kesesuaianBidangStudi: 'Kesesuaian Bidang Studi',
    waktuAdaptasi: 'Waktu Adaptasi',
    saranKompetensiTambahan: 'Saran Kompetensi Tambahan',
    etikaKerja: 'Sikap/Etika',
    keahlian: 'Keahlian Pada Bidang Ilmu (Kompetensi Utama)',
    bahasaasing: 'Kemampuan Berbahasa Asing',
    teknologiinformasi: 'Penggunaan Teknologi Informasi',
    komunikasi: 'Komunikasi',
    teknologi: 'Penguasaan Teknologi',
    kerjasama: 'Kerja Sama',
    pengembangandiri: 'Pengembangan Diri'
  };

  const identitasKunci = [
    'namaPerusahaanPengguna', 'alamatPerusahaan', 'namaPengisi', 'jabatanPengisi',
    'emailPengisi', 'teleponPengisi'
  ];

  const kompetensiAspects = [
    { label: 'Sikap/Etika', key: 'etikaKerja' },
    { label: 'Keahlian Pada Bidang Ilmu (Kompetensi Utama)', key: 'keahlian' },
    { label: 'Kemampuan Berbahasa Asing', key: 'bahasaasing' },
    { label: 'Penggunaan Teknologi Informasi', key: 'teknologiinformasi' },
    { label: 'Komunikasi', key: 'komunikasi' },
    { label: 'Penguasaan Teknologi', key: 'teknologi' },
    { label: 'Kerja Sama', key: 'kerjasama' },
    { label: 'Pengembangan Diri', key: 'pengembangandiri' },
  ];

  const ratingLabels = ['', 'Sangat Kurang', 'Kurang', 'Cukup', 'Baik', 'Sangat Baik'];
  const ratingKeys = ['etikaKerja', 'keahlian', 'bahasaasing', 'teknologiinformasi', 'komunikasi', 'teknologi', 'kerjasama', 'pengembangandiri'];

  useEffect(() => {
    const fetchSurvei = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/Survei');
        setSurveiData(response.data);

        const tahunLulusSet = new Set();
        response.data.forEach(alumni => {
          const data = alumni.datajson || {};

          if (Array.isArray(data)) {
            data.forEach(item => {
              if (item.pertanyaan === "tahunLulus" && item.jawaban) {
                tahunLulusSet.add(item.jawaban);
              }
            });
          } else if (typeof data === "object") {
            if (data.tahunLulus) {
              tahunLulusSet.add(data.tahunLulus);
            }
          }
        });

        setTahunLulussList(["Semua Tahun Lulus", ...Array.from(tahunLulusSet).sort()]);

      } catch (error) {
        console.error('Error fetching alumni data:', error);
        Swal.fire('Error!', 'Gagal memuat data alumni.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchSurvei();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchNama, selectedTahunLulus]);

  const handleShowModal = (datajson) => {
    let identitasData = {};
    let kuisionerLain = [];
    let namaAlumniFromCategories = "";

    try {
      if (Array.isArray(datajson)) {
        datajson.forEach((item) => {
          if (identitasKunci.includes(item.pertanyaan)) {
            identitasData[item.pertanyaan] = item.jawaban;
          } else if (item.pertanyaan !== 'penilaian') {
            kuisionerLain.push(item);
          }

          if (item.pertanyaan === 'namaAlumni') {
            namaAlumniFromCategories = item.jawaban;
          }
        });
      } else if (typeof datajson === 'object' && datajson !== null) {
        Object.entries(datajson).forEach(([key, value]) => {
          if (identitasKunci.includes(key)) {
            identitasData[key] = value;
          } else if (key !== 'penilaian') {
            kuisionerLain.push({ pertanyaan: key, jawaban: value });
          }

          if (key === 'namaAlumni') {
            namaAlumniFromCategories = value;
          }
        });
      }
    } catch (err) {
      console.error('Error parsing datajson:', err);
    }

    setIdentitas({ ...identitasData, namaAlumni: namaAlumniFromCategories });
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
        await axios.delete(`http://localhost:5000/survei/${id}`);
        setSurveiData((prevData) => prevData.filter((survei) => survei.id !== id));
        Swal.fire('Dihapus!', 'Data survei telah berhasil dihapus.', 'success');
      } catch (error) {
        console.error('Error deleting survei data:', error);
        Swal.fire('Gagal!', 'Gagal menghapus data.', 'error');
      }
    }
  };

  const exportToExcel = async () => {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Data survei Lengkap");

      const orderedKeys = Object.keys(labelMap);
      const headers = ["No", ...orderedKeys.map(k => labelMap[k] || k)];
      worksheet.addRow(headers);

      surveiData.forEach((survei, index) => {
        const data = survei.datajson || {};
        const row = [index + 1];

        orderedKeys.forEach(key => {
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
      saveAs(blob, "Survei_Pengguna_Alumni_Lengkap.xlsx");
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      Swal.fire('Error!', 'Gagal mengekspor data ke Excel.', 'error');
    }
  };

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Survei Pengguna Alumni",
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

    if (ratingKeys.includes(key)) {
      const numValue = parseInt(value);
      if (numValue >= 1 && numValue <= 5) {
        return `${numValue} - ${ratingLabels[numValue]}`;
      }
    }

    if (Array.isArray(value)) {
      return value.join(', ');
    }

    return value;
  };

  const getDataByCategory = (category) => {
    return selectedDetail
      .filter(item => categories[category]?.includes(item.pertanyaan))
      .sort((a, b) => {
        const categoryKeys = categories[category] || [];
        const idxA = categoryKeys.indexOf(a.pertanyaan);
        const idxB = categoryKeys.indexOf(b.pertanyaan);
        return idxA - idxB;
      });
  };

  const filteredSurvei = surveiData.filter((Survei) => {
    const data = Survei.datajson || {};
    let nama = "";
    let tahunLulus = "";

    if (Array.isArray(data)) {
      data.forEach(item => {
        if (item.pertanyaan === "namaAlumni") nama = (item.jawaban || "").toLowerCase();
        if (item.pertanyaan === "tahunLulus") tahunLulus = item.jawaban;
      });
    } else if (typeof data === "object") {
      nama = (data.namaAlumni || "").toLowerCase();
      tahunLulus = data.tahunLulus || "";
    }

    const matchNama = nama.includes(searchNama.toLowerCase());
    const matchTahun = selectedTahunLulus === "Semua Tahun Lulus" || tahunLulus === selectedTahunLulus;

    return matchNama && matchTahun;
  });

  const totalItems = filteredSurvei.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedSurvei = filteredSurvei.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container mt-4">
      <Row className="align-items-center p-4">
        <Col>
          <h2 className="mb-1 fw-bold text-white text-uppercase">Survei Pengguna Alumni</h2>
        </Col>
      </Row>

      <Card className="shadow border-0">
        <Card.Body className="p-0">
          <div className="p-3 border-bottom">
            <Row className="align-items-center g-3">
              <Col md={6} lg={5}>
                <h5 className="mb-0 fw-semibold">Daftar Survei Pengguna Alumni Sistem Informasi</h5>
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
                    placeholder="Cari Nama Alumni"
                    value={searchNama}
                    onChange={(e) => setSearchNama(e.target.value)}
                    className="border-0 shadow-none py-1"
                  />
                </InputGroup>
              </div>

              <div className="col-12 col-md-4 col-lg-3">
                <Form.Select
                  value={selectedTahunLulus}
                  onChange={(e) => setSelectedTahunLulus(e.target.value)}
                >
                  {tahunLulussList.map((tahun, idx) => (
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
                <h4 className="text-uppercase">Survei Pengguna Alumni</h4>
                <p>Tanggal Cetak: {new Date().toLocaleDateString()}</p>
              </div>
              <Table striped bordered hover responsive className="align-middle mb-0 text-center small">
                <thead>
                  <tr>
                    <th className="py-2">No</th>
                    {identitasKunci.map((key, i) => (
                      <th className='px-3' key={i}>{labelMap[key] || key}</th>
                    ))}
                    <th className='no-print'>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedSurvei.length > 0 ? (
                    paginatedSurvei.map((survei, index) => {
                      const data = survei.datajson || {};
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
                        <tr key={survei.id || index}>
                          <td className="text-center">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                          {identitasKunci.map((key, i) => (
                            <td key={i}>{identitasRow[key] || '-'}</td>
                          ))}
                          <td className='no-print'>
                            <Button
                              variant="outline-warning"
                              size="sm"
                              className="mx-1 mb-1"
                              onClick={() => handleShowModal(data)}
                              title="Lihat Detail"
                            >
                              <FiEye size={16} />
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              className="mx-1 mb-1"
                              onClick={() => handleDelete(survei.id)}
                              title="Hapus Data"
                            >
                              <FiTrash2 size={16} />
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={identitasKunci.length + 2} className="text-center py-4">
                        <span className="text-muted">Tidak ada data yang ditemukan</span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          )}

          <div className="p-3 border-top d-flex justify-content-between align-items-center">
            <div className="small text-muted">
              Menampilkan {totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-{Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems} entri
            </div>
            <div >
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="mx-2 mb-2"
              >
                Sebelumnya
              </Button>
              <span className="text-muted small">
              </span>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
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
            <span className="fs-5">Detail Survei Pengguna Alumni</span>
            {identitas.namaAlumni && (
              <div className="fs-6 text-primary mt-1">Nama Alumni: {identitas.namaAlumni}</div>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          {selectedDetail.length > 0 || Object.keys(identitas).length > 0 ? (
            <Tabs defaultActiveKey="biodata" className="mb-3">
              <Tab eventKey="biodata" title="Biodata Pengguna" className="p-3">
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

              {selectedDetail.some(i => ratingKeys.includes(i.pertanyaan)) && (
                <Tab eventKey="rating-kompetensi" title="Rating Kompetensi" className="p-3">
                  <div className="table-responsive">
                    <Table bordered className="text-center align-middle mt-2">
                      <thead className="table-light">
                        <tr>
                          <th>Aspek Kompetensi</th>
                          {[1, 2, 3, 4, 5].map(n => (
                            <th key={n}>{n}</th>
                          ))}
                          <th>Keterangan</th>
                        </tr>
                      </thead>
                      <tbody>
                        {kompetensiAspects.map(({ label, key }) => {
                          const nilai = selectedDetail.find(item => item.pertanyaan === key)?.jawaban;
                          const numNilai = parseInt(nilai);

                          return (
                            <tr key={key}>
                              <td className="text-start">{label}</td>
                              {[1, 2, 3, 4, 5].map(n => (
                                <td key={n} className={numNilai === n ? 'bg-primary text-white' : ''}>
                                  {numNilai === n ? '✓' : ''}
                                </td>
                              ))}
                              <td className="text-start">
                                {numNilai >= 1 && numNilai <= 5 ? ratingLabels[numNilai] : '-'}
                              </td>
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

export default SurveiAlumni;