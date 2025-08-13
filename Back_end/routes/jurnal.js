import express from "express";
import {
    getJurnal,
    getJurnalById,
    createJurnal,
    updateJurnal,
    deleteJurnal,
} from "../controllers/jurnal.js";
import { verifyToken } from "../middleware/verifytoken.js";

const router = express.Router();

router.get('/jurnal', verifyToken, getJurnal);
router.get('/jurnal/:id', getJurnalById);
router.post('/jurnal', verifyToken, createJurnal);
router.patch('/jurnal/:id', updateJurnal);
router.delete('/jurnal/:id', deleteJurnal);

export default router;