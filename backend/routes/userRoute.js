import express from 'express';
const router = express.Router();

import { checkAvailability, resendOTP, signin, signup, trainerDetail, trainerList, verifyOTP } from '../controllers/userController.js';
import { Clientprotect } from '../middleware/authMiddleware.js';

//signup and login
router.post('/api/clientRegister', signup);
router.post('/api/verifyOTP/:id', verifyOTP);
router.post('/api/resendOTP', resendOTP);
router.post('/api/clientLogin', signin);

//trainer list and detail
router.get('/api/trainerList', trainerList);
router.get('/api/trainerDetail/:id', trainerDetail);

//Availabilty & booking
router.post('/api/checkAvailability/:id', Clientprotect, checkAvailability);
router.get('/api/payment/:id', Clientprotect, Payment);
export default router;