  import React from "react";
  import { Container, Row, Col, Card, Form, Button, Table } from "react-bootstrap";

  const TambahAlumni = () => {
    const alasanmengambilpekerjaanList = [
      "Pertanyaan tidak sesuai; pekerjaan saya sekarang sudah sesuai dengan pendidikan saya.",
      "Saya belum mendapatkan pekerjaan yang lebih sesuai.",
      "Di pekerjaan ini saya memeroleh prospek karir yang baik.",
      "Saya lebih suka bekerja di area pekerjaan yang tidak ada hubungannya dengan pendidikan saya.",
      "Saya dipromosikan ke posisi yang kurang berhubungan dengan pendidikan saya dibanding posisi sebelumnya.",
      "Saya dapat memperoleh pendapatan yang lebih tinggi di pekerjaan ini.",
      "Pekerjaan saya saat ini lebih aman/terjamin/secure.",
      "Pekerjaan saya saat ini lebih menarik.",
      "Pekerjaan saya saat ini lebih memungkinkan saya mengambil pekerjaan tambahan/jadwal yang fleksibel, dll.",
      "Pekerjaan saya saat ini lokasinya lebih dekat dari rumah saya.",
      "Pekerjaan saya saat ini dapat lebih menjamin kebutuhan keluarga saya.",
      "Pada awal meniti karir ini, saya harus menerima pekerjaan yang tidak berhubungan dengan pendidikan saya.",
    ];

    const metodeList = [
      "Perkuliahan",
      "Demonstrasi",
      "Partisipasi Dalam Proyek Riset",
      "Magang",
      "Praktikum",
      "Kerja Lapangan",
      "Diskusi",
    ];

    const skalaPenilaian = [
      "Sangat Besar",
      "Besar",
      "Cukup Besar",
      "Kurang",
      "Tidak Sama Sekali",
    ];
    const competencies = [
      { id: 1, label: "Etika" },
      { id: 2, label: "Keahlian berdasarkan bidang ilmu" },
      { id: 3, label: "Bahasa Inggris" },
      { id: 4, label: "Penggunaan Teknologi Informasi" },
      { id: 5, label: "Komunikasi" },
      { id: 6, label: "Kerja sama tim" },
      { id: 7, label: "Pengembangan Diri" },
    ];

    const RatingRow = ({ name }) => (
      <>
        {[1, 2, 3, 4, 5].map((value) => (
          <td key={value} className="text-center">
            <input
              type="radio"
              name={name}
              value={value}
              className="rating-radio"
            />
          </td>
        ))}
      </>
    );

    return (
      <Container fluid className="p-4">
        <Row className="align-items-center mb-4">
          <Col>
            <h2 className="fw-bold text-white text-uppercase">Alumni</h2>
            <p className="text-muted">Form Pendataan Alumni dan Tracer Study</p>
          </Col>
        </Row>

        <Card className="shadow border-0 mb-4">
          <Card.Header>
            <h5 className="fw-semibold mb-0">Identias Alumni</h5>
          </Card.Header>
          <Card.Body className="p-4">


            <Form size="sm">
              <Form.Group as={Row} className="mb-3">
                <Form.Label column md={3}>Nama Lengkap</Form.Label>
                <Col md={9}>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan Nama"
                    name="nama"
                    required />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column md={3}>NIM</Form.Label>
                <Col md={9}>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan NIM"
                    name="nim"
                    required />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column md={3}>Alamat Email</Form.Label>
                <Col md={9}>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan Email"
                    name="email"
                    required />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column md={3}>No Telpon</Form.Label>
                <Col md={9}>
                  <Form.Control
                    type="number"
                    placeholder="Masukkan No Telpon"
                    name="judul"
                    required />
                </Col>
              </Form.Group>


              <Form.Group as={Row} className="mb-3">
                <Form.Label column md={3}>Kode PT</Form.Label>
                <Col md={9}>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan Nama Tempat KP"
                    name="tempat_kp" />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column md={3}>Nik</Form.Label>
                <Col md={9}>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan NIK"
                    name="tempat_kp" />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column md={3}>NPWP</Form.Label>
                <Col md={9}>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan NPWP"
                    name="tempat_kp" />
                </Col>
              </Form.Group>


              <Row as={Row} className="mb-3">
                <Form.Label column md={3}>Tanggal Mulai</Form.Label>
                <Col md={9}>
                  <Form.Control
                    type="date"
                    name="tanggal_mulai"
                    required />
                </Col>
              </Row>

              <Row as={Row} className="mb-3">
                <Form.Label column md={3}>Tanggal Selesai</Form.Label>
                <Col md={9}>
                  <Form.Control
                    type="date"
                    name="tanggal_selesai"
                    required />
                </Col>
              </Row>

            </Form>
          </Card.Body>
        </Card>

        <Card className="shadow border-0 mb-4">
          <Card.Header>
            <h4 className="mb-0 text-uppercase"> Tracer Study</h4>
          </Card.Header>
          <Card.Header>
            <p className="fw-semibold mb-0 text-uppercase text-muted">Kuisioner Wajib</p>
          </Card.Header>
          <Card.Body className="p-4">
            <Form>

              <Row as={Row} className="mb-3">
                <Form.Label column md={6}>Apakah anda bekerja saat ini (termasuk kerja sambilan dan wirausaha)?</Form.Label>
                <Col >
                  <Form.Check inline label="Ya" type="radio" name="bekerja" value="ya" />
                  <Form.Check inline label="Tidak" type="radio" name="bekerja" value="tidak" />
                </Col>
              </Row>


              <Row as={Row} className="mb-4">
                <Form.Label column md={6} >Apakah anda telah mendapatkan pekerjaan kurang dari 6 bulan / termasuk bekerja sebelum lulus / setelah Internsip</Form.Label>
                <Col md={4}>
                  <Form.Check inline label="Ya" type="radio" name="pekerjaan_6bulan" value="ya" />
                  <Form.Label>Dalam berapa bulan anda mendapat pekerjaan?</Form.Label>
                  <Form.Control type="number" name="waktu_mendapat_pekerjaan" />
                  <Form.Check inline label="Tidak" type="radio" name="pekerjaan_6bulan" value="tidak" />
                  <Form.Label>Dalam berapa bulan anda mendapat pekerjaan?</Form.Label>
                  <Form.Control type="number" name="waktu_mendapat_pekerjaan" />
                  <Form.Label>Berapa rata-rata pendapatan per bulan <br /> (take home pay)?</Form.Label>
                  <Form.Control type="text" name="gaji" placeholder="Rp....." />
                </Col>
              </Row>

              <Row as={Row} className="mb-4">
                <Form.Label column md={6}>Dimana lokasi tempat anda bekerja? </Form.Label>
                <Col md={6} >
                  <Form.Label column md={6}>Provinsi:</Form.Label>
                  <Form.Control
                    type="text"
                    name="provinsi_kerja"
                    placeholder="Masukkan Nama Provinsi"
                  />

                  <Form.Label column md={6}>Kabupaten/Kota:</Form.Label>
                  <Form.Control
                    type="text"
                    name="kota_kerja"
                    placeholder="Masukkan Nama Kota/Kabupaten"
                  />
                </Col>
              </Row>

              <Row className="mb-4">
                <Form.Label column md={6}>Apa jenis perusahaan/instansi/institusi tempat anda bekerja sekarang?</Form.Label>
                <Col md={6} >
                  <Form.Check className="mb-2" label="Instansi Pemerintah (Termasuk BUMN)" type="radio" name="bekerja" value="Instansi Pemerintah (Termasuk BUMN)" />
                  <Form.Check className="mb-2" label="Besar" type="radio" name="bekerja" value="Besar" />
                  <Form.Check className="mb-2" label="Cukup Besar" type="radio" name="bekerja" value="Cukup Besar" />
                  <Form.Check className="mb-2" label="Kurang" type="radio" name="bekerja" value="Kurang" />
                  <Form.Check className="mb-2" label="Kurang" type="radio" name="bekerja" value="Kurang" />
                  <Form.Check className="mb-2" label="Lainnya, Tuliskan:" type="radio" name="bekerja" value="ainnya, Tuliskan:" />
                  <Form.Control type="text" placeholder="Tuliskan Lainnya" />
                </Col>
              </Row>

              <Row className="mb-4">
                <Form.Label column md={6}>Apa nama perusahaan/kantor tempat anda bekerja?</Form.Label>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    name="nama_perusahaan"
                    placeholder="Masukkan Kantor Tempat Anda Bekerja"
                  />
                </Col>
              </Row>

              <Row className="mb-4">
                <Form.Label column md={6}>Apa nama perusahaan/kantor tempat anda bekerja?</Form.Label>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    name="nama_perusahaan"
                    placeholder="Masukkan Kantor Tempat Anda Bekerja"
                  />
                </Col>
              </Row>

              <Row className="mb-4">
                <Form.Label column md={6}>Bila berwiraswasta, apa posisi/jabatan anda saat ini?</Form.Label>
                <Col md={6}>
                  <Form.Select >
                    <option value="">-- Pilih Posisi --</option>
                    <option value="Founder">Founder</option>
                    <option value="Co-Founder"> Co-Founder</option>
                    <option value="Staff">Staff</option>
                    <option value="Freelance/Kerja Lepas">Freelance/Kerja Lepas</option>
                  </Form.Select>
                </Col>
              </Row>

              <Row className="mb-4">
                <Form.Label column md={6}>Apa tingkat tempat kerja anda?</Form.Label>
                <Col md={6}>
                  <Form.Select >
                    <option value="">-- Pilih Tingkatan --</option>
                    <option value="Lokal/Wilayah/Wiraswasta Tidak Berbadan Hukum">Lokal/Wilayah/Wiraswasta Tidak Berbadan Hukum</option>
                    <option value="Nasional/Wiraswasta Berbadan Hukum">Nasional/Wiraswasta Berbadan Hukum</option>
                    <option value="Multinasional/Internasional">Multinasional/Internasional</option>
                  </Form.Select>
                </Col>
              </Row>


              <Row className="mb-4">
                <Form.Label column md={6}>Pertanyaan Seputar Studi Lanjut</Form.Label>
                <Col md={6}>
                  <Form.Label>Sumber Biaya</Form.Label>
                  <Form.Select >
                    <option value="">-- Pilih Sumber Biaya --</option>
                    <option value="sendiri">Biaya Sendiri/Keluarga</option>
                    <option value="beasiswa">Beasiswa</option>
                  </Form.Select>

                  <Form.Label>Nama Perguruan Tinggi</Form.Label>
                  <Form.Control type="text" name="nama_pt" />

                  <Form.Label>Program Studi</Form.Label>
                  <Form.Control type="text" name="program_studi" />

                  <Form.Label>Tanggal Masuk</Form.Label>
                  <Form.Control type="date" name="tanggal_masuk" />
                </Col>
              </Row>

              <Row className="mb-4">
                <Form.Label column md={6}>Sebutkan sumberdana dalam pembiayaan kuliah?</Form.Label>
                <Col >
                  <Form.Check className="mb-2" label="Biaya Sendiri / Keluarga" type="radio" name="bekerja" value="Biaya Sendiri / Keluarga" />
                  <Form.Check className="mb-2" label="Beasiswa ADIK" type="radio" name="bekerja" value="Beasiswa ADIK" />
                  <Form.Check className="mb-2" label=" Beasiswa BIDIKMISI" type="radio" name="bekerja" value=" Beasiswa BIDIKMISI" />
                  <Form.Check className="mb-2" label="Beasiswa PPA" type="radio" name="bekerja" value="Beasiswa PPA" />
                  <Form.Check className="mb-2" label="Beasiswa AFIRMASI" type="radio" name="bekerja" value="Beasiswa AFIRMASI" />
                  <Form.Check className="mb-2" label="Beasiswa Perusahaan/Swasta" type="radio" name="bekerja" value="Beasiswa Perusahaan/Swasta" />
                  <Form.Check className="mb-2" label="Lainnya, tuliskan:" type="radio" name="bekerja" value="Lainnya, tuliskan" />
                  <Form.Control type="text" placeholder="Tuliskan Lainnya" />
                </Col>
              </Row>


            <Row className="mb-5">
              <Form.Label column md={6}>Tingkat pendidikan apa yang paling tepat/sesuai untuk pekerjaan anda saat ini?</Form.Label>
              <Col >
                <Form.Check className="mb-2" label="Setingkat Lebih Tinggi" type="radio" name="tingkatan_pendidikan" value="Setingkat Lebih Tinggi" />
                <Form.Check className="mb-2" label="Tingkat yang Sama" type="radio" name="tingkatan_pendidikan" value="Tingkat yang Sama" />
                <Form.Check className="mb-2" label="Setingkat Lebih Rendah" type="radio" name="tingkatan_pendidikan" value="Setingkat Lebih Rendah" />
                <Form.Check className="mb-2" label="Tidak Perlu Pendidikan Tinggi" type="radio" name="tingkatan_pendidikan" value="Tidak Perlu Pendidikan Tinggi" />
              </Col>
            </Row>

            <Row>
              <Form.Label column md={5}>
                Pada saat lulus, pada tingkat mana kompetensi di bawah ini anda kuasai? (A) <br />
                Pada saat ini, pada tingkat mana kompetensi di bawah ini diperlukan dalam pekerjaan? (B)
              </Form.Label>
              <Col md={7} >
                <Table bordered>
                  <thead className="text-center align-middle">
                    <tr>
                      <th rowSpan="2">Kompetensi</th>
                      <th colSpan="5" >A <br />
                        <div className="d-flex justify-content-between fw-normal text-muted" >
                          <span >Sangat rendah</span>
                          <span>Sangat tinggi</span>
                        </div></th>
                      <th colSpan="5">B <br />
                        <div className="d-flex justify-content-between fw-normal text-muted">
                          <span>Sangat rendah</span>
                          <span>Sangat tinggi</span>
                        </div></th>
                    </tr>
                    <tr>
                      {[...Array(5)].map((_, i) => (
                        <th key={"A" + (i + 1)}>{i + 1}</th>
                      ))}
                      {[...Array(5)].map((_, i) => (
                        <th key={"B" + (i + 1)}>{i + 1}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {competencies.map((comp) => (
                      <tr key={comp.id}>
                        <td>
                          {comp.label} <br />
                          <small className="text-muted">{comp.code}</small>
                        </td>
                        <RatingRow name={`A_${comp.id}`} />
                        <RatingRow name={`B_${comp.id}`} />
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>

            <hr className="mb-0" />
            <Card.Header>
              <p className="mb-0  fw-semibold text-muted text-uppercase"> Kuisioner Optional</p>
            </Card.Header>

            <Row className=" mt-4">
              <Col md={6}>
                <Form.Label>
                  Menurut anda seberapa besar penekanan pada metode pembelajaran
                  di bawah ini dilaksanakan di program studi anda?
                </Form.Label>
              </Col>
            </Row>

            {metodeList.map((metode, index) => (
              <Form.Group as={Row} className="mb-4" key={index}>
                <Col md={{ span: 6, offset: 6 }}>
                  <Form.Label className="fw-semibold">{metode}</Form.Label>
                  {skalaPenilaian.map((skala, idx) => (
                    <Form.Check
                      key={idx}
                      className="mb-2"
                      label={skala}
                      type="radio"
                      name={`metode_${index}`}
                      value={skala}
                    />
                  ))}
                </Col>
              </Form.Group>
            ))}

            <Form.Group as={Row} className="mb-4">
              <Form.Label column md={6}>
                Kapan anda mulai mencari pekerjaan? <br />
                (Mohon pekerjaan sambilan tidak dimasukkan)
              </Form.Label>
              <Col md={6}>
                <Form.Check
                  className="mb-2"
                  label="Sebelum lulus"
                  type="radio"
                  name="waktu_cari_kerja"
                  value="Sebelum lulus"
                />
                <Form.Control
                  type="number"
                  name="bulan_setelah_lulus"
                  placeholder="Berapa bulan setelah lulus"
                />
                <Form.Check
                  className="mb-2 mt-3"
                  label="Setelah lulus"
                  type="radio"
                  name="waktu_cari_kerja"
                  value="Setelah lulus"
                />
                <Form.Control
                  type="number"
                  name="bulan_setelah_lulus2"
                  placeholder="Berapa bulan setelah lulus"
                />
                <Form.Check
                  className="mb-2 mt-3"
                  label="Saya tidak mencari kerja (Lanjut ke pertanyaan selanjutnya)"
                  type="radio"
                  name="waktu_cari_kerja"
                  value="Tidak mencari kerja"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-4">
              <Form.Label column md={6}>
                Bagaimana anda mencari pekerjaan tersebut? <br />
                (Jawaban bisa lebih dari satu)
              </Form.Label>
              <Col md={6}>
                {[
                  "Melalui iklan di koran/majalah, brosur",
                  "Melamar ke perusahaan tanpa mengetahui lowongan yang ada",
                  "Pergi ke bursa/pameran kerja",
                  "Mencari lewat internet/iklan online/milis",
                  "Dihubungi oleh perusahaan",
                  "Menghubungi Kemenakertrans",
                  "Menghubungi agen tenaga kerja komersial/swasta",
                  "Memeroleh informasi dari pusat/kantor pengembangan karir fakultas/universitas",
                  "Menghubungi kantor kemahasiswaan/hubungan alumni",
                  "Membangun jejaring (network) sejak masih kuliah",
                  "Melalui relasi (misalnya dosen, orang tua, saudara, teman, dll.)",
                  "Membangun bisnis sendiri",
                  "Melalui penempatan kerja atau magang",
                  "Bekerja di tempat yang sama dengan tempat kerja semasa kuliah",
                ].map((cara, i) => (
                  <Form.Check
                    key={i}
                    className="mb-2"
                    label={cara}
                    type="checkbox"
                    name="cara_mencari_pekerjaan"
                    value={cara}
                  />
                ))}
                <Form.Check
                  className="mb-2"
                  label="Lainnya:"
                  type="checkbox"
                  name="cara_mencari_pekerjaan"
                  value="Lainnya"
                />
                <Form.Control type="text" placeholder="Tuliskan Lainnya" />
              </Col>
            </Form.Group>

            <Row as={Row} className="mb-4">
              <Form.Label column md={6} >Berapa bulan waktu yang dihabiskan (sebelum dan sesudah kelulusan) untuk memeroleh pekerjaan pertama?</Form.Label>
              <Col md={6}>
                <Form.Check className="mb-2" label="Kira-kira" type="radio" name="pekerjaan_6bulan" value="Kira-kira" />
                <Form.Control type="text" name="waktu_mendapat_pekerjaan" placeholder="Berapa Bulan Sebelum lulus" /><p className="text-muted">Sebelum Lulus</p>
                <Form.Check className="mb-2 mt-2" label="Kira-kira" type="radio" name="pekerjaan_6bulan" value="Kira-kira" />
                <Form.Control type="text" name="waktu_mendapat_pekerjaan" placeholder="Berapa Bulan Setelah lulus" /><p className="text-muted">Sesudah Lulus</p>
              </Col>
            </Row>

            <Row as={Row} className="mb-4">
              <Form.Label column md={6} >Berapa perusahaan/instansi/institusi yang sudah anda lamar <br /> (lewat surat atau e-mail) sebelum anda memeroleh pekerjaan pertama?</Form.Label>
              <Col md={6}>
                <Form.Control type="number" name="waktu_mendapat_pekerjaan" placeholder="Berapa Perusahaan" /><p className="text-muted">Instansi/Perusahaan</p>
              </Col>
            </Row>

            <Row as={Row} className="mb-4">
              <Form.Label column md={6} >Berapa banyak perusahaan/instansi/institusi yang merespons lamaran anda?</Form.Label>
              <Col md={6}>
                <Form.Control type="number" name="waktu_mendapat_pekerjaan" placeholder="Berapa Perusahaan" /><p className="text-muted">Instansi/Perusahaan</p>
              </Col>
            </Row>

            <Row as={Row} className="mb-4">
              <Form.Label column md={6} >Berapa banyak perusahaan/instansi/institusi yang mengundang anda untuk wawancara?</Form.Label>
              <Col md={6}>
                <Form.Control type="number" name="waktu_mendapat_pekerjaan" placeholder="Berapa Perusahaan" /><p className="text-muted">Instansi/Perusahaan</p>
              </Col>
            </Row>

            <Row className="mb-5">
              <Form.Label column md={6}>Bagaimana anda menggambarkan situasi anda saat ini? Jawaban bisa lebih dari satu</Form.Label>
              <Col >
                <Form.Check className="mb-2" label="Saya masih belajar/melanjutkan kuliah profesi atau pascasarjana" type="checkbox" name="tingkatan_pendidikan" value="Saya masih belajar/melanjutkan kuliah profesi atau pascasarjana" />
                <Form.Check className="mb-2" label="Saya menikah" type="checkbox" name="tingkatan_pendidikan" value="Saya menikah" />
                <Form.Check className="mb-2" label="Saya sibuk dengan keluarga dan anak-anak" type="checkbox" name="tingkatan_pendidikan" value="Saya sibuk dengan keluarga dan anak-anak" />
                <Form.Check className="mb-2" label=" Saya sekarang sedang mencari pekerjaan" type="checkbox" name="tingkatan_pendidikan" value=" Saya sekarang sedang mencari pekerjaan" />
                <Form.Check className="mb-2" label=" Lainnya:" type="checkbox" name="tingkatan_pendidikan" value=" Lainnya:" />
                <Form.Control  type="text" name="" placeholder="Isi Lainnya" />
              </Col>
            </Row>

            <Row className="mb-5">
              <Form.Label column md={6}>Bagaimana anda menggambarkan situasi anda saat ini? Jawaban bisa lebih dari satu</Form.Label>
              <Col >
                <Form.Check className="mb-2" label="Tidak" type="radio" name="tingkatan_pendidikan" value="Tidak" />
                <Form.Check className="mb-2" label="Tidak, tapi saya sedang menunggu hasil lamaran kerja" type="radio" name="tingkatan_pendidikan" value="Tidak, tapi saya sedang menunggu hasil lamaran kerja" />
                <Form.Check className="mb-2" label="Ya, saya akan mulai bekerja dalam 2 minggu ke depan" type="radio" name="tingkatan_pendidikan" value="Ya, saya akan mulai bekerja dalam 2 minggu ke depan" />
                <Form.Check className="mb-2" label="Ya, tapi saya belum pasti akan bekerja dalam 2 minggu ke depan" type="radio" name="tingkatan_pendidikan" value="Ya, tapi saya belum pasti akan bekerja dalam 2 minggu ke depan" />
                <Form.Check className="mb-2" label=" Lainnya:" type="radio" name="tingkatan_pendidikan" value=" Lainnya:" />
                <Form.Control  type="text" name="" placeholder="Isi Lainnya" />
              </Col>
            </Row>

            <Row className="mb-5">
              <Form.Label column md={6}>Seberapa erat hubungan antara bidang studi dengan pekerjaan anda?</Form.Label>
              <Col >
                <Form.Check className="mb-2" label="Sangat Erat" type="radio" name="tingkatan_pendidikan" value="Sangat Erat" />
                <Form.Check className="mb-2" label="Erat" type="radio" name="tingkatan_pendidikan" value="Erat" />
                <Form.Check className="mb-2" label="Cukup Erat" type="radio" name="tingkatan_pendidikan" value="Cukup Erat" />
                <Form.Check className="mb-2" label="Kurang Erat" type="radio" name="tingkatan_pendidikan" value="Kurang Erat" />
                <Form.Check className="mb-2" label="Tidak Sama Sekali" type="radio" name="tingkatan_pendidikan" value="  Tidak Sama Sekali" />
              </Col>
            </Row>


            <Form.Group as={Row} className="mb-4">
      <Form.Label column md={6}>
        <strong>(f16)</strong> Jika menurut anda pekerjaan anda saat ini tidak
        sesuai dengan pendidikan anda, mengapa anda mengambilnya? <br />
        <em>Jawaban bisa lebih dari satu</em>
      </Form.Label>
      <Col md={6}>
        {alasanmengambilpekerjaanList.map((alasan, i) => (
          <Form.Check
            key={i}
            className="mb-2"
            label={` ${alasan}`}
            type="checkbox"
            name="alasan_pekerjaan_tidak_sesuai"
            value={alasan}
          />
        ))}
        <Form.Check
          className="mb-2"
          label="[13] Lainnya:"
          type="checkbox"
          name="alasan_pekerjaan_tidak_sesuai"
          value="Lainnya"
        />
        <Form.Control
          type="text"
          name="alasan_pekerjaan_tidak_sesuai_lainnya"
          placeholder="alasan lainnya"
        />
      </Col>
    </Form.Group>





            <div className="d-flex justify-content-end">
              <Button type="submit" variant="primary" >
                Tambah
              </Button>
            </div>

          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TambahAlumni;
