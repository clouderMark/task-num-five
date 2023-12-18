import express from 'express';
import UserController from '../controlers/User.js';

const router = new express.Router();

router.put('/getall', UserController.getAll);

export default router;
