import express from "express";
import {
    getAbsensi,
    getAbsensiById,
    createAbsensi,
    updateAbsensi,
    deleteAbsensi,
} from "../controllers/absensi.js";
import { verifyToken } from "../middleware/verifytoken.js";


const router = express.Router();

router.get('/absensi', verifyToken, getAbsensi);
router.get('/absensi/:id',  getAbsensiById);
router.post('/absensi', verifyToken, createAbsensi);
router.patch('/absensi/:id',  updateAbsensi);
router.delete('/absensi/:id', verifyToken, deleteAbsensi );

export default router;