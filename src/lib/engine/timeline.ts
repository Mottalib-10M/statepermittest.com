/**
 * Graduated licensing timeline: from a date of birth and a state, the earliest date of each stage.
 * Pure functions on ISO dates (UTC), no clock: the caller passes "today" (RECETTE §17.5).
 */
import { ym, type StateRec } from './states';

export function addMonths(iso: string, months: number): string {
  const [y, m, d] = iso.split('-').map(Number);
  const total = y * 12 + (m - 1) + Math.round(months);
  const ny = Math.floor(total / 12), nm = total % 12;
  const last = new Date(Date.UTC(ny, nm + 1, 0)).getUTCDate();
  return `${ny}-${String(nm + 1).padStart(2, '0')}-${String(Math.min(d, last)).padStart(2, '0')}`;
}
/** Birthday-based age dates: 15.5 → the day the person is 15 years and 6 months old. */
export const atAge = (dob: string, age: number) => { const { y, m } = ym(age); return addMonths(dob, y * 12 + m); };
export const maxIso = (...d: Array<string | null>) => d.filter((x): x is string => !!x).sort().pop() ?? null;
export const addDays = (iso: string, n: number) => new Date(Date.parse(`${iso}T00:00:00Z`) + n * 86400000).toISOString().slice(0, 10);
export const daysBetween = (a: string, b: string) => Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86400000);
/** Next business day (Monday to Friday; public holidays are not modelled and the page says so). */
export function nextBusinessDay(iso: string): string {
  let d = addDays(iso, 1);
  while ([0, 6].includes(new Date(`${d}T00:00:00Z`).getUTCDay())) d = addDays(d, 1);
  return d;
}

export interface Timeline {
  permitFrom: string | null; permitDate: string | null; tooYoung: boolean;
  interFrom: string | null; interByAge: string | null; interByHolding: string | null;
  fullFrom: string | null; at18: string; hours: number | null; nightHours: number | null;
  ageToday: number; fees: number | null;
}
export function timeline(st: StateRec, dob: string, today: string, permitDate?: string | null): Timeline {
  const permitFrom = st.permitAge != null ? atAge(dob, st.permitAge) : null;
  const pd = permitDate || maxIso(permitFrom, today);
  const tooYoung = !!(permitDate && permitFrom && permitDate < permitFrom);
  const interByAge = st.interAge != null ? atAge(dob, st.interAge) : null;
  const interByHolding = pd && st.holdMonths != null ? addMonths(tooYoung && permitFrom ? permitFrom : pd, st.holdMonths) : null;
  const interFrom = interByAge || interByHolding ? maxIso(interByAge, interByHolding) : null;
  const fullByAge = st.fullAge != null ? atAge(dob, st.fullAge) : null;
  const fullFrom = fullByAge ? maxIso(fullByAge, interFrom) : null;
  const ageToday = daysBetween(dob, today) / 365.2425;
  const fees = st.permitFee != null || st.licenseFee != null ? (st.permitFee ?? 0) + (st.licenseFee ?? 0) : null;
  return { permitFrom, permitDate: pd, tooYoung, interFrom, interByAge, interByHolding, fullFrom, at18: atAge(dob, 18), hours: st.hours, nightHours: st.nightHours, ageToday, fees };
}
