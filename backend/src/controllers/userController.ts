import { Request, Response } from 'express';
import { User } from '../models';
import JsonWebToken from 'jsonwebtoken';
import { JWT_KEY } from '../env';
import bcrypt from 'bcrypt';
import { InvalidCredentialsError } from '../errors';
import { DuplicateUserError } from '../errors/duplicate-user-error';
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../services/password';

export const currentuser = async (req: Request, res: Response) => {
  const user = req.currentUser;
  res.send(user);
};

export const signup = async (req: Request, res: Response) => {
  const { email, password, validate_password } = req.body;

  if (password !== validate_password) {
    throw new BadRequestError('Las contraseñas deben coincidir');
  }

  const userExist = await User.findByEmail(email);
  if (userExist) {
    throw new DuplicateUserError();
  }

  const user = await User.create({
    email,
    password,
    role: 'seller',
  });

  const token = JsonWebToken.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_KEY
  );

  res.send({ token });
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findByEmail(email);

  if (!user) {
    throw new InvalidCredentialsError();
  }

  const passwordMatch = await Password.compare(user.password, password);
  if (!passwordMatch) {
    throw new InvalidCredentialsError();
  }

  const token = JsonWebToken.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_KEY
  );

  res.send({ token });
};

export const getSellers = async (req: Request, res: Response) => {
  const users = await User.findSellers();

  res.send(users);
};
