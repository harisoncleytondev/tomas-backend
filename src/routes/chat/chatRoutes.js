import express from 'express';
import { checkAuthUserMiddleware } from '../../middlewares/checkAuthUserMiddleware.js';
import { checkUserChatOwnershipMiddleware } from '../../middlewares/checkUserChatOwnershipMiddleware.js';
import { createChat, createMessageById, deleteChatById, findAllChats, findChatById } from '../../controllers/chatController.js';
const router = express.Router();

/* Cria um chat */
router.post('/create', checkAuthUserMiddleware, async (req, res) => {
  await createChat(req, res);
});

router.delete('/delete/:chatId', checkAuthUserMiddleware, checkUserChatOwnershipMiddleware, async (req, res) => {
  await deleteChatById(req, res);
})

/* Pegar todos os chats */
router.get('/', checkAuthUserMiddleware, async (req, res) => {
  await findAllChats(req, res);
});

/* Pega um chat pelo ID */
router.get(
  '/:chatId', checkAuthUserMiddleware, checkUserChatOwnershipMiddleware, async (req, res) => {
    await findChatById(req, res);
  }
);

router.post('/message/:chatId', checkAuthUserMiddleware, checkUserChatOwnershipMiddleware, async (req, res) => {
  await createMessageById(req, res);
})

export default router;
