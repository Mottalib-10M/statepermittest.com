import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'NY';
const F = (h: Helpers) => ({ s: h.S(C), nj: h.S('NJ'), pa: h.S('PA') });

export default definePage({
  id: 'state-ny',
  group: 'states',
  order: 103,
  state: C,
  tool: { kind: 'quiz', props: { type: 'car' } },
  mini: { kind: 'mini:compare', props: { state: 'NY', b: 'NJ' } },
  related: ['home', 'how-many-questions', 'state-nj', 'state-pa', 'motorcycle', 'teen-restrictions'],
  sources: ['handbooks', 'mutcd', 'nhtsa_moto'],
  en: {
    slug: 'new-york-permit-test',
    nav: 'New York',
    card: 'NY DMV written test: 20 questions, 14 right including 2 of 4 sign questions, permit at 16.',
    title: 'NY Permit Practice Test 2026: Free 20-Question DMV Test',
    description: 'New York permit practice test, free: 20 DMV-style questions scored at 14 correct, with explained answers, the junior permit at 16, 50 hours and the curfews.',
    h1: 'New York permit practice test',
    intro: 'Twenty questions, fourteen to get right: practice the New York written test at its real length, then see how the junior license works upstate and in the city.',
    resume: (h) => {
      const { s } = F(h);
      return `The New York written test for a learner permit has ${s.testQ ?? h.nc} multiple-choice questions and you pass with ${s.need ?? h.nc} correct, ${s.pctL}; the DMV also requires at least two right answers out of the four questions on road signs, so a strong score elsewhere cannot make up for missing the signs. The junior learner permit is available from ${s.permitAgeL}. It must be held ${s.holdL} before the road test, with ${s.hours ?? h.nc} hours of supervised practice, ${s.nightHours ?? h.nc} of them after sunset, and a 5-hour pre-licensing course. The junior license can then come at ${s.interAgeL} at the earliest. One fee, ${s.permitFeeL} outside the New York City area at age 16 and more inside it, covers the permit, the tests and the first license. Night rules differ by region: in the five boroughs of New York City, junior drivers may not drive at all from 9 p.m. to 5 a.m. The practice test above uses the same 20-question length and the 14-answer mark.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'What is the rule about sign questions on the NY permit test?', a: `Of the ${s.testQ ?? 20} questions, four are about road signs, and you must answer at least two of those correctly as well as reaching ${s.need ?? 14} correct overall. Someone who answers 16 questions right but misses three sign questions fails. Run the "Road signs only" test from the selector until shapes and colors are automatic.` },
        { q: 'What does the New York permit fee pay for?', a: `New York charges one fee when you apply for the permit, ${s.permitFeeL} for a 16-year-old outside the New York City commuter district. It covers the learner permit, the written test, the road test and the first photo license, so there is no separate license fee later. The amount depends on age at application and is higher inside the commuter district.` },
        { q: 'When do NYC junior drivers have to be off the road?', a: 'In the five boroughs of New York City, holders of a junior permit or junior license may not drive between 9 p.m. and 5 a.m. at all, and during the day only with a qualified supervising driver for permit holders. Long Island and upstate rules allow more, with conditions for trips to work or school. Check the region where you will drive.' },
        { q: 'How do I get a full New York license at 17?', a: `A junior licensee who completes an approved high school or college driver education course can get a senior license at 17; without it, the junior license becomes a senior license at 18. The course also counts toward the pre-licensing requirement. The ${h.a('drivers-ed', 'driver education guide')} compares this with other states.` },
      ];
    },
    body: (h) => {
      const { s, nj, pa } = F(h);
      return `
<h2>New York beside its neighbors</h2>
<p>New York, ${h.sl('NJ')} and ${h.sl('PA')} all start teens at 16, but the tests and paths differ. Compare any two states with the mini-tool, which opens on New York and New Jersey:</p>
<!--tool:mini:compare|{"state":"NY","b":"NJ"}-->
${h.table(['', 'New York', 'New Jersey', 'Pennsylvania'], [
  ['Questions on the written test', s.testQ ?? h.nc, nj.testQ ?? h.nc, pa.testQ ?? h.nc],
  ['Correct answers needed', s.need ?? h.nc, nj.need ?? h.nc, pa.need ?? h.nc],
  ['Supervised hours', s.hours ?? h.nc, nj.hours ?? h.nc, pa.hours ?? h.nc],
  ['Permit fee', s.permitFeeL, nj.permitFeeL, pa.permitFeeL],
], 'Learner permit test in the three states of the New York area.', ['l', 'r', 'r', 'r'])}
<h2>The night rules by region</h2>
<p>${s.nightL}</p>
<p>Passengers: ${s.passengersL} Phones: New York bans handheld use for every driver, not only teens, which is why the state has no separate teen phone rule in our table.</p>
<h2>Motorcycle permit in New York</h2>
<p>A motorcycle learner permit is available from ${s.motoAge != null ? h.ageLabel(s.motoAge) : h.nc}. Its written test has ${s.motoQ ?? h.nc} questions; the pass rule is ${s.motoPass ?? h.nc}. The ${h.a('motorcycle', 'motorcycle practice test')} covers gear, lane position and riding in a group.</p>
<h2>Where the figures come from</h2>
<p>The test length, the sign rule, the hours and the fee are those of the ${h.os(C, 'testQ', 'New York Driver\'s Manual (MV-21)')} and of the DMV pages cited below. The fee varies by age at application and by region; the figure shown is the one the DMV gives for a 16-year-old outside the Metropolitan Commuter Transportation District. This site is independent of the New York State DMV.</p>`;
    },
  },
  es: {
    slug: 'examen-permiso-nueva-york',
    nav: 'Nueva York',
    card: 'Examen escrito del DMV de Nueva York: 20 preguntas, 14 correctas con 2 de 4 de señales.',
    title: 'Examen del permiso de Nueva York 2026: práctica gratis',
    description: 'Examen de práctica del permiso de Nueva York, gratis y en español: 20 preguntas con 14 correctas, el permiso a los 16 años, las 50 horas y los horarios.',
    h1: 'Examen de práctica del permiso de Nueva York',
    intro: 'Veinte preguntas y catorce aciertos: practique el examen escrito de Nueva York con su duración real y vea cómo funciona la licencia junior en la ciudad y en el resto del estado.',
    resume: (h) => {
      const { s } = F(h);
      return `El examen escrito para el permiso de aprendizaje de Nueva York tiene ${s.testQ ?? h.nc} preguntas de opción múltiple y se aprueba con ${s.need ?? h.nc} correctas, el ${s.pctL}; el DMV exige además acertar al menos dos de las cuatro preguntas sobre señales de tránsito, así que un buen resultado en el resto no compensa fallar las señales. El permiso junior se obtiene desde los ${s.permitAgeL}. Hay que tenerlo ${s.holdL} antes del examen de manejo, con ${s.hours ?? h.nc} horas de práctica supervisada, ${s.nightHours ?? h.nc} de ellas después de la puesta del sol, y un curso de 5 horas previo a la licencia. La licencia junior llega como pronto a los ${s.interAgeL}. Una sola tarifa, ${s.permitFeeL} fuera del área de la ciudad de Nueva York a los 16 años y algo más dentro de ella, cubre el permiso, los exámenes y la primera licencia. Los horarios cambian según la región: en los cinco condados de la ciudad, los conductores junior no pueden manejar de 9 p. m. a 5 a. m. El examen de práctica usa las mismas 20 preguntas y la nota de 14 aciertos.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: '¿Qué regla hay sobre las señales en el examen de Nueva York?', a: `De las ${s.testQ ?? 20} preguntas, cuatro tratan de señales de tránsito, y debe acertar al menos dos de ellas además de llegar a ${s.need ?? 14} correctas en total. Quien acierta 16 preguntas pero falla tres de señales reprueba. Practique con «Solo señales de tránsito» en el selector hasta reconocer formas y colores sin pensar.` },
        { q: '¿Qué cubre la tarifa del permiso de Nueva York?', a: `Nueva York cobra una sola tarifa al solicitar el permiso, ${s.permitFeeL} para un joven de 16 años fuera del distrito de transporte de la ciudad de Nueva York. Cubre el permiso de aprendizaje, el examen escrito, el examen de manejo y la primera licencia con foto, así que no hay tarifa de licencia aparte. El monto depende de la edad al solicitar y es mayor dentro de ese distrito.` },
        { q: '¿A qué hora deben dejar de manejar los conductores junior en la ciudad?', a: 'En los cinco condados de la ciudad de Nueva York, quien tiene permiso o licencia junior no puede manejar entre las 9 p. m. y las 5 a. m., y de día solo con un supervisor calificado si tiene permiso. En Long Island y en el resto del estado las reglas permiten más, con condiciones para ir al trabajo o a la escuela. Revise la región donde va a manejar.' },
        { q: '¿Cómo obtengo la licencia completa de Nueva York a los 17?', a: `Quien tiene licencia junior y termina un curso aprobado de educación vial de secundaria o universidad puede obtener la licencia senior a los 17; sin él, la licencia junior pasa a senior a los 18. El curso cuenta también para el requisito previo a la licencia. La ${h.a('drivers-ed', 'guía de educación vial')} lo compara con otros estados.` },
      ];
    },
    body: (h) => {
      const { s, nj, pa } = F(h);
      return `
<h2>Nueva York frente a sus vecinos</h2>
<p>Nueva York, ${h.sl('NJ')} y ${h.sl('PA')} empiezan a los 16 años, pero sus exámenes y caminos son distintos. Compare dos estados con la miniherramienta, que se abre con Nueva York y Nueva Jersey:</p>
<!--tool:mini:compare|{"state":"NY","b":"NJ"}-->
${h.table(['', 'Nueva York', 'Nueva Jersey', 'Pensilvania'], [
  ['Preguntas del examen escrito', s.testQ ?? h.nc, nj.testQ ?? h.nc, pa.testQ ?? h.nc],
  ['Respuestas correctas necesarias', s.need ?? h.nc, nj.need ?? h.nc, pa.need ?? h.nc],
  ['Horas supervisadas', s.hours ?? h.nc, nj.hours ?? h.nc, pa.hours ?? h.nc],
  ['Tarifa del permiso', s.permitFeeL, nj.permitFeeL, pa.permitFeeL],
], 'Examen del permiso en los tres estados del área de Nueva York.', ['l', 'r', 'r', 'r'])}
<h2>Los horarios por región</h2>
<p>Ciudad de Nueva York (cinco condados): ningún manejo de 9 p. m. a 5 a. m. con permiso o licencia junior. Long Island: de 9 p. m. a 5 a. m. solo directamente entre la casa y el trabajo, la universidad o un curso de manejo. Resto del estado: de 9 p. m. a 5 a. m. solo entre la casa y el trabajo o la escuela, o con un padre o tutor.</p>
<p>Pasajeros: con licencia junior, no más de un pasajero menor de 21 años que no sea de la familia; con permiso junior, además, solo el supervisor puede ir delante. Teléfono: Nueva York prohíbe el teléfono en la mano a todos los conductores, no solo a los jóvenes.</p>
<h2>Permiso de motocicleta en Nueva York</h2>
<p>El permiso de aprendiz de moto se obtiene desde los ${s.motoAge != null ? h.ageLabel(s.motoAge) : h.nc}. Su examen escrito tiene ${s.motoQ ?? h.nc} preguntas y se aprueba con 14 de 20, incluidas 2 de las 4 de señales. El ${h.a('motorcycle', 'examen de práctica de moto')} cubre el equipo, la posición en el carril y el manejo en grupo.</p>
<h2>De dónde salen las cifras</h2>
<p>La duración del examen, la regla de las señales, las horas y la tarifa son las del ${h.os(C, 'testQ', 'manual del conductor de Nueva York (MV-21)')} y de las páginas del DMV citadas abajo. La tarifa cambia según la edad al solicitar y la región; la cifra mostrada es la que da el DMV para un joven de 16 años fuera del distrito de transporte metropolitano. Este sitio es independiente del DMV del estado de Nueva York.</p>`;
    },
  },
});
