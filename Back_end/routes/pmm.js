import express from "express";
import {
    getPmm,
    getPmmById,
    createPmm,
    updatePmm,
    deletePmm,
} from "../controllers/pmm.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get('/pmm',  getPmm);
router.get('/pmm/:id',  getPmmById);
router.post('/pmm', upload.single("konversi_nilai"), createPmm);
router.patch('/pmm/:id', upload.single("konversi_nilai"), updatePmm);
router.delete('/pmm/:id', deletePmm );

export default router;