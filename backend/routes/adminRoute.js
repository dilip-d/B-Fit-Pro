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
    rejectTrainer,
    unBlockTrainer,
    unblockUser,
    userInfo
} from '../controllers/adminController.js';

//admin login & signup
router.post('/adminSignup', adminSignup);
router.post('/api/adminLogin', adminSignin);

//user management
router.get('/api/userInfo', userInfo);
router.get('/api/blockUserinfo/:id', blockUser);
router.get('/api/unBlockuserinfo/:id', unblockUser);

//trainer management
router.get('/api/activeTrainerInfo', activeTrainerInfo);
router.get('/api/blockTrainer/:id', blockTrainer);
router.get('/api/unBlockTrainer/:id', unBlockTrainer);
router.get('/api/getTrainerDetails',approvalPendingTrainers);
router.get('/api/trainerReject/:id',rejectTrainer);
router.get('/api/trainerApproval/:id',approveTrainer);



export default router;