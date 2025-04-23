import { Router } from 'express';
import {
  bookAppointment,
  updateAppointmentStatus,
  getAppointments,
  getAppointmentDetails,
} from '../controllers/appointment.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '@prisma/client';

const router = Router();

// All routes are protected
router.use(authenticate);

// Patient routes
router.post('/', authorize(UserRole.PATIENT), bookAppointment);
router.get('/', getAppointments);
router.get('/:appointmentId', getAppointmentDetails);

// Therapist routes
router.put('/:appointmentId/status', authorize(UserRole.THERAPIST), updateAppointmentStatus);

export default router; 