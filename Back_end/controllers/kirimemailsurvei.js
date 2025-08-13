import nodemailer from 'nodemailer';

export const kirimEmailSurvei = async (data) => {
  const {
    namaPerusahaanPengguna,
    alamatPerusahaan,
    namaPengisi,
    jabatanPengisi,
    emailPengisi,
    teleponPengisi,
    namaAlumni,
    jabatanAlumni,
    waktuBekerjaDiPerusahaan,
    tahunLulus,
    kesesuaianBidangStudi,
    waktuAdaptasi,
    saranKompetensiTambahan,
    keahlian,
    kerjasama,
    teknologi,
    etikaKerja,
    komunikasi,
    bahasaasing,
    pengembangandiri,
    teknologiinformasi
  } = data;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const aspekPenilaian = [
    { label: 'Etika Kerja', value: etikaKerja },
    { label: 'Keahlian Pada Bidang Ilmu', value: keahlian },
    { label: 'Bahasa Asing', value: bahasaasing },
    { label: 'Penggunaan Teknologi Informasi', value: teknologiinformasi },
    { label: 'Komunikasi', value: komunikasi },
    { label: 'Penguasaan Teknologi', value: teknologi },
    { label: 'Kerja Sama', value: kerjasama },
    { label: 'Pengembangan Diri', value: pengembangandiri },
  ];

  const penilaianHtml = aspekPenilaian.map(({ label, value }) => {
    return `<li><strong>${label}:</strong> ${value || '-'}</li>`;
  }).join('');

  const mailOptions = {
    from: `"Tracer Study" <${process.env.EMAIL_USER}>`,
    to: emailPengisi,
    subject: 'Terima kasih telah mengisi survei pengguna alumni',
    html: `
      <h3>Halo ${namaPengisi},</h3>
      <p>Terima kasih atas waktu Anda telah mengisi survei pengguna alumni. Berikut ringkasan data yang Anda kirimkan:</p>

      <h4>📌 Identitas Perusahaan</h4>
      <ul>
        <li><strong>Nama:</strong> ${namaPerusahaanPengguna}</li>
        <li><strong>Alamat:</strong> ${alamatPerusahaan}</li>
        <li><strong>Jabatan:</strong> ${jabatanPengisi}</li>
        <li><strong>Email & Telepon:</strong> ${emailPengisi} / ${teleponPengisi}</li>
      </ul>

      <h4>👤 Data Alumni</h4>
      <ul>
        <li><strong>Nama:</strong> ${namaAlumni}</li>
        <li><strong>Jabatan:</strong> ${jabatanAlumni}</li>
        <li><strong>Waktu Bekerja:</strong> ${waktuBekerjaDiPerusahaan}</li>
        <li><strong>Tahun Lulus:</strong> ${tahunLulus}</li>
      </ul>

      <h4>📊 Penilaian</h4>
      <p>1 = Sangat Kurang, 5 = Sangat Baik
      <ul>
        ${penilaianHtml}
      </ul>

      <h4>📝 Kesesuaian dan Saran</h4>
      <ul>
        <li><strong>Kesesuaian Bidang Studi:</strong> ${kesesuaianBidangStudi}</li>
        <li><strong>Waktu Adaptasi:</strong> ${waktuAdaptasi}</li>
        <li><strong>Saran Tambahan:</strong> ${saranKompetensiTambahan}</li>
      </ul>

      <p>Salam hormat,<br/>Tim Tracer Study Universitas</p>
    `
  };

  await transporter.sendMail(mailOptions);
};
