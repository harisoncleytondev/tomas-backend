import express from 'express';
const router = express.Router();

/* Rotas */
import userRoutes from './user/userRoutes.js'
import chatRoutes from './chat/chatRoutes.js'

router.use('/user', userRoutes);
router.use('/chat', chatRoutes);

export default router;