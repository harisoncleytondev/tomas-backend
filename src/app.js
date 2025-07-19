import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import router from './routes/routes.js';
import { start } from './config/database.js';

const app = express();
const port = process.env.PORT || 3000;

// rate limit
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 60, 
  message: 'Você está enviando requisições muito rápido. Tente novamente em 1 minuto.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(express.json());
app.use(cors({
    origin: process.env.URL_FRONTEND,// permite apenas o dominio do frontend
	methods: ['GET', 'POST', 'PUT', 'DELETE'], 
	allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(apiLimiter);
app.use('/', router);
start();

app.listen(port, () => console.log(`Backend rodando na porta ${port}`));
