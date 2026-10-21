import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';
import type { StateRec } from '../../lib/engine/states';

/** Wait after a fail in the page language: the agency wording in English, the day count in Spanish. */
const wait = (h: Helpers, s: StateRec) => {
  if (h.lang === 'en') return s.retake ? s.retake.en : null;
  if (s.retake && s.retake.es !== s.retake.en) return s.retake.es;
  if (s.retakeDays == null) return null;
  if (s.retakeDays === 0) return 'el mismo día';
  return `${s.retakeDays} ${s.retakeDays === 1 ? 'día' : 'días'}${s.retakeBusiness ? ' hábiles' : ''}`;
};
const F = (h: Helpers) => {
  const known = h.STATES.filter((s) => s.retake != null || s.retakeDays != null);
  const sameDay = h.STATES.filter((s) => s.retakeDays === 0);
  const nextDay = h.STATES.filter((s) => s.retakeDays === 1);
  const longest = h.rank((s) => s.retakeDays, -1)[0];
  const weekPlus = h.STATES.filter((s) => (s.retakeDays ?? 0) >= 7);
  const silent = h.STATES.filter((s) => s.retake == null && s.retakeDays == null);
  return { known, sameDay, nextDay, longest, weekPlus, silent };
};
const names = (h: Helpers, l: StateRec[]) => l.map((s) => h.S(s.code).nameL).join(', ');

