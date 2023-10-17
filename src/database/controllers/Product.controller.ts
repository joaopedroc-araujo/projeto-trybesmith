import { Router, Request, Response } from 'express';
import createProduct from '../database/services/Product.service';

const router = Router();

router.post('/products', async (req: Request, res: Response) => {
  const { body } = req;
  const product = await createProduct(body);
  res.status(201).json(product);
});

export default router;