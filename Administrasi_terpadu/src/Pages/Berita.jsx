import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import FooterEnd from '../components/FooterEnd';
import Footer from '../components/FooterComponents';
import NavbarComponents from '../components/NavbarComponents';

const Berita = () => {
    const [beritaPenelitian, setBeritaPenelitian] = useState([]);
    const [dosenList, setDosenList] = useState([]);
    const [tahun, setTahun] = useState("2024");
    const [sumberDana, setSumberDana] = useState("02");

    const navigate = useNavigate();

    useEffect(() => {
        fetchDosen();
    }, []);

    useEffect(() => {
        if (dosenList.length > 0) {
            fetchBeritaPenelitian();
        }
    }, [tahun, sumberDana, dosenList]);

    const fetchDosen = async () => {
        try {
            const response = await fetch('http://localhost:5000/dosen');
            const data = await response.json();
            setDosenList(data);
        } catch (error) {
            console.error("Gagal fetch dosen:", error);
        }
    };

    const fetchBeritaPenelitian = async () => {
        try {
            const url = `http://localhost:5000/proxy-sipp/${tahun}/01/${sumberDana}`;
            const response = await axios.get(url);
            const dataSIPP = response.data;

            const filtered = dataSIPP.filter((item) => {
                const matchByNip = dosenList.some((d) => d.nip === item.usul_pegawai);

                const namaSIPP = `${item.td_nama_depan} ${item.td_nama_tengah} ${item.td_nama_belakang}`
                    .toLowerCase()
                    .replace(/\s+/g, " ")
                    .replace(/(s\.t\.?|m\.kom|,|\.)/gi, "")
                    .trim();

                const matchByName = dosenList.some((d) => {
                    const namaDosen = d.name
                        .toLowerCase()
                        .replace(/(prof\.?|dr\.?|ir\.?|s\.t\.?|m\.kom|ipu|asean eng|,|\.)/gi, "")
                        .replace(/\s+/g, " ")
                        .trim();

                    return namaDosen.includes(namaSIPP) || namaSIPP.includes(namaDosen);
                });

                return matchByNip || matchByName;
            });

            setBeritaPenelitian(filtered);
        } catch (error) {
            console.error("Gagal fetch berita penelitian:", error);
        }
    };

    return (
        <div>
            <NavbarComponents />
            <Container className="my-4">
                <h2 className="text-center mb-4 fw-bold text-uppercase" style={{ color: 'darkblue' }}>
                    Portal Berita
                </h2>

                <Row className="mb-4 justify-content-end">
                    <Col md="auto">
                        <Form.Select value={tahun} onChange={(e) => setTahun(e.target.value)} className="me-2">
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                        </Form.Select>
                    </Col>
                    <Col md="auto">
                        <Form.Select value={sumberDana} onChange={(e) => setSumberDana(e.target.value)}>
                            <option value="02">PNBP</option>
                            <option value="03">ADB</option>
                        </Form.Select>
                    </Col>
                </Row>

                <Row className="g-4">
                    {beritaPenelitian.length === 0 ? (
                        <p className="text-center text-muted">
                            Tidak ada berita tersedia untuk kombinasi tahun dan sumber dana ini.
                        </p>
                    ) : (
                        beritaPenelitian.map((item, index) => {
                            const nama = `${item.td_nama_depan} ${item.td_nama_tengah} ${item.td_nama_belakang}`
                                .replace(/\s+/g, " ")
                                .trim();

                            return (
                                <Col key={index} md={4}>
                                    <Card className="shadow border-0">
                                        <Card.Img
                                            variant="top"
                                            src="/assets/bg-si.png"
                                            className="card-image-small"
                                            style={{
                                                maxHeight: '180px',
                                                objectFit: 'cover',
                                                width: '100%',
                                            }}
                                        />
                                        <Card.Body>
                                            <Card.Title
                                                className="fs-5 fw-bold"
                                                style={{
                                                    color: 'black',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 4,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >
                                                {item.usul_judul}
                                            </Card.Title>
                                            <Card.Text className="fs-6 text-secondary">Oleh: {nama}</Card.Text>
                                        </Card.Body>
                                        <Card.Footer className="d-flex border-0 justify-content-end">
                                            <Button
                                                variant="primary"
                                                onClick={() =>
                                                    navigate('/beritadetail', {
                                                        state: {
                                                            judul: item.usul_judul,
                                                            nama: nama,
                                                            tahun: tahun,            
                                                            sumber_dana: sumberDana
                                                        },
                                                    })
                                                }
                                            >
                                                Baca Selengkapnya
                                            </Button>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            );
                        })
                    )}
                </Row>
            </Container>
            <Footer />
            <FooterEnd />
        </div >
    );
};

export default Berita;
