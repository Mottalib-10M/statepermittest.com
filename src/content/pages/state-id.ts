import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'ID';
const F = (h: Helpers) => ({ s: h.S(C), or: h.S('OR'), ut: h.S('UT'), mt: h.S('MT') });

export default definePage({
  id: 'state-id',
  group: 'states',
  order: 127,
  state: C,
  tool: { kind: 'quiz', props: { type: 'car' } },
  mini: { kind: 'mini:passmark', props: { state: 'ID' } },
  related: ['home', 'how-many-questions', 'failed-test', 'state-or', 'state-ut', 'state-wa'],
  sources: ['handbooks', 'mutcd'],
  en: {
    slug: 'idaho-permit-test',
    nav: 'Idaho',
    card: 'Idaho knowledge test: 40 questions, 34 right (85 %), a permit at 14½ and a license at 15.',
    title: 'Idaho Permit Test 2026: Free 40-Question Practice at 85 %',
    description: 'Idaho permit practice test, free: 40 questions graded at 34 correct, the 85 % mark, answers explained, the permit at 14½, driver ed, the 3-day retest wait.',
    h1: 'Idaho permit practice test',
    intro: 'Forty questions, only six mistakes: practice the Idaho knowledge test at its real length and one of the highest pass marks in the country.',
    resume: (h) => {
      const { s } = F(h);
      return `Idaho asks for more on the knowledge test than nearly any other state: ${s.need ?? h.nc} correct answers out of ${s.testQ ?? h.nc}, or ${s.pctL}. The Idaho Transportation Department's DMV offers the test in Spanish and makes you wait ${s.retakeL} after a failure. A teen can hold a supervised instruction permit from ${s.permitAgeL}, for ${s.permitFeeL}; driver education is ${s.driversEdL}. The permit is held ${s.holdL} with ${s.hours ?? h.nc} hours of supervised driving, ${s.nightHours ?? h.nc} of them at night. The first license comes as early as ${s.interAgeL}. ${s.feeNoteL} Night rule: ${s.nightL.replace(/^Under 16: /, 'under 16, ')}. Passenger rule: ${s.passengersL.replace(/^Under 17, /, 'under 17, ')}. The restrictions end by ${s.fullAgeL}. The alcohol limit under 21 is ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc}.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'Why is the Idaho pass mark 85 %?', a: `Idaho sets its bar at ${s.pctL}, above the 80 % common elsewhere; the pages we read do not explain the choice, but the effect is clear for a learner of ${s.permitAgeL}. On ${s.testQ ?? h.nc} questions that leaves ${s.canMiss ?? h.nc} mistakes. Practice until you reach at least 90 % on the full-length test here before booking.` },
        { q: 'How long is the wait after failing the Idaho knowledge test?', a: `Idaho makes you wait ${s.retakeL} before trying again, and the knowledge test fee applies again (${s.feeNoteL.split('.')[0].replace(/^Plus /, '')}). Use those days to work on the questions you missed, especially signs and right of way, which make up a large share of every test. Then run two full practice tests before going back.` },
        { q: 'What does Idaho require in driver education for teens?', a: `Driver education is ${s.driversEdL}. The classroom part prepares for the knowledge test; the observation and behind-the-wheel hours start the practical training. The ${s.hours ?? h.nc} supervised hours on the permit come on top of the course.` },
      ];
    },
    body: (h) => {
      const { s, or, ut, mt } = F(h);
      return `
<h2>Thirty-four out of forty</h2>
<p>The tool converts any state's mark into answers. On Idaho, it shows how little room ${s.pctL} leaves:</p>
<!--tool:mini:passmark|{"state":"ID"}-->
<p>With ${s.canMiss ?? h.nc} misses allowed, the practice test here becomes a reliable gauge: if you miss more than that twice in a row, you are not ready. Studying the Idaho Driver's Manual (${s.handbookEdition ?? 'current edition'}) chapter by chapter, then retesting, works better than repeating the same questions.</p>
<p>One way to use the margin: count the topics you miss. If the misses cluster in one chapter, review that chapter; if they are spread out, read the manual again from the start.</p>
<h2>Idaho against its neighbors</h2>
${h.table(['', 'Idaho', 'Oregon', 'Utah', 'Montana'], [
  ['Pass mark', s.pctL, or.pctL, ut.pctL, mt.pctL],
  ['Permit at', s.permitAgeL, or.permitAgeL, ut.permitAgeL, mt.permitAgeL],
  ['Licensed at', s.interAgeL, or.interAgeL, ut.interAgeL, mt.interAgeL],
  ['Supervised hours', s.hours ?? h.nc, or.hours ?? h.nc, ut.hours ?? h.nc, mt.hours ?? h.nc],
], 'Idaho and three neighboring states.', ['l', 'r', 'r', 'r', 'r'])}
<p>Idaho and Montana both license at ${s.interAgeL}; ${h.sl('OR')} and ${h.sl('UT')} wait until ${or.interAgeL}. ${h.sl('OR')} also asks for twice Idaho's hours.</p>
<p>Idaho's timeline is among the fastest in the country: a permit at ${s.permitAgeL}, the first license ${s.holdL} later at ${s.interAgeL}, and the teen limits gone at ${s.fullAgeL}. Two rules apply in between. Under 16, the night rule reads: ${s.nightL.replace(/^Under 16: /, '')}. And for the first six months of the license, ${s.passengersL.replace(/^Under 17, first 6 months of license: /, 'a driver under 17 may carry ')}.</p>
<h2>Topics that Idaho tests</h2>
<p>Expect questions on traffic signs, right of way at uncontrolled intersections, speed on rural highways, passing, railroad crossings, school buses, and alcohol. Idaho drivers deal with mountain roads, snow and ice for several months, wildlife crossings and long distances between towns, and the safe-driving chapter covers each. Signs follow the federal ${h.src('mutcd', 'MUTCD')}, so the "Road signs only" mode is useful practice.</p>
<p>The Idaho DMV gives the knowledge test in Spanish as well. With a mark of ${s.pctL}, reading the questions in the language you know best is not a detail: one misread question can be the difference between pass and fail. The alcohol limit for drivers under 21 is ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc}, a regular topic on the test.</p>
<h2>The cost, all in</h2>
<p>The permit is ${s.permitFeeL}, the teen license ${s.licenseFeeL}. ${s.feeNoteL} Driver education is paid to the school. Each failed knowledge test adds the test fee again and the ${s.retakeL} wait, so the cheapest path is to pass on the first visit. The figures on this page were read on ${h.os(C, 'testQ', 'the Idaho Transportation Department')} and in its driver's manual; this site is independent of the ITD and its DMV.</p>`;
    },
  },
});
