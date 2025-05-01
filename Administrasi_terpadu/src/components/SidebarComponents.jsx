import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Nav, Collapse, Button, Offcanvas } from "react-bootstrap";
import {
  FaBook,
  FaUsers,
  FaChevronDown,
  FaCalendarCheck,
  FaClipboardList,
  FaBars,
  FaSignOutAlt,
  FaHome,
  FaNewspaper,
  FaTachometerAlt
} from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AdminDashboard from "../Dasboard/AdminDashboard";
import ProtectedMenu from "./ProtectedMenu";

const SidebarComponents = ({ children }) => {
  const [role, setRole] = useState("");
  const [openAkademik, setOpenAkademik] = useState(false);
  const [openKegiatanMahasiswa, setOpenKegiatanMahasiswa] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    setRole(userRole);
  }, []);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);




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



  const isActive = (path) => {
    return location.pathname === path;
  };

  const isSubMenuActive = (basePath) => {
    return location.pathname.startsWith(basePath);
  };

  const handleLogout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout", { withCredentials: true });
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Logout gagal:", error);
    }
  };

  const navLinkStyle = (active = false) => ({
    borderRadius: '6px',
    margin: '3px 8px',
    padding: '10px 16px',
    transition: 'all 0.2s ease',
    fontSize: '14px',
    fontWeight: '500',
    backgroundColor: active ? colors.activeMenu : 'transparent',
    '&:hover': {
      backgroundColor: colors.menuHover,
    }
  });

  const subMenuLinkStyle = (active = false) => ({
    padding: '8px 16px',
    paddingLeft: '40px',
    fontSize: '13px',
    transition: 'all 0.2s ease',
    backgroundColor: active ? colors.activeMenu : 'transparent',
  });

  return (
    <Container fluid className="p-0">
      <Row className="g-0">
        <Col
          className="d-none d-md-flex flex-column min-vh-100 shadow-sm position-fixed"
          style={{
            width: isCollapsed ? '70px' : '250px',
            transition: "all 0.3s ease",
            zIndex: 1030,
            backgroundColor: colors.primary,
          }}
        >
          <div className="d-flex align-items-center p-3 border-bottom" style={{ borderColor: colors.border }}>
            <img
              src="/src/assets/unimal.png"
              width="40"
              height="40"
              className="rounded-circle"
              alt="Logo"
            />
            {!isCollapsed && (
              <div className="ms-2 text-white">
                <div className="fw-bold" style={{ fontSize: '14px' }}>Sistem Informasi</div>
                <div style={{ fontSize: '12px', color: colors.accent }}>Akademik Terpadu</div>
              </div>
            )}
          </div>


          <div className="d-flex flex-column" style={{ height: 'calc(100vh - 72px)' }}>

            <div className="d-flex justify-content-end p-2">
              <Button
                variant="outline-light"
                size="sm"
                className="d-flex align-items-center justify-content-center p-1"
                style={{ width: '28px', height: '28px', borderRadius: '4px', border: `1px solid ${colors.border}` }}
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                <FaBars size={12} />
              </Button>
            </div>


            <div className="flex-grow-1 overflow-auto" style={{ scrollbarWidth: 'thin' }}>
              <Nav.Link
                as={Link}
                to="/admin/dashboard"
                className="text-white d-flex align-items-center"
                style={{
                  ...navLinkStyle(isActive('/admin/dashboard')),
                  backgroundColor: isActive('/admin/dashboard') ? colors.activeMenu : 'transparent',
                }}
              >
                <FaTachometerAlt className={isCollapsed ? "mx-auto" : "me-3"} size={16} />
                {!isCollapsed && <span>Dashboard</span>}
              </Nav.Link>

              <div className="mt-2 mb-2" style={{ borderTop: `1px solid ${colors.border}` }}></div>

              <Nav.Item>
                <Nav.Link
                  onClick={() => setOpenAkademik(!openAkademik)}
                  className="text-white d-flex align-items-center"
                  style={{
                    ...navLinkStyle(isSubMenuActive('/admin/dashboard/Dosen') ||
                      isSubMenuActive('/admin/dashboard/MataKuliah') ||
                      isSubMenuActive('/admin/dashboard/Rps') ||
                      isSubMenuActive('/admin/dashboard/KontrakKuliah') ||
                      isSubMenuActive('/admin/dashboard/BahanAjar') ||
                      isSubMenuActive('/admin/dashboard/Penelitian') ||
                      isSubMenuActive('/admin/dashboard/Pengabdian') ||
                      isSubMenuActive('/admin/dashboard/Pengajaran')),
                  }}
                >
                  <FaBook className={isCollapsed ? "mx-auto" : "me-3"} size={16} />
                  {!isCollapsed && <span>Akademik</span>}
                  {!isCollapsed && (
                    <FaChevronDown
                      className="ms-auto"
                      size={12}
                      style={{
                        transform: openAkademik ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }}
                    />
                  )}

                </Nav.Link>
                <Collapse in={openAkademik}>
                  <div className={isCollapsed ? "d-none" : ""}>
                    {role === "admin" && (
                      <Nav.Link
                        as={Link}
                        to="/admin/dashboard/Dosen"
                        className="text-white"
                        style={{
                          ...subMenuLinkStyle(isActive('/admin/dashboard/Dosen')),
                          backgroundColor: isActive('/admin/dashboard/Dosen') ? colors.activeMenu : 'transparent',
                        }}
                      >
                        Dosen
                      </Nav.Link>
                    )}

                    <Nav.Link
                      as={Link}
                      to="/admin/dashboard/MataKuliah"
                      className="text-white"
                      style={{
                        ...subMenuLinkStyle(isActive('/admin/dashboard/MataKuliah')),
                        backgroundColor: isActive('/admin/dashboard/MataKuliah') ? colors.activeMenu : 'transparent',
                      }}
                    >
                      Mata Kuliah
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/admin/dashboard/Rps"
                      className="text-white"
                      style={{
                        ...subMenuLinkStyle(isActive('/admin/dashboard/Rps')),
                        backgroundColor: isActive('/admin/dashboard/Rps') ? colors.activeMenu : 'transparent',
                      }}
                    >
                      RPS
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/admin/dashboard/KontrakKuliah"
                      className="text-white"
                      style={{
                        ...subMenuLinkStyle(isActive('/admin/dashboard/KontrakKuliah')),
                        backgroundColor: isActive('/admin/dashboard/KontrakKuliah') ? colors.activeMenu : 'transparent',
                      }}
                    >
                      Kontrak Kuliah
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/admin/dashboard/BahanAjar"
                      className="text-white"
                      style={{
                        ...subMenuLinkStyle(isActive('/admin/dashboard/BahanAjar')),
                        backgroundColor: isActive('/admin/dashboard/BahanAjar') ? colors.activeMenu : 'transparent',
                      }}
                    >
                      Bahan Ajar
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/admin/dashboard/Penelitian"
                      className="text-white"
                      style={{
                        ...subMenuLinkStyle(isActive('/admin/dashboard/Penelitian')),
                        backgroundColor: isActive('/admin/dashboard/Penelitian') ? colors.activeMenu : 'transparent',
                      }}
                    >
                      Penelitian
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/admin/dashboard/Pengabdian"
                      className="text-white"
                      style={{
                        ...subMenuLinkStyle(isActive('/admin/dashboard/Pengabdian')),
                        backgroundColor: isActive('/admin/dashboard/Pengabdian') ? colors.activeMenu : 'transparent',
                      }}
                    >
                      Pengabdian
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/admin/dashboard/Pengajaran"
                      className="text-white"
                      style={{
                        ...subMenuLinkStyle(isActive('/admin/dashboard/Pengajaran')),
                        backgroundColor: isActive('/admin/dashboard/Pengajaran') ? colors.activeMenu : 'transparent',
                      }}
                    >
                      Pengajaran
                    </Nav.Link>
                  </div>
                </Collapse>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to='/admin/dashboard/Absensi'
                  className="text-white d-flex align-items-center"
                  style={{
                    ...navLinkStyle(isActive('/admin/dashboard/Absensi')),
                    backgroundColor: isActive('/admin/dashboard/Absensi') ? colors.activeMenu : 'transparent',
                  }}
                >
                  <FaCalendarCheck className={isCollapsed ? "mx-auto" : "me-3"} size={16} />
                  {!isCollapsed && <span>Absensi</span>}
                </Nav.Link>
              </Nav.Item>


              <Nav.Item>
                <ProtectedMenu role={role} allowedRoles={'admin'}>
                  <Nav.Link
                    onClick={() => setOpenKegiatanMahasiswa(!openKegiatanMahasiswa)}
                    className="text-white d-flex align-items-center"
                    style={{
                      ...navLinkStyle(isSubMenuActive('/admin/dashboard/Msib') ||
                        isSubMenuActive('/admin/dashboard/Magangmandiri') ||
                        isSubMenuActive('/admin/dashboard/Prestasi') ||
                        isSubMenuActive('/admin/dashboard/KerjaPraktik') ||
                        isSubMenuActive('/admin/dashboard/TugasAkhir') ||
                        isSubMenuActive('/admin/dashboard/Pmm') ||
                        isSubMenuActive('/admin/dashboard/Kewirausahaan') ||
                        isSubMenuActive('/admin/dashboard/Alumni')),
                    }}
                  >
                    <FaClipboardList className={isCollapsed ? "mx-auto" : "me-3"} size={16} />
                    {!isCollapsed && <span>Kegiatan Mahasiswa</span>}
                    {!isCollapsed && (
                      <FaChevronDown
                        className="ms-auto"
                        size={12}
                        style={{
                          transform: openKegiatanMahasiswa ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s ease'
                        }}
                      />
                    )}
                  </Nav.Link>
                </ProtectedMenu>



                <Collapse in={openKegiatanMahasiswa}>
                  <div className={isCollapsed ? "d-none" : ""}>
                    <Nav.Link
                      as={Link}
                      to="/admin/dashboard/Msib"
                      className="text-white"
                      style={{
                        ...subMenuLinkStyle(isActive('/admin/dashboard/Msib')),
                        backgroundColor: isActive('/admin/dashboard/Msib') ? colors.activeMenu : 'transparent',
                      }}
                    >
                      MSIB
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/admin/dashboard/Magangmandiri"
                      className="text-white"
                      style={{
                        ...subMenuLinkStyle(isActive('/admin/dashboard/Magangmandiri')),
                        backgroundColor: isActive('/admin/dashboard/Magangmandiri') ? colors.activeMenu : 'transparent',
                      }}
                    >
                      Magang Mandiri
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/admin/dashboard/Prestasi"
                      className="text-white"
                      style={{
                        ...subMenuLinkStyle(isActive('/admin/dashboard/Prestasi')),
                        backgroundColor: isActive('/admin/dashboard/Prestasi') ? colors.activeMenu : 'transparent',
                      }}
                    >
                      Prestasi
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/admin/dashboard/KerjaPraktik"
                      className="text-white"
                      style={{
                        ...subMenuLinkStyle(isActive('/admin/dashboard/KerjaPraktik')),
                        backgroundColor: isActive('/admin/dashboard/KerjaPraktik') ? colors.activeMenu : 'transparent',
                      }}
                    >
                      Kerja Praktik
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/admin/dashboard/TugasAkhir"
                      className="text-white"
                      style={{
                        ...subMenuLinkStyle(isActive('/admin/dashboard/TugasAkhir')),
                        backgroundColor: isActive('/admin/dashboard/TugasAkhir') ? colors.activeMenu : 'transparent',
                      }}
                    >
                      Tugas Akhir
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/admin/dashboard/Pmm"
                      className="text-white"
                      style={{
                        ...subMenuLinkStyle(isActive('/admin/dashboard/Pmm')),
                        backgroundColor: isActive('/admin/dashboard/Pmm') ? colors.activeMenu : 'transparent',
                      }}
                    >
                      PMM
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/admin/dashboard/Alumni"
                      className="text-white"
                      style={{
                        ...subMenuLinkStyle(isActive('/admin/dashboard/Alumni')),
                        backgroundColor: isActive('/admin/dashboard/Alumni') ? colors.activeMenu : 'transparent',
                      }}
                    >
                      Alumni
                    </Nav.Link>
                  </div>
                </Collapse>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to='/admin/dashboard/UserDosen'
                  className="text-white d-flex align-items-center"
                  style={{
                    ...navLinkStyle(isActive('/admin/dashboard/UserDosen')),
                    backgroundColor: isActive('/admin/dashboard/UserDosen') ? colors.activeMenu : 'transparent',
                  }}
                >
                  <FaUsers className={isCollapsed ? "mx-auto" : "me-3"} size={16} />
                  {!isCollapsed && <span>Users</span>}
                </Nav.Link>
              </Nav.Item>
            </div>


            <div className="p-3 mt-auto" style={{ borderTop: `1px solid ${colors.border}` }}>
              <Button
                variant="danger"
                className="w-100 d-flex align-items-center justify-content-center py-2"
                style={{ borderRadius: '6px', fontSize: '14px' }}
                onClick={handleLogout}
              >
                <FaSignOutAlt className={isCollapsed ? "" : "me-2"} size={16} />
                {!isCollapsed && <span>Logout</span>}
              </Button>
            </div>
          </div>
        </Col>

        <div className="d-md-none w-100 fixed-top" style={{ zIndex: 1040 }}>
          <div className="d-flex justify-content-between align-items-center p-2 bg-white shadow-sm">
            <div className="d-flex align-items-center">
              <img
                src="/src/assets/unimal.png"
                height="36"
                alt="University Logo"
                className="me-2"
              />
              <div className="d-flex flex-column">
                <span style={{ fontSize: '14px', lineHeight: '1', color: colors.textDark }}>SATU</span>
                <span className="fw-bold" style={{ fontSize: '16px', lineHeight: '1', color: colors.primary }}>AKADEMIK</span>
              </div>
            </div>

            <div className="d-flex align-items-center">

              <Button
                variant="light"
                onClick={() => setShowOffcanvas(true)}
                className="border-0 p-1"
              >
                <FaBars size={22} color={colors.primary} />
              </Button>
            </div>
          </div>
        </div>

        <Offcanvas
          show={showOffcanvas}
          onHide={() => setShowOffcanvas(false)}
          placement="end"
          className="w-75"
        >
          <Offcanvas.Header closeButton style={{ backgroundColor: colors.primary, color: colors.text }}>
            <Offcanvas.Title className="fw-bold">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="p-0">
            <Nav className="flex-column">
              <Nav.Link
                as={Link}
                to="/admin/dashboard"
                className="py-3 px-4 d-flex align-items-center border-bottom"
                style={{
                  borderColor: '#e5e7eb',
                  color: colors.textDark,
                  backgroundColor: isActive('/admin/dashboard') ? '#f3f4f6' : 'transparent'
                }}
                onClick={() => setShowOffcanvas(false)}
              >
                <FaTachometerAlt className="me-3" size={16} /> Dashboard
              </Nav.Link>

              <Nav.Link
                onClick={() => {
                  setOpenAkademik(!openAkademik);
                }}
                className="py-3 px-4 d-flex align-items-center border-bottom"
                style={{ borderColor: '#e5e7eb', color: colors.textDark }}
              >
                <FaBook className="me-3" size={16} /> Akademik
                <FaChevronDown
                  className="ms-auto"
                  size={12}
                  style={{
                    transform: openAkademik ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }}
                />
              </Nav.Link>
              <Collapse in={openAkademik}>
                <div>
                  {[
                    { path: "Dosen", label: "Dosen" },
                    { path: "MataKuliah", label: "Mata Kuliah" },
                    { path: "Rps", label: "RPS" },
                    { path: "KontrakKuliah", label: "Kontrak Kuliah" },
                    { path: "BahanAjar", label: "Bahan Ajar" },
                    { path: "Penelitian", label: "Penelitian" },
                    { path: "Pengabdian", label: "Pengabdian" },
                    { path: "Pengajaran", label: "Pengajaran" }
                  ].map(item => (
                    <Nav.Link
                      key={item.path}
                      as={Link}
                      to={`/admin/dashboard/${item.path}`}
                      className="py-2 ps-5 border-bottom"
                      style={{
                        borderColor: '#e5e7eb',
                        color: colors.textDark,
                        fontSize: '14px',
                        backgroundColor: isActive(`/admin/dashboard/${item.path}`) ? '#f3f4f6' : 'transparent'
                      }}
                      onClick={() => setShowOffcanvas(false)}
                    >
                      {item.label}
                    </Nav.Link>
                  ))}
                </div>
              </Collapse>

              <Nav.Link
                as={Link}
                to="/admin/dashboard/Absensi"
                className="py-3 px-4 d-flex align-items-center border-bottom"
                style={{
                  borderColor: '#e5e7eb',
                  color: colors.textDark,
                  backgroundColor: isActive('/admin/dashboard/Absensi') ? '#f3f4f6' : 'transparent'
                }}
                onClick={() => setShowOffcanvas(false)}
              >
                <FaCalendarCheck className="me-3" size={16} /> Absensi
              </Nav.Link>

              <Nav.Link
                onClick={() => {
                  setOpenKegiatanMahasiswa(!openKegiatanMahasiswa);
                }}
                className="py-3 px-4 d-flex align-items-center border-bottom"
                style={{ borderColor: '#e5e7eb', color: colors.textDark }}
              >
                <FaClipboardList className="me-3" size={16} /> Kegiatan Mahasiswa
                <FaChevronDown
                  className="ms-auto"
                  size={12}
                  style={{
                    transform: openKegiatanMahasiswa ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }}
                />
              </Nav.Link>
              <Collapse in={openKegiatanMahasiswa}>
                <div>
                  {[
                    { path: "Msib", label: "MSIB" },
                    { path: "Magangmandiri", label: "Magang Mandiri" },
                    { path: "Prestasi", label: "Prestasi" },
                    { path: "KerjaPraktik", label: "Kerja Praktik" },
                    { path: "TugasAkhir", label: "Tugas Akhir" },
                    { path: "Pmm", label: "PMM" },
                    { path: "Alumni", label: "Alumni" }
                  ].map(item => (
                    <Nav.Link
                      key={item.path}
                      as={Link}
                      to={`/admin/dashboard/${item.path}`}
                      className="py-2 ps-5 border-bottom"
                      style={{
                        borderColor: '#e5e7eb',
                        color: colors.textDark,
                        fontSize: '14px',
                        backgroundColor: isActive(`/admin/dashboard/${item.path}`) ? '#f3f4f6' : 'transparent'
                      }}
                      onClick={() => setShowOffcanvas(false)}
                    >
                      {item.label}
                    </Nav.Link>
                  ))}
                </div>
              </Collapse>

              <Nav.Link
                as={Link}
                to="/admin/dashboard/UserDosen"
                className="py-3 px-4 d-flex align-items-center border-bottom"
                style={{
                  borderColor: '#e5e7eb',
                  color: colors.textDark,
                  backgroundColor: isActive('/admin/dashboard/UserDosen') ? '#f3f4f6' : 'transparent'
                }}
                onClick={() => setShowOffcanvas(false)}
              >
                <FaUsers className="me-3" size={16} /> Users
              </Nav.Link>

              <Button
                onClick={() => {
                  handleLogout();
                  setShowOffcanvas(false);
                }}
                className="py-3 px-4 d-flex align-items-center w-100 text-start rounded-0 border-bottom"
                style={{ borderColor: '#e5e7eb', color: "#dc3545", backgroundColor: "transparent" }}
              >
                <FaSignOutAlt className="me-3" size={16} /> Logout
              </Button>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>

        <Col
          className="d-flex flex-column min-vh-100"
          style={{
            marginLeft: isMobile ? '0' : (isCollapsed ? '70px' : '250px'),
            transition: "margin-left 0.3s ease",
            width: isMobile ? '100%' : (isCollapsed ? 'calc(100% - 70px)' : 'calc(100% - 250px)'),
            marginTop: isMobile ? '60px' : '0'
          }}
        >
          <div className="container-fluid py-3">
            <div className="row">
              {window.location.pathname === "/admin/dashboard" ? <AdminDashboard /> : children}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SidebarComponents;