import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'CT';
const F = (h: Helpers) => ({ s: h.S(C), ny: h.S('NY'), nj: h.S('NJ') });

export default definePage({
  id: 'state-ct',
  group: 'states',
  order: 123,
  state: C,
  tool: { kind: 'quiz', props: { type: 'car' } },
  mini: { kind: 'mini:restrictions', props: { state: 'CT' } },
  related: ['home', 'teen-restrictions', 'permit-age', 'state-ny', 'state-nj', 'state-pa'],
  sources: ['handbooks', 'mutcd', 'nhtsa_teen'],
  en: {
    slug: 'connecticut-permit-test',
    nav: 'Connecticut',
    card: 'Connecticut DMV knowledge test: 25 questions, 20 right, a learner permit at 16 and strict passenger rules.',
    title: 'Connecticut Permit Test 2026: Free DMV 25-Question Practice',
    description: 'Connecticut permit practice test, free: 25 DMV-style questions graded at 20 correct, answers explained, permit at 16, the 7-day retest wait, fees, passengers.',
    h1: 'Connecticut permit practice test',
    intro: 'Twenty-five questions and five mistakes allowed: practice the Connecticut knowledge test, then see the passenger and curfew rules that come with a first license.',
    resume: (h) => {
      const { s } = F(h);
      return `Connecticut starts later than most states: the learner permit is available at ${s.permitAgeL}. The DMV knowledge test has ${s.testQ ?? h.nc} questions and requires ${s.need ?? h.nc} correct, ${s.pctL}; it is offered in Spanish, and after a failure the wait is ${s.retakeL}. The learner permit costs ${s.permitFeeL}. ${s.feeNoteL} The license itself is ${s.licenseFeeL}. Teens aged 16 and 17 must complete driver training, ${s.driversEdL.replace(/^required for 16-17: /, '')}. The permit is held at least ${s.holdL}, and the license can follow at ${s.interAgeL}. Until ${s.fullAgeL}, ${s.nightL.replace(/^Under 18: /, '').replace(/ \(.*\)$/, '')}, and passengers are strictly limited in the first year. The alcohol limit under 21 is ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc}. The practice test above uses Connecticut's ${s.testQ ?? h.nc} questions and its ${s.need ?? h.nc}-answer pass mark.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'How long must I wait to retest after failing in Connecticut?', a: `The Connecticut DMV makes you wait ${s.retakeL} before a new attempt at the knowledge test. With ${s.canMiss ?? h.nc} mistakes allowed out of ${s.testQ ?? h.nc}, the margin is narrow; a week of focused review on signs, right of way and the teen rules usually makes the difference.` },
        { q: 'Who can ride with a new Connecticut driver?', a: `The DMV sets the rule in stages: ${s.passengersL}. In short, a new driver spends the first half-year with adults only and may add close family from the seventh month.` },
        { q: 'What does the Connecticut $40 testing fee cover?', a: `${s.feeNoteL.replace(/^Plus a /, 'The ').replace(/\.$/, '')}, paid in addition to the ${s.permitFeeL} learner permit. The license fee, ${s.licenseFeeL}, comes later when the license is issued. Use the fee tool on the ${h.a('fees', 'fees guide')} to set Connecticut against other states.` },
      ];
    },
    body: (h) => {
      const { s, ny, nj } = F(h);
      return `
<h2>Restrictions for Connecticut teens</h2>
<p>Connecticut keeps some of the tightest passenger rules in the country for its newest drivers. The tool sums up the limits and the age at which they end:</p>
<!--tool:mini:restrictions|{"state":"CT"}-->
<p>Curfew: ${s.nightL}. Driver training also involves the family: the Connecticut program includes a two-hour class for parents.</p>
<p>Connecticut applies its rules in layers. The permit holder may carry only ${(s.passengersL.split('Permit: ')[1] ?? h.nc).replace(/\.$/, '')}. After the license, the first six months are limited to instructors, parents and qualified trainers, months seven to twelve add immediate family, and the curfew stays until ${s.fullAgeL}. Phones are banned for these drivers, and the alcohol limit under 21 is ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc}.</p>
<h2>Connecticut in the tri-state area</h2>
${h.table(['', 'Connecticut', 'New York', 'New Jersey'], [
  ['Permit age', s.permitAgeL, ny.permitAgeL, nj.permitAgeL],
  ['Knowledge test', `${s.need ?? h.nc} of ${s.testQ ?? h.nc}`, `${ny.need ?? h.nc} of ${ny.testQ ?? h.nc}`, `${nj.need ?? h.nc} of ${nj.testQ ?? h.nc}`],
  ['Supervised hours', s.hours ?? h.nc, ny.hours ?? h.nc, nj.hours ?? h.nc],
  ['Permit fee', s.permitFeeL, ny.permitFeeL, nj.permitFeeL],
], 'Connecticut, New York and New Jersey.', ['l', 'r', 'r', 'r'])}
<p>All three start at ${s.permitAgeL}. ${h.sl('NJ')} asks twice as many questions; ${h.sl('NY')} charges more for the permit, but that fee also covers the license.</p>
<p>Connecticut offers the knowledge test in Spanish. This site's practice test runs in Spanish too, with the same questions and the same 20-of-25 scoring, so a learner can prepare in either language and check the vocabulary in the other before the appointment.</p>
<h2>Four months, forty hours</h2>
<p>The Connecticut holding period is short, ${s.holdL}, but the ${s.hours ?? h.nc} hours of practice must fit into it, which means close to three hours a week. The practice should cover highway merging, which is constant on I-95 and I-84, narrow town roads, and winter driving.</p>
<p>The age line is precise: the license can come at ${s.interAgeL}, only ${s.holdL} after the earliest permit age of ${s.permitAgeL}. Any delay in passing the knowledge test moves that date by the same amount. After a failure the DMV makes you wait ${s.retakeL}, so one bad attempt costs at least a week of the calendar.</p>
<p>For a 16- or 17-year-old, the training choice is between two routes: ${s.driversEdL.replace(/^required for 16-17: /, '')}. Both end at the same road test.</p>
<h2>Preparing for the test</h2>
<p>The Connecticut Driver's Manual (${s.handbookEdition ?? 'current edition'}) is the source of the questions. Study signs, signals and pavement markings, right of way, speed, the move-over rule, school buses, sharing the road, and the teen restrictions themselves, which appear on the test. Sign shapes and colors follow the federal ${h.src('mutcd', 'MUTCD')}. The figures here come from ${h.os(C, 'testQ', 'the Connecticut DMV')}; this site is independent of the DMV.</p>`;
    },
  },
});
