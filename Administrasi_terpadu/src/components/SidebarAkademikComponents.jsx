import React, { useState } from "react";
import { Container, Row, Col, Nav, Button, Offcanvas, Card } from "react-bootstrap";
import {
    FaBars,
    FaGraduationCap,
    FaBriefcase,
    FaTrophy,
    FaLaptopCode,
    FaBook,
    FaUniversity,
    FaStore,
    FaUserGraduate,
    FaTachometerAlt
} from "react-icons/fa";
import { Link } from "react-router-dom";
import AkademikDashboard from "../Kema/AkademikDashboard";

const SidebarAkademikComponents = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const menuItems = [
        { icon: <FaGraduationCap />, title: "MSIB", path: "/akademik/dashboard/Msib/TambahMsib" },
        { icon: <FaBriefcase />, title: "Magang Mandiri", path: "/akademik/dashboard/Magangmandiri/TambahMagangMandiri" },
        { icon: <FaTrophy />, title: "Prestasi", path: "/akademik/dashboard/Prestasi/TambahPrestasi" },
        { icon: <FaLaptopCode />, title: "Kerja Praktik", path: "/akademik/dashboard/KerjaPraktik/TambahKerjaPraktik" },
        { icon: <FaBook />, title: "Tugas Akhir", path: "/akademik/dashboard/TugasAkhir/TambahTugasAkhir" },
        { icon: <FaUniversity />, title: "PMM", path: "/akademik/dashboard/Pmm/TambahPmm" },
        // { icon: <FaStore />, title: "Kewirausahaan", path: "/akademik/dashboard/Kewirausahaan/TambahKewirausahaan" },
        { icon: <FaUserGraduate />, title: "Alumni", path: "/akademik/dashboard/Alumni/TambahAlumni" }
    ];

    

    return (
        <Container fluid className="p-0">
            <Row className="g-0">
                <Col
                    className="d-none d-md-flex flex-column bg-dark text-white min-vh-100 shadow-sm position-fixed"
                    style={{
                        width: isCollapsed ? '80px' : '260px',
                        transition: "width 0.3s ease",
                        zIndex: 1030
                    }}
                >
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
                                <div className="fw-bold" style={{ fontSize: '14px' }}>Sistem Informasi</div>
                                <div className="text-info" style={{ fontSize: '12px' }}>Akademik Terpadu</div>
                            </div>
                        )}
                    </div>

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

                    <Nav.Link
                        as={Link}
                        to="/akademik/dashboard"
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


                    <div className="overflow-auto flex-grow-1 " style={{ maxHeight: 'calc(100vh - 170px)' }}>
                        {menuItems.map((item, index) => (
                            <Nav.Link
                                key={index}
                                as={Link}
                                to={item.path}
                                className="text-white d-flex align-items-center py-2 px-3"
                                style={{
                                    borderRadius: '4px',
                                    margin: '4px 8px',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <span className="me-3">
                                    {item.icon}
                                </span>
                                {!isCollapsed && <span>{item.title}</span>}
                            </Nav.Link>
                        ))}
                    </div>
                </Col>

                <div className="d-md-none w-100 fixed-top" style={{ zIndex: 1040 }}>
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

                        <Button
                            variant="light"
                            onClick={() => setShowOffcanvas(true)}
                            className="border-0"
                        >
                            <FaBars size={24} />
                        </Button>
                    </div>
                </div>

                <Offcanvas
                    show={showOffcanvas}
                    onHide={() => setShowOffcanvas(false)}
                    placement="end"
                    className="w-75"
                >
                    <Offcanvas.Header closeButton className="bg-dark text-white">
                        <Offcanvas.Title className="fw-bold">Menu</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="p-0">
                        <Nav className="flex-column">
                            {menuItems.map((item, index) => (
                                <Nav.Link
                                    key={index}
                                    as={Link}
                                    to={item.path}
                                    className="py-3 px-4 d-flex align-items-center border-bottom text-dark"
                                    onClick={() => setShowOffcanvas(false)}
                                >
                                    <span className="me-3">{item.icon}</span> {item.title}
                                </Nav.Link>
                            ))}
                        </Nav>
                    </Offcanvas.Body>
                </Offcanvas>

                <Col
                    className={`min-vh-100 ${window.innerWidth < 768 ? 'p-0' : 'ps-0 pe-3'}`}
                    style={{
                        marginLeft: window.innerWidth < 768 ? '0' : (isCollapsed ? '80px' : '260px'),
                        transition: "margin-left 0.3s ease",
                        width: window.innerWidth < 768 ? '100%' : (isCollapsed ? 'calc(100% - 80px)' : 'calc(100% - 260px)'),
                        marginTop: window.innerWidth < 768 ? '60px' : '0'
                    }}
                >
                    <div className="container-fluid py-3">
                        <div className="row">
                            <div className="col-12">
                                {window.location.pathname === "/akademik/dashboard" ? <AkademikDashboard /> : children}
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default SidebarAkademikComponents;
