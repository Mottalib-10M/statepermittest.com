import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'OR';
const F = (h: Helpers) => ({ s: h.S(C), wa: h.S('WA'), ca: h.S('CA'), id: h.S('ID') });

export default definePage({
  id: 'state-or',
  group: 'states',
  order: 121,
  state: C,
  tool: { kind: 'quiz', props: { type: 'car' } },
  mini: { kind: 'mini:hours', props: { state: 'OR' } },
  related: ['home', 'supervised-hours', 'drivers-ed', 'state-wa', 'state-ca', 'state-id'],
  sources: ['handbooks', 'mutcd'],
  en: {
    slug: 'oregon-permit-test',
    nav: 'Oregon',
    card: 'Oregon DMV knowledge test: 35 questions, 28 right, then 100 practice hours or 50 with a course.',
    title: 'Oregon Permit Test 2026: Free 35-Question DMV Practice',
    description: 'Oregon permit practice test, free: 35 DMV-style questions graded at 28 correct, answers explained, online retake limits, 100 hours or 50 with a course.',
    h1: 'Oregon permit practice test',
    intro: 'Thirty-five questions, twenty-eight right: practice the Oregon DMV knowledge test at its real length, then plan the practice hours that follow.',
    resume: (h) => {
      const { s } = F(h);
      return `Oregon's instruction permit can be issued from ${s.permitAgeL}, once the applicant passes the DMV knowledge test: ${s.testQ ?? h.nc} questions, ${s.need ?? h.nc} correct to pass, or ${s.pctL}. Retakes are easy to arrange: ${s.retakeL.charAt(0).toLowerCase() + s.retakeL.slice(1)}. What takes time is the practice. A learner under 18 holds the permit ${s.holdL} and logs ${s.hours ?? h.nc} hours of supervised driving, the highest figure of any state in our data. ${s.driversEdL.replace(/^Not required; /, 'Driver education is optional, but ')} The provisional license is possible at ${s.interAgeL}. Oregon bans phone use while driving and sets the alcohol limit for drivers under 21 at ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc}. The permit fee, the night-hours share and the provisional night and passenger rules were not confirmed on the pages we read. The practice test above uses the full ${s.testQ ?? h.nc} questions and Oregon's ${s.need ?? h.nc}-answer threshold.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'Why does Oregon ask for 100 supervised hours?', a: `Oregon sets ${s.hours ?? h.nc} hours for permit holders who skip formal training, and halves it for those who complete an ODOT-approved traffic safety education course. The idea is that a structured course replaces part of the experience gained by simply driving. Most families who can fit the course choose it for that reason.` },
        { q: 'How many times can I take the Oregon knowledge test online?', a: `Online, Oregon allows at most two attempts in 24 hours and four in total. At a DMV office, a same-day retest is possible when staff and time allow. With ${s.testQ ?? h.nc} questions and ${s.canMiss ?? h.nc} mistakes allowed, it is wiser to use the practice test than to burn online attempts.` },
        { q: 'Is a handheld phone allowed for Oregon learners?', a: `No. Oregon bans phone use while driving, and learners are covered like everyone else; check the DMV for the exact wording on hands-free devices. Distracted driving questions appear on the knowledge test, so read that part of the Oregon Driver Manual (${s.handbookEdition ?? 'current edition'}) closely.` },
      ];
    },
    body: (h) => {
      const { s, wa, ca, id } = F(h);
      return `
<h2>Counting down the hours</h2>
<p>Enter the hours already in the log to see what remains. The tool reads Oregon's ${s.hours ?? h.nc}-hour figure; with an approved course, the real target is half of it.</p>
<!--tool:mini:hours|{"state":"OR"}-->
<p>Spread over the ${s.holdL} minimum, ${s.hours ?? h.nc} hours means about four hours a week, every week. That is why many families plan for more than the minimum holding time, and why the course, which halves the log, is worth a look.</p>
<p>The traffic safety education course is the lever. With it, the log drops to half; without it, the teen needs the full ${s.hours ?? h.nc}. Either way, the permit is held ${s.holdL} and the provisional license cannot come before ${s.interAgeL}.</p>
<h2>The Pacific Northwest compared</h2>
${h.table(['', 'Oregon', 'Washington', 'California', 'Idaho'], [
  ['Knowledge test', s.testQ ? `${s.need} / ${s.testQ}` : h.nc, wa.testQ ? `${wa.need} / ${wa.testQ}` : h.nc, ca.testQ ? `${ca.testQ} questions` : h.nc, id.testQ ? `${id.need} / ${id.testQ}` : h.nc],
  ['Permit age', s.permitAgeL, wa.permitAgeL, ca.permitAgeL, id.permitAgeL],
  ['Supervised hours', s.hours ?? h.nc, wa.hours ?? h.nc, ca.hours ?? h.nc, id.hours ?? h.nc],
  ['First license', s.interAgeL, wa.interAgeL, ca.interAgeL, id.interAgeL],
], 'Oregon beside three western neighbors.', ['l', 'r', 'r', 'r', 'r'])}
<p>Twice the hours of ${h.sl('WA')} or ${h.sl('CA')}: Oregon's log is the longest on the West Coast. ${h.sl('ID')} asks a higher score on its test, ${id.pctL}.</p>
<p>At ${s.testQ ?? h.nc} questions, the Oregon test is a little shorter than the ${wa.testQ ?? h.nc}-question format of ${h.sl('WA')}, with the same ${s.pctL} mark. A few extra seconds of reading per question is still a good habit: most failures come from a misread word such as "except" or "unless", not from a rule nobody studied.</p>
<h2>What the Oregon test covers</h2>
<p>The Oregon Driver Manual is the source of all questions. It gives weight to topics that matter on Oregon roads: rain and reduced visibility for much of the year, mountain passes with snow and chains requirements in winter, sharing the road with bicycles in cities, roundabouts, and the rules for pedestrians at every intersection. Expect questions on speed rules, right of way, lane use and alcohol as well. Road signs follow the federal ${h.src('mutcd', 'MUTCD')}.</p>
<h2>Online or at the office</h2>
<p>Oregon is one of the states where the knowledge test can be taken online as well as at a DMV office, within the limits the DMV sets: ${s.retakeL.charAt(0).toLowerCase() + s.retakeL.slice(1)}. Treat online attempts as a resource to spend carefully, because once they are used up the next test has to be taken in person. At an office, a failed test can sometimes be repeated the same day, but only when staff have time, so do not plan a visit around it. For drivers under 21, the alcohol limit is ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc}: any measurable amount is a violation.</p>
<p>Once the permit is in hand, keep a dated log of every drive, with the conditions and the supervising adult, so the total is easy to certify. The figures on this page come from ${h.os(C, 'testQ', 'the Oregon DMV')}; this site is independent of ODOT and the DMV.</p>`;
    },
  },
});
