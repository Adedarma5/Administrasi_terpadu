import React, { useState } from "react";
import { Container, Row, Col, Nav, Collapse, Button, Offcanvas } from "react-bootstrap";
import {
    FaBook,
    FaUsers,
    FaChevronDown,
    FaCalendarCheck,
    FaClipboardList,
    FaBars,
    FaSignOutAlt,
    FaAngleLeft,
    FaAngleRight
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const SidebarComponents = ({ children }) => {
    const [openAkademik, setOpenAkademik] = useState(false);
    const [openKegiatanMahasiswa, setOpenKegiatanMahasiswa] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/Login");
    };

    return (
        <Container fluid>
            <Row className="flex-nowrap ">
                <Col xs={isCollapsed ? 2 : 3} md={isCollapsed ? 1 : 2} className="d-none d-md-flex flex-column  bg-dark text-white min-vh-100 align-items-center">
                    <div className="d-flex align-items-center justify-content-between  px-1 p-3">
                        <img
                            src="/src/assets/unimal.png"
                            width="50"
                            height="50"
                        >
                        </img>
                        {!isCollapsed && <span className="ms-2 fw-bold" style={{ fontSize: '12px' }} >Sistem Informasi Akademik Administrasi Terpadu</span>}
                    </div>
                    
                    <Nav className="flex-column flex-grow-1">
                        <Nav.Item>
                            <Nav.Link as={Link} to="/admin/dashboard" className="text-white fw-bold text-uppercase text-center d-flex align-items-center">
                                <Button variant="outline-light" size="sm" className="me-2" onClick={() => setIsCollapsed(!isCollapsed)}>
                                    {isCollapsed ? <FaBars /> : <FaBars />}
                                </Button>
                                {!isCollapsed && "Dashboard"}
                            </Nav.Link>
                            <hr />
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link onClick={() => setOpenAkademik(!openAkademik)} className="text-white d-flex align-items-center" style={{ cursor: "pointer" }}>
                                <FaBook className="me-2 " style={{ fontSize: isCollapsed ? '1.5rem' : '1rem' }} /> {!isCollapsed && "Akademik"}
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

                        <Nav.Item>
                            <Nav.Link as={Link} to='/admin/dashboard/Absensi' className="text-white d-flex align-items-center">
                                <FaCalendarCheck className="me-2" style={{ fontSize: isCollapsed ? '1.5rem' : '1rem' }} /> {!isCollapsed && "Absensi"}
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link onClick={() => setOpenKegiatanMahasiswa(!openKegiatanMahasiswa)} className="text-white d-flex align-items-center" style={{ cursor: "pointer" }}>
                                <FaClipboardList className="me-2" style={{ fontSize: isCollapsed ? '1.5rem' : '1rem' }} /> {!isCollapsed && "Kegiatan Mahasiswa"}
                                {!isCollapsed && <FaChevronDown className="ms-auto" />}
                            </Nav.Link>
                            <Collapse in={openKegiatanMahasiswa}>
                                <div className={isCollapsed ? "d-none" : "ms-4"}>
                                    <Nav.Link as={Link} to="/admin/dashboard/Msib" className="text-white py-1">MSIB</Nav.Link>
                                    <Nav.Link as={Link} to="/admin/dashboard/Magangmandiri" className="text-white py-1">Magang Mandiri</Nav.Link>
                                    <Nav.Link as={Link} to="/admin/dashboard/Prestasi" className="text-white py-1">Prestasi</Nav.Link>
                                    <Nav.Link as={Link} to="/admin/dashboard/KerjaPraktik" className="text-white py-1">Kerja Praktik</Nav.Link>
                                    <Nav.Link as={Link} to="/admin/dashboard/TugasAkhir" className="text-white py-1">Tugas Akhir</Nav.Link>
                                    <Nav.Link as={Link} to="/admin/dashboard/Pmm" className="text-white py-1">Pmm</Nav.Link>
                                    <Nav.Link as={Link} to="/admin/dashboard/Kewirausahaan" className="text-white py-1">Kewirausahaan</Nav.Link>
                                    <Nav.Link as={Link} to="/admin/dashboard/Alumni" className="text-white py-1">Alumni</Nav.Link>
                                </div>
                            </Collapse>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link as={Link} to='/admin/dashboard/UserDosen' className="text-white d-flex align-items-center">
                                <FaUsers className="me-2" style={{ fontSize: isCollapsed ? '1.5rem' : '1rem' }} /> {!isCollapsed && "Users"}
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <div className="p-3 text-start">
                        {!isCollapsed && <p className="mb-1">Hi, Admin</p>}
                        <Button variant="danger" size="sm" onClick={handleLogout} className="d-flex align-items-center">
                            <FaSignOutAlt className="me-2" /> {!isCollapsed && "Logout"}
                        </Button>
                    </div>
                </Col>

                <Button variant="dark" className="d-md-none m-2" onClick={() => setShowOffcanvas(true)}>
                    <FaBars />
                </Button>
                <Offcanvas show={showOffcanvas} onHide={() => setShowOffcanvas(false)} placement="start" className="bg-dark text-white">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Sistem Informasi</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="flex-column">
                            <Nav.Item>
                                <Nav.Link as={Link} to="/admin/dashboard" className="text-white">
                                    <FaBars className="me-2" /> Dashboard
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to='/admin/dashboard/UserDosen' className="text-white">
                                    <FaUsers className="me-2" /> Users
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>

                        <div className="mt-4">
                            <p>Hi, Admin</p>
                            <Button variant="danger" size="sm" onClick={handleLogout}>
                                <FaSignOutAlt className="me-2" /> Logout
                            </Button>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>

                {/* Main Content */}
                <Col className="py-3">
                    {children}
                </Col>
            </Row>
        </Container>
    );
};

export default SidebarComponents;
