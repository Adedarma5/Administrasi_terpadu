import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import Swal from 'sweetalert2';

const FormReset = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const validateToken = async () => {
            try {
                const res = await axios.post('http://localhost:5000/verify-reset-token', { token });
                if (!res.data.valid) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Token Expired',
                        text: 'Link reset password sudah tidak berlaku',
                    }).then(() => {
                        navigate('/login');
                    });
                }
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Token Expired',
                    text: err.response?.data?.message || 'Link reset tidak valid atau sudah kadaluarsa',
                }).then(() => {
                    navigate('/login');
                });
            }
        };

        if (token) {
            validateToken();
        } else {
            navigate('/login');
        }
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: 'Password dan konfirmasi tidak cocok',
            });
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, newPassword }),
            });

            const data = await res.json();
            setLoading(false);

            if (!res.ok) {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal',
                    text: data.message || 'Token tidak valid atau sudah kedaluwarsa',
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: data.message || 'Password berhasil direset',
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    navigate('/login');
                });
            }
        } catch (err) {
            setLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: 'Gagal menghubungi server',
            });
        }
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

                                {message && <div className="alert alert-success">{message}</div>}
                                {error && <div className="alert alert-danger">{error}</div>}

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
                                        Satu Akademik
                                    </h2>
                                    <p style={{
                                        color: '#6c757d',
                                        fontSize: '14px',
                                        margin: 0
                                    }}>
                                        Masukkan Password Baru Anda
                                    </p>
                                </div>

                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-4">
                                        <Form.Label style={{
                                            fontWeight: '600',
                                            color: '#495057',
                                            marginBottom: '8px'
                                        }}>
                                            Password Baru
                                        </Form.Label>
                                        <div className="position-relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="form-control"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                required
                                                style={{
                                                    border: '2px solid #e9ecef',
                                                    borderRadius: '12px',
                                                    padding: '12px 16px',
                                                    fontSize: '16px',
                                                    background: '#f8f9fa',
                                                    paddingRight: '45px'
                                                }}
                                            />
                                            <span
                                                className="position-absolute top-50 end-0 translate-middle-y me-3"
                                                onClick={() => setShowPassword(!showPassword)}
                                                style={{ cursor: 'pointer', color: '#495057' }}
                                            >
                                                {showPassword ? <EyeSlash /> : <Eye />}
                                            </span>
                                        </div>
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label style={{
                                            fontWeight: '600',
                                            color: '#495057',
                                            marginBottom: '8px'
                                        }}>
                                            Konfirmasi Password
                                        </Form.Label>
                                        <div className="position-relative">
                                            <input
                                                type={showConfirm ? "text" : "password"}
                                                className="form-control"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                                style={{
                                                    border: '2px solid #e9ecef',
                                                    borderRadius: '12px',
                                                    padding: '12px 16px',
                                                    fontSize: '16px',
                                                    background: '#f8f9fa',
                                                    paddingRight: '45px'
                                                }}
                                            />
                                            <span
                                                className="position-absolute top-50 end-0 translate-middle-y me-3"
                                                onClick={() => setShowConfirm(!showConfirm)}
                                                style={{ cursor: 'pointer', color: '#495057' }}
                                            >
                                                {showConfirm ? <EyeSlash /> : <Eye />}
                                            </span>
                                        </div>
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
                                                    Reset Password
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

            <svg
                className="position-absolute bottom-0 start-0 w-100"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                style={{ zIndex: 1 }}
            >
                <path
                    fill="#ffffff"
                    fillOpacity="0.15"
                    d="M0,64L24,90.7C48,117,96,171,144,192C192,213,240,203,288,197.3C336,192,384,192,432,186.7C480,181,528,171,576,154.7C624,139,672,117,720,128C768,139,816,181,864,202.7C912,224,960,224,1008,213.3C1056,203,1104,181,1152,192C1200,203,1248,245,1296,256C1344,267,1392,245,1416,234.7L1440,224L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"
                />
            </svg>
        </div>
    );
};

export default FormReset;
