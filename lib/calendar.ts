/** Date-only input is a calendar date, never UTC midnight converted to local time. */
export function parseCalendarDate(value: unknown): Date | null {
  const match = String(value ?? '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  const [, ys, ms, ds] = match;
  const y = Number(ys), m = Number(ms), d = Number(ds);
  const result = new Date(0);
  result.setHours(12, 0, 0, 0);
  result.setFullYear(y, m - 1, d);
  return result.getFullYear() === y && result.getMonth() === m - 1 && result.getDate() === d ? result : null;
}
export const calendarDay = (date: Date): number => {
  const utc = new Date(0);
  utc.setUTCFullYear(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor(utc.getTime() / 86400000);
};
