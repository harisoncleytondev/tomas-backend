import express from 'express';
import { authUser, createUser } from '../../controllers/userController.js';

const router = express.Router();

/* Criar usuario */
router.post('/create', (req, res) => {
  createUser(req, res);
});

/* Logar usuario */
router.post('/auth', (req, res) => {
  authUser(req, res);
});

export default router;
