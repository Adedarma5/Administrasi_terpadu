import React from 'react';
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import FooterEnd from '../components/FooterEnd';
import Footer from '../components/FooterComponents';
import NavbarComponents from '../components/NavbarComponents';

const Home = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  

  const handleNavigate = () => {
    navigate("/Login");
  };

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div>
      <NavbarComponents />
      <Container fluid>
        <div className="row text-center text-white">
          <div className="d-flex justify-content-center align-items-center position-relative mt-3" style={{ height: '80vh' }}>
            <img
              src="src/assets/gedung_fakultas_teknik.jpeg"
              alt="Background"
              className="img-fluid "
              style={{
                width: '95%',
                height: '100%',
                borderRadius: '20px',
                objectFit: 'cover',
                filter: 'brightness(40%)'
              }}
            />
            <div className="position-absolute text-center col-11 col-sm-10 col-md-10  col-lg-12" style={{ fontFamily: `'Poppins', sans-serif`, top: '20%' }}>
              <h4>Selamat Datang</h4>
              <h1>SISTEM INFORMASI AKADEMIK TERPADU</h1>
              <h4>SISTEM INFORMASI</h4>
              <Button onClick={handleNavigate} className="btn mt-3 text-light btn-hover">
                Mulai Sekarang
              </Button>
            </div>
          </div>
        </div>
      </Container>

      <Container className="mt-5">
        <div className="row justify-content-center g-4">
          <div className="col-6 col-sm-6 col-md-4 col-lg-2">
            <Card onClick={() => handleCardClick("/Login")} className="text-center rounded-4 border-0 shadow card-hover" style={{ cursor: "pointer" }}>
              <Card.Img
                variant="top"
                src="src/assets/akademik.png"
                style={{ padding: '20px 2px', width: '75%', margin: 'auto' }}
              />
              <Card.Body>
                <Card.Title>AKADEMIK</Card.Title>
              </Card.Body>
            </Card>
          </div>

          <div className="col-6 col-sm-6 col-md-4 col-lg-2">
            <Card onClick={() => handleCardClick("/Kema")} className="text-center rounded-4 border-0 shadow card-hover " style={{ cursor: "pointer" }}>
              <Card.Img variant="top" src="src/assets/kema.png" style={{ padding: '9px 9px', width: '80%', margin: 'auto' }} />
              <Card.Body>
                <Card.Title>KEGIATAN MAHASISWA</Card.Title>
              </Card.Body>
            </Card>
          </div>


          <div className="col-6 col-sm-6 col-md-4 col-lg-2">
            <Card onClick={() => handleCardClick("/berita")} className="text-center rounded-4 border-0 shadow card-hover " style={{ cursor: "pointer" }}>
              <Card.Img variant="top" src="src/assets/berita.png" style={{ padding: '15px 20px', width: '80%', margin: 'auto' }} />
              <Card.Body>
                <Card.Title>PORTAL BERITA</Card.Title>
              </Card.Body>
            </Card>
          </div>
        </div>

      </Container>
              
      <div style={{ backgroundColor: 'darkblue', marginTop: '100px', marginBottom: '100px' }}>        
      <div className="container mt-5 ">
        <div className="row align-items-center g-4">
          <div className="col-10 col-sm-6 col-md-4 col-lg-7 pe-lg-5 text-white">
            <h2 className='text-center mb-4'>SIATSI</h2>
            <p className='fs-5 '>Administrasi Terpadu merupakan penyelenggaraan pelayanan publik yang terintegrasi dalam satu
              tempat. Tujuannya adalah untuk meningkatkan efisiensi administrasi dan menyederhanakan birokras </ p>
              
              <p className='fs-5 mb-4'> Sistem Informasi Akademik Terpadu memiliki beberapa sistem yang terpusat,
              memungkinkan kita dalam mengolah berbagai data dengan memanfaatkan fungsi yang saling 
              terintegrasi di dalam satu sistem.</p>
          </div>

          <div className="col-11 col-sm-6 col-md-6 col-lg-5 ps-lg-5 mb-4">
            <Image src="src/assets/bg-si.png" rounded style={{ width: '100%' }} />
          </div>
        </div>
      </div>
      </div>

      

      <div   className="container mt-5 mb-4">
        <h1 id='program' className="text-center  " style={{ color: 'darkblue' }}>PROGRAM</h1>
        <div className="row g-4 justify-content-center ">
          <div className="col-12 col-md-12 ">
            <div className="card d-flex align-items-center flex-row p-1 shadow border-0 card-hover">
              <Image
                src="src/assets/akademik.png"
                rounded
                style={{ width: '12%', marginRight: '0px', padding: '30px' }}
              />
              <div>
                <h4 style={{ color: 'darkblue'}}>Akademik</h4>
                <p className='text-muted'>
                   Fitur adakdemik yang hanya bisa diakses oleh tenaga pendidik memiliki beberapa fitur yang membantu prodi dalam melihat beberapa data yang di perlukan
                   untuk keperluan prodi 
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-12">
            <div className="card d-flex align-items-center flex-row p-1 shadow border-0 card-hover">
              <Image
                src="src/assets/kema.png"
                rounded
                style={{ width: '12%', padding: '30px' }}
              />
              <div>
                <h4 style={{ color: 'darkblue'}}>Kegiatan Mahasiswa</h4>
                <p className='text-muted'>
                  Fitur kegiata mahasiswa merupakan fitur yang di rancang untuk dapat mengumpulkan data dan kegiatan apa saja yang telah di lakukan oleh mahasiswa sistem Informasi 
                  guna untuk mendukung IKU Kampus
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-12">
            <div className="card d-flex align-items-center flex-row p-1 shadow border-0 card-hover ">
              <Image
                src="src/assets/berita.png"
                rounded
                style={{ width: '10%', marginRight: '25px', padding: '30px' }}
              />
              <div>
                <h4 style={{ color: 'darkblue'}}>Portal Berita</h4>
                <p className='text-muted'>
                 Fitur ini bertujuan untuk menampilkan beberapa berita penting seputaran akademik dan non akademik yang menyangkut prodi sistem informasi atau pun <br />
                 berita lainnya
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div style={{ position: 'relative', width: '100%', marginTop: '50px' }}>
  <svg
    className="w-100 position-absolute"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 320"
    style={{ bottom: 0, width: '100vw', height: 'auto', zIndex: '-1' }}
  >
    <path
      fill="#e2edff"
      fillOpacity="1"
      d="M0,256L40,261.3C80,267,160,277,240,282.7C320,288,400,288,480,250.7C560,213,640,139,720,133.3C800,128,880,192,960,186.7C1040,181,1120,107,1200,69.3C1280,32,1360,32,1400,32L1440,32L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
    />
  </svg>
</div>
      <Footer />
      <FooterEnd />
    </div>

    
  );
};

export default Home;
