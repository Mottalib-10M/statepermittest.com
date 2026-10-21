import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'TX';
const F = (h: Helpers) => ({ s: h.S(C), ca: h.S('CA'), fl: h.S('FL') });

export default definePage({
  id: 'state-tx',
  group: 'states',
  order: 101,
  state: C,
  tool: { kind: 'quiz', props: { type: 'car' } },
  mini: { kind: 'mini:permitage' },
  related: ['home', 'permit-age', 'drivers-ed', 'state-ca', 'state-fl', 'teen-restrictions'],
  sources: ['handbooks', 'mutcd', 'nhtsa_alcohol'],
  en: {
    slug: 'texas-permit-test',
    nav: 'Texas',
    card: 'Texas learner license: driver ed first, $15 fees, 30 hours and zero alcohol under 21.',
    title: 'Texas Permit Test 2026: Free Learner License Practice',
    description: 'Texas permit practice test, free: learner license questions with explained answers, plus the age of 15, driver ed, 30 practice hours, $15 fees and limits.',
    h1: 'Texas permit practice test',
    intro: 'Practice for the Texas learner license knowledge exam, then see what driver education, the hour log and the provisional license involve before 18.',
    resume: (h) => {
      const { s } = F(h);
      return `In Texas the first step is not the test but driver education: everyone under 25 must complete an approved course, and teens follow 24 hours of classroom and 44 hours in the car, at school, with a licensed provider or in a parent-taught program. A teen can hold a learner license from ${s.permitAgeL}, keep it at least ${s.holdL} and log ${s.hours ?? h.nc} hours of supervised driving, ${s.nightHours ?? h.nc} of them at night, before a provisional license at ${s.interAgeL}. The state charges ${s.permitFeeL} for the learner license and ${s.licenseFeeL} for the provisional one, under Transportation Code 521.421. Until 18, a provisional driver may not drive between midnight and 5 a.m. except for work, school or a medical emergency, may carry only one passenger under 21 outside the family, and may not use a wireless device. Texas does not let a driver under 21 drive with any detectable alcohol. The Department of Public Safety offers the knowledge test in English and Spanish; its number of questions and pass mark are not stated on the pages we could read, so the practice test uses 20 questions and an 80 % target.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'Can I take the Texas knowledge test during driver education?', a: 'Yes. Many approved Texas driver education courses, including parent-taught programs, give the knowledge exam as part of the classroom phase, and the course provider reports the result. A teen who did not take it in the course takes it at a driver license office before the learner license is issued. Either way, the learner license follows the course, not the other way round.' },
        { q: 'How much does a Texas learner license cost?', a: `The state fee is ${s.permitFeeL} for the learner license, and the provisional license that follows costs ${s.licenseFeeL}, both set by section 521.421 of the Transportation Code. Driver education is a separate cost charged by the school or the parent-taught program provider. The date calculator above adds the two state fees to the dates of each stage.` },
        { q: 'Is the Texas permit test available in Spanish?', a: 'Yes. The Department of Public Safety offers the driver license knowledge test in English or Spanish, and it requires that applicants understand road signs written in English. The practice test on this site has a full Spanish version with the same questions and explanations, so you can study in the language you will test in.' },
        { q: 'What happens if a Texas teen drives after midnight?', a: `A provisional license holder under 18 may not drive between midnight and 5 a.m. unless the trip is for work, a school-related activity or a medical emergency. ${s.phoneBan ? 'The same drivers may not use a wireless communication device while driving, even hands-free, except in an emergency.' : ''} A violation can delay the move to a full license.` },
      ];
    },
    body: (h) => {
      const { s, ca, fl } = F(h);
      return `
<h2>Driver education comes first</h2>
<p>Texas is one of the states where driver education is not optional for a teen: the course is the gate to the learner license. It has a classroom phase and an in-car phase, and can be followed at a public school, a licensed driving school or through a parent-taught program registered with the state. Adults from 18 to 24 take a shorter 6-hour course. The knowledge exam is often given inside the course, which is why many Texas teens never sit it at a DPS office.</p>
<h2>Your Texas dates</h2>
<p>The mini-tool gives the permit date from your age; the ${h.a('permit-age', 'full date calculator')} adds the provisional date, the hours and the fees from a date of birth.</p>
<!--tool:mini:permitage|{"state":"TX","age":14.5}-->
${h.table(['Stage', 'Texas', 'California', 'Florida'], [
  ['Learner license', s.permitAgeL, ca.permitAgeL, fl.permitAgeL],
  ['Time with it', s.holdL, ca.holdL, fl.holdL],
  ['Supervised hours', s.hours ?? h.nc, ca.hours ?? h.nc, fl.hours ?? h.nc],
  ['Provisional license', s.interAgeL, ca.interAgeL, fl.interAgeL],
  ['Restrictions end', s.fullAgeL, ca.fullAgeL, fl.fullAgeL],
], 'Texas compared with the two other largest states.', ['l', 'r', 'r', 'r'])}
<p>Texas asks for fewer hours than ${h.sl('CA')} or ${h.sl('FL')}, but its provisional limits last until 18 rather than for a fixed first year.</p>
<h2>What to study for the Texas exam</h2>
<p>The exam covers Texas traffic law and road signs. Points that come up in Texas more than elsewhere: the rule to move over or slow down for stopped emergency, tow and highway maintenance vehicles; the ban on handheld phones in active school zones; frontage roads and U-turn lanes at freeway interchanges; and the zero-tolerance alcohol rule for minors, under which any detectable amount is an offense for a driver under 21. Sign questions follow the national MUTCD shapes and colors, so the "Road signs only" test in the selector is a quick way to cover them.</p>
<h2>Test length and pass mark</h2>
<p>We did not find the number of questions or the pass mark on a Department of Public Safety page we could read, and we do not copy the figures that commercial sites give for Texas, which disagree with each other. The practice test therefore runs 20 questions with an 80 % target, and says so in its score panel. When DPS publishes the figures where we can read them, the test will switch to the official length and mark by itself. Rules and fees on this page come from ${h.os(C, 'permitAge', 'the Texas statutes')} and the agency pages cited below; this site is not affiliated with DPS.</p>`;
    },
  },
  es: {
    slug: 'examen-permiso-texas',
    nav: 'Texas',
    card: 'Licencia de aprendiz en Texas: educación vial primero, tarifas de $15, 30 horas y alcohol cero.',
    title: 'Examen del permiso de Texas 2026: práctica gratuita',
    description: 'Examen de práctica del permiso de Texas, gratis y en español: preguntas explicadas, la edad de 15 años, la educación vial, las 30 horas y las tarifas.',
    h1: 'Examen de práctica del permiso de Texas',
    intro: 'Practique para el examen teórico de la licencia de aprendiz de Texas y vea qué exigen la educación vial, el registro de horas y la licencia provisional antes de los 18.',
    resume: (h) => {
      const { s } = F(h);
      return `En Texas el primer paso no es el examen sino la educación vial: toda persona menor de 25 años debe terminar un curso aprobado, y los adolescentes siguen 24 horas de clase y 44 horas en el vehículo, en la escuela, con un proveedor o en un programa impartido por los padres. Un adolescente puede tener la licencia de aprendiz desde los ${s.permitAgeL}, debe conservarla al menos ${s.holdL} y registrar ${s.hours ?? h.nc} horas de manejo supervisado, ${s.nightHours ?? h.nc} de ellas de noche, antes de la licencia provisional a los ${s.interAgeL}. El estado cobra ${s.permitFeeL} por la licencia de aprendiz y ${s.licenseFeeL} por la provisional, según la sección 521.421 del Código de Transporte. Hasta los 18 años, un conductor provisional no puede manejar entre la medianoche y las 5 a. m. salvo por trabajo, escuela o emergencia médica, solo puede llevar un pasajero menor de 21 que no sea de la familia y no puede usar un dispositivo inalámbrico. Texas no permite manejar con ninguna cantidad de alcohol a los menores de 21. El Departamento de Seguridad Pública ofrece el examen teórico en inglés y en español; el número de preguntas y la nota no figuran en las páginas que pudimos leer, así que el examen de práctica usa 20 preguntas y una meta del 80 %.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: '¿Puedo presentar el examen teórico de Texas durante la educación vial?', a: 'Sí. Muchos cursos aprobados de educación vial en Texas, incluidos los programas impartidos por los padres, aplican el examen de conocimientos durante la parte teórica, y el proveedor informa el resultado. Quien no lo presentó en el curso lo presenta en una oficina de licencias antes de recibir la licencia de aprendiz. En ambos casos, la licencia llega después del curso.' },
        { q: '¿Cuánto cuesta la licencia de aprendiz en Texas?', a: `La tarifa del estado es de ${s.permitFeeL} por la licencia de aprendiz, y la licencia provisional que sigue cuesta ${s.licenseFeeL}, ambas fijadas por la sección 521.421 del Código de Transporte. La educación vial es un costo aparte que cobra la escuela o el proveedor del programa para padres. La calculadora de fechas suma las dos tarifas del estado.` },
        { q: '¿El examen del permiso de Texas está en español?', a: 'Sí. El Departamento de Seguridad Pública ofrece el examen de conocimientos en inglés o en español, y exige entender las señales de tránsito escritas en inglés. El examen de práctica de este sitio está completo en español, con las mismas preguntas y explicaciones, para que estudie en el idioma en que lo presentará.' },
        { q: '¿Qué pasa si un adolescente de Texas maneja después de medianoche?', a: 'Un titular de licencia provisional menor de 18 años no puede manejar entre la medianoche y las 5 a. m., salvo para ir al trabajo, a una actividad escolar o por una emergencia médica. Tampoco puede usar un dispositivo de comunicación inalámbrica al volante, ni siquiera con manos libres, salvo en una emergencia. Una infracción puede retrasar el paso a la licencia completa.' },
      ];
    },
    body: (h) => {
      const { s, ca, fl } = F(h);
      return `
<h2>Primero, la educación vial</h2>
<p>Texas es uno de los estados donde la educación vial no es opcional para un adolescente: el curso es la puerta de la licencia de aprendiz. Tiene una parte en el aula y otra en el vehículo, y puede seguirse en una escuela pública, en una autoescuela con licencia o con un programa impartido por los padres registrado ante el estado. Los adultos de 18 a 24 años toman un curso más corto, de 6 horas. El examen de conocimientos suele hacerse dentro del curso, por eso muchos jóvenes de Texas nunca lo presentan en una oficina del DPS.</p>
<h2>Sus fechas en Texas</h2>
<p>La miniherramienta da la fecha del permiso según su edad; la ${h.a('permit-age', 'calculadora completa')} añade la fecha provisional, las horas y las tarifas a partir de la fecha de nacimiento.</p>
<!--tool:mini:permitage|{"state":"TX","age":14.5}-->
${h.table(['Etapa', 'Texas', 'California', 'Florida'], [
  ['Licencia de aprendiz', s.permitAgeL, ca.permitAgeL, fl.permitAgeL],
  ['Tiempo con ella', s.holdL, ca.holdL, fl.holdL],
  ['Horas supervisadas', s.hours ?? h.nc, ca.hours ?? h.nc, fl.hours ?? h.nc],
  ['Licencia provisional', s.interAgeL, ca.interAgeL, fl.interAgeL],
  ['Fin de las restricciones', s.fullAgeL, ca.fullAgeL, fl.fullAgeL],
], 'Texas frente a los otros dos estados más grandes.', ['l', 'r', 'r', 'r'])}
<p>Texas pide menos horas que ${h.sl('CA')} o ${h.sl('FL')}, pero sus límites provisionales duran hasta los 18 años en lugar de un primer año fijo.</p>
<h2>Qué estudiar para el examen de Texas</h2>
<p>El examen cubre las leyes de tránsito de Texas y las señales. Temas que en Texas aparecen más que en otros estados: la obligación de cambiar de carril o reducir la velocidad ante vehículos de emergencia, grúas o mantenimiento detenidos; la prohibición del teléfono en la mano en zonas escolares activas; las vías de servicio y los carriles de vuelta en U en los cruces de autopistas; y la tolerancia cero de alcohol para menores, que hace de cualquier cantidad detectable una infracción antes de los 21. Las preguntas de señales siguen las formas y colores del MUTCD nacional; el examen «Solo señales de tránsito» del selector las repasa rápido.</p>
<h2>Duración y nota para aprobar</h2>
<p>No encontramos el número de preguntas ni la nota para aprobar en una página del Departamento de Seguridad Pública que pudiéramos leer, y no copiamos las cifras que dan los sitios comerciales para Texas, que no coinciden entre sí. El examen de práctica usa por eso 20 preguntas con una meta del 80 % y lo indica en su panel. Cuando el DPS publique las cifras donde podamos leerlas, el examen tomará solo la duración y la nota oficiales. Las reglas y tarifas de esta página salen de ${h.os(C, 'permitAge', 'las leyes de Texas')} y de las páginas de la agencia citadas abajo; este sitio no está afiliado al DPS.</p>`;
    },
  },
});
