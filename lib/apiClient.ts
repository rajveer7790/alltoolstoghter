/** Base URL of the optional All Tools Together backend. Inlined at build time.
 *  Unset → tools that need the backend show a friendly "not configured" state. */
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '';
export const hasBackend = API_BASE.length > 0;

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  if (!hasBackend) throw new Error('BACKEND_NOT_CONFIGURED');
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as any).error || `Request failed (${res.status}).`);
  return data as T;
}
