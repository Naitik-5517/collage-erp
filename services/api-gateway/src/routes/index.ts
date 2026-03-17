import { Router } from 'express';

export const router = Router();

router.get('/', (_req, res) => {
  res.json({ message: 'api-gateway is running' });
});
