import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'LA';
const F = (h: Helpers) => ({ s: h.S(C), tx: h.S('TX'), ms: h.S('MS'), ar: h.S('AR') });

export default definePage({
  id: 'state-la',
  group: 'states',
  order: 119,
  state: C,
  tool: { kind: 'quiz', props: { type: 'car' } },
  mini: { kind: 'mini:drivered', props: { state: 'LA' } },
  related: ['home', 'drivers-ed', 'how-many-questions', 'state-tx', 'state-al', 'state-ok'],
  sources: ['handbooks', 'mutcd'],
  en: {
    slug: 'louisiana-permit-test',
    nav: 'Louisiana',
    card: 'Louisiana OMV knowledge test: 40 questions, 32 right, after a 38-hour driver ed course.',
    title: 'Louisiana Permit Test 2026: Free OMV 40-Question Practice',
    description: 'Louisiana permit practice test, free: 40 OMV-style questions graded at 32 correct, explained answers, the 38-hour driver ed course, permit at 15, 50 hours.',
    h1: 'Louisiana permit practice test',
    intro: 'Forty questions, thirty-two right: practice the Louisiana knowledge test at its real length before or after your driver education course.',
    resume: (h) => {
      const { s } = F(h);
      return `To get a learner's permit in Louisiana at ${s.permitAgeL}, a teen first completes driver education: ${s.driversEdL}. The Office of Motor Vehicles knowledge test then has ${s.testQ ?? h.nc} questions and is passed with ${s.need ?? h.nc} correct, ${s.pctL}. The permit fee is ${s.permitFeeL}. The learner keeps it ${s.holdL} and records ${s.hours ?? h.nc} hours of supervised driving, ${s.nightHours ?? h.nc} of them at night, before the road test for the intermediate license at ${s.interAgeL}, which costs ${s.licenseFeeL}. The intermediate license has a night limit (${s.nightL.replace(/^Intermediate: /, '').replace(/ unless.*$/, '')}) and, in the evening, a cap on young passengers outside the family. A full license follows at ${s.fullAgeL}. Louisiana bans phone use for these drivers. The practice test above uses the full ${s.testQ ?? h.nc} questions so you can see whether you would clear the ${s.need ?? h.nc}-answer bar.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'Does the Louisiana driver ed course come before the knowledge test?', a: `Yes. Louisiana requires a ${s.driversEdL.match(/\d+-hour/)?.[0] ?? ''} driver education course before the learner's permit at ${s.permitAgeL}. The course covers the material of the knowledge exam, and the bar is ${s.need ?? h.nc} correct out of ${s.testQ ?? h.nc}, so practice at full length before the course ends.` },
        { q: 'Can I skip the intermediate license in Louisiana?', a: `Only by waiting. Louisiana describes the driver education course as ${s.driversEdL.replace(/^required \(38-hour driver education course\) /, 'required ')}. A new driver of ${s.fullAgeL} can therefore go straight to a full license after the course, but a teen of ${s.interAgeL} goes through the intermediate stage with its night and passenger limits.` },
        { q: 'Who can ride with a Louisiana intermediate driver at night?', a: `The passenger rule reads: ${s.passengersL.replace(/^Intermediate: /, '')}. The night rule is separate: ${s.nightL.replace(/^Intermediate: /, '')}. Together they keep the riskiest late trips supervised during the first year.` },
      ];
    },
    body: (h) => {
      const { s, tx, ms, ar } = F(h);
      return `
<h2>Driver education comes first</h2>
<p>Louisiana is stricter than its neighbors on schooling: the course is a condition of the permit itself, not only of the license. Compare the rule in any state:</p>
<!--tool:mini:drivered|{"state":"LA"}-->
<p>The course combines classroom time and driving with an instructor. Because it comes before the permit, most teens arrive at the knowledge test having already studied the whole handbook, and the OMV test is the check that the lessons stuck.</p>
<p>Planning the course matters because of the calendar. A teen who wants the permit on the day they reach ${s.permitAgeL} needs the course done before that date, then ${s.holdL} with the permit and the ${s.hours ?? h.nc} logged hours, ${s.nightHours ?? h.nc} of them at night, before the road test for the intermediate license at ${s.interAgeL}. The intermediate stage then lasts until ${s.fullAgeL}. Late starters are not stuck: at ${s.fullAgeL}, the course leads straight to a full license with no intermediate stage.</p>
<h2>Louisiana against Texas, Mississippi and Arkansas</h2>
${h.table(['', 'Louisiana', 'Texas', 'Mississippi', 'Arkansas'], [
  ['Permit at', s.permitAgeL, tx.permitAgeL, ms.permitAgeL, ar.permitAgeL],
  ['Questions on the test', s.testQ ?? h.nc, tx.testQ ?? h.nc, ms.testQ ?? h.nc, ar.testQ ?? h.nc],
  ['Hours to log', s.hours ?? h.nc, tx.hours ?? h.nc, ms.hours ?? h.nc, ar.hours ?? h.nc],
  ['Permit fee', s.permitFeeL, tx.permitFeeL, ms.permitFeeL, ar.permitFeeL],
], 'Louisiana and its neighbors.', ['l', 'r', 'r', 'r', 'r'])}
<p>${h.sl('TX')} asks for ${tx.hours ?? h.nc} supervised hours, Louisiana ${s.hours ?? h.nc}, with more of them at night (${s.nightHours ?? h.nc} against ${tx.nightHours ?? h.nc}).</p>
<p>Louisiana also bans phone use for young drivers, a rule the test often pairs with questions on distraction.</p>
<h2>How many mistakes Louisiana allows</h2>
<p>With ${s.testQ ?? h.nc} questions and ${s.need ?? h.nc} needed, the margin is ${s.canMiss ?? h.nc} wrong answers. The questions draw on the Louisiana driver's guide published by the OMV: signs and signals, right of way, lane use, speed, following distance, railroad crossings, school buses, and alcohol and drugs. Louisiana roads add their own topics: long bridges and causeways over water, heavy rain and fog, and flooded streets after storms, where the safest answer is almost always to turn around. Signs follow the federal ${h.src('mutcd', 'MUTCD')}.</p>
<p>The two evening rules of the intermediate license are easy to mix up. The passenger cap starts earlier in the evening than the driving curfew: ${s.passengersL.replace(/^Intermediate: /, '')}, while the curfew reads ${s.nightL.replace(/^Intermediate: /, '')}. A teen driving friends home after an evening game meets the passenger rule first.</p>
<h2>Fees and the office visit</h2>
<p>At OMV rates, the learner's permit costs ${s.permitFeeL} and the intermediate license ${s.licenseFeeL}. Bring the driver education completion certificate, proof of identity, Social Security number and Louisiana residency, and a parent or guardian for a minor. The figures on this page were read on ${h.os(C, 'testQ', 'the Louisiana OMV site')}; this site is independent of the OMV.</p>`;
    },
  },
});
