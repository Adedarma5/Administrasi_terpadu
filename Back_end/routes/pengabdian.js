import express from "express";
import {
    getPengabdian,
    getPengabdianById,
    createPengabdian,
    updatePengabdian,
    deletePengabdian,
} from "../controllers/pengabdian.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get('/pengabdian',  getPengabdian,);
router.get('/pengabdian/:id',  getPengabdianById);
router.post('/pengabdian', upload.single("file_kegiatan"), createPengabdian);
router.patch('/pengabdian/:id', upload.single("file_kegiatan"), updatePengabdian);
router.delete('/pengabdian/:id', deletePengabdian );

export default router;