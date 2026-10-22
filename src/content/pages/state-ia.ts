import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'IA';
const F = (h: Helpers) => ({ s: h.S(C), mn: h.S('MN'), mo: h.S('MO'), ne: h.S('NE') });

export default definePage({
  id: 'state-ia',
  group: 'states',
  order: 125,
  state: C,
  tool: { kind: 'quiz', props: { type: 'car' } },
  mini: { kind: 'mini:hours', props: { state: 'IA' } },
  related: ['home', 'supervised-hours', 'permit-age', 'state-mn', 'state-wi', 'state-mo'],
  sources: ['handbooks', 'mutcd', 'nhtsa_teen'],
  en: {
    slug: 'iowa-permit-test',
    nav: 'Iowa',
    card: 'Iowa instruction permit at 14 for $6: a full year on the permit, 20 hours and driver ed.',
    title: 'Iowa Permit Test 2026: Free DOT Knowledge Practice Test',
    description: 'Iowa permit practice test, free: DOT-style questions with explained answers, the instruction permit at 14 for $6, a 12-month hold, 20 hours, the curfew.',
    h1: 'Iowa permit practice test',
    intro: 'Practice for the Iowa DOT knowledge test, then see how a 14-year-old in Iowa reaches a first license: early, but after a full year on the permit.',
    resume: (h) => {
      const { s } = F(h);
      return `Iowa opens the instruction permit at ${s.permitAgeL}, one of the youngest ages in the country, and it costs only ${s.permitFeeL}. The trade-off is time: the permit must be held ${s.holdL}. During that year the learner logs ${s.hours ?? h.nc} hours of supervised driving, ${s.nightHours ?? h.nc} of them at night, fewer than in most states. Driver education is ${s.driversEdL}. The intermediate license is possible at ${s.interAgeL}; ${s.feeNoteL.charAt(0).toLowerCase() + s.feeNoteL.slice(1)} With it, ${s.nightL.replace(/^Intermediate: /, '').replace(/ \(.*\)$/, '')}, and for the first six months ${s.passengersL.replace(/^Intermediate, first 6 months: /, '')}. A full license can follow at ${s.fullAgeL}. The alcohol limit for drivers under 21 is ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc}. The Iowa DOT pages we could read do not state the number of questions or the pass mark of the knowledge test, so the practice test here uses 20 questions with an 80 % target.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'Can a 14-year-old really drive in Iowa?', a: `Yes, with an instruction permit from ${s.permitAgeL} and always with a qualified supervising driver. The permit must then be held ${s.holdL} before the intermediate license, so a teen who starts at 14 drives alone at ${s.interAgeL} at the earliest. Iowa also issues a motorcycle permit from ${h.ageLabel(s.motoAge)}.` },
        { q: 'Are 20 hours enough to pass the Iowa road test?', a: `Iowa's legal minimum is ${s.hours ?? h.nc} logged hours, with ${s.nightHours ?? h.nc} of them at night. It is low next to the 50 hours many states require, but the permit lasts a full year, so most learners drive far more. Logging extra time in rain, snow and darkness is the best preparation for the road test.` },
        { q: 'What is the Iowa curfew for intermediate drivers?', a: `${s.nightL.replace(/^Intermediate: /, 'Intermediate drivers are covered by this rule: ')}. A waiver is possible for school activities and work; the Iowa DOT explains how to request it. Outside those cases, plan late trips with a supervising adult.` },
      ];
    },
    body: (h) => {
      const { s, mn, mo, ne } = F(h);
      return `
<h2>Twenty hours over twelve months</h2>
<p>Iowa's hour count is modest, and the tool shows how quickly it fills. Enter the hours and night hours already logged:</p>
<!--tool:mini:hours|{"state":"IA"}-->
<p>Spread over ${s.holdL}, ${s.hours ?? h.nc} hours is well under an hour a week. The long holding period is what gives an Iowa learner experience across all four seasons, including the first snow and the spring planting traffic on county roads.</p>
<p>In Iowa, the age floor decides the date more than the holding period does. A teen who gets the permit at ${s.permitAgeL} completes the ${s.holdL} long before the intermediate license opens at ${s.interAgeL}, so a learner who starts on the first eligible day can spend up to ${h.num((s.interAge ?? 16) - (s.permitAge ?? 14))} years on the permit. That extra time is the real strength of the Iowa system: the minimum log is small, but the opportunity to practice is large.</p>
<h2>Iowa among its neighbors</h2>
${h.table(['', 'Iowa', 'Minnesota', 'Missouri', 'Nebraska'], [
  ['Permit at', s.permitAgeL, mn.permitAgeL, mo.permitAgeL, ne.permitAgeL],
  ['Months on permit', s.holdL, mn.holdL, mo.holdL, ne.holdL],
  ['Supervised hours', s.hours ?? h.nc, mn.hours ?? h.nc, mo.hours ?? h.nc, ne.hours ?? h.nc],
  ['Permit fee', s.permitFeeL, mn.permitFeeL, mo.permitFeeL, ne.permitFeeL],
], 'Iowa and three neighboring states.', ['l', 'r', 'r', 'r', 'r'])}
<p>${h.sl('MN')} starts a year later but asks for ${mn.hours ?? h.nc} hours; ${h.sl('MO')} also starts at ${mo.permitAgeL} and wants ${mo.hours ?? h.nc}.</p>
<p>The intermediate stage has its own limits. The curfew reads: ${s.nightL.replace(/^Intermediate: /, '')}. The passenger rule: ${s.passengersL.replace(/^Intermediate, first 6 months: /, 'for the first six months, ')}. Both disappear with the full license, possible at ${s.fullAgeL}. The alcohol limit under 21 is ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc}, and Iowa also issues a motorcycle permit from ${h.ageLabel(s.motoAge)}.</p>
<h2>What the Iowa test covers</h2>
<p>The Iowa driver's manual is the source: signs and signals, right of way, speed, passing on two-lane highways, railroad crossings, sharing the road with farm equipment and slow-moving vehicles, winter driving and alcohol. Many Iowa roads are rural gravel or two-lane routes, and the manual's sections on loose surfaces and passing deserve attention. Signs follow the federal ${h.src('mutcd', 'MUTCD')}; practice them alone in "Road signs only".</p>
<p>The Iowa DOT does not publish the length of the knowledge test on the pages we read. Prepare as if it were long: run the 20-question practice test several times, note the topics behind every error, and reread those parts of the manual before the next round.</p>
<h2>Fees and paperwork</h2>
<p>The instruction permit costs ${s.permitFeeL}. ${s.feeNoteL} A parent or guardian signs for a minor, and the driver education certificate is needed for the intermediate license. Research on young drivers, summarized by ${h.src('nhtsa_teen', 'NHTSA')}, is why the intermediate stage keeps its night and passenger limits. The figures on this page come from ${h.os(C, 'permitFee', 'the Iowa DOT')}; this site is independent of the Iowa DOT.</p>`;
    },
  },
});
