import express from 'express';
import { authUser, createUser, findUserByEmail } from '../../controllers/userController.js';

const router = express.Router();

/* Criar usuario */
router.post('/create', async (req, res) => {
  await createUser(req, res);
});

/* Logar usuario */
router.post('/auth', async (req, res) => {
  await authUser(req, res);
});

/* Verifica se usuario existe */
router.get('/:userEmail', async (req, res) => {
  await findUserByEmail(req, res);
})

export default router;
