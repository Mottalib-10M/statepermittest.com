import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'MO';
const F = (h: Helpers) => ({ s: h.S(C), ks: h.S('KS'), ia: h.S('IA'), ne: h.S('NE') });

export default definePage({
  id: 'state-mo',
  group: 'states',
  order: 114,
  state: C,
  tool: { kind: 'quiz', props: { type: 'car' } },
  mini: { kind: 'mini:compare', props: { state: 'MO', b: 'KS' } },
  related: ['home', 'rules-by-state', 'permit-age', 'state-ks', 'state-ia', 'state-ok'],
  sources: ['handbooks', 'mutcd'],
  en: {
    slug: 'missouri-permit-test',
    nav: 'Missouri',
    card: 'Missouri instruction permit at 15: 40 hours, no mandatory driver ed and a $5 license fee.',
    title: 'Missouri Permit Test 2026: Free Practice for the Exam',
    description: 'Missouri permit practice test, free: questions with explained answers, the instruction permit at 15, 40 hours, intermediate license rules and Kansas compared.',
    h1: 'Missouri permit practice test',
    intro: 'Practice for the Missouri written test, then line Missouri up against Kansas or any other state with the comparison tool.',
    resume: (h) => {
      const { s } = F(h);
      return `A Missouri teen can apply for an instruction permit at ${s.permitAgeL} through the Department of Revenue, which handles driver licensing. Driver education is ${s.driversEdL}. The permit is kept ${s.holdL}, during which the learner logs ${s.hours ?? h.nc} hours of driving with a qualified supervisor, ${s.nightHours ?? h.nc} of them at night. The intermediate license follows at ${s.interAgeL}, with a license fee of ${s.licenseFeeL}; the permit fee itself was not confirmed. The intermediate license brings a curfew (${s.nightL.replace(/^Intermediate: /, '').toLowerCase()}) and a passenger cap: ${s.passengersL.replace(/^Intermediate: /, '').toLowerCase()}. Restrictions fall away at ${s.fullAgeL}. Drivers under 21 face a ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc} alcohol limit. The written test's length and pass mark do not appear on the pages we could read, so the practice test uses 20 questions with an 80 % goal.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'Is driver education mandatory for a Missouri permit?', a: `Missouri lists driver education as ${s.driversEdL}. A teen can therefore earn the permit and the intermediate license with home practice only, as long as the ${s.hours ?? h.nc} hours are logged and signed. A course can still help with the written test and the road test, but the state does not make it a condition.` },
        { q: 'How many friends can a new Missouri driver carry?', a: `Under the intermediate license, ${s.passengersL.replace(/^Intermediate: /, '').toLowerCase()}. Family members do not count toward that cap. The limit is designed to cut distractions during the first year, when crash risk is highest. Breaking it can delay the step to a full license.` },
        { q: 'Does Missouri have a phone rule just for teen drivers?', a: `The Missouri pages we read list no phone rule reserved for teens, so young drivers follow the same handheld rules as everyone else; check the Department of Revenue for the current wording before you drive. Distraction still comes up in the written test, and keeping the phone out of reach is the advice every driver handbook gives.` },
      ];
    },
    body: (h) => {
      const { s, ks, ia, ne } = F(h);
      return `
<h2>Missouri or Kansas?</h2>
<p>Families in the Kansas City area often compare the two sides of the state line. The tool opens on Missouri and Kansas; change either state to compare any pair.</p>
<!--tool:mini:compare|{"state":"MO","b":"KS"}-->
<p>The gap is real: ${h.sl('KS')} opens the permit at ${ks.permitAgeL} and keeps learners on it ${ks.holdL}, while Missouri starts at ${s.permitAgeL} with ${s.holdL}. A teen must follow the rules of the state where they live, not the one where they go to school or work.</p>
<p>The largest gap with Kansas is time, not age alone: a Kansas learner keeps the permit ${ks.holdL} and logs ${ks.hours ?? h.nc} hours, against ${s.holdL} and ${s.hours ?? h.nc} hours in Missouri. For a family that has lived in both states, the Missouri path feels short.</p>
<h2>Four Midwest states compared</h2>
${h.table(['Step', 'Missouri', 'Kansas', 'Iowa', 'Nebraska'], [
  ['Learner permit', s.permitAgeL, ks.permitAgeL, ia.permitAgeL, ne.permitAgeL],
  ['Hours to log', s.hours ?? h.nc, ks.hours ?? h.nc, ia.hours ?? h.nc, ne.hours ?? h.nc],
  ['Intermediate license', s.interAgeL, ks.interAgeL, ia.interAgeL, ne.interAgeL],
  ['Full privileges', s.fullAgeL, ks.fullAgeL, ia.fullAgeL, ne.fullAgeL],
], 'Missouri and three neighbors.', ['l', 'r', 'r', 'r', 'r'])}
<p>Missouri's ${s.hours ?? h.nc}-hour requirement is lighter than the 50 hours many states demand, but double the ${ia.hours ?? h.nc} hours of ${h.sl('IA')}.</p>
<h2>How the Missouri path runs</h2>
<p>At ${s.permitAgeL}, the learner passes the vision and written tests at a license office. With the permit, driving is allowed only with a qualified supervisor in the front seat. After ${s.holdL} without violations and with the ${s.hours ?? h.nc} hours signed off, the teen can take the driving test for the intermediate license at ${s.interAgeL}. That license carries the curfew and the passenger rule until ${s.fullAgeL}, when the full license becomes available.</p>
<p>Most of the rules a new Missouri driver has to remember belong to the intermediate stage. The passenger rule moves in two steps: ${s.passengersL.replace(/^Intermediate: /, '')}, family members excluded. The curfew reads: ${s.nightL.replace(/^Intermediate: /, '')}. Alcohol is handled more strictly than for adults, with a ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc} limit under 21, so even one drink before driving can cost the license. None of these limits last forever. Write the key dates on a calendar the day the intermediate license is issued: the six-month mark for passengers and the birthday at ${s.fullAgeL} for the rest.</p>
<h2>Topics to study</h2>
<p>The written test pulls from the Missouri driver guide: traffic signs, signals, right of way, speed limits, safe following distance, railroad crossings, sharing the road with trucks and farm equipment on rural highways, and the effects of alcohol and drugs. Interstate merging around St. Louis and Kansas City, and winter storms across the state, explain why lane discipline and stopping distance come up often. Signs follow the federal ${h.src('mutcd', 'MUTCD')}.</p>
<p>The figures here come from ${h.os(C, 'hours', 'the Missouri Department of Revenue')}; this site is independent of the Department of Revenue.</p>`;
    },
  },
});
