import React, { useEffect } from "react";
import Accordion from 'react-bootstrap/Accordion';
import FooterEnd from '../components/FooterEnd';
import Footer from '../components/FooterComponents';
import NavbarComponents from '../components/NavbarComponents';
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <div>
            <NavbarComponents />
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="mt-5 mx-3 text-center">
                    <h3>Sejarah Sistem Informasi</h3>
                    <p>
                        Program Studi Sistem Informasi Fakultas Teknik Universitas Malikussaleh secara resmi didirikan berdasarkan Surat Keputusan Menteri Pendidikan dan Kebudayaan Republik Indonesia <br />
                        No.451/E/0/2014 Tanggal Oktober 2014 Nomor SK Izin Operasional 6443/E.E2.2/KL/2014 Tanggal SK Izin Operasional 7 Oktober 2014 Program Studi Sistem Informasi sejak didirikan. <br />
                        telah menghasilkan banyak lulusan. Lulusan Program Studi Sistem Informasi bukan saja telah mewarnai sejarah pendirian dan perkembangan bangsa, tetapi juga berperan aktif dalam <br />
                        mempelopori berbagai kegiatan pembangunan, dan turut berkontribusi terhadap kejayaan bangsa
                    </p>
                </div>

                <div className="col-11 col-sm-10 col-md-10 col-lg-12 mt-5">
                    <h4 className='text-center text-uppercase'>Frequently Asked Questions (FAQ)</h4>
                    <Accordion className='p-5'>
                        <Accordion.Item eventKey="0" className='shadow' data-aos="fade-up">
                            <Accordion.Header className="text-uppercase">Apa itu website Satu Akademik?</Accordion.Header>
                            <Accordion.Body>
                                Satu Akademik adalah sistem informasi administrasi terpadu yang dirancang untuk
                                mendukung pengelolaan data akademik dan kegiatan mahasiswa di Program Studi Sistem <br /> Informasi Universitas Malikussaleh.
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="1" className='shadow' data-aos="fade-up" data-aos-delay="100">
                            <Accordion.Header>Fitur apa saja yang tersedia di dalam website ini? </Accordion.Header>
                            <Accordion.Body>
                                Website ini menyediakan berbagai fitur seperti  kegiatan mahasiswa (MSIB, Magang Mandiri, Prestasi, Kerja Praktik, Tugas Akhir, dan Pertukaran Pelajar),
                                pengisian data alumni, hingga informasi akademik seperti  bahan ajar, kontrak kuliah dan Rps
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="2" className='shadow' data-aos="fade-up" data-aos-delay="200">
                            <Accordion.Header>Siapa saja yang dapat menggunakan website ini? </Accordion.Header>
                            <Accordion.Body>
                                Website ini dapat diakses oleh mahasiswa, dosen, dan admin program studi sesuai dengan hak akses masing-masing pengguna.
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="3" className='shadow' data-aos="fade-up" data-aos-delay="300">
                            <Accordion.Header>Bagaimana cara mengisi formulir kegiatan? </Accordion.Header>
                            <Accordion.Body>
                                Mahasiswa dapat memilih menu kegiatan yang sesuai, lalu klik tombol “Buka Formulir” dan lengkapi data yang diminta beserta dokumen pendukung.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>

            
            </motion.div>

            <Footer />
            <FooterEnd />
        </div>
    );
}

export default About;
