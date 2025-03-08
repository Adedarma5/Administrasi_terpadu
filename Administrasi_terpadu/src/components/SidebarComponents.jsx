import React, { useState } from "react";
import { Container, Row, Col, Nav, Collapse, Button } from "react-bootstrap";
import { FaBook, FaUsers, FaChevronDown, FaCalendarCheck, FaClipboardList   } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const SidebarComponents = ({ children }) => {
    const [openAkademik, setOpenAkademik] = useState(false);
    const [OpenKegiatanMahasiswa, setOpenKegiatanMahasiswa] = useState(false);

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/Login")
    };

    return (
        <Container fluid>
            <Row className="flex-nowrap">
                <Col xs={12} sm={3} md={3} lg={2} className="px-1 bg-dark">
                    <div className="d-flex flex-column pt-3 text-white min-vh-100">
                        <div className="d-flex align-items-center mb-1 px-3 text-center">
                            <img
                                alt=""
                                src="/src/assets/unimal.png"
                                width="60"
                                height="60"
                            /> Sistem Informasi Administrasi Terpadu
                        </div>

                        <Nav className="flex-column">
                            <Nav.Item>
                                <Nav.Link as={Link} to="/admin/dashboard" className="text-white text-center fs-5">
                                    <hr className="border-2 "></hr>
                                    <span>Dashboard</span>

                                </Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link onClick={() => setOpenAkademik(!openAkademik)} className="text-white d-flex align-items-center py-2" style={{ cursor: "pointer" }}>
                                    <FaBook className="me-2" />
                                    <span>Akademik</span>
                                    <FaChevronDown className="ms-auto" style={{ fontSize: '1em' }} />
                                </Nav.Link>
                                <Collapse in={openAkademik}>
                                    <div className="ms-4">
                                        <Nav.Link as={Link} to="/admin/dashboard/MataKuliah" className="text-white py-1">Mata Kuliah</Nav.Link>
                                        <Nav.Link as={Link} to="/admin/dashboard/BahanAjar" className="text-white py-1">Bahan Ajar</Nav.Link>
                                        <Nav.Link as={Link} to="/admin/dashboard/Dosen" className="text-white py-1">Dosen</Nav.Link>
                                        <Nav.Link as={Link} to="/admin/dashboard/Penelitian" className="text-white py-1">Penelitian</Nav.Link>
                                        <Nav.Link as={Link} to="/admin/dashboard/Pengabdian" className="text-white py-1">Pengabdian</Nav.Link>
                                        <Nav.Link as={Link} to="/admin/dashboard/Pengajaran" className="text-white py-1">Pengajaran</Nav.Link>
                                    </div>
                                </Collapse>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link onClick={() => setOpenKegiatanMahasiswa(!OpenKegiatanMahasiswa)} className="text-white d-flex align-items-center py-2" style={{ cursor: "pointer" }}>
                                    <FaClipboardList className="me-2" />
                                    <span>Kegiatan Mahasiswa</span>
                                    <FaChevronDown className="ms-auto" style={{ fontSize: '1em' }}/>
                                </Nav.Link>
                                <Collapse in={OpenKegiatanMahasiswa}>
                                    <div className="ms-4">
                                        <Nav.Link as={Link} to="/admin/dashboard/Msib" className="text-white py-1">MSIB</Nav.Link>
                                        <Nav.Link as={Link} to="/admin/dashboard/Magangmandiri" className="text-white py-1">Magang Mandiri</Nav.Link>
                                        <Nav.Link as={Link} to="/admin/dashboard/Prestasi" className="text-white py-1">Prestasi</Nav.Link>
                                        <Nav.Link as={Link} to="/admin/dashboard/Kerjapraktik" className="text-white py-1">Kerja Praktik</Nav.Link>
                                        <Nav.Link as={Link} to="/admin/dashboard/kkn" className="text-white py-1">KKN</Nav.Link>
                                        <Nav.Link as={Link} to="/admin/dashboard/Tugasakhir" className="text-white py-1">Tugas Akhir</Nav.Link>
                                    </div>
                                </Collapse>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link as={Link} to='/admin/dashboard/Absensi' className="text-white d-flex align-items-center py-2" style={{ cursor: "pointer" }}>
                                    <FaCalendarCheck  className="me-2" />
                                    <span>Absensi</span>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to='/admin/dashboard/UserDosen' className="text-white d-flex align-items-center py-2" style={{ cursor: "pointer" }}>
                                    <FaUsers  className="me-2" />
                                    <span>Users</span>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                    <Button onClick={handleNavigate} className="mb-3 ms-2">Keluar</Button>
                </Col>

                <Col className="py-3">
                    {children}
                </Col>
            </Row>
        </Container>
    );
};

export default SidebarComponents;
