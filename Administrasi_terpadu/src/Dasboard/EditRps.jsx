import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

const EditRps = () => {
  const navigate = useNavigate();

  return (
    <Container fluid className="p-4">
      <Card className="mb-4 shadow border-0">
        <Card.Body className="p-4">
          <h2 className="mb-1 fw-bold">EDIT Rencana Pembelejaran Semester</h2>
          <p className="text-muted mb-0">Perbarui Data RPS</p>
        </Card.Body>
      </Card>

      <Card className="shadow border-0">
        <h4 className="p-4">Edit Dosen</h4>
        <Card.Body className="p-4">


          <Form>
            <Row className="align-items-center mb-3">
              <Col md={3}>
                <Form.Label>NIP</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="number"
                //   value={nip}
                //   onChange={(e) => setNip(e.target.value)}
                  required
                />
              </Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col md={3}>
                <Form.Label>Nama</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                //   value={name}
                //   onChange={(e) => setName(e.target.value)}
                  required
                />
              </Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col md={3}>
                <Form.Label>Bidang Keahlian</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                //   value={keahlian}
                //   onChange={(e) => setKeahlian(e.target.value)}
                  required
                />
              </Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col md={3}>
                <Form.Label>Jabatan</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                //   value={jabatan}
                //   onChange={(e) => setJabatan(e.target.value)}
                  required
                />
              </Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col md={3}>
                <Form.Label>Status</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Select >
                  <option value="">Pilih Status</option>
                  <option value="Aktif">Aktif</option>
                  <option value="Cuti">Cuti</option>
                </Form.Select>
              </Col>
            </Row>

            <Card.Footer className="bg-white border-0 p-3 d-flex justify-content-end">
              <Button variant="secondary" size="sm" className="me-2" onClick={() => navigate("/admin/dashboard/rps")}>
                Kembali
              </Button>
              <Button variant="primary" size="sm" type="submit">
                Simpan Perubahan
              </Button>
            </Card.Footer>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditRps;
