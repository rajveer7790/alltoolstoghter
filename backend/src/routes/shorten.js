import { Router } from 'express';
import { customAlphabet } from 'nanoid';
import { JsonStore } from '../store.js';

const router = Router();
const store = new JsonStore(new URL('../../data/links.json', import.meta.url).pathname);
const newCode = customAlphabet('23456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ', 7); // no ambiguous chars

function isValidHttpUrl(s) {
  try { const u = new URL(s); return u.protocol === 'http:' || u.protocol === 'https:'; }
  catch { return false; }
}

// POST /api/shorten  { url, custom? }  -> { code, shortUrl, target }
router.post('/shorten', (req, res) => {
  const { url, custom } = req.body || {};
  if (!url || typeof url !== 'string' || !isValidHttpUrl(url.trim())) {
    return res.status(400).json({ error: 'Provide a valid http(s) URL.' });
  }
  const target = url.trim();
  let code = (custom || '').trim();
  if (code) {
    if (!/^[A-Za-z0-9_-]{3,32}$/.test(code)) return res.status(400).json({ error: 'Custom alias must be 3–32 letters, numbers, - or _.' });
    if (store.has(code)) return res.status(409).json({ error: 'That alias is already taken.' });
  } else {
    do { code = newCode(); } while (store.has(code));
  }
  store.set(code, { target, created: Date.now(), hits: 0 });
  const base = process.env.PUBLIC_BASE_URL || `${req.protocol}://${req.get('host')}`;
  res.json({ code, shortUrl: `${base}/${code}`, target });
});

// GET /api/expand/:code -> { target, hits, created } (no redirect, for previews)
router.get('/expand/:code', (req, res) => {
  const rec = store.get(req.params.code);
  if (!rec) return res.status(404).json({ error: 'Unknown short code.' });
  res.json(rec);
});

export { router as shortenRouter, store as linkStore };
