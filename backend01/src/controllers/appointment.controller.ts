import { Request, Response } from 'express';
import { PrismaClient, AppointmentStatus } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';

const prisma = new PrismaClient();

export const bookAppointment = async (req: AuthRequest, res: Response) => {
  try {
    const patientId = req.user?.id;
    const { therapistId, dateTime, duration } = req.body;

    // Get therapist profile to check hourly rate
    const therapist = await prisma.user.findUnique({
      where: { id: therapistId },
      include: { therapistProfile: true },
    });

    if (!therapist || !therapist.therapistProfile) {
      return res.status(404).json({ message: 'Therapist not found' });
    }

    // Calculate price based on duration and hourly rate
    const price = (duration / 60) * therapist.therapistProfile.hourlyRate;

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        patientId,
        therapistId,
        dateTime: new Date(dateTime),
        duration,
        price,
        status: AppointmentStatus.PENDING,
      },
    });

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error booking appointment', error });
  }
};

export const updateAppointmentStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;

    const appointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status },
    });

    res.json({
      message: 'Appointment status updated successfully',
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating appointment status', error });
  }
};

export const getAppointments = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { role } = req.user!;

    const appointments = await prisma.appointment.findMany({
      where: {
        ...(role === 'PATIENT' ? { patientId: userId } : { therapistId: userId }),
      },
      include: {
        patient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        therapist: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            therapistProfile: true,
          },
        },
      },
      orderBy: {
        dateTime: 'desc',
      },
    });

    res.json({ appointments });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error });
  }
};

export const getAppointmentDetails = async (req: AuthRequest, res: Response) => {
  try {
    const { appointmentId } = req.params;
    const userId = req.user?.id;

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        patient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        therapist: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            therapistProfile: true,
          },
        },
      },
    });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check if user has access to this appointment
    if (
      appointment.patientId !== userId &&
      appointment.therapistId !== userId &&
      req.user?.role !== 'ADMIN'
    ) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    res.json({ appointment });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointment details', error });
  }
}; 