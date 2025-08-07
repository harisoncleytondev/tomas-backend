import { Router } from 'express';
import { checkAuthUserMiddleware } from '../../middlewares/checkAuthUserMiddleware.js';
import { checkUserAcessDayMiddleware } from '../../middlewares/checkUserAccessDayMiddleware.js';
import dotenv from 'dotenv';
dotenv.config();

const router = Router();

function transformMessages(history) {
  if (history == null) return [];
  return history.map((msg) => ({
    role: msg.is_bot ? 'assistant' : 'user',
    content: msg.message_content,
  }));
}

router.post(
  '/ask',
  checkAuthUserMiddleware,
  checkUserAcessDayMiddleware,
  async (req, res) => {
    const { history, systemPrompt, question, temperature } = req.body;
    const model = 'llama3-8b-8192';

    try {
      const response = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.GROQ_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: 'system', content: systemPrompt },
              ...transformMessages(history),
              { role: 'user', content: question },
            ],
            temperature,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Erro na API Groq: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || 'Sem resposta.';

      return res.json({ reply });
    } catch (err) {
      console.error('Erro ao processar /ask:', err);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
);

export default router;
