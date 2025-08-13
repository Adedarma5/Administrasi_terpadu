import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/database.js";
import router from "./routes/userroute.js";
import AuthRoute from "./routes/AuthRoute.js";
import DosenRouter from "./routes/dosenroute.js";
import MataKuliah from "./routes/matakuliah.js";
import BahanAjar from "./routes/bahanajar.js";
import Absensi from "./routes/absensi.js";
import Msib from "./routes/msib.js";
import Rps from "./routes/rps.js";
import Penelitian from "./routes/penelitian.js";
import Pengabdian from "./routes/pengabdian.js";
import MagangMandiri from "./routes/magangmandiri.js";
import Prestasi from "./routes/prestasi.js";
import KerjaPraktik from "./routes/kerjaprakti.js";
import TugasAkhir from "./routes/tga.js";
import Pmm from "./routes/pmm.js";
import Pengajaran from "./routes/pengajaran.js";
import Alumni from "./routes/alumni.js";
import Survei from "./routes/survei.js";
import ResetPassword from "./routes/resetpassword.js";
import Jurnal from "./routes/jurnal.js";
import { getKegiatanMahasiswaStats, getStats } from './controllers/datakegiatanmahasiswa.js';
import apipenelitian from './controllers/apipenelitian.js';
import PembelajaranMataKuliah from "./routes/pembelajaranmatakuliah.js";
import absensiPertemuanRoutes from './routes/absensipertemuan.js';


dotenv.config();

const app = express();

// (async () => {
//     try {
//         await db.sync({ force: false });
//         console.log("Database sudah di migrate");
//     } catch (error) {
//         console.error(" Migrate  database Error :", error);
//     }
// })();


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
app.use("/uploads/absensi_pertemuan", express.static("uploads/absensi_Pertemuan"));
app.use("/uploads/rps", express.static("uploads/rps"));
app.use("/uploads/pembelajaran_mata_kuliah", express.static("uploads/pembelajaran_mata_kuliah"));
app.use("/uploads/penelitian", express.static("uploads/penelitian"));
app.use("/uploads/pengabdian", express.static("uploads/pengabdian"));
app.use("/uploads/pengajaran", express.static("uploads/pengajaran"));
app.use("/uploads/dosen", express.static("uploads/dosen"));
app.use("/uploads/kegiatan_mahasiswa", express.static("uploads/kegiatan_mahasiswa"));
app.use("/uploads/users", express.static("uploads/users"));

app.use("/absensipertemuan", absensiPertemuanRoutes);


app.use(router);
app.use(AuthRoute);
app.use(DosenRouter);
app.use(MataKuliah);
app.use(BahanAjar);
app.use(Absensi);
app.use(Rps);
app.use(PembelajaranMataKuliah);
app.use(Penelitian);
app.use(Pengabdian);
app.use(Pengajaran);
app.use(Msib);
app.use(MagangMandiri);
app.use(Prestasi);
app.use(KerjaPraktik);
app.use(TugasAkhir);
app.use(Pmm);
app.use(Alumni);
app.use(Pmm);
app.use(ResetPassword);
app.use(Jurnal);
app.use(Survei);
app.use('/proxy-sipp', apipenelitian);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
