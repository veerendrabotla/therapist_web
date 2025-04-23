import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../index';
import { AppError, CreateUserDto, AuthResponse } from '../types';
import { sendEmail } from '../utils/email';

const signToken = (id: string, email: string, role: string): string => {
  return jwt.sign(
    { userId: id, email, role },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

export const register = async (
  req: Request<{}, {}, CreateUserDto>,
  res: Response<AuthResponse>,
  next: NextFunction
) => {
  try {
    const { email, password, firstName, lastName, role, phoneNumber } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return next(new AppError(400, 'Email already in use'));
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role,
        phoneNumber,
      },
    });

    // Generate token
    const token = signToken(user.id, user.email, user.role);

    // Send verification email
    if (role === 'PATIENT') {
      await sendEmail({
        email: user.email,
        subject: 'Welcome to Therapy Booking',
        message: `Welcome ${user.firstName}! Please verify your email to continue.`,
      });
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response<AuthResponse>,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return next(new AppError(401, 'Incorrect email or password'));
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return next(new AppError(401, 'Incorrect email or password'));
    }

    // Check if user is blocked
    if (user.isBlocked) {
      return next(new AppError(403, 'Your account has been blocked. Please contact support.'));
    }

    // Generate token
    const token = signToken(user.id, user.email, user.role);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (
  req: Request<{ token: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.params;

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

    // Update user
    await prisma.user.update({
      where: { id: decoded.userId },
      data: { isVerified: true },
    });

    res.status(200).json({
      status: 'success',
      message: 'Email verified successfully',
    });
  } catch (error) {
    next(new AppError(400, 'Invalid or expired verification token'));
  }
}; 