import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../models/user.model';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: UserRole;
  };
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void | Response> => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization header is required' });
    }
    
    const token = authHeader.substring(7);
    
    // Verify token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    
    // Add user to request
    req.user = {
      id: decoded.id,
      role: decoded.role
    };
    
    next();
    return;
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ message: 'Invalid authentication token' });
  }
}; 