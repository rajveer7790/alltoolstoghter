export type EditorHistory = { versions: Uint8Array[]; cursor: number };
export const newHistory = (bytes: Uint8Array): EditorHistory => ({ versions: [bytes], cursor: 0 });
export function commitHistory(history: EditorHistory, bytes: Uint8Array): EditorHistory {
  const versions = [...history.versions.slice(0, history.cursor + 1), bytes];
  let total = versions.reduce((sum, version) => sum + version.length, 0);
  while (versions.length > 2 && (versions.length > 20 || total > 64 * 1024 * 1024)) total -= versions.shift()!.length;
  return { versions, cursor: versions.length - 1 };
}
