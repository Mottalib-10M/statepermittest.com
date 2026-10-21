import { describe, it, expect } from 'vitest';
import { BANK, CDL, MOTO, buildTest, passMark, score, testLength, pool } from '../src/lib/engine/quiz';
import { STATES, stateByCode, ageLabel, ym } from '../src/lib/engine/states';
import { stateQuestions } from '../src/lib/engine/state-questions';
import { timeline, addMonths, atAge } from '../src/lib/engine/timeline';
import { getSpec, SPEC_KINDS } from '../src/lib/mini-specs';

describe('question banks', () => {
  const all = [...BANK, ...CDL, ...MOTO, ...STATES.flatMap(stateQuestions)];
  it('every question has four distinct options and an explanation in both languages', () => {
    for (const q of all) for (const l of ['en', 'es'] as const) {
      expect(q.o[l].length, q.id).toBe(4);
      expect(new Set(q.o[l]).size, `${q.id} ${l}`).toBe(4);
      expect(q.q[l].length, q.id).toBeGreaterThan(10);
      expect(q.x[l].length, q.id).toBeGreaterThan(10);
      expect(q.a).toBeGreaterThanOrEqual(0);
      expect(q.a).toBeLessThan(4);
    }
  });
  it('ids are unique', () => { expect(new Set(all.map((q) => q.id)).size).toBe(all.length); });
  it('no em dash in any text', () => { for (const q of all) expect(JSON.stringify([q.q, q.o, q.x]), q.id).not.toMatch(/—/); });
});

describe('state file', () => {
  it('has the 50 states and DC once each', () => {
    expect(new Set(STATES.map((s) => s.code)).size).toBe(STATES.length);
    expect(STATES.length).toBe(51);
  });
  it('is coherent', () => {
    for (const s of STATES) {
      if (s.testQ && s.testPass) expect(s.testPass, s.code).toBeLessThanOrEqual(s.testQ);
      if (s.testPct) { expect(s.testPct, s.code).toBeGreaterThan(0.5); expect(s.testPct, s.code).toBeLessThanOrEqual(1); }
      if (s.permitAge && s.interAge) expect(s.interAge, s.code).toBeGreaterThanOrEqual(s.permitAge);
      if (s.feeCombined) expect(s.licenseFee).toBe(0);
    }
  });
  it('California: 15½ permit, 6 months, 50 hours, one combined fee', () => {
    const ca = stateByCode('CA');
    expect([ca.permitAge, ca.holdMonths, ca.hours, ca.feeCombined]).toEqual([15.5, 6, 50, true]);
  });
});

describe('dates', () => {
  it('adds months at month ends', () => { expect(addMonths('2010-08-31', 6)).toBe('2011-02-28'); });
  it('reads half and quarter ages', () => { expect(ym(15.5)).toEqual({ y: 15, m: 6 }); expect(ym(14.75)).toEqual({ y: 14, m: 9 }); expect(ageLabel(15.5, 'en')).toBe('15 years 6 months'); });
  it('California teen born 2011-03-01', () => {
    const t = timeline(stateByCode('CA'), '2011-03-01', '2026-10-22');
    expect(t.permitFrom).toBe('2026-09-01');
    expect(t.interFrom).toBe('2027-04-22'); // permit taken today + 6 months, after the 16th birthday
    expect(t.fees).toBe(stateByCode('CA').permitFee);
  });
  it('the holding period wins over the age when the permit is late', () => {
    const t = timeline(stateByCode('CA'), '2010-01-15', '2026-10-22', '2026-10-01');
    expect(t.interFrom).toBe('2027-04-01');
  });
  it('the age wins when the permit is early', () => {
    const t = timeline(stateByCode('CA'), '2011-01-15', '2026-10-22', '2026-07-15');
    expect(t.interFrom).toBe(atAge('2011-01-15', 16));
  });
});

describe('tests and scoring', () => {
  it('builds the same test from the same seed', () => {
    expect(buildTest('car', 'CA', 'en', 'x').map((q) => q.id)).toEqual(buildTest('car', 'CA', 'en', 'x').map((q) => q.id));
  });
  it('a car test has the state length when known and draws state questions', () => {
    for (const s of STATES) {
      const t = buildTest('car', s.code, 'en', 's');
      expect(t.length).toBe(testLength('car', s));
      expect(new Set(t.map((q) => q.id)).size).toBe(t.length);
      if (stateQuestions(s).length) expect(t.some((q) => q.t === 'state'), s.code).toBe(true);
    }
  });
  it('uses the official count when the test has the official length', () => {
    const s = STATES.find((x) => x.testQ && x.testPass)!;
    expect(passMark('car', s, s.testQ!)).toMatchObject({ need: s.testPass, official: true });
  });
  it('CDL is scored at 80 %', () => { const s = stateByCode('CA'); expect(passMark('cdl', s, 50).need).toBe(40); expect(pool('cdl', s).length).toBeGreaterThan(19); });
  it('statuses', () => {
    const t = buildTest('signs', 'CA', 'en', 'z', 5);
    const right = t.map((q) => q.correct), wrong = t.map((q) => (q.correct + 1) % 4);
    expect(score(right, t, 4).status).toBe('pass');
    expect(score([...wrong.slice(0, 2), null, null, null], t, 4).status).toBe('fail');
    expect(score([right[0], null, null, null, null], t, 4).status).toBe('at-risk');
    expect(score(t.map(() => null), t, 4).status).toBe('start');
  });
});

describe('mini tools', () => {
  it('every spec runs on every state in both languages', () => {
    for (const k of SPEC_KINDS) for (const l of ['en', 'es'] as const) {
      const sp = getSpec(k, l);
      for (let i = 0; i < STATES.length; i++) {
        const v = Object.fromEntries(sp.inputs.map((x) => [x.id, x.options ? i : x.def]));
        const o = sp.run(v);
        expect(o.head[1], `${k} ${l} ${STATES[i].code}`).toBeTruthy();
      }
    }
  });
});
