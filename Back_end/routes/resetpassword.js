import express from 'express';
import { forgotPassword, resetPassword, verifyResetToken } from '../controllers/resetpassword.js';

const router = express.Router();

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/verify-reset-token', verifyResetToken);

export default router;
