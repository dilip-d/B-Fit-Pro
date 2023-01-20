import express from 'express';
const router = express.Router();

import {signin, signup} from '../controllers/userController.js';

router.post('/api/clientRegister', signup);
router.post('/api/clientLogin', signin);

export default router;