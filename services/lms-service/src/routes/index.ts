import { Router } from 'express';

export const router = Router();

router.get('/', (_req, res) => {
  res.json({ message: 'lms-service is running' });
});
