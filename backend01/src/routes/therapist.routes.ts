import { Router } from 'express';
import {
  updateTherapistProfile,
  setAvailability,
  getTherapistProfile,
  listTherapists,
} from '../controllers/therapist.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '@prisma/client';

const router = Router();

// Public routes
router.get('/', listTherapists);
router.get('/:therapistId', getTherapistProfile);

// Protected routes (therapist only)
router.put('/profile', authenticate, authorize(UserRole.THERAPIST), updateTherapistProfile);
router.put('/availability', authenticate, authorize(UserRole.THERAPIST), setAvailability);

export default router; 