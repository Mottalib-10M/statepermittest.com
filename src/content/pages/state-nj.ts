import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'NJ';
const F = (h: Helpers) => ({ s: h.S(C), ny: h.S('NY'), pa: h.S('PA') });

export default definePage({
  id: 'state-nj',
  group: 'states',
  order: 108,
  state: C,
  tool: { kind: 'quiz', props: { type: 'car' } },
  mini: { kind: 'mini:bac', props: { state: 'NJ' } },
  related: ['home', 'how-many-questions', 'teen-restrictions', 'state-ny', 'state-pa', 'fees'],
  sources: ['handbooks', 'mutcd', 'nhtsa_alcohol'],
  en: {
    slug: 'new-jersey-permit-test',
    nav: 'New Jersey',
    card: 'NJ MVC knowledge test: 50 questions, 40 right, red decals and a probationary year until 18.',
    title: 'New Jersey Permit Test 2026: Free MVC Practice Test',
    description: 'New Jersey permit practice test, free: 50 MVC-style questions scored at 40 correct, explained answers, the special learner permit at 16 and red decals.',
    h1: 'New Jersey permit practice test',
    intro: 'Fifty questions, forty right: the New Jersey knowledge test at its real length, and the two routes to a probationary license.',
    resume: (h) => {
      const { s } = F(h);
      return `The New Jersey knowledge test has ${s.testQ ?? h.nc} multiple-choice questions and you need ${s.need ?? h.nc} right, ${s.pctL}, according to the Motor Vehicle Commission. There are two routes. At ${s.permitAgeL}, a teen enrolled in a behind-the-wheel course with a licensed driving school gets a special learner permit; at 17, an examination permit can be had without the course. Either permit is held at least ${s.holdL}, with ${s.hours ?? h.nc} hours of supervised practice, ${s.nightHours ?? h.nc} of them at night, before the probationary license, which comes at ${s.interAgeL} at the earliest and lasts a year. Permit and probationary drivers under 21 display two red decals on the plates, may not drive between 11:01 p.m. and 5 a.m. except for work or religion, may carry dependents plus one other passenger unless a parent is aboard, and may not use any phone, even hands-free. The permit costs ${s.permitFeeL} and the basic license ${s.licenseFeeL}.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'Why does New Jersey make teens show red decals?', a: 'Drivers under 21 with a permit or probationary license must display two reflective red decals, one on each license plate, so police can check the graduated license rules. The decals are sold by the MVC for a few dollars a pair. Driving without them is a traffic offense for a new driver.' },
        { q: 'What is the New Jersey alcohol limit for drivers under 21?', a: `${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc}. New Jersey applies a limit of 0.01 for drivers under 21, which a single drink can reach, against 0.08 for adults. The knowledge test asks about it, and so does our practice test: the mini-tool above compares the limit of any state.` },
        { q: 'Can I get a New Jersey permit at 16 without driving school?', a: 'No. At 16 only the special learner permit exists, and it requires enrollment in a behind-the-wheel course with a licensed driving school, which issues the permit paperwork after the first lesson. Without the course, the examination permit route starts at 17.' },
      ];
    },
    body: (h) => {
      const { s, ny, pa } = F(h);
      return `
<h2>Alcohol: the strictest line</h2>
<p>New Jersey's limit for drivers under 21 is lower than in most states. Check any state with the mini-tool:</p>
<!--tool:mini:bac|{"state":"NJ"}-->
<h2>New Jersey, New York, Pennsylvania</h2>
${h.table(['', 'New Jersey', 'New York', 'Pennsylvania'], [
  ['Questions', s.testQ ?? h.nc, ny.testQ ?? h.nc, pa.testQ ?? h.nc],
  ['Correct needed', s.need ?? h.nc, ny.need ?? h.nc, pa.need ?? h.nc],
  ['Permit fee', s.permitFeeL, ny.permitFeeL, pa.permitFeeL],
  ['Provisional stage from', s.interAgeL, ny.interAgeL, pa.interAgeL],
], 'Permit tests of the three neighboring states.', ['l', 'r', 'r', 'r'])}
<p>New Jersey's test is the longest of the three, and its probationary license comes latest, at 17.</p>
<h2>What to study</h2>
<p>The questions come from the New Jersey Driver Manual: signs and markings, jughandle turns on state highways, the move-over law, school bus and pedestrian rules, alcohol and drugs, and the GDL rules themselves, which the MVC likes to test. Since the test is long, a run of full 50-question practice tests is the best preparation; the MVC also gives it in Spanish.</p>
<p>Rules and fees on this page come from the ${h.os(C, 'testQ', 'New Jersey MVC')} and its driver manual; this site is independent of the MVC.</p>`;
    },
  },
  es: {
    slug: 'examen-permiso-nueva-jersey',
    nav: 'Nueva Jersey',
    card: 'Examen de la MVC de Nueva Jersey: 50 preguntas, 40 correctas, calcomanías rojas y un año probatorio.',
    title: 'Examen del permiso de Nueva Jersey 2026: práctica gratis',
    description: 'Examen de práctica del permiso de Nueva Jersey, gratis y en español: 50 preguntas con 40 correctas, el permiso especial a los 16 y las calcomanías rojas.',
    h1: 'Examen de práctica del permiso de Nueva Jersey',
    intro: 'Cincuenta preguntas y cuarenta aciertos: el examen de conocimientos de Nueva Jersey con su duración real, y los dos caminos hacia la licencia probatoria.',
    resume: (h) => {
      const { s } = F(h);
      return `El examen de conocimientos de Nueva Jersey tiene ${s.testQ ?? h.nc} preguntas de opción múltiple y hacen falta ${s.need ?? h.nc} correctas, el ${s.pctL}, según la Comisión de Vehículos Motorizados (MVC). Hay dos caminos. A los ${s.permitAgeL}, un joven inscrito en un curso práctico con una autoescuela con licencia obtiene el permiso especial de aprendiz; a los 17 se puede pedir el permiso de examen sin curso. Cualquiera de los dos se conserva al menos ${s.holdL}, con ${s.hours ?? h.nc} horas de práctica supervisada, ${s.nightHours ?? h.nc} de ellas de noche, antes de la licencia probatoria, que llega como pronto a los ${s.interAgeL} y dura un año. Los conductores con permiso o licencia probatoria menores de 21 llevan dos calcomanías rojas en las placas, no pueden manejar entre las 11:01 p. m. y las 5 a. m. salvo por trabajo o religión, pueden llevar a sus dependientes y a un pasajero más si no va un padre, y no pueden usar ningún teléfono, ni siquiera con manos libres. El permiso cuesta ${s.permitFeeL} y la licencia básica ${s.licenseFeeL}.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: '¿Por qué Nueva Jersey obliga a los jóvenes a llevar calcomanías rojas?', a: 'Los conductores menores de 21 con permiso o licencia probatoria deben colocar dos calcomanías rojas reflectantes, una en cada placa, para que la policía pueda verificar las reglas de la licencia graduada. La MVC las vende por unos pocos dólares el par. Manejar sin ellas es una infracción de tránsito para un conductor nuevo.' },
        { q: '¿Cuál es el límite de alcohol para menores de 21 en Nueva Jersey?', a: `${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc}. Nueva Jersey aplica un límite de 0.01 a los menores de 21, que una sola bebida puede alcanzar, frente a 0.08 para los adultos. El examen teórico lo pregunta, y nuestro examen de práctica también; la miniherramienta compara el límite de cualquier estado.` },
        { q: '¿Puedo sacar el permiso de Nueva Jersey a los 16 sin autoescuela?', a: 'No. A los 16 solo existe el permiso especial de aprendiz, que exige inscribirse en un curso práctico con una autoescuela con licencia; la escuela tramita el permiso tras la primera clase. Sin curso, el camino del permiso de examen empieza a los 17 años.' },
      ];
    },
    body: (h) => {
      const { s, ny, pa } = F(h);
      return `
<h2>Alcohol: la línea más estricta</h2>
<p>El límite de Nueva Jersey para menores de 21 es más bajo que en la mayoría de los estados. Compruebe cualquier estado con la miniherramienta:</p>
<!--tool:mini:bac|{"state":"NJ"}-->
<h2>Nueva Jersey, Nueva York y Pensilvania</h2>
${h.table(['', 'Nueva Jersey', 'Nueva York', 'Pensilvania'], [
  ['Preguntas', s.testQ ?? h.nc, ny.testQ ?? h.nc, pa.testQ ?? h.nc],
  ['Correctas necesarias', s.need ?? h.nc, ny.need ?? h.nc, pa.need ?? h.nc],
  ['Tarifa del permiso', s.permitFeeL, ny.permitFeeL, pa.permitFeeL],
  ['Etapa provisional desde', s.interAgeL, ny.interAgeL, pa.interAgeL],
], 'Exámenes del permiso de los tres estados vecinos.', ['l', 'r', 'r', 'r'])}
<p>El examen de Nueva Jersey es el más largo de los tres, y su licencia probatoria llega más tarde, a los 17.</p>
<h2>Qué estudiar</h2>
<p>Las preguntas salen del manual del conductor de Nueva Jersey: señales y marcas, los giros «jughandle» de las carreteras estatales, la ley de cambiar de carril ante vehículos detenidos, las reglas de autobuses escolares y peatones, el alcohol y las drogas, y las propias reglas de la licencia graduada, que la MVC suele preguntar. Como el examen es largo, lo mejor es hacer varios exámenes completos de 50 preguntas; la MVC también lo ofrece en español.</p>
<p>Las reglas y tarifas de esta página salen de la ${h.os(C, 'testQ', 'MVC de Nueva Jersey')} y de su manual; este sitio es independiente de la MVC.</p>`;
    },
  },
});
