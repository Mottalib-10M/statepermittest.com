import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'NC';
const F = (h: Helpers) => ({ s: h.S(C), va: h.S('VA'), sc: h.S('SC'), ga: h.S('GA') });

export default definePage({
  id: 'state-nc',
  group: 'states',
  order: 107,
  state: C,
  tool: { kind: 'quiz', props: { type: 'car' } },
  mini: { kind: 'mini:hours', props: { state: 'NC', done: 30, night: 4 } },
  related: ['home', 'supervised-hours', 'drivers-ed', 'state-va', 'state-ga', 'state-sc'],
  sources: ['handbooks', 'mutcd', 'nhtsa_teen'],
  en: {
    slug: 'north-carolina-permit-test',
    nav: 'North Carolina',
    card: 'NC Level 1 permit at 15: driver ed first, 60 logged hours and a 7-day wait after a fail.',
    title: 'North Carolina Permit Test 2026: Free NCDMV Practice',
    description: 'North Carolina permit practice test, free: NCDMV-style questions with explained answers, the Level 1 permit at 15, driver ed, 60 hours and the retest wait.',
    h1: 'North Carolina permit practice test',
    intro: 'Practice for the NCDMV knowledge test, then follow the three levels of the North Carolina teen license with their hours and hours of the day.',
    resume: (h) => {
      const { s } = F(h);
      return `North Carolina licenses teens in three levels. Level 1, the limited learner permit, is available from ${s.permitAgeL} once the teen has finished a driver education course of at least 30 hours in class and 6 behind the wheel and passed the NCDMV knowledge, sign and vision tests; it costs ${s.permitFeeL}. A failed knowledge test can be retaken after ${s.retakeL}. The permit is held ${s.holdL}, and the log must show ${s.hours ?? h.nc} hours of supervised driving, ${s.nightHours ?? h.nc} of them at night, with no more than ten hours counted in any one week. Level 2, the limited provisional license, follows at ${s.interAgeL} at the earliest and costs ${s.licenseFeeL}; it bans unsupervised driving from 9 p.m. to 5 a.m. except for work or volunteer fire and rescue duty. North Carolina does not publish the length or pass mark of its knowledge test on the pages we read, so the practice test uses 20 questions and an 80 % target.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'Is the North Carolina sign test separate from the knowledge test?', a: 'Yes. NCDMV gives a road sign recognition test in addition to the written knowledge test and the vision check, and a learner must pass all three for the Level 1 permit. Run the "Road signs only" test in the selector until you name every shape and color without hesitating; the sign test is quick but unforgiving.' },
        { q: 'How long do I wait after failing the NC permit test?', a: `${s.retakeL.charAt(0).toUpperCase() + s.retakeL.slice(1)}. Use the week to take the full practice test several times and review every explanation you got wrong. The ${h.a('failed-test', 'retake guide')} lists the waiting period of every state where the agency publishes it, with the fee charged for a new attempt.` },
        { q: 'Can I drive at night with a Level 1 permit in North Carolina?', a: 'During the first six months of Level 1, only from 5 a.m. to 9 p.m., and always with the supervising driver. After six months the learner may drive at any hour, still supervised. Only the supervising driver may sit in the front seat.' },
      ];
    },
    body: (h) => {
      const { s, va, sc, ga } = F(h);
      return `
<h2>Sixty hours, ten a week</h2>
<p>North Carolina asks for more practice than most states, and caps the hours that count each week, so the log cannot be filled in a summer. Enter what is done:</p>
<!--tool:mini:hours|{"state":"NC","done":30,"night":4}-->
${h.table(['', 'North Carolina', 'Virginia', 'South Carolina', 'Georgia'], [
  ['Permit age', s.permitAgeL, va.permitAgeL, sc.permitAgeL, ga.permitAgeL],
  ['Held at least', s.holdL, va.holdL, sc.holdL, ga.holdL],
  ['Supervised hours', s.hours ?? h.nc, va.hours ?? h.nc, sc.hours ?? h.nc, ga.hours ?? h.nc],
  ['Retake wait', s.retakeL, va.retakeL, sc.retakeL, ga.retakeL],
], 'North Carolina and its neighbors.', ['l', 'r', 'r', 'r', 'r'])}
<h2>The three levels</h2>
<p><strong>Level 1.</strong> ${s.nightL.split('. Level 2')[0]}. ${s.passengersL.split('. Level 2')[0]}.</p>
<p><strong>Level 2.</strong> Unsupervised driving is allowed from 5 a.m. to 9 p.m.; one passenger under 21 outside the household, unless every young passenger lives in the same house. Phones are banned for drivers under 18.</p>
<p><strong>Level 3.</strong> The full provisional license comes after six months of Level 2 without a conviction, and the provisional label lasts until 18.</p>
<h2>Sources</h2>
<p>Fees, hours and levels are those of the ${h.os(C, 'hours', 'NCDMV graduated licensing pages')} and the North Carolina Driver Handbook. This site is independent of NCDMV.</p>`;
    },
  },
  es: {
    slug: 'examen-permiso-carolina-del-norte',
    nav: 'Carolina del Norte',
    card: 'Permiso de Nivel 1 de Carolina del Norte a los 15: educación vial, 60 horas y 7 días de espera.',
    title: 'Examen del permiso de Carolina del Norte 2026: práctica',
    description: 'Examen de práctica del permiso de Carolina del Norte, gratis y en español: preguntas explicadas, el permiso de Nivel 1 a los 15, educación vial y 60 horas.',
    h1: 'Examen de práctica del permiso de Carolina del Norte',
    intro: 'Practique para el examen de conocimientos del NCDMV y siga los tres niveles de la licencia juvenil de Carolina del Norte, con sus horas de práctica y sus horarios.',
    resume: (h) => {
      const { s } = F(h);
      return `Carolina del Norte otorga la licencia a los jóvenes en tres niveles. El Nivel 1, el permiso limitado de aprendizaje, se obtiene desde los ${s.permitAgeL} cuando el adolescente ha terminado un curso de educación vial de al menos 30 horas en el aula y 6 al volante y ha aprobado los exámenes de conocimientos, de señales y de la vista del NCDMV; cuesta ${s.permitFeeL}. Si reprueba el examen de conocimientos puede repetirlo tras 7 días naturales. El permiso se conserva ${s.holdL} y el registro debe sumar ${s.hours ?? h.nc} horas de manejo supervisado, ${s.nightHours ?? h.nc} de ellas de noche, sin contar más de diez horas por semana. El Nivel 2, la licencia provisional limitada, llega como pronto a los ${s.interAgeL} y cuesta ${s.licenseFeeL}; prohíbe manejar sin supervisión de 9 p. m. a 5 a. m., salvo para ir al trabajo o a un servicio voluntario de bomberos o rescate. Carolina del Norte no publica el número de preguntas ni la nota del examen en las páginas que leímos, así que el examen de práctica usa 20 preguntas y una meta del 80 %.`;
    },
    faqs: (h) => [
      { q: '¿El examen de señales de Carolina del Norte es aparte?', a: 'Sí. El NCDMV aplica un examen de reconocimiento de señales además del examen escrito de conocimientos y de la prueba de la vista, y hay que aprobar los tres para el permiso de Nivel 1. Practique con «Solo señales de tránsito» en el selector hasta nombrar cada forma y color sin dudar; el examen de señales es corto pero no perdona.' },
      { q: '¿Cuánto espero tras reprobar el examen del permiso en Carolina del Norte?', a: `Siete días naturales. Aproveche esa semana para hacer varias veces el examen de práctica completo y repasar cada explicación de lo que falló. La ${h.a('failed-test', 'guía para repetir el examen')} da la espera de cada estado cuando la agencia la publica.` },
      { q: '¿Puedo manejar de noche con el permiso de Nivel 1?', a: 'Durante los seis primeros meses del Nivel 1, solo de 5 a. m. a 9 p. m. y siempre con el supervisor. Pasados seis meses el aprendiz puede manejar a cualquier hora, siempre supervisado. Solo el supervisor puede ir en el asiento delantero.' },
    ],
    body: (h) => {
      const { s, va, sc, ga } = F(h);
      return `
<h2>Sesenta horas, diez por semana</h2>
<p>Carolina del Norte pide más práctica que la mayoría de los estados y limita las horas que cuentan cada semana, así que el registro no se completa en un verano. Indique lo que ya hizo:</p>
<!--tool:mini:hours|{"state":"NC","done":30,"night":4}-->
${h.table(['', 'Carolina del Norte', 'Virginia', 'Carolina del Sur', 'Georgia'], [
  ['Edad del permiso', s.permitAgeL, va.permitAgeL, sc.permitAgeL, ga.permitAgeL],
  ['Tiempo mínimo', s.holdL, va.holdL, sc.holdL, ga.holdL],
  ['Horas supervisadas', s.hours ?? h.nc, va.hours ?? h.nc, sc.hours ?? h.nc, ga.hours ?? h.nc],
], 'Carolina del Norte y sus vecinos.', ['l', 'r', 'r', 'r', 'r'])}
<h2>Los tres niveles</h2>
<p><strong>Nivel 1.</strong> Los seis primeros meses, solo de 5 a. m. a 9 p. m. y con el supervisor; nadie más que el supervisor en el asiento delantero.</p>
<p><strong>Nivel 2.</strong> Se puede manejar sin supervisión de 5 a. m. a 9 p. m.; un solo pasajero menor de 21 que no viva en la casa, salvo que todos los pasajeros jóvenes vivan en ella. El teléfono está prohibido a los menores de 18.</p>
<p><strong>Nivel 3.</strong> La licencia provisional completa llega tras seis meses de Nivel 2 sin condenas, y la etiqueta provisional dura hasta los 18 años.</p>
<h2>Fuentes</h2>
<p>Tarifas, horas y niveles son los de las ${h.os(C, 'hours', 'páginas de licencia graduada del NCDMV')} y del manual del conductor de Carolina del Norte, publicado también en español. Este sitio es independiente del NCDMV.</p>`;
    },
  },
});
