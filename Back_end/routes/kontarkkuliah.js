import express from "express";
import {
    getKontrakKuliah,
    getKontrakKuliahById,
    createKontrakKuliah,
    updateKontrakKuliah,
    deleteKontrakKuliah,
} from "../controllers/kontrakkuliah.js";
import upload from "../middleware/upload.js";
import { verifyToken } from "../middleware/verifytoken.js";

const router = express.Router();

router.get('/kontrak_kuliah',   getKontrakKuliah);
router.get('/kontrak_kuliah/:id',  getKontrakKuliahById);
router.post('/kontrak_kuliah', upload.single("file_kontrak_kuliah"), verifyToken, createKontrakKuliah);
router.patch('/kontrak_kuliah/:id', upload.single("file_kontrak_kuliah"), updateKontrakKuliah);
router.delete('/kontrak_kuliah/:id', deleteKontrakKuliah );

export default router;