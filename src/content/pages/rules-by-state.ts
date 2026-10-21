import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';
import type { StateRec } from '../../lib/engine/states';

/** Compact retake wait, read from the day count of the data (never typed). */
const rt = (h: Helpers, s: StateRec) => {
  const es = h.lang === 'es';
  if (s.retakeDays == null) return s.retake ? (es ? 'variable' : 'varies') : es ? 'sin dato' : 'not stated';
  if (s.retakeDays === 0) return es ? 'mismo día' : 'same day';
  const unit = es ? (s.retakeDays === 1 ? 'día' : 'días') : s.retakeDays === 1 ? 'day' : 'days';
  return `${s.retakeDays} ${unit}${s.retakeBusiness ? (es ? ' hábil' : ' (business)') : ''}`;
};
const F = (h: Helpers) => {
  const all = h.STATES;
  const withQ = all.filter((s) => s.testQ != null);
  const withPct = all.filter((s) => s.testPct != null);
  const withHours = all.filter((s) => s.hours != null);
  const withFee = all.filter((s) => s.permitFee != null);
  const youngest = h.rank((s) => s.permitAge)[0];
  const oldest = h.rank((s) => s.permitAge, -1)[0];
  const mostQ = h.rank((s) => s.testQ, -1)[0];
  const fewQ = h.rank((s) => s.testQ)[0];
  const hiPct = h.rank((s) => s.testPct, -1)[0];
  const loPct = h.rank((s) => s.testPct)[0];
  const mostH = h.rank((s) => s.hours, -1)[0];
  const leastH = h.rank((s) => s.hours)[0];
  const cheap = h.rank((s) => s.permitFee)[0];
  const dear = h.rank((s) => s.permitFee, -1)[0];
  const at80 = withPct.filter((s) => Math.abs((s.testPct as number) - 0.8) < 0.001).length;
  return { all, withQ, withPct, withHours, withFee, youngest, oldest, mostQ, fewQ, hiPct, loPct, mostH, leastH, cheap, dear, at80 };
};
const pass = (h: Helpers, s: StateRec, none: string) => {
  const x = h.S(s.code);
  return x.need && s.testQ ? `${x.need}/${s.testQ}` : s.testPct ? h.pc(s.testPct) : none;
};

