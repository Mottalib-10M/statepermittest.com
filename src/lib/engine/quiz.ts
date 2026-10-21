/**
 * Practice-test engine: question pools, seeded shuffles (same order at build time and on the first
 * render in the browser, RECETTE §17.5), scoring against a state's real pass mark.
 * Every question is written by Radif Partners from public facts (MUTCD, NHTSA, 49 CFR, state
 * handbooks and statutes); none is copied from a DMV test bank, a book or a competitor.
 */
import GENERAL from '../../data/questions/bank-general.json';
import CM from '../../data/questions/bank-cdl-moto.json';
import { stateQuestions } from './state-questions';
import { stateByCode, type StateRec } from './states';

export type Lang = 'en' | 'es';
export type TestType = 'car' | 'signs' | 'moto' | 'cdl';
export interface Question {
  id: string; t: string; src: string; sign?: string;
  q: Record<Lang, string>; o: Record<Lang, string[]>; a: number; x: Record<Lang, string>;
}
export const BANK: Question[] = GENERAL as Question[];
export const CDL: Question[] = (CM as { cdl: Question[] }).cdl;
export const MOTO: Question[] = (CM as { moto: Question[] }).moto;

/** Deterministic PRNG (mulberry32) from a string seed. */
export function rng(seed: string): () => number {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) { h = Math.imul(h ^ seed.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
  let a = h >>> 0;
  return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
export function shuffle<T>(arr: T[], seed: string): T[] {
  const r = rng(seed); const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [out[i], out[j]] = [out[j], out[i]]; }
  return out;
}

/** A question ready to show: options in a seeded order, index of the right one. */
export interface Shown { id: string; t: string; sign?: string; q: string; options: string[]; correct: number; x: string; src: string }
export function present(q: Question, lang: Lang, seed: string): Shown {
  const order = shuffle([0, 1, 2, 3], `${seed}:${q.id}`);
  return { id: q.id, t: q.t, sign: q.sign, q: q.q[lang], options: order.map((i) => q.o[lang][i]), correct: order.indexOf(q.a), x: q.x[lang], src: q.src };
}

const SIGN_TOPICS = new Set(['signs', 'signals', 'markings']);
/** The pool of one test type for one state. */
export function pool(type: TestType, st: StateRec): Question[] {
  const sq = stateQuestions(st);
  if (type === 'signs') return BANK.filter((q) => SIGN_TOPICS.has(q.t));
  if (type === 'cdl') return [...CDL, ...BANK.filter((q) => q.t === 'rules' || q.t === 'right-of-way').slice(0, 8)];
  if (type === 'moto') return [...MOTO, ...sq.filter((q) => q.t === 'state-moto'), ...BANK.filter((q) => q.t === 'right-of-way' || q.t === 'alcohol')];
  return [...BANK, ...sq.filter((q) => q.t !== 'state-moto')];
}

/** Length of a practice test: the state's real test length when known (car), capped by the pool. */
export function testLength(type: TestType, st: StateRec): number {
  const p = pool(type, st).length;
  if (type === 'car' && st.testQ) return Math.min(st.testQ, p);
  if (type === 'moto' && st.motoQ) return Math.min(st.motoQ, p);
  if (type === 'cdl') return Math.min(50, p);
  return Math.min(20, p);
}

/** Pass mark of a test: correct answers needed out of n. Car tests use the state's own rule;
 *  CDL tests use the federal 80 % (49 CFR 383.135); other tests 80 % as a practice target. */
export function passMark(type: TestType, st: StateRec, n: number): { need: number; pct: number; official: boolean } {
  if (type === 'car' && st.testQ && st.testPass && n === st.testQ) return { need: st.testPass, pct: st.testPass / st.testQ, official: true };
  if (type === 'car' && st.testPct) return { need: Math.ceil(n * st.testPct - 1e-9), pct: st.testPct, official: !!st.testQ && n === st.testQ };
  if (type === 'cdl') return { need: Math.ceil(n * 0.8 - 1e-9), pct: 0.8, official: true };
  return { need: Math.ceil(n * 0.8 - 1e-9), pct: 0.8, official: false };
}

export function buildTest(type: TestType, code: string, lang: Lang, seed: string, n?: number): Shown[] {
  const st = stateByCode(code);
  const p = pool(type, st);
  const len = Math.min(n ?? testLength(type, st), p.length);
  // State questions first in the draw so a short test still shows what is specific to the state.
  const own = shuffle(p.filter((q) => q.t.startsWith('state')), `${seed}:own`);
  const rest = shuffle(p.filter((q) => !q.t.startsWith('state')), `${seed}:rest`);
  const k = Math.min(own.length, Math.max(2, Math.round(len / 5)));
  const picked = shuffle([...own.slice(0, k), ...rest.slice(0, len - Math.min(k, own.length))], `${seed}:mix`);
  return picked.map((q) => present(q, lang, seed));
}

export interface Score { answered: number; right: number; left: number; need: number; n: number; canMiss: number; status: 'pass' | 'fail' | 'on-track' | 'at-risk' | 'start' }
export function score(answers: Array<number | null>, test: Shown[], need: number): Score {
  const n = test.length;
  let answered = 0, right = 0;
  answers.forEach((a, i) => { if (a !== null && a !== undefined) { answered++; if (a === test[i].correct) right++; } });
  const wrong = answered - right;
  const maxWrong = n - need;
  const canMiss = Math.max(0, maxWrong - wrong);
  let status: Score['status'] = answered === 0 ? 'start' : 'on-track';
  if (wrong > maxWrong) status = 'fail';
  else if (answered === n) status = right >= need ? 'pass' : 'fail';
  else if (answered > 0 && canMiss <= 1) status = 'at-risk';
  return { answered, right, left: n - answered, need, n, canMiss, status };
}
