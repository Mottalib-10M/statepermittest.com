import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';
import BANK from '../../data/questions/bank-general.json';

/** Questions per topic in our car bank, counted from the bank file itself. */
const topics = () => {
  const c: Record<string, number> = {};
  for (const q of BANK as Array<{ t: string }>) c[q.t] = (c[q.t] ?? 0) + 1;
  return Object.entries(c).sort((a, b) => b[1] - a[1]);
};
const TOPIC: Record<string, { en: string; es: string; enD: string; esD: string }> = {
  rules: { en: 'Rules of the road', es: 'Reglas de tránsito', enD: 'speed limits, lane use, turns, parking, passing', esD: 'velocidad, carriles, vueltas, estacionamiento, rebasar' },
  signs: { en: 'Road signs', es: 'Señales', enD: 'shapes, colors and meaning of regulatory and warning signs', esD: 'formas, colores y significado de señales de reglamento y de advertencia' },
  'safe-driving': { en: 'Safe driving', es: 'Manejo seguro', enD: 'following distance, night, weather, emergencies', esD: 'distancia, noche, clima, emergencias' },
  'right-of-way': { en: 'Right of way', es: 'Derecho de paso', enD: 'intersections, pedestrians, emergency vehicles, school buses', esD: 'cruces, peatones, vehículos de emergencia, autobuses escolares' },
  signals: { en: 'Traffic signals', es: 'Semáforos', enD: 'steady and flashing lights, arrows, signals from officers', esD: 'luces fijas e intermitentes, flechas, señales de agentes' },
  markings: { en: 'Pavement markings', es: 'Marcas en el pavimento', enD: 'yellow and white lines, solid and broken, special lanes', esD: 'líneas amarillas y blancas, continuas y discontinuas, carriles especiales' },
  alcohol: { en: 'Alcohol and drugs', es: 'Alcohol y drogas', enD: 'BAC limits, implied consent, impairment', esD: 'límites de alcohol, consentimiento implícito, efectos' },
};
const F = (h: Helpers) => {
  const pcts = h.STATES.filter((s) => s.testPct != null).map((s) => Math.round((s.testPct as number) * 100));
  const freq: Record<number, number> = {};
  for (const p of pcts) freq[p] = (freq[p] ?? 0) + 1;
  const marks = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  const spanishYes = h.STATES.filter((s) => s.spanish === true).length;
  const lo = h.rank((s) => s.testQ)[0], hi = h.rank((s) => s.testQ, -1)[0];
  return { pcts, marks, spanishYes, lo, hi, tx: h.S('TX'), ny: h.S('NY'), ga: h.S('GA') };
};

