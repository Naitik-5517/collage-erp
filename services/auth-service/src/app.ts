import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { errorMiddleware } from './middleware';
import { router } from './routes';

export const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);
app.use('/api/v1', router);
app.use(errorMiddleware);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'auth-service' });
});
