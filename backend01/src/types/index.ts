import { User, UserRole, TherapistProfile, Appointment, AppointmentStatus } from '@prisma/client';

export interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export interface AuthRequest extends Request {
  user?: JWTPayload;
}

export interface CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phoneNumber?: string;
}

export interface CreateTherapistProfileDto {
  specialization: string[];
  bio: string;
  experience: number;
  education: string[];
  hourlyRate: number;
}

export interface CreateAppointmentDto {
  therapistId: string;
  dateTime: Date;
  duration: number;
  notes?: string;
}

export interface UpdateAvailabilityDto {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface SendMessageDto {
  receiverId: string;
  content: string;
}

export interface CreateReviewDto {
  therapistId: string;
  rating: number;
  comment?: string;
}

// Response types
export interface AuthResponse {
  token: string;
  user: Omit<User, 'password'>;
}

export interface TherapistProfileResponse extends TherapistProfile {
  user: Omit<User, 'password'>;
  averageRating: number;
  totalReviews: number;
}

export interface AppointmentResponse extends Appointment {
  patient: Omit<User, 'password'>;
  therapist: Omit<User, 'password'>;
}

// Custom error type
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
} 