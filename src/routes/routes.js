import express from 'express';
const router = express.Router();

/* Rotas */
import userRoutes from './user/userRoutes.js'
import chatRoutes from './chat/chatRoutes.js'
import googleRoutes from './google/googleRoutes.js'

router.use('/user', userRoutes);
router.use('/chat', chatRoutes);
router.use('/auth', googleRoutes);

export default router;