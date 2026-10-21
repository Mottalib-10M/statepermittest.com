import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'WI';
const F = (h: Helpers) => ({ s: h.S(C), mn: h.S('MN'), ia: h.S('IA') });

export default definePage({
  id: 'state-wi',
  group: 'states',
  order: 115,
  state: C,
  tool: { kind: 'quiz', props: { type: 'car' } },
  mini: { kind: 'mini:passmark', props: { state: 'WI' } },
  related: ['home', 'how-many-questions', 'drivers-ed', 'state-mn', 'state-ia', 'state-in'],
  sources: ['handbooks', 'mutcd'],
  en: {
    slug: 'wisconsin-permit-test',
    nav: 'Wisconsin',
    card: 'Wisconsin DMV knowledge test: 50 questions, 40 right, the instruction permit at 15 for $35.',
    title: 'Wisconsin Permit Test 2026: Free 50-Question Practice',
    description: 'Wisconsin permit practice test, free: 50 DMV-style questions graded at 40 correct, answers explained, the permit at 15, driver ed, fees and 9-month limits.',
    h1: 'Wisconsin permit practice test',
    intro: 'Fifty questions and forty correct answers: practice the Wisconsin knowledge test at full length, written from the Motorists\' Handbook.',
    resume: (h) => {
      const { s } = F(h);
      return `Wisconsin's knowledge test is one of the longest in the country: ${s.testQ ?? h.nc} questions, and you need ${s.need ?? h.nc} right to pass, which is ${s.pctL}. The Division of Motor Vehicles gives the instruction permit from ${s.permitAgeL}, on one condition for teens: ${s.driversEdL.replace(/^Required under 18: /, '').replace(/\.$/, '')}. The permit costs ${s.permitFeeL}; the probationary license ${s.licenseFeeL}, and ${s.feeNoteL.replace(/\.$/, '').replace(/^Skills/, 'the skills')}. Learners keep the permit ${s.holdL} and log ${s.hours ?? h.nc} hours, ${s.nightHours ?? h.nc} at night, before the road test. The probationary license is available at ${s.interAgeL}, and its night and passenger limits last nine months for drivers under 18, so they can end as early as ${s.fullAgeL}. Wisconsin bans phone use for new drivers and sets a ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc} alcohol limit under 21. The practice test above uses the full ${s.testQ ?? h.nc} questions and the same mark.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'How many questions can I get wrong on the Wisconsin knowledge test?', a: `With ${s.testQ ?? h.nc} questions and ${s.need ?? h.nc} needed, you can miss ${s.canMiss ?? h.nc}. That sounds generous, but the length works against tired readers: concentration drops after thirty questions. Take the full practice test in one sitting a few times so the real exam does not feel long.` },
        { q: 'Can a Wisconsin teen get the permit before finishing driver education?', a: `Yes. Wisconsin asks for enrollment, not completion, at the permit stage: the teen must be signed up for a driver education course that includes behind-the-wheel training. Completion is checked later, before the probationary license. This lets classroom lessons and supervised practice run at the same time.` },
        { q: 'How long do Wisconsin probationary license limits last?', a: `The night and passenger limits apply for the first nine months of the probationary license for drivers under 18. ${s.nightL.replace(/^First 9 months of probationary license \(under 18\): /, 'During that time, ')} Passengers are limited to immediate family plus one qualified licensed adult and one other person.` },
      ];
    },
    body: (h) => {
      const { s, mn, ia } = F(h);
      return `
<h2>Forty out of fifty</h2>
<p>Wisconsin publishes both the length and the mark, which makes the score easy to read: ${s.need ?? h.nc} of ${s.testQ ?? h.nc}. The tool gives the same arithmetic for any state.</p>
<!--tool:mini:passmark|{"state":"WI"}-->
<p>The long format means the test samples nearly every chapter of the ${s.handbookEdition ?? 'current'} Motorists' Handbook. A gap in one topic is rarely fatal, but a gap in three or four is. Questions about signs and right of way are the most numerous, followed by speed, lane use and the rules for drivers under 18.</p>
<h2>Wisconsin and its region</h2>
${h.table(['', 'Wisconsin', 'Minnesota', 'Iowa'], [
  ['Permit age', s.permitAgeL, mn.permitAgeL, ia.permitAgeL],
  ['Test length', s.testQ ?? h.nc, mn.testQ ?? h.nc, ia.testQ ?? h.nc],
  ['Practice hours', s.hours ?? h.nc, mn.hours ?? h.nc, ia.hours ?? h.nc],
  ['Permit fee', s.permitFeeL, mn.permitFeeL, ia.permitFeeL],
], 'Upper Midwest permits compared.', ['l', 'r', 'r', 'r'])}
<p>The Wisconsin permit costs more than its neighbors' (${mn.permitFeeL} in ${h.sl('MN')}), but it opens at the same age, ${s.permitAgeL}.</p>
<h2>Winter, deer and two-lane roads</h2>
<p>Much of Wisconsin driving happens on rural highways, often in snow. The handbook gives these situations real weight: braking on ice, keeping headlights on in poor visibility, passing farm machinery and slow vehicles, and what to do when a deer steps onto the road. Expect at least a few questions on each. Urban topics such as roundabouts, which are common in the state, and freeway merging also appear.</p>
<p>Federal sign shapes and colors are set by the ${h.src('mutcd', 'MUTCD')}, so the "Road signs only" mode above covers that part of the test.</p>
<h2>Paying and booking</h2>
<p>The DMV fee for the instruction permit is ${s.permitFeeL}, the probationary license ${s.licenseFeeL}. ${s.feeNoteL} Book the knowledge test at a DMV service center and bring proof of identity, of Wisconsin residency and of driver education enrollment. The figures on this page come from ${h.os(C, 'testQ', 'the Wisconsin DMV')} and its fee pages; this site is independent of WisDOT and the DMV.</p>`;
    },
  },
});
