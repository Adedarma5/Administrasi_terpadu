import express from 'express';
import {
  createAlumni,
  getAlumni,
  getAlumniById,
  updateAlumni,
  deleteAlumni
} from '../controllers/alumni.js';

const router = express.Router();

router.post('/alumni', createAlumni);
router.get('/alumni', getAlumni);
router.get('/alumni/:id', getAlumniById);
router.put('/alumni/:id', updateAlumni);
router.delete('/alumni/:id', deleteAlumni);

export default router;
