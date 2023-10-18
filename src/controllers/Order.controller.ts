import { Router, Request, Response } from 'express';
import OrderService from '../services/Order.service';

const router = Router();

router.get('/orders', async (req: Request, res: Response) => {
  const orders = await OrderService.getOrders();
  res.status(200).json(orders);
});

export default router;