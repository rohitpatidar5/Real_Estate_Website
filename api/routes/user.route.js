import express from 'express'
import { test } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/test', test)  // router.put, router.post for sending the information (get-> getting) |test is controller we have put in controller file

export default router;
