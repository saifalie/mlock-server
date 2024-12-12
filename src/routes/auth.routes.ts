import { Router } from 'express';
import { signInWithGoogle } from '../controllers/auth/auth.controller.js';
import { errorHanlder } from '../utils/error-handler.js';

const authRoutes: Router = Router();

authRoutes.route('/login').post(errorHanlder(signInWithGoogle));

export default authRoutes;
