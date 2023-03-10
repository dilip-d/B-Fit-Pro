import express from 'express';
import { getConversation, getDetails, getUserDetails, postConversation, videoConversation } from '../controllers/conversationController.js';
const router = express.Router();

router.post('/api', postConversation);
router.get('/api/:userid', getConversation);
router.get('/api/trainerDetails/:trainerId', getDetails)
router.get('/api/userdetails/:userId', getUserDetails)

router.get('/api/videoConversation/:id/:userId',videoConversation)

export default router;