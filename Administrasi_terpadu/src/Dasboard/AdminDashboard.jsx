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
    const [kegiatandata, setKegiatanData] = useState([]);
    const [statsdata, setStatsData] = useState([]);
    const [role, setRole] = useState("");

    useEffect(() => {
        const userRole = localStorage.getItem('role');
        setRole(userRole?.toLowerCase());

        axios.get('http://localhost:5000/api/kegiatan-mahasiswa/statistik')
            .then(res => {
                setKegiatanData(res.data);
            })
            .catch(err => {
                console.error("Gagal mengambil data kegiatan:", err);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:5000/api/statistik')
            .then(res => setStatsData(res.data))
            .catch(err => console.error("Gagal ambil statistik umum:", err));
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

    const stats = statsdata.map((item) => ({
        ...item,
        icon: iconMap[item.title] || <FileText size={24} />,
        color: colorMap[item.title] || "#000000"
    }));

    return (
        <Container fluid className="p-4">


            <Card className="mb-4 shadow-sm border-0">
                <Card.Body className="p-4">
                    <Row className="align-items-center">
                        <Col>
                            <h2 className="mb-1 fw-bold">SELAMAT DATANG</h2>
                            <p className="text-muted mb-0">Sistem Informasi Administrasi Terpadu</p>
                        </Col>
                        <Col xs={6} md={2} className="text-end">
                            <Image src="/src/assets/bg-login.png" rounded style={{ width: '80%' }} />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>


            {role === "admin" && (
                <Row className="g-4 mb-4 justify-content-center">
                    {stats.map((stat, index) => (
                        <Col key={index} xs={12} sm={6} lg={3}>
                            <Card className="h-100 shadow border-0 btn-hover " style={{ transition: 'all 0.3s' }}>
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
                        <ResponsiveContainer width="65%" height={250}>
                            <BarChart data={kegiatandata}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="nama" />
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
