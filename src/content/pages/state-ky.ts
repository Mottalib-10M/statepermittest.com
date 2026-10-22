import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'KY';
const F = (h: Helpers) => ({ s: h.S(C), oh: h.S('OH'), ind: h.S('IN'), wv: h.S('WV') });

export default definePage({
  id: 'state-ky',
  group: 'states',
  order: 120,
  state: C,
  tool: { kind: 'quiz', props: { type: 'car' } },
  mini: { kind: 'mini:spanish', props: { state: 'KY' } },
  related: ['home', 'spanish', 'supervised-hours', 'state-oh', 'state-in', 'state-va'],
  sources: ['handbooks', 'mutcd'],
  en: {
    slug: 'kentucky-permit-test',
    nav: 'Kentucky',
    card: 'Kentucky permit at 15 for $15: 60 hours, a 4-hour GDL course and a retry the next day.',
    title: 'Kentucky Permit Test 2026: Free Practice Questions',
    description: 'Kentucky permit practice test, free: questions with explained answers, the permit at 15 for $15, 60 hours with 10 at night, GDL course, test in Spanish.',
    h1: 'Kentucky permit practice test',
    intro: 'Free practice for the Kentucky knowledge test, given by the Kentucky State Police, in English or Spanish.',
    resume: (h) => {
      const { s } = F(h);
      return `In Kentucky, licensing is handled by the Transportation Cabinet and the knowledge test is given by the Kentucky State Police. A teen can apply for the permit at ${s.permitAgeL}; it costs ${s.permitFeeL}. The test is available in Spanish. Its length and pass mark are not published on the pages we could read, so the practice test here uses 20 questions and an 80 % target. After a failure you can come back the ${s.retakeL}. The permit is held ${s.holdL}, a period during which the learner logs ${s.hours ?? h.nc} hours of supervised practice, ${s.nightHours ?? h.nc} of them at night. Before the full license, Kentucky also requires a short course: ${s.driversEdL.replace(/^required under 18: /, '')}. The intermediate license is possible at ${s.interAgeL} for ${s.licenseFeeL}, and the night and passenger limits that apply to permit holders and intermediate drivers under 18 end with the full license at ${s.fullAgeL}. Under 21, the alcohol limit is ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc}.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'Who gives the Kentucky permit knowledge test?', a: `In Kentucky, the knowledge and road tests are given by the Kentucky State Police, while the Transportation Cabinet's Division of Driver Licensing issues the cards. Check the testing location and hours before you go. If you fail, you can return the ${s.retakeL}, so a missed question is not a long setback.` },
        { q: 'What is the Graduated Driver Licensing course in Kentucky?', a: `Kentucky's rule is: ${s.driversEdL}. It is short and focused on the risks of the first months alone: speed, distraction, night driving and passengers. It is a short refresher on the risks of driving alone, and it does not replace the ${s.hours ?? h.nc} supervised hours on the permit.` },
        { q: 'Can a Kentucky permit holder drive after midnight?', a: `No, not without good cause. ${s.nightL.replace(/^Permit and intermediate under 18: /, 'For permit and intermediate drivers under 18, the rule is ')}. Passengers are capped too: ${s.passengersL.replace(/^Permit and intermediate under 18: /, '').toLowerCase()}. These limits stay until the full license.` },
      ];
    },
    body: (h) => {
      const { s, oh, ind, wv } = F(h);
      return `
<h2>The test in Spanish</h2>
<p>Kentucky offers its knowledge test in Spanish, which matters for families who speak Spanish at home. The tool answers the same question for every state:</p>
<!--tool:mini:spanish|{"state":"KY"}-->
<p>This site's ${h.a('spanish', 'Spanish practice test')} uses the same questions and scoring as the English one, so you can study in the language you will test in.</p>
<h2>Sixty hours on the permit</h2>
<p>Kentucky's ${s.hours ?? h.nc}-hour log is one of the larger requirements in the region. Spread over ${s.holdL}, it comes to roughly ${Math.ceil((s.hours ?? 60) / ((s.holdMonths ?? 6) * 4.3))} hours a week. Include the ${s.nightHours ?? h.nc} night hours early, before the end of the permit period crowds them in. Practice on the roads the teen will use: winding two-lane routes in the hills, interstate traffic near Louisville and Lexington, and rural roads where farm equipment and wildlife appear.</p>
${h.table(['', 'Kentucky', 'Ohio', 'Indiana', 'West Virginia'], [
  ['Permit from', s.permitAgeL, oh.permitAgeL, ind.permitAgeL, wv.permitAgeL],
  ['Supervised hours', s.hours ?? h.nc, oh.hours ?? h.nc, ind.hours ?? h.nc, wv.hours ?? h.nc],
  ['Permit fee', s.permitFeeL, oh.permitFeeL, ind.permitFeeL, wv.permitFeeL],
  ['Retake after a fail', s.retakeL, oh.retakeL, ind.retakeL, wv.retakeL],
], 'Kentucky and three bordering states.', ['l', 'r', 'r', 'r', 'r'])}
<p>Kentucky asks for ten more hours than ${h.sl('OH')} and ${h.sl('IN')}, at the same permit age as Indiana.</p>
<p>Kentucky charges ${s.permitFeeL} for the permit, close to its neighbors, and the cost of a failed attempt is mostly time. Since the retry is possible the ${s.retakeL}, the real risk is starting the permit period late and running into school or work schedules for the ${s.nightHours ?? h.nc} night hours.</p>
<p>Kentucky drivers under 21 should also remember the ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc} alcohol limit: it applies from the first day on the permit.</p>
<h2>What the State Police test covers</h2>
<p>The Kentucky driver manual (${s.handbookEdition ?? 'current edition'}) is the source: traffic signs, signals, right of way, speed limits, passing, railroad crossings, school buses, emergency vehicles, and alcohol. The sign section uses the federal ${h.src('mutcd', 'MUTCD')} shapes and colors; practice them alone with "Road signs only".</p>
<h2>From permit to full license in Kentucky</h2>
<p>The Kentucky sequence runs in three steps. The permit comes at ${s.permitAgeL}. After ${s.holdL}, and at ${s.interAgeL} at the earliest, the road test opens the intermediate license. Then, once the GDL course is done, the full license is possible at ${s.fullAgeL}. Throughout the permit and intermediate stages, the same two rules apply to drivers under 18: ${s.nightL.replace(/^Permit and intermediate under 18: /, '')}, and ${s.passengersL.replace(/^Permit and intermediate under 18: /, '').toLowerCase()}. Fees stay modest, ${s.permitFeeL} for the permit and ${s.licenseFeeL} for the intermediate license. Under 21, the alcohol limit is ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc}, and the manual's chapter on impaired driving is a regular source of test questions.</p>
<p>The figures on this page come from ${h.os(C, 'retake', 'Kentucky\'s official driver licensing site')} and its fee page; this site is independent of the Transportation Cabinet and the Kentucky State Police.</p>`;
    },
  },
});
