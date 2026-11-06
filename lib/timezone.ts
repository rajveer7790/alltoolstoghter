/** Resolve a wall clock time only when it denotes exactly one instant (reject DST gaps/folds). */
export function wallTimeToInstant(value: string, zone: string): number {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) throw new Error('Enter a valid date and time.');
  const wall = Date.parse(value + ':00Z');
  if (!Number.isFinite(wall) || new Date(wall).toISOString().slice(0,16) !== value) throw new Error('Enter a valid date and time.');
  const formatter = new Intl.DateTimeFormat('en-US', { timeZone: zone, year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit', hourCycle:'h23' });
  const shown = (epoch: number) => {
    const p = Object.fromEntries(formatter.formatToParts(epoch).map(p=>[p.type,p.value]));
    return Date.parse(`${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:00Z`);
  };
  const offsets = new Set([-86400000,0,86400000].map(delta=>shown(wall+delta)-(wall+delta)));
  const candidates = [...offsets].map(offset=>wall-offset).filter(epoch=>shown(epoch)===wall);
  if (candidates.length !== 1) throw new Error(candidates.length ? 'This time occurs twice during a daylight-saving change. Choose an unambiguous time.' : 'This local time does not exist during a daylight-saving change. Choose another time.');
  return candidates[0];
}
