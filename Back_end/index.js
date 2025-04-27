import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/database.js"
import router from "./routes/userroute.js";
import AuthRoute from "./routes/AuthRoute.js";
import DosenRouter from "./routes/dosenroute.js";
import MataKuliah from "./routes/matakuliah.js";
import BahanAjar from "./routes/bahanajar.js";
import Absensi from "./routes/absensi.js";
import Msib from "./routes/msib.js";
import Rps from "./routes/rps.js";
import KontrakKuliah from "./routes/kontarkkuliah.js";
import Penelitian from "./routes/penelitian.js";
import Pengabdian from "./routes/pengabdian.js";
import MagangMandiri from "./routes/magangmandiri.js";
import Prestasi from "./routes/prestasi.js";
import KerjaPraktik from "./routes/kerjaprakti.js";
import TugasAkhir from "./routes/tga.js";
import Pmm from "./routes/pmm.js";

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


try {
    await db.authenticate();
    console.log('Database terhubung...');
} catch (error) {
    console.log('Database tidak di temukan');
}

app.use(cors({ credentials: true, origin: "http://localhost:5173" }))
app.use(cookieParser());
app.use(express.json());
app.use("/uploads/bahan_ajar", express.static("uploads/bahan_ajar"));
app.use("/uploads/absensi", express.static("uploads/absensi"));
app.use("/uploads/rps", express.static("uploads/rps"));
app.use("/uploads/kontrak_kuliah", express.static("uploads/kontrak_kuliah"));
app.use("/uploads/penelitian", express.static("uploads/penelitian"));
app.use("/uploads/pengabdian", express.static("uploads/pengabdian"));
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
app.use(Msib);
app.use(MagangMandiri);
app.use(Prestasi);
app.use(KerjaPraktik);
app.use(TugasAkhir);
app.use(Pmm);



app.listen(5000, () => console.log('server berjalan port 5000'));