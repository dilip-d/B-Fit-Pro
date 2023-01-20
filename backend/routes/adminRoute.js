import express from 'express';
const router = express.Router();

import {adminSignin, adminSignup, blockUser, unblockUser, userInfo} from '../controllers/adminController.js';

//admin login & signup
router.post('/adminSignup',adminSignup);
router.post('/api/adminLogin',adminSignin);

//user management
router.get('/api/userInfo', userInfo);
router.get('/api/blockUserinfo/:id',blockUser);
router.get('/api/unBlockuserinfo/:id',unblockUser);

export default router;