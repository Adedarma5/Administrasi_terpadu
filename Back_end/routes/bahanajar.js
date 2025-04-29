import express from "express";
import {
    getBahanAjar,
    getBahanAjarById,
    createBahanAjar,
    updateBahanAjar,
    deleteBahanAjar,
} from "../controllers/bahanajar.js";
import upload from "../middleware/upload.js";
import { verifyToken } from "../middleware/verifytoken.js";

const router = express.Router();

router.get('/bahan_ajar', verifyToken,  getBahanAjar);
router.get('/bahan_ajar/:id', getBahanAjarById);
router.post('/bahan_ajar', upload.single("file_pendukung"), verifyToken, createBahanAjar);
router.patch('/bahan_ajar/:id', upload.single("file_pendukung"), updateBahanAjar);

router.delete('/bahan_ajar/:id', deleteBahanAjar);

export default router;