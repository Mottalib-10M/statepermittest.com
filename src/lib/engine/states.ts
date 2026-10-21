/**
 * The state dataset: one record per state and DC, built by `scripts/build-states.py` from the
 * official pages read for each field (`data/raw/states-*.json`, with URL and verbatim quote).
 * A null value means "not confirmed on an official page": the site then says so, it never guesses.
 */
import DATA from '../../data/states.json';

export type Txt = { en: string; es: string } | null;
export interface StateRec {
  code: string; name: string; es: string; slug: string; slugEs: string;
  agency: string; agencyUrl: string; handbookUrl: string | null; handbookEdition: string | null;
  permitAge: number | null; holdMonths: number | null; hours: number | null; nightHours: number | null;
  interAge: number | null; fullAge: number | null;
  testQ: number | null; testPass: number | null; testPct: number | null;
  retake: Txt; retakeDays: number | null; retakeBusiness: boolean;
  spanish: boolean | null; permitFee: number | null; licenseFee: number | null;
  /** One fee covers the permit and the first license (licenseFee is then 0). */
  feeCombined: boolean; feeNote: Txt;
  driversEd: Txt; night: Txt; passengers: Txt; phoneBan: boolean | null; u21bac: number | null;
  motoAge: number | null; motoQ: number | null; motoPass: string | null;
  notes: Partial<Record<string, Txt>>;
  src: Record<string, string>;
}
export const STATES: StateRec[] = (DATA as { states: StateRec[] }).states;
export const META = (DATA as { meta: { retrieved: string; fields: number; nulls: number } }).meta;
const BY = new Map(STATES.map((s) => [s.code, s]));
export function stateByCode(code: string): StateRec {
  const s = BY.get(code);
  if (!s) throw new Error(`Unknown state ${code}`);
  return s;
}
export const stateIndex = (code: string) => STATES.findIndex((s) => s.code === code);
export const stateName = (s: StateRec, lang: 'en' | 'es') => (lang === 'es' ? s.es : s.name);

/** Age in decimal years → { y, m } (15.5 → 15 years 6 months; 14.75 → 14 years 9 months). */
export function ym(age: number): { y: number; m: number } {
  const y = Math.floor(age + 1e-9);
  const m = Math.round((age - y) * 12);
  return m === 12 ? { y: y + 1, m: 0 } : { y, m };
}
export function ageLabel(age: number | null, lang: 'en' | 'es'): string {
  if (age == null) return lang === 'es' ? 'no confirmado' : 'not confirmed';
  const { y, m } = ym(age);
  if (lang === 'es') return m ? `${y} años y ${m} ${m === 1 ? 'mes' : 'meses'}` : `${y} años`;
  return m ? `${y} years ${m} month${m === 1 ? '' : 's'}` : `${y} years`;
}
/** Short form: 15½, 16, 14¾ (falls back to "15 y 3 m"). */
export function ageShort(age: number | null): string {
  if (age == null) return '–';
  const { y, m } = ym(age);
  const frac: Record<number, string> = { 0: '', 3: '¼', 6: '½', 9: '¾' };
  return frac[m] !== undefined ? `${y}${frac[m]}` : `${y} y ${m} m`;
}
export function monthsLabel(n: number | null, lang: 'en' | 'es'): string {
  if (n == null) return lang === 'es' ? 'no confirmado' : 'not confirmed';
  if (n === 0) return lang === 'es' ? 'sin mínimo' : 'no minimum';
  if (lang === 'es') return `${n} ${n === 1 ? 'mes' : 'meses'}`;
  return `${n} month${n === 1 ? '' : 's'}`;
}
export const txt = (t: Txt, lang: 'en' | 'es', fallback = '') => (t ? t[lang] : fallback);
