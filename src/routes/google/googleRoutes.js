import { Router } from 'express';
import passport from 'passport';
const router = Router();
import dotenv from 'dotenv';
dotenv.config();
import { insertLog } from '../../services/logService.js';
import User from '../../models/userModel.js';
import jwt from 'jsonwebtoken';
const { decode } = jwt;

// select_account faz sempre pedir pra logar independente do navegador tiver uma conta salva
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'], // add email pra aparecer no profile
    prompt: 'select_account',
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/login',
  }),
  async (req, res) => {
    const tokenSend = req.user; 
    const decoded = decode(tokenSend.token);

    if (!decoded) {
      return res.redirect('/login');
    }

    const email = decoded.email;

    const user = await User.findOne({ where: { email } });
    await insertLog(user.user_id, 'login_google', req);

    res.redirect(
      process.env.URL_FRONT_LOGIN.replace(
        'action',
        tokenSend.register === true ? 'register' : 'login'
      ).replace('token', tokenSend.token)
    );
  }
);

export default router;
