import { Router } from 'express';
const router = Router();

/**
 * Paraphrasing genuinely requires an LLM. This proxies to any OpenAI-compatible
 * chat-completions endpoint configured via env. Without a provider it returns a
 * clear 503 — we do NOT ship a fake client-side "paraphraser".
 * POST /api/paraphrase { text, tone? } -> { result }
 */
router.post('/paraphrase', async (req, res) => {
  const { text, tone = 'standard' } = req.body || {};
  if (!text || !text.trim()) return res.status(400).json({ error: 'Provide text to paraphrase.' });
  const url = process.env.LLM_API_URL, key = process.env.LLM_API_KEY;
  if (!url || !key) {
    return res.status(503).json({ error: 'Paraphrasing is not configured on this server. Set LLM_API_URL and LLM_API_KEY in the backend .env to enable it.' });
  }
  const styles = {
    standard: 'Rewrite clearly while preserving meaning.',
    formal: 'Rewrite in a formal, professional tone.',
    simple: 'Rewrite in plain, simple language.',
    creative: 'Rewrite with more vivid, engaging phrasing.',
  };
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: process.env.LLM_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: `You are a paraphrasing assistant. ${styles[tone] || styles.standard} Return only the rewritten text.` },
          { role: 'user', content: text },
        ],
        temperature: 0.7,
      }),
    });
    if (!r.ok) return res.status(502).json({ error: `LLM provider responded ${r.status}.` });
    const data = await r.json();
    res.json({ result: data.choices?.[0]?.message?.content?.trim() || '' });
  } catch (e) {
    res.status(502).json({ error: 'Could not reach the LLM provider.', detail: e.message });
  }
});

export { router as paraphraseRouter };
