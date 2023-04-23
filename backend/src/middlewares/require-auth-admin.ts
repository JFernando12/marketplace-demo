import { NextFunction, Request, Response } from 'express';
import { NotAuthorizedError } from '../errors';

export const requireAuthAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  if (req.currentUser.role !== 'admin') {
    throw new NotAuthorizedError();
  }

  next();
};
