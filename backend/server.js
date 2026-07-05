import express from 'express';
import cors from 'cors';
import { shortenRouter, linkStore } from './src/routes/shorten.js';
import { grammarRouter } from './src/routes/grammar.js';
import { paraphraseRouter } from './src/routes/paraphrase.js';
import { plagiarismRouter } from './src/routes/plagiarism.js';

const app = express();
app.use(express.json({ limit: '1mb' }));

const origins = (process.env.CORS_ORIGIN || '*').split(',').map(s => s.trim());
app.use(cors({ origin: origins.includes('*') ? true : origins }));

app.get('/health', (_req, res) => res.json({ ok: true, service: 'toolsworld-backend' }));

// API routes
app.use('/api', shortenRouter);
app.use('/api', grammarRouter);
app.use('/api', paraphraseRouter);
app.use('/api', plagiarismRouter);

// Short-link redirect: GET /:code  (kept last so it doesn't shadow /api or /health)
app.get('/:code', (req, res) => {
  const rec = linkStore.get(req.params.code);
  if (!rec) return res.status(404).send('Short link not found.');
  linkStore.set(req.params.code, { ...rec, hits: (rec.hits || 0) + 1 });
  res.redirect(302, rec.target);
});

const port = process.env.PORT || 8787;
app.listen(port, () => console.log(`ToolsWorld backend listening on :${port}`));
