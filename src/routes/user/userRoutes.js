import express from 'express';
import { authUser, createUser, findUserByEmail, userEditPreferences } from '../../controllers/userController.js';
import { checkAuthUserMiddleware } from '../../middlewares/checkAuthUserMiddleware.js';

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
});

router.put('/edit/preferences', checkAuthUserMiddleware, async (req, res) => {
  await userEditPreferences(req, res);
});

export default router;
