import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import FooterEnd from '../components/FooterEnd';
import Footer from '../components/FooterComponents';
import NavbarComponents from '../components/NavbarComponents';

const About = () => {
    return (
        <div>
            <NavbarComponents />
            <div className="mt-5 mx-3 text-center">
                <h3>Sejarah Sistem Informasi</h3>
                <p>Program Studi Sistem Informasi Fakultas Teknik Universitas Malikussaleh secara resmi didirikan berdasarkan Surat Keputusan Menteri Pendidikan dan Kebudayaan Republik Indonesia <br />
                    No.451/E/0/2014 Tanggal Oktober 2014 Nomor SK Izin Operasional 6443/E.E2.2/KL/2014 Tanggal SK Izin Operasional 7 Oktober 2014 Program Studi Sistem Informasi sejak didirikan. <br />
                    telah menghasilkan banyak lulusan. Lulusan Program Studi Sistem Informasi bukan saja telah mewarnai sejarah pendirian dan perkembangan bangsa, tetapi juga berperan aktif dalam <br />
                    mempelopori berbagai kegiatan pembangunan, dan turut berkontribusi terhadap kejayaan bangsa</p>
            </div>
            <div className="col-11 col-sm-10 col-md-10  col-lg-12 mt-5">
                <h4 className='text-center text-uppercase'>Frequently Asked Questions (FAQ)</h4>
                <Accordion className='p-5 '>
                    <Accordion.Item eventKey="0" className='shadow '>
                        <Accordion.Header className="text-uppercase">Apa itu website Satu Akademik?</Accordion.Header>
                        <Accordion.Body>
                            Satu Akademik adalah sistem informasi administrasi terpadu yang dirancang untuk
                            mendukung pengelolaan data akademik dan kegiatan mahasiswa di Program Studi Sistem <br /> Informasi Universitas Malikussaleh.
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1" className='shadow'>
                        <Accordion.Header>Fitur apa saja yang tersedia di dalam website ini? </Accordion.Header>
                        <Accordion.Body>
                            Website ini menyediakan berbagai fitur seperti  kegiatan mahasiswa (MSIB, Magang Mandiri, Prestasi, Kerja Praktik, Tugas Akhir, dan Pertukaran Pelajar),
                            pengisian data alumni, hingga informasi akademik seperti  bahan ajar, kontrak kuliah dan Rps
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2" className='shadow'>
                        <Accordion.Header>Siapa saja yang dapat menggunakan website ini? </Accordion.Header>
                        <Accordion.Body>
                            Website ini dapat diakses oleh mahasiswa, dosen, dan admin program studi sesuai dengan hak akses masing-masing pengguna.
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="3" className='shadow'>
                        <Accordion.Header>Bagaimana cara mengisi formulir kegiatan? </Accordion.Header>
                        <Accordion.Body>
                            Mahasiswa dapat memilih menu kegiatan yang sesuai, lalu klik tombol “Buka Formulir” dan lengkapi data yang diminta beserta dokumen pendukung.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

            </div>
            <svg
                className="position-absolute bottom-0 start-0 w-100 "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    zIndex: -1,
                }}
            >
                <path
                    fill="#e2edff"
                    fillOpacity="1"
                    d="M0,256L40,261.3C80,267,160,277,240,282.7C320,288,400,288,480,250.7C560,213,640,139,720,133.3C800,128,880,192,960,186.7C1040,181,1120,107,1200,69.3C1280,32,1360,32,1400,32L1440,32L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
                />
            </svg>


            <Footer />
            <FooterEnd />
        </div>
    )
}

export default About;