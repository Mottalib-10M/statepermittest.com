import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'AL';
const F = (h: Helpers) => ({ s: h.S(C), ga: h.S('GA'), fl: h.S('FL'), ms: h.S('MS') });

export default definePage({
  id: 'state-al',
  group: 'states',
  order: 118,
  state: C,
  tool: { kind: 'quiz', props: { type: 'car' } },
  mini: { kind: 'mini:moto', props: { state: 'AL' } },
  related: ['home', 'motorcycle', 'fees', 'state-ga', 'state-fl', 'state-la'],
  sources: ['handbooks', 'mutcd', 'nhtsa_moto'],
  en: {
    slug: 'alabama-permit-test',
    nav: 'Alabama',
    card: 'Alabama ALEA learner permit at 15: $36.25 plus $5 per test try, 50 hours or driver ed.',
    title: 'Alabama Permit Test 2026: Free ALEA Practice Questions',
    description: 'Alabama permit practice test, free: ALEA-style questions with explained answers, the Stage I permit at 15, the $36.25 fee, 50 hours or driver ed, moto permit.',
    h1: 'Alabama permit practice test',
    intro: 'Free questions for the Alabama knowledge exam, with the Stage I to Stage III path explained and the motorcycle permit that opens at 14.',
    resume: (h) => {
      const { s } = F(h);
      return `Alabama's graduated license has three stages, and the first one, the learner permit, starts at ${s.permitAgeL}. The Alabama Law Enforcement Agency (ALEA) runs the knowledge exam, which it offers in Spanish; the number of questions and the pass mark are not stated on the ALEA pages we could read, so the practice test here uses 20 questions and an 80 % target. The permit costs ${s.permitFeeL}. ${s.feeNoteL} A Stage I learner keeps the permit ${s.holdL} and either completes ${s.hours ?? h.nc} hours of supervised driving or an approved driver education course, which ALEA accepts as an alternative. Stage II, the restricted license, is available at ${s.interAgeL} and carries a midnight curfew and a passenger cap until ${s.fullAgeL}. The alcohol limit is ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc} for drivers under 21. Alabama also opens a motorcycle permit as early as ${s.motoAge != null ? h.ageLabel(s.motoAge) : h.nc}.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'How much does it cost to fail the Alabama knowledge exam?', a: `ALEA charges $5 for each attempt at the knowledge test, on top of the ${s.permitFeeL} permit fee. Two failures add $10, and the time lost returning to the office often costs more. Use the practice test until you score well above 80 %, then book the exam.` },
        { q: 'Can driver education replace the 50 hours in Alabama?', a: `Yes. Alabama lists driver education as ${s.driversEdL}. A teen who completes an approved course does not need to log the ${s.hours ?? h.nc} supervised hours, while one who skips the course must have a parent or guardian certify them. Either way, the Stage I permit must be held ${s.holdL}.` },
        { q: 'What does an Alabama Stage II license allow?', a: `The Stage II license lets a teen drive alone, with two limits. ${s.nightL.replace(/^Stage II: no/, 'No')}. And ${s.passengersL.replace(/^Stage II: /, '')}. Phones are also banned for these drivers.` },
      ];
    },
    body: (h) => {
      const { s, ga, fl, ms } = F(h);
      return `
<h2>Two wheels at 14</h2>
<p>Alabama is among the states that let a young rider start on a motorcycle before a car. The tool shows the motorcycle permit age of any state; it opens on Alabama.</p>
<!--tool:mini:moto|{"state":"AL"}-->
<p>The motorcycle knowledge test covers protective gear, lane position, braking and riding in a group, as described in federal ${h.src('nhtsa_moto', 'NHTSA motorcycle safety')} material. Our motorcycle practice test drills those topics; the length of Alabama's own motorcycle exam was not confirmed.</p>
<h2>The three stages</h2>
${h.table(['Stage', 'Age', 'What it allows'], [
  ['Stage I, learner permit', s.permitAgeL, `driving with a licensed adult, ${s.holdL} minimum`],
  ['Stage II, restricted license', s.interAgeL, 'driving alone, with curfew and passenger limits'],
  ['Stage III, unrestricted', s.fullAgeL, 'regular license'],
], 'Alabama graduated licensing.', ['l', 'r', 'l'])}
<p>Moving between stages depends on age and time, not only on tests. A Stage I learner who starts at ${s.permitAgeL} keeps the permit at least ${s.holdL} and must reach ${s.interAgeL} before Stage II, when the road test comes in. Stage II then runs until ${s.fullAgeL}. During those months the night rule reads: ${s.nightL.replace(/^Stage II: /, '')}. The exceptions cover school and religious events, work and emergencies, so ordinary weekday trips remain possible.</p>
<h2>Alabama and the Gulf states</h2>
${h.table(['', 'Alabama', 'Georgia', 'Florida', 'Mississippi'], [
  ['Learner permit', s.permitAgeL, ga.permitAgeL, fl.permitAgeL, ms.permitAgeL],
  ['Time on permit', s.holdL, ga.holdL, fl.holdL, ms.holdL],
  ['Permit fee', s.permitFeeL, ga.permitFeeL, fl.permitFeeL, ms.permitFeeL],
  ['Motorcycle permit', h.ageLabel(s.motoAge), h.ageLabel(ga.motoAge), h.ageLabel(fl.motoAge), h.ageLabel(ms.motoAge)],
], 'Alabama and its neighbors.', ['l', 'r', 'r', 'r', 'r'])}
<p>Alabama's permit fee is high next to ${h.sl('GA')} (${ga.permitFeeL}), but the holding time is half of Georgia's and ${h.sl('FL')}'s.</p>
<p>The Stage II passenger rule is short: ${s.passengersL.replace(/^Stage II: /, '')}. Phones are also off limits for these drivers, and the alcohol limit under 21 is ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc}. Read these rules twice, since the ALEA exam asks about the graduated license itself.</p>
<h2>Preparing the ALEA exam</h2>
<p>The questions come from the ALEA driver license manual (${s.handbookEdition ?? 'current edition'}). It covers traffic signs and signals, right of way, speed, passing on two-lane roads, railroad crossings, the move-over rule for stopped emergency vehicles, and alcohol and drug penalties. Heavy rain and hurricane season on the Gulf Coast make wet-road driving and hydroplaning worth a careful read. The sign chapter follows the federal ${h.src('mutcd', 'MUTCD')}.</p>
<p>ALEA gives the knowledge exam in Spanish as well as English, which helps families who read the manual more easily in Spanish. This site's practice test exists in both languages with the same questions, so you can study in one and check yourself in the other.</p>
<p>Bring proof of identity, Social Security number and Alabama residency to the driver license office, plus the test fee. The figures here come from ${h.os(C, 'permitFee', 'ALEA')}; this site is independent of ALEA.</p>`;
    },
  },
});
