import express from "express";
import {
    getPengajaran,
    getPengajaranById,
    createPengajaran,
    updatePengajaran,
    deletePengajaran,
} from "../controllers/pengajaran.js";
import upload from "../middleware/upload.js";
import { verifyToken } from "../middleware/verifytoken.js";


const router = express.Router();

router.get('/pengajaran', verifyToken,  getPengajaran);
router.get('/pengajaran/:id',  getPengajaranById);
router.post('/pengajaran', upload.single("file_pengajaran"),verifyToken, createPengajaran);
router.patch('/pengajaran/:id', upload.single("file_pengajaran"), updatePengajaran);
router.delete('/pengajaran/:id', deletePengajaran );

export default router;