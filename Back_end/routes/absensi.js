import express from "express";
import {
    getAbsensi,
    getAbsensiById,
    createAbsensi,
    updateAbsensi,
    deleteAbsensi,
} from "../controllers/absensi.js";
import upload from "../middleware/upload.js";
import { verifyToken } from "../middleware/verifytoken.js";


const router = express.Router();

router.get('/absensi', verifyToken,  getAbsensi);
router.get('/absensi/:id',  getAbsensiById);
router.post('/absensi', upload.single("foto"),verifyToken, createAbsensi);
router.patch('/absensi/:id', upload.single("foto"), updateAbsensi);
router.delete('/absensi/:id', deleteAbsensi );

export default router;