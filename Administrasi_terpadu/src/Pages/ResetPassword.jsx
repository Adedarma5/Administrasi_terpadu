import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Swal from 'sweetalert2';

const ResetPassword = () => {
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    try {
      const response = await axios.post('http://localhost:5000/forgot-password', {
        email
      });

      await Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: response.data.message || 'Link reset password telah dikirim ke email Anda.',
        confirmButtonText: 'OK',
        timer: 3000,
        timerProgressBar: true,
        willClose: () => {
          setEmail(''); 
        }
      });

      setMsg(''); 
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message || 'Terjadi kesalahan');
      } else {
        setMsg('Gagal menghubungi server');
      }
    }

    setLoading(false);
  };


    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg,rgb(29, 142, 59) 0%,rgb(138, 149, 55) 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '200px',
                height: '200px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                backdropFilter: 'blur(10px)'
            }}></div>

            <div style={{
                position: 'absolute',
                bottom: '-30px',
                left: '-50px',
                width: '250px',
                height: '250px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '50%',
                backdropFilter: 'blur(10px)'
            }}></div>

            <div style={{
                position: 'absolute',
                top: '50%',
                right: '-80px',
                width: '180px',
                height: '180px',
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '50%',
                backdropFilter: 'blur(10px)'
            }}></div>

            <div className="container-fluid d-flex align-items-center justify-content-center" style={{
                minHeight: '100vh',
                position: 'relative',
                zIndex: 2,
                padding: '2rem 1rem'
            }}>
                <div className="row justify-content-center w-100">
                    <div className="col-xl-4 col-lg-5 col-md-6 col-sm-8 col-10">
                        <div
                            className="card border-0"
                            style={{
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '20px',
                                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                                animation: 'fadeInRight 1s ease-out',
                                overflow: 'hidden'
                            }}
                        >
                            <div style={{
                                background: 'linear-gradient(135deg,rgb(0, 0, 0) 0%,rgb(38, 38, 33) 100%)',
                                height: '6px',
                                width: '100%'
                            }}></div>

                            <div className="card-body p-5">
                                
                                <div className="text-center mb-4">
                                    <div style={{
                                        width: '80px',
                                        height: '80px',
                                        overflow: 'hidden',
                                        margin: '0 auto 20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '5px'
                                    }}>
                                        <img
                                            src="/assets/unimal.png"
                                            alt="Logo Unimal"
                                            style={{ width: '120%' }}
                                        />
                                    </div>
                                    <h2 style={{
                                        fontWeight: '700',
                                        background: 'linear-gradient(135deg, rgb(49, 167, 65) 0%, rgb(75, 162, 117) 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        marginBottom: '10px'
                                    }}>
                                        Lupa Password?
                                    </h2>
                                    <p style={{
                                        color: '#6c757d',
                                        fontSize: '14px',
                                        margin: 0
                                    }}>
                                        Masukkan email Anda untuk mendapatkan link reset password
                                    </p>
                                </div>

                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-4">
                                        <Form.Label style={{
                                            fontWeight: '600',
                                            color: '#495057',
                                            marginBottom: '8px'
                                        }}>
                                            Alamat Email
                                        </Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="contoh@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            style={{
                                                border: '2px solid #e9ecef',
                                                borderRadius: '12px',
                                                padding: '12px 16px',
                                                fontSize: '16px',
                                                transition: 'all 0.3s ease',
                                                background: '#f8f9fa'
                                            }}
                                            onFocus={(e) => {
                                                e.target.style.borderColor = 'rgb(49, 167, 65)';
                                                e.target.style.boxShadow = '0 0 0 0.2rem rgba(49, 167, 65, 0.25)';
                                                e.target.style.background = '#fff';
                                            }}
                                            onBlur={(e) => {
                                                e.target.style.borderColor = '#e9ecef';
                                                e.target.style.boxShadow = 'none';
                                                e.target.style.background = '#f8f9fa';
                                            }}
                                        />
                                    </Form.Group>

                                    <div className="d-grid mb-4">
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            disabled={loading}
                                            style={{
                                                background: 'linear-gradient(135deg, rgb(49, 167, 65) 0%, rgb(75, 162, 117) 100%)',
                                                border: 'none',
                                                borderRadius: '12px',
                                                padding: '12px 0',
                                                fontSize: '16px',
                                                fontWeight: '600',
                                                transition: 'all 0.3s ease',
                                                boxShadow: '0 8px 25px rgba(49, 167, 65, 0.3)'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.transform = 'translateY(-2px)';
                                                e.target.style.boxShadow = '0 12px 35px rgba(49, 167, 65, 0.4)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.transform = 'translateY(0)';
                                                e.target.style.boxShadow = '0 8px 25px rgba(49, 167, 65, 0.3)';
                                            }}
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Mengirim...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fas fa-paper-plane me-2"></i>
                                                    Kirim Link Reset
                                                </>
                                            )}
                                        </Button>
                                    </div>

                                    <div className="text-center">
                                        <button
                                            type="button"
                                            onClick={() => navigate('/login')}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: 'grey',
                                                textDecoration: 'none',
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                transition: 'color 0.3s ease'
                                            }}
                                            onMouseEnter={(e) => e.target.style.color = 'black'}
                                            onMouseLeave={(e) => e.target.style.color = 'grey'}
                                        >
                                            <i className="fas fa-arrow-left me-2"></i>
                                            Kembali ke Login
                                        </button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced wave SVG */}
            <svg
                className="position-absolute bottom-0 start-0 w-100"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    zIndex: 1,
                    opacity: 0.3
                }}
            >
                <defs>
                    <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: 'rgba(255,255,255,0.8)' }} />
                        <stop offset="100%" style={{ stopColor: 'rgba(255,255,255,0.3)' }} />
                    </linearGradient>
                </defs>
                <path
                    fill="url(#waveGradient)"
                    fillOpacity="1"
                    d="M0,256L40,261.3C80,267,160,277,240,282.7C320,288,400,288,480,250.7C560,213,640,139,720,133.3C800,128,880,192,960,186.7C1040,181,1120,107,1200,69.3C1280,32,1360,32,1400,32L1440,32L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
                />
            </svg>

            <style jsx>{`
                @keyframes fadeInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes fadeInRight {
                    from {
                        opacity: 0;
                        transform: translateX(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .btn:focus {
                    box-shadow: none !important;
                }
                
                .form-control:focus {
                    outline: none;
                }
            `}</style>
        </div>
    );
};

export default ResetPassword;   