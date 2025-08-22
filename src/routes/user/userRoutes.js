import express from 'express';
import {
  authUser,
  createUser,
  findUserByEmail,
  userEditPreferences,
} from '../../controllers/userController.js';
import { checkAuthUserMiddleware } from '../../middlewares/checkAuthUserMiddleware.js';
import { checkAdminUserMiddleware } from '../../middlewares/checkAdminUserMiddleware.js';
import Log from '../../models/logModel.js';

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

router.get('/auth/verify', checkAuthUserMiddleware, (_req, res) => {
  return res.status(200).json({ valid: true });
});

router.get('/log/:userId', checkAdminUserMiddleware, async (req, res) => {
  console.log(await Log.findAll({ where: { user_id: req.params.userId} }))
})

export default router;
