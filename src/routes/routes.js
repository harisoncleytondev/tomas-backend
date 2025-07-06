import express from 'express';
const router = express.Router();

/* Rotas */
import userRoutes from './user/userRoutes.js'

router.use('/user', userRoutes);

export default router;