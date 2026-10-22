import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'IN';
const F = (h: Helpers) => ({ s: h.S(C), oh: h.S('OH'), ky: h.S('KY') });

export default definePage({
  id: 'state-in',
  group: 'states',
  order: 112,
  state: C,
  tool: { kind: 'quiz', props: { type: 'car' } },
  mini: { kind: 'mini:retake', props: { state: 'IN' } },
  related: ['home', 'failed-test', 'teen-restrictions', 'state-oh', 'state-ky', 'state-wi'],
  sources: ['handbooks', 'mutcd', 'nhtsa_teen'],
  en: {
    slug: 'indiana-permit-test',
    nav: 'Indiana',
    card: 'Indiana BMV permit test: an 80 % pass mark, a retry the next business day and a $9 permit.',
    title: 'Indiana Permit Test 2026: Free BMV Practice Questions',
    description: 'Indiana permit practice test, free: BMV-style questions with explained answers at the 80 % mark, the retry rule, the $9 permit, 50 hours and the 180-day limits.',
    h1: 'Indiana permit practice test',
    intro: 'Train for the Indiana BMV knowledge test at its 80 % target, then check how soon you can try again and what the first 180 days of a probationary license allow.',
    resume: (h) => {
      const { s } = F(h);
      return `Indiana issues a learner permit from ${s.permitAgeL}, and the Bureau of Motor Vehicles links that early age to driver education: ${s.driversEdL}. The knowledge test is passed at ${s.pctL}; the BMV pages we read do not give a fixed number of questions, so the practice test runs 20 questions and grades them at that same percentage. A failed attempt can be repeated the ${s.retakeL}. The permit costs ${s.permitFeeL} and the probationary license ${s.licenseFeeL} (${s.feeNoteL.toLowerCase()}). Before the road test, the permit is held ${s.holdL} with ${s.hours ?? h.nc} hours of supervised practice, ${s.nightHours ?? h.nc} of them after dark. The probationary license comes at ${s.interAgeL} at the earliest, and the night and passenger limits that go with it last in part until ${s.fullAgeL}. Indiana also bars drivers under 18 from using a phone while driving. The test is offered in Spanish.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'How soon can I retake the Indiana BMV knowledge test?', a: `The BMV lets you come back the ${s.retakeL}, so a failure on a Friday usually means a new try on Monday. There is no long waiting period, which makes it tempting to retry without studying. A better plan is to run the 20-question practice test until you clear ${s.pctL} several times in a row, then return to the branch.` },
        { q: 'What can an Indiana driver do in the first 180 days of a probationary license?', a: `During those first 180 days, ${s.passengersL.replace(/^First 180 days: /, '').toLowerCase()}. Night driving is also cut: ${s.nightL.split(';')[0].replace(/^First 180 days: /, '').toLowerCase().replace(/\.$/, '')}. After that period, curfews remain until ${s.fullAgeL}, with exceptions for work, school and religious events.` },
        { q: 'Is the Indiana permit test available in Spanish?', a: `${s.spanish ? 'Yes, the BMV offers the knowledge test in Spanish' : 'The BMV pages we read do not confirm a Spanish version'}. The questions cover the same rules whatever the language, so studying the Indiana driver's manual in the language you will test in is the safest choice. This site's practice test also runs in Spanish with identical scoring.` },
      ];
    },
    body: (h) => {
      const { s, oh, ky } = F(h);
      return `
<h2>If the first try goes wrong</h2>
<p>Indiana is one of the more forgiving states on retakes. Where some states impose a week or more between attempts, the BMV only asks you to wait until the ${s.retakeL}. The mini-tool below shows that delay next to the pass mark for any state, opened on Indiana.</p>
<!--tool:mini:retake|{"state":"IN"}-->
<p>Because the BMV publishes a percentage and not a question count, the score you need depends on the length of the test you get on the day. At ${s.pctL}, a 20-question form would allow ${Math.floor(20 * (1 - (s.testPct ?? 0.8)) + 1e-9)} misses and a 50-question form ${Math.floor(50 * (1 - (s.testPct ?? 0.8)) + 1e-9)}. Aim higher than the minimum: questions on the probationary rules and on Indiana's move-over and school bus laws catch many first-time applicants.</p>
<h2>Indiana next to its neighbors</h2>
${h.table(['Rule', 'Indiana', 'Ohio', 'Kentucky'], [
  ['Earliest permit', s.permitAgeL, oh.permitAgeL, ky.permitAgeL],
  ['Practice hours logged', s.hours ?? h.nc, oh.hours ?? h.nc, ky.hours ?? h.nc],
  ['Minimum time on permit', s.holdL, oh.holdL, ky.holdL],
  ['First license', s.interAgeL, oh.interAgeL, ky.interAgeL],
], 'Learner rules in Indiana and two bordering states with published figures.', ['l', 'r', 'r', 'r'])}
<p>Indiana and ${h.sl('KY')} both open the permit at ${s.permitAgeL}, while ${h.sl('OH')} waits until ${oh.permitAgeL}. Indiana's ${s.hours ?? h.nc}-hour log is in the middle of the range, below Kentucky's ${ky.hours ?? h.nc}.</p>
<h2>The cost of getting licensed in Indiana</h2>
<p>The BMV fee chart lists ${s.permitFeeL} for the learner permit and ${s.licenseFeeL} for the probationary license, a modest total by national standards. ${s.feeNoteL} Fees for duplicate cards, amendments and later renewals are separate and are not covered here. The ${h.a('fees', 'fee comparison')} sets Indiana against every other state.</p>
<h2>What the Indiana test emphasizes</h2>
<p>The 2026 Indiana driver's manual is the base of the exam. Expect questions on right of way at four-way stops, following distance, railroad crossings, work zones and the penalties for drivers under 21 who drink. Winter appears too: snow, ice and reduced visibility on rural highways are a regular part of driving in the state, and the manual explains how to adjust speed and braking. Road signs follow the federal ${h.src('mutcd', 'MUTCD')}, so the shapes and colors you learn here hold in every state.</p>
<p>Put the dates together and the Indiana timeline takes shape. A teen enrolled in driver education can hold the permit from ${s.permitAgeL}. The permit must be kept at least ${s.holdL} before the skills exam, yet the probationary license itself cannot come before ${s.interAgeL}, so most learners have more than the minimum time to finish the ${s.hours ?? h.nc}-hour log at a steady pace. Without the course, the age line moves: the BMV wording is "${s.driversEdL}". That gap is the main reason Indiana families weigh a course even though the state does not impose one. The ${h.a('permit-age', 'date calculator')} turns a birth date into the exact calendar, including the end of the first 180 days.</p>
<p>The rules on this page were read on ${h.os(C, 'retake', 'the Indiana BMV site')} and its fee chart; this site is independent of the Indiana BMV.</p>`;
    },
  },
});
