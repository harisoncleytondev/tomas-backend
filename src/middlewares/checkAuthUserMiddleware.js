import jwt from 'jsonwebtoken';
const { verify } = jwt;
import dotenv from 'dotenv';
import User from '../models/userModel';
dotenv.config();

export const checkAuthUserMiddleware = async (req, res, next) => {
  if (req.headers.authorization == null) {
    return res
      .status(404)
      .json({ status: 401, message: 'Token não encontrado.' });
  }
  const token = req.headers.authorization.replace('Bearer ', '');

  try {
    const { email } = verify(token, process.env.JWT_SECRET);
    if (email == null) {
      return res
        .status(401)
        .json({ status: 401, message: 'Conta não autorizada.' });
    }

    const user = await User.findOne({ where: { email: email } });

    if (user == null) {
      return res
        .status(401)
        .json({ status: 401, message: 'Conta não autorizada.' });
    }

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ status: 401, message: 'Conta não autorizada.' });
  }
};
