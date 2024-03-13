import express from 'express'
import { test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test)  // router.put, router.post for sending the information (get-> getting) |test is controller we have put in controller file
router.post('/update/:id',verifyToken, updateUser)

export default router;
