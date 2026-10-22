import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'UT';
const F = (h: Helpers) => ({ s: h.S(C), nv: h.S('NV'), id: h.S('ID'), az: h.S('AZ') });

export default definePage({
  id: 'state-ut',
  group: 'states',
  order: 124,
  state: C,
  tool: { kind: 'quiz', props: { type: 'car' } },
  mini: { kind: 'mini:bac', props: { state: 'UT' } },
  related: ['home', 'drivers-ed', 'dmv-written-test', 'state-nv', 'state-az', 'state-id'],
  sources: ['handbooks', 'mutcd', 'nhtsa_alcohol'],
  en: {
    slug: 'utah-permit-test',
    nav: 'Utah',
    card: 'Utah learner permit at 15 for $19: driver ed required under 19, 40 hours and zero alcohol.',
    title: 'Utah Permit Test 2026: Free Driver License Practice Test',
    description: 'Utah permit practice test, free: knowledge questions with explained answers, the learner permit at 15 for $19, driver ed under 19, 40 hours, alcohol rules.',
    h1: 'Utah permit practice test',
    intro: 'Free practice for the Utah knowledge test, and a look at what makes Utah different: driver education up to age 19 and the strictest alcohol rules in the country.',
    resume: (h) => {
      const { s } = F(h);
      return `Utah's Driver License Division issues the learner permit from ${s.permitAgeL}, for a fee of ${s.permitFeeL}. The rule on training is broader than in most states: ${s.driversEdL.replace(/^Required for applicants under 19: /, 'applicants under 19 must complete ').replace(/ \(19\+.*\)\.$/, '')}, while older first-time applicants have an alternative (${s.driversEdL.match(/\((19\+[^)]*)\)/)?.[1] ?? h.nc}). A teen keeps the permit ${s.holdL} and logs ${s.hours ?? h.nc} hours of supervised driving, ${s.nightHours ?? h.nc} of them at night. The first license is possible at ${s.interAgeL} and costs ${s.licenseFeeL}; ${s.feeNoteL.charAt(0).toLowerCase() + s.feeNoteL.slice(1)} The Division's pages we could read do not give the number of questions or the pass mark of the knowledge test, so the practice test uses 20 questions and an 80 % target. Night and passenger limits for new drivers were not confirmed either. Utah does set zero tolerance for alcohol under 21: a limit of ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc}.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'Do 18-year-olds need driver education in Utah?', a: `Yes, in Utah the requirement runs to age 19, not 18: ${s.driversEdL.replace(/\.$/, '')}. An 18-year-old applying for a first license therefore follows the same course path as a teen. From 19, the course can be replaced by holding the permit and logging certified hours.` },
        { q: 'What is the alcohol limit for drivers in Utah?', a: `For drivers under 21 it is ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc}: any measurable alcohol is a violation. Adults in Utah face a lower limit than in other states, 0.05 instead of 0.08, which the tool on this page shows. The knowledge test asks about both, and about refusing a chemical test.` },
        { q: 'What does a first Utah license cost?', a: `The learner permit is ${s.permitFeeL} and the first license ${s.licenseFeeL}, so ${h.m((s.permitFee ?? 0) + (s.licenseFee ?? 0))} for the two cards. ${s.feeNoteL} Driver education is paid separately to the school or program. Retest fees for a failed knowledge test were not confirmed on the Division's pages we read.` },
      ];
    },
    body: (h) => {
      const { s, nv, id, az } = F(h);
      return `
<h2>Alcohol rules in Utah</h2>
<p>Utah is the one state where the adult limit is below 0.08, the standard described by ${h.src('nhtsa_alcohol', 'NHTSA')}. For young drivers the rule is simpler still: no alcohol at all. Choose any state to compare the limits.</p>
<!--tool:mini:bac|{"state":"UT"}-->
<p>These rules come up in almost every version of the knowledge test, often together with questions on implied consent, open containers and the effect of alcohol on reaction time.</p>
<p>For a learner, the practical rule is short: no alcohol at all before driving. Questions on how alcohol slows reaction time, why coffee or a cold shower does not sober anyone up, and what happens after a refused test are classics of the knowledge exam.</p>
<h2>Utah and its neighbors</h2>
${h.table(['', 'Utah', 'Nevada', 'Idaho', 'Arizona'], [
  ['Learner permit', s.permitAgeL, nv.permitAgeL, id.permitAgeL, az.permitAgeL],
  ['Hours to log', s.hours ?? h.nc, nv.hours ?? h.nc, id.hours ?? h.nc, az.hours ?? h.nc],
  ['First license', s.interAgeL, nv.interAgeL, id.interAgeL, az.interAgeL],
  ['Permit fee', s.permitFeeL, nv.permitFeeL, id.permitFeeL, az.permitFeeL],
], 'The Intermountain West, permit by permit.', ['l', 'r', 'r', 'r', 'r'])}
<p>${h.sl('ID')} lets a teen drive alone a year earlier than Utah, at ${id.interAgeL}. ${h.sl('NV')} and ${h.sl('AZ')} start the permit half a year later, at ${nv.permitAgeL}.</p>
<p>Utah also offers a motorcycle permit, from ${h.ageLabel(s.motoAge)}; the ${h.a('motorcycle', 'motorcycle practice test')} covers that exam.</p>
<h2>Getting ready for the Division test</h2>
<p>The Utah Driver Handbook is the base of the questions: signs, signals and markings, right of way, speed, lane use, freeway driving, and impaired driving. Utah conditions add mountain canyon roads, winter storms along the Wasatch Front, and long rural highways where fatigue and wildlife are real risks. Because the test length is not published, train until you pass the 20-question practice test with a clear margin several times in a row. Sign questions use the federal ${h.src('mutcd', 'MUTCD')} shapes and colors; pick "Road signs only" to drill them.</p>
<p>The Utah timeline is simple to compute: a permit at ${s.permitAgeL}, ${s.holdL} of supervised driving with ${s.hours ?? h.nc} hours, ${s.nightHours ?? h.nc} after dark, and a first license at ${s.interAgeL}. For anyone under 19, driver education has to fit into that same window, so it pays to start the course close to the permit date.</p>
<p>Many Utah learners also find the freeway chapter worth a second read: merging, ramp metering and keeping a safe gap at speed are skills the knowledge test checks in theory before the road test checks them in practice.</p>
<h2>What to bring</h2>
<p>Bring proof of identity, Social Security number and Utah residency, the fee, and, for a minor, a parent or guardian to sign the application. The figures here come from ${h.os(C, 'permitFee', 'the Utah Driver License Division')}; this site is independent of the Division and the Department of Public Safety.</p>
<p>The night and passenger limits of a new Utah license were not confirmed on the Division's pages we read, so this page does not list them; check the Division before a new driver carries friends or drives late.</p>`;
    },
  },
});
