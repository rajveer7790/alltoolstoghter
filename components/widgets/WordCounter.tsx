'use client';
import { useMemo, useState } from 'react';
import { countText } from '@/lib/calc/text';
import Readout from './Readout';

export default function WordCounter() {
  const [text, setText] = useState('');
  const s = useMemo(() => countText(text), [text]);
  const readMin = s.readMin < 1 ? `${Math.max(1, Math.round(s.readMin * 60))} sec` : `${Math.ceil(s.readMin)} min`;
  return (
    <div className="tool-card">
      <div className="field">
        <label htmlFor="wc-in">Your text</label>
        <textarea id="wc-in" style={{ minHeight: 180 }} value={text}
          onChange={e => setText(e.target.value)} placeholder="Start typing or paste your text…" />
      </div>
      <Readout results={[
        { label: 'Words', value: s.words.toLocaleString(), main: true },
        { label: 'Characters (with spaces)', value: s.chars.toLocaleString() },
        { label: 'Characters (no spaces)', value: s.charsNoSpace.toLocaleString() },
        { label: 'Sentences', value: String(s.sentences) },
        { label: 'Paragraphs', value: String(s.paragraphs) },
        { label: 'Reading time (~200 wpm)', value: text ? readMin : '—' },
      ]} />
      <p className="privacy-note"><span className="dot" />counted locally — nothing leaves your browser</p>
    </div>
  );
}
