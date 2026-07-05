import { Router } from 'express';
const router = Router();

/**
 * Real plagiarism detection requires searching the web for matching passages,
 * which needs a paid search API. This splits text into sentences and checks each
 * against a configured search provider. Without one, it returns a clear 503 —
 * we do NOT fabricate similarity scores.
 * POST /api/plagiarism { text } -> { checked, flagged: [{ sentence, matches:[{title,link}] }] }
 */
router.post('/plagiarism', async (req, res) => {
  const { text } = req.body || {};
  if (!text || !text.trim()) return res.status(400).json({ error: 'Provide text to check.' });
  const url = process.env.SEARCH_API_URL, key = process.env.SEARCH_API_KEY;
  if (!url || !key) {
    return res.status(503).json({ error: 'Plagiarism checking is not configured on this server. Set SEARCH_API_URL and SEARCH_API_KEY in the backend .env to enable it.' });
  }
  const sentences = text.match(/[^.!?]+[.!?]+/g)?.map(s => s.trim()).filter(s => s.split(/\s+/).length >= 6).slice(0, 15) || [];
  const flagged = [];
  try {
    for (const sentence of sentences) {
      const r = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-API-KEY': key },
        body: JSON.stringify({ q: `"${sentence}"` }),
      });
      if (!r.ok) continue;
      const data = await r.json();
      const matches = (data.organic || []).slice(0, 3).map(o => ({ title: o.title, link: o.link }));
      if (matches.length) flagged.push({ sentence, matches });
    }
    res.json({ checked: sentences.length, flaggedCount: flagged.length, flagged });
  } catch (e) {
    res.status(502).json({ error: 'Could not reach the search provider.', detail: e.message });
  }
});

export { router as plagiarismRouter };
