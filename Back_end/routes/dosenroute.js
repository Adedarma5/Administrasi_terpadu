import express from "express";
import {
    getDosen,
    getDosenById,
    createDosen,
    updateDosen,
    deleteDosen,
} from "../controllers/dosen.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get('/dosen',  getDosen);
router.get('/dosen/:id',  getDosenById);
router.post('/dosen', upload.single("foto_dosen"), createDosen);
router.patch('/dosen/:id', upload.single("foto_dosen"), updateDosen);
router.delete('/dosen/:id', deleteDosen );

export default router;