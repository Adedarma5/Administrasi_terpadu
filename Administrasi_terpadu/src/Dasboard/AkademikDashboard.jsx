import React from "react"
import Card from 'react-bootstrap/Card';

const AkademikDashboard= () => {
    return (
        <div className="p-4">
            <Card className=" d-flex align-items-center shadow border-2" >
                <Card.Body className="w-100">
                    <Card.Title>SELAMAT DATANG</Card.Title>
                    <Card.Text>
                        Sistem Informasi Administrasi Terpadu
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default AkademikDashboard;