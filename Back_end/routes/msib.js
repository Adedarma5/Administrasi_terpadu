import express from "express";
import { 
    getMsib, 
    getMsibById, 
    createMsib, 
    updateMsib, 
    deleteMsib 
} from "../controllers/msib.js";
import upload from "../middleware/upload.js";

const router = express.Router();


router.post('/msib', upload.fields([
    { name: 'lembar_pengesahan', maxCount: 1 },  
    { name: 'laporan', maxCount: 1 },            
    { name: 'projek', maxCount: 1 },             
    { name: 'sertifikat', maxCount: 1 },        
    { name: 'konversi_nilai', maxCount: 1 },    
]), createMsib);


router.get('/msib', getMsib);


router.get('/msib/:id', getMsibById);


router.patch('/msib/:id', upload.fields([
    { name: 'lembar_pengesahan', maxCount: 1 },  
    { name: 'laporan', maxCount: 1 },            
    { name: 'projek', maxCount: 1 },             
    { name: 'sertifikat', maxCount: 1 },        
    { name: 'konversi_nilai', maxCount: 1 },    
]), updateMsib);


router.delete('/msib/:id', deleteMsib);

export default router;
