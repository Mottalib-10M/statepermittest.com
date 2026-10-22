import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'VA';
const F = (h: Helpers) => ({ s: h.S(C), md: h.S('MD'), nc: h.S('NC'), wv: h.S('WV') });
const BAC = (x: number | null, nc: string) => (x != null ? x.toFixed(2) : nc);

export default definePage({
  id: 'state-va',
  group: 'states',
  order: 128,
  state: C,
  tool: { kind: 'quiz', props: { type: 'car' } },
  mini: { kind: 'mini:retake', props: { state: 'VA' } },
  related: ['home', 'failed-test', 'drivers-ed', 'state-md', 'state-nc', 'state-ky'],
  sources: ['handbooks', 'mutcd', 'nhtsa_teen'],
  en: {
    slug: 'virginia-permit-test',
    nav: 'Virginia',
    card: 'Virginia DMV knowledge exam: 40 questions, 34 right, a 15-day wait for teens who fail and a $3 permit.',
    title: 'Virginia Permit Test 2026: Free DMV Knowledge Practice',
    description: 'Virginia permit practice test, free: 40 DMV-style questions graded at 34 correct, answers explained, the permit at 15½, the 15-day retest wait and 45 hours.',
    h1: 'Virginia permit practice test',
    intro: 'Forty questions and thirty-four right answers: practice the Virginia DMV knowledge exam before you risk the fifteen-day wait that follows a failure.',
    resume: (h) => {
      const { s } = F(h);
      return `Virginia's learner's permit is available from ${s.permitAgeL} and costs ${s.permitFeeL}. To get it, an applicant passes the DMV knowledge exam: ${s.testQ ?? h.nc} questions, with ${s.need ?? h.nc} correct answers needed. The exam is offered in Spanish. A failure is costly in time for a teen: ${s.retakeL}. The permit is then held ${s.holdL}, during which the learner logs ${s.hours ?? h.nc} hours of supervised driving, ${s.nightHours ?? h.nc} of them after sunset, and completes state-approved driver education, required under 18. The provisional license can follow at ${s.interAgeL}; ${s.feeNoteL.charAt(0).toLowerCase() + s.feeNoteL.slice(1)} Until ${s.fullAgeL}, a young driver stays off the road in the small hours except in listed cases, and passengers under 21 are capped, more tightly in the first year. The alcohol limit under 21 is ${BAC(s.u21bac, h.nc)}. Our practice test uses the same ${s.testQ ?? h.nc} questions and the ${s.need ?? h.nc}-answer threshold.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'How long must a Virginia teen wait after failing the knowledge exam?', a: `Virginia's rule is: ${s.retakeL}. For a teen that means more than two weeks between attempts, which can push back the permit and every later date. Adults can retest the next day. Clearing ${s.need ?? h.nc} of ${s.testQ ?? h.nc} several times on the practice test before going is the best way to avoid the wait.` },
        { q: 'What changes for Virginia driver training in 2027?', a: `Today, state-approved driver education is required under 18. The DMV adds a change: ${(s.driversEdL.match(/From .*$/)?.[0] ?? h.nc).replace(/\.$/, '')}. If you turn 18 soon and plan to apply in 2027 or later, check the DMV's training rules before you book the exam.` },
        { q: 'How many friends can ride with a new Virginia driver?', a: `The DMV sets the rule in layers: ${s.passengersL} In practice, the first year of a license is the strictest, and family members never count toward the cap.` },
      ];
    },
    body: (h) => {
      const { s, md, nc, wv } = F(h);
      return `
<h2>The retest wait</h2>
<p>Few states make a teen wait as long after a failed knowledge exam as Virginia. The tool shows the delay and the pass mark of any state:</p>
<!--tool:mini:retake|{"state":"VA"}-->
<p>With ${s.canMiss ?? h.nc} wrong answers allowed out of ${s.testQ ?? h.nc}, the margin is thin. Sign questions and right-of-way questions are the most frequent; the "Road signs only" mode drills the first group from the federal ${h.src('mutcd', 'MUTCD')} shapes and colors.</p>
<p>The adult rule is far gentler: from 18, a failed exam can be retaken once per day. For a teen, the fifteen-day pause is the main cost of a failure, so the full-length practice test above is worth more here than in most states.</p>
<h2>Virginia, Maryland, North Carolina, West Virginia</h2>
${h.table(['', 'Virginia', 'Maryland', 'North Carolina', 'West Virginia'], [
  ['Permit age', s.permitAgeL, md.permitAgeL, nc.permitAgeL, wv.permitAgeL],
  ['Time on permit', s.holdL, md.holdL, nc.holdL, wv.holdL],
  ['Hours (night)', `${s.hours ?? h.nc} (${s.nightHours ?? h.nc})`, `${md.hours ?? h.nc} (${md.nightHours ?? h.nc})`, `${nc.hours ?? h.nc} (${nc.nightHours ?? h.nc})`, `${wv.hours ?? h.nc} (${wv.nightHours ?? h.nc})`],
  ['Retest after a fail', s.retakeL, md.retakeL, nc.retakeL, wv.retakeL],
], 'Virginia and three neighboring states.', ['l', 'r', 'r', 'r', 'r'])}
<p>Virginia and ${h.sl('MD')} share the nine-month permit, and Virginia's ${s.nightHours ?? h.nc} night hours are the most in this group. ${h.sl('NC')} asks for more hours in total, ${nc.hours ?? h.nc}.</p>
<h2>Driver education in Virginia</h2>
<p>${s.driversEdL} The classroom part normally comes through high school or a licensed driver training school, and the in-car lessons run alongside the supervised hours on the permit. The ${s.hours ?? h.nc} supervised hours must be certified before the provisional license.</p>
<p>Virginia's minimum dates are built to meet: ${s.permitAgeL} plus ${s.holdL} gives ${h.ageLabel((s.permitAge ?? 0) + (s.holdMonths ?? 0) / 12)}, the provisional license age. A teen who fails the knowledge exam once loses the retest delay and pushes the provisional license back by the same amount. That is why the retest rule matters more in Virginia than in states where the license age, not the holding time, is the real limit. The exam is also offered in Spanish, and the alcohol limit under 21 is ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc}.</p>
<h2>What to study in the DMV manual</h2>
<p>The Virginia Driver's Manual (${s.handbookEdition ?? 'current edition'}) covers signs, signals, pavement markings, right of way, speed, passing, interstate driving, work zones, school buses, and alcohol and drugs. Virginia traffic ranges from congested interstates around Northern Virginia and Hampton Roads to mountain roads in the west, so questions on merging, following distance and curves are worth extra time. For a motorcycle, the DMV test has ${s.motoQ ?? h.nc} questions.</p>
<p>The figures on this page were read on ${h.os(C, 'testQ', 'the Virginia DMV site')}; this site is independent of the Virginia DMV.</p>`;
    },
  },
  es: {
    slug: 'examen-permiso-virginia',
    nav: 'Virginia',
    card: 'Examen del DMV de Virginia: 40 preguntas, 34 correctas, 15 días de espera si reprueba y un permiso de $3.',
    title: 'Examen del permiso de Virginia 2026: práctica gratis',
    description: 'Examen de práctica del permiso de Virginia, gratis y en español: 40 preguntas con 34 correctas para aprobar, el permiso a los 15½, 45 horas y la espera.',
    h1: 'Examen de práctica del permiso de Virginia',
    intro: 'Cuarenta preguntas y treinta y cuatro respuestas correctas: practique el examen de conocimientos del DMV de Virginia antes de arriesgarse a la espera que sigue a un fallo.',
    resume: (h) => {
      const { s } = F(h);
      return `En Virginia, el permiso de aprendiz se obtiene desde los ${s.permitAgeL} y cuesta ${s.permitFeeL}. Antes hay que aprobar el examen de conocimientos del DMV, que se ofrece en español: ${s.testQ ?? h.nc} preguntas, de las que hacen falta ${s.need ?? h.nc} correctas. Si reprueba, la regla de espera es esta: ${s.retakeL}. Con el permiso, el aprendiz maneja acompañado durante ${s.holdL} como mínimo y registra ${s.hours ?? h.nc} horas de práctica supervisada, ${s.nightHours ?? h.nc} de ellas de noche. Los menores de 18 deben además completar un curso de educación vial aprobado por el estado. La licencia provisional llega a los ${s.interAgeL}; ${s.feeNoteL.charAt(0).toLowerCase() + s.feeNoteL.slice(1)} Hasta los ${s.fullAgeL}, el joven conductor no maneja de madrugada, salvo excepciones, y el número de pasajeros menores de 21 está limitado, sobre todo el primer año. Para menores de 21, el límite de alcohol es ${BAC(s.u21bac, h.nc)}. El examen de práctica de arriba usa las mismas ${s.testQ ?? h.nc} preguntas y la misma exigencia.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: '¿Cuánto debe esperar un menor en Virginia tras reprobar el examen teórico?', a: `La regla del DMV es: ${s.retakeL}. Para un adolescente son más de dos semanas entre intentos, lo que retrasa el permiso y todas las fechas siguientes. Los adultos pueden repetir al día siguiente. Lo más eficaz es lograr ${s.need ?? h.nc} de ${s.testQ ?? h.nc} varias veces seguidas en el examen de práctica antes de ir.` },
        { q: '¿Qué cambia en la educación vial de Virginia en 2027?', a: `Hoy la educación vial aprobada por el estado es obligatoria para menores de 18. El DMV anuncia un cambio: ${(s.driversEdL.match(/Desde .*$/)?.[0] ?? h.nc).replace(/\.$/, '')}. Si va a cumplir 18 y piensa solicitarla en 2027, consulte antes las reglas del DMV.` },
        { q: '¿Cuántos amigos pueden ir con un conductor nuevo en Virginia?', a: `El DMV fija la regla por etapas: ${s.passengersL} En la práctica, el primer año de licencia es el más estricto, y los familiares nunca cuentan dentro del límite.` },
      ];
    },
    body: (h) => {
      const { s, md, nc, wv } = F(h);
      return `
<h2>La espera para repetir</h2>
<p>Pocos estados hacen esperar tanto a un menor después de reprobar el examen teórico. La herramienta muestra la espera y la nota de cualquier estado:</p>
<!--tool:mini:retake|{"state":"VA"}-->
<p>Con ${s.canMiss ?? h.nc} errores permitidos sobre ${s.testQ ?? h.nc}, el margen es pequeño. Las preguntas de señales y de derecho de paso son las más frecuentes; el modo «Solo señales de tránsito» repasa las primeras según las formas y colores del ${h.src('mutcd', 'MUTCD')} federal.</p>
<p>Para un adulto la regla es mucho más suave: desde los 18 se puede repetir una vez por día. Para un menor, la pausa de quince días es el costo principal de un fallo, así que el examen de práctica completo vale más aquí que en la mayoría de los estados.</p>
<h2>Virginia y sus vecinos</h2>
${h.table(['', 'Virginia', 'Maryland', 'Carolina del Norte', 'Virginia Occidental'], [
  ['Edad del permiso', s.permitAgeL, md.permitAgeL, nc.permitAgeL, wv.permitAgeL],
  ['Tiempo con el permiso', s.holdL, md.holdL, nc.holdL, wv.holdL],
  ['Horas (de noche)', `${s.hours ?? h.nc} (${s.nightHours ?? h.nc})`, `${md.hours ?? h.nc} (${md.nightHours ?? h.nc})`, `${nc.hours ?? h.nc} (${nc.nightHours ?? h.nc})`, `${wv.hours ?? h.nc} (${wv.nightHours ?? h.nc})`],
  ['Repetir tras un fallo', s.retakeL, md.retakeL, nc.retakeL, wv.retakeL],
], 'Virginia frente a tres estados vecinos.', ['l', 'r', 'r', 'r', 'r'])}
<p>Virginia y ${h.sl('MD')} comparten los nueve meses de permiso, y las ${s.nightHours ?? h.nc} horas nocturnas de Virginia son las más altas del grupo. ${h.sl('NC')} pide más horas en total, ${nc.hours ?? h.nc}.</p>
<h2>La educación vial en Virginia</h2>
<p>${s.driversEdL} La parte en el aula suele hacerse en la escuela secundaria o en una escuela de manejo con licencia, y las clases en el vehículo avanzan al mismo tiempo que las horas supervisadas. Las ${s.hours ?? h.nc} horas supervisadas deben certificarse antes de la licencia provisional.</p>
<p>Las fechas mínimas de Virginia están hechas para coincidir: ${s.permitAgeL} más ${s.holdL} dan ${h.ageLabel((s.permitAge ?? 0) + (s.holdMonths ?? 0) / 12)}, la edad de la licencia provisional. Un joven que reprueba una vez el examen teórico pierde la espera de repetición y retrasa la licencia provisional en la misma medida. Por eso la regla de repetición pesa más en Virginia que en los estados donde el límite real es la edad de la licencia y no el tiempo con el permiso. El examen se ofrece en español, y el límite de alcohol para menores de 21 es ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc}.</p>
<h2>Qué estudiar en el manual del DMV</h2>
<p>El manual del conductor de Virginia trata las señales, los semáforos, las marcas en el pavimento, el derecho de paso, la velocidad, los rebases, el manejo en autopista, las zonas de obras, los autobuses escolares y el alcohol y las drogas. El tráfico de Virginia va de autopistas congestionadas en el norte del estado y en Hampton Roads a carreteras de montaña en el oeste, así que conviene repasar la incorporación, la distancia de seguimiento y las curvas. Para moto, el examen del DMV tiene ${s.motoQ ?? h.nc} preguntas.</p>
<p>Las cifras de esta página salen del ${h.os(C, 'testQ', 'sitio del DMV de Virginia')}; este sitio es independiente del DMV de Virginia.</p>`;
    },
  },
});
