import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col, Form, InputGroup, Badge } from "react-bootstrap";
import { FiSearch, FiFilter } from "react-icons/fi";
import axios from "axios";
import "../Dist/Home.css";
import NavbarComponents from "../components/NavbarComponents";
import Footer from "../components/FooterComponents";
import FooterEnd from "../components/FooterEnd";

const TenagaPengajar = () => {
    const [dosenList, setDosenList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDosen = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:5000/dosen");
                setDosenList(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching dosen data:", error);
                setError("Gagal memuat data dosen. Silakan coba lagi nanti.");
                setLoading(false);
            }
        };

        fetchDosen();
    }, []);

    const filteredDosen = dosenList.filter(
        (dosen) =>
            dosen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (dosen.nip && dosen.nip.toString().includes(searchTerm)) ||
            (dosen.jabatan_struktural && dosen.jabatan_struktural.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (dosen.jabatan_fungsional && dosen.jabatan_fungsional.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const rank = {
        "Ketua Jurusan": 1,
        "Sekertaris Jurusan": 2,
        "Ketua Prodi": 3,
        "Wakil Ketua Prodi": 4,
        "Kepala Laboratorium": 5,
    };

    const sortedDosen = [...filteredDosen].sort(
        (a, b) => (rank[a.jabatan_struktural] || 99) - (rank[b.jabatan_struktural] || 99)
    );

    const getProfileImage = (name) => {
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=256`;
    };

    const getPhotoUrl = (fotoDosen, name) => {
        return fotoDosen
            ? `http://localhost:5000/uploads/dosen/${fotoDosen}`
            : getProfileImage(name);
    };

    return (
        <div>
            <NavbarComponents />
            <Container fluid className="p-4">
                <div className="p-4 rounded-3 mb-4 text-center">
                    <h2 className="mb-2 fw-bold text-uppercase" style={{ color: 'darkblue' }}>TENAGA PENGAJAR</h2>
                    <p className="mb-0 text-muted fw-semibold">Program Studi Sistem Informasi</p>
                </div>

                <Card className="bg-transparent border-0 mb-4">
                    <Card.Body>
                        <Row className="align-items-center mb-4">
                            <Col md={6}>
                                <h5 className="mb-2 fw-semibold text-uppercase">Daftar Tenaga Pengajar</h5>
                            </Col>
                            <Col md={6} className="mb-2">
                                <InputGroup className="border rounded overflow-hidden">
                                    <InputGroup.Text className="bg-white border-0">
                                        <FiSearch size={16} className="text-primary" />
                                    </InputGroup.Text>
                                    <Form.Control
                                        placeholder="Cari berdasarkan nama, NIP, atau jabatan..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="border-0 shadow-none py-2"
                                    />
                                </InputGroup>
                            </Col>
                        </Row>

                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="mt-3 text-muted">Memuat data tenaga pengajar...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-5">
                                <FiFilter size={48} className="text-muted mb-3" />
                                <p className="text-danger">{error}</p>
                            </div>
                        ) : sortedDosen.length > 0 ? (
                            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                                {sortedDosen.map((dosen) => (
                                    <Col key={dosen.id}>
                                        <Card className="h-100 shadow border-0 overflow-hidden card-hover">
                                            <div className="photo-container">
                                                <img
                                                    src={getPhotoUrl(dosen.foto_dosen, dosen.name)}
                                                    alt={dosen.name}
                                                    className="photo-img"
                                                />
                                                {dosen.status && (
                                                    <Badge
                                                        bg={dosen.status === "Aktif" ? "success" : "warning"}
                                                        className="position-absolute top-0 end-0 m-2 rounded-pill px-3 py-1"
                                                    >
                                                        {dosen.status}
                                                    </Badge>
                                                )}
                                            </div>
                                            <Card.Body className="p-3">
                                                <Card.Title className="fw-bold mb-1 fs-5">{dosen.name}</Card.Title>
                                                <Card.Subtitle className="mb-3 text-muted small">NIDN/NIP: {dosen.nip || "-"}</Card.Subtitle>

                                                {dosen.jabatan_struktural && (
                                                    <div className="mb-2">
                                                        <div className="fw-semibold small text-primary">Jabatan Struktural:</div>
                                                        <div>{dosen.jabatan_struktural}</div>
                                                    </div>
                                                )}

                                                {dosen.jabatan_fungsional && (
                                                    <div className="mb-2">
                                                        <div className="fw-semibold small text-primary">Jabatan Fungsional:</div>
                                                        <div>{dosen.jabatan_fungsional}</div>
                                                    </div>
                                                )}

                                                {dosen.keahlian && (
                                                    <div className="mt-2 text-muted small">
                                                        <div className="fw-semibold small text-primary">Bidang Keahlian:</div>
                                                        <div>{dosen.keahlian}</div>
                                                    </div>
                                                )}
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <div className="text-center py-5">
                                <FiFilter size={48} className="text-muted mb-3" />
                                <p className="text-muted">Tidak ada data tenaga pengajar yang sesuai dengan pencarian</p>
                            </div>
                        )}
                    </Card.Body>
                </Card>
            </Container>
            <Footer />
            <FooterEnd />
        </div>
    );
};

export default TenagaPengajar;
