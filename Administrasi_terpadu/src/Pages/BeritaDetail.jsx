import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import NavbarComponents from '../components/NavbarComponents';
import Footer from '../components/FooterComponents';
import FooterEnd from '../components/FooterEnd';

const BeritaDetail = () => {
    const location = useLocation();
    const { judul, nama, tahun, sumber_dana } = location.state || {};
    const [nidn, setNidn] = useState('');
    const [dosenList, setDosenList] = useState([]);
    const navigate = useNavigate();

    const sumberDanaLabel = {
        "02": "PNBP",
        "03": "ADB",
    };

    useEffect(() => {
        fetchDosen();
        console.log("STATE:", location.state);
    }, []);

    const fetchDosen = async () => {
        try {
            const response = await fetch('http://localhost:5000/dosen');
            const data = await response.json();
            setDosenList(data);

            const dosen = data.find((d) => {
                const cleanName = d.name.toLowerCase().replace(/\s+/g, ' ').trim();
                const cleanNamaInput = nama.toLowerCase().replace(/\s+/g, ' ').trim();
                return cleanName.includes(cleanNamaInput) || cleanNamaInput.includes(cleanName);
            });

            if (dosen) {
                setNidn(dosen.nidn || dosen.nip || '-');
            }
        } catch (error) {
            console.error('Gagal mengambil data dosen:', error);
        }
    };

    return (
        <div>
            <NavbarComponents />
            <Container className="my-5">
                <Row className="justify-content-center">
                    <Col md={10}>
                        <Image
                            src="/assets/bg-si.png"
                            alt="Berita"
                            style={{ maxHeight: '500px', width: '100%', objectFit: 'cover' }}
                            className="mb-4"
                        />
                        <h2 className="fw-bold text-dark mb-3">{judul}</h2>
                        <p className="text-secondary fs-5 mb-1">Oleh: {nama}</p>
                        <p className="text-muted mb-1">NIDN: {nidn}</p>
                        <p className="text-muted mb-1">Tahun: {tahun || '-'}</p>
                        <p className="text-muted mb-3">Sumber Dana: {sumberDanaLabel[sumber_dana] || '-'}</p>
                        <hr />
                        <div className="fs-6" style={{ lineHeight: '1.8' }}>
                            <p>
                                Penelitian ini merupakan bagian dari program unggulan yang didanai oleh sumber dana pilihan.
                                Topik yang diangkat bertujuan untuk memberikan kontribusi terhadap perkembangan ilmu pengetahuan
                                dan teknologi di lingkungan Universitas Malikussaleh.
                            </p>
                            <p>
                                Dosen yang terlibat telah melakukan riset mendalam serta pengembangan inovatif sesuai dengan
                                bidang keahlian masing-masing. Harapannya, hasil dari penelitian ini dapat dimanfaatkan
                                dalam pengajaran, pengabdian kepada masyarakat, serta publikasi ilmiah bereputasi.
                            </p>
                        </div>
                        <Button
                            variant="primary"
                            onClick={() => navigate('/berita')}
                        >
                            Kembali
                        </Button>
                    </Col>
                </Row>
            </Container>
            <Footer />
            <FooterEnd />
        </div>
    );
};

export default BeritaDetail;
