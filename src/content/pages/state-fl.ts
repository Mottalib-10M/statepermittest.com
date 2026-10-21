import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'FL';
const F = (h: Helpers) => ({ s: h.S(C), ga: h.S('GA') });

export default definePage({
  id: 'state-fl',
  group: 'states',
  order: 102,
  state: C,
  tool: { kind: 'quiz', props: { type: 'car' } },
  mini: { kind: 'mini:hours' },
  related: ['home', 'how-many-questions', 'supervised-hours', 'state-ga', 'state-tx', 'teen-restrictions'],
  sources: ['handbooks', 'mutcd', 'nhtsa_teen'],
  en: {
    slug: 'florida-permit-test',
    nav: 'Florida',
    card: 'Florida Class E knowledge exam: 50 questions, 40 to pass, then a year on the learner license.',
    title: 'Florida Permit Test 2026: Free Class E Practice Exam',
    description: 'Florida permit practice test, free: 50 Class E questions scored at 40 correct, explained answers, the 12-month learner license, 50 hours and its curfews.',
    h1: 'Florida permit practice test',
    intro: 'A 50-question practice run of the Florida Class E knowledge exam, scored at 40 correct, followed by the rules of the learner license year.',
    resume: (h) => {
      const { s } = F(h);
      return `Florida's Class E knowledge exam has ${s.testQ ?? h.nc} multiple-choice questions on traffic laws and road signs, and you need ${s.need ?? h.nc} correct answers, ${s.pctL}, to pass, according to the Department of Highway Safety and Motor Vehicles. A teen can sit it from ${s.permitAgeL}, after a driver education course and with a parent's notarized consent, and receives a learner's license. That license must be held ${s.holdL} with no moving violation before the intermediate license at ${s.interAgeL}, and a parent must certify ${s.hours ?? h.nc} hours of driving, ${s.nightHours ?? h.nc} of them at night. In the first three months the learner may drive only in daylight, then until 10 p.m. Once licensed, a 16-year-old may not drive from 11 p.m. to 6 a.m. and a 17-year-old from 1 a.m. to 5 a.m., unless with a licensed adult of 21 or more or going to work. The full practice test above has the real length and the real mark: ${s.canMiss ?? h.nc} mistakes allowed.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'How many questions can I miss on the Florida permit test?', a: `${s.canMiss ?? h.nc}. The Class E knowledge exam has ${s.testQ ?? h.nc} questions and requires ${s.need ?? h.nc} correct answers. The score panel of the practice test counts down the mistakes you still have, so you can feel how narrow ten errors become on the last questions. FLHSMV describes the computer exam as timed at 60 minutes.` },
        { q: 'Why must a Florida learner wait a full year?', a: `Florida requires the learner's license to be held for ${s.holdL}, or until age 18, with no traffic conviction, before the intermediate license. A moving violation during that year resets the count. The ${h.a('permit-age', 'date calculator')} shows the result for your date of birth, using the later of the 12 months and the age of ${s.interAgeL}.` },
        { q: 'Can I take the Florida knowledge exam online?', a: 'Applicants under 18 can take the Class E knowledge exam online through an approved third-party provider; the result is sent to FLHSMV and the learner\'s license is then issued at a driver license office or tax collector office. Adults take it in person. The vision and hearing test is always done in person.' },
        { q: 'Is the Florida permit test offered in Spanish?', a: 'The FLHSMV pages disagree: an English page says the Class E exam is in English only, while its Spanish page lists several languages, Spanish among them. We show the point as not confirmed and suggest asking the office where you will test. Our practice test exists in Spanish in any case.' },
      ];
    },
    body: (h) => {
      const { s, ga } = F(h);
      return `
<h2>The learner year in Florida</h2>
<p>Florida's learner stage is longer than most: ${s.holdL}, against ${ga.holdL} next door in ${h.sl('GA')}. During it the learner drives with a licensed driver of 21 or more in the front seat. The night limits change during the year:</p>
${h.table(['Period', 'When the learner or new driver may drive'], [
  ['First 3 months of the learner\'s license', 'daylight only'],
  ['Rest of the learner year', 'until 10 p.m.'],
  ['Intermediate license at 16', 'not from 11 p.m. to 6 a.m., unless with a licensed driver 21+ or to or from work'],
  ['Intermediate license at 17', 'not from 1 a.m. to 5 a.m., same exceptions'],
], `Florida night rules for drivers under ${s.fullAge ?? 18}.`, ['l', 'l'])}
<h2>The 50 hours, counted</h2>
<p>A parent, guardian or responsible adult certifies the ${s.hours ?? h.nc} hours when the teen applies for the intermediate license. Enter the hours already logged to see what is left:</p>
<!--tool:mini:hours|{"state":"FL","done":30,"night":4}-->
<h2>Before the exam</h2>
<p>A teen first completes a traffic law and substance abuse education course, required for every first-time Florida driver. The exam itself has two kinds of questions, on road rules and on signs; many applicants lose points on signs they think they know, such as the pentagon of a school zone or the round yellow railroad warning. Use "Road signs only" in the test selector, then a full ${s.testQ ?? 50}-question test. Florida's zero-tolerance rule sets the limit at ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc} for drivers under 21.</p>
<h2>Fees</h2>
<p>The original Class E license costs ${s.licenseFeeL} under Florida statute; county tax collector offices that issue licenses may add a service fee. The learner's license fee is not separately stated on the pages we could read, so the date calculator shows it as not confirmed. The figures on this page come from ${h.os(C, 'testQ', 'FLHSMV')} and the Florida Statutes; this site is independent of FLHSMV.</p>`;
    },
  },
  es: {
    slug: 'examen-permiso-florida',
    nav: 'Florida',
    card: 'Examen de conocimientos Clase E de Florida: 50 preguntas, 40 para aprobar y un año de aprendiz.',
    title: 'Examen del permiso de Florida 2026: práctica Clase E',
    description: 'Examen de práctica del permiso de Florida, gratis: 50 preguntas Clase E calificadas con 40 correctas, respuestas explicadas, año de aprendiz y 50 horas.',
    h1: 'Examen de práctica del permiso de Florida',
    intro: 'Un ensayo de 50 preguntas del examen de conocimientos Clase E de Florida, calificado con 40 correctas, seguido de las reglas del año de licencia de aprendiz.',
    resume: (h) => {
      const { s } = F(h);
      return `El examen de conocimientos Clase E de Florida tiene ${s.testQ ?? h.nc} preguntas de opción múltiple sobre leyes de tránsito y señales, y hacen falta ${s.need ?? h.nc} respuestas correctas, el ${s.pctL}, para aprobar, según el Departamento de Seguridad en las Carreteras y Vehículos Motorizados (FLHSMV). Un adolescente puede presentarlo desde los ${s.permitAgeL}, tras un curso de educación vial y con el consentimiento notariado de un padre, y recibe una licencia de aprendiz. Esa licencia debe conservarse ${s.holdL} sin infracciones de tránsito antes de la licencia intermedia a los ${s.interAgeL}, y un padre debe certificar ${s.hours ?? h.nc} horas de manejo, ${s.nightHours ?? h.nc} de ellas de noche. Durante los tres primeros meses el aprendiz solo maneja de día, y luego hasta las 10 p. m. Con licencia, un joven de 16 años no puede manejar de 11 p. m. a 6 a. m. y uno de 17 de 1 a. m. a 5 a. m., salvo con un adulto con licencia de 21 años o más o para ir al trabajo. El examen de práctica completo tiene la duración y la nota reales: ${s.canMiss ?? h.nc} errores permitidos.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: '¿Cuántas preguntas puedo fallar en el examen del permiso de Florida?', a: `${s.canMiss ?? h.nc}. El examen Clase E tiene ${s.testQ ?? h.nc} preguntas y exige ${s.need ?? h.nc} respuestas correctas. El panel del examen de práctica descuenta los errores que le quedan, para que sienta lo poco que son diez errores en las últimas preguntas. El FLHSMV indica que el examen por computadora dura 60 minutos.` },
        { q: '¿Por qué un aprendiz de Florida debe esperar un año entero?', a: `Florida exige conservar la licencia de aprendiz ${s.holdL}, o hasta los 18 años, sin condenas de tránsito, antes de la licencia intermedia. Una infracción en ese año reinicia la cuenta. La ${h.a('permit-age', 'calculadora de fechas')} muestra el resultado con su fecha de nacimiento, tomando lo más tardío entre los 12 meses y la edad de ${s.interAgeL}.` },
        { q: '¿Puedo presentar el examen de Florida en línea?', a: 'Los menores de 18 años pueden presentar el examen Clase E en línea con un proveedor externo aprobado; el resultado se envía al FLHSMV y la licencia de aprendiz se emite luego en una oficina de licencias o del recaudador de impuestos del condado. Los adultos lo presentan en persona. La prueba de vista y oído siempre es presencial.' },
        { q: '¿El examen del permiso de Florida se ofrece en español?', a: 'Las páginas del FLHSMV no coinciden: una página en inglés dice que el examen Clase E es solo en inglés, mientras que su página en español enumera varios idiomas, entre ellos el español. Lo mostramos como no confirmado y le aconsejamos preguntar en la oficina donde lo presentará. Nuestro examen de práctica sí existe en español.' },
      ];
    },
    body: (h) => {
      const { s, ga } = F(h);
      return `
<h2>El año de aprendiz en Florida</h2>
<p>La etapa de aprendiz en Florida es más larga que en casi todos los estados: ${s.holdL}, frente a ${ga.holdL} en el vecino ${h.sl('GA')}. Durante ella el aprendiz maneja con un conductor con licencia de 21 años o más en el asiento delantero. Los límites nocturnos cambian a lo largo del año:</p>
${h.table(['Periodo', 'Cuándo puede manejar'], [
  ['Primeros 3 meses de la licencia de aprendiz', 'solo de día'],
  ['Resto del año de aprendiz', 'hasta las 10 p. m.'],
  ['Licencia intermedia a los 16', 'no de 11 p. m. a 6 a. m., salvo con un conductor de 21+ o para ir o volver del trabajo'],
  ['Licencia intermedia a los 17', 'no de 1 a. m. a 5 a. m., con las mismas excepciones'],
], `Reglas nocturnas de Florida para menores de ${s.fullAge ?? 18} años.`, ['l', 'l'])}
<h2>Las 50 horas, contadas</h2>
<p>Un padre, tutor o adulto responsable certifica las ${s.hours ?? h.nc} horas cuando el joven solicita la licencia intermedia. Indique las horas ya registradas para ver cuántas faltan:</p>
<!--tool:mini:hours|{"state":"FL","done":30,"night":4}-->
<h2>Antes del examen</h2>
<p>El joven termina primero un curso sobre leyes de tránsito y abuso de sustancias, obligatorio para todo conductor nuevo en Florida. El examen tiene dos tipos de preguntas, sobre reglas y sobre señales; muchos pierden puntos en señales que creen conocer, como el pentágono de zona escolar o el aviso redondo amarillo de cruce de tren. Use «Solo señales de tránsito» en el selector y luego un examen completo de ${s.testQ ?? 50} preguntas. La tolerancia cero de Florida fija el límite en ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc} para menores de 21.</p>
<h2>Tarifas</h2>
<p>La licencia Clase E original cuesta ${s.licenseFeeL} según la ley de Florida; las oficinas del recaudador de impuestos del condado pueden añadir un cargo de servicio. La tarifa de la licencia de aprendiz no aparece por separado en las páginas que pudimos leer, así que la calculadora la muestra como no confirmada. Las cifras de esta página salen del ${h.os(C, 'testQ', 'FLHSMV')} y de las leyes de Florida; este sitio es independiente del FLHSMV.</p>`;
    },
  },
});
