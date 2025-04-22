import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import FooterEnd from '../components/FooterEnd';
import Footer from '../components/FooterComponents';
import NavbarComponents from '../components/NavbarComponents';

const Berita = () => {
    return (
        <div>
            <NavbarComponents />
            <Container className="my-4">
                <h2 className="text-center mb-4 fw-bold" style={{ color: 'darkblue'}}>Portal Berita</h2>
                    <Col md={4}>
                        <Card className="shadow-sm">
                            <Card.Img variant="top" src="src/assets/konten 1.jpg" />
                            <Card.Body>
                                <Card.Title className="fs-5 fw-bold"style={{ color: 'darkblue'}}>Kolaborasi Internasional dalam Penelitian</Card.Title>
                                <Card.Text className="fs-6 text-secondary">
                                    Universitas Malikussaleh menjalin kerja sama dengan institusi luar negeri untuk memperluas cakupan riset.
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="d-flex border-0 justify-content-end">
                                <Button variant="primary" href='https://news.unimal.ac.id/'>Baca Selengkapnya</Button>
                            </Card.Footer>
                        </Card>
                </Col>
            </Container>
            <Footer />
            <FooterEnd />
        </div>
    );
}

export default Berita;