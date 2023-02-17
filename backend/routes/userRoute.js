import express from 'express';
const router = express.Router();

import { cancelPlan, checkAvailability, editUserProfile, getBookings, getUserProfile, payment, resendOTP, signin, signup, trainerDetail, trainerList, verifyOTP, verifyPayment } from '../controllers/userController.js';
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
router.post('/api/payment/:id', Clientprotect, payment);
router.post('/api/verifyPayment', Clientprotect, verifyPayment);

//profile
router.get('/api/getUserProfile/:id', Clientprotect, getUserProfile);
router.post('/api/editProfile/:id', Clientprotect, editUserProfile);

//payment & cancellation
router.get('/api/getBookings/:id', Clientprotect, getBookings);
router.get('/api/cancelPlan/:id', Clientprotect, cancelPlan);

export default router;