export default definePage({
  id: 'rules-by-state',
  group: 'rules',
  order: 20,
  tool: { kind: 'mini:compare' },
  related: ['permit-age', 'how-many-questions', 'supervised-hours', 'fees', 'state-tx', 'state-ny'],
  sources: ['handbooks', 'nhtsa_teen'],
  en: {
    slug: 'permit-test-rules-by-state',
    nav: 'Permit rules by state',
    card: 'Permit age, test length, pass mark, retake wait, hours and fee for every state in one table.',
    title: 'Permit Test Rules by State: Ages, Questions, Hours, Fees',
    description: 'Permit test rules by state in one table: learner permit age, number of questions, pass mark, retake wait, supervised hours and permit fee, from official pages.',
    h1: 'Permit test rules by state, side by side',
    intro: 'Pick two states in the tool to compare them line by line, or read the full table below: six rules for every jurisdiction, each one read on the agency page.',
    resume: (h) => {
      const f = F(h);
      return `Learner permit rules differ more from one state to the next than most families expect. The minimum permit age runs from ${f.youngest ? `${h.ageLabel(f.youngest.permitAge)} in ${h.S(f.youngest.code).nameL}` : h.nc} to ${f.oldest ? `${h.ageLabel(f.oldest.permitAge)} in ${h.S(f.oldest.code).nameL}` : h.nc}. The written knowledge test is ${f.fewQ && f.mostQ ? `between ${f.fewQ.testQ} questions (${h.S(f.fewQ.code).nameL}) and ${f.mostQ.testQ} (${h.S(f.mostQ.code).nameL})` : 'of a length most agencies do not publish'} where the agency states a length, and the pass mark ranges from ${f.loPct ? h.pc(f.loPct.testPct as number) : h.nc} to ${f.hiPct ? h.pc(f.hiPct.testPct as number) : h.nc}, with ${f.at80} states at exactly 80 %. Supervised practice before the road test goes from ${f.leastH ? `${f.leastH.hours} hours in ${h.S(f.leastH.code).nameL}` : h.nc} to ${f.mostH ? `${f.mostH.hours} hours in ${h.S(f.mostH.code).nameL}` : h.nc}. Permit fees run from ${f.cheap ? `${h.m(f.cheap.permitFee as number)} (${h.S(f.cheap.code).nameL})` : h.nc} to ${f.dear ? `${h.m(f.dear.permitFee as number)} (${h.S(f.dear.code).nameL})` : h.nc}. The table covers ${f.all.length} jurisdictions; a cell reads "not stated" when the official pages we read do not give the figure. Use the comparison tool above to set two states next to each other before a move, or to see how your own state ranks on each rule.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Which state has the easiest permit test?', a: `No state is easy in a meaningful sense, but the numbers differ. ${f.loPct ? `${h.S(f.loPct.code).nameL} has the lowest published pass mark, ${h.pc(f.loPct.testPct as number)}` : 'Few states publish a pass mark'}, and ${f.fewQ ? `${h.S(f.fewQ.code).nameL} the shortest published test, ${f.fewQ.testQ} questions` : 'test lengths are rarely published'}. A shorter test leaves less room for error, so each wrong answer weighs more.` },
        { q: 'Can I get my permit in a different state than where I live?', a: 'No. A learner permit is issued by the state where you reside, and the agency asks for proof of residency at the counter. If you move, the new state decides whether your permit, test result or logged hours carry over. Compare the two states with the tool above, then check the new agency page before you book anything.' },
        { q: 'Why do some cells in the table say not stated?', a: `Every figure comes from an official agency page or handbook, with its link kept in our data. When we could not find a figure in those documents, we leave it blank rather than copy it from a third-party site. Of the ${f.all.length} jurisdictions listed, ${f.all.length - f.withQ.length} do not publish a question count on the pages we read.` },
        { q: 'How often do these permit rules change?', a: 'Legislatures adjust graduated licensing every few years: an hour requirement goes up, a passenger rule tightens, a fee is raised with the state budget. Agencies update their handbooks on their own schedule, sometimes months later. The data on this page shows the date it was read, and each state page links to the official source for every number.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      const ns = 'not stated';
      const rows = f.all.map((s) => [h.sl(s.code), s.permitAge == null ? ns : h.ageShort(s.permitAge), s.testQ ?? ns, pass(h, s, ns), rt(h, s), s.hours ?? ns, s.permitFee == null ? ns : h.m(s.permitFee)]);
      const twoSpeed = f.withHours.filter((s) => (s.hours as number) >= 50).length;
      return `
<h2>Six permit rules for every state</h2>
<p>Each row below brings together the figures a teen or an adult beginner asks about first. The permit age is the earliest birthday at which the learner permit can be issued. The questions and pass columns describe the written knowledge test; when a state publishes both the length and the number of correct answers, the pass column shows them as a fraction, otherwise as a percentage. The retake column gives the wait after a failed attempt. Hours are the supervised practice required before the road test for drivers under 18, and the fee is what the state charges for the permit itself.</p>
${h.table(['State', 'Permit age', 'Questions', 'Pass', 'Retake', 'Hours', 'Permit fee'], rows, `Knowledge test and learner permit rules, ${f.all.length} jurisdictions. Ages in years (½ = six months). Data read on ${h.date(h.META.retrieved)}.`, ['l', 'r', 'r', 'r', 'l', 'r', 'r'])}
<h2>Where the states disagree the most</h2>
<p><strong>Age.</strong> The gap between the earliest and the latest permit age is a full ${f.youngest && f.oldest ? h.num((f.oldest.permitAge as number) - (f.youngest.permitAge as number), 1).replace(/\.0$/, '') : h.nc} years. Rural states with long distances to school tend to start young; dense Northeastern states tend to wait until 16. A family that moves across a state line can find a teen suddenly too young, or old enough, for a permit.</p>
<p><strong>Test length.</strong> Only ${f.withQ.length} of the ${f.all.length} jurisdictions state how many questions their knowledge test has on the pages we read. Among them the longest test has ${f.mostQ ? f.mostQ.testQ : h.nc} questions, more than ${f.fewQ && f.mostQ ? h.num((f.mostQ.testQ as number) / (f.fewQ.testQ as number), 1) : h.nc} times the shortest. The ${h.a('how-many-questions', 'question count guide')} turns each length into the number of mistakes you can afford.</p>
<p><strong>Pass mark.</strong> ${f.withPct.length} states publish a percentage or a count we can turn into one, and ${f.at80} of them sit at 80 %. The outliers matter: in a state at ${f.loPct ? h.pc(f.loPct.testPct as number) : h.nc} you may miss more than one question in four, while at ${f.hiPct ? h.pc(f.hiPct.testPct as number) : h.nc} the margin shrinks to a handful.</p>
<p><strong>Practice hours.</strong> ${twoSpeed} of the ${f.withHours.length} states with a published hour count ask for 50 hours or more. ${f.mostH ? `${h.sl(f.mostH.code)} asks for the most, ${f.mostH.hours} hours` : ''}${f.leastH ? `, while ${h.sl(f.leastH.code)} asks for ${f.leastH.hours}` : ''}. The ${h.a('supervised-hours', 'hours guide')} shows how many hours a week that means over the holding period.</p>
<p><strong>Fees.</strong> The permit fee alone ranges from ${f.cheap ? h.m(f.cheap.permitFee as number) : h.nc} to ${f.dear ? h.m(f.dear.permitFee as number) : h.nc}, and several states charge separately for the test, the photo or the license that follows. The ${h.a('fees', 'fee comparison')} adds the license to give the full public cost.</p>
<h2>One framework, fifty sets of numbers</h2>
<p>All states license teens in three steps (learner permit, intermediate license, full license), a model NHTSA promotes in its ${h.src('nhtsa_teen', 'teen driving program')}. The framework is common; the dials are local. A state can lower the permit age but lengthen the holding period, or ask for few hours but a long course. That is why comparing one rule at a time can mislead: a state with a young permit age may still be among the last to grant an unrestricted license. The ${h.a('permit-age', 'date calculator')} combines the three timing rules for a given birthday.</p>
<h2>How the figures were collected</h2>
<p>Each value was read on the state agency website or in its driver handbook, and the page address is stored with the figure. We do not average, estimate or copy figures from commercial sites. Our dataset currently holds ${h.META.fields} confirmed values and ${h.META.nulls} empty ones; the empty cells are the honest result of agencies that leave a rule unstated, or state it only at the counter. If you see a rule that changed, the state page links to the source where you can confirm it. This site is an independent study aid, not a motor vehicle agency, and the official handbook always prevails.</p>`;
    },
  },
  es: {
    slug: 'reglas-del-permiso-por-estado',
    nav: 'Reglas del permiso por estado',
    card: 'Edad del permiso, preguntas, nota, espera, horas y tarifa de cada estado en una sola tabla.',
    title: 'Reglas del permiso por estado: edad, examen, horas y costo',
    description: 'Reglas del permiso de manejo por estado en una tabla: edad mínima, número de preguntas, nota para aprobar, espera, horas de práctica y tarifa del permiso.',
    h1: 'Reglas del permiso de manejo por estado',
    intro: 'Elija dos estados en la herramienta para compararlos línea por línea, o consulte la tabla completa: seis reglas por jurisdicción, todas tomadas de la página de la agencia.',
    resume: (h) => {
      const f = F(h);
      return `Las reglas del permiso de aprendizaje cambian mucho de un estado a otro. La edad mínima va de ${f.youngest ? `${h.ageLabel(f.youngest.permitAge)} en ${h.S(f.youngest.code).nameL}` : h.nc} a ${f.oldest ? `${h.ageLabel(f.oldest.permitAge)} en ${h.S(f.oldest.code).nameL}` : h.nc}. Donde la agencia publica la duración, el examen teórico tiene ${f.fewQ && f.mostQ ? `entre ${f.fewQ.testQ} preguntas (${h.S(f.fewQ.code).nameL}) y ${f.mostQ.testQ} (${h.S(f.mostQ.code).nameL})` : 'una duración que casi ningún estado publica'}, y la nota mínima va del ${f.loPct ? h.pc(f.loPct.testPct as number) : h.nc} al ${f.hiPct ? h.pc(f.hiPct.testPct as number) : h.nc}; ${f.at80} estados piden exactamente el 80 %. Las horas de manejo supervisado antes del examen práctico van de ${f.leastH ? `${f.leastH.hours} en ${h.S(f.leastH.code).nameL}` : h.nc} a ${f.mostH ? `${f.mostH.hours} en ${h.S(f.mostH.code).nameL}` : h.nc}. La tarifa del permiso cuesta desde ${f.cheap ? `${h.m(f.cheap.permitFee as number)} (${h.S(f.cheap.code).nameL})` : h.nc} hasta ${f.dear ? `${h.m(f.dear.permitFee as number)} (${h.S(f.dear.code).nameL})` : h.nc}. La tabla reúne ${f.all.length} jurisdicciones; cuando las páginas oficiales que leímos no dan una cifra, la casilla dice «sin dato» en lugar de suponerla. Con la herramienta de comparación puede poner dos estados lado a lado antes de una mudanza, o ver dónde queda el suyo en cada regla.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: '¿En qué estado es más fácil aprobar el examen del permiso?', a: `Ninguno lo regala, pero las cifras varían. ${f.loPct ? `${h.S(f.loPct.code).nameL} tiene la nota publicada más baja, el ${h.pc(f.loPct.testPct as number)}` : 'Pocos estados publican la nota'}, y ${f.fewQ ? `${h.S(f.fewQ.code).nameL} el examen publicado más corto, de ${f.fewQ.testQ} preguntas` : 'casi nadie publica la duración'}. Ojo: en un examen corto cada error pesa más, así que el margen real puede ser pequeño.` },
        { q: '¿Puedo sacar el permiso en un estado donde no vivo?', a: 'No. El permiso lo otorga el estado de residencia, y la agencia pide un comprobante de domicilio en la oficina. Si se muda, el nuevo estado decide si acepta su permiso, su examen aprobado o sus horas registradas. Compare ambos estados con la herramienta de arriba y revise la página de la nueva agencia antes de pedir cita.' },
        { q: '¿Por qué algunas casillas de la tabla dicen sin dato?', a: `Cada cifra viene de una página oficial o de un manual de la agencia, y guardamos el enlace. Si no la encontramos en esos documentos, dejamos la casilla vacía en vez de copiarla de un sitio comercial. De las ${f.all.length} jurisdicciones de la tabla, ${f.all.length - f.withQ.length} no publican el número de preguntas en las páginas que leímos.` },
        { q: '¿Cada cuánto cambian estas reglas?', a: 'Las legislaturas ajustan la licencia graduada cada pocos años: suben las horas, endurecen la regla de pasajeros o aumentan una tarifa con el presupuesto. Las agencias actualizan sus manuales a su ritmo, a veces meses después. Esta página indica la fecha en que se leyeron los datos, y cada página de estado enlaza la fuente oficial de cada cifra.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      const ns = 'sin dato';
      const rows = f.all.map((s) => [h.sl(s.code), s.permitAge == null ? ns : h.ageShort(s.permitAge), s.testQ ?? ns, pass(h, s, ns), rt(h, s), s.hours ?? ns, s.permitFee == null ? ns : h.m(s.permitFee)]);
      const fifty = f.withHours.filter((s) => (s.hours as number) >= 50).length;
      return `
<h2>Seis reglas para cada estado</h2>
<p>Cada fila junta lo que un adolescente o un adulto principiante pregunta primero. La edad es el cumpleaños a partir del cual se puede emitir el permiso de aprendizaje. Las columnas de preguntas y de nota se refieren al examen teórico escrito: si el estado publica la duración y las respuestas correctas, la nota aparece como fracción; si solo publica un porcentaje, aparece así. La espera es el tiempo antes de repetir tras reprobar. Las horas son las de práctica supervisada que se exigen a los menores de 18 antes del examen de manejo, y la tarifa es lo que cobra el estado por el permiso.</p>
${h.table(['Estado', 'Edad', 'Preguntas', 'Nota', 'Espera', 'Horas', 'Tarifa'], rows, `Examen teórico y permiso de aprendizaje, ${f.all.length} jurisdicciones. Edades en años (½ = seis meses). Datos leídos el ${h.date(h.META.retrieved)}.`, ['l', 'r', 'r', 'r', 'l', 'r', 'r'])}
<h2>Dónde difieren más los estados</h2>
<p><strong>La edad.</strong> Entre el permiso más temprano y el más tardío hay ${f.youngest && f.oldest ? h.num((f.oldest.permitAge as number) - (f.youngest.permitAge as number), 1).replace(/\.0$/, '') : h.nc} años de diferencia. Los estados rurales, con escuelas lejanas, suelen empezar antes; los del noreste, más poblados, esperan a los 16. Una familia que cruza la frontera de un estado puede descubrir que su hijo ya puede, o todavía no puede, sacar el permiso.</p>
<p><strong>La duración del examen.</strong> Solo ${f.withQ.length} de las ${f.all.length} jurisdicciones indican cuántas preguntas tiene su examen en las páginas que leímos. El más largo tiene ${f.mostQ ? f.mostQ.testQ : h.nc} preguntas, más de ${f.fewQ && f.mostQ ? h.num((f.mostQ.testQ as number) / (f.fewQ.testQ as number), 1) : h.nc} veces el más corto. La ${h.a('how-many-questions', 'guía del número de preguntas')} traduce cada duración en errores permitidos.</p>
<p><strong>La nota.</strong> ${f.withPct.length} estados publican un porcentaje, o un número de respuestas que permite calcularlo, y ${f.at80} de ellos piden el 80 %. Los extremos cuentan: con el ${f.loPct ? h.pc(f.loPct.testPct as number) : h.nc} se puede fallar más de una pregunta de cada cuatro, mientras que con el ${f.hiPct ? h.pc(f.hiPct.testPct as number) : h.nc} el margen se reduce a unas pocas.</p>
<p><strong>Las horas.</strong> ${fifty} de los ${f.withHours.length} estados que publican un número de horas piden 50 o más. ${f.mostH ? `${h.sl(f.mostH.code)} exige la cifra más alta, ${f.mostH.hours} horas` : ''}${f.leastH ? `, y ${h.sl(f.leastH.code)} la más baja, ${f.leastH.hours}` : ''}. La ${h.a('supervised-hours', 'guía de horas')} calcula cuántas horas por semana supone eso durante el tiempo con el permiso.</p>
<p><strong>El costo.</strong> Solo el permiso cuesta entre ${f.cheap ? h.m(f.cheap.permitFee as number) : h.nc} y ${f.dear ? h.m(f.dear.permitFee as number) : h.nc}, y varios estados cobran aparte el examen, la foto o la licencia que viene después. La ${h.a('fees', 'comparación de tarifas')} suma la licencia para dar el costo público total.</p>
<h2>Un mismo sistema, cifras muy distintas</h2>
<p>Todos los estados otorgan la licencia a los jóvenes en tres pasos (permiso, licencia intermedia y licencia completa), el modelo que la NHTSA recomienda en su ${h.src('nhtsa_teen', 'programa sobre jóvenes al volante')}. El esquema es común; los ajustes son locales. Un estado puede bajar la edad del permiso y alargar el tiempo mínimo con él, o pedir pocas horas pero un curso largo. Por eso comparar una sola regla engaña: un estado con permiso temprano puede estar entre los últimos en dar la licencia sin restricciones. La ${h.a('permit-age', 'calculadora de fechas')} combina las tres reglas de tiempo para una fecha de nacimiento.</p>
<h2>Cómo reunimos las cifras</h2>
<p>Cada valor se leyó en el sitio de la agencia estatal o en su manual del conductor, y guardamos la dirección de la página junto a la cifra. No promediamos, no estimamos y no copiamos de sitios comerciales. Hoy la base tiene ${h.META.fields} valores confirmados y ${h.META.nulls} casillas vacías; esas casillas reflejan agencias que no publican la regla o solo la explican en la oficina. Si nota que una regla cambió, la página del estado enlaza la fuente para confirmarlo. Este sitio es una ayuda independiente para estudiar, no una agencia de vehículos, y el manual oficial siempre manda.</p>`;
    },
  },
});
