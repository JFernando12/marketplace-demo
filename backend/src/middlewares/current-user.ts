import { NextFunction, Request, Response } from 'express';
import Jwt from 'jsonwebtoken';
import { JWT_KEY } from '../env';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';

interface UserPayload {
  id: number;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return next();
  }

  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    const JwtPayload = Jwt.verify(token, JWT_KEY) as UserPayload;
    req.currentUser = JwtPayload;
  } catch (error) {}

  next();
};
