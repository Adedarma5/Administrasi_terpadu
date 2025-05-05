import React from "react"
import Card from 'react-bootstrap/Card';

const AkademikDashboard= () => {
    return (
        <div className="p-3">
            <Card className="  d-flex align-items-center shadow border-2" >
                <Card.Body className="w-100">
                    <Card.Title className="fw-bold display-6">SELAMAT DATANG</Card.Title>
                    <Card.Text className="text-muted fw-semibold">
                        Sistem Informasi Administrasi Terpadu
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default AkademikDashboard;