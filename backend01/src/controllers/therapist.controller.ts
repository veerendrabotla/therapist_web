import { Request, Response } from 'express';
import { PrismaClient, User, TherapistProfile, Review } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';

const prisma = new PrismaClient();

export const updateTherapistProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const {
      specialization,
      bio,
      experience,
      education,
      hourlyRate,
    } = req.body;

    const therapistProfile = await prisma.therapistProfile.update({
      where: { userId },
      data: {
        specialization,
        bio,
        experience,
        education,
        hourlyRate,
      },
    });

    res.json({
      message: 'Therapist profile updated successfully',
      profile: therapistProfile,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating therapist profile', error });
  }
};

export const setAvailability = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { availability } = req.body;

    // First, get the therapist profile
    const therapistProfile = await prisma.therapistProfile.findUnique({
      where: { userId },
    });

    if (!therapistProfile) {
      return res.status(404).json({ message: 'Therapist profile not found' });
    }

    // Delete existing availability
    await prisma.availability.deleteMany({
      where: { therapistId: therapistProfile.id },
    });

    // Create new availability slots
    const createdAvailability = await prisma.availability.createMany({
      data: availability.map((slot: any) => ({
        therapistId: therapistProfile.id,
        dayOfWeek: slot.dayOfWeek,
        startTime: slot.startTime,
        endTime: slot.endTime,
        isAvailable: true,
      })),
    });

    res.json({
      message: 'Availability updated successfully',
      availability: createdAvailability,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error setting availability', error });
  }
};

export const getTherapistProfile = async (req: Request, res: Response) => {
  try {
    const { therapistId } = req.params;

    const therapist = await prisma.user.findUnique({
      where: { id: therapistId },
      include: {
        therapistProfile: {
          include: {
            availability: true,
            reviews: true,
          },
        },
      },
    });

    if (!therapist || !therapist.therapistProfile) {
      return res.status(404).json({ message: 'Therapist not found' });
    }

    res.json({
      therapist: {
        id: therapist.id,
        firstName: therapist.firstName,
        lastName: therapist.lastName,
        profile: therapist.therapistProfile,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching therapist profile', error });
  }
};

export const listTherapists = async (req: Request, res: Response) => {
  try {
    const { specialization, minRating, maxPrice } = req.query;

    const therapists = await prisma.user.findMany({
      where: {
        role: 'THERAPIST',
        isBlocked: false,
        therapistProfile: {
          status: 'VERIFIED',
          ...(specialization && {
            specialization: {
              has: specialization as string,
            },
          }),
          ...(maxPrice && {
            hourlyRate: {
              lte: parseFloat(maxPrice as string),
            },
          }),
        },
      },
      include: {
        therapistProfile: {
          include: {
            availability: true,
            reviews: true,
          },
        },
      },
    });

    // Filter by minimum rating if specified
    let filteredTherapists = therapists;
    if (minRating) {
      filteredTherapists = therapists.filter((therapist: User & { therapistProfile: (TherapistProfile & { reviews: Review[] }) | null }) => {
        const reviews = therapist.therapistProfile?.reviews || [];
        const avgRating =
          reviews.reduce((sum: number, review: Review) => sum + review.rating, 0) /
          reviews.length;
        return avgRating >= parseFloat(minRating as string);
      });
    }

    res.json({
      therapists: filteredTherapists.map((therapist: User & { therapistProfile: (TherapistProfile & { reviews: Review[] }) | null }) => ({
        id: therapist.id,
        firstName: therapist.firstName,
        lastName: therapist.lastName,
        profile: therapist.therapistProfile,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error listing therapists', error });
  }
}; 