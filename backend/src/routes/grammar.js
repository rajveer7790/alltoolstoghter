import { Router } from 'express';
const router = Router();

/**
 * Grammar/spell check via LanguageTool. The free public API works out of the box;
 * for production, self-host LanguageTool and point LANGUAGETOOL_URL at it.
 * POST /api/grammar { text, language? } -> { matches: [...] }
 */
router.post('/grammar', async (req, res) => {
  const { text, language = 'en-US' } = req.body || {};
  if (!text || typeof text !== 'string' || !text.trim()) return res.status(400).json({ error: 'Provide text to check.' });
  if (text.length > 20000) return res.status(413).json({ error: 'Text too long (max 20,000 characters).' });

  const endpoint = process.env.LANGUAGETOOL_URL || 'https://api.languagetool.org/v2/check';
  try {
    const body = new URLSearchParams({ text, language });
    const r = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
    if (!r.ok) return res.status(502).json({ error: `Grammar service responded ${r.status}.` });
    const data = await r.json();
    const matches = (data.matches || []).map(m => ({
      message: m.message,
      shortMessage: m.shortMessage || '',
      offset: m.offset, length: m.length,
      bad: text.slice(m.offset, m.offset + m.length),
      suggestions: (m.replacements || []).slice(0, 5).map(x => x.value),
      rule: m.rule?.category?.name || m.rule?.id || 'Issue',
      type: m.rule?.issueType || 'misc',
    }));
    res.json({ matches, count: matches.length });
  } catch (e) {
    res.status(502).json({ error: 'Could not reach the grammar service.', detail: e.message });
  }
});

export { router as grammarRouter };
