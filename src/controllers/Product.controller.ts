import { Router, Request, Response } from 'express';
import ProductService from '../services/Product.service';

const router = Router();

router.get('/products', async (req: Request, res: Response) => {
  const products = await ProductService.getProducts();
  res.status(200).json(products);
});

router.post('/products', async (req: Request, res: Response) => {
  const { body } = req;
  const product = await ProductService.createProduct(body);
  res.status(201).json(product);
});

export default router;