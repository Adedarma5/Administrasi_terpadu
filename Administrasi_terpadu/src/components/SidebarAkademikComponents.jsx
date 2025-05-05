import React, { useState, useEffect } from "react";
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
    FaTachometerAlt,
    FaSignOutAlt
} from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AkademikDashboard from "../Kema/AkademikDashboard";

const SidebarAkademikComponents = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleNavigate = () => {
        navigate("/kema");
    };

    const menuItems = [
        { icon: <FaGraduationCap />, title: "MSIB", path: "/akademik/dashboard/Msib/TambahMsib" },
        { icon: <FaBriefcase />, title: "Magang Mandiri", path: "/akademik/dashboard/Magangmandiri/TambahMagangMandiri" },
        { icon: <FaTrophy />, title: "Prestasi", path: "/akademik/dashboard/Prestasi/TambahPrestasi" },
        { icon: <FaLaptopCode />, title: "Kerja Praktik", path: "/akademik/dashboard/KerjaPraktik/TambahKerjaPraktik" },
        { icon: <FaBook />, title: "Tugas Akhir", path: "/akademik/dashboard/TugasAkhir/TambahTugasAkhir" },
        { icon: <FaUniversity />, title: "Student Mobility", path: "/akademik/dashboard/Pmm/TambahPmm" },
        { icon: <FaUserGraduate />, title: "Alumni", path: "/akademik/dashboard/Alumni/TambahAlumni" }
    ];

    const colors = {
        primary: "#212529",
        secondary: "#f3f4f6",
        accent: "#0d6efd",
        activeMenu: "rgba(255, 255, 255, 0.2)",
        text: "#ffffff",
        textDark: "#1f2937",
        menuHover: "rgba(255, 255, 255, 0.1)",
        border: "rgba(255, 255, 255, 0.15)",
    };

    const isActiveRoute = (path) => {
        return location.pathname.startsWith(path);
    };

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
                        className={`text-white d-flex align-items-center py-2 px-3 mt-1 ${
                            location.pathname === "/akademik/dashboard" ? "bg-dark" : ""
                        }`}
                        style={{
                            borderRadius: '4px',
                            margin: '2px 8px',
                            backgroundColor: location.pathname === "/akademik/dashboard" 
                                ? colors.accent 
                                : 'rgba(255,255,255,0.1)',
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
                                className={`text-white d-flex align-items-center py-2 px-3 ${
                                    isActiveRoute(item.path) ? "bg-secondary" : ""
                                }`}
                                style={{
                                    borderRadius: '4px',
                                    margin: '4px 8px',
                                    transition: 'all 0.2s ease',
                                    backgroundColor: isActiveRoute(item.path) 
                                        ? colors.accent 
                                        : 'transparent'
                                }}
                                onMouseOver={(e) => {
                                    if (!isActiveRoute(item.path)) {
                                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                                    }
                                }}
                                onMouseOut={(e) => {
                                    if (!isActiveRoute(item.path)) {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }
                                }}
                            >
                                <span className="me-3">
                                    {item.icon}
                                </span>
                                {!isCollapsed && <span>{item.title}</span>}
                            </Nav.Link>
                        ))}
                    </div>

                    <div className="p-3 mt-auto" style={{ borderTop: `1px solid ${colors.border}` }}>
                        <Button
                            variant="danger"
                            className="w-100 d-flex align-items-center justify-content-center py-2"
                            style={{ borderRadius: '6px', fontSize: '14px' }}
                            onClick={handleNavigate}
                        >
                            <FaSignOutAlt className={isCollapsed ? "" : "me-2"} size={16} />
                            {!isCollapsed && <span>Kembali</span>}
                        </Button>
                    </div>
                </Col>


                <div className="d-md-none w-100 fixed-top shadow-sm" style={{ zIndex: 1040 }}>
                    <div className="d-flex justify-content-between align-items-center p-3 bg-white">
                        <div className="d-flex align-items-center">
                            <img
                                src="/src/assets/unimal.png"
                                height="40"
                                alt="University Logo"
                                className="me-2"
                            />
                            <div className="d-flex flex-column">
                                <span className="fw-bold" style={{ fontSize: '16px', lineHeight: '1' }}>SATU</span>
                                <span className="fw-bold" style={{ fontSize: '18px', lineHeight: '1' }}>AKADEMIK</span>
                            </div>
                        </div>

                        <Button
                            variant="outline-white"
                            onClick={() => setShowOffcanvas(true)}
                            className="d-flex align-items-center justify-content-center"
                            style={{ width: '40px', height: '40px', borderRadius: '8px' }}
                        >
                            <FaBars size={20} />
                        </Button>
                    </div>
                </div>

                <Offcanvas
                    show={showOffcanvas}
                    onHide={() => setShowOffcanvas(false)}
                    placement="end"
                    className="w-75"
                    backdrop="static"
                >
                    <Offcanvas.Header className="bg-dark text-white py-3">
                        <div className="d-flex align-items-center">
                            <img
                                src="/src/assets/unimal.png"
                                width="40"
                                height="40"
                                className="rounded-circle me-2"
                                alt="Logo"
                            />
                            <div>
                                <h5 className="fw-semibold mb-0">Sistem Informasi</h5>
                                <p className="text-info mb-0" style={{ fontSize: '12px' }}>Akademik Terpadu</p>
                            </div>
                        </div>
                        <Button 
                            variant="outline-light" 
                            size="sm"
                            onClick={() => setShowOffcanvas(false)}
                            className="d-flex align-items-center justify-content-center mx-3"
                            style={{ width: '30px', height: '30px', borderRadius: '4px' }}
                        >
                            &times;
                        </Button>
                    </Offcanvas.Header>
                    
                    <Offcanvas.Body className="p-0">
                        <Nav className="flex-column">
                            <Nav.Link
                                as={Link}
                                to="/akademik/dashboard"
                                className={`py-3 px-4 d-flex align-items-center border-bottom ${
                                    location.pathname === "/akademik/dashboard" ? "bg-secondary text-white fw-bold" : ""
                                }`}
                                onClick={() => setShowOffcanvas(false )}
                            >
                                <span className="me-3 text-dark">
                                    <FaTachometerAlt size={18} className="text-white"/>
                                </span>
                                Dashboard
                            </Nav.Link>
                            
                            {menuItems.map((item, index) => (
                                <Nav.Link
                                    key={index}
                                    as={Link}
                                    to={item.path}
                                    className={`py-3 px-4 d-flex align-items-center border-bottom ${
                                        isActiveRoute(item.path) ? "bg-secondary text-white fw-bold" : ""
                                    }`}
                                    onClick={() => setShowOffcanvas(false)}
                                >
                                    <span className={`me-3 ${isActiveRoute(item.path) ? "text-white" : ""}`}>
                                        {item.icon}
                                    </span>
                                    {item.title}
                                </Nav.Link>
                            ))}
                            
                            <div className="p-3 mt-2">
                                <Button
                                    onClick={() => {
                                        setShowOffcanvas(false);
                                        handleNavigate();
                                    }}
                                    variant="danger"
                                    className="w-100 py-2 d-flex align-items-center justify-content-center"
                                    style={{ borderRadius: '6px' }}
                                >
                                    <FaSignOutAlt className="me-2" /> Kembali
                                </Button>
                            </div>
                        </Nav>
                    </Offcanvas.Body>
                </Offcanvas>

                <Col
                    className={`min-vh-100 ${isMobile ? 'p-0' : 'ps-0 pe-3'}`}
                    style={{
                        marginLeft: isMobile ? '0' : (isCollapsed ? '80px' : '260px'),
                        transition: "margin-left 0.3s ease",
                        width: isMobile ? '100%' : (isCollapsed ? 'calc(100% - 80px)' : 'calc(100% - 260px)'),
                        marginTop: isMobile ? '70px' : '0'
                    }}
                >
                    <div className="container-fluid py-3">
                        <div className="row">
                            <div className="col-12">
                                {location.pathname === "/akademik/dashboard" ? <AkademikDashboard /> : children}
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default SidebarAkademikComponents;