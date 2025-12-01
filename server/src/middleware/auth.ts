import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/index.js';
import { verifyToken } from '../utils/jwt.js';

// Middleware to protect routes
export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    // Check for token in Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    // Check for token in cookies (alternative)
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    // No token found
    if (!token) {
      res.status(401).json({
        success: false,
        error: 'Not authorized - no token provided',
      });
      return;
    }

    // Verify token
    const decoded = verifyToken(token);

    // Add user info to request
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Not authorized - invalid token',
    });
  }
};
