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
import upload from "./middleware/upload.js";

dotenv.config();

const app = express();

// (async()=>{
//     await db.sync();
// })();

try{
    await db.authenticate();
    console.log('Database terhubung...');
} catch (error){
    console.log('Database tidak di temukan');
}

app.use(cors({credentials:true, origin: "http://localhost:5173"}))
app.use(cookieParser());
app.use(express.json());
app.use("/uploads/bahan_ajar", express.static("uploads/bahan_ajar")); 
app.use("/uploads/absensi", express.static("uploads/absensi")); 
app.use(router);
app.use(AuthRoute);
app.use(DosenRouter);
app.use(MataKuliah);
app.use(BahanAjar );
app.use(Absensi );



app.listen(5000, ()=> console.log('server berjalan port 5000'));