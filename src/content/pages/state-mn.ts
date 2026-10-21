import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'MN';
const F = (h: Helpers) => ({ s: h.S(C), wi: h.S('WI'), ia: h.S('IA'), nd: h.S('ND') });

export default definePage({
  id: 'state-mn',
  group: 'states',
  order: 116,
  state: C,
  tool: { kind: 'quiz', props: { type: 'car' } },
  mini: { kind: 'mini:restrictions', props: { state: 'MN' } },
  related: ['home', 'teen-restrictions', 'supervised-hours', 'state-wi', 'state-ia', 'state-mo'],
  sources: ['handbooks', 'mutcd', 'nhtsa_teen'],
  en: {
    slug: 'minnesota-permit-test',
    nav: 'Minnesota',
    card: 'Minnesota instruction permit at 15: 50 hours with 15 at night, driver ed and limits to 17.',
    title: 'Minnesota Permit Test 2026: Free DVS Practice Questions',
    description: 'Minnesota permit practice test, free: DVS-style questions with explained answers, the permit at 15, 50 hours with 15 at night, fees and provisional limits.',
    h1: 'Minnesota permit practice test',
    intro: 'Prepare the Minnesota knowledge test with free questions, then check the provisional license limits that follow, month by month.',
    resume: (h) => {
      const { s } = F(h);
      return `Minnesota's Driver and Vehicle Services issues the instruction permit from ${s.permitAgeL} for ${s.permitFeeL}, and driver education is ${s.driversEdL}. The pages we could read do not give the number of questions on the knowledge test or its pass mark; the practice test therefore runs 20 questions with an 80 % target. A learner holds the permit ${s.holdL} and completes ${s.hours ?? h.nc} hours of supervised driving. Minnesota asks for an unusually large share at night: ${s.nightHours ?? h.nc} of those hours. The provisional license costs ${s.licenseFeeL} and is possible at ${s.interAgeL}. Its curfew reads: ${s.nightL.replace(/^Provisional, first 6 months: /, 'for the first six months, ')}. Its passenger rule: ${s.passengersL.replace(/^Provisional: /, '')}. The provisional limits end by ${s.fullAgeL}. Minnesota sets zero alcohol (${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc}) for drivers under 21 and bars young drivers from using phones.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'Why does Minnesota require 15 hours of night driving?', a: `Minnesota counts ${s.nightHours ?? h.nc} of the ${s.hours ?? h.nc} supervised hours at night, more than the usual 10. Darkness comes early in a Minnesota winter, and night driving combined with snow, ice and wildlife is where new drivers struggle most. The upside: in December, a drive home after school often already counts as night practice.` },
        { q: 'When can a Minnesota provisional driver carry three friends?', a: `During the first six months of the provisional license, only one non-family passenger under 20 is allowed unless a parent is present. For the next six months the cap rises to three. The rule as published: ${s.passengersL.replace(/^Provisional: /, '')}. The night curfew, for its part, covers only the first six months.` },
        { q: 'How much do the Minnesota permit and license cost?', a: `The instruction permit costs ${s.permitFeeL} and the provisional license ${s.licenseFeeL}, so ${h.m((s.permitFee ?? 0) + (s.licenseFee ?? 0))} for the two cards at DVS rates. Driver education courses are priced separately by each provider and are not included. Retest rules and fees for a failed knowledge test were not confirmed on the pages we read.` },
      ];
    },
    body: (h) => {
      const { s, wi, ia, nd } = F(h);
      return `
<h2>What a provisional driver may do</h2>
<p>Minnesota loosens its limits in steps instead of lifting them all at once. The tool below summarizes them; it starts on Minnesota but accepts any state.</p>
<!--tool:mini:restrictions|{"state":"MN"}-->
<p>Night rule: ${s.nightL.replace(/^Provisional, first 6 months: /, 'for the first six months, ')}. Passenger rule: ${s.passengersL.replace(/^Provisional: /, '')}.</p>
<h2>How Minnesota compares</h2>
${h.table(['Requirement', 'Minnesota', 'Wisconsin', 'Iowa', 'North Dakota'], [
  ['Instruction permit', s.permitAgeL, wi.permitAgeL, ia.permitAgeL, nd.permitAgeL],
  ['Hours, of which night', `${s.hours ?? h.nc} / ${s.nightHours ?? h.nc}`, `${wi.hours ?? h.nc} / ${wi.nightHours ?? h.nc}`, `${ia.hours ?? h.nc} / ${ia.nightHours ?? h.nc}`, `${nd.hours ?? h.nc} / ${nd.nightHours ?? h.nc}`],
  ['Provisional license', s.interAgeL, wi.interAgeL, ia.interAgeL, nd.interAgeL],
  ['Limits lifted', s.fullAgeL, wi.fullAgeL, ia.fullAgeL, nd.fullAgeL],
], 'Minnesota and its neighbors.', ['l', 'r', 'r', 'r', 'r'])}
<p>${h.sl('IA')} starts younger, at ${ia.permitAgeL}, but asks for far fewer hours. ${h.sl('WI')} matches Minnesota's ${s.hours ?? h.nc}-hour total with less night driving.</p>
<h2>Building the 50 hours</h2>
<p>The supervising driver signs off the log before the road test. A practical way to plan: one hour of daylight practice and one hour after dark each weekend, plus short weekday drives, finishes the requirement within the ${s.holdL} holding period. Vary the conditions on purpose: rain, the first snow, a parking lot after a storm, a stretch of interstate, a small town with four-way stops. Each one matches a chapter of the knowledge test.</p>
<h2>Topics on the Minnesota test</h2>
<p>The Minnesota driver's manual covers traffic laws, signs and signals, sharing the road with bicycles, motorcycles and snowplows, winter driving, and alcohol, including the zero tolerance rule for drivers under 21. Signs follow the federal ${h.src('mutcd', 'MUTCD')}. Federal research on teen crash risk, summarized by ${h.src('nhtsa_teen', 'NHTSA')}, explains why the first months of a provisional license carry the strictest limits.</p>
<p>Figures on this page were read on ${h.os(C, 'permitFee', 'the Minnesota DVS site')}; this site is independent of Driver and Vehicle Services.</p>`;
    },
  },
});
