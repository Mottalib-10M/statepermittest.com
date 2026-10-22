import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'KS';
const F = (h: Helpers) => ({ s: h.S(C), mo: h.S('MO'), ne: h.S('NE'), ok: h.S('OK') });

export default definePage({
  id: 'state-ks',
  group: 'states',
  order: 126,
  state: C,
  tool: { kind: 'quiz', props: { type: 'car' } },
  mini: { kind: 'mini:permitage', props: { state: 'KS' } },
  related: ['home', 'permit-age', 'teen-restrictions', 'state-mo', 'state-ok', 'state-ia'],
  sources: ['handbooks', 'mutcd'],
  en: {
    slug: 'kansas-permit-test',
    nav: 'Kansas',
    card: 'Kansas instruction permit at 14: a year on the permit, 50 hours and a restricted license at 15.',
    title: 'Kansas Permit Test 2026: Free Practice for the Permit',
    description: 'Kansas permit practice test, free: questions with explained answers, the instruction permit at 14, a 12-month hold, 50 hours and the license at age 15.',
    h1: 'Kansas permit practice test',
    intro: 'Practice for the Kansas written test and see how the Kansas path works: one of the few states where a 15-year-old can hold a license.',
    resume: (h) => {
      const { s } = F(h);
      return `Kansas lets a teen start at ${s.permitAgeL} with an instruction permit, issued by the Department of Revenue's Division of Vehicles after the written and vision tests. The permit must be held ${s.holdL}, and the learner logs ${s.hours ?? h.nc} hours of supervised driving, ${s.nightHours ?? h.nc} at night. At ${s.interAgeL} a restricted license is possible, which is unusual: ${s.driversEdL.replace(/;.*$/, '')}. That license at 15 allows only trips to work, school or religious activities unless a supervising adult is aboard. At 16 the rules loosen, and the limits end at ${s.fullAgeL}. Passengers are tightly controlled: ${s.passengersL.split(';')[0].replace(/^Under 16: /, 'under 16, ').toLowerCase()}. Kansas bans phone use for these drivers and sets the alcohol limit at ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc} under 21. The pages we read do not give the test length, pass mark or permit fee, so the practice test uses 20 questions with an 80 % target.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'Where can a 15-year-old with a Kansas license drive?', a: `${s.nightL.split(';')[0].replace(/^Restricted license at 15: /, 'With the restricted license at 15, the driver is limited to ')}. Driving anywhere else requires a supervising adult in the car. It is most useful for rural families, where school and work can be far apart and public transport is scarce.` },
        { q: 'What changes for a Kansas driver at 16?', a: `At 16, for six months, the rule allows ${s.nightL.split(';')[1]?.replace(/^ at 16 for 6 months: /, '') ?? h.nc}. Passengers: ${s.passengersL.split(';')[1]?.replace(/^ 16, first 6 months: /, '') ?? h.nc}. Driver education, required for the license at 15, is not required for a teen who waits until 16.` },
        { q: 'How many night hours does a Kansas learner need?', a: `Of the ${s.hours ?? h.nc} supervised hours on the Kansas permit, ${s.nightHours ?? h.nc} must be driven at night. With a permit held ${s.holdL}, there is plenty of time: winter evenings, when darkness comes before dinner, are the easiest moment to collect them. Keep the log dated and signed by the supervising adult.` },
      ];
    },
    body: (h) => {
      const { s, mo, ne, ok } = F(h);
      return `
<h2>Counting to the permit</h2>
<p>Enter an age to see when a Kansas instruction permit, the restricted license and full privileges become possible:</p>
<!--tool:mini:permitage|{"state":"KS"}-->
<p>A teen who starts at ${s.permitAgeL} and holds the permit ${s.holdL} reaches the restricted license at ${s.interAgeL}, the youngest first license of the four states in the table below.</p>
<p>For a teen who waits, the path changes. Driver education is ${s.driversEdL}. At 16, the six-month limits on hours and passengers apply, and full privileges arrive at ${s.fullAgeL}. Because the instruction permit must be held ${s.holdL}, a learner who starts at ${s.permitAgeL} reaches the restricted license age exactly when the holding period ends, so no time is lost if the written test is passed on the first visit.</p>
<h2>Kansas next to Missouri, Nebraska and Oklahoma</h2>
${h.table(['Step', 'Kansas', 'Missouri', 'Nebraska', 'Oklahoma'], [
  ['Learner permit', s.permitAgeL, mo.permitAgeL, ne.permitAgeL, ok.permitAgeL],
  ['Required time on it', s.holdL, mo.holdL, ne.holdL, ok.holdL],
  ['Driving alone from', s.interAgeL, mo.interAgeL, ne.interAgeL, ok.interAgeL],
  ['No more limits', s.fullAgeL, mo.fullAgeL, ne.fullAgeL, ok.fullAgeL],
], 'Kansas and the states around it.', ['l', 'r', 'r', 'r', 'r'])}
<p>A Kansas teen can drive alone ${Math.round(((mo.interAge ?? 16) - (s.interAge ?? 15)) * 12)} months before neighbors in ${h.sl('MO')} or ${h.sl('OK')}, both at ${mo.interAgeL}, but only for limited trips at first.</p>
<p>Two numbers explain the Kansas design. A permit at ${s.permitAgeL} and a restricted license at ${s.interAgeL} give rural teens early mobility; the ${s.hours ?? h.nc} supervised hours, ${s.nightHours ?? h.nc} of them at night, and the trip limits make sure that mobility is built slowly. Kansas also allows a motorcycle permit from ${h.ageLabel(s.motoAge)}, and the alcohol limit under 21 is ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc}.</p>
<h2>Studying for the Kansas written test</h2>
<p>The Kansas driving handbook covers signs, signals, right of way, speed limits, passing, railroad crossings, and alcohol and drugs. Kansas driving means long straight highways with high speeds, crosswinds, farm machinery on two-lane roads, and sudden storms in spring and summer. Questions on stopping distance, safe passing and visibility in bad weather are worth extra time. Signs follow the federal ${h.src('mutcd', 'MUTCD')}.</p>
<p>The pages we read do not give the length of the Kansas written test. Short daily sessions work better than one long cram: a 20-question round each evening, with the explanations read for every miss, covers the whole handbook within a couple of weeks.</p>
<h2>Bringing the right papers</h2>
<p>A minor applies with a parent or guardian and brings proof of identity, Social Security number and Kansas residency. For the restricted license at 15, bring the driver education certificate too. The test fee and the permit fee were not confirmed on the pages we read, so check the Division of Vehicles before the visit. Figures here come from ${h.os(C, 'permitAge', 'the Kansas Division of Vehicles')}; this site is independent of the Kansas Department of Revenue.</p>`;
    },
  },
});
