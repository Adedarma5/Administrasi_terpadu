import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import FooterEnd from '../components/FooterEnd';
import Footer from '../components/FooterComponents';
import NavbarComponents from '../components/NavbarComponents';

const Berita = () => {

    const beritaData = [
        {
            id: 1,
            title: "PENERIMA SKEMA PENDANAAN RISET DAN INOVASI UNTUK INDONESIA MAJU STARTUP GELOMBANG 1 BAGIAN 2",
            description: "Unduh salinan: Download 20PENDANAAN",
            image: "src/assets/berita2.jpg",
            link: "https://lppm.unimal.ac.id/197-penerima-skema-pendanaan-riset-dan-inovasi-untuk-indonesia-maju-startup-gelombang-1-bagian-2"
        },
        {
            id: 2,
            title: "PENERIMA SKEMA RISET DAN INOVASI UNTUK INDONESIA MAJU EKSPEDISI GELOMBANG II TAHAP I",
            description: "PENERIMA SKEMA RISET DAN INOVASI UNTUK INDONESIA MAJU EKSPEDISI GELOMBANG II TAHAP I Download 20I",
            image: "src/assets/berita_unimal.png",
            link: "https://lppm.unimal.ac.id/189-penerima-skema-riset-dan-inovasi-untuk-indonesia-maju-ekspedisi-gelombang-ii-tahap-i"
        },
        {
            id: 3,
            title: "Pengabdian Masyarakat di Desa Binaan",
            description: "Dosen dan mahasiswa aktif melaksanakan kegiatan pengabdian di berbagai desa.",
            image: "/src/assets/konten 1.jpg",
            link: "https://news.unimal.ac.id/"
        }
    ];
    return (
        <div>
            <NavbarComponents />
            <Container className="my-4">
                <h2 className="text-center mb-4 fw-bold" style={{ color: 'darkblue' }}>
                    Portal Berita
                </h2>
                <Row className="g-4">
                    {beritaData.map((berita) => (
                        <Col key={berita.id} md={4}>
                            <Card className="shadow border-0 ">
                                <Card.Img variant="top" src={berita.image} />
                                <Card.Body>
                                    <Card.Title className="fs-5 fw-bold" style={{ color: 'black' }}>
                                        {berita.title}
                                    </Card.Title>
                                    <Card.Text className="fs-6 text-secondary">
                                        {berita.description}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className="d-flex border-0 justify-content-end">
                                    <Button variant="primary" href={berita.link} target="_blank">
                                        Baca Selengkapnya
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Footer />
            <FooterEnd />
        </div>
    );
}

export default Berita;