import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'PA';
const F = (h: Helpers) => ({ s: h.S(C), ny: h.S('NY'), nj: h.S('NJ') });

export default definePage({
  id: 'state-pa',
  group: 'states',
  order: 106,
  state: C,
  tool: { kind: 'quiz', props: { type: 'car' } },
  mini: { kind: 'mini:hours', props: { state: 'PA', done: 40, night: 5 } },
  related: ['home', 'supervised-hours', 'how-many-questions', 'state-ny', 'state-nj', 'state-oh'],
  sources: ['handbooks', 'mutcd'],
  en: {
    slug: 'pennsylvania-permit-test',
    nav: 'Pennsylvania',
    card: 'PennDOT knowledge test: 18 questions, 15 right, then 65 hours before the junior license.',
    title: 'Pennsylvania Permit Test 2026: Free PennDOT Practice',
    description: 'Pennsylvania permit practice test, free: 18 PennDOT-style questions scored at 15 correct, explained answers, the permit at 16, 65 hours and the junior license.',
    h1: 'Pennsylvania permit practice test',
    intro: 'Eighteen questions and only three mistakes allowed: practice the PennDOT knowledge test at its real length, then count the 65 hours of the learner\'s permit.',
    resume: (h) => {
      const { s } = F(h);
      return `Pennsylvania's knowledge test is short and strict: ${s.testQ ?? h.nc} questions, of which ${s.need ?? h.nc} must be right, so ${s.canMiss ?? h.nc} mistakes at most, a mark of about ${s.pctL}. PennDOT gives it from ${s.permitAgeL}, after a physical examination form signed by a health care provider. If you fail, you can retest on the ${s.retakeL.toLowerCase()}. The learner's permit is held ${s.holdL}, and Pennsylvania asks for more practice than most states: ${s.hours ?? h.nc} hours, including ${s.nightHours ?? h.nc} at night and 5 in bad weather, certified by a parent or guardian. The junior license follows at ${s.interAgeL} at the earliest, with no driving from 11 p.m. to 5 a.m. and, for the first six months, one passenger under 18 outside the family. One fee of ${s.permitFeeL} covers the permit and the first four-year license. The practice test above has the real 18-question length.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'How many questions can I miss on the PA permit test?', a: `${s.canMiss ?? 3}. The test has ${s.testQ ?? 18} questions and requires ${s.need ?? 15} correct. With so few questions, each mistake weighs about five and a half points, which is why it is worth practicing the full 18-question version until you finish with no more than one or two errors.` },
        { q: 'What counts toward the 65 hours in Pennsylvania?', a: 'Driving with a licensed adult of 21 or more, a parent, guardian or spouse of 18 or more, logged on the skill builder form: 65 hours in total, at least 10 at night and 5 in bad weather. The hours must be done before the road test, and the permit must have been held six months.' },
        { q: 'When does a Pennsylvania junior license become a full license?', a: `At 18 automatically, or from ${s.fullAgeL} if the driver completed an approved driver education course and had no crash or conviction for twelve months. The ${h.a('teen-restrictions', 'restrictions guide')} compares junior license rules across states, including the passenger and night limits that end with them.` },
      ];
    },
    body: (h) => {
      const { s, ny, nj } = F(h);
      return `
<h2>Count the hours left</h2>
<p>The 65-hour log is the longest stretch of the Pennsylvania path. Enter what is done:</p>
<!--tool:mini:hours|{"state":"PA","done":40,"night":5}-->
<h2>Pennsylvania beside New York and New Jersey</h2>
${h.table(['', 'Pennsylvania', 'New York', 'New Jersey'], [
  ['Questions', s.testQ ?? h.nc, ny.testQ ?? h.nc, nj.testQ ?? h.nc],
  ['Correct needed', s.need ?? h.nc, ny.need ?? h.nc, nj.need ?? h.nc],
  ['Hours', s.hours ?? h.nc, ny.hours ?? h.nc, nj.hours ?? h.nc],
  ['Junior or probationary license', s.interAgeL, ny.interAgeL, nj.interAgeL],
], 'Three neighboring states that start at 16.', ['l', 'r', 'r', 'r'])}
<h2>What the PennDOT test covers</h2>
<p>The questions come from the Pennsylvania Driver's Manual (PUB 95): signs, signals and markings, safe driving, and driving record rules such as points and the consequences of underage drinking. Because the test is short, two or three questions on signs can make the difference. Pennsylvania offers the test in Spanish.</p>
<p>${s.passengersL}</p>
<p>Rules and fee on this page come from ${h.os(C, 'testQ', 'PennDOT')}; this site is independent of PennDOT.</p>`;
    },
  },
});
