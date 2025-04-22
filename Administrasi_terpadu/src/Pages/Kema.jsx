import { CardBody, CardHeader, CardText, CardTitle, Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Accordion from 'react-bootstrap/Accordion';
import FooterEnd from "../components/FooterEnd";
import Footer from "../components/FooterComponents";
import NavbarComponents from "../components/NavbarComponents";

const Kema = () => {
    const [show, setShow] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [formData, setFormData] = useState({
        companyType: "",
        companyName: "",
        studyCost: "",
        otherStudyCost: "",
    });

    const handleCompanyTypeChange = (e) => {
        const selected = e.target.id;
        setFormData({
            ...formData,
            companyType: selected,
            companyName: selected === "lainnya" ? formData.companyName : "",
        });
    };

    const handleStudyCostChange = (e) => {
        const selected = e.target.id;
        setFormData({
            ...formData,
            studyCost: selected,
            otherStudyCost: selected === "biaya lainnya" ? formData.otherStudyCost : "",
        });
    };

    const handleClose = () => {
        setShow(false);
    };

    const handleShow = () => {
        setShow(true);
    };

    return (
        <div>
            <NavbarComponents />
            <Container className="mt-4">
                <h1 className="text-center text-uppercase mb-5 mt-5" style={{ color: 'darkblue' }}>Kegiatan mahasiswa</h1>
                <div className="row justify-content-center g-4 mt-4">
                    {[
                        { title: "MSIB", img: "src/assets/msib.png" },
                        { title: "MAGANG MANDIRI", img: "src/assets/magang mandiri.png" },
                        { title: "PRESTASI", img: "src/assets/prestasi.png" },
                        { title: "KERJA PRAKTIK", img: "src/assets/kp.png" },
                        { title: "TUGAS AKHIR", img: "src/assets/tugas akhir.png" },
                        // { title: "KEWIRAUSAHAAN", img: "src/assets/kkn.png" },
                        { title: "PERTUKARAN PELAJAR", img: "src/assets/pmm.jpg" },
                        { title: "ALUMNI", img: "src/assets/alumni.jpg" },
                    ].map((item, index) => (
                        <div key={index} className="col-6 col-sm-6 col-md-4 col-lg-2">
                            <Card className="text-center rounded-4 border-0 shadow card-hover">
                                <Card.Img
                                    variant="top"
                                    src={item.img}
                                    style={{ padding: "15px 6px", width: "55%", margin: "auto" }}
                                />
                                <Card.Body>
                                    <Card.Title style={{ fontSize: "0.9rem" }}>{item.title}</Card.Title>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>

                <div className="text-center mb-5 mt-5">
                    <Button variant="primary" onClick={handleShow}>
                        Buka Formulir
                    </Button>
                </div>


                <div className="col-11 col-sm-10 col-md-10  col-lg-12 mt-4">
                    <Card className="border-0 shadow">
                        <CardHeader>
                            <h4 className='text-center text-uppercase' style={{ color: 'darkblue' }}>Tata Cara Upload Berkas</h4>
                        </CardHeader>
                        <CardBody >
                            <CardText>
                                1.  Buka Formulir Kegiatan Mahasiswa (KEMA) <br />
                                - Akses halaman formulir untuk mengunggah berkas yang diperlukan.<br /><br />

                                2. Pilih Kategori Kegiatan<br />
                                - Pilih kategori kegiatan yang sesuai dengan keperluan mahasiswa atau program studi.<br />
                                - Setelah memilih kategori, formulir isian yang sesuai akan muncul di bawahnya.<br /><br />

                                3. Isi Formulir dengan Benar<br />
                                - Lengkapi semua data yang diminta sesuai dengan kategori kegiatan yang dipilih.<br />
                                - Pastikan informasi yang diinput sudah sesuai dan valid.<br /><br />

                                4. Unggah Berkas<br />
                                - Pastikan berkas yang diunggah sesuai dengan ketentuan yang berlaku.<br />
                                - Format berkas yang diperbolehkan: (contoh: PDF, JPG, PNG).<br />
                                - Periksa kembali ukuran dan kelengkapan dokumen sebelum mengunggah.<br /><br />

                                5. Periksa Kembali Data dan Berkas<br />
                                - Sebelum mengirim, pastikan semua informasi dan berkas yang diunggah sudah benar.<br /><br />

                                6. Kirim Formulir<br />
                                - Setelah semua data dan berkas terisi dengan benar, klik tombol "Kirim" untuk menyelesaikan proses pengunggahan.<br />
                                - Tunggu konfirmasi atau pemberitahuan terkait status unggahan.<br />
                                - Pastikan selalu memeriksa ketentuan yang berlaku untuk setiap kategori kegiatan sebelum mengunggah berkas.<br />
                            </CardText>
                        </CardBody>

                    </Card>

                </div>
            </Container>

            <div style={{ position: 'relative', width: '100%', marginTop: '50px' }}>
                <svg
                    className="w-100 position-absolute"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    style={{ bottom: 0, width: '100vw', height: 'auto', zIndex: '-1' }}
                >
                    <path
                        fill="#e2edff"
                        fillOpacity="1"
                        d="M0,256L40,261.3C80,267,160,277,240,282.7C320,288,400,288,480,250.7C560,213,640,139,720,133.3C800,128,880,192,960,186.7C1040,181,1120,107,1200,69.3C1280,32,1360,32,1400,32L1440,32L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
                    />
                </svg>
            </div>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Formulir</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <p className="fw-bold text-center text-uppercase">Pilih Kategori  Untuk Isi Formulir</p>
                        <Form.Group className="mb-3">
                            <Form.Label>Pilih Kategori</Form.Label>
                            <Form.Select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="">-- Pilih Kategori --</option>
                                <option value="MSIB">MSIB</option>
                                <option value="Magang Mandiri">Magang Mandiri</option>
                                <option value="Prestasi">Prestasi</option>
                                <option value="Kerja Praktik">Kerja Praktik</option>
                                <option value="Tugas Akhir">Tugas Akhir</option>
                                {/* <option value="Kewirausahaan">Kewirausahaan</option> */}
                                <option value="Pertukaran Mahasiswa">Pertukaran Mahasiswa</option>
                                <option value="Alumni">Alumni</option>
                            </Form.Select>
                        </Form.Group>



                        {selectedCategory === "MSIB" && (
                            <>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nama </Form.Label>
                                    <Form.Control type="text" placeholder="Nama Mahasiswa" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nim</Form.Label>
                                    <Form.Control type="text" placeholder="Nim Mahasiswa" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Program yang di ikuti</Form.Label>
                                    <Form.Select>
                                        <option value="">-- Pilih Kategori --</option>
                                        <option value="Magang MSIB">Magang MSIB</option>
                                        <option value="Stupend">Stupend</option>
                                        <option value="Kampus Mengajar">Kampus Mengajar</option>
                                    </Form.Select>
                                    <Form.Group className="mb-3 mt-3">
                                        <Form.Label>Judul</Form.Label>
                                        <Form.Control type="text" placeholder="Judul" />
                                    </Form.Group>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mitra Msib</Form.Label>
                                    <Form.Control type="text" placeholder="Nama Mitra" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tanngal Mulai</Form.Label>
                                    <Form.Control type="date" placeholder="Nama Mitra" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tanggal selesai</Form.Label>
                                    <Form.Control type="date" placeholder="Nama Mitra" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Lembar Pengesahan Pembimbing</Form.Label>
                                    <Form.Control type="file" accept="application/pdf" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Laporan MSIB (Sudah Ditanda Tangani)</Form.Label>
                                    <Form.Control type="file" accept="application/pdf" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Program (Jika Ada)</Form.Label>
                                    <Form.Control type="file" accept="application/pdf" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Lembar Nilai dan Sertifikat Dari Mitra</Form.Label>
                                    <Form.Control type="file" accept="application/pdf" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Konversi Nilai</Form.Label>
                                    <Form.Control type="file" accept="application/pdf" />
                                </Form.Group>
                            </>
                        )}

                        {selectedCategory === "Magang Mandiri" && (
                            <>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nama</Form.Label>
                                    <Form.Control type="text" placeholder="Nama" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nim</Form.Label>
                                    <Form.Control type="text" placeholder="Nim" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Judul</Form.Label>
                                    <Form.Control type="text" placeholder="Judul" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nama Perusahaan</Form.Label>
                                    <Form.Control type="text" placeholder="Nama Perusahaan" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tanggal Mulai</Form.Label>
                                    <Form.Control type="date" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tanggal Selesai</Form.Label>
                                    <Form.Control type="date" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Konversi Nilai</Form.Label>
                                    <Form.Control type="file" accept="application/pdf" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>File Laporan</Form.Label>
                                    <Form.Control type="file" accept="application/pdf" />
                                </Form.Group>
                            </>
                        )}

                        {selectedCategory === "Prestasi" && (
                            <>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tim Atau Individu</Form.Label>
                                    <Form.Select>
                                        <option value="">-- Pilih Kategori --</option>
                                        <option value="Individu">Individu</option>
                                        <option value="Tim">Tim</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Tingkatan</Form.Label>
                                    <Form.Select>
                                        <option value="">-- Pilih Tingkatan Perlombaan --</option>
                                        <option value="Internasional">Internasional</option>
                                        <option value="Nasional">Nasional</option>
                                        <option value="Provinsi">Provinsi</option>
                                        <option value="Kabupaten/Kota">Kabupaten/Kota</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nama Ketua </Form.Label>
                                    <Form.Control type="text" placeholder="Masukan Nama Ketua Tim" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nim</Form.Label>
                                    <Form.Control type="number" placeholder="Nim Mahasiswa" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nama Anggota Tim</Form.Label>
                                    <Form.Control as="textarea" placeholder="Nim Anggota Tim" rows={3} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nama Perlombaan</Form.Label>
                                    <Form.Control type="number" placeholder="Masukan Nama Perlombaan" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Bidang Perlombaan</Form.Label>
                                    <Form.Control type="text" placeholder="Masukan Bidang Perlombaan Yang Diikuti" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Sertifikat</Form.Label>
                                    <Form.Control type="file" accept="application/pdf" />
                                </Form.Group>
                            </>
                        )}

                        {selectedCategory === "Kerja Praktik" && (
                            <>
                                <Form.Group className="mb-3">
                                    <Form.Label>Keterangan</Form.Label>
                                    <Form.Select>
                                        <option value="">-- Pilih Keterangan KP --</option>
                                        <option value="Seminar">Seminar</option>
                                        <option value="Projek">Projek</option>
                                        <option value="Konversi">Konversi</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nama </Form.Label>
                                    <Form.Control type="text" placeholder="Nama Mahasiswa" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nim</Form.Label>
                                    <Form.Control type="text" placeholder="Nim Mahasiswa" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Dosen Pembimbing</Form.Label>
                                    <Form.Control type="text" placeholder="Nim Mahasiswa" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Judul Laporan</Form.Label>
                                    <Form.Control type="text" placeholder="Judul Laporan" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tempat Kerja Praktik</Form.Label>
                                    <Form.Control type="text" placeholder="Masukkan Tempat" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tanggal Mulai</Form.Label>
                                    <Form.Control type="date" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tanggal Selesai</Form.Label>
                                    <Form.Control type="date" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Krs Terakhir</Form.Label>
                                    <Form.Control type="file" accept="application/pdf" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Lembar Pengesahan Prodi Yang Telah Di ACC & TTD</Form.Label>
                                    <Form.Control type="file" accept="application/pdf" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Lembar Pengesahan Pembimbing</Form.Label>
                                    <Form.Control type="file" accept="application/pdf" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Lembar Konsul Pembimbing</Form.Label>
                                    <Form.Control type="file" accept="application/pdf" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Lembar Nilai Pembimbing</Form.Label>
                                    <Form.Control type="file" accept="application/pdf" />
                                </Form.Group>
                                <Form.Label>Lembar Nilai Dari Perusahaan</Form.Label>
                                <Form.Control
                                    type="file"
                                    placeholder="Masukkan Lembar NIlai Dari Perusahaan Tempat KP"
                                    accept="application/pdf"
                                />
                                <Form.Group className="mb-3">
                                    <Form.Label>Daftar Hadir Tempat KP</Form.Label>
                                    <Form.Control type="file" accept="application/pdf" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>File Laporan Yang Telah DI ACC & TTD</Form.Label>
                                    <Form.Control type="file" accept="application/pdf" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>File Program Kerja Praktik</Form.Label>
                                    <Form.Control type="file" accept="application/pdf" />
                                </Form.Group>
                            </>
                        )}

                        {selectedCategory === "Tugas Akhir" && (
                            <>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nama</Form.Label>
                                    <Form.Control type="text" placeholder="Nama Mahasiswa" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nim</Form.Label>
                                    <Form.Control type="number" placeholder="Nim Mahasiswa" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>No Hp (WhatsApp)</Form.Label>
                                    <Form.Control type="number" placeholder="Nim Mahasiswa" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Skripsi Versi Distribusi</Form.Label>
                                    <Form.Control type="file" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Program TGA</Form.Label>
                                    <Form.Control type="file" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Jurnal Skripsi Dengan Format SISFO</Form.Label>
                                    <Form.Control type="file" accept="application/pdf" />
                                </Form.Group>
                            </>
                        )}

                        {/* {selectedCategory === "Kewirausahaan" && (
                            <>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nama Ketua </Form.Label>
                                    <Form.Control type="text" placeholder="Masukan Nama Ketua Tim" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nim</Form.Label>
                                    <Form.Control type="number" placeholder="Nim Mahasiswa" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nama Anggota Tim</Form.Label>
                                    <Form.Control as="textarea" placeholder="Nim Anggota Tim" rows={3} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nama Dosen Pembimbing</Form.Label>
                                    <Form.Control type="number" placeholder="Masukan Nama Pembimbing" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nama Kewirausahaan Yang Diikuti</Form.Label>
                                    <Form.Control type="text" placeholder="Masukan Nama Program Kewirausahaan Yang Diikuti" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Judul Kewirausahaan</Form.Label>
                                    <Form.Control type="text" placeholder="Judul Tugas Akhir" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>File Projek</Form.Label>
                                    <Form.Control type="file" accept="application/pdf" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>File Laporan</Form.Label>
                                    <Form.Control type="file" accept="application/pdf" />
                                </Form.Group>
                            </>
                        )} */}


                        {selectedCategory === "Pertukaran Mahasiswa" && (
                            <>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nama </Form.Label>
                                    <Form.Control type="text" placeholder="Masukan Nama Ketua Tim" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nim</Form.Label>
                                    <Form.Control type="number" placeholder="Nim Mahasiswa" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nama Dosen Pembimbing</Form.Label>
                                    <Form.Control type="number" placeholder="Masukan Nama Pembimbing" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nama Universitas</Form.Label>
                                    <Form.Control type="text" placeholder="Masukkan Nama Univ" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Module Pembelajaran</Form.Label>
                                    <Form.Control type="file" accept="application/pdf" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Lembaran Nilai Dari Univ Pmm</Form.Label>
                                    <Form.Control type="file" accept="application/pdf" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Lembaran Konversi Nilai</Form.Label>
                                    <Form.Control type="file" accept="application/pdf" />
                                </Form.Group>
                            </>
                        )}


                        {selectedCategory === "Alumni" && (
                            <>
                                <hr />
                                <p className="text-uppercase fw-bold text-center ">IDENTITAS ALUMNI</p>
                                <hr />
                                <Form.Group className="mb-3">
                                    <Form.Label>Nama</Form.Label>
                                    <Form.Control type="text" placeholder="Masukkan Nama" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Nim</Form.Label>
                                    <Form.Control type="number" placeholder="Masukkan NIM" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Nik</Form.Label>
                                    <Form.Control type="number" placeholder="Masukkan NIK" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Npwp</Form.Label>
                                    <Form.Control type="number" placeholder="Masukkan NPWP" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Kode PT</Form.Label>
                                    <Form.Control type="number" placeholder="Masukkan Kode Pt" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Masukkan Email Akun Mahasiswa" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>No Telpong/HP</Form.Label>
                                    <Form.Control type="number" placeholder="Masukkan No HP" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Tahun Masuk</Form.Label>
                                    <Form.Control type="number" placeholder="Masukkan Email Akun Mahasiswa" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Tahun Lulus</Form.Label>
                                    <Form.Control type="number" placeholder="Masukkan Email Akun " />
                                </Form.Group>

                                <hr />
                                <p className="text-uppercase fw-bold text-center mb-2">Tracer Study</p>
                                <hr />
                                <p className="text-uppercase fw-bold">Kuisioner Wajib</p>
                                <Form.Group className="mb-3">
                                    <Form.Label>Apakah anda bekerja saat ini?</Form.Label>
                                    <Form.Check
                                        type="radio"
                                        label="Ya"
                                        name="workingStatus"
                                        id="workingYes"
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Tidak"
                                        name="workingStatus"
                                        id="workingNo"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Apakah anda telah mendapatkan pekerjaan dalam 6 bulan terakhir?</Form.Label>
                                    <Form.Check
                                        type="radio"
                                        label="Ya"
                                        name="jobStatus"
                                        id="jobYes"
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Tidak"
                                        name="jobStatus"
                                        id="jobNo"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Dalam berapa bulan anda mendapatkan pekerjaan?</Form.Label>
                                    <Form.Control type="number" placeholder="Masukkan jumlah bulan" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Rata-rata pendapatan per bulan (take home pay)?</Form.Label>
                                    <Form.Control type="number" placeholder="Masukkan pendapatan" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Dimana lokasi tempat anda bekerja?</Form.Label>
                                    <Form.Control className="mb-2" type="text" placeholder="Provinsi" />
                                    <Form.Control type="text" placeholder="Kabupaten/Kota" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Apa jenis perusahaan tempat anda bekerja?</Form.Label>
                                    <Form.Check
                                        type="radio"
                                        label="Instansi pemerintah (termasuk BUMN)"
                                        name="companyType"
                                        id="pemerintah"
                                        value=" Pemerintah"
                                        checked={formData.companyType === "pemerintah"}
                                        onChange={handleCompanyTypeChange}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Organisasi non-profit/Lembaga Swadaya Masyarakat"
                                        name="companyType"
                                        id="Organisasi"
                                        value="Organisasi"
                                        checked={formData.companyType === "Organisasi"}
                                        onChange={handleCompanyTypeChange}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Perusahaan Swasta"
                                        name="companyType"
                                        id="Swasta"
                                        value=" Swasta"
                                        checked={formData.companyType === "Swasta"}
                                        onChange={handleCompanyTypeChange}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Wiraswasta"
                                        name="companyType"
                                        id="Wiraswasta"
                                        value="Wiraswasta"
                                        checked={formData.companyType === "Wiraswasta"}
                                        onChange={handleCompanyTypeChange}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Lainnya"
                                        name="companyType"
                                        id="Lainnya"
                                        value="Lainnya"
                                        checked={formData.companyType === "Lainnya"}
                                        onChange={handleCompanyTypeChange}
                                    />
                                </Form.Group>

                                {formData.companyType === "Lainnya" && (
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nama perusahaan tempat anda bekerja?</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Masukkan nama perusahaan"
                                            value={formData.companyName}
                                            onChange={(e) =>
                                                setFormData({ ...formData, companyName: e.target.value })
                                            }
                                        />
                                    </Form.Group>
                                )}

                                <Form.Group className="mb-3">
                                    <Form.Label>Apa nama perusahaan/kantor tempat anda bekerja?</Form.Label>
                                    <Form.Control type="text" placeholder="Masukkan Tempat Bekerja" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Bila berwiraswasta, apa posisi/jabatan anda saat ini?</Form.Label>
                                    <Form.Control as="select">
                                        <option>-- Pilih Jabatan --</option>
                                        <option>Founder</option>
                                        <option>Co-Founder</option>
                                        <option>Staff</option>
                                        <option>Freelance/Kerja Lepas</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Posisi/jabatan anda saat ini?</Form.Label>
                                    <Form.Control type="text" placeholder="Masukkan posisi" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Apa tingkat tempat kerja anda?</Form.Label>
                                    <Form.Control as="select">
                                        <option>-- Pilih Tingkatan --</option>
                                        <option>Lokal/Wilayah/Wiraswasta tidak berbadan hukum</option>
                                        <option>Nasional/Wiraswasta berbadan hukum</option>
                                        <option>Multinasional/Internasional</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Sebutkan sumberdana dalam pembiayaan kuliah?</Form.Label>
                                    <Form.Check
                                        type="radio"
                                        label="Biaya Sendiri"
                                        name="sendiri"
                                        id="sendiri"
                                        checked={formData.studyCost === "sendiri"}
                                        onChange={handleStudyCostChange}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Beasiswa ADIK"
                                        name="studyCost"
                                        id="adik"
                                        checked={formData.studyCost === "adik"}
                                        onChange={handleStudyCostChange}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Beasiswa BIDIKMISI"
                                        name="studyCost"
                                        id="bidikmisi"
                                        checked={formData.studyCost === "bidikmisi"}
                                        onChange={handleStudyCostChange}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Beasiswa PPA"
                                        name="studyCost"
                                        id="ppa"
                                        checked={formData.studyCost === "ppa"}
                                        onChange={handleStudyCostChange}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Beasiswa AFIRMASI"
                                        name="studyCost"
                                        id="afirmasi"
                                        checked={formData.studyCost === "afirmasi"}
                                        onChange={handleStudyCostChange}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Beasiswa Perusahaan/Swastas"
                                        name="studyCost"
                                        id="swasta"
                                        checked={formData.studyCost === "swasta"}
                                        onChange={handleStudyCostChange}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Lainnya"
                                        name="studyCost"
                                        id="biaya lainnya"
                                        checked={formData.studyCost === "biaya lainnya"}
                                        onChange={handleStudyCostChange}
                                    />
                                </Form.Group>

                                {formData.studyCost === "biaya lainnya" && (
                                    <Form.Group className="mb-3">
                                        <Form.Label>Sebutkan sumber dana lainnya</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Masukkan sumber dana lainnya"
                                        />
                                    </Form.Group>
                                )}

                                <p className="mt-4 mb-1 fw-bold">Pertanyaan Seputar Studi Tingkat Lanjut</p>
                                <p className="mb-2 ">(Jika Menempuh Studi Lanjut S2/S3)</p>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nama perguruan tinggi</Form.Label>
                                    <Form.Control type="text" placeholder="Masukkan nama perguruan tinggi" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Sumber Biaya</Form.Label>
                                    <Form.Control as="select">
                                        <option>-- Pilih sumber biaya --</option>
                                        <option>Biaya sendiri</option>
                                        <option>Beasiswa</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Program Studi</Form.Label>
                                    <Form.Control type="text" placeholder="Masukkan program studi" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Tanggal Masuk</Form.Label>
                                    <Form.Control type="date" />
                                </Form.Group>



                                <Form.Group className="mb-3">
                                    <Form.Label>Bagaimana hubungan antara bidang studi dengan pekerjaan anda?</Form.Label>
                                    <Form.Control as="select">
                                        <option>Sangat Erat</option>
                                        <option>Erat</option>
                                        <option>Cukup Erat</option>
                                        <option>Kurang Erat</option>
                                        <option>Tidak Sama Sekali</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Apakah anda aktif mencari pekerjaan dalam 4 minggu terakhir?</Form.Label>
                                    <Form.Check
                                        type="radio"
                                        label="Tidak"
                                        name="activeJobSearch"
                                        id="notSearching"
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Ya"
                                        name="activeJobSearch"
                                        id="activeSearching"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>File Laporan atau Dokumentasi</Form.Label>
                                    <Form.Control type="file" accept="application/pdf" />
                                </Form.Group>
                            </>
                        )}


                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Kembali
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Kirim
                    </Button>
                </Modal.Footer>
            </Modal>

            <Footer />
            <FooterEnd />
        </div>
    );
};

export default Kema;
