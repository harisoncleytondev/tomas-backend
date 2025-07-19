import jwt from 'jsonwebtoken';
import Chat from '../models/chatModel.js';
import Messages from '../models/messagesModel.js';
const { decode } = jwt;

/* Criar chat e mensagem inicial */
export const createChat = async (req, res) => {
  if (req.body == null) {
    return res.status(400).json({
      status: 400,
      message: 'Informações para criação do chat não encontradas.',
    });
  }

  const token = req.headers.authorization.replace('Bearer ', '');
  const { email } = decode(token);
  const { content } = req.body;

  const words = content.trim().split(/\s+/);
  const title =
    words.length <= 30 ? content.trim() : words.slice(0, 30).join(' ') + '...';

  try {
    const chat = Chat.build({
      chat_title: title,
      user_email: email,
    });
    await chat.save();

    const message = Messages.build({
      message_content: content,
      is_bot: false,
      chat_id: chat.chat_id,
    });
    await message.save();

    return res
      .status(201)
      .json({ status: 201, message: 'Chat criado com sucesso.', chat_id: chat.chat_id });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error });
  }
};

/* Deleta um chat e suas mensagens pelo ID */
export const deleteChatById = async (req, res) => {
  try {
    await Messages.destroy({
      where: { chat_id: req.params.chatId },
    });
    await Chat.destroy({
      where: { chat_id: req.params.chatId}
    })

    return res
      .status(200)
      .json({ status: 200, message: 'Chats e mensagens deletados com sucesso.' });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error });
  }
};

/* Buscar chat pelo ID */
export const findChatById = async (req, res) => {
  const chat = await Chat.findOne({ where: { chat_id: req.params.chatId } });
  const messages = await Messages.findAll({ where: { chat_id: chat.chat_id } });

  res.status(200).json({
    chat: chat,
    messages: messages,
  });

  try {
  } catch (error) {
    return res.status(500).json({ status: 500, message: error });
  }
};

/* Buscar todos os chats associados a uma conta */
export const findAllChats = async (req, res) => {
  const token = req.headers.authorization.replace('Bearer ', '');
  const { email } = decode(token);

  try {
    const chat = await Chat.findAll({ where: { user_email: email } });

    res.status(200).json({
      chat: chat,
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error });
  }
};

/* Criar mensagem pelo ID do chat */
export const createMessageById = async (req, res) => {
  if (req.body == null) {
    return res.status(400).json({
      status: 400,
      message: 'Informações para criação do chat não encontradas.',
    });
  }
  const { content, isBot } = req.body;

  try {
    const message = Messages.build({
      message_content: content,
      is_bot: isBot,
      chat_id: req.params.chatId,
    });

    await message.save();
    return res.status(201).json({
      status: 201,
      message: `Mensagem criada para o chat ${req.params.chatId} com sucesso.`,
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error });
  }
};
