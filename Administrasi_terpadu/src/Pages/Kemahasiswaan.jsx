import React from "react";
import FooterEnd from '../components/FooterEnd';
import Footer from '../components/FooterComponents';
import NavbarComponents from '../components/NavbarComponents';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiPlus, FiFilter, FiEdit2, FiTrash2, FiSearch, FiBookOpen, FiFile, FiEye } from "react-icons/fi";
import { Row, Col, Container, Image, Table, Button, InputGroup, Form, Modal } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import axios from "axios";


const Kemahasiswaan = () => {
    const navigate = useNavigate();
    const [kegiatandata, setKegiatanData] = useState([]);
    const [rpsList, setRpsList] = useState([]);
    const [kontrakkuliahList, setKontrakKuliahList] = useState([]);
    const [bahanajarList, setBahanAjarList] = useState([]);
    const [matakuliahList, setMataKuliahList] = useState([]);
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedmatakuliah, setSelectedMataKuliah] = useState("");
    const [selectedsemester, setSelectedSemester] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchRps();
        fetchKontrakKuliah();
        fetchBahanAjar();
        fetchMataKuliah();
    }, []);

    const fetchBahanAjar = async () => {
        try {
            const response = await axios.get("http://localhost:5000/bahan_ajar");
            setBahanAjarList(response.data);
        } catch (error) {
            console.error("Gagal memuat Bahan Ajar:", error);
        }
    };


    const fetchMataKuliah = async () => {
        try {
            const response = await axios.get("http://localhost:5000/mata_kuliah");
            setMataKuliahList(response.data);
        } catch (error) {
            console.error("Gagal memuat mata kuliah:", error);
        }
    };


    const fetchRps = async () => {
        setError(null);
        try {
            const response = await axios.get("http://localhost:5000/rps");
            setRpsList(response.data);
        } catch (error) {
            setError("Gagal memuat data RPS.");
            console.error("Error fetching data:", error);
        }
    };

    const fetchKontrakKuliah = async () => {
        try {
            const response = await axios.get("http://localhost:5000/kontrak_kuliah");
            setKontrakKuliahList(response.data);
        } catch (error) {
            console.error("Error fetching mata kuliah data:", error);
        }
    };

    useEffect(() => {

        axios.get('http://localhost:5000/api/kegiatan-mahasiswa/statistik')
            .then(res => {
                setKegiatanData(res.data);
            })
            .catch(err => {
                console.error("Gagal mengambil data kegiatan:", err);
            });
    }, []);

    const handleShowDetail = (item) => {
        setSelectedDetail(item);
        setShowDetailModal(true);
    };

    const handleCloseDetail = () => {
        setShowDetailModal(false);
        setSelectedDetail(null);
    };

    const filteredRps = rpsList.filter((rps) => {
        const nameMatch = rps.name.toLowerCase().includes(searchTerm.toLowerCase());
        const semesterMatch = selectedsemester === "" || rps.semester.toLowerCase() === `semester ${selectedsemester}`.toLowerCase();
        return nameMatch && semesterMatch;
    })
        .sort((a, b) => {
            const semesterA = parseInt(a.semester.replace(/\D/g, '')) || 0;
            const semesterB = parseInt(b.semester.replace(/\D/g, '')) || 0;
            return semesterA - semesterB;
        });


    const filteredKontrakKuliah = kontrakkuliahList.filter((kontrak_kuliah) => {
        const nameMatch = kontrak_kuliah.mata_kuliah?.toLowerCase().includes(searchTerm.toLowerCase());
        return nameMatch;
    });

    const filteredBahanAjar = bahanajarList.filter((bahan_ajar) => {
        const nameMatch = bahan_ajar.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matakuliahMatch = selectedmatakuliah === "" || bahan_ajar.name?.toString() === selectedmatakuliah;
        return nameMatch && matakuliahMatch;
    });

    const totalItems = filteredRps.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginatedRps = filteredRps.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const paginatedMataKuliah = filteredKontrakKuliah.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const sortedBahanAjar = filteredBahanAjar.sort((a, b) => a.pertemuan - b.pertemuan);
    const paginatedBahanAjar = sortedBahanAjar.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    return (
        <div>
            <NavbarComponents />
            <Container fluid className="p-4">
                <div className="mt-5 mx-3 ">
                    <h3 className="text-uppercase text-center " style={{ color: 'darkblue' }}>Kemahasiswaan</h3>

                    <div className="col-11 col-sm-10 col-md-10  col-lg-12 mt-5">
                        <h5 className="fw-semibold text-uppercase mb-4 mx-4">Statistik Kegiatan Mahasiswa</h5>
                        <ResponsiveContainer width="80%" height={300}>
                            <BarChart data={kegiatandata} margin={{ bottom: 63 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="nama"
                                    angle={-35}
                                    textAnchor="end"
                                    dy={10}
                                    interval={0} />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Bar dataKey="jumlah" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="mt-5 p-4">
                    <h4 className='text-center text-uppercase'>rancangan pelajaran semester</h4>
                </div>

                <Card className="p-4 bg-secondary" >
                    <Card className="shadow border-0 p-4">
                        <Card.Body className="p-0">
                            <div className="p-3 border-bottom">
                                <Row className="align-items-center g-3">
                                    <Col md={6} lg={4}>
                                        <h5 className="mb-0 fw-semibold">Daftar RPS Sistem Informasi</h5>
                                    </Col>
                                </Row>
                            </div>

                            <Card.Header className="bg-white py-3 border-bottom">
                                <div className="d-flex  align-items-center flex-wrap gap-3 ">
                                    <div className=" ms-auto col-md-6 col-lg-4">
                                        <InputGroup size="sm" className="border rounded overflow-hidden">
                                            <InputGroup.Text className="bg-white border-0">
                                                <FiSearch size={16} className="text-primary" />
                                            </InputGroup.Text>
                                            <Form.Control
                                                size="sm"
                                                placeholder="Cari nama mata kuliah..."
                                                value={searchTerm}
                                                onChange={(e) => {
                                                    setSearchTerm(e.target.value);
                                                    setCurrentPage(1);
                                                }}
                                                className="border-0 shadow-none py-1"
                                            />
                                        </InputGroup>
                                    </div>

                                    <div className=" col-md-4 col-lg-3">
                                        <Form.Select
                                            value={selectedsemester}
                                            onChange={(e) => {
                                                setSelectedSemester(e.target.value);
                                                setCurrentPage(1);
                                            }}
                                            className="shadow-none py-1"
                                        >
                                            <option value="">Semua Semester</option>
                                            {[...Array(8)].map((_, i) => (
                                                <option key={i + 1} value={(i + 1).toString()}>
                                                    Semester {i + 1}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </div>
                                </div>
                            </Card.Header>


                            <div className="table-responsive">
                                <Table striped bordered className="align-middle  text-center" size="sm">
                                    <thead className="bg-light">
                                        <tr>
                                            <th className="py-3">No</th>
                                            <th className="py-3">Nama </th>
                                            <th className="py-3">Semester</th>
                                            <th className="py-3">File_Rps</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedRps.length > 0 ? (
                                            paginatedRps.map((rps, index) => (
                                                <tr key={rps.id}>
                                                    <td >{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                    <td>{rps.name}</td>
                                                    <td>{rps.semester}</td>
                                                    <td>
                                                        <a
                                                            href={`http://localhost:5000/uploads/rps/${rps.file_rps}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            Lihat PDF
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="8" className="text-center py-4">
                                                    <div className="d-flex flex-column align-items-center justify-content-center py-4">
                                                        <FiFilter size={32} className="text-muted mb-2" />
                                                        <p className="text-muted mb-0">Tidak ada data dosen yang tersedia</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </div>

                            <div className="p-3 border-top d-flex justify-content-between align-items-center">
                                <div className="small text-muted">
                                    Menampilkan {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems} entri
                                </div>
                                <div className="mx-4 ">
                                    <Button variant="outline-primary" size="sm" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="mx-2 mb-2" >
                                        Sebelumnya
                                    </Button>
                                    <Button variant="outline-primary" size="sm" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className="mx-2 mb-2">
                                        Selanjutnya
                                    </Button>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Card>





                <div className="mt-5 p-4">
                    <h4 className='text-center text-uppercase'>Kontrak Kuliah</h4>
                </div>

                <Card className="p-4 bg-secondary" >
                    <Card className="shadow border-0 p-4">
                        <Card.Body className="p-0">
                            <div className="p-3 border-bottom">
                                <Row className="align-items-center g-3">
                                    <Col md={6} lg={4}>
                                        <h5 className="mb-0 fw-semibold">Daftar Kontrak Kuliah Sistem Informasi</h5>
                                    </Col>
                                </Row>
                            </div>

                            <Card className="shadow-sm border-0 overflow-hidden">
                                <Card.Header className="bg-white py-3 border-bottom">
                                    <div className="d-flex align-items-center flex-wrap gap-3">
                                        <div className="ms-auto col-md-6 col-lg-4">
                                            <InputGroup size="sm" className="border rounded overflow-hidden">
                                                <InputGroup.Text className="bg-white border-0">
                                                    <FiSearch size={16} className="text-primary" />
                                                </InputGroup.Text>
                                                <Form.Control
                                                    size="sm"
                                                    placeholder="Cari nama Mata Kuliah..."
                                                    value={searchTerm}
                                                    onChange={(e) => {
                                                        setSearchTerm(e.target.value);
                                                        setCurrentPage(1);
                                                    }}
                                                    className="border-0 shadow-none py-1"
                                                />
                                            </InputGroup>
                                        </div>

                                        <div className="col-md-4 col-lg-3">
                                            <Form.Select
                                                value={selectedsemester}
                                                onChange={(e) => {
                                                    setSelectedSemester(e.target.value);
                                                    setCurrentPage(1);
                                                }}
                                                className="shadow-none py-1"
                                            >
                                                <option value="">-- Semua Semester --</option>
                                                {[...Array(8)].map((_, i) => (
                                                    <option key={i + 1} value={(i + 1).toString()}>
                                                        Semester {i + 1}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </div>
                                    </div>
                                </Card.Header>

                                <Card.Body className="p-0 text-center">
                                    <div className="table-responsive">
                                        <Table striped bordered hover className="align-middle mb-0" size="sm">
                                            <thead>
                                                <tr className="bg-light">
                                                    <th className="px-1 py-3" >No</th>
                                                    <th className="px-3 py-3" >Nama Dosen</th>
                                                    <th className="px-3 py-3" >Mata Kuliah</th>
                                                    <th className="px-3 py-3" >Semester</th>
                                                    <th className="px-3 py-3" >Kontrak Kuliah</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredKontrakKuliah.length > 0 ? (
                                                    paginatedMataKuliah.map((kontrak_kuliah, index) => (
                                                        <tr key={kontrak_kuliah.id}>
                                                            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                            <td>{kontrak_kuliah.nama_dosen}</td>
                                                            <td>{kontrak_kuliah.mata_kuliah}</td>
                                                            <td>{kontrak_kuliah.semester}</td>
                                                            <td>
                                                                <a
                                                                    href={`http://localhost:5000/uploads/kontrak_kuliah/${kontrak_kuliah.file_kontrak_kuliah}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    Lihat PDF
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="8" className="text-center py-4">
                                                            <div className="d-flex flex-column align-items-center justify-content-center py-4">
                                                                <FiFilter size={32} className="text-muted mb-2" />
                                                                <p className="text-muted mb-0">Tidak ada data dosen yang tersedia</p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </Table>
                                    </div>
                                </Card.Body>
                            </Card>

                            <div className="p-3 border-top d-flex justify-content-between align-items-center">
                                <div className="small text-muted">
                                    Menampilkan {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems} entri
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
                </Card>




                <div className="mt-5 p-4">
                    <h4 className='text-center text-uppercase'>Bahan Ajar</h4>
                </div>
                <Card className="p-4 bg-secondary">
                    <Card className="shadow border-0 p-4">
                        <Card.Body className="p-0">
                            <div className="p-3 border-bottom">
                                <Row className="align-items-center g-3">
                                    <Col md={6} lg={5}>
                                        <h5 className="mb-0 fw-semibold">Daftar Bahan Ajar Sistem Informasi</h5>
                                    </Col>
                                </Row>
                            </div>

                            <Card.Header className="bg-white py-3 border-bottom">
                                <div className="d-flex align-items-center flex-wrap gap-3">
                                    <div className="ms-auto col-md-6 col-lg-4">
                                        <InputGroup size="sm" className="border rounded overflow-hidden">
                                            <InputGroup.Text className="bg-white border-0">
                                                <FiSearch size={16} className="text-primary" />
                                            </InputGroup.Text>
                                            <Form.Control
                                                size="sm"
                                                placeholder="Cari nama Mata Kuliah..."
                                                value={searchTerm}
                                                onChange={(e) => {
                                                    setSearchTerm(e.target.value);
                                                    setCurrentPage(1);
                                                }}
                                                className="border-0 shadow-none py-1"
                                            />
                                        </InputGroup>
                                    </div>

                                    <div className="col-md-4 col-lg-3">
                                        <Form.Select
                                            value={selectedmatakuliah}
                                            onChange={(e) => {
                                                setSelectedMataKuliah(e.target.value);
                                                setCurrentPage(1);
                                            }}
                                            className="shadow-none py-1"
                                        >
                                            <option value="">-- Semua Mata Kuliah --</option>
                                            {matakuliahList.map((mata_kuliah) => (
                                                <option key={mata_kuliah.id} value={mata_kuliah.name}>
                                                    {mata_kuliah.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </div>
                                </div>
                            </Card.Header>

                            <div className="table-responsive">
                                <Table striped bordered hover className="align-middle mb-0 text-center" size="sm">
                                    <thead className="bg-light">
                                        <tr>
                                            <th>No</th>
                                            <th>Nama Mata Kuliah</th>
                                            <th>Judul Materi</th>
                                            <th>Pertemuan</th>
                                            <th>File Pendukung</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedBahanAjar.length > 0 ? (
                                            paginatedBahanAjar.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.judul_materi}</td>
                                                    <td>{item.pertemuan}</td>
                                                    <td>
                                                        <a
                                                            href={`http://localhost:5000/uploads/bahan_ajar/${item.file_pendukung}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            Lihat PDF
                                                        </a>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex justify-content-center gap-2">
                                                            <Button
                                                                variant="outline-warning"
                                                                size="sm"
                                                                title="Lihat Detail"
                                                                onClick={() => handleShowDetail(item)}
                                                            >
                                                                <FiEye size={16} />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center text-muted py-3">
                                                    Tidak ada data
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>

                                </Table>
                            </div>
                        </Card.Body>

                        <div className="p-3 border-top d-flex justify-content-between align-items-center">
                            <div className="small text-muted">
                                Menampilkan {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems} entri
                            </div>
                            <div className="mx-4">
                                <Button variant="outline-primary" size="sm" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="mx-2 mb-2">
                                    Sebelumnya
                                </Button>
                                <Button variant="outline-primary" size="sm" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className="mx-2 mb-2">
                                    Selanjutnya
                                </Button>
                            </div>
                        </div>
                    </Card>
                </Card>

                <Modal show={showDetailModal} onHide={handleCloseDetail} centered>
                    <Modal.Header closeButton>
                        <Modal.Title className="fw-semibold ">
                            <FiBookOpen className="mx-2" />
                            Detail Bahan Ajar
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {selectedDetail && (
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <strong className="text-secondary">Dosen Pengampu:</strong><br />
                                    {selectedDetail.dosen_pengampu}
                                </li>
                                <li className="list-group-item">
                                    <strong className="text-secondary">Mata Kuliah:</strong><br />
                                    {selectedDetail.name}
                                </li>
                                <li className="list-group-item">
                                    <strong className="text-secondary">Judul Materi:</strong><br />
                                    {selectedDetail.judul_materi}
                                </li>
                                <li className="list-group-item">
                                    <strong className="text-secondary">Pertemuan Ke-:</strong> {selectedDetail.pertemuan}
                                </li>
                                <li className="list-group-item">
                                    <strong className="text-secondary">File Pendukung:</strong><br />
                                    <a
                                        href={`http://localhost:5000/uploads/bahan_ajar/${selectedDetail.file_pendukung}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-sm btn-outline-primary mt-2"
                                    >
                                        <FiFile className="mx-2 mb-1" />
                                        Lihat File PDF
                                    </a>
                                </li>
                            </ul>
                        )}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={handleCloseDetail}>
                            Tutup
                        </Button>
                    </Modal.Footer>
                </Modal>


                <svg
                    className="position-absolute bottom-0 start-0 w-100 "
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        zIndex: -1,
                    }}
                >
                    <path
                        fill="#e2edff"
                        fillOpacity="1"
                        d="M0,256L40,261.3C80,267,160,277,240,282.7C320,288,400,288,480,250.7C560,213,640,139,720,133.3C800,128,880,192,960,186.7C1040,181,1120,107,1200,69.3C1280,32,1360,32,1400,32L1440,32L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
                    />
                </svg>

            </Container>
            <Footer />
            <FooterEnd />
        </div>
    )
}

export default Kemahasiswaan;