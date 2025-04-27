import React from "react";
import { Container, Row, Col, Card, Form, Button, Table } from "react-bootstrap";

const TambahAlumni = () => {
  return (
    <Container fluid className="p-4">
      <Row className="align-items-center mb-4">
        <Col>
          <h2 className="fw-bold text-white text-uppercase">Alumni</h2>
          <p className="text-muted">Form Pendataan Alumni dan Tracer Study</p>
        </Col>
      </Row>

      {/* Data Alumni */}
      <Card className="shadow border-0 mb-4">
        <Card.Header>
          <h5 className="fw-semibold mb-0">Data Alumni</h5>
        </Card.Header>
        <Card.Body className="p-4">
          <Form>
            {/* Nama */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column md={3}>Nama</Form.Label>
              <Col md={9}>
                <Form.Control type="text" placeholder="Masukkan Nama" name="nama" required />
              </Col>
            </Form.Group>

            {/* Nim */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column md={3}>NIM</Form.Label>
              <Col md={9}>
                <Form.Control type="text" placeholder="Masukkan NIM" name="nim" required />
              </Col>
            </Form.Group>

            {/* Dosen Pembimbing */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column md={3}>Dosen Pembimbing</Form.Label>
              <Col md={9}>
                <Form.Select name="dosen_pembimbing" required>
                  <option value="">-- Pilih Dosen --</option>
                  {/* Mapping dosen list disini */}
                </Form.Select>
              </Col>
            </Form.Group>

            {/* Judul */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column md={3}>Judul</Form.Label>
              <Col md={9}>
                <Form.Control type="text" placeholder="Masukkan Judul KP" name="judul" required />
              </Col>
            </Form.Group>

            {/* Tempat KP */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column md={3}>Nama Perusahaan Tempat KP</Form.Label>
              <Col md={9}>
                <Form.Control type="text" placeholder="Masukkan Nama Tempat KP" name="tempat_kp" />
              </Col>
            </Form.Group>

            {/* Tanggal Mulai & Selesai */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Tanggal Mulai</Form.Label>
                  <Form.Control type="date" name="tanggal_mulai" required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Tanggal Selesai</Form.Label>
                  <Form.Control type="date" name="tanggal_selesai" required />
                </Form.Group>
              </Col>
            </Row>

            {/* Upload berkas */}
            {[
              { label: "KRS Terakhir", name: "krs_terakhir" },
              { label: "Pengesahan Prodi", name: "pengesahan_prodi" },
              { label: "Pengesahan Pembimbing", name: "pengesahan_pembimbing" },
              { label: "Lembar Nilai Perusahaan", name: "nilai_perusahaan" },
              { label: "Daftar Hadir", name: "daftar_hadir" },
              { label: "Laporan", name: "laporan" },
              { label: "Projek", name: "projek" },
            ].map((item, idx) => (
              <Form.Group as={Row} className="mb-3" key={idx}>
                <Form.Label column md={3}>{item.label}</Form.Label>
                <Col md={9}>
                  <Form.Control type="file" accept=".pdf" name={item.name} />
                </Col>
              </Form.Group>
            ))}

          </Form>
        </Card.Body>
      </Card>

      {/* Tracer Study */}
      <Card className="shadow border-0 mb-4">
        <Card.Header>
          <h5 className="fw-semibold mb-0">Kuisioner Tracer Study</h5>
        </Card.Header>
        <Card.Body className="p-4">
          <Form>

            {/* Bekerja atau tidak */}
            <Form.Group className="mb-3">
              <Form.Label>Apakah anda bekerja saat ini?</Form.Label>
              <div>
                <Form.Check inline label="Ya" type="radio" name="bekerja" value="ya" />
                <Form.Check inline label="Tidak" type="radio" name="bekerja" value="tidak" />
              </div>
            </Form.Group>

            {/* Mendapatkan pekerjaan berapa bulan */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Apakah anda telah mendapatkan pekerjaan &lt;=6 bulan setelah lulus?</Form.Label>
                  <Form.Check inline label="Ya" type="radio" name="pekerjaan_6bulan" value="ya" />
                  <Form.Check inline label="Tidak" type="radio" name="pekerjaan_6bulan" value="tidak" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Dalam berapa bulan anda mendapat pekerjaan?</Form.Label>
                  <Form.Control type="number" name="waktu_mendapat_pekerjaan" />
                </Form.Group>
              </Col>
            </Row>

            {/* Gaji */}
            <Form.Group className="mb-3">
              <Form.Label>Berapa rata-rata pendapatan per bulan (take home pay)?</Form.Label>
              <Form.Control type="number" name="gaji" placeholder="Rp" />
            </Form.Group>

            {/* Lokasi kerja */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Provinsi Tempat Bekerja</Form.Label>
                  <Form.Control type="text" name="provinsi_kerja" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Kabupaten/Kota Tempat Bekerja</Form.Label>
                  <Form.Control type="text" name="kota_kerja" />
                </Form.Group>
              </Col>
            </Row>

            {/* Jenis Perusahaan */}
            <Form.Group className="mb-3">
              <Form.Label>Jenis Perusahaan/Instansi</Form.Label>
              <Form.Select name="jenis_perusahaan">
                <option value="">-- Pilih Jenis --</option>
                <option value="pemerintah">Instansi Pemerintah</option>
                <option value="nonprofit">Organisasi Non-Profit</option>
                <option value="swasta">Perusahaan Swasta</option>
                <option value="wiraswasta">Wiraswasta</option>
                <option value="lainnya">Lainnya</option>
              </Form.Select>
            </Form.Group>

            {/* Nama perusahaan */}
            <Form.Group className="mb-3">
              <Form.Label>Nama Perusahaan/Kantor</Form.Label>
              <Form.Control type="text" name="nama_perusahaan" />
            </Form.Group>

            {/* Posisi jabatan */}
            <Form.Group className="mb-3">
              <Form.Label>Posisi/Jabatan</Form.Label>
              <Form.Control type="text" name="posisi" />
            </Form.Group>

            {/* Tingkat tempat kerja */}
            <Form.Group className="mb-3">
              <Form.Label>Tingkat Tempat Kerja</Form.Label>
              <Form.Control type="text" name="tingkat_tempat_kerja" />
            </Form.Group>

            {/* Studi Lanjut */}
            <Card className="border mb-4">
              <Card.Header className="bg-light">
                <h6 className="mb-0">Studi Lanjut</h6>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Sumber Biaya</Form.Label>
                  <Form.Select name="sumber_biaya">
                    <option value="">-- Pilih Sumber Biaya --</option>
                    <option value="sendiri">Biaya Sendiri/Keluarga</option>
                    <option value="beasiswa">Beasiswa</option>
                  </Form.Select>
                </Form.Group>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nama Perguruan Tinggi</Form.Label>
                      <Form.Control type="text" name="nama_pt" />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Program Studi</Form.Label>
                      <Form.Control type="text" name="program_studi" />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Tanggal Masuk</Form.Label>
                      <Form.Control type="date" name="tanggal_masuk" />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Kompetensi */}
            <Form.Group className="mb-3">
              <Form.Label>Kompetensi yang Dikuasai dan Dibutuhkan</Form.Label>
              <Table bordered>
                <thead>
                  <tr>
                    <th>Kompetensi</th>
                    <th>Kuasai Saat Lulus (1-5)</th>
                    <th>Butuh di Pekerjaan (1-5)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    "Etika",
                    "Keahlian Bidang Ilmu",
                    "Bahasa Inggris",
                    "Teknologi Informasi",
                    "Komunikasi",
                    "Kerjasama Tim",
                    "Pengembangan Diri"
                  ].map((kompetensi, idx) => (
                    <tr key={idx}>
                      <td>{kompetensi}</td>
                      <td><Form.Control type="number" min="1" max="5" name={`kuasai_${idx}`} /></td>
                      <td><Form.Control type="number" min="1" max="5" name={`butuh_${idx}`} /></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button type="submit" variant="primary" size="lg">
                Submit
              </Button>
            </div>

          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TambahAlumni;
