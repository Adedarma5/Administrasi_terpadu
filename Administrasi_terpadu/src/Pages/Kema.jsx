import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import FooterEnd from '../components/FooterEnd';
import Footer from '../components/FooterComponents';
import NavbarComponents from '../components/NavbarComponents';


const Kema = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <NavbarComponents />
            <Container className="mt-4">
                <div className="row justify-content-center g-4">
                    <div className="col-6 col-sm-6 col-md-4 col-lg-2">
                        <Card className="text-center rounded-4 border-0 shadow card-hover">
                            <Card.Img
                                variant="top"
                                src="src/assets/msib.png"
                                style={{ padding: '15px 6px', width: '60%', margin: 'auto' }}
                            />
                            <Card.Body>
                                <Card.Title style={{ fontSize: '1rem' }}>MSIB</Card.Title>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="col-6 col-sm-6 col-md-4 col-lg-2">
                        <Card className="text-center rounded-4 border-0 shadow card-hover">
                            <Card.Img variant="top" src="src/assets/magang mandiri.png" style={{ padding: '15px 6px', width: '60%', margin: 'auto'}} />
                            <Card.Body>
                                <Card.Title style={{ fontSize: '1rem' }}>Magang Mandiri</Card.Title>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="col-6 col-sm-6 col-md-4 col-lg-2">
                        <Card className="text-center rounded-4 border-0 shadow card-hover">
                            <Card.Img variant="top" src="src/assets/prestasi.png" style={{ padding: '15px 6px', width: '60%', margin: 'auto' }} />
                            <Card.Body>
                                <Card.Title style={{ fontSize: '1rem' }}>Prestasi</Card.Title>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="col-6 col-sm-6 col-md-4 col-lg-2">
                        <Card className="text-center rounded-4 border-0 shadow card-hover">
                            <Card.Img variant="top" src="src/assets/kp.png" style={{ padding: '15px 6px', width: '60%', margin: 'auto'}} />
                            <Card.Body>
                                <Card.Title style={{ fontSize: '1rem' }}>Kerja Praktik</Card.Title>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-6 col-sm-6 col-md-4 col-lg-2">
                        <Card className="text-center rounded-4 border-0 shadow card-hover">
                            <Card.Img variant="top" src="src/assets/kkn.png" style={{ padding: '15px 6px', width: '60%', margin: 'auto'}} />
                            <Card.Body>
                                <Card.Title style={{ fontSize: '1rem' }}>KKN</Card.Title>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="col-6 col-sm-6 col-md-4 col-lg-2">
                        <Card className="text-center rounded-4 border-0 shadow card-hover">
                            <Card.Img variant="top" src="src/assets/tugas akhir.png" style={{padding: '15px 6px', width: '60%', margin: 'auto'}} />
                            <Card.Body>
                                <Card.Title style={{ fontSize: '1rem' }}>Tugas AKhir</Card.Title>
                            </Card.Body>
                        </Card>
                    </div>
                </div>

                <div className="d-flex justify-content-center align-items-center mt-4">
                    <Button className="btn text-light btn-hover" onClick={handleShow}>
                        Mulai Sekarang
                    </Button>
                </div>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Kegiatan Mahasiswa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control
                                type="Nama"
                                placeholder="Nama"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nim</Form.Label>
                            <Form.Control
                                type="Number"
                                placeholder="Nim"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Pilih Kegiatan</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Pilih Kegiatan"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Program yang di ikuti</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Kategori Kegiatan"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Judul Laporan</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Kategori Kegiatan"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>File Laporan dan Projek</Form.Label>
                            <Form.Control
                                type="file"
                                placeholder="pilih file"
                                accept='pdf'
                                autoFocus />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Kembali
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Kirim
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="col-11 col-sm-10 col-md-10  col-lg-12 mt-5">
                <h4 className='text-center text-uppercase'>Tata cara upload</h4>
                <Accordion className='p-5 '>
                    <Accordion.Item eventKey="0" className='shadow '>
                        <Accordion.Header>MSIB</Accordion.Header>
                        <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1" className='shadow'>
                        <Accordion.Header>Magang Mandiri </Accordion.Header>
                        <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2" className='shadow'>
                        <Accordion.Header>Prestasi Mahasiswa </Accordion.Header>
                        <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="3" className='shadow'>
                        <Accordion.Header>Kerja Praktik </Accordion.Header>
                        <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="4" className='shadow'>
                        <Accordion.Header>Kuliah Kerja Nyata </Accordion.Header>
                        <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="5" className='shadow'>
                        <Accordion.Header>Tugas Akhir </Accordion.Header>
                        <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>



            </div>
            <Footer />
            <FooterEnd />
        </div>

    )
}

export default Kema;