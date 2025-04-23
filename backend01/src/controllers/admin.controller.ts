import { Request, Response } from 'express';
import { PrismaClient, UserRole, TherapistStatus } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';

const prisma = new PrismaClient();

export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    const [
      totalUsers,
      totalTherapists,
      totalAppointments,
      totalRevenue,
      pendingTherapists,
    ] = await Promise.all([
      prisma.user.count({ where: { role: UserRole.PATIENT } }),
      prisma.user.count({ where: { role: UserRole.THERAPIST } }),
      prisma.appointment.count(),
      prisma.appointment.aggregate({
        _sum: { price: true },
        where: { paymentStatus: true },
      }),
      prisma.therapistProfile.count({
        where: { status: TherapistStatus.PENDING },
      }),
    ]);

    res.json({
      stats: {
        totalUsers,
        totalTherapists,
        totalAppointments,
        totalRevenue: totalRevenue._sum.price || 0,
        pendingTherapists,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard stats', error });
  }
};

export const verifyTherapist = async (req: AuthRequest, res: Response) => {
  try {
    const { therapistId } = req.params;
    const { status, rejectionReason } = req.body;

    const therapistProfile = await prisma.therapistProfile.update({
      where: { userId: therapistId },
      data: {
        status,
        ...(status === TherapistStatus.REJECTED && { rejectionReason }),
      },
    });

    res.json({
      message: 'Therapist verification status updated successfully',
      profile: therapistProfile,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying therapist', error });
  }
};

export const manageUser = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;
    const { isBlocked } = req.body;

    const user = await prisma.user.update({
      where: { id: userId },
      data: { isBlocked },
    });

    res.json({
      message: 'User status updated successfully',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isBlocked: user.isBlocked,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error managing user', error });
  }
};

export const listUsers = async (req: AuthRequest, res: Response) => {
  try {
    const { role, isBlocked } = req.query;

    const users = await prisma.user.findMany({
      where: {
        ...(role && { role: role as UserRole }),
        ...(isBlocked !== undefined && { isBlocked: isBlocked === 'true' }),
      },
      include: {
        therapistProfile: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({
      users: users.map((user) => ({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isBlocked: user.isBlocked,
        therapistProfile: user.therapistProfile,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error listing users', error });
  }
};

export const generateReport = async (req: AuthRequest, res: Response) => {
  try {
    const { startDate, endDate, type } = req.query;

    let data;
    if (type === 'appointments') {
      data = await prisma.appointment.findMany({
        where: {
          dateTime: {
            gte: new Date(startDate as string),
            lte: new Date(endDate as string),
          },
        },
        include: {
          patient: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          therapist: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
        orderBy: {
          dateTime: 'desc',
        },
      });
    } else if (type === 'payments') {
      data = await prisma.appointment.findMany({
        where: {
          paymentStatus: true,
          dateTime: {
            gte: new Date(startDate as string),
            lte: new Date(endDate as string),
          },
        },
        select: {
          id: true,
          dateTime: true,
          price: true,
          patient: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          therapist: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
        orderBy: {
          dateTime: 'desc',
        },
      });
    }

    res.json({
      message: 'Report generated successfully',
      data,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating report', error });
  }
}; 