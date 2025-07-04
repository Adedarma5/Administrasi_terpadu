import express from "express";
import {
    getPenelitian,
    getPenelitianById,
    createPenelitian,
    updatePenelitian,
    deletePenelitian,
} from "../controllers/penelitian.js";
import upload from "../middleware/upload.js";
import { verifyToken } from "../middleware/verifytoken.js";

const router = express.Router();

router.get('/penelitian', verifyToken,  getPenelitian);
router.get('/penelitian/:id',  getPenelitianById);
router.post('/penelitian', upload.single("file_laporan"), verifyToken, createPenelitian);
router.patch('/penelitian/:id', upload.single("file_laporan"), updatePenelitian);
router.delete('/penelitian/:id', deletePenelitian );

export default router;