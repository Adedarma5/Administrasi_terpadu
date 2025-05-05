import { CardBody, CardHeader, CardText, Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FooterEnd from "../components/FooterEnd";
import Footer from "../components/FooterComponents";
import NavbarComponents from "../components/NavbarComponents";
import { useNavigate } from "react-router-dom";
// Import framer motion
import { motion, useScroll, useInView, useAnimation } from "framer-motion";

const Kema = () => {
    const [show, setShow] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const navigate = useNavigate();
    
    // Scroll animation controls
    const { scrollY } = useScroll();
    const controls = useAnimation();
    
    // References for scroll animations
    const titleRef = React.useRef(null);
    const cardsRef = React.useRef(null);
    const instructionsRef = React.useRef(null);
    const buttonRef = React.useRef(null);
    
    // Check if elements are in view
    const titleInView = useInView(titleRef, { once: false, amount: 0.5 });
    const cardsInView = useInView(cardsRef, { once: false, amount: 0.2 });
    const instructionsInView = useInView(instructionsRef, { once: false, amount: 0.3 });
    const buttonInView = useInView(buttonRef, { once: false, amount: 0.6 });
    
    // Animate elements when they come into view
    useEffect(() => {
        if (titleInView) {
            controls.start("visible");
        }
    }, [controls, titleInView]);
    
    // Listen to scroll position for parallax effects
    useEffect(() => {
        return scrollY.onChange((latest) => {
            // Optional: You can use scrollY.get() to create parallax effects
        });
    }, [scrollY]);

    const handleNavigate = () => {
        navigate("/akademik/dashboard");
    };

    const handleShow = () => {
        setShow(true);
    };

    const handleClose = () =>
        setShow(false);

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const cardAnimation = {
        hidden: { y: 50, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { 
                type: "spring", 
                stiffness: 70 
            }
        },
        hover: { 
            y: -10, 
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
            transition: { 
                type: "spring", 
                stiffness: 300 
            }
        }
    };

    const buttonAnimation = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { 
            scale: 1, 
            opacity: 1, 
            transition: { 
                type: "spring", 
                stiffness: 120, 
                delay: 0.3 
            } 
        },
        hover: { 
            scale: 1.05,
            transition: { 
                type: "spring", 
                stiffness: 300 
            }
        },
        tap: { scale: 0.95 }
    };
    
    // Scroll reveal animation styles
    const scrollReveal = {
        hidden: { opacity: 0, y: 75 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    return (
        <div>
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 50 }}
            >
                <NavbarComponents />
            </motion.div>
            <Container className="mt-4">
                <motion.div
                    ref={titleRef}
                    initial="hidden"
                    animate={titleInView ? "visible" : "hidden"}
                    variants={fadeIn}
                    className="scroll-section"
                >
                    <motion.h1 
                        className="text-center text-uppercase mb-3 mt-5" 
                        style={{ color: 'darkblue' }}
                        initial={{ y: -20, opacity: 0 }}
                        animate={titleInView ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Kegiatan mahasiswa
                    </motion.h1>
                    <motion.p 
                        className="text-center text-muted mb-5"
                        initial={{ y: 20, opacity: 0 }}
                        animate={titleInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    > 
                        Halaman ini dirancang untuk mendukung pengelolaan berbagai aktivitas mahasiswa di dalam kampus maupun di luar kegiatan perkuliahan secara terintegrasi dan terdokumentasi dengan baik.
                        Melalui sistem ini, mahasiswa dapat mengakses layanan seperti Magang Mandiri, Program MSIB, Prestasi, Kerja Praktik, Tugas Akhir, dan student mobility. Tersedia juga fitur pengisian data Alumni yang terhubung dengan tracer study untuk mendukung evaluasi dan peningkatan mutu pendidikan.
                        Seluruh fitur disusun untuk meningkatkan efisiensi dan akuntabilitas dalam proses administrasi kegiatan kemahasiswaan.
                    </motion.p>
                </motion.div>

                <motion.div 
                    ref={cardsRef}
                    className="row justify-content-center g-4 mt-4"
                    variants={staggerContainer}
                    initial="hidden"
                    animate={cardsInView ? "visible" : "hidden"}
                    viewport={{ once: false, amount: 0.2 }}
                >
                    {[
                        { title: "MSIB", img: "src/assets/msib.png" },
                        { title: "MAGANG MANDIRI", img: "src/assets/magang mandiri.png" },
                        { title: "PRESTASI", img: "src/assets/prestasi.png" },
                        { title: "KERJA PRAKTIK", img: "src/assets/kp.png" },
                        { title: "TUGAS AKHIR", img: "src/assets/tugas akhir.png" },
                        // { title: "KEWIRAUSAHAAN", img: "src/assets/kkn.png" },
                        { title: "STUDENT MOBILITY", img: "src/assets/pmm.jpg" },
                        { title: "ALUMNI", img: "src/assets/alumni.jpg" },
                    ].map((item, index) => (
                        <div key={index} className="col-6 col-sm-6 col-md-4 col-lg-2">
                            <motion.div
                                variants={cardAnimation}
                                whileHover="hover"
                            >
                                <Card className="text-center rounded-4 border-0 shadow card-hover">
                                    <motion.div
                                        whileHover={{ rotate: [0, -5, 5, -5, 0], transition: { duration: 0.5 } }}
                                    >
                                        <Card.Img
                                            variant="top"
                                            src={item.img}
                                            style={{ padding: "15px 6px", width: "55%", margin: "auto" }}
                                        />
                                    </motion.div>
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: "0.9rem" }}>{item.title}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </motion.div>
                        </div>
                    ))}
                </motion.div>

                <div className="text-center mb-5 mt-5" ref={buttonRef}>
                    <motion.div
                        variants={buttonAnimation}
                        initial="hidden"
                        animate={buttonInView ? "visible" : "hidden"}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <Button variant="primary" onClick={handleNavigate}>
                            Buka Formulir Pengisian
                        </Button>
                    </motion.div>
                </div>

                <motion.div 
                    ref={instructionsRef}
                    className="col-11 col-sm-10 col-md-10 col-lg-12 mt-4"
                    initial={{ opacity: 0, y: 50 }}
                    animate={instructionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: false, amount: 0.3 }}
                >
                    <Card className="border-0 shadow">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                        >
                            <CardHeader>
                                <h4 className='text-center text-uppercase' style={{ color: 'darkblue' }}>Tata Cara Upload Berkas</h4>
                            </CardHeader>
                        </motion.div>
                        <CardBody>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.9, duration: 0.5 }}
                            >
                                <CardText>
                                    1.  Buka Formulir Kegiatan Mahasiswa (KEMA) <br />
                                    - Akses halaman formulir untuk mengunggah berkas yang diperlukan.<br /><br />

                                    2. Pilih Kategori Kegiatan<br />
                                    - Pilih kategori kegiatan yang sesuai dengan keperluan mahasiswa atau program studi.<br />
                                    - Setelah memilih kategori, formulir isian yang sesuai akan muncul di bawahnya.<br /><br />

                                    3. Isi Formulir dengan Benar<br />
                                    - Lengkapi semua data yang diminta sesuai dengan kategori kegiatan yang dipilih.<br />
                                    - Pastikan informasi yang diinput sudah sesuai dan valid.<br /><br />

                                    4. Unggah Berkas<br />
                                    - Pastikan berkas yang diunggah sesuai dengan ketentuan yang berlaku.<br />
                                    - Format berkas yang diperbolehkan: (contoh: PDF, JPG, PNG).<br />
                                    - Periksa kembali ukuran dan kelengkapan dokumen sebelum mengunggah.<br /><br />

                                    5. Periksa Kembali Data dan Berkas<br />
                                    - Sebelum mengirim, pastikan semua informasi dan berkas yang diunggah sudah benar.<br /><br />

                                    6. Kirim Formulir<br />
                                    - Setelah semua data dan berkas terisi dengan benar, klik tombol "Kirim" untuk menyelesaikan proses pengunggahan.<br />
                                    - Tunggu konfirmasi atau pemberitahuan terkait status unggahan.<br />
                                    - Pastikan selalu memeriksa ketentuan yang berlaku untuk setiap kategori kegiatan sebelum mengunggah berkas.<br />
                                </CardText>
                            </motion.div>
                        </CardBody>
                    </Card>
                </motion.div>
            </Container>

            <motion.div 
                style={{ position: 'relative', width: '100%', marginTop: '50px' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: false, amount: 0.2 }}
            >
                <svg
                    className="w-100 position-absolute"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    style={{ bottom: 0, width: '100vw', height: 'auto', zIndex: '-1' }}
                >
                    <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, delay: 1.2, ease: "easeInOut" }}
                        fill="#e2edff"
                        fillOpacity="1"
                        d="M0,256L40,261.3C80,267,160,277,240,282.7C320,288,400,288,480,250.7C560,213,640,139,720,133.3C800,128,880,192,960,186.7C1040,181,1120,107,1200,69.3C1280,32,1360,32,1400,32L1440,32L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
                    />
                </svg>
            </motion.div>

           

                <Footer />

                <FooterEnd />
        </div>
    );
};

export default Kema;