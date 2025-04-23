import express from "express";
import {
    getBahanAjar,
    getBahanAjarById,
    createBahanAjar,
    updateBahanAjar,
    deleteBahanAjar,
} from "../controllers/bahanajar.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get('/bahan_ajar', getBahanAjar);
router.get('/bahan_ajar/:id', getBahanAjarById);
router.post('/bahan_ajar', upload.single("file_pendukung"), createBahanAjar);
router.patch('/bahan_ajar/:id', upload.single("file_pendukung"), updateBahanAjar);

router.delete('/bahan_ajar/:id', deleteBahanAjar);

export default router;