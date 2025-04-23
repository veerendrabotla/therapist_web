import express from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile,
} from '../controllers/user.controller';
import { auth } from '../middleware/auth.middleware';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);

export default router; 