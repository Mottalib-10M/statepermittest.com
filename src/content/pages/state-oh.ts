import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'OH';
const F = (h: Helpers) => ({ s: h.S(C), ky: h.S('KY'), pa: h.S('PA'), ind: h.S('IN') });

export default definePage({
  id: 'state-oh',
  group: 'states',
  order: 105,
  state: C,
  tool: { kind: 'quiz', props: { type: 'car' } },
  mini: { kind: 'mini:restrictions', props: { state: 'OH' } },
  related: ['home', 'teen-restrictions', 'drivers-ed', 'state-ky', 'state-pa', 'state-in'],
  sources: ['handbooks', 'mutcd'],
  en: {
    slug: 'ohio-permit-test',
    nav: 'Ohio',
    card: 'Ohio BMV knowledge test: 40 questions, 30 right, the TIPIC at 15½ and two-stage curfews.',
    title: 'Ohio Permit Test 2026: Free BMV Knowledge Practice Test',
    description: 'Ohio permit practice test, free: 40 BMV-style questions scored at 30 correct with explained answers, the temporary permit at 15 and a half, driver training and curfews.',
    h1: 'Ohio permit practice test',
    intro: 'Forty questions, thirty right: the Ohio knowledge test at its real length, and the two curfews that follow the probationary license.',
    resume: (h) => {
      const { s } = F(h);
      return `Ohio's knowledge test for the temporary instruction permit identification card (TIPIC) has ${s.testQ ?? h.nc} questions and you pass with ${s.need ?? h.nc} correct, ${s.pctL}, according to the Bureau of Motor Vehicles. You can sit it from ${s.permitAgeL}. A failed attempt can be retried after ${s.retakeL.replace(/ \(.*\)$/, '')}; the online version allows at most two attempts in six months. The permit is held ${s.holdL}, with ${s.hours ?? h.nc} hours of practice, ${s.nightHours ?? h.nc} at night, and an approved driver training course: ${s.driversEdL.replace(/^Required under 18 \(and also for first-time applicants 18-20\): /, '')}. Ohio extends that course requirement to first-time applicants aged 18 to 20. The probationary license can come at ${s.interAgeL}. For its first twelve months, the new driver may not drive from midnight to 6 a.m. and may carry only one passenger outside the family unless a parent or guardian is aboard; after that, until 18, the curfew runs from 1 a.m. to 5 a.m.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'Can I take the Ohio permit test online?', a: 'Yes. The BMV offers the knowledge test online as well as at a driver exam station, with a limit of two online attempts in any six-month period. After passing, the permit itself is issued at a deputy registrar license agency with your documents. If you use up the online attempts, you can still test in person.' },
        { q: 'Does Ohio require driver training for adults?', a: `Ohio requires a driver training course for new drivers under 18, and also for first-time applicants from 18 to 20; the course is 24 hours of classroom or online instruction plus 8 hours behind the wheel. Older first-time applicants have other options described by the BMV. The ${h.a('drivers-ed', 'driver education guide')} compares states.` },
        { q: 'What are the Ohio curfew hours for new drivers?', a: `During the first twelve months of the probationary license there is no driving from midnight to 6 a.m.; afterwards, until 18, from 1 a.m. to 5 a.m. Driving to or from work, school or a religious event, or with a parent, guardian or designated adult of 21 or more, is allowed. Ohio also bans phone use for drivers under 18.` },
      ];
    },
    body: (h) => {
      const { s, ky, pa, ind } = F(h);
      return `
<h2>The restrictions, step by step</h2>
<p>Ohio's restrictions change over time rather than ending on one date. The mini-tool shows the limits of any state; it opens on Ohio.</p>
<!--tool:mini:restrictions|{"state":"OH"}-->
<p>${s.nightL}</p>
<h2>Ohio and its neighbors</h2>
${h.table(['', 'Ohio', 'Kentucky', 'Pennsylvania', 'Indiana'], [
  ['Permit age', s.permitAgeL, ky.permitAgeL, pa.permitAgeL, ind.permitAgeL],
  ['Questions', s.testQ ?? h.nc, ky.testQ ?? h.nc, pa.testQ ?? h.nc, ind.testQ ?? h.nc],
  ['Correct needed', s.need ?? h.nc, ky.need ?? h.nc, pa.need ?? h.nc, ind.need ?? h.nc],
  ['Supervised hours', s.hours ?? h.nc, ky.hours ?? h.nc, pa.hours ?? h.nc, ind.hours ?? h.nc],
], 'Permit test and practice hours around Ohio.', ['l', 'r', 'r', 'r', 'r'])}
<h2>Studying for the Ohio test</h2>
<p>The test draws on the Digest of Ohio Motor Vehicle Laws. Besides signs and right of way, Ohio questions often deal with school buses on divided roads, the move-over rule, the penalties of the point system and the limits on alcohol. The BMV publishes no fee for the permit on the pages we could read, so the date calculator shows the fees as not confirmed. Rules on this page come from the ${h.os(C, 'testQ', 'Ohio BMV')}; this site is independent of the BMV.</p>`;
    },
  },
});
