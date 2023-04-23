import { Router } from 'express';
import { body } from 'express-validator';
import {
  requireAuthAdmin,
  requireAuthSeller,
  validateRequest,
} from '../middlewares';
import { productController } from '../controllers';
const router = Router();

router.post(
  '/',
  requireAuthSeller,
  [
    body('name').notEmpty().withMessage('name must be not empty'),
    body('sku').notEmpty().withMessage('description must be not empty'),
    body('quantity')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  productController.createProduct
);
router.get('/', requireAuthSeller, productController.getProductsBySeller);
router.get('/admin', requireAuthAdmin, productController.getProductsAdmin);
router.get('/buyer', productController.getProductsBuyer);

export { router as routerProduct };
