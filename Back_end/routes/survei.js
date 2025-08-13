import express from 'express';
import {
  createSurvei,
  getSurvei,
  getSurveiById,
  updateSurvei,
  deleteSurvei
} from '../controllers/survei.js';

const router = express.Router();

router.post('/survei', createSurvei);
router.get('/survei', getSurvei);
router.get('/survei/:id', getSurveiById);
router.put('/survei/:id', updateSurvei);
router.delete('/survei/:id', deleteSurvei);

export default router;
