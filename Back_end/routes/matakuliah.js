import express from "express";
import {
    getMataKuliah,
    getMataKuliahById,
    createMataKuliah,
    updateMataKuliah,
    deleteMataKuliah,
} from "../controllers/matakuliah.js";

const router = express.Router();

router.get('/mata_kuliah',  getMataKuliah);
router.get('/mata_kuliah/:id',  getMataKuliahById);
router.post('/mata_kuliah', createMataKuliah);
router.patch('/mata_kuliah/:id', updateMataKuliah);
router.delete('/mata_kuliah/:id', deleteMataKuliah );

export default router;