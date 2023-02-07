import express from 'express';
const router = express.Router();

import {
    activeTrainerInfo,
    adminSignin,
    adminSignup,
    approvalPendingTrainers,
    approveTrainer,
    blockTrainer,
    blockUser,
    bookingInfo,
    rejectTrainer,
    unBlockTrainer,
    unblockUser,
    userInfo
} from '../controllers/adminController.js';
import { adminprotect } from '../middleware/authMiddleware.js';

//admin login & signup
router.post('/adminSignup', adminSignup);
router.post('/api/adminLogin', adminSignin);

//user management
router.get('/api/userInfo', adminprotect, userInfo);
router.get('/api/blockUserinfo/:id', adminprotect, blockUser);
router.get('/api/unBlockuserinfo/:id', adminprotect, unblockUser);

//trainer management
router.get('/api/activeTrainerInfo', adminprotect, activeTrainerInfo);
router.get('/api/blockTrainer/:id', adminprotect, blockTrainer);
router.get('/api/unBlockTrainer/:id', adminprotect, unBlockTrainer);
router.get('/api/getTrainerDetails', adminprotect, approvalPendingTrainers);
router.get('/api/trainerReject/:id', adminprotect, rejectTrainer);
router.get('/api/trainerApproval/:id', adminprotect, approveTrainer);

//booking management
router.get('/api/bookingInfo', adminprotect, bookingInfo);

export default router;