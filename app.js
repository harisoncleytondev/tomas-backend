import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import router from './src/routes/routes.js';
import { start } from './src/config/database.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/', router);
start();

app.listen(port, () => console.log(`Backend rodando na porta ${port}`));
