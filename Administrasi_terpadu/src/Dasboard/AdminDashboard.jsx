import React from "react";
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Row, Col, Container } from 'react-bootstrap';
import { 
 Users, 
 Calendar, 
 FileText, 
 Activity,
 LogOut 
} from 'lucide-react';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const Logout = async () => {
        try {
            await axios.delete("http://localhost:5000/logout", {
                withCredentials: true,
            });
    
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

   const stats = [
       {
           title: "Bahan Ajar",
           value: "30",
           icon: <Users size={24} />,
           color: "#4361ee"
       },
       {
           title: "Users",
           value: "20",
           icon: <Calendar size={24} />,
           color: "#3a0ca3"
       },
       {
           title: "Kegiatan Mahasiswa",
           value: "56",
           icon: <Activity size={24} />,
           color: "#f72585"
       },
       {
           title: "Total Dokumen",
           value: "156",
           icon: <FileText size={24} />,
           color: "#7209b7"
       },
   ];

   return (
       <Container fluid className="p-4">
           <Card className="mb-4 shadow-sm border-0">
               <Card.Body className="p-4">
                   <div className="d-flex justify-content-between align-items-center">
                       <div>
                           <h2 className="mb-1 fw-bold">SELAMAT DATANG</h2>
                           <p className="text-muted mb-0">
                               Sistem Informasi Administrasi Terpadu
                           </p>
                       </div>
                       <div className="d-flex align-items-center">
                           <button 
                               onClick={Logout}
                               className="btn btn-outline-danger d-flex align-items-center"
                           >
                               <LogOut size={20} className="me-2" />
                               Logout
                           </button>
                       </div>
                   </div>
               </Card.Body>
           </Card>

           <Row className="g-4">
               {stats.map((stat, index) => (
                   <Col key={index} xs={12} sm={6} lg={3}>
                       <Card 
                           className="h-100 shadow-sm border-0 btn-hover"
                           style={{ transition: 'all 0.3s' }}
                       >
                           <Card.Body className="p-4">
                               <div className="d-flex justify-content-between align-items-center">
                                   <div>
                                       <p className="text-muted mb-2 fs-6">
                                           {stat.title}
                                       </p>
                                       <h3 className="mb-0 fw-bold">
                                           {stat.value}
                                       </h3>
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

           <Row className="mt-4">
               <Col>
                   <Card className="shadow-sm border-0">
                       <Card.Body className="p-4">
                           <h4 className="mb-4">Aktivitas Terkini</h4>
                           {[1, 2, 3].map((item) => (
                               <div 
                                   key={item} 
                                   className="d-flex align-items-center mb-3 p-3 rounded btn-hover"
                                   style={{ 
                                       backgroundColor: '#f8f9fa',
                                       transition: 'all 0.3s' 
                                   }}
                               >
                                   <div 
                                       className="me-3 p-2 rounded-circle"
                                       style={{ backgroundColor: '#e9ecef' }}
                                   >
                                       <Activity size={20} />
                                   </div>
                                   <div>
                                       <p className="mb-1 fw-semibold">
                                           Kegiatan 
                                       </p>
                                       <small className="text-muted">
                                           2 jam yang lalu
                                       </small>
                                   </div>
                               </div>
                           ))}
                       </Card.Body>
                   </Card>
               </Col>
           </Row>
       </Container>
   );
};

export default AdminDashboard;