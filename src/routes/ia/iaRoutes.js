import { Router } from 'express';
import fs from 'fs';
import { checkAuthUserMiddleware } from '../../middlewares/checkAuthUserMiddleware.js';
import { checkUserAcessDayMiddleware } from '../../middlewares/checkUserAccessDayMiddleware.js';
import dotenv from 'dotenv';
import path from 'path';
import csv from 'csv-parser';
dotenv.config();

const router = Router();
let rag_data = [];

export const loadRAG = (url) => {
  fs.readdir(url, (err, files) => {
    if (err) {
      console.log('Erro ao carregar RAG');
      return;
    }

    console.log('RAG antes:', rag_data);

    files.forEach((file) => {
      const results = [];
      fs.createReadStream(path.join(url, file))
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          rag_data.push(...results); // acumula tudo no rag_data
          console.log(`[RAG] ${file} -> ${results.length} registros`);
        })
        .on('error', (err) => {
          console.log('Erro ao processar:', err);
        });
    });
  });
};

function transformMessages(history) {
  if (history == null) return [];
  return history.map((msg) => ({
    role: msg.is_bot ? 'assistant' : 'user',
    content: msg.message_content,
  }));
}

const contextMessage = `
Você é um RAG amigável e empático, especializado em ajudar pessoas neurodivergentes.
Responda de forma direta, simples, acessível e **sempre resumida**, usando a mesma língua da pergunta.
Aqui está o contexto confiável que você pode usar:
${rag_data}
`;

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
              { role: 'system', content: `${contextMessage}\n${systemPrompt}` },
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
