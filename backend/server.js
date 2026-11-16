import express from 'express';
import cors from 'cors';
import { shortenRouter, linkStore } from './src/routes/shorten.js';
import { grammarRouter } from './src/routes/grammar.js';
import { paraphraseRouter } from './src/routes/paraphrase.js';
import { plagiarismRouter } from './src/routes/plagiarism.js';

import { normalizedTarget, checkTarget, rateLimit } from './src/linkSafety.js';
const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));

const origins = (process.env.CORS_ORIGIN || 'https://alltoolstogether.com').split(',').map(s => s.trim());
app.use(cors({ origin: origins.includes('*') ? true : origins }));

app.get('/health', (_req, res) => res.json({ ok: true, service: 'toolsworld-backend' }));

// API routes
app.use('/api', shortenRouter);
app.use('/api', grammarRouter);
app.use('/api', paraphraseRouter);
app.use('/api', plagiarismRouter);

// Short-link redirect: GET /:code  (kept last so it doesn't shadow /api or /health)
app.get('/:code', rateLimit({ limit: 300, windowMs: 60000 }), async (req, res, next) => {
  res.set({ 'X-Robots-Tag': 'noindex, nofollow', 'Cache-Control': 'no-store' });
  try {
  const rec = linkStore.get(req.params.code);
  if (!rec || rec.disabled || !normalizedTarget(rec.target)) return res.status(404).send('Short link not found.');
  const check = await checkTarget(rec.target);
  if (!check.safe) return res.status(check.unavailable ? 503 : 410).send('Destination unavailable or blocked.');
  linkStore.set(req.params.code, { ...rec, hits: (rec.hits || 0) + 1 });
  res.redirect(302, rec.target);
  } catch (error) { next(error); }
});
app.use((error, _req, res, _next) => { console.error('Request failed:', error.name); res.status(500).json({ error: 'The request could not be completed.' }); });

const port = process.env.PORT || 8787;
app.listen(port, () => console.log(`ToolsWorld backend listening on :${port}`));
