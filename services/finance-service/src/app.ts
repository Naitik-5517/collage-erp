import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { router } from './routes';

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use('/api/v1', router);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'finance-service' });
});
