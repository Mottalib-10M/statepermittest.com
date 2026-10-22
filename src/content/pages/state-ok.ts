import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'OK';
const F = (h: Helpers) => ({ s: h.S(C), tx: h.S('TX'), ks: h.S('KS'), nm: h.S('NM') });

export default definePage({
  id: 'state-ok',
  group: 'states',
  order: 122,
  state: C,
  tool: { kind: 'quiz', props: { type: 'car' } },
  mini: { kind: 'mini:fees', props: { state: 'OK' } },
  related: ['home', 'fees', 'failed-test', 'state-tx', 'state-ks', 'state-mo'],
  sources: ['handbooks', 'mutcd'],
  en: {
    slug: 'oklahoma-permit-test',
    nav: 'Oklahoma',
    card: 'Oklahoma written test: 20 questions, 15 right, $4 per retry and a $42.50 learner permit.',
    title: 'Oklahoma Permit Test 2026: Free 20-Question Practice',
    description: 'Oklahoma permit practice test, free: 20 questions graded at 15 correct, answers explained, the $42.50 permit, the $4 retake and the intermediate license rules.',
    h1: 'Oklahoma permit practice test',
    intro: 'Twenty questions, fifteen right: the Oklahoma written test at its real length, and the cost of each card on the way to a license.',
    resume: (h) => {
      const { s } = F(h);
      return `Service Oklahoma gives a short written test: ${s.testQ ?? h.nc} questions, and ${s.need ?? h.nc} correct answers pass it, a ${s.pctL} mark that is lower than the 80 % used in many states. A teen can apply for the learner permit at ${s.permitAgeL}. On retakes the rule is: ${s.retakeL.charAt(0).toLowerCase() + s.retakeL.slice(1)}. The learner permit costs ${s.permitFeeL} and the intermediate license the same, ${s.licenseFeeL}; ${s.feeNoteL.charAt(0).toLowerCase() + s.feeNoteL.slice(1)} Driver education is optional: ${s.driversEdL.replace(/^Not required; /, '')} After ${s.holdL} on the permit, the intermediate license can come at ${s.interAgeL}; its time and passenger limits can be lifted at ${s.fullAgeL}. The number of supervised hours was not confirmed on the pages we read. Oklahoma sets ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc} as the alcohol limit under 21. Note that the test is not offered in Spanish according to Service Oklahoma.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'What does a failed Oklahoma written test cost?', a: `Service Oklahoma charges $4 for each failed attempt, and there is no waiting period between tries. Online, you get at most two attempts. With only ${s.canMiss ?? h.nc} mistakes allowed on ${s.testQ ?? h.nc} questions, one bad section can sink the score, so run the practice test a few times first.` },
        { q: 'Why is an Oklahoma permit $42.50?', a: `The fee is split in two: ${s.feeNoteL.charAt(0).toLowerCase() + s.feeNoteL.slice(1)} The intermediate license that follows costs the same amount, so a teen pays ${h.m((s.permitFee ?? 0) + (s.licenseFee ?? 0))} in card fees before any later full license, as listed in the fee table of the Oklahoma Driver Manual.` },
        { q: 'Can I take the Oklahoma permit test in Spanish?', a: `No, according to the Service Oklahoma pages we read, the written test is not offered in Spanish. Applicants who are more comfortable in Spanish can still study the rules in Spanish with this site's practice test, then switch to English questions before the real exam so the wording is familiar.` },
      ];
    },
    body: (h) => {
      const { s, tx, ks, nm } = F(h);
      return `
<h2>What Oklahoma charges</h2>
<p>Fees are the part of the Oklahoma process most families notice first, because they are higher than in nearby states.</p>
<p>Each Oklahoma card has the same two parts, an application fee and the card itself. The tool adds the permit and the first license for any state:</p>
<!--tool:mini:fees|{"state":"OK"}-->
<p>Add $4 for each failed written test. ${s.feeNoteL}</p>
<h2>A short test with a lower bar</h2>
<p>At ${s.testQ ?? h.nc} questions, Oklahoma's test is among the shortest, and ${s.pctL} is a lower mark than most states use. That does not make it easy: with ${s.canMiss ?? h.nc} errors allowed, each question weighs ${h.num(100 / (s.testQ ?? 20))} % of the score. The questions come from the Oklahoma Driver Manual and cover signs, right of way, speed, turns, passing, railroad crossings and alcohol. Strong winds on open highways, sudden storms and tornado season are part of driving in Oklahoma, and the safe-driving chapter touches on them. The ${h.src('mutcd', 'MUTCD')} sets the sign shapes and colors.</p>
<p>The online version of the test is limited to two attempts, while in-person retests have no waiting period. Each failure costs the $4 fee again, so three failures add ${h.m(12)} to the card fees. The cheapest preparation is the free practice test, run until 15 correct answers feel routine.</p>
<h2>Oklahoma, Texas, Kansas and New Mexico</h2>
${h.table(['', 'Oklahoma', 'Texas', 'Kansas', 'New Mexico'], [
  ['Learner permit', s.permitAgeL, tx.permitAgeL, ks.permitAgeL, nm.permitAgeL],
  ['Pass mark', s.pctL, tx.pctL, ks.pctL, nm.pctL],
  ['Permit fee', s.permitFeeL, tx.permitFeeL, ks.permitFeeL, nm.permitFeeL],
  ['Full privileges', s.fullAgeL, tx.fullAgeL, ks.fullAgeL, nm.fullAgeL],
], 'Oklahoma and its neighbors.', ['l', 'r', 'r', 'r', 'r'])}
<p>The Oklahoma permit is nearly three times the price of a ${h.sl('TX')} learner license (${tx.permitFeeL}), while ${h.sl('NM')} accepts an even lower pass mark, ${nm.pctL}.</p>
<p>Oklahoma also lets young riders start early on two wheels: a motorcycle permit is possible from ${h.ageLabel(s.motoAge)}, with its own test. And for drivers under 21, the alcohol limit is ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc}.</p>
<h2>The intermediate stage</h2>
<p>The intermediate license carries a "T" restriction: ${s.nightL.replace(/^Intermediate \('T' restriction\): /, '').replace(/\.$/, '')}. Passengers: ${s.passengersL.replace(/^Intermediate: /, '').replace(/\.$/, '')}. A teen who completed driver education can have these limits lifted sooner.</p>
<p>Driver education changes the Oklahoma timeline more than in most states: ${s.driversEdL.replace(/^Not required; /, '')} Several formats are accepted, from school programs to parent-taught courses, so the choice is mostly about schedule and cost. Read Service Oklahoma's age rules before deciding, since the course affects three different dates.</p>
<p> The figures on this page were read on ${h.os(C, 'testQ', 'Service Oklahoma')} and in its driver manual; this site is independent of Service Oklahoma.</p>`;
    },
  },
});
