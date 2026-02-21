import express from 'express';
import {refreshToken, signIn, signOut, signup} from "../controllers/authController.js";

const router = express.Router();

router.post('/signup', signup);

router.post('/signIn', signIn);

router.post('/signOut', signOut);

router.post('/refresh', refreshToken);

export default router;
