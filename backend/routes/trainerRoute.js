import express from 'express';
const router = express.Router();

import { addDescription, addPrice, addService, addTips, editProfile, getProfile, trainerLogin, trainerSignup } from '../controllers/trainerController.js';
import { Trainerprotect } from '../middleware/authMiddleware.js';

router.post('/api/trainerRegister', trainerSignup);
router.post('/api/trainerLogin', trainerLogin);

router.get('/api/getProfile/:id', Trainerprotect, getProfile);
router.post('/api/addService/:id', Trainerprotect, addService);
router.post('/api/addTips/:id', Trainerprotect, addTips);
router.post('/api/addDescription/:id', Trainerprotect, addDescription);
router.post('/api/addPrice/:id', Trainerprotect, addPrice);

router.post('/api/editProfile/:id', Trainerprotect, editProfile)

export default router;