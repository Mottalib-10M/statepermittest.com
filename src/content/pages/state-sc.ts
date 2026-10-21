import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'SC';
const F = (h: Helpers) => ({ s: h.S(C), nc: h.S('NC'), ga: h.S('GA') });

export default definePage({
  id: 'state-sc',
  group: 'states',
  order: 117,
  state: C,
  tool: { kind: 'quiz', props: { type: 'car' } },
  mini: { kind: 'mini:permitage', props: { state: 'SC' } },
  related: ['home', 'permit-age', 'teen-restrictions', 'state-nc', 'state-ga', 'state-va'],
  sources: ['handbooks', 'mutcd'],
  en: {
    slug: 'south-carolina-permit-test',
    nav: 'South Carolina',
    card: 'South Carolina beginner permit at 15 for $2.50, then a conditional license at 15½.',
    title: 'South Carolina Permit Test 2026: Free SCDMV Practice',
    description: 'South Carolina permit practice test, free: SCDMV-style questions with answers, the beginner permit at 15 for $2.50, 40 hours and the conditional license at 15½.',
    h1: 'South Carolina permit practice test',
    intro: 'Practice for the SCDMV knowledge test and find out how soon a South Carolina teen can drive alone: earlier than in almost any other state.',
    resume: (h) => {
      const { s } = F(h);
      return `South Carolina lets teens start early and drive alone early. The beginner permit is available at ${s.permitAgeL} and costs only ${s.permitFeeL}. With it, the permit rule reads: ${(s.nightL.split('Permit: ')[1] ?? h.nc).replace(/\.$/, '')}. After ${s.holdL} and ${s.hours ?? h.nc} hours of practice, ${s.nightHours ?? h.nc} at night, the conditional license is possible at ${s.interAgeL}, for a fee of ${s.licenseFeeL}. Driver education is required for that conditional license and for the special restricted license at 16. A conditional driver is limited to daylight when alone, and an adult must ride along in the evening. The SCDMV pages we read do not state the number of questions or the pass mark of the knowledge test, so the practice test uses 20 questions and an 80 % target. Under 21, the alcohol limit is ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc}.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'What is the difference between the conditional and special restricted license in South Carolina?', a: `The conditional license is the one a teen can get at ${s.interAgeL} after the permit period; the special restricted license applies from 16. Both require a driver education course from a licensed driving school or a high school, and both carry the same evening and passenger limits. The SCDMV explains which one fits each age and what the application needs.` },
        { q: 'Can a South Carolina permit holder drive at night?', a: `Yes, within limits. The SCDMV rule for a beginner permit is: ${(s.nightL.split('Permit: ')[1] ?? h.nc).replace(/\.$/, '')}. The ${s.nightHours ?? h.nc} night hours in the practice log therefore fit in the evening, before the cutoff. Plan them with the adult who will sign the log.` },
        { q: 'How many passengers can a South Carolina teen driver carry?', a: `Under a conditional or special restricted license, ${s.passengersL.replace(/^Conditional\/special restricted: /, '')} The rule exists because each extra young passenger adds distraction for a new driver.` },
      ];
    },
    body: (h) => {
      const { s, nc, ga } = F(h);
      return `
<h2>Am I old enough yet?</h2>
<p>Enter an age to see how many months remain before a South Carolina beginner permit, and when the next steps open.</p>
<!--tool:mini:permitage|{"state":"SC"}-->
<p>The final age at which all limits disappear is not stated on the SCDMV pages we read, so the tool shows it as not confirmed.</p>
<h2>Carolinas and Georgia</h2>
${h.table(['', 'South Carolina', 'North Carolina', 'Georgia'], [
  ['Learner permit at', s.permitAgeL, nc.permitAgeL, ga.permitAgeL],
  ['First solo license at', s.interAgeL, nc.interAgeL, ga.interAgeL],
  ['Practice hours', s.hours ?? h.nc, nc.hours ?? h.nc, ga.hours ?? h.nc],
  ['Permit fee', s.permitFeeL, nc.permitFeeL, ga.permitFeeL],
], 'Three southeastern states, three different timetables.', ['l', 'r', 'r', 'r'])}
<p>South Carolina lets a teen drive alone (in daylight) at ${s.interAgeL}, ${Math.round(((ga.interAge ?? 16) - (s.interAge ?? 15.5)) * 12)} months before ${h.sl('GA')} and ${h.sl('NC')} allow a first license at ${ga.interAgeL} and ${nc.interAgeL}. The trade-off is the tighter evening rule.</p>
<h2>Evenings under a conditional license</h2>
<p>${s.nightL.split('. Permit:')[0]}. In practice this means a teen driving to an evening job or game needs to plan who rides along, and the rule follows the clock change: the line moves from 6 p.m. to 8 p.m. in summer.</p>
<h2>Studying for the SCDMV test</h2>
<p>The knowledge test covers signs, signals, pavement markings, right of way, safe speed, following distance, and alcohol and drugs. South Carolina drivers meet heavy beach traffic along the coast in summer, sudden thunderstorms and long rural stretches inland, so questions on wet roads, visibility and passing on two-lane highways are worth extra review. Sign shapes and colors are those of the federal ${h.src('mutcd', 'MUTCD')}.</p>
<p>The rules quoted here come from ${h.os(C, 'interAge', 'the SCDMV')} and the fees from ${h.os(C, 'permitFee', 'its fee page')}; this site is independent of the SCDMV.</p>`;
    },
  },
});
