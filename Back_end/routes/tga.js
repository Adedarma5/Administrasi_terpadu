import express from "express";
import { 
    getTugasAkhir, 
    getTugasAkhirById, 
    createTugasAkhir, 
    updateTugasAkhir, 
    deleteTugasAkhir 
} from "../controllers/tga.js";
import upload from "../middleware/upload.js";

const router = express.Router();


router.post('/tugas_akhir', upload.fields([
    { name: 'skripsi', maxCount: 1 },        
    { name: 'program_tga', maxCount: 1 },    
    { name: 'jurnal_sisfo', maxCount: 1 },
]), createTugasAkhir);


router.get('/tugas_akhir', getTugasAkhir);
router.get('/tugas_akhir/:id', getTugasAkhirById);


router.patch('/tugas_akhir/:id', upload.fields([ 
    { name: 'skripsi', maxCount: 1 },        
    { name: 'program_tga', maxCount: 1 },    
    { name: 'jurnal_sisfo', maxCount: 1 },          
]), updateTugasAkhir);


router.delete('/tugas_akhir/:id', deleteTugasAkhir);

export default router;
