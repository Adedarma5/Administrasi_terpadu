import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Nav, Collapse, Button, Offcanvas, Card } from "react-bootstrap";
import {
    FaBook,
    FaUsers,
    FaChevronDown,
    FaCalendarCheck,
    FaClipboardList,
    FaBars,
    FaSignOutAlt,
    FaAngleLeft,
    FaAngleRight,
    FaHome,
    FaNewspaper,
    FaTachometerAlt
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AdminDashboard from "../Dasboard/AdminDashboard";

const SidebarComponents = ({ children }) => {
    const [openAkademik, setOpenAkademik] = useState(false);
    const [openKegiatanMahasiswa, setOpenKegiatanMahasiswa] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const navigate = useNavigate();


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const handleLogout = async () => {
        try {
            await axios.delete("http://localhost:5000/logout", { withCredentials: true });

            localStorage.removeItem("token");

            navigate("/login");
        } catch (error) {
            console.error("Logout gagal:", error);
        }
    };




    return (
        <Container fluid className="p-0">
            <Row className="g-0">
                {/* Desktop Sidebar */}
                <Col
                   className="d-none d-md-flex flex-column bg-dark text-white min-vh-100 shadow-sm position-fixed"
                   style={{
                       width: isCollapsed ? '80px' : '260px',
                       transition: "width 0.3s ease",
                       zIndex: 1030
                    }}
                >
                    {/* Header/Logo Area */}
                    <div className="d-flex align-items-center p-3 border-bottom border-secondary">
                        <img
                            src="/src/assets/unimal.png"
                            width="50"
                            height="50"
                            className="rounded-circle"
                            alt="Logo"
                        />
                        {!isCollapsed && (
                            <div className="ms-2 text-white">
                                <div className="fw-bold" style={{ fontSize: '12px' }}>Sistem Informasi</div>
                                <div className="text-info" style={{ fontSize: '11px' }}>Akademik Terpadu</div>
                            </div>
                        )}
                    </div>

                    {/* Navigation Menu */}
                    <div className="d-flex flex-column h-100">
                        {/* Toggle Button */}
                        <div className="d-flex justify-content-end p-2">
                            <Button
                                variant="outline-light"
                                size="sm"
                                className="d-flex align-items-center justify-content-center p-1"
                                style={{ width: '28px', height: '28px', borderRadius: '4px' }}
                                onClick={() => setIsCollapsed(!isCollapsed)}
                            >
                                <FaBars size={14} />
                            </Button>
                        </div>

                        {/* Dashboard Link */}
                        <Nav.Link
                            as={Link}
                            to="/admin/dashboard"
                            className="text-white d-flex align-items-center py-2 px-3 mt-1"
                            style={{
                                borderRadius: '4px',
                                margin: '2px 8px',
                                backgroundColor: 'rgba(255,255,255,0.1)',
                            }}
                        >
                            <FaTachometerAlt className="me-3" />
                            {!isCollapsed && <span className="fw-medium">Dashboard</span>}
                        </Nav.Link>

                        <div className="mt-2 mb-2" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}></div>

                        {/* Akademik Menu */}
                        <Nav.Item className="px-2">
                            <Nav.Link
                                onClick={() => setOpenAkademik(!openAkademik)}
                                className="text-white d-flex align-items-center"
                                style={{ cursor: "pointer" }}
                            >
                                <FaBook className={isCollapsed ? "mx-auto" : "me-2"} style={{ fontSize: isCollapsed ? '1.2rem' : '1rem' }} />
                                {!isCollapsed && <span>Akademik</span>}
                                {!isCollapsed && <FaChevronDown className="ms-auto" />}
                            </Nav.Link>
                            <Collapse in={openAkademik}>
                                <div className={isCollapsed ? "d-none" : "ms-4"}>
                                    <Nav.Link as={Link} to="/admin/dashboard/Dosen" className="text-white py-1">Dosen</Nav.Link>
                                    <Nav.Link as={Link} to="/admin/dashboard/MataKuliah" className="text-white py-1">Mata Kuliah</Nav.Link>
                                    <Nav.Link as={Link} to="/admin/dashboard/Rps" className="text-white py-1">RPS</Nav.Link>
                                    <Nav.Link as={Link} to="/admin/dashboard/KontrakKuliah" className="text-white py-1">Kontrak Kuliah</Nav.Link>
                                    <Nav.Link as={Link} to="/admin/dashboard/BahanAjar" className="text-white py-1">Bahan Ajar</Nav.Link>
                                    <Nav.Link as={Link} to="/admin/dashboard/Penelitian" className="text-white py-1">Penelitian</Nav.Link>
                                    <Nav.Link as={Link} to="/admin/dashboard/Pengabdian" className="text-white py-1">Pengabdian</Nav.Link>
                                    <Nav.Link as={Link} to="/admin/dashboard/Pengajaran" className="text-white py-1">Pengajaran</Nav.Link>
                                </div>
                            </Collapse>
                        </Nav.Item>

                        {/* Absensi Link */}
                        <Nav.Item className="px-2">
                            <Nav.Link
                                as={Link}
                                to='/admin/dashboard/Absensi'
                                className="text-white d-flex align-items-center"
                            >
                                <FaCalendarCheck className={isCollapsed ? "mx-auto" : "me-2"} style={{ fontSize: isCollapsed ? '1.2rem' : '1rem' }} />
                                {!isCollapsed && <span>Absensi</span>}
                            </Nav.Link>
                        </Nav.Item>

                        {/* Kegiatan Mahasiswa */}
                        <Nav.Item className="px-2">
                            <Nav.Link
                                onClick={() => setOpenKegiatanMahasiswa(!openKegiatanMahasiswa)}
                                className="text-white d-flex align-items-center"
                                style={{ cursor: "pointer" }}
                            >
                                <FaClipboardList className={isCollapsed ? "mx-auto" : "me-2"} style={{ fontSize: isCollapsed ? '1.2rem' : '1rem' }} />
                                {!isCollapsed && <span>Kegiatan Mahasiswa</span>}
                                {!isCollapsed && <FaChevronDown className="ms-auto" />}
                            </Nav.Link>
                            <Collapse in={openKegiatanMahasiswa}>
                                <div className={isCollapsed ? "d-none" : "ms-4"}>
                                    <Nav.Link as={Link} to="/admin/dashboard/Msib" className="text-white py-1">MSIB</Nav.Link>
                                    <Nav.Link as={Link} to="/admin/dashboard/Magangmandiri" className="text-white py-1">Magang Mandiri</Nav.Link>
                                    <Nav.Link as={Link} to="/admin/dashboard/Prestasi" className="text-white py-1">Prestasi</Nav.Link>
                                    <Nav.Link as={Link} to="/admin/dashboard/KerjaPraktik" className="text-white py-1">Kerja Praktik</Nav.Link>
                                    <Nav.Link as={Link} to="/admin/dashboard/TugasAkhir" className="text-white py-1">Tugas Akhir</Nav.Link>
                                    <Nav.Link as={Link} to="/admin/dashboard/Pmm" className="text-white py-1">PMM</Nav.Link>
                                    <Nav.Link as={Link} to="/admin/dashboard/Kewirausahaan" className="text-white py-1">Kewirausahaan</Nav.Link>
                                    <Nav.Link as={Link} to="/admin/dashboard/Alumni" className="text-white py-1">Alumni</Nav.Link>
                                </div>
                            </Collapse>
                        </Nav.Item>

                        {/* Users Link */}
                        <Nav.Item className="px-2">
                            <Nav.Link
                                as={Link}
                                to='/admin/dashboard/UserDosen'
                                className="text-white d-flex align-items-center"
                            >
                                <FaUsers className={isCollapsed ? "mx-auto" : "me-2"} style={{ fontSize: isCollapsed ? '1.2rem' : '1rem' }} />
                                {!isCollapsed && <span>Users</span>}
                            </Nav.Link>
                        </Nav.Item>

                        {/* Logout at bottom */}
                        <div className="mt-auto mb-3 px-2">
                            <Button
                                variant="outline-danger"
                                className="w-100 d-flex align-items-center justify-content-center"
                                onClick={handleLogout}
                            >
                                <FaSignOutAlt className={isCollapsed ? "" : "me-2"} />
                                {!isCollapsed && <span>Logout</span>}
                            </Button>
                        </div>
                    </div>
                </Col>

                {/* Mobile Header with Logo and Menu Button (similar to image) */}
                <div className="d-md-none w-100 fixed-top" style={{ zIndex: 1040 }}>
                    {/* University header with logo */}
                    <div className="d-flex justify-content-between align-items-center p-2 bg-white">
                        <div className="d-flex align-items-center">
                            <img
                                src="/src/assets/unimal.png"
                                height="40"
                                alt="University Logo"
                                className="me-2"
                            />
                            <div className="d-flex flex-column">
                                <span className="fw-bold" style={{ fontSize: '16px', lineHeight: '1' }}>universitas</span>
                                <span className="fw-bold" style={{ fontSize: '18px', lineHeight: '1' }}>MALIKUSSALEH</span>
                            </div>
                        </div>

                        <div className="d-flex align-items-center">
                            {/* University badge/logo */}
                            <div className="bg-info rounded-circle d-flex justify-content-center align-items-center me-3" style={{ width: '40px', height: '40px' }}>
                                <span className="text-white fw-bold">BLU</span>
                            </div>

                            {/* Menu button */}
                            <Button
                                variant="light"
                                onClick={() => setShowOffcanvas(true)}
                                className="border-0"
                            >
                                <FaBars size={24} />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Mobile Offcanvas Sidebar - Updated to match reference image */}
                <Offcanvas
                    show={showOffcanvas}
                    onHide={() => setShowOffcanvas(false)}
                    placement="end"
                    className="w-75"
                >
                    <Offcanvas.Header closeButton className="bg-success text-white">
                        <Offcanvas.Title className="fw-bold">Menu</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="p-0">
                        <Nav className="flex-column">
                            {/* Home Link */}
                            <Nav.Link
                                as={Link}
                                to="/"
                                className="py-3 px-4 d-flex align-items-center border-bottom"
                                onClick={() => setShowOffcanvas(false)}
                            >
                                <FaHome className="me-3" /> Beranda
                            </Nav.Link>

                            {/* News Link */}
                            <Nav.Link
                                as={Link}
                                to="/berita"
                                className="py-3 px-4 d-flex align-items-center border-bottom"
                                onClick={() => setShowOffcanvas(false)}
                            >
                                <FaNewspaper className="me-3" /> Berita
                            </Nav.Link>

                            {/* Dashboard Link */}
                            <Nav.Link
                                as={Link}
                                to="/admin/dashboard"
                                className="py-3 px-4 d-flex align-items-center border-bottom"
                                onClick={() => setShowOffcanvas(false)}
                            >
                                <FaTachometerAlt className="me-3" /> Dashboard
                            </Nav.Link>

                            {/* Akademik Link */}
                            <Nav.Link
                                onClick={() => {
                                    setOpenAkademik(!openAkademik);
                                }}
                                className="py-3 px-4 d-flex align-items-center border-bottom"
                            >
                                <FaBook className="me-3" /> Akademik
                                <FaChevronDown className="ms-auto" />
                            </Nav.Link>
                            <Collapse in={openAkademik}>
                                <div>
                                    <Nav.Link as={Link} to="/admin/dashboard/Dosen"
                                        className="py-2 ps-5 border-bottom"
                                        onClick={() => setShowOffcanvas(false)}>
                                        Dosen
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/admin/dashboard/MataKuliah"
                                        className="py-2 ps-5 border-bottom"
                                        onClick={() => setShowOffcanvas(false)}>
                                        Mata Kuliah
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/admin/dashboard/Rps"
                                        className="py-2 ps-5 border-bottom"
                                        onClick={() => setShowOffcanvas(false)}>
                                        RPS
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/admin/dashboard/KontrakKuliah"
                                        className="py-2 ps-5 border-bottom"
                                        onClick={() => setShowOffcanvas(false)}>
                                        Kontrak Kuliah
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/admin/dashboard/BahanAjar"
                                        className="py-2 ps-5 border-bottom"
                                        onClick={() => setShowOffcanvas(false)}>
                                        Bahan Ajar
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/admin/dashboard/Penelitian"
                                        className="py-2 ps-5 border-bottom"
                                        onClick={() => setShowOffcanvas(false)}>
                                        Penelitian
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/admin/dashboard/Pengabdian"
                                        className="py-2 ps-5 border-bottom"
                                        onClick={() => setShowOffcanvas(false)}>
                                        Pengabdian
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/admin/dashboard/Pengajaran"
                                        className="py-2 ps-5 border-bottom"
                                        onClick={() => setShowOffcanvas(false)}>
                                        Pengajaran
                                    </Nav.Link>
                                </div>
                            </Collapse>

                            {/* Absensi Link */}
                            <Nav.Link
                                as={Link}
                                to="/admin/dashboard/Absensi"
                                className="py-3 px-4 d-flex align-items-center border-bottom"
                                onClick={() => setShowOffcanvas(false)}
                            >
                                <FaCalendarCheck className="me-3" /> Absensi
                            </Nav.Link>

                            {/* Kegiatan Mahasiswa Link */}
                            <Nav.Link
                                onClick={() => {
                                    setOpenKegiatanMahasiswa(!openKegiatanMahasiswa);
                                }}
                                className="py-3 px-4 d-flex align-items-center border-bottom"
                            >
                                <FaClipboardList className="me-3" /> Kegiatan Mahasiswa
                                <FaChevronDown className="ms-auto" />
                            </Nav.Link>
                            <Collapse in={openKegiatanMahasiswa}>
                                <div>
                                    <Nav.Link as={Link} to="/admin/dashboard/Msib"
                                        className="py-2 ps-5 border-bottom"
                                        onClick={() => setShowOffcanvas(false)}>
                                        MSIB
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/admin/dashboard/Magangmandiri"
                                        className="py-2 ps-5 border-bottom"
                                        onClick={() => setShowOffcanvas(false)}>
                                        Magang Mandiri
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/admin/dashboard/Prestasi"
                                        className="py-2 ps-5 border-bottom"
                                        onClick={() => setShowOffcanvas(false)}>
                                        Prestasi
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/admin/dashboard/KerjaPraktik"
                                        className="py-2 ps-5 border-bottom"
                                        onClick={() => setShowOffcanvas(false)}>
                                        Kerja Praktik
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/admin/dashboard/TugasAkhir"
                                        className="py-2 ps-5 border-bottom"
                                        onClick={() => setShowOffcanvas(false)}>
                                        Tugas Akhir
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/admin/dashboard/Pmm"
                                        className="py-2 ps-5 border-bottom"
                                        onClick={() => setShowOffcanvas(false)}>
                                        PMM
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/admin/dashboard/Kewirausahaan"
                                        className="py-2 ps-5 border-bottom"
                                        onClick={() => setShowOffcanvas(false)}>
                                        Kewirausahaan
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/admin/dashboard/Alumni"
                                        className="py-2 ps-5 border-bottom"
                                        onClick={() => setShowOffcanvas(false)}>
                                        Alumni
                                    </Nav.Link>
                                </div>
                            </Collapse>

                            {/* Users Link */}
                            <Nav.Link
                                as={Link}
                                to="/admin/dashboard/UserDosen"
                                className="py-3 px-4 d-flex align-items-center border-bottom"
                                onClick={() => setShowOffcanvas(false)}
                            >
                                <FaUsers className="me-3" /> Users
                            </Nav.Link>

                            <Button
                                onClick={() => {
                                    handleLogout();
                                    setShowOffcanvas(false);
                                }}
                                className="py-3 px-4 d-flex align-items-center border-bottom text-danger"
                            >
                                <FaSignOutAlt className="me-3" /> Logout
                            </Button>

                        </Nav>
                    </Offcanvas.Body>
                </Offcanvas>

                <Col
                    className="d-flex flex-column min-vh-100"
                    style={{
                        marginLeft: isMobile ? '0' : (isCollapsed ? '80px' : '260px'),
                        transition: "margin-left 0.3s ease",
                        width: isMobile ? '100%' : (isCollapsed ? 'calc(100% - 80px)' : 'calc(100% - 260px)'),
                        marginTop: isMobile ? '60px' : '0'
                    }}
                    >
                    <div className="container-fluid py-3">
                        <div className="row">
                    { children}
                            <div className="col-12">
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default SidebarComponents;