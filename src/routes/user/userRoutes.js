import express from 'express';
import { authUser, createUser } from '../../controllers/userController.js';

const router = express.Router();

/* Criar usuario */
router.post('/create', async (req, res) => {
  await createUser(req, res);
});

/* Logar usuario */
router.post('/auth', async (req, res) => {
  await authUser(req, res);
});

export default router;
