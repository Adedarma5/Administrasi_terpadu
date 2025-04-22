import express from "express";
import {
    getMsib,
    getMsibById,
    createMsib,
    updateMsib,
    deleteMsib,
} from "../controllers/msib.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get('/msib',  getMsib);
router.get('/msib/:id',  getMsibById);
router.post('/msib', upload.single("lembar_pengesahan", "lapran", "projek", "sertifikat", "konversi_nilai"), createMsib);
router.patch('/msib/:id', upload.single("lembar_pengesahan", "lapran", "projek", "sertifikat", "konversi_nilai"), updateMsib);
router.delete('/msib/:id', deleteMsib );

export default router;