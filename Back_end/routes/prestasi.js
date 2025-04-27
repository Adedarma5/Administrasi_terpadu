import express from "express";
import {
    getPrestasi,
    getPrestasiById,
    createPrestasi,
    updatePrestasi,
    deletePrestasi,
} from "../controllers/prestasi.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get('/prestasi', getPrestasi);
router.get('/prestasi/:id', getPrestasiById);
router.post('/prestasi', upload.single("sertifikat"), createPrestasi);
router.patch('/prestasi/:id', upload.single("sertifikat"), updatePrestasi);

router.delete('/prestasi/:id', deletePrestasi);

export default router;