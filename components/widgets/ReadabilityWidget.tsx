'use client';
import { useMemo, useState } from 'react';
import Readout from './Readout';

function syllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (word.length <= 3) return word ? 1 : 0;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '');
  const m = word.match(/[aeiouy]{1,2}/g);
  return m ? m.length : 1;
}

export default function ReadabilityWidget() {
  const [text, setText] = useState('');
  const stats = useMemo(() => {
    const words = (text.match(/[A-Za-z]+/g) || []);
    const sentences = (text.match(/[.!?]+(\s|$)/g) || []).length || (text.trim() ? 1 : 0);
    const syl = words.reduce((s, w) => s + syllables(w), 0);
    const W = words.length, S = Math.max(1, sentences);
    if (!W) return null;
    const ease = 206.835 - 1.015 * (W / S) - 84.6 * (syl / W);
    const grade = 0.39 * (W / S) + 11.8 * (syl / W) - 15.59;
    const level = ease >= 80 ? 'Very easy' : ease >= 60 ? 'Plain English' : ease >= 50 ? 'Fairly difficult' : ease >= 30 ? 'Difficult' : 'Very difficult';
    return { ease: Math.round(ease), grade: Math.max(0, Math.round(grade * 10) / 10), level, W, S };
  }, [text]);

  return (
    <div className="tool-card">
      <div className="field">
        <label htmlFor="rd-in">Your text</label>
        <textarea id="rd-in" value={text} onChange={e => setText(e.target.value)} placeholder="Paste a paragraph or more…" style={{ minHeight: 150 }} />
      </div>
      {stats ? (
        <Readout results={[
          { label: 'Flesch Reading Ease', value: `${stats.ease} / 100`, main: true },
          { label: 'Interpretation', value: stats.level },
          { label: 'Flesch-Kincaid grade level', value: String(stats.grade) },
          { label: 'Words / sentences', value: `${stats.W} / ${stats.S}` },
        ]} />
      ) : (
        <Readout results={[{ label: 'Waiting', value: 'Enter some text to score', main: true }]} />
      )}
      <p className="privacy-note"><span className="dot" />analyzed locally</p>
    </div>
  );
}
