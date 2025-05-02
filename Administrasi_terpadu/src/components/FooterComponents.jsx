import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import {
    FaFacebookF,
    FaTwitter,
    FaGoogle,
    FaInstagram,
    FaHome,
    FaEnvelope,
    FaPhone,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-dark text-white ">
            <div className=" py-4 " style={{ backgroundColor: 'darkblue'}}>
                <Container className="d-flex justify-content-between align-items-center">
                    <span>Ayo ikuti media sosial kami :</span>
                    <div>
                        <a href="#!" className="text-white me-3"><FaFacebookF /></a>
                        <a href="#!" className="text-white me-3"><FaTwitter /></a>
                        <a href="#!" className="text-white me-3"><FaGoogle /></a>
                        <a href="#!" className="text-white me-3"><FaInstagram /></a>
                    </div>
                </Container>
            </div>

            <Container className="py-5">
                <Row className="text-start">
                    <Col md={1} lg={4} className="mb-2 ">
                        <h6 className="text-uppercase fw-bold">Sistem Informasi</h6>
                        <hr className="mb-4 mt-0 bg-primary" style={{ width: "60px", height: "2px" }} />
                        <Image src="src/assets/unimal.png" rounded style={{ width: '20%', marginRight: '25px' }}/>
                        <Image src="src/assets/merdeka.png" rounded style={{ width: '20%', marginRight: '25px' }}/>
                        <Image src="src/assets/tutwuri.png" rounded style={{ width: '20%', marginRight: '25px' }}/>
                        <p className="ms-2 mt-2">Sistem Informasi Administrasi Terpadu</p>
                    </Col>

                    <Col md={2} lg={2} className="mb-4 ms-4 ">
                        <h6 className="text-uppercase fw-bold">Menu</h6>
                        <hr className="mb-4 mt-0 bg-primary" style={{ width: "60px", height: "2px" }} />
                        <ul className="list-unstyled">
                            <li><a href="/Home" className="text-white text-decoration-none">Home</a></li>
                            <li><a href="#program" className="text-white text-decoration-none">Program</a></li>
                            <li><a href="/About" className="text-white text-decoration-none">About</a></li>
                            <li><a href="/Kemahasiswaan" className="text-white text-decoration-none">Kemahasiswaan</a></li>
                            <li><a href="/TenagaPengajar" className="text-white text-decoration-none">Tenaga Pengajar</a></li>
                        </ul>
                    </Col>

                    <Col md={2} lg={2} className="mb-4 ms-4">
                        <h6 className="text-uppercase fw-bold">Fiturs</h6>
                        <hr className="mb-4 mt-0 bg-primary" style={{ width: "60px", height: "2px" }} />
                        <ul className="list-unstyled">
                            <li><a href="/Login" className="text-white text-decoration-none">Akademik</a></li>
                            <li><a href="/Kema" className="text-white text-decoration-none">Kegiatan Mahasiswa</a></li>
                            <li><a href="/Berita" className="text-white text-decoration-none">Berita</a></li>
                            <li><a href="/Login" className="text-white text-decoration-none">Login</a></li>
                        </ul>
                    </Col>


                    <Col md={4} lg={3} className="mb-4 ms-4">
                        <h6 className="text-uppercase fw-bold">Hubungi Kami</h6>
                        <hr className="mb-4 mt-0 bg-primary" style={{ width: "60px", height: "2px" }} />
                        <ul className="list-unstyled">
                            <li><FaHome className="me-2" />Jalan Batam, Bukit Indah </li>
                            <li><FaEnvelope className="me-2" />sisteminformasi@unimal.ac.id</li>
                            <li><FaPhone className="me-2" />+01 234 567 88</li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
