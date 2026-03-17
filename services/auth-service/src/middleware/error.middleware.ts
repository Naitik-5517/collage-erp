import { Request, Response, NextFunction } from 'express';
import { logger } from '@college-erp/logger';

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err);
  res.status(500).json({ success: false, error: 'Internal server error' });
};
