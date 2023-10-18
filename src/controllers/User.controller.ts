import { Router, Request, Response } from 'express';
import UserService from '../services/User.service';

type LoginRequest = Request<Record<string, unknown>,
Record<string, unknown>, { username: string; password: string }>;

const router = Router();

router.post('/login', async (req: LoginRequest, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: '"username" and "password" are required' });
    }

    const token = await UserService.login({ username, password });

    return res.status(200).json({ token });
  } catch (error) {
    const { message } = error as Error;
    return res.status(401).json({ message });
  }
});

export default router;
