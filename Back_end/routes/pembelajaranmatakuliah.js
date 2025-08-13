import express from "express";
import {
    getPembelajaranMataKuliah,
    getAllPembelajaranMataKuliah,
    getPembelajaranMataKuliahById,
    createPembelajaranMataKuliah,
    updatePembelajaranMataKuliah,
    deletePembelajaranMataKuliah,
} from "../controllers/pembelajaranmatakuliah.js";
import upload from "../middleware/upload.js";
import { verifyToken } from "../middleware/verifytoken.js";

const router = express.Router();

router.get('/pembelajaran_mata_kuliah', verifyToken, getPembelajaranMataKuliah);

router.get('/pembelajaran_mata_kuliah/all', getAllPembelajaranMataKuliah);

router.get('/pembelajaran_mata_kuliah/:id', getPembelajaranMataKuliahById);

router.post('/pembelajaran_mata_kuliah', upload.fields([
    { name: 'file_kontrak_kuliah', maxCount: 1 },
    { name: 'file_rps_pembelajaran', maxCount: 1 },
]), verifyToken, createPembelajaranMataKuliah);

router.patch('/pembelajaran_mata_kuliah/:id', upload.fields([
    { name: 'file_kontrak_kuliah', maxCount: 1 },
    { name: 'file_rps_pembelajaran', maxCount: 1 },
]), updatePembelajaranMataKuliah);

router.delete('/pembelajaran_mata_kuliah/:id', deletePembelajaranMataKuliah);

export default router;