import express from 'express';
const router = express.Router();

import {signin, signup, trainerDetail, trainerList} from '../controllers/userController.js';

router.post('/api/clientRegister', signup);
router.post('/api/clientLogin', signin);

router.get('/api/trainerList', trainerList);
router.get('/api/trainerDetail/:id', trainerDetail);

export default router;