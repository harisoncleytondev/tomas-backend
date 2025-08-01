import jwt from 'jsonwebtoken';
const { decode } = jwt;
import User from '../models/userModel.js';

export const checkUserAcessDayMiddleware = async (req, res, next) => {
  next();
  /*const token = req.headers.authorization.replace('Bearer ', '');
  const { email } = decode(token);

  const { subscription_expires_at } = await User.findOne({
    where: { email: email },
  });
  const date = Date.now();
  if (date >= subscription_expires_at) {
    return res.status(402).json({
      status: 402,
      message: 'Plano expirado',
    });
  }
  next();*/
};