export default definePage({
  id: 'failed-test',
  group: 'tests',
  order: 7,
  tool: { kind: 'mini:retake' },
  related: ['how-many-questions', 'dmv-written-test', 'road-signs', 'state-va', 'state-ga', 'home'],
  sources: ['handbooks'],
  en: {
    slug: 'failed-permit-test',
    nav: 'Failed the permit test?',
    card: 'How long to wait before a retake in each state, and how to turn a fail into a pass next time.',
    title: 'Failed Permit Test: Retake Wait by State and Next Steps',
    description: 'Failed the permit test? The wait before you can retake the knowledge test in each state, what a retake may cost, and a plan to pass on the next attempt.',
    h1: 'Failed the permit test? When you can retake it',
    intro: 'Pick your state: the tool shows how long the agency makes you wait after a failed knowledge test, and how many correct answers you need next time.',
    resume: (h) => {
      const f = F(h);
      return `Failing the written permit test is common, and in most states the cost is a short wait, sometimes a fee, never a mark on a driving record. Of the ${h.counts.states} jurisdictions in our data, ${f.known.length} publish a retake rule. ${f.sameDay.length ? `${f.sameDay.length} allow another attempt the same day (${names(h, f.sameDay)}), ` : ''}${f.nextDay.length} make you come back the next day or after 24 hours, and ${f.weekPlus.length} impose a week or more${f.longest ? `, the longest being ${f.longest.retakeDays} days in ${h.S(f.longest.code).nameL}` : ''}. Some states also cap the number of attempts covered by one application fee or limit online attempts. The useful part of a fail is the score sheet: the questions you missed point to the chapters to reread. Use the wait to take full practice tests until you clear your state's pass line with a margin of two or three answers, then go back.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Do I have to pay again after failing the permit test?', a: `It depends on the state. Some application fees cover several attempts within a set period, others charge a fee for each new test. ${f.known.some((s) => /\$/.test(s.retake?.en ?? '')) ? `In our data, ${names(h, f.known.filter((s) => /\$/.test(s.retake?.en ?? '')))} mention a charge in the retake rule itself.` : ''} The fee page of your agency lists any retest charge.` },
        { q: 'Does a failed knowledge test go on my record?', a: 'No. A failed knowledge test is not a traffic violation and does not appear on a driving record or affect insurance. The agency keeps a note of the attempt to enforce its waiting period and attempt limit, and that is all. Once you pass, the permit is issued as for anyone else, with the same holding period.' },
        { q: 'Is there a limit on how many times I can fail?', a: 'Some states limit attempts per application, per year or online, after which you must reapply, pay again or test in person. Others set no limit but keep the waiting period between attempts. The retake rule in the table below quotes what each agency publishes; where it is silent, ask before your second attempt.' },
        { q: 'What is the fastest way to pass on the second try?', a: 'Write down the topics of the questions you missed, as far as you remember them, and reread those handbook chapters first. Then take full practice tests, not single questions, so you train at the real length. Stop when you pass three tests in a row with room to spare. Book the retake only then, not at the first free slot.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      const rows = f.known.map((s) => { const x = h.S(s.code); return [h.sl(s.code), wait(h, s) ?? 'not stated', s.testQ ?? 'not stated', x.need && s.testQ ? `${x.need}/${s.testQ}` : s.testPct ? h.pc(s.testPct) : 'not stated']; });
      return `
<h2>Retake waiting periods in each state</h2>
<p>The wait column quotes the agency rule for the car knowledge test, as published. It applies to the first fail unless the text says otherwise; several states lengthen it after repeated fails or treat minors differently.</p>
${h.table(['State', 'Wait after a fail', 'Questions', 'To pass'], rows, `Knowledge test retake rules, ${f.known.length} jurisdictions with a published rule.`, ['l', 'l', 'r', 'r'])}
<p>${f.silent.length ? `No retake rule appears on the pages we read for ${names(h, f.silent)}. In those states, the clerk will tell you the earliest return date after a fail.` : 'Every jurisdiction in our data publishes a retake rule.'}</p>
<h2>Why states make you wait</h2>
<p>A waiting period stops applicants from guessing their way through the question bank in one afternoon. A one-day wait mostly blocks same-day repeats; a week or two forces some study. ${f.longest ? `${h.sl(f.longest.code)} has the longest wait in our data, ${f.longest.retakeDays} days.` : ''} The wait is counted in calendar days unless the rule says business days, in which case weekends and state holidays do not count.</p>
<h2>Read your score before you leave</h2>
<p>Most testing systems show the result on screen and some print the topics missed. Note them before you leave the office. A fail is rarely spread evenly: it usually comes from two or three areas, often numbers (distances, speeds, BAC limits), right of way at four-way stops, or signals such as the flashing yellow arrow. Our ${h.a('road-signs', 'road signs test')} isolates the sign and signal questions, and the full ${h.a('dmv-written-test', 'written test practice')} covers the rest.</p>
<h2>A study plan for the waiting period</h2>
<ol>
<li><strong>Day 1.</strong> Reread the handbook chapters behind your missed questions. Do not reread the whole book.</li>
<li><strong>Day 2.</strong> Take a full practice test at your state length. Read every explanation, even for correct answers you guessed.</li>
<li><strong>Each day after.</strong> One full test. Track your number of mistakes against the limit of your state, which the ${h.a('how-many-questions', 'question count guide')} gives.</li>
<li><strong>Before booking.</strong> Three passes in a row, each with two or three mistakes to spare.</li>
</ol>
<h2>Nerves, reading and accommodations</h2>
<p>Not every fail comes from a lack of knowledge. Some applicants rush, misread a "not" in the question, or freeze at the screen. Practice tests help with that too: doing several at full length makes the format familiar. If reading in English is the obstacle, ask whether your state offers the test in another language or in audio; the ${h.a('spanish', 'Spanish test guide')} lists the states that confirm a Spanish version. A documented disability can also justify extra time or a reader, which the agency arranges on request before the test.</p>
<h2>On the retake day</h2>
<p>Bring the same documents as the first time, plus any receipt or form you were given after the fail. Expect a new set of questions: the bank is large, so memorizing the first test does not help. Take your time on each item, read all the options, and skip none: a blank answer counts as wrong. When you pass, the permit is issued and your holding period starts that day. This site is independent; your state agency sets every rule quoted here.</p>`;
    },
  },
  es: {
    slug: 'reprobe-el-examen-del-permiso',
    nav: '¿Reprobó el examen del permiso?',
    card: 'Cuánto esperar para repetir en cada estado, y cómo convertir un fallo en aprobado la próxima vez.',
    title: 'Reprobé el examen del permiso: espera por estado y qué hacer',
    description: 'Si reprobó el examen del permiso: cuánto espera para repetir el examen teórico en cada estado, lo que puede costar y un plan para aprobar la próxima vez.',
    h1: '¿Reprobó el examen del permiso? Cuándo puede repetirlo',
    intro: 'Elija su estado: la herramienta muestra cuánto tiempo hace esperar la agencia tras reprobar el examen teórico y cuántas respuestas correctas necesita la próxima vez.',
    resume: (h) => {
      const f = F(h);
      return `Reprobar el examen escrito del permiso es frecuente, y en la mayoría de los estados el costo es una espera corta, a veces una tarifa, y nunca una anotación en su historial de manejo. De las ${h.counts.states} jurisdicciones de nuestros datos, ${f.known.length} publican una regla para repetirlo. ${f.sameDay.length ? `${f.sameDay.length} permiten otro intento el mismo día (${names(h, f.sameDay)}), ` : ''}${f.nextDay.length} hacen volver al día siguiente o tras 24 horas, y ${f.weekPlus.length} imponen una semana o más${f.longest ? `; la espera más larga es de ${f.longest.retakeDays} días, en ${h.S(f.longest.code).nameL}` : ''}. Algunos estados también limitan los intentos que cubre una misma solicitud o los intentos en línea. Lo útil de reprobar es la hoja de resultados: las preguntas falladas señalan los capítulos que hay que releer. Aproveche la espera para hacer exámenes de práctica completos hasta superar la nota de su estado con dos o tres respuestas de margen, y entonces vuelva.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: '¿Tengo que pagar otra vez si repruebo el examen del permiso?', a: `Depende del estado. Algunas tarifas de solicitud cubren varios intentos durante cierto plazo; otras cobran cada nuevo examen. ${f.known.some((s) => /\$/.test(s.retake?.en ?? '')) ? `En nuestros datos, ${names(h, f.known.filter((s) => /\$/.test(s.retake?.en ?? '')))} mencionan un cargo en la propia regla para repetir.` : ''} La página de tarifas de su agencia indica si hay un cargo por volver a presentarlo.` },
        { q: '¿Reprobar el examen teórico queda en mi historial?', a: 'No. Reprobar el examen teórico no es una infracción de tránsito, no aparece en su historial de manejo y no afecta al seguro. La agencia solo anota el intento para aplicar la espera y el límite de intentos. Cuando apruebe, el permiso se emite como a cualquier otra persona, con el mismo tiempo mínimo.' },
        { q: '¿Hay un límite de veces que puedo reprobar?', a: 'Algunos estados limitan los intentos por solicitud, por año o en línea; después hay que volver a solicitar, pagar de nuevo o presentarlo en persona. Otros no fijan límite pero mantienen la espera entre intentos. La tabla de abajo resume la regla que publica cada agencia; si no dice nada, pregunte antes del segundo intento.' },
        { q: '¿Cuál es la forma más rápida de aprobar en el segundo intento?', a: 'Anote los temas de las preguntas que falló, hasta donde los recuerde, y relea primero esos capítulos del manual. Después haga exámenes de práctica completos, no preguntas sueltas, para entrenar con la duración real. Pare cuando apruebe tres seguidos con margen. Solo entonces pida la nueva cita, no en el primer hueco libre.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      const rows = f.known.map((s) => { const x = h.S(s.code); return [h.sl(s.code), wait(h, s) ?? h.os(s.code, 'retake', 'regla oficial'), s.testQ ?? 'sin dato', x.need && s.testQ ? `${x.need}/${s.testQ}` : s.testPct ? h.pc(s.testPct) : 'sin dato']; });
      return `
<h2>Espera para repetir en cada estado</h2>
<p>La columna de espera da el tiempo mínimo que fija la agencia para volver a presentar el examen teórico de auto. Vale para el primer fallo salvo que la regla diga otra cosa; varios estados la alargan tras fallos repetidos o tratan distinto a los menores, y la regla completa está en la fuente oficial de cada estado.</p>
${h.table(['Estado', 'Espera', 'Preguntas', 'Para aprobar'], rows, `Reglas para repetir el examen teórico, ${f.known.length} jurisdicciones con una regla publicada.`, ['l', 'l', 'r', 'r'])}
<p>${f.silent.length ? `En las páginas que leímos no aparece ninguna regla para repetir en ${names(h, f.silent)}. Allí, el empleado le dirá la primera fecha posible tras reprobar.` : 'Todas las jurisdicciones de nuestros datos publican una regla para repetir.'}</p>
<h2>Por qué los estados hacen esperar</h2>
<p>La espera evita que alguien adivine todo el banco de preguntas en una sola tarde. Un día de espera sobre todo impide repetir en el acto; una o dos semanas obligan a estudiar. ${f.longest ? `${h.sl(f.longest.code)} tiene la espera más larga de nuestros datos, ${f.longest.retakeDays} días.` : ''} La espera se cuenta en días de calendario, salvo que la regla hable de días hábiles: entonces no cuentan los fines de semana ni los feriados estatales.</p>
<h2>Revise su resultado antes de salir</h2>
<p>La mayoría de los sistemas muestran el resultado en pantalla y algunos imprimen los temas fallados. Anótelos antes de salir de la oficina. Un fallo casi nunca se reparte por igual: suele venir de dos o tres áreas, a menudo cifras (distancias, velocidades, límites de alcohol), el derecho de paso en un alto de cuatro vías, o semáforos como la flecha amarilla intermitente. Nuestro ${h.a('road-signs', 'examen de señales')} separa las preguntas de señales y semáforos, y la ${h.a('dmv-written-test', 'práctica del examen escrito')} cubre el resto.</p>
<h2>Un plan de estudio para la espera</h2>
<ol>
<li><strong>Día 1.</strong> Relea los capítulos del manual que corresponden a sus errores. No relea el libro entero.</li>
<li><strong>Día 2.</strong> Haga un examen de práctica completo con la duración de su estado. Lea todas las explicaciones, también las de respuestas que acertó por suerte.</li>
<li><strong>Cada día después.</strong> Un examen completo. Cuente sus errores frente al límite de su estado, que da la ${h.a('how-many-questions', 'guía del número de preguntas')}.</li>
<li><strong>Antes de pedir cita.</strong> Tres aprobados seguidos, cada uno con dos o tres errores de margen.</li>
</ol>
<h2>Nervios, lectura y ajustes</h2>
<p>No todos los fallos vienen de no saber. Hay quien se apura, lee mal un «no» en la pregunta o se bloquea frente a la pantalla. Los exámenes de práctica también ayudan con eso: hacer varios con la duración real vuelve familiar el formato. Si el obstáculo es leer en inglés, pregunte si su estado ofrece el examen en otro idioma o en audio; la ${h.a('spanish', 'guía del examen en español')} indica qué estados confirman la versión en español. Una discapacidad documentada también puede justificar más tiempo o un lector, que la agencia organiza si se pide antes del examen.</p>
<h2>El día del nuevo intento</h2>
<p>Lleve los mismos documentos que la primera vez, más cualquier recibo o formulario que le dieran tras reprobar. Espere preguntas nuevas: el banco es grande, así que memorizar el primer examen no sirve. Tómese su tiempo en cada pregunta, lea todas las opciones y no deje ninguna en blanco: una respuesta vacía cuenta como error. Al aprobar, se emite el permiso y su tiempo mínimo empieza ese día. Este sitio es independiente; la agencia de su estado fija todas las reglas citadas aquí.</p>`;
    },
  },
});
