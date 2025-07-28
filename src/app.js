import express from 'express';
import cors from 'cors';
import { configurePassport } from './config/passport.js';
import dotenv from 'dotenv';
dotenv.config();

import router from './routes/routes.js';
import { start } from './config/database.js';

const app = express();
const port = process.env.PORT || 3000;

configurePassport();
app.use(express.json());
app.use(cors({
    origin: process.env.URL_FRONTEND,// permite apenas o dominio do frontend
	methods: ['GET', 'POST', 'PUT', 'DELETE'], 
	allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use('/', router);
start();

app.listen(port, () => console.log(`Backend rodando na porta ${port}`));
