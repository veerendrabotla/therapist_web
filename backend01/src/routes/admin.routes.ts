import { Router } from 'express';
import {
  getDashboardStats,
  verifyTherapist,
  manageUser,
  listUsers,
  generateReport,
} from '../controllers/admin.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '@prisma/client';

const router = Router();

// All routes are protected and admin-only
router.use(authenticate);
router.use(authorize(UserRole.ADMIN));

// Dashboard
router.get('/dashboard', getDashboardStats);

// User management
router.get('/users', listUsers);
router.put('/users/:userId', manageUser);

// Therapist verification
router.put('/therapists/:therapistId/verify', verifyTherapist);

// Reports
router.get('/reports', generateReport);

export default router; 