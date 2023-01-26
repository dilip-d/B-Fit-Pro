import express from 'express';
const router = express.Router();

import { addDescription, addService, addTips, getProfile, trainerLogin, trainerSignup } from '../controllers/trainerController.js';

router.post('/api/trainerRegister',trainerSignup);
router.post('/api/trainerLogin', trainerLogin);

router.get('/api/getProfile/:id', getProfile);
router.post('/api/addService/:id', addService);
router.post('/api/addTips/:id', addTips);
router.post('/api/addDescription/:id', addDescription);

export default router;