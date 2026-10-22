import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'NV';
const F = (h: Helpers) => ({ s: h.S(C), az: h.S('AZ'), ut: h.S('UT') });

export default definePage({
  id: 'state-nv',
  group: 'states',
  order: 110,
  state: C,
  tool: { kind: 'quiz', props: { type: 'car' } },
  mini: { kind: 'mini:moto', props: { state: 'NV' } },
  related: ['home', 'motorcycle', 'state-az', 'state-ca', 'state-ut', 'failed-test'],
  sources: ['handbooks', 'mutcd', 'nhtsa_moto'],
  en: {
    slug: 'nevada-permit-test',
    nav: 'Nevada',
    card: 'Nevada DMV knowledge test: 25 questions, 20 right, retest the next day for $10.',
    title: 'Nevada Permit Test 2026: Free DMV Knowledge Practice',
    description: 'Nevada permit practice test, free: 25 DMV-style questions scored at 20 correct, explained answers, the permit at 15 and a half, 50 hours and the curfew.',
    h1: 'Nevada permit practice test',
    intro: 'Twenty-five questions, five mistakes allowed: practice the Nevada knowledge test at its real length, for a car or a motorcycle.',
    resume: (h) => {
      const { s } = F(h);
      return `Nevada's knowledge test has ${s.testQ ?? h.nc} questions and you pass with ${s.need ?? h.nc} correct, ${s.pctL}, according to the Nevada DMV, which offers it in Spanish. A teen can apply for an instruction permit from ${s.permitAgeL}; the permit costs ${s.permitFeeL}, the first knowledge and skills testing fee is $25, and each retest $10. After a failure you may try again the ${s.retakeL.toLowerCase().replace(/ \(.*\)$/, '')}. The permit is held ${s.holdL} with ${s.hours ?? h.nc} hours of supervised driving, ${s.nightHours ?? h.nc} at night, and an approved driver education course is required under 18. The provisional license can then be issued at ${s.interAgeL}. Until 18, drivers may not be on the road between 10 p.m. and 5 a.m. unless going to or from a scheduled event, and in the first six months may carry no passengers under 18 outside the family. The motorcycle test has the same length and mark: ${s.motoPass ?? h.nc}.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'How much does it cost to retake the Nevada permit test?', a: `The first testing fee is $25 and covers the knowledge and skills tests; every retest costs $10. You can come back the next day. Passing the 25-question practice test with room to spare before going is the simplest way to keep the bill at ${s.permitFeeL} plus $25.` },
        { q: 'What if there is no driving school near me in Nevada?', a: 'Applicants under 18 must take a DMV-approved driver education course, in a classroom or online. When no approved school is within 30 miles and the family has no internet access, Nevada accepts 100 hours of logged supervised driving instead of the course.' },
        { q: 'Is the Nevada motorcycle test the same length?', a: `Yes: ${s.motoQ ?? 25} questions, passed with ${s.motoPass ?? '80 %'}. A motorcycle instruction permit is available from ${s.motoAge != null ? h.ageLabel(s.motoAge) : h.nc}. The motorcycle practice test on this site covers protective gear, lane position and group riding, written from NHTSA publications, and every answer is explained.` },
      ];
    },
    body: (h) => {
      const { s, az, ut } = F(h);
      return `
<h2>The motorcycle permit</h2>
<p>Nevada publishes its motorcycle test as clearly as its car test. Check any state's motorcycle rules:</p>
<!--tool:mini:moto|{"state":"NV"}-->
<h2>Nevada and its neighbors</h2>
${h.table(['', 'Nevada', 'Arizona', 'Utah'], [
  ['Permit age', s.permitAgeL, az.permitAgeL, ut.permitAgeL],
  ['Questions', s.testQ ?? h.nc, az.testQ ?? h.nc, ut.testQ ?? h.nc],
  ['Supervised hours', s.hours ?? h.nc, az.hours ?? h.nc, ut.hours ?? h.nc],
  ['Restrictions end', s.fullAgeL, az.fullAgeL, ut.fullAgeL],
], 'Nevada beside Arizona and Utah.', ['l', 'r', 'r', 'r'])}
<h2>What to study</h2>
<p>The Nevada Driver Handbook (DMV 700) is the source of the questions: signs, right of way, freeway driving, school zones, pedestrians, and the DUI rules, with a ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc} limit for drivers under 21. Nevada bans handheld phones for every driver, so there is no separate teen rule. Desert driving, heat and dust storms also appear in the safe-driving chapter.</p>
<p>Figures on this page come from the ${h.os(C, 'testQ', 'Nevada DMV')}; this site is independent of the Nevada DMV.</p>`;
    },
  },
  es: {
    slug: 'examen-permiso-nevada',
    nav: 'Nevada',
    card: 'Examen del DMV de Nevada: 25 preguntas, 20 correctas y repetir al día siguiente por $10.',
    title: 'Examen del permiso de Nevada 2026: práctica del DMV',
    description: 'Examen de práctica del permiso de Nevada, gratis y en español: 25 preguntas calificadas con 20 correctas, el permiso a los 15 y medio, 50 horas y horario.',
    h1: 'Examen de práctica del permiso de Nevada',
    intro: 'Veinticinco preguntas y cinco errores permitidos: practique el examen de conocimientos de Nevada con su duración real, para auto o para moto.',
    resume: (h) => {
      const { s } = F(h);
      return `El examen de conocimientos de Nevada tiene ${s.testQ ?? h.nc} preguntas y se aprueba con ${s.need ?? h.nc} correctas, el ${s.pctL}, según el DMV de Nevada, que lo ofrece en español. Un adolescente puede pedir el permiso de instrucción desde los ${s.permitAgeL}; el permiso cuesta ${s.permitFeeL}, la primera tarifa de exámenes teórico y práctico es de $25 y cada repetición cuesta $10. Tras un fallo puede volver al día siguiente. El permiso se conserva ${s.holdL} con ${s.hours ?? h.nc} horas de manejo supervisado, ${s.nightHours ?? h.nc} de noche, y los menores de 18 deben seguir un curso aprobado de educación vial. La licencia provisional puede emitirse a los ${s.interAgeL}. Hasta los 18 años no se maneja entre las 10 p. m. y las 5 a. m., salvo para ir o volver de una actividad programada, y en los seis primeros meses no se llevan pasajeros menores de 18 que no sean de la familia. El examen de moto tiene la misma duración y la misma nota: 20 de 25.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: '¿Cuánto cuesta repetir el examen del permiso en Nevada?', a: `La primera tarifa de examen es de $25 y cubre el teórico y el práctico; cada repetición cuesta $10. Puede volver al día siguiente. Aprobar con margen el examen de práctica de 25 preguntas antes de ir es la forma más sencilla de quedarse en ${s.permitFeeL} más $25.` },
        { q: '¿Y si no hay autoescuela cerca de mí en Nevada?', a: 'Los menores de 18 deben seguir un curso de educación vial aprobado por el DMV, en el aula o en línea. Cuando no hay escuela aprobada a menos de 30 millas y la familia no tiene internet, Nevada acepta 100 horas de manejo supervisado registradas en lugar del curso.' },
        { q: '¿El examen de moto de Nevada tiene la misma duración?', a: `Sí: ${s.motoQ ?? 25} preguntas, aprobado con 20 correctas, el 80 %. El permiso de instrucción de moto se obtiene desde los ${s.motoAge != null ? h.ageLabel(s.motoAge) : h.nc}. El examen de práctica de moto de este sitio trata el equipo de protección, la posición en el carril y el manejo en grupo, a partir de publicaciones de la NHTSA.` },
      ];
    },
    body: (h) => {
      const { s, az, ut } = F(h);
      return `
<h2>El permiso de moto</h2>
<p>Nevada publica su examen de moto con la misma claridad que el de auto. Consulte las reglas de moto de cualquier estado:</p>
<!--tool:mini:moto|{"state":"NV"}-->
<h2>Nevada y sus vecinos</h2>
${h.table(['', 'Nevada', 'Arizona', 'Utah'], [
  ['Edad del permiso', s.permitAgeL, az.permitAgeL, ut.permitAgeL],
  ['Preguntas', s.testQ ?? h.nc, az.testQ ?? h.nc, ut.testQ ?? h.nc],
  ['Horas supervisadas', s.hours ?? h.nc, az.hours ?? h.nc, ut.hours ?? h.nc],
  ['Fin de las restricciones', s.fullAgeL, az.fullAgeL, ut.fullAgeL],
], 'Nevada frente a Arizona y Utah.', ['l', 'r', 'r', 'r'])}
<h2>Qué estudiar</h2>
<p>El manual del conductor de Nevada (DMV 700) es la fuente de las preguntas: señales, derecho de paso, manejo en autopista, zonas escolares, peatones y las reglas sobre manejo bajo los efectos del alcohol, con un límite de ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc} para menores de 21. Nevada prohíbe el teléfono en la mano a todos los conductores, así que no hay regla aparte para los jóvenes. El capítulo de manejo seguro trata también el calor y las tormentas de polvo del desierto.</p>
<p>Las cifras de esta página salen del ${h.os(C, 'testQ', 'DMV de Nevada')}; este sitio es independiente del DMV de Nevada.</p>`;
    },
  },
});
