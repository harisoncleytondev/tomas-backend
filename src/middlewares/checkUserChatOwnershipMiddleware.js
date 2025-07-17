import jwt from 'jsonwebtoken';
import Chat from '../models/chatModel.js';
const { decode } = jwt;

export const checkUserChatOwnershipMiddleware = async (req, res, next) => {
  if (req.headers.authorization == null) {
    return res
      .status(404)
      .json({ status: 404, message: 'Token não encontrado.' });
  }
  if (req.params.chatId == null) {
    return res
      .status(404)
      .json({ status: 404, message: 'chatId não encontrado.' });
  }

  const token = req.headers.authorization.replace('Bearer ', '');

  const { email } = decode(token);
  const chat = await Chat.findOne({ where: { chat_id: req.params.chatId } });
  if (chat == null) {
    return res
      .status(404)
      .json({ status: 404, message: 'Chat não encontrado.' });
  }

  if (chat.user_email === email) {
    next();
  } else {
    return res
      .status(403)
      .json({ status: 403, message: 'Acesso negado.' });
  }
};
