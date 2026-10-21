import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'CA';
const F = (h: Helpers) => {
  const s = h.S(C);
  const tx = h.S('TX');
  return { s, tx };
};

export default definePage({
  id: 'state-ca',
  group: 'states',
  order: 100,
  state: C,
  tool: { kind: 'quiz', props: { type: 'car' } },
  mini: { kind: 'mini:passmark' },
  related: ['home', 'permit-age', 'state-tx', 'state-ny', 'spanish', 'failed-test'],
  sources: ['handbooks', 'mutcd'],
  en: {
    slug: 'california-permit-test',
    nav: 'California',
    card: 'California DMV permit test: questions, the 80 % mark, the 3-attempt fee and the dates.',
    title: 'California Permit Test 2026: Free DMV Practice Test',
    description: 'California permit practice test, free: DMV-style questions with explained answers, scored at the 80 % pass mark, plus permit age, hours, retake and fee.',
    h1: 'California permit practice test',
    intro: 'Questions written from the California Driver Handbook and the federal sign manual, scored the way the DMV scores the minor\'s knowledge test.',
    resume: (h) => {
      const { s } = F(h);
      return `To get a California instruction permit under 18 you must be at least ${s.permitAgeL}, finish a driver education course, pass the knowledge test with at least ${s.pctL} of the answers right and pay one application fee of ${s.permitFeeL}, which also covers the first license and allows three attempts at the knowledge test within twelve months. The permit is then held ${s.holdL}, with ${s.hours ?? h.nc} hours of practice certified by a parent, ${s.nightHours ?? h.nc} of them at night, before the drive test for a provisional license at ${s.interAgeL} at the earliest. For the first twelve months of that license the night and passenger rules apply. After a failed knowledge test, a minor waits ${s.retakeL} before trying again. The practice test above uses the same scoring: one wrong answer too many and the panel turns red.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'How many questions are on the California permit test?', a: `Current DMV pages describe a multiple-choice knowledge test without a fixed count. A DMV research report gave ${s.testQ ?? h.nc} questions for applicants under 18 and fewer for adults; we use that length for the full practice test and say it is not confirmed for 2026. The pass mark the DMV states today is ${s.pctL}, so on ${s.testQ ?? 46} questions you could miss ${s.testQ ? s.testQ - Math.ceil(s.testQ * (s.testPct ?? 0.8)) : 9}.` },
        { q: 'How many times can I take the California knowledge test?', a: `The application fee of ${s.permitFeeL} covers three attempts at the knowledge test within twelve months. A minor who fails waits ${s.retakeL} before the next attempt. After the third failure, or after twelve months, a new application and a new fee are needed. The practice test at full length is a good way to know you are ready before using an attempt.` },
        { q: 'Can I take the California permit test in Spanish?', a: `${s.spanish ? 'Yes.' : 'Check with the DMV.'} The California DMV offers the knowledge test in many languages, Spanish among them, and publishes its driver handbook in Spanish. This practice test is available in Spanish with the same questions and explanations, on the Spanish version of this page.` },
        { q: 'Do I need driver education before the California permit?', a: `Under 18, yes: ${s.driversEdL}. The course comes first; driver training with an instructor follows once you hold the permit. Adults 18 and older can apply for a permit without the course, take the knowledge test and practice before the drive test.` },
      ];
    },
    body: (h) => {
      const { s, tx } = F(h);
      return `
<h2>The pass mark, in answers</h2>
<p>The DMV states the pass mark as a percentage, ${s.pctL}. In answers, that depends on the length of the test you get. The mini-tool below gives the count for any state; for California it uses the ${s.testQ ?? h.nc}-question length of the minor's test given in the DMV's research report, flagged as not confirmed by a current page.</p>
<!--tool:mini:passmark|{"state":"CA"}-->
<h2>From the permit to a full license in California</h2>
<p>The steps of the California graduated license, with the figures the DMV publishes:</p>
${h.table(['Step', 'Rule'], [
  ['Instruction permit', `from ${s.permitAgeL}, after driver education`],
  ['Practice with the permit', `${s.holdL} minimum, ${s.hours ?? h.nc} hours including ${s.nightHours ?? h.nc} at night`],
  ['Provisional license', `from ${s.interAgeL}, after the drive test`],
  ['Night limit, first 12 months', s.nightL],
  ['Passengers, first 12 months', s.passengersL],
  ['Alcohol under 21', s.u21bac != null ? `${s.u21bac.toFixed(2)} BAC` : h.nc],
], 'California graduated licensing for drivers under 18.', ['l', 'l'])}
<p>The ${h.a('permit-age', 'date calculator')} turns these rules into calendar dates from a date of birth. Compared with ${h.sl('TX')}, where the permit is possible at ${tx.permitAgeL}, California starts later but asks for the same 50-hour order of practice.</p>
<h2>What the California test asks most</h2>
<p>The handbook's chapters on signs, right of way, lane use, speed limits, alcohol and sharing the road with cyclists, motorcycles and trucks make up most of the test. California-specific rules worth reading twice: the basic speed law (never faster than is safe for conditions), the 25 mph limit near schools when children are present, the ban on any handheld phone for drivers under 18, and the "Move Over" rule for stopped emergency and service vehicles. The sign questions follow the federal MUTCD shapes and colors; choose "Road signs only" in the test selector to drill them.</p>
<h2>On the day at the DMV</h2>
<p>Bring proof of identity, of residency in California and your Social Security number, the completed application, and for a minor the signature of a parent or guardian and the driver education certificate. The vision test comes first. The knowledge test is taken on a touch screen at the field office; check on the DMV site whether an appointment is needed in your area. The rules and the fee are those published on ${h.os(C, 'permitFee', 'the DMV fee page')}; this site is independent of the DMV.</p>`;
    },
  },
  es: {
    slug: 'examen-permiso-california',
    nav: 'California',
    card: 'Examen del permiso del DMV de California: preguntas, el 80 %, tres intentos y las fechas.',
    title: 'Examen del permiso de California 2026: práctica gratis',
    description: 'Examen de práctica del permiso de California, gratis y en español: preguntas explicadas, calificadas al 80 % del DMV, con edad, horas, tarifa y espera.',
    h1: 'Examen de práctica del permiso de California',
    intro: 'Preguntas escritas a partir del manual del conductor de California y del manual federal de señales, calificadas como el DMV califica el examen teórico de los menores.',
    resume: (h) => {
      const { s } = F(h);
      return `Para obtener el permiso de aprendizaje de California siendo menor de 18 años hay que tener al menos ${s.permitAgeL}, terminar un curso de educación vial, aprobar el examen teórico con al menos el ${s.pctL} de respuestas correctas y pagar una sola tarifa de solicitud de ${s.permitFeeL}, que cubre también la primera licencia y permite tres intentos del examen teórico en doce meses. Después hay que tener el permiso ${s.holdL}, con ${s.hours ?? h.nc} horas de práctica certificadas por un padre, ${s.nightHours ?? h.nc} de ellas de noche, antes del examen de manejo para la licencia provisional, a los ${s.interAgeL} como mínimo. Durante los doce primeros meses de esa licencia se aplican las reglas de noche y de pasajeros. Tras reprobar el examen teórico, un menor espera ${h.lang === 'es' ? '7 días' : s.retakeL} antes de volver a intentarlo. El examen de práctica de arriba califica igual: un error de más y el panel se pone en rojo.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: '¿Cuántas preguntas tiene el examen del permiso de California?', a: `Las páginas actuales del DMV hablan de un examen de opción múltiple sin número fijo. Un informe de investigación del DMV indicaba ${s.testQ ?? h.nc} preguntas para menores de 18 y menos para adultos; usamos esa duración para el examen de práctica completo y advertimos que no está confirmada para 2026. La nota que el DMV indica hoy es el ${s.pctL}: con ${s.testQ ?? 46} preguntas puede fallar ${s.testQ ? s.testQ - Math.ceil(s.testQ * (s.testPct ?? 0.8)) : 9}.` },
        { q: '¿Cuántas veces puedo presentar el examen teórico en California?', a: `La tarifa de solicitud de ${s.permitFeeL} cubre tres intentos del examen teórico en doce meses. Un menor que reprueba espera 7 días antes del siguiente intento. Tras el tercer fallo, o pasados doce meses, hay que presentar una nueva solicitud y pagar de nuevo. El examen de práctica con la duración real sirve para saber si está listo antes de gastar un intento.` },
        { q: '¿Puedo presentar el examen del permiso de California en español?', a: `${s.spanish ? 'Sí.' : 'Consulte con el DMV.'} El DMV de California ofrece el examen teórico en muchos idiomas, entre ellos el español, y publica su manual del conductor en español. Este examen de práctica está completo en español, con las mismas preguntas y explicaciones que la versión en inglés.` },
        { q: '¿Necesito educación vial antes del permiso en California?', a: 'Si es menor de 18 años, sí: primero el curso de educación vial, y una vez con el permiso, las clases de manejo con un instructor antes del examen práctico. Los adultos de 18 años o más pueden pedir el permiso sin el curso, presentar el examen teórico y practicar antes del examen de manejo.' },
      ];
    },
    body: (h) => {
      const { s, tx } = F(h);
      return `
<h2>La nota para aprobar, en respuestas</h2>
<p>El DMV da la nota como porcentaje, el ${s.pctL}. En respuestas, depende de la duración del examen que le toque. La miniherramienta de abajo da la cifra para cualquier estado; para California usa las ${s.testQ ?? h.nc} preguntas del examen de menores del informe de investigación del DMV, marcadas como no confirmadas por una página actual.</p>
<!--tool:mini:passmark|{"state":"CA"}-->
<h2>Del permiso a la licencia completa en California</h2>
<p>Las etapas de la licencia graduada de California, con las cifras que publica el DMV:</p>
${h.table(['Etapa', 'Regla'], [
  ['Permiso de aprendizaje', `desde los ${s.permitAgeL}, tras la educación vial`],
  ['Práctica con el permiso', `${s.holdL} como mínimo, ${s.hours ?? h.nc} horas, ${s.nightHours ?? h.nc} de ellas de noche`],
  ['Licencia provisional', `desde los ${s.interAgeL}, tras el examen de manejo`],
  ['Noche, primeros 12 meses', 'no manejar de 11 p. m. a 5 a. m.'],
  ['Pasajeros, primeros 12 meses', 'ningún pasajero menor de 20 años sin un padre, tutor o conductor con licencia de 25 años o más'],
  ['Alcohol, menores de 21', s.u21bac != null ? `${s.u21bac.toFixed(2)} de alcohol en la sangre` : h.nc],
], 'Licencia graduada de California para menores de 18 años.', ['l', 'l'])}
<p>La ${h.a('permit-age', 'calculadora de fechas')} convierte estas reglas en fechas a partir de una fecha de nacimiento. Frente a ${h.sl('TX')}, donde el permiso es posible a los ${tx.permitAgeL}, California empieza más tarde pero pide un número de horas de práctica parecido.</p>
<h2>Lo que más pregunta el examen de California</h2>
<p>Los capítulos del manual sobre señales, derecho de paso, uso de carriles, límites de velocidad, alcohol y convivencia con ciclistas, motos y camiones forman la mayor parte del examen. Reglas propias de California que vale la pena leer dos veces: la ley básica de velocidad (nunca más rápido de lo seguro para las condiciones), el límite de 25 mph cerca de escuelas cuando hay niños, la prohibición de cualquier teléfono en la mano para menores de 18 y la regla de «Move Over» ante vehículos de emergencia o de servicio detenidos. Las preguntas de señales siguen las formas y colores del MUTCD federal; elija «Solo señales de tránsito» en el selector para repasarlas.</p>
<h2>El día en el DMV</h2>
<p>Lleve un comprobante de identidad, de residencia en California y su número de Seguro Social, la solicitud completa y, si es menor, la firma de un padre o tutor y el certificado de educación vial. Primero se hace la prueba de la vista. El examen teórico se presenta en una pantalla táctil en la oficina; consulte en el sitio del DMV si hace falta cita en su zona. Las reglas y la tarifa son las publicadas en ${h.os(C, 'permitFee', 'la página de tarifas del DMV')}; este sitio es independiente del DMV.</p>`;
    },
  },
});
