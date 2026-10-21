import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const F = (h: Helpers) => {
  const known = h.STATES.filter((s) => s.testQ != null || s.testPct != null);
  const withQ = h.rank((s) => s.testQ, -1);
  const silent = h.STATES.filter((s) => s.testQ == null && s.testPct == null);
  const longest = withQ[0];
  const shortest = withQ[withQ.length - 1];
  const qs = withQ.map((s) => s.testQ as number).sort((a, b) => a - b);
  const median = qs.length ? (qs.length % 2 ? qs[(qs.length - 1) / 2] : (qs[qs.length / 2 - 1] + qs[qs.length / 2]) / 2) : null;
  const forty = withQ.filter((s) => s.testQ === 40);
  const roomiest = h.rank((s) => { const x = h.S(s.code); return x.canMiss; }, -1)[0];
  const tightest = h.rank((s) => { const x = h.S(s.code); return x.canMiss; })[0];
  return { known, withQ, silent, longest, shortest, median, forty, roomiest, tightest };
};
const names = (h: Helpers, list: Array<{ code: string }>) => list.map((s) => h.S(s.code).nameL).join(', ');

export default definePage({
  id: 'how-many-questions',
  group: 'tests',
  order: 5,
  tool: { kind: 'mini:passmark' },
  related: ['dmv-written-test', 'rules-by-state', 'failed-test', 'state-ca', 'state-ny', 'state-ga'],
  sources: ['handbooks'],
  en: {
    slug: 'how-many-questions-on-permit-test',
    nav: 'How many questions?',
    card: 'Length of the knowledge test in each state, the correct answers needed and the mistakes allowed.',
    title: 'Permit Test Questions by State: Count and Answers to Pass',
    description: 'Permit test questions by state: how many questions each knowledge test has, how many correct answers you need and how many mistakes you can make to still pass.',
    h1: 'How many questions are on the permit test in each state',
    intro: 'Choose a state: the tool gives the number of questions, the correct answers needed and the mistakes you can afford, when the agency publishes them.',
    resume: (h) => {
      const f = F(h);
      return `The written permit test is short almost everywhere, but the exact count depends on the state. Of the ${h.counts.states} jurisdictions in our data, ${f.withQ.length} publish the number of questions on their official pages: ${f.shortest ? `the shortest has ${f.shortest.testQ} questions (${h.S(f.shortest.code).nameL})` : 'none is short enough to note'}, ${f.longest ? `the longest ${f.longest.testQ} (${h.S(f.longest.code).nameL})` : ''}, and the median is ${f.median ?? h.nc}. ${f.forty.length} states use exactly 40 questions. What decides whether you pass is not the length but the margin: ${f.roomiest ? `${h.S(f.roomiest.code).nameL} lets you miss ${h.S(f.roomiest.code).canMiss}` : 'some states allow ten or more mistakes'}${f.tightest ? `, ${h.S(f.tightest.code).nameL} only ${h.S(f.tightest.code).canMiss}` : ''}. ${f.silent.length} jurisdictions publish neither a count nor a pass mark, so the test length there is only known at the counter. The tool above converts a state's rule into answers, and our full practice test uses the same arithmetic to score you. Knowing that number before the appointment tells you exactly how much room you have for a doubtful guess or a misread question.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Does every applicant get the same number of questions?', a: `Not always. Some agencies give a shorter test to adults than to teens, or draw a different number from a bank depending on the license class. ${h.S('CA').testQ ? `California's DMV research put the minor's test at ${h.S('CA').testQ} questions, with fewer for adults.` : ''} When a state publishes one figure, it is the one we show; the state page notes any split the official text mentions.` },
        { q: 'Is a 20-question test easier than a 50-question test?', a: `Usually not. A short test leaves fewer mistakes: with 20 questions at 80 % you may miss 4, while 50 questions at the same mark allow 10. One unlucky topic weighs more in a short test. ${f.withQ.filter((s) => (s.testQ as number) <= 20).length} states in our data use 20 questions or fewer, so practice until you are well above the line.` },
        { q: 'Does the test stop once I have enough correct answers?', a: 'In several states the computer ends the test as soon as you reach the pass count, or as soon as you have missed one too many. That is why some applicants finish after only part of the questions. Agencies describe this on their pages when they use it; our practice test keeps going to the end but turns its score panel red the moment you pass the mistake limit.' },
        { q: 'Are road sign questions counted separately?', a: 'A few states set a minimum for sign questions inside the test, so a good overall score is not enough if you miss too many signs. Where an agency describes such a split, the state page reports it. Drilling the sign section on its own, with the signs-only test, is the safest way to cover that risk.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      const ns = 'not stated';
      const rows = h.rank((s) => s.testQ ?? (s.testPct != null ? 0 : null), -1).map((s) => {
        const x = h.S(s.code);
        return [h.sl(s.code), s.testQ ?? ns, x.need && s.testQ ? x.need : ns, x.canMiss ?? ns, s.testPct ? h.pc(s.testPct) : ns];
      });
      const fromPct = f.withQ.filter((s) => s.testPass == null && s.testPct != null);
      return `
<h2>Question counts and pass lines in each state</h2>
<p>The table lists every jurisdiction whose agency publishes at least a test length or a pass mark, longest test first. "Correct needed" is the count the agency gives, or, when it only gives a percentage, the smallest whole number of answers that reaches it. "Mistakes allowed" is the difference.</p>
${h.table(['State', 'Questions', 'Correct needed', 'Mistakes allowed', 'Pass mark'], rows, `Written knowledge test for a first car permit. ${f.known.length} jurisdictions with a published figure.`, ['l', 'r', 'r', 'r', 'r'])}
<p>${f.silent.length ? `No count or pass mark appears on the official pages we read for ${names(h, f.silent)}. Those states may still set a fixed length; it simply is not written where an applicant can find it before the visit.` : 'Every jurisdiction in our data publishes at least one of the two figures.'}</p>
<h2>From a percentage to a number of answers</h2>
<p>Agencies phrase the rule in two ways. Some say "answer 30 of 40 correctly", which is unambiguous. Others say "score 80 %", which needs a length to mean anything. When we know both the length and the percentage, the count needed is the percentage times the length, rounded up: 80 % of 25 is exactly 20, but 76 % of 25 is 19, and 75 % of 46 would be 34.5, so 35. ${fromPct.length ? `${names(h, fromPct)} publish only the percentage alongside the length, so their count in the table is derived that way.` : ''} Rounding always goes up, because a score just under the line is a fail.</p>
<h2>The longest and the shortest tests</h2>
<p>${f.longest ? `${h.sl(f.longest.code)} has the longest published test, ${f.longest.testQ} questions, and you need ${h.S(f.longest.code).need ?? h.nc} of them.` : ''} ${f.shortest ? `At the other end, ${h.sl(f.shortest.code)} asks ${f.shortest.testQ} questions and expects ${h.S(f.shortest.code).need ?? h.nc} right.` : ''} The median published length is ${f.median ?? h.nc} questions. A longer test has one real advantage: a single topic you know badly costs a smaller share of your score. A shorter test is faster, but the margin can come down to three or four slips.</p>
<p>The mistake budget is what to remember. ${f.roomiest ? `In ${h.S(f.roomiest.code).nameL} you can miss ${h.S(f.roomiest.code).canMiss} and still pass` : ''}${f.tightest ? `; in ${h.S(f.tightest.code).nameL}, only ${h.S(f.tightest.code).canMiss}` : ''}. Before the appointment, run a full practice test and count your wrong answers against that budget, not against a percentage.</p>
<h2>What the questions cover</h2>
<p>The knowledge test draws from the state driver handbook: traffic signs, signals and pavement markings, right of way, speed limits, lane use, parking, alcohol and drugs, and sharing the road. Our practice bank holds ${h.counts.general} car questions written from those chapters and from the federal sign manual; the full test picks the length of the state you select and applies its pass line. Topic shares in the real test are not published, so the bank is weighted toward rules and safe driving, which every handbook stresses.</p>
<h2>Adults, teens and online tests</h2>
<p>The length in the table is the one the agency gives for a first car permit. Some states give adults a shorter version, and several run an online test for teens at home with a different number of attempts. A count can also change quietly when an agency renews its question bank, so look at the date on the official page if you read it months before your visit. When the agency page and a printed handbook disagree, the more recent of the two is usually right, and the clerk has the final word.</p>
<h2>Motorcycle and commercial tests have their own counts</h2>
<p>A motorcycle knowledge test and the commercial general knowledge test are separate exams with their own length and pass line. The ${h.a('motorcycle', 'motorcycle permit guide')} lists the states that publish a count for the motorcycle test, and the ${h.a('cdl', 'CDL practice test')} explains the federal 80 % rule for commercial tests. If you fail any of them, the ${h.a('failed-test', 'retake guide')} gives the wait in each state.</p>`;
    },
  },
  es: {
    slug: 'cuantas-preguntas-tiene-el-examen',
    nav: '¿Cuántas preguntas tiene?',
    card: 'Duración del examen teórico en cada estado, respuestas correctas necesarias y errores permitidos.',
    title: 'Preguntas del examen del permiso por estado: cuántas acertar',
    description: 'Número de preguntas del examen del permiso en cada estado, respuestas correctas que necesita y errores que puede cometer sin reprobar, según cada agencia.',
    h1: 'Cuántas preguntas tiene el examen del permiso en cada estado',
    intro: 'Elija un estado: la herramienta muestra el número de preguntas, las respuestas correctas necesarias y los errores permitidos, cuando la agencia los publica.',
    resume: (h) => {
      const f = F(h);
      return `El examen escrito del permiso es corto en casi todas partes, pero el número exacto de preguntas depende del estado. De las ${h.counts.states} jurisdicciones de nuestros datos, ${f.withQ.length} publican cuántas preguntas tiene en sus páginas oficiales: ${f.shortest ? `el más corto tiene ${f.shortest.testQ} (${h.S(f.shortest.code).nameL})` : 'ninguno destaca por corto'}, ${f.longest ? `el más largo ${f.longest.testQ} (${h.S(f.longest.code).nameL})` : ''}, y la mediana es de ${f.median ?? h.nc}. ${f.forty.length} estados usan exactamente 40 preguntas. Lo que decide si aprueba no es la duración sino el margen: ${f.roomiest ? `en ${h.S(f.roomiest.code).nameL} puede fallar ${h.S(f.roomiest.code).canMiss}` : 'algunos estados permiten diez errores o más'}${f.tightest ? `, en ${h.S(f.tightest.code).nameL} solo ${h.S(f.tightest.code).canMiss}` : ''}. ${f.silent.length} jurisdicciones no publican ni el número de preguntas ni la nota, así que allí la duración solo se conoce en la oficina. La herramienta de arriba convierte la regla de un estado en respuestas, y nuestro examen de práctica completo califica con la misma cuenta. Conocer esa cifra antes de la cita le dice exactamente cuánto margen tiene para una duda o una pregunta mal leída.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: '¿A todos les toca el mismo número de preguntas?', a: `No siempre. Algunas agencias dan un examen más corto a los adultos que a los menores, o sacan un número distinto de preguntas según la clase de licencia. ${h.S('CA').testQ ? `Un informe del DMV de California indicaba ${h.S('CA').testQ} preguntas para menores y menos para adultos.` : ''} Cuando el estado publica una sola cifra, es la que mostramos; la página del estado aclara cualquier diferencia que mencione el texto oficial.` },
        { q: '¿Un examen de 20 preguntas es más fácil que uno de 50?', a: `Casi nunca. Un examen corto deja menos errores: con 20 preguntas al 80 % puede fallar 4, y con 50 preguntas a la misma nota, 10. Un tema que no domina pesa más en un examen corto. ${f.withQ.filter((s) => (s.testQ as number) <= 20).length} estados de nuestros datos usan 20 preguntas o menos, así que conviene practicar hasta quedar muy por encima de la línea.` },
        { q: '¿El examen se detiene cuando ya tengo suficientes aciertos?', a: 'En varios estados la computadora termina el examen en cuanto usted alcanza los aciertos necesarios, o en cuanto falla una pregunta de más. Por eso algunas personas terminan sin ver todas las preguntas. Las agencias lo explican en su página cuando funciona así; nuestro examen de práctica sigue hasta el final, pero el panel de resultados se pone en rojo en cuanto supera el límite de errores.' },
        { q: '¿Las preguntas de señales cuentan aparte?', a: 'Algunos estados fijan un mínimo de aciertos en las preguntas de señales dentro del examen, de modo que una buena nota general no basta si falla demasiadas señales. Cuando la agencia describe esa división, la página del estado lo indica. Repasar las señales por separado, con el examen de solo señales, es la forma más segura de cubrir ese riesgo.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      const ns = 'sin dato';
      const rows = h.rank((s) => s.testQ ?? (s.testPct != null ? 0 : null), -1).map((s) => {
        const x = h.S(s.code);
        return [h.sl(s.code), s.testQ ?? ns, x.need && s.testQ ? x.need : ns, x.canMiss ?? ns, s.testPct ? h.pc(s.testPct) : ns];
      });
      const fromPct = f.withQ.filter((s) => s.testPass == null && s.testPct != null);
      return `
<h2>Preguntas y nota mínima en cada estado</h2>
<p>La tabla reúne las jurisdicciones cuya agencia publica al menos la duración del examen o la nota mínima, de la más larga a la más corta. «Aciertos» es la cifra que da la agencia o, si solo da un porcentaje, el menor número entero de respuestas que lo alcanza. «Errores» es la diferencia entre las dos cifras.</p>
${h.table(['Estado', 'Preguntas', 'Aciertos', 'Errores', 'Nota'], rows, `Examen teórico escrito para el primer permiso de auto. ${f.known.length} jurisdicciones con alguna cifra publicada.`, ['l', 'r', 'r', 'r', 'r'])}
<p>${f.silent.length ? `En las páginas oficiales que leímos no aparece ni la duración ni la nota para ${names(h, f.silent)}. Puede que esos estados tengan una duración fija; simplemente no está escrita donde el solicitante pueda verla antes de ir.` : 'Todas las jurisdicciones de nuestros datos publican al menos una de las dos cifras.'}</p>
<h2>Del porcentaje al número de respuestas</h2>
<p>Las agencias expresan la regla de dos maneras. Unas dicen «conteste bien 30 de 40», lo que no deja dudas. Otras dicen «obtenga el 80 %», que solo tiene sentido si se conoce la duración. Cuando sabemos ambas cifras, los aciertos necesarios son el porcentaje por el número de preguntas, redondeado hacia arriba: el 80 % de 25 es exactamente 20, el 76 % de 25 da 19, y el 75 % de 46 serían 34.5, es decir 35. ${fromPct.length ? `${names(h, fromPct)} publican solo el porcentaje junto a la duración, así que su cifra de aciertos se calcula de ese modo.` : ''} Siempre se redondea hacia arriba, porque quedarse un poco por debajo es reprobar.</p>
<h2>Los exámenes más largos y más cortos</h2>
<p>${f.longest ? `${h.sl(f.longest.code)} tiene el examen publicado más largo, ${f.longest.testQ} preguntas, de las que hay que acertar ${h.S(f.longest.code).need ?? h.nc}.` : ''} ${f.shortest ? `En el otro extremo, ${h.sl(f.shortest.code)} hace ${f.shortest.testQ} preguntas y pide ${h.S(f.shortest.code).need ?? h.nc} bien contestadas.` : ''} La mediana de las duraciones publicadas es de ${f.median ?? h.nc} preguntas. Un examen largo tiene una ventaja real: un tema que domina poco le quita una parte menor de la nota. Uno corto es más rápido, pero el margen puede quedar en tres o cuatro fallos.</p>
<p>Lo que hay que retener es el número de errores permitidos. ${f.roomiest ? `En ${h.S(f.roomiest.code).nameL} puede fallar ${h.S(f.roomiest.code).canMiss} y aun así aprobar` : ''}${f.tightest ? `; en ${h.S(f.tightest.code).nameL}, solo ${h.S(f.tightest.code).canMiss}` : ''}. Antes de la cita, haga un examen de práctica completo y cuente sus errores frente a ese límite, no frente a un porcentaje.</p>
<h2>De qué tratan las preguntas</h2>
<p>El examen teórico sale del manual del conductor del estado: señales, semáforos y marcas en el pavimento, derecho de paso, límites de velocidad, uso de carriles, estacionamiento, alcohol y drogas, y cómo compartir la vía. Nuestro banco tiene ${h.counts.general} preguntas de auto escritas a partir de esos capítulos y del manual federal de señales; el examen completo toma la duración del estado elegido y aplica su nota. Las agencias no publican cuánto pesa cada tema, así que el banco da más espacio a las reglas y al manejo seguro, que todos los manuales destacan.</p>
<h2>Adultos, menores y exámenes en línea</h2>
<p>La duración de la tabla es la que da la agencia para el primer permiso de auto. Algunos estados dan a los adultos una versión más corta, y varios ofrecen a los jóvenes un examen en línea desde casa con otro número de intentos. La cifra también puede cambiar sin aviso cuando la agencia renueva su banco de preguntas, así que mire la fecha de la página oficial si la consultó meses antes de su cita. Si la página de la agencia y un manual impreso no coinciden, suele valer el más reciente, y la última palabra la tiene el empleado de la oficina.</p>
<h2>La moto y la licencia comercial tienen su propio examen</h2>
<p>El examen teórico de motocicleta y el de conocimientos generales de la licencia comercial son pruebas aparte, con su duración y su nota. La ${h.a('motorcycle', 'guía del permiso de moto')} indica qué estados publican la duración del examen de moto, y el ${h.a('cdl', 'examen de práctica CDL')} explica la regla federal del 80 % para los exámenes comerciales. Si reprueba alguno, la ${h.a('failed-test', 'guía para repetir el examen')} da la espera de cada estado.</p>`;
    },
  },
});
