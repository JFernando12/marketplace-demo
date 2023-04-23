import { Request, Response, Router } from 'express';
import { Product } from '../models';

export const createProduct = async (req: Request, res: Response) => {
  const user_id = req.currentUser!.id;
  const { name, sku, quantity, price } = req.body;

  const product = await Product.create({
    name,
    sku,
    quantity,
    price,
    user_id,
  });

  res.send({ product });
};

export const getProductsBySeller = async (req: Request, res: Response) => {
  const user_id = req.currentUser!.id;

  const tasks = await Product.findBySeller(user_id);
  res.send(tasks);
};

export const getProductsAdmin = async (req: Request, res: Response) => {
  let { user_id } = req.query;

  const params: Product.FindParams = {};
  if (typeof user_id === 'string' && !isNaN(Number(user_id)) && user_id)
    params.user_id = parseInt(user_id);

  const products = await Product.find(params);

  res.send(products);
};

export const getProductsBuyer = async (req: Request, res: Response) => {
  let { name, sku, minPrice, maxPrice } = req.query;

  const params: Product.FindParams = {};
  if (typeof name == 'string') params.name = name;
  if (typeof sku == 'string') params.sku = sku;
  if (typeof minPrice === 'string' && !isNaN(Number(minPrice)))
    params.minPrice = parseInt(minPrice);
  if (typeof maxPrice === 'string' && !isNaN(Number(maxPrice)))
    params.maxPrice = parseInt(maxPrice);

  const products = await Product.find(params);

  res.send(products);
};
