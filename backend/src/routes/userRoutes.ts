import { Router } from 'express';
import { body } from 'express-validator';
import { userController } from '../controllers';
import { requireAuthAdmin, validateRequest } from '../middlewares';

const router = Router();

router.post('/currentuser', validateRequest, userController.currentuser);

router.post(
  '/signup',
  [
    body('email').notEmpty().isEmail().withMessage('email must be not empty'),
    body('password').notEmpty().withMessage('password must be not empty'),
    body('validate_password')
      .notEmpty()
      .withMessage('validate password must be not empty'),
  ],
  validateRequest,
  userController.signup
);

router.post(
  '/signin',
  [
    body('email').notEmpty().isEmail().withMessage('email must be not empty'),
    body('password').notEmpty().withMessage('password must be not empty'),
  ],
  validateRequest,
  userController.signin
);

router.get('/sellers', requireAuthAdmin, userController.getSellers);

export { router as routerUser };
