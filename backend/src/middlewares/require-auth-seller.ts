import { NextFunction, Request, Response } from 'express';
import { NotAuthorizedError } from '../errors';

export const requireAuthSeller = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  if (req.currentUser.role !== 'seller') {
    throw new NotAuthorizedError();
  }

  next();
};
