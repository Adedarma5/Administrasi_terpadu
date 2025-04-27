import express from "express";
import { 
    getMagangMandiri, 
    getMagangMandiriById, 
    createMagangMandiri, 
    updateMagangMandiri, 
    deleteMagangMandiri 
} from "../controllers/magangmandiri.js";
import upload from "../middleware/upload.js";

const router = express.Router();


router.post('/magang_mandiri', upload.fields([
    { name: 'sertifikat', maxCount: 1 },        
    { name: 'konversi_nilai', maxCount: 1 },    
    { name: 'laporan', maxCount: 1 },
]), createMagangMandiri);


router.get('/magang_mandiri', getMagangMandiri);
router.get('/magang_mandiri/:id', getMagangMandiriById);


router.patch('/magang_mandiri/:id', upload.fields([ 
    { name: 'sertifikat', maxCount: 1 },        
    { name: 'konversi_nilai', maxCount: 1 },    
    { name: 'laporan', maxCount: 1 },          
]), updateMagangMandiri);


router.delete('/magang_mandiri/:id', deleteMagangMandiri);

export default router;
