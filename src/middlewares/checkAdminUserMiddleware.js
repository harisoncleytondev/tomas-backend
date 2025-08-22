import jwt from 'jsonwebtoken';
const { decode } = jwt;
import User from '../models/userModel.js';

export const checkAdminUserMiddleware = async (req, res, next) => {
  const token = req.headers.authorization.replace('Bearer ', '');

  const { email } = decode(token);
  const user = await User.findOne({ where: { email: email } });

  if (user.admin) {
    next();
  } else {
    return res
      .status(403)
      .json({ status: 403, message: 'Conta não autorizada' });
  }
};
