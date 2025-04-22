import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import FooterEnd from '../components/FooterEnd';
import Footer from '../components/FooterComponents';
import NavbarComponents from '../components/NavbarComponents';
import axios from 'axios';
import React, { useState, use } from 'react';

const Login = () => {
  const [email, setEmail] = useState(' ');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(' ');

  const Auth = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", { email, password });
      localStorage.setItem("token", response.data.accessToken);



      location.href = "/admin/dashboard";
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <NavbarComponents />
      <div className="container mt-5">
        <div className="row justify-content-center g-4">
          <div className="col-10 col-sm-6 col-md-4 col-lg-7">
            <Image src="src/assets/bg-login.png" rounded style={{ width: '78%' }} />
          </div>

          <div className="col-11 col-sm-6 col-md-6 col-lg-5 align-content-center">
            <div className="card shadow border-0 ">
              <div className="card-body ">
                <Form onSubmit={Auth} >
                  <p className='text-center'>{msg}</p>
                  <h3 className='text-center'>Selamat Datang</h3>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Masukkan Email" />
                  </Form.Group>

                  <Form.Group className="mb-3 " controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password" />
                  </Form.Group>
                  <p className='text-center mt-2 text-secondary'> Silahkan hubungi pihak administrasi jika anda belum <br /> mempunyai akun
                  </p>
                  <div className='d-grid d-flex justify-content-center'>
                    <Button
                      variant="primary"
                      type="submit"
                      className="btn text-light btn-hover align-content-center"
                      style={{ width: '50%' }}>
                      Login
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
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
      </div>
      <Footer />
      <FooterEnd />
    </div>
  );
};

export default Login;
