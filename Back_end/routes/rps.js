import express from "express";
import {
    getRps,
    getRpsById,
    createRps,
    updateRps,
    deleteRps,
} from "../controllers/rps.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get('/rps',  getRps);
router.get('/rps/:id',  getRpsById);
router.post('/rps', upload.single("file_rps"), createRps);
router.patch('/rps/:id', upload.single("file_rps"), updateRps);
router.delete('/rps/:id', deleteRps );

export default router;