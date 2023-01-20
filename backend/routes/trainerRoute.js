import express from 'express';
const router = express.Router();

import { trainerLogin, trainerSignup } from '../controllers/trainerController.js';

router.post('/api/trainerRegister',trainerSignup);
router.post('/trainerLogin', trainerLogin);

export default router;