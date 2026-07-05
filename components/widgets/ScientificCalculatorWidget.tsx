'use client';
import { useCallback, useReducer } from 'react';

/* ── safe math engine (no eval, no external deps) ─────────────────────────── */
const DEG = Math.PI / 180;

function tokenise(expr: string): string[] {
  const re = /(\d+\.?\d*(?:e[+-]?\d+)?|[+\-*/^%(),.!]|π|e(?![0-9])|sin|cos|tan|asin|acos|atan|log|ln|sqrt|abs|floor|ceil|round)/gi;
  return expr.match(re) ?? [];
}

type ParseState = { tokens: string[]; pos: number; deg: boolean };

function peek(s: ParseState) { return s.tokens[s.pos]; }
function consume(s: ParseState) { return s.tokens[s.pos++]; }

function parseExpr(s: ParseState): number { return parseAddSub(s); }

function parseAddSub(s: ParseState): number {
  let left = parseMulDiv(s);
  while (peek(s) === '+' || peek(s) === '-') {
    const op = consume(s);
    const right = parseMulDiv(s);
    left = op === '+' ? left + right : left - right;
  }
  return left;
}

function parseMulDiv(s: ParseState): number {
  let left = parsePower(s);
  while (peek(s) === '*' || peek(s) === '/' || peek(s) === '%') {
    const op = consume(s);
    const right = parsePower(s);
    if (op === '*') left *= right;
    else if (op === '/') { if (right === 0) throw new Error('Division by zero'); left /= right; }
    else left %= right;
  }
  return left;
}

function parsePower(s: ParseState): number {
  const base = parseUnary(s);
  if (peek(s) === '^') { consume(s); return Math.pow(base, parsePower(s)); }
  return base;
}

function parseUnary(s: ParseState): number {
  if (peek(s) === '-') { consume(s); return -parseUnary(s); }
  if (peek(s) === '+') { consume(s); return parseUnary(s); }
  return parsePostfix(s);
}

function parsePostfix(s: ParseState): number {
  let val = parsePrimary(s);
  while (peek(s) === '!') { consume(s); val = factorial(val); }
  return val;
}

function factorial(n: number): number {
  if (!Number.isInteger(n) || n < 0 || n > 170) throw new Error('Factorial needs a non-negative integer ≤ 170');
  let r = 1; for (let i = 2; i <= n; i++) r *= i; return r;
}

function parsePrimary(s: ParseState): number {
  const t = peek(s);
  if (!t) throw new Error('Unexpected end of expression');

  // number literals
  if (/^\d/.test(t)) { consume(s); return parseFloat(t); }
  if (t.toLowerCase() === 'π' || t === 'pi') { consume(s); return Math.PI; }
  if (t === 'e' || t.toLowerCase() === 'e') { consume(s); return Math.E; }

  // parentheses
  if (t === '(') {
    consume(s);
    const val = parseExpr(s);
    if (peek(s) !== ')') throw new Error('Missing closing parenthesis');
    consume(s); return val;
  }

  // functions
  const fn = t.toLowerCase();
  const FUNCS = ['sin','cos','tan','asin','acos','atan','log','ln','sqrt','abs','floor','ceil','round'];
  if (FUNCS.includes(fn)) {
    consume(s);
    if (peek(s) !== '(') throw new Error(`Expected ( after ${fn}`);
    consume(s);
    const arg = parseExpr(s);
    if (peek(s) !== ')') throw new Error(`Expected ) after ${fn} argument`);
    consume(s);
    if (s.deg && ['sin','cos','tan'].includes(fn)) return Math[fn as 'sin'](arg * DEG);
    if (s.deg && ['asin','acos','atan'].includes(fn)) return Math[fn as 'asin'](arg) / DEG;
    if (fn === 'ln') return Math.log(arg);
    if (fn === 'log') return Math.log10(arg);
    if (fn === 'sqrt') return Math.sqrt(arg);
    if (fn === 'abs') return Math.abs(arg);
    if (fn === 'floor') return Math.floor(arg);
    if (fn === 'ceil') return Math.ceil(arg);
    if (fn === 'round') return Math.round(arg);
    return (Math as any)[fn](arg);
  }

  throw new Error(`Unknown token: ${t}`);
}

function safeEval(expr: string, deg: boolean): number {
  const tokens = tokenise(expr.trim());
  if (!tokens.length) throw new Error('Empty expression');
  const state: ParseState = { tokens, pos: 0, deg };
  const result = parseExpr(state);
  if (state.pos !== state.tokens.length) throw new Error(`Unexpected token: ${state.tokens[state.pos]}`);
  if (!Number.isFinite(result)) throw new Error('Result is not finite');
  return result;
}

/* ── display formatting ───────────────────────────────────────────────────── */
function fmtResult(n: number): string {
  if (Math.abs(n) >= 1e15 || (Math.abs(n) < 1e-7 && n !== 0)) {
    return n.toExponential(8).replace(/\.?0+e/, 'e');
  }
  const s = parseFloat(n.toPrecision(12)).toString();
  return s;
}

/* ── calculator state machine ─────────────────────────────────────────────── */
type State = { expr: string; display: string; result: string; error: string; deg: boolean; mem: number };
type Action =
  | { type: 'digit' | 'op' | 'fn'; value: string }
  | { type: 'equals' | 'clear' | 'backspace' | 'toggle-deg' | 'mem-store' | 'mem-recall' | 'mem-clear' };

function calcReducer(s: State, a: Action): State {
  switch (a.type) {
    case 'digit':
    case 'op':
      return { ...s, expr: s.expr + a.value, error: '' };
    case 'fn':
      return { ...s, expr: s.expr + a.value + '(', error: '' };
    case 'equals': {
      try {
        const val = safeEval(s.expr, s.deg);
        const r = fmtResult(val);
        return { ...s, result: r, display: r, error: '' };
      } catch (e) {
        return { ...s, error: e instanceof Error ? e.message : 'Error', result: '' };
      }
    }
    case 'clear': return { ...s, expr: '', display: '0', result: '', error: '' };
    case 'backspace': return { ...s, expr: s.expr.slice(0, -1), error: '' };
    case 'toggle-deg': return { ...s, deg: !s.deg };
    case 'mem-store': {
      try { return { ...s, mem: safeEval(s.expr || s.result, s.deg) }; } catch { return s; }
    }
    case 'mem-recall': return { ...s, expr: s.expr + String(s.mem) };
    case 'mem-clear': return { ...s, mem: 0 };
    default: return s;
  }
}

/* ── button layout ────────────────────────────────────────────────────────── */
const ROWS: { label: string; action: Action; wide?: boolean; accent?: 'op' | 'eq' | 'fn' | 'mem' }[] = [
  // Row 1 — mode + memory
  { label: 'DEG/RAD', action: { type: 'toggle-deg' }, accent: 'fn' },
  { label: 'MS', action: { type: 'mem-store' }, accent: 'mem' },
  { label: 'MR', action: { type: 'mem-recall' }, accent: 'mem' },
  { label: 'MC', action: { type: 'mem-clear' }, accent: 'mem' },
  { label: 'AC', action: { type: 'clear' }, accent: 'op' },
  // Row 2 — functions
  { label: 'sin', action: { type: 'fn', value: 'sin' }, accent: 'fn' },
  { label: 'cos', action: { type: 'fn', value: 'cos' }, accent: 'fn' },
  { label: 'tan', action: { type: 'fn', value: 'tan' }, accent: 'fn' },
  { label: '√', action: { type: 'fn', value: 'sqrt' }, accent: 'fn' },
  { label: 'x²', action: { type: 'op', value: '^2' }, accent: 'fn' },
  // Row 3 — functions cont.
  { label: 'sin⁻¹', action: { type: 'fn', value: 'asin' }, accent: 'fn' },
  { label: 'cos⁻¹', action: { type: 'fn', value: 'acos' }, accent: 'fn' },
  { label: 'tan⁻¹', action: { type: 'fn', value: 'atan' }, accent: 'fn' },
  { label: 'log', action: { type: 'fn', value: 'log' }, accent: 'fn' },
  { label: 'ln', action: { type: 'fn', value: 'ln' }, accent: 'fn' },
  // Row 4 — constants + operations
  { label: 'π', action: { type: 'digit', value: 'π' }, accent: 'fn' },
  { label: 'e', action: { type: 'digit', value: 'e' }, accent: 'fn' },
  { label: 'xⁿ', action: { type: 'op', value: '^' }, accent: 'fn' },
  { label: 'n!', action: { type: 'op', value: '!' }, accent: 'fn' },
  { label: '%', action: { type: 'op', value: '%' }, accent: 'op' },
  // Row 5
  { label: '(', action: { type: 'op', value: '(' } },
  { label: ')', action: { type: 'op', value: ')' } },
  { label: '⌫', action: { type: 'backspace' }, accent: 'op' },
  { label: '÷', action: { type: 'op', value: '/' }, accent: 'op' },
  { label: '×', action: { type: 'op', value: '*' }, accent: 'op' },
  // Rows 6-8 — digits + ops
  { label: '7', action: { type: 'digit', value: '7' } },
  { label: '8', action: { type: 'digit', value: '8' } },
  { label: '9', action: { type: 'digit', value: '9' } },
  { label: '−', action: { type: 'op', value: '-' }, accent: 'op' },
  { label: '+', action: { type: 'op', value: '+' }, accent: 'op' },
  { label: '4', action: { type: 'digit', value: '4' } },
  { label: '5', action: { type: 'digit', value: '5' } },
  { label: '6', action: { type: 'digit', value: '6' } },
  // stretch last two cols
  { label: '1', action: { type: 'digit', value: '1' } },
  { label: '2', action: { type: 'digit', value: '2' } },
  { label: '3', action: { type: 'digit', value: '3' } },
  // bottom row
  { label: '0', action: { type: 'digit', value: '0' }, wide: true },
  { label: '.', action: { type: 'digit', value: '.' } },
  { label: '=', action: { type: 'equals' }, accent: 'eq', wide: false },
];

const BTN_COLORS: Record<string, string> = {
  op:  'background:#f3f4f6; color:var(--ink-2);',
  eq:  'background:var(--signal); color:#fff; border-color:var(--signal);',
  fn:  'background:#eff6ff; color:var(--signal-ink); border-color:#bfdbfe;',
  mem: 'background:#f0fdf4; color:#15803d; border-color:#bbf7d0;',
};

export default function ScientificCalculatorWidget() {
  const [state, dispatch] = useReducer(calcReducer, {
    expr: '', display: '0', result: '', error: '', deg: true, mem: 0,
  });

  const handleKey = useCallback((e: React.KeyboardEvent) => {
    const k = e.key;
    if (/[0-9.]/.test(k)) dispatch({ type: 'digit', value: k });
    else if (['+', '-', '*', '/', '^', '%', '(', ')'].includes(k)) dispatch({ type: 'op', value: k });
    else if (k === 'Enter' || k === '=') dispatch({ type: 'equals' });
    else if (k === 'Backspace') dispatch({ type: 'backspace' });
    else if (k === 'Escape') dispatch({ type: 'clear' });
  }, []);

  return (
    <div className="tool-card" onKeyDown={handleKey} tabIndex={-1}
      style={{ outline: 'none', maxWidth: 420, margin: '0 auto' }}>

      {/* Display */}
      <div style={{ background: 'var(--readout-bg)', borderRadius: 10, padding: '14px 16px', marginBottom: 14, minHeight: 86 }}>
        <div style={{ fontSize: 12, color: 'var(--readout-dim)', fontFamily: 'var(--mono)', minHeight: 18, wordBreak: 'break-all' }}>
          {state.expr || '\u00A0'}
        </div>
        <div style={{ fontSize: 28, fontFamily: 'var(--mono)', fontWeight: 700, color: state.error ? '#DC2626' : 'var(--readout-fg)', marginTop: 4, wordBreak: 'break-all' }}>
          {state.error || state.result || state.display}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          <span style={{ fontSize: 11, color: 'var(--readout-dim)' }}>{state.deg ? 'DEG' : 'RAD'}</span>
          {state.mem !== 0 && <span style={{ fontSize: 11, color: 'var(--readout-dim)' }}>M: {fmtResult(state.mem)}</span>}
        </div>
      </div>

      {/* Button grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 5 }}>
        {ROWS.map((btn, i) => (
          <button key={i} type="button"
            onClick={() => dispatch(btn.action)}
            style={{
              ...(btn.wide ? { gridColumn: 'span 2' } : {}),
              border: '1px solid var(--line)', borderRadius: 8, padding: '11px 4px',
              fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'opacity .1s',
              ...(btn.accent ? Object.fromEntries(BTN_COLORS[btn.accent].split(';').filter(Boolean).map(p => p.split(':').map(s => s.trim()) as [string, string])) : { background: '#fff', color: 'var(--ink)' }),
              ...(btn.action.type === 'toggle-deg' ? { fontSize: 11 } : {}),
            }}
          >
            {btn.action.type === 'toggle-deg' ? (state.deg ? 'DEG' : 'RAD') : btn.label}
          </button>
        ))}
      </div>

      <p style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 12, textAlign: 'center' }}>
        You can also type expressions directly — keyboard supported
      </p>
      <p className="privacy-note"><span className="dot" />all calculations run locally — no data sent anywhere</p>
    </div>
  );
}
