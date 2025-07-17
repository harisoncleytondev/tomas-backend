import jwt from 'jsonwebtoken';
const { verify } = jwt;
import dotenv from 'dotenv';
dotenv.config();

export const checkAuthUserMiddleware = (req, res, next) => {
  if (req.headers.authorization == null) {
    return res
      .status(404)
      .json({ status: 404, message: 'Token não encontrado.' });
  }
  const token = req.headers.authorization.replace('Bearer ', '');

  try {
    verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ status: 401, message: 'Conta não autorizada.' });
  }
};
