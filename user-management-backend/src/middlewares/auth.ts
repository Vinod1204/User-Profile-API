// src/middlewares/auth.ts
import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import supabase from '../config/SupabaseClient';

interface AuthenticatedRequest extends Request {
  user?: any;
}

// Rate limiting middleware
export const rateLimiter = rateLimit({
  windowMs: 30 * 1000,
  max: 1,
  message: { error: 'Please wait 30 seconds before making another request' }
});

// Authentication middleware
export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Authentication error' });
  }
};


export const authorizeRole = (allowedRoles: string[]) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      const { data: userRole } = await supabase
        .from('users')
        .select('role')
        .eq('id', req.user.id)
        .single();

      if (!userRole || !allowedRoles.includes(userRole.role)) {
        return res.status(403).json({ error: 'Insufficient permissions' });
      }

      next();
    } catch (error) {
      return res.status(500).json({ error: 'Authorization error' });
    }
  };
};
