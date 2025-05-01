import express from "express";
import { 
    getKegiatanMahasiswaStats,
} from "../controllers/datakegiatanmahasiswa.js";

const router = express.Router();


router.get('/msib', getMsib);

export default router;
