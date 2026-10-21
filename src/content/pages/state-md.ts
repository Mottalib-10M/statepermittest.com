import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'MD';
const F = (h: Helpers) => ({ s: h.S(C), pa: h.S('PA'), va: h.S('VA'), de: h.S('DE') });

export default definePage({
  id: 'state-md',
  group: 'states',
  order: 113,
  state: C,
  tool: { kind: 'quiz', props: { type: 'car' } },
  mini: { kind: 'mini:bac', props: { state: 'MD' } },
  related: ['home', 'drivers-ed', 'supervised-hours', 'state-pa', 'state-va', 'state-nj'],
  sources: ['handbooks', 'mutcd', 'nhtsa_alcohol'],
  en: {
    slug: 'maryland-permit-test',
    nav: 'Maryland',
    card: 'Maryland MVA learner permit at 15¾: 60 practice hours, 9 months on the permit and zero alcohol.',
    title: 'Maryland Permit Test 2026: Free MVA Knowledge Practice',
    description: 'Maryland permit practice test, free: MVA-style questions with explained answers, the permit at 15¾, 9 months, 60 hours, driver ed and zero alcohol under 21.',
    h1: 'Maryland permit practice test',
    intro: 'Practice for the Maryland MVA knowledge test, then see why the Maryland path is one of the longest on the East Coast: nine months on the permit and sixty logged hours.',
    resume: (h) => {
      const { s } = F(h);
      return `In Maryland the learner's instructional permit can be issued at ${s.permitAgeL}, after the knowledge test at the Motor Vehicle Administration. The MVA pages we could read do not state the number of questions or the pass mark, so the practice test here uses 20 questions and an 80 % target. The permit must then be held ${s.holdL}, a longer wait than in most states, while the learner completes ${s.hours ?? h.nc} hours of supervised driving, ${s.nightHours ?? h.nc} of them at night. Driver education is ${s.driversEdL}. The provisional license is possible at ${s.interAgeL}; until ${s.fullAgeL}, ${s.nightL.replace(/^Provisional under 18: /, 'a provisional driver may drive unsupervised ').replace(/\s*\(.*\)$/, '')}. Maryland applies an alcohol limit of ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc} to drivers under 21, and phones are banned for drivers under 18. Permit and license fees were not confirmed on the pages we read.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'Why must a Maryland learner hold the permit for nine months?', a: `Maryland sets the holding period at ${s.holdL}, three more than the common six-month rule, so the ${s.hours ?? h.nc} supervised hours are spread over seasons and road conditions. The clock starts when the permit is issued, not when practice begins. The ${h.a('permit-age', 'date calculator')} counts forward from a date of birth to the first day a road test is possible.` },
        { q: 'Does the Maryland driver education course replace practice hours?', a: `No. Maryland requires both: ${s.driversEdL}, and ${s.hours ?? h.nc} logged hours with a qualified supervising driver. The classroom part teaches the rules tested on the knowledge exam, while the logged hours build the habits checked on the road test. Plan the course early so it does not delay the provisional license.` },
        { q: 'Can a Maryland driver under 21 have any alcohol before driving?', a: `No. The limit for drivers under 21 is ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc}, which means any measurable alcohol is a violation, compared with 0.08 for adults under federal guidance. The knowledge test regularly asks about this rule and about the consequences of refusing a breath test, so it is worth knowing in detail.` },
      ];
    },
    body: (h) => {
      const { s, pa, va, de } = F(h);
      return `
<h2>Zero tolerance in Maryland</h2>
<p>Alcohol questions show up on every knowledge test in the country, and Maryland's answer for young drivers is simple: the legal limit under 21 is ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc}. Adults are held to the 0.08 standard described by ${h.src('nhtsa_alcohol', 'NHTSA')}. Pick any state in the tool to compare the under-21 rule.</p>
<!--tool:mini:bac|{"state":"MD"}-->
<h2>A long apprenticeship</h2>
<p>Few states ask for as much time behind the wheel before a first license. A Maryland teen who gets the permit on the first eligible day still needs ${s.holdL} and ${s.hours ?? h.nc} logged hours, ${s.nightHours ?? h.nc} of them at night, plus the classroom and in-car lessons of driver education. Splitting the hours into two or three sessions a week is usually enough to finish inside the holding period. Night practice is easier to collect in winter, when darkness falls early.</p>
${h.table(['', 'Maryland', 'Pennsylvania', 'Virginia', 'Delaware'], [
  ['Permit from', s.permitAgeL, pa.permitAgeL, va.permitAgeL, de.permitAgeL],
  ['Held at least', s.holdL, pa.holdL, va.holdL, de.holdL],
  ['Supervised hours', s.hours ?? h.nc, pa.hours ?? h.nc, va.hours ?? h.nc, de.hours ?? h.nc],
  ['Unrestricted at', s.fullAgeL, pa.fullAgeL, va.fullAgeL, de.fullAgeL],
], 'The Mid-Atlantic learner path, side by side.', ['l', 'r', 'r', 'r', 'r'])}
<p>${h.sl('PA')} asks for more hours, ${pa.hours ?? h.nc}, while ${h.sl('VA')} matches Maryland's nine months on the permit with ${va.hours ?? h.nc} hours.</p>
<h2>Preparing for the MVA test</h2>
<p>The knowledge test covers traffic signs, signals, pavement markings, right of way, speed, sharing the road and impaired driving. Maryland drivers deal with dense commuter traffic around Baltimore and the Washington suburbs, toll facilities, long bridges and rural two-lane roads in the west of the state, so lane changes, merging and following distance deserve extra attention. Sign questions use the shapes and colors of the national ${h.src('mutcd', 'MUTCD')}; select "Road signs only" above to drill them separately.</p>
<p>Because the MVA does not publish its question count on the pages we checked, do not rely on a fixed number of allowed mistakes. Train until you score well above 80 % on several full practice runs.</p>
<p>The figures on this page come from ${h.os(C, 'hours', 'the Maryland MVA')}; this site is independent of the MVA.</p>`;
    },
  },
});
