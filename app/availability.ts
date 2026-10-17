export function addDays(day: string, count: number) {
  const value = new Date(`${day}T12:00:00Z`);
  value.setUTCDate(value.getUTCDate() + count);
  return value.toISOString().slice(0, 10);
}

export type BusyPeriod = { date: string; time: string; duration: number };
// Illustrative opening hours, reduced by reservations saved in this browser.
export function availableTimes(day: string, duration: number, today: string, currentMinute = 0, reservations: readonly BusyPeriod[] = []) {
  if (!day || !today || duration <= 0 || day < today || day > addDays(today, 59)) return [];
  const value = new Date(`${day}T12:00:00Z`);
  const weekday = value.getUTCDay();
  if (weekday === 0) return [];
  const close = weekday === 6 ? 15 * 60 : 18 * 60;
  const blocked = [[12 * 60, 13 * 60]];
  if (value.getUTCDate() % 3 === 0) blocked.push([14 * 60 + 30, 15 * 60 + 30]);
  for (const reservation of reservations) {
    if (reservation.date !== day) continue;
    const [hour, minute] = reservation.time.split(':').map(Number);
    const start = hour * 60 + minute;
    blocked.push([start, start + reservation.duration]);
  }
  const result: string[] = [];
  for (let start = 9 * 60; start + duration <= close; start += 30) {
    if (day === today && start < currentMinute + 15) continue;
    if (blocked.some(([from, to]) => start < to && start + duration > from)) continue;
    result.push(`${Math.floor(start / 60)}`.padStart(2, '0') + ':' + `${start % 60}`.padStart(2, '0'));
  }
  return result;
}
