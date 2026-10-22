import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'GA';
const F = (h: Helpers) => ({ s: h.S(C), fl: h.S('FL'), sc: h.S('SC') });

export default definePage({
  id: 'state-ga',
  group: 'states',
  order: 104,
  state: C,
  tool: { kind: 'quiz', props: { type: 'car' } },
  mini: { kind: 'mini:retake', props: { state: 'GA' } },
  related: ['home', 'failed-test', 'drivers-ed', 'state-fl', 'state-nc', 'teen-restrictions'],
  sources: ['handbooks', 'mutcd', 'nhtsa_teen'],
  en: {
    slug: 'georgia-permit-test',
    nav: 'Georgia',
    card: 'Georgia DDS knowledge exam: 40 questions in two parts, 30 to pass, a $10 fee per attempt.',
    title: 'Georgia Permit Test 2026: Free DDS Knowledge Practice',
    description: 'Georgia permit practice test, free: 40 DDS-style questions scored at 30 correct, explained answers, the Class CP permit at 15, Joshua\'s Law and the curfew.',
    h1: 'Georgia permit practice test',
    intro: 'Practice the Georgia Class CP knowledge exam at its real length, then plan the year with the permit, Joshua\'s Law and the Class D license.',
    resume: (h) => {
      const { s } = F(h);
      return `Georgia's knowledge exam for the Class CP instructional permit has ${s.testQ ?? h.nc} questions and you need ${s.need ?? h.nc} correct, ${s.pctL}, according to the Department of Driver Services. A teen can take it from ${s.permitAgeL}. The ${s.permitFeeL} permit fee is paid at each attempt, and after a failure you may come back ${s.retakeL}. The permit is then held ${s.holdL} with ${s.hours ?? h.nc} hours of supervised driving, ${s.nightHours ?? h.nc} at night, before the Class D provisional license at ${s.interAgeL}. Joshua's Law adds a driver education course for anyone who wants that license at 16 or 17, and an alcohol and drug awareness program is required of every teen. With the Class D license there is no driving from midnight to 5 a.m., with no exceptions, and the first six months allow only family as passengers. The practice test above uses the same 40 questions and the 30-answer mark.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'Does the Georgia permit test have two parts?', a: 'The DDS knowledge exam covers road rules and road signs, and the department scores them as two sections, so a weak result on signs is not hidden by a good one on rules. Our practice test mixes both; use "Road signs only" in the selector to drill the sign section on its own before a full 40-question run.' },
        { q: 'How much does it cost to fail the Georgia permit test?', a: `Each attempt costs the ${s.permitFeeL} permit fee again. After a first failure you can retest the next day; after a second, ${s.retakeL.includes('7') ? 'you wait seven days' : 'the wait is longer'}. Taking a full-length practice test at home until you pass it comfortably is the cheapest way to avoid paying twice.` },
        { q: 'What is Joshua\'s Law?', a: 'Joshua\'s Law is the Georgia rule that a teen who wants a Class D license at 16 or 17 must complete an approved driver education course, 30 hours of theory and 6 hours behind the wheel with an instructor, or an approved parent-taught program. A teen who waits until 18 does not need it. The law is named after a teenager killed in a crash in 2003.' },
      ];
    },
    body: (h) => {
      const { s, fl, sc } = F(h);
      return `
<h2>If you fail: the wait and the fee</h2>
<p>Georgia is one of the few states that charges the permit fee for every attempt. The mini-tool shows the retake rule of any state; it opens on Georgia.</p>
<!--tool:mini:retake|{"state":"GA"}-->
<h2>From Class CP to Class D</h2>
${h.table(['Stage', 'Georgia', 'Florida', 'South Carolina'], [
  ['Learner permit', s.permitAgeL, fl.permitAgeL, sc.permitAgeL],
  ['Held at least', s.holdL, fl.holdL, sc.holdL],
  ['Supervised hours', s.hours ?? h.nc, fl.hours ?? h.nc, sc.hours ?? h.nc],
  ['Provisional license', s.interAgeL, fl.interAgeL, sc.interAgeL],
  ['Restrictions end', s.fullAgeL, fl.fullAgeL, sc.fullAgeL],
], 'Georgia and its southeastern neighbors.', ['l', 'r', 'r', 'r'])}
<p>The Class D year is built in three steps for passengers: ${s.passengersL.replace(/^Class D: /, '')}. The night rule is the strictest in the region: ${s.nightL.replace(/^Class D: /, '')}.</p>
<h2>What the Georgia exam stresses</h2>
<p>Expect questions on Georgia's hands-free law, on moving over for stopped emergency and utility vehicles, on the "Super Speeder" fee for very high speeds, and on the consequences of alcohol for drivers under 21. The sign section follows the MUTCD: shapes first, then colors, then symbols. The DDS also offers the test in Spanish.</p>
<h2>Sources</h2>
<p>The test length, pass mark, fees and graduated licensing rules are those published by the ${h.os(C, 'testQ', 'Georgia Department of Driver Services')} and in its driver's manual. This site is independent of the DDS.</p>`;
    },
  },
  es: {
    slug: 'examen-permiso-georgia',
    nav: 'Georgia',
    card: 'Examen de conocimientos del DDS de Georgia: 40 preguntas, 30 correctas, $10 por intento.',
    title: 'Examen del permiso de Georgia 2026: práctica del DDS',
    description: 'Examen de práctica del permiso de Georgia, gratis y en español: 40 preguntas con 30 correctas, el permiso Clase CP a los 15, la ley Joshua y el horario.',
    h1: 'Examen de práctica del permiso de Georgia',
    intro: 'Practique el examen de conocimientos del permiso Clase CP de Georgia con su duración real y planifique el año con el permiso, la ley Joshua y la licencia Clase D.',
    resume: (h) => {
      const { s } = F(h);
      return `El examen de conocimientos del permiso de instrucción Clase CP de Georgia tiene ${s.testQ ?? h.nc} preguntas y hacen falta ${s.need ?? h.nc} correctas, el ${s.pctL}, según el Departamento de Servicios al Conductor (DDS). Un adolescente puede presentarlo desde los ${s.permitAgeL}. La tarifa de ${s.permitFeeL} se paga en cada intento, y tras reprobar puede volver al día siguiente, o a los siete días después de un segundo fallo. Después hay que tener el permiso ${s.holdL} con ${s.hours ?? h.nc} horas de manejo supervisado, ${s.nightHours ?? h.nc} de noche, antes de la licencia provisional Clase D a los ${s.interAgeL}. La ley Joshua exige un curso de educación vial a quien quiera esa licencia a los 16 o 17 años, y todo adolescente debe completar un programa sobre alcohol y drogas. Con la licencia Clase D no se maneja de medianoche a 5 a. m., sin excepciones, y los primeros seis meses solo se admiten pasajeros de la familia. El examen de práctica usa las mismas 40 preguntas y la nota de 30.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: '¿El examen del permiso de Georgia tiene dos partes?', a: 'El examen del DDS cubre reglas de tránsito y señales, y el departamento califica las dos secciones por separado, así que un mal resultado en señales no se compensa con uno bueno en reglas. Nuestro examen mezcla ambas; use «Solo señales de tránsito» en el selector para repasar esa sección antes de un examen completo de 40 preguntas.' },
        { q: '¿Cuánto cuesta reprobar el examen del permiso en Georgia?', a: `Cada intento cuesta de nuevo la tarifa de ${s.permitFeeL}. Tras un primer fallo puede volver al día siguiente; tras un segundo, espera siete días. Hacer en casa el examen de práctica completo hasta aprobarlo con margen es la forma más barata de no pagar dos veces.` },
        { q: '¿Qué es la ley Joshua?', a: 'La ley Joshua es la regla de Georgia según la cual un adolescente que quiere la licencia Clase D a los 16 o 17 años debe completar un curso aprobado de educación vial, 30 horas de teoría y 6 horas al volante con un instructor, o un programa aprobado impartido por los padres. Quien espera a los 18 no lo necesita. Lleva el nombre de un joven fallecido en un choque en 2003.' },
      ];
    },
    body: (h) => {
      const { s, fl, sc } = F(h);
      return `
<h2>Si reprueba: la espera y la tarifa</h2>
<p>Georgia es uno de los pocos estados que cobra la tarifa del permiso en cada intento. La miniherramienta muestra la regla para repetir en cualquier estado; se abre con Georgia.</p>
<!--tool:mini:retake|{"state":"GA"}-->
<h2>De la Clase CP a la Clase D</h2>
${h.table(['Etapa', 'Georgia', 'Florida', 'Carolina del Sur'], [
  ['Permiso de aprendizaje', s.permitAgeL, fl.permitAgeL, sc.permitAgeL],
  ['Tiempo mínimo', s.holdL, fl.holdL, sc.holdL],
  ['Horas supervisadas', s.hours ?? h.nc, fl.hours ?? h.nc, sc.hours ?? h.nc],
  ['Licencia provisional', s.interAgeL, fl.interAgeL, sc.interAgeL],
  ['Fin de las restricciones', s.fullAgeL, fl.fullAgeL, sc.fullAgeL],
], 'Georgia y sus vecinos del sureste.', ['l', 'r', 'r', 'r'])}
<p>El año con licencia Clase D tiene tres escalones para los pasajeros: los seis primeros meses, solo familia directa; los seis siguientes, un pasajero menor de 21 que no sea de la familia; después de un año, hasta tres. La regla nocturna es la más estricta de la región: nada de manejar de medianoche a 5 a. m., sin excepción.</p>
<h2>Lo que destaca el examen de Georgia</h2>
<p>Espere preguntas sobre la ley de manos libres de Georgia, sobre cambiar de carril ante vehículos de emergencia o de servicios detenidos, sobre el cargo «Super Speeder» por velocidades muy altas y sobre las consecuencias del alcohol para menores de 21. La sección de señales sigue el MUTCD: primero formas, luego colores y después símbolos. El DDS ofrece el examen en español.</p>
<h2>Fuentes</h2>
<p>La duración, la nota, las tarifas y las reglas de la licencia graduada son las que publica el ${h.os(C, 'testQ', 'Departamento de Servicios al Conductor de Georgia')} y su manual. Este sitio es independiente del DDS.</p>`;
    },
  },
});