export default definePage({
  id: 'dmv-written-test',
  group: 'tests',
  order: 1,
  tool: { kind: 'quiz', props: { type: 'car' } },
  mini: { kind: 'mini:passmark' },
  related: ['home', 'how-many-questions', 'road-signs', 'failed-test', 'spanish', 'state-tx'],
  sources: ['handbooks', 'mutcd', 'nhtsa_alcohol'],
  en: {
    slug: 'dmv-written-test',
    nav: 'DMV written test',
    card: 'Free written test practice with explained answers, plus the format, topics and day-of steps.',
    title: 'DMV Written Test 2026: Practice Questions and Study Guide',
    description: 'DMV written test practice, free: car questions with explained answers, scored at your state pass mark, plus the test format, the topics and what to bring.',
    h1: 'DMV written test: practice and what to expect',
    intro: 'Answer the practice questions above, scored against the pass line of the state you choose, then read how the real knowledge test is organized and what to bring.',
    resume: (h) => {
      const f = F(h);
      const top = f.marks[0];
      return `The DMV written test, called the knowledge test in most handbooks, is a multiple-choice exam on traffic laws, road signs and safe driving that every new driver passes before receiving a learner permit. It is taken at a motor vehicle office, usually on a computer or touch screen, and in some states online with a proctor. Where the length is published it runs from ${f.lo ? f.lo.testQ : h.nc} to ${f.hi ? f.hi.testQ : h.nc} questions, and the most common pass mark among the states that state one is ${top ? `${top[0]} % (${top[1]} states)` : h.nc}. The questions come from the state driver handbook, so reading it once and then practicing is the usual route. A vision screening comes first, and minors need a parent or guardian signature. Our practice test draws on ${h.counts.general} car questions, each with an explanation, and stops counting you as passed the moment you exceed the mistakes your state allows.`;
    },
    faqs: (h) => [
      { q: 'Is the DMV written test multiple choice?', a: 'Yes, in every state we have read: each question shows three or four answers and only one is correct. Some items show a picture of a sign or an intersection. There is no essay or short answer. Read every option before you choose, because wrong answers are often written to look almost right, such as a rule that applies only at night or only to trucks.' },
      { q: 'How long does the written test take?', a: 'Most applicants finish in 15 to 30 minutes, though there is rarely a strict clock. The real time sink is the visit itself: identity documents, the eye test, the photo and the line. Book an appointment where the agency offers one, and arrive early. Our full practice test takes about as long as the real one, so time yourself once.' },
      { q: 'Can I bring notes or use my phone during the test?', a: 'No. Phones, notes, smart watches and help from another person are forbidden, and an applicant caught using them fails and may be barred from retesting for a period. Some offices offer an audio version or a translated test under supervision. If you need an accommodation for a disability or reading difficulty, ask the agency when you book.' },
      { q: 'What happens right after I pass the written test?', a: `In most states you pay the permit fee, have your photo taken and leave with a paper permit, with the card mailed later. From that day the holding period starts. ${h.S('TX').permitAge != null ? `In Texas, for example, the learner license is available from ${h.S('TX').permitAgeL}.` : ''} The permit lets you drive only with a qualified adult beside you, under the conditions the state sets.` },
    ],
    body: (h) => {
      const f = F(h);
      const rows = topics().map(([k, n]) => [TOPIC[k]?.en ?? k, n, TOPIC[k]?.enD ?? '']);
      const marks = f.marks.map(([p, n]) => `${p} % in ${n} state${n === 1 ? '' : 's'}`).join(', ');
      return `
<h2>The format of the knowledge test</h2>
<p>The written test is the gate to the learner permit. It checks that you know the rules before you sit behind the wheel, even with an adult beside you. The questions are drawn from a larger bank, so two applicants on the same day rarely see the same set. Most agencies now test on a screen at the counter; a few offer paper on request, and some let teens take the test online at home with identity checks. The published pass marks we found are ${marks || h.nc}.</p>
<ul>
<li><strong>Question type.</strong> Multiple choice, one correct answer, often with a picture for sign and intersection items.</li>
<li><strong>Length.</strong> Set by each state; the ${h.a('how-many-questions', 'question count guide')} lists the ones that are published.</li>
<li><strong>Scoring.</strong> A minimum number of correct answers. Some computers end the test early once the result is certain.</li>
<li><strong>Languages.</strong> ${f.spanishYes} states in our data confirm a Spanish version; see the ${h.a('spanish', 'Spanish test guide')}.</li>
</ul>
<h2>What the test asks, by topic</h2>
<p>Handbooks are organized in similar chapters, and our practice bank follows the same split. The counts below are those of our own bank, not the weights of any state test, which agencies do not publish.</p>
${h.table(['Topic', 'Practice questions', 'Typical content'], rows, `Our car question bank: ${h.counts.general} questions with explanations.`, ['l', 'r', 'l'])}
<p>The sign items follow the federal ${h.src('mutcd', 'Manual on Uniform Traffic Control Devices')}, which every state applies, so a sign drilled for one state is valid in all of them. The alcohol items rely on rules set nationwide, such as the 0.08 limit for adult drivers that ${h.src('nhtsa_alcohol', 'NHTSA')} describes and the lower limit for drivers under 21. The state-specific part is mostly in speed limits near schools, phone rules, and the details of the teen license.</p>
<!--tool:mini:passmark-->
<h2>How to prepare in a week</h2>
<p>Read the handbook once from start to finish, skimming the parts on titles and insurance. Then take a full practice test without notes and look at the explanation of every wrong answer: the mistake usually points to a whole rule you skipped, not a single fact. Repeat with a fresh test every day or two. When you score above the pass line three times in a row, with a margin of two or three answers, you are ready. The ${h.a('road-signs', 'road signs test')} is worth a separate session, since sign items are quick points to win.</p>
<h2>On the day of the test</h2>
<p>Bring proof of identity, of your Social Security number and of residency in the state, as the agency lists them, plus the application form if it can be filled in advance. A minor needs a parent or guardian, either present or by signed form, and in many states a driver education certificate. Glasses or contact lenses, if you wear them, are needed for the vision check that comes before the test. Expect to pay the permit fee on the spot. ${f.ny.testQ ? `In New York, for instance, the test has ${f.ny.testQ} questions and you need ${f.ny.need ?? h.nc} right.` : ''} ${f.ga.testQ ? `Georgia sets ${f.ga.testQ} questions with ${f.ga.need ?? h.nc} needed.` : ''} Every state page on this site gives the figures of its own agency.</p>
<h2>If it does not go well</h2>
<p>A fail is common and not recorded against your driving record. You can usually return after a short wait, sometimes the next day, sometimes a week or more, and some states charge again. The ${h.a('failed-test', 'failed test guide')} lists the wait in each state. This site is an independent practice tool and is not affiliated with any DMV; the rules in your state handbook prevail over anything written here.</p>`;
    },
  },
  es: {
    slug: 'examen-escrito-del-dmv',
    nav: 'Examen escrito del DMV',
    card: 'Práctica gratis del examen escrito con respuestas explicadas, más el formato, los temas y el día del examen.',
    title: 'Examen escrito del DMV 2026: práctica gratis y qué esperar',
    description: 'Examen escrito del DMV gratis: preguntas de auto con respuestas explicadas, calificadas con la nota de su estado, más el formato, los temas y qué llevar.',
    h1: 'Examen escrito del DMV: práctica y qué esperar',
    intro: 'Conteste las preguntas de práctica de arriba, calificadas con la nota del estado que elija, y luego lea cómo funciona el examen teórico real y qué debe llevar.',
    resume: (h) => {
      const f = F(h);
      const top = f.marks[0];
      return `El examen escrito del DMV, que la mayoría de los manuales llaman examen de conocimientos, es una prueba de opción múltiple sobre leyes de tránsito, señales y manejo seguro que todo conductor nuevo aprueba antes de recibir el permiso de aprendizaje. Se presenta en una oficina de vehículos, casi siempre en una computadora o pantalla táctil, y en algunos estados en línea con supervisión. Donde se publica la duración, va de ${f.lo ? f.lo.testQ : h.nc} a ${f.hi ? f.hi.testQ : h.nc} preguntas, y la nota más frecuente entre los estados que la indican es el ${top ? `${top[0]} % (${top[1]} estados)` : h.nc}. Las preguntas salen del manual del conductor del estado, así que lo habitual es leerlo una vez y luego practicar. Antes se hace una prueba de la vista, y los menores necesitan la firma de un padre o tutor. Nuestro examen de práctica usa ${h.counts.general} preguntas de auto, cada una con su explicación, y deja de darle por aprobado en cuanto supera los errores que permite su estado.`;
    },
    faqs: (h) => [
      { q: '¿El examen escrito del DMV es de opción múltiple?', a: 'Sí, en todos los estados que hemos revisado: cada pregunta muestra tres o cuatro respuestas y solo una es correcta. Algunas incluyen el dibujo de una señal o de un cruce. No hay preguntas abiertas. Lea todas las opciones antes de elegir, porque las incorrectas suelen parecer casi ciertas, como una regla que solo vale de noche o solo para camiones.' },
      { q: '¿Cuánto dura el examen escrito?', a: 'La mayoría termina en 15 a 30 minutos, y casi nunca hay un reloj estricto. Lo que más tiempo lleva es la visita: documentos de identidad, prueba de la vista, foto y fila. Pida cita donde la agencia lo permita y llegue temprano. Nuestro examen de práctica completo dura más o menos lo mismo que el real, así que tómese el tiempo una vez.' },
      { q: '¿Puedo llevar apuntes o usar el celular durante el examen?', a: 'No. Celulares, apuntes, relojes inteligentes y la ayuda de otra persona están prohibidos, y quien los usa reprueba y puede quedar sin derecho a repetir por un tiempo. Algunas oficinas ofrecen una versión en audio o traducida bajo supervisión. Si necesita un ajuste por discapacidad o dificultad para leer, pídalo a la agencia al hacer la cita.' },
      { q: '¿Qué pasa justo después de aprobar el examen escrito?', a: `En la mayoría de los estados paga la tarifa del permiso, le toman la foto y sale con un permiso en papel; la tarjeta llega después por correo. Ese día empieza a contar el tiempo mínimo con el permiso. ${h.S('TX').permitAge != null ? `En Texas, por ejemplo, el permiso de aprendizaje se puede obtener desde los ${h.S('TX').permitAgeL}.` : ''} El permiso solo deja manejar con un adulto autorizado al lado, en las condiciones que fija el estado.` },
    ],
    body: (h) => {
      const f = F(h);
      const rows = topics().map(([k, n]) => [TOPIC[k]?.es ?? k, n, TOPIC[k]?.esD ?? '']);
      const marks = f.marks.map(([p, n]) => `el ${p} % en ${n} ${n === 1 ? 'estado' : 'estados'}`).join(', ');
      return `
<h2>Cómo es el examen de conocimientos</h2>
<p>El examen escrito es la puerta del permiso de aprendizaje. Comprueba que conoce las reglas antes de tomar el volante, aunque sea con un adulto al lado. Las preguntas salen de un banco más grande, así que dos personas el mismo día rara vez ven las mismas. Casi todas las agencias examinan hoy en una pantalla en la oficina; unas pocas dan la versión en papel si se pide, y algunas dejan a los jóvenes presentarlo en línea desde casa con verificación de identidad. Las notas publicadas que encontramos son: ${marks || h.nc}.</p>
<ul>
<li><strong>Tipo de pregunta.</strong> Opción múltiple con una sola respuesta correcta, a menudo con imagen en las preguntas de señales y cruces.</li>
<li><strong>Duración.</strong> La fija cada estado; la ${h.a('how-many-questions', 'guía del número de preguntas')} reúne las que se publican.</li>
<li><strong>Calificación.</strong> Un mínimo de respuestas correctas. Algunas computadoras terminan antes cuando el resultado ya es seguro.</li>
<li><strong>Idiomas.</strong> ${f.spanishYes} estados de nuestros datos confirman una versión en español; vea la ${h.a('spanish', 'guía del examen en español')}.</li>
</ul>
<h2>Qué pregunta el examen, por tema</h2>
<p>Los manuales se organizan en capítulos parecidos, y nuestro banco de práctica sigue la misma división. Las cifras son las de nuestro banco, no el peso de cada tema en un examen estatal, que las agencias no publican.</p>
${h.table(['Tema', 'Preguntas de práctica', 'Contenido habitual'], rows, `Nuestro banco de preguntas de auto: ${h.counts.general} preguntas explicadas.`, ['l', 'r', 'l'])}
<p>Las preguntas de señales siguen el ${h.src('mutcd', 'manual federal de dispositivos de control de tránsito (MUTCD)')}, que aplican todos los estados, así que una señal aprendida para un estado vale en todos. Las de alcohol se basan en reglas nacionales, como el límite de 0.08 para adultos que explica la ${h.src('nhtsa_alcohol', 'NHTSA')} y el límite más bajo para menores de 21 años. Lo propio de cada estado está sobre todo en los límites de velocidad cerca de escuelas, las reglas del celular y los detalles de la licencia para jóvenes.</p>
<!--tool:mini:passmark-->
<h2>Cómo prepararse en una semana</h2>
<p>Lea el manual una vez de principio a fin, pasando rápido por los capítulos de títulos y seguros. Después haga un examen de práctica completo sin apuntes y lea la explicación de cada error: casi siempre revela una regla entera que se saltó, no un dato suelto. Repita con un examen nuevo cada uno o dos días. Cuando supere la nota tres veces seguidas con un margen de dos o tres respuestas, está listo. El ${h.a('road-signs', 'examen de señales')} merece una sesión aparte, porque esas preguntas son puntos rápidos.</p>
<h2>El día del examen</h2>
<p>Lleve los comprobantes de identidad, de número de Seguro Social y de residencia en el estado que pida la agencia, y la solicitud si se puede llenar antes. Un menor necesita a su padre, madre o tutor, en persona o con un formulario firmado, y en muchos estados un certificado de educación vial. Si usa lentes, llévelos para la prueba de la vista, que va antes del examen. La tarifa del permiso se paga ahí mismo. ${f.ny.testQ ? `En Nueva York, por ejemplo, el examen tiene ${f.ny.testQ} preguntas y hay que acertar ${f.ny.need ?? h.nc}.` : ''} ${f.ga.testQ ? `Georgia pone ${f.ga.testQ} preguntas y pide ${f.ga.need ?? h.nc} correctas.` : ''} Cada página de estado de este sitio da las cifras de su agencia.</p>
<h2>Si no sale bien</h2>
<p>Reprobar es frecuente y no queda en su historial de manejo. Normalmente puede volver tras una espera corta, a veces al día siguiente, a veces una semana o más, y algunos estados cobran de nuevo. La ${h.a('failed-test', 'guía para quien reprobó')} indica la espera de cada estado. Este sitio es una herramienta de práctica independiente, sin relación con ningún DMV; las reglas del manual de su estado prevalecen sobre lo que se escribe aquí.</p>`;
    },
  },
});
