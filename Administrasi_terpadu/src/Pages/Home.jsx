import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { useNavigate } from "react-router-dom";
import FooterEnd from '../components/FooterEnd';
import Footer from '../components/FooterComponents';
import NavbarComponents from '../components/NavbarComponents';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const Home = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  
  const heroTextY = useTransform(scrollY, [0, 300], [0, -50]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const backgroundScale = useTransform(scrollY, [0, 300], [1, 1.1]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNavigate = () => {
    navigate("/Login");
  };

  const handleCardClick = (path) => {
    navigate(path);
  };

  const fadeInUp = {
    hidden: { y: 60, opacity: 0 },
    visible: (custom) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 70,
        delay: custom * 0.2,
      }
    })
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 80,
        delay: custom * 0.1
      }
    }),
    hover: {
      y: -10,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    },
    tap: {
      y: 0,
      scale: 0.98,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15
      }
    }
  };

  const buttonVariants = {
    idle: { scale: 0.70 },
    hover: {
      scale: .80,
      boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
    },
    tap: {
      scale: 0.95,
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 10
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const floatingAnimation = {
    idle: {
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    },
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };

  const highlightUnderline = {
    hidden: { width: "0%" },
    visible: {
      width: "80%",
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3
      }
    }
  };

  const waveAnimation = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 1.5, bounce: 0 },
        opacity: { duration: 0.5 }
      }
    }
  };

  return (
    <div>
      <NavbarComponents />
      
      <Container fluid>
        <div className="row text-center text-white">
          <div className="d-flex justify-content-center align-items-center position-relative mt-3" style={{ height: '80vh', overflow: 'hidden' }}>
            <motion.img
              src="src/assets/gedung_fakultas_teknik.jpeg"
              alt="Background"
              className="img-fluid"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              style={{
                width: '95%',
                height: '100%',
                borderRadius: '20px',
                objectFit: 'cover',
                filter: 'brightness(40%)',
                transformOrigin: "center center",
                scale: backgroundScale
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            
            <motion.div 
              className="position-absolute text-center col-11 col-sm-10 col-md-10 col-lg-12" 
              style={{ 
                fontFamily: `'Poppins', sans-serif`, 
                top: '30%',
                y: heroTextY,
                opacity: heroOpacity
              }}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.h4 
                variants={fadeInUp} 
                custom={0}
              >
                Selamat Datang
              </motion.h4>
              <motion.h1 
                variants={fadeInUp} 
                custom={1}
                className="fw-bold"
              >
                SISTEM ADMINISTRASI TERPADU
              </motion.h1>
              <motion.h4 
                variants={fadeInUp} 
                custom={2}
              >
                SATU AKADEMIK
              </motion.h4>
              <motion.div 
                variants={fadeInUp} 
                custom={3}
              >
                <motion.button
                  onClick={handleNavigate}
                  className="btn mt-4 btn-primary text-light btn-lg"
                  variants={buttonVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                  transition={{ duration: 0.3 }}
                >
                  Mulai Sekarang
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Container>

      <Container className="mt-5">
  <motion.div 
    className="row justify-content-center g-3"
    variants={staggerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    {[{
      title: 'AKADEMIK',
      src: 'src/assets/akademik.png',
      path: '/Login'
    },
    {
      title: 'KEGIATAN MAHASISWA',
      src: 'src/assets/kema.png',
      path: '/Kema'
    },
    {
      title: 'PORTAL BERITA',
      src: 'src/assets/berita-bg.png',
      path: '/berita'
    }].map((item, i) => (
      <motion.div
        className="col-6 col-sm-6 col-md-4 col-lg-2"
        key={item.title}
        variants={cardVariants}
        custom={i}
        whileHover="hover"
        whileTap="tap"
        viewport={{ once: true }}
      >
        <Card 
          onClick={() => handleCardClick(item.path)} 
          className="text-center rounded-4 shadow border-0 h-100 d-flex flex-column justify-content-between"
          style={{  cursor: "pointer", overflow: "hidden" }}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 * i, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card.Img
              variant="top"
              src={item.src}
              style={{
                width: '150px',
                height: '100px',
                objectFit: 'contain',
                margin: '20px auto 0'
              }}
            />
          </motion.div>
          <Card.Body className="mt-auto">
            <Card.Title className="fw-bold">{item.title}</Card.Title>
          </Card.Body>
        </Card>
      </motion.div>
    ))}
  </motion.div>
</Container>


      <motion.div
        style={{ 
          backgroundColor: 'darkblue', 
          marginTop: '100px', 
          marginBottom: '100px',
          position: 'relative',
          overflow: 'hidden'
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <motion.div
          style={{
            position: 'absolute',
            width: '250px',
            height: '250px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.03)',
            top: '-100px',
            left: '-50px'
          }}
          animate={{
            y: [0, 15, 0],
            x: [0, 10, 0],
            transition: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
        <motion.div
          style={{
            position: 'absolute',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
            bottom: '-50px',
            right: '10%'
          }}
          animate={{
            y: [0, -15, 0],
            x: [0, -10, 0],
            transition: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
        
        <div className="container py-5 my-3">
          <div className="row align-items-center g-4">
            <motion.div 
              className="col-10 col-sm-6 col-md-4 col-lg-7 pe-lg-5 text-white"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className='text-center mb-0 text-uppercase'
                variants={fadeInUp}
                custom={0}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                satu akademik
              </motion.h2>
              <motion.p 
                className='text-center mb-4 text-uppercase fw-semibold'
                variants={fadeInUp}
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                (sistem administrasi terpadu akademik)
              </motion.p>
              <motion.p 
                className='fs-5'
                variants={fadeInUp}
                custom={2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                Administrasi Terpadu merupakan penyelenggaraan pelayanan publik yang terintegrasi dalam satu tempat
                untuk meningkatkan efisiensi administrasi dan menyederhanakan birokrasi.
              </motion.p>
              <motion.p 
                className='fs-5 mb-4'
                variants={fadeInUp}
                custom={3}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                Sistem Informasi Akademik Terpadu memiliki beberapa sistem yang terpusat, memungkinkan kita dalam
                mengolah berbagai data dengan memanfaatkan fungsi yang saling terintegrasi di dalam satu sistem.
              </motion.p>
            </motion.div>
            <motion.div 
              className="col-11 col-sm-6 col-md-6 col-lg-5 ps-lg-5 mb-4"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                initial="idle"
                animate="float"
                variants={floatingAnimation}
              >
                <Image 
                  src="src/assets/bg-si.png" 
                  rounded 
                  style={{ width: '100%' }}
                  className="shadow-lg" 
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="container mt-2 mb-2 py-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="text-center position-relative mb-4">
          <motion.h1 
            id="program" 
            className="text-center text-primary"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            PROGRAM
          </motion.h1>
          <motion.div 
            className="mx-auto bg-primary"
            style={{ height: '4px', position: 'relative', marginTop: '12px' }}
            variants={highlightUnderline}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          />
        </div>
        
        <motion.div 
          className="row g-4 justify-content-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[{
            title: "Akademik",
            text: "    Fitur akademik yang hanya bisa diakses oleh tenaga pendidik, memiliki beberapa fitur yang membantu prodi dalam melihat data yang diperlukan untuk keperluan prodi.",
            img: "src/assets/akademik.png"
          },
          {
            title: "Kegiatan Mahasiswa",
            text:  "Fitur kegiatan mahasiswa dirancang untuk mengumpulkan data dan aktivitas yang telah dilakukan oleh mahasiswa Sistem Informasi guna mendukung IKU Kampus",
            img: "src/assets/kema.png"
          },
          {
            title: "Portal Berita",
            text: " Fitur ini bertujuan untuk menampilkan berita penting seputar akademik maupun non-akademik yang menyangkut Prodi Sistem Informasi ataupun berita lainnya.",
            img: "src/assets/berita-bg.png"
          }].map((program, i) => (
            <motion.div
              className="col-12 card-hover"
              key={program.title}
              variants={fadeInUp}
              custom={i}
              viewport={{ once: true }}
            >
              <motion.div 
                className="card shadow border-0 d-flex flex-column flex-md-row align-items-center p-4"
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div
                  initial={{ rotate: -5, opacity: 0 }}
                  whileInView={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  viewport={{ once: true }}
                >
                  <img
                    src={program.img}
                    alt={program.title}
                    className="img-fluid me-md-4 mb-3 mb-md-0"
                    style={{ width: '100px' }}
                  />
                </motion.div>
                <div>
                  <motion.h4 
                    className="text-primary mx-2"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + (0.1 * i) }}
                    viewport={{ once: true }}
                  >
                    {program.title}
                  </motion.h4>
                  <motion.p 
                    className="text-muted mx-2"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + (0.1 * i) }}
                    viewport={{ once: true }}
                  >
                    {program.text}
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <div style={{ position: 'relative', width: '100%', marginTop: '50px' }}>
        <motion.svg
          className="w-100 position-absolute"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          style={{ bottom: 0, width: '100vw', height: 'auto', zIndex: '-1' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.path
            fill="#e2edff"
            fillOpacity="1"
            d="M0,256L40,261.3C80,267,160,277,240,282.7C320,288,400,288,480,250.7C560,213,640,139,720,133.3C800,128,880,192,960,186.7C1040,181,1120,107,1200,69.3C1280,32,1360,32,1400,32L1440,32L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
            variants={waveAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          />
        </motion.svg>
      </div>

      <Footer />
      <FooterEnd />
    </div>
  );
};

export default Home;