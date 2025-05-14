import { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Row, Col, Container, Image } from 'react-bootstrap';
import {
    Users,
    Calendar,
    FileText,
    Activity,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [kegiatanData, setKegiatanData] = useState([]);
    const [statistikData, setStatistikData] = useState([]);
    const [role, setRole] = useState("");

    useEffect(() => {
        const storedName = localStorage.getItem("name");
        const userRole = localStorage.getItem("role");

        if (storedName) setUser(storedName);
        if (userRole) setRole(userRole.toLowerCase());

        axios.get('http://localhost:5000/api/kegiatan-mahasiswa/statistik', {
            withCredentials: true,
        })
        .then(res => {
            if (Array.isArray(res.data)) {
                setKegiatanData(res.data);
            } else {
                console.error("Data kegiatan mahasiswa bukan array:", res.data);
                setKegiatanData([]);
            }
        })
        .catch(err => {
            console.error("Gagal mengambil data kegiatan mahasiswa:", err);
        });

        axios.get('http://localhost:5000/api/statistik', {
            withCredentials: true,
        })
        .then(res => {
            if (Array.isArray(res.data)) {
                setStatistikData(res.data);
            } else {
                console.error("Data statistik umum bukan array:", res.data);
                setStatistikData([]);
            }
        })
        .catch(err => {
            console.error("Gagal mengambil data statistik umum:", err);
        });

    }, []);

    const iconMap = {
        Users: <Users size={24} />,
        Absensi: <Calendar size={24} />,
        Dosen: <Activity size={24} />,
    };

    const colorMap = {
        Users: "#4361ee",
        Absensi: "#3a0ca3",
        Dosen: "#f72585",
    };

    const stats = statistikData.map((item) => ({
        ...item,
        icon: iconMap[item.title] || <FileText size={24} />,
        color: colorMap[item.title] || "#000000",
    }));

    return (
        <Container fluid className="p-4">
            <Card className="mb-4 shadow-sm border-0">
                <Card.Body className="p-4">
                    <Row className="align-items-center">
                        <Col>
                            <h2 className="mb-1 fw-bold"><Activity /> SELAMAT DATANG</h2>
                            <div className="mb-5">
                                <span className="fw-semibold text-primary" style={{ fontSize: '25px' }}>
                                    {user}
                                </span>
                            </div>
                            <p className="text-muted">Sistem Informasi Administrasi Terpadu</p>
                        </Col>
                        <Col xs={6} md={2} className="text-end">
                            <Image src="/assets/bg-login.png" rounded style={{ width: '80%' }} />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {role === "admin" && (
                <Row className="g-4 mb-4 justify-content-center">
                    {stats.map((stat, index) => (
                        <Col key={index} xs={12} sm={6} lg={3}>
                            <Card className="h-100 shadow border-0 btn-hover" style={{ transition: 'all 0.3s' }}>
                                <Card.Body className="p-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <p className="text-muted mb-2 fs-6">{stat.title}</p>
                                            <h3 className="mb-0 fw-bold">{stat.value}</h3>
                                        </div>
                                        <div
                                            className="p-3 rounded-circle"
                                            style={{
                                                backgroundColor: `${stat.color}20`,
                                                color: stat.color
                                            }}
                                        >
                                            {stat.icon}
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            {role === "admin" && (
                <Card className="mt-5 shadow border-0">
                    <Card.Body>
                        <h5 className="fw-semibold text-uppercase mb-3">Statistik Kegiatan Mahasiswa</h5>
                        <ResponsiveContainer width="80%" height={300}>
                            <BarChart data={kegiatanData} margin={{ bottom: 63 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="nama"
                                    angle={-35}
                                    textAnchor="end"
                                    dy={10}
                                    interval={0}
                                />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Bar dataKey="jumlah" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
};

export default AdminDashboard;
