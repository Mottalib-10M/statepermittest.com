/** Figures of the method page, computed from the question banks and the state file. */
import { BANK, CDL, MOTO } from './engine/quiz';
import { STATES, META } from './engine/states';
import { stateQuestions } from './engine/state-questions';
const by = (arr: { src: string }[], f: (s: string) => boolean) => arr.filter((q) => f(q.src)).length;
export const M = {
  general: BANK.length, mutcd: by(BANK, (s) => s === 'mutcd'), handbook: by(BANK, (s) => s === 'uvc'), nhtsa: by(BANK, (s) => s === 'nhtsa'),
  cdl: CDL.length, cfr: by(CDL, (s) => s.startsWith('cfr')), moto: MOTO.length,
  stateQ: STATES.reduce((n, s) => n + stateQuestions(s).length, 0),
  states: STATES.length, fields: META.fields, confirmed: META.fields - META.nulls, nulls: META.nulls, retrieved: META.retrieved,
  withQ: STATES.filter((s) => s.testQ).length, withPass: STATES.filter((s) => s.testPct).length, withAge: STATES.filter((s) => s.permitAge != null).length,
  withFee: STATES.filter((s) => s.permitFee != null).length,
};
