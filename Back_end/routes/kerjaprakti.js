import express from "express";
import { 
    getKerjaPraktik, 
    getKerjaPraktikById, 
    createKerjaPraktik, 
    updateKerjaPraktik, 
    deleteKerjaPraktik 
} from "../controllers/kerjapraktik.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post('/kerja_praktik', upload.fields([
    { name: 'krs_terakhir', maxCount: 1 },        
    { name: 'pengesahan_prodi', maxCount: 1 },        
    { name: 'pengesahan_pembimbing', maxCount: 1 },    
    { name: 'nilai_perusahaan', maxCount: 1 },
    { name: 'daftar_hadir', maxCount: 1 },
    { name: 'laporan', maxCount: 1 },
    { name: 'projek', maxCount: 1 },
]), createKerjaPraktik);

router.get('/kerja_praktik', getKerjaPraktik);
router.get('/kerja_praktik/:id', getKerjaPraktikById);

router.patch('/kerja_praktik/:id', upload.fields([ 
    { name: 'krs_terakhir', maxCount: 1 },        
    { name: 'pengesahan_prodi', maxCount: 1 },        
    { name: 'pengesahan_pembimbing', maxCount: 1 },    
    { name: 'nilai_perusahaan', maxCount: 1 },          
    { name: 'daftar_hadir', maxCount: 1 },          
    { name: 'laporan', maxCount: 1 },          
    { name: 'projek', maxCount: 1 },          
]), updateKerjaPraktik);

router.delete('/kerja_praktik/:id', deleteKerjaPraktik);

export default router;
