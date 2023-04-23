import { Router } from 'express';
import { body } from 'express-validator';
import { userController } from '../controllers';
import { requireAuthAdmin, validateRequest } from '../middlewares';

const router = Router();

router.post('/currentuser', validateRequest, userController.currentuser);

router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Proporciona un correo válido.'),
    body('password')
      .notEmpty()
      .withMessage('Proporciona una contraseña válida.'),
    body('validate_password').notEmpty().withMessage('Valida tu contraseña.'),
  ],
  validateRequest,
  userController.signup
);

router.post(
  '/signin',
  [
    body('email').isEmail().withMessage('Proporciona un correo válido.'),
    body('password')
      .notEmpty()
      .withMessage('Proporciona una contraseña válida.'),
  ],
  validateRequest,
  userController.signin
);

router.get('/sellers', requireAuthAdmin, userController.getSellers);

export { router as routerUser };
