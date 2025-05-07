const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./config/database.js");
const router = require("./routes/userroute.js");
const AuthRoute = require("./routes/AuthRoute.js");
const DosenRouter = require("./routes/dosenroute.js");
const MataKuliah = require("./routes/matakuliah.js");
const BahanAjar = require("./routes/bahanajar.js");
const Absensi = require("./routes/absensi.js");
const Msib = require("./routes/msib.js");
const Rps = require("./routes/rps.js");
const KontrakKuliah = require("./routes/kontarkkuliah.js");
const Penelitian = require("./routes/penelitian.js");
const Pengabdian = require("./routes/pengabdian.js");
const MagangMandiri = require("./routes/magangmandiri.js");
const Prestasi = require("./routes/prestasi.js");
const KerjaPraktik = require("./routes/kerjaprakti.js");
const TugasAkhir = require("./routes/tga.js");
const Pmm = require("./routes/pmm.js");
const Pengajaran = require("./routes/pengajaran.js");
const { getKegiatanMahasiswaStats, getStats } = require('./controllers/datakegiatanmahasiswa.js');

dotenv.config();

const app = express();

(async () => {
  try {
    await db.authenticate();
    console.log('Database terhubung...');
  } catch (error) {
    console.log('Database tidak ditemukan:', error.message);
  }
})();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());
app.use(express.json());

app.get('/api/statistik', getStats);
app.get('/api/kegiatan-mahasiswa/statistik', getKegiatanMahasiswaStats);

app.use("/uploads/bahan_ajar", express.static("uploads/bahan_ajar"));
app.use("/uploads/absensi", express.static("uploads/absensi"));
app.use("/uploads/rps", express.static("uploads/rps"));
app.use("/uploads/kontrak_kuliah", express.static("uploads/kontrak_kuliah"));
app.use("/uploads/penelitian", express.static("uploads/penelitian"));
app.use("/uploads/pengabdian", express.static("uploads/pengabdian"));
app.use("/uploads/pengajaran", express.static("uploads/pengajaran"));
app.use("/uploads/dosen", express.static("uploads/dosen"));
app.use("/uploads/kegiatan_mahasiswa", express.static("uploads/kegiatan_mahasiswa"));

app.use(router);
app.use(AuthRoute);
app.use(DosenRouter);
app.use(MataKuliah);
app.use(BahanAjar);
app.use(Absensi);
app.use(Rps);
app.use(KontrakKuliah);
app.use(Penelitian);
app.use(Pengabdian);
app.use(Pengajaran);
app.use(Msib);
app.use(MagangMandiri);
app.use(Prestasi);
app.use(KerjaPraktik);
app.use(TugasAkhir);
app.use(Pmm);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
