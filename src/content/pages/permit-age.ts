import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

/** Shared figures of the page, read from the state file (never typed in). */
const F = (h: Helpers) => {
  const withAge = h.STATES.filter((s) => s.permitAge != null);
  const youngest = h.rank((s) => s.permitAge)[0];
  const oldest = h.rank((s) => s.permitAge, -1)[0];
  const at14 = withAge.filter((s) => (s.permitAge as number) < 15);
  const at16 = withAge.filter((s) => (s.permitAge as number) >= 16);
  const longHold = h.rank((s) => s.holdMonths, -1)[0];
  const ca = h.S('CA');
  return { withAge, youngest, oldest, at14, at16, longHold, ca };
};

export default definePage({
  id: 'permit-age',
  group: 'rules',
  order: 10,
  tool: { kind: 'timeline' },
  related: ['home', 'rules-by-state', 'supervised-hours', 'teen-restrictions', 'fees'],
  sources: ['nhtsa_teen', 'handbooks'],
  en: {
    slug: 'permit-age-calculator',
    nav: 'When can I get my permit?',
    card: 'Date of birth and state: your permit, provisional and full license dates.',
    title: 'Permit Age Calculator: Your Permit and License Dates',
    description: 'Permit age calculator for every US state: enter a date of birth to get the earliest learner permit, provisional and full license dates, hours and DMV fees.',
    h1: 'When can I get my permit? Your dates, state by state',
    intro: 'Enter a date of birth and a state: the earliest day for the learner permit, the provisional license and the end of teen restrictions, with the hours to log.',
    resume: (h) => {
      const { withAge, youngest, oldest, at14, ca } = F(h);
      return `The minimum age for a learner permit ranges from ${h.ageLabel(youngest.permitAge)} in ${h.sl(youngest.code)} to ${h.ageLabel(oldest.permitAge)} in ${h.sl(oldest.code)}, across the ${withAge.length} states whose rule we confirmed on an official page. ${at14.length} of them let a teen start before 15. The permit is only the first of three stages of graduated licensing: after a minimum time with the permit and a log of supervised hours comes a provisional (intermediate) license with night and passenger limits, then a full license once the teen reaches the age the state sets. In California, for example, the permit comes at ${ca.permitAgeL}, must be held ${ca.holdL} with ${ca.hours ?? h.nc} hours of practice, and the provisional license is possible at ${ca.interAgeL}. The calculator above applies those three rules to a date of birth: the later of the age limit and the holding period decides each date.`;
    },
    faqs: (h) => {
      const { youngest, at16, ca } = F(h);
      return [
        { q: 'Can I take the permit test before my birthday?', a: `Most states let you study and book early, but the permit itself is only issued on or after the day you reach the minimum age. ${h.S(youngest.code).nameL} allows it from ${h.ageLabel(youngest.permitAge)}, the youngest in our data. A few agencies let a teen take the written test some weeks before that age and keep the result; the state page says so when the official text does.` },
        { q: 'Does the holding period start on the day I pass the test?', a: `It starts on the day the permit is issued, which is usually the day you pass the knowledge test and pay the fee. In California the permit must be held ${ca.holdL} before the drive test for a provisional license. If you enter that date in the calculator, the provisional date moves accordingly; leave it empty to see the earliest legal date.` },
        { q: 'Which states make you wait until 16 for a permit?', a: `${at16.length ? `${at16.map((s) => h.S(s.code).nameL).join(', ')} set the permit age at 16 or later among the states we confirmed.` : 'None of the states we confirmed sets the permit age at 16 or later.'} Teens there go through the same stages, compressed into a shorter time, and some reach a full license at 17 or 18 as elsewhere.` },
        { q: 'What changes if I am 18 or older?', a: 'Graduated licensing is written for drivers under 18 in most states. An adult still needs to pass the knowledge test and usually holds a permit before the road test, but the holding period, hour log and provisional stage often do not apply or are shorter. The calculator shows the teen rules; the state page lists the adult exceptions the agency publishes.' },
      ];
    },
    body: (h) => {
      const { withAge, longHold } = F(h);
      const rows = h.STATES.map((s) => { const x = h.S(s.code); return [h.sl(s.code), h.ageShort(s.permitAge), x.holdMonths ?? '–', x.hours ?? '–', h.ageShort(s.interAge), h.ageShort(s.fullAge)]; });
      return `
<h2>The three stages, and which rule wins</h2>
<p>Every state now licenses teens in stages, an approach NHTSA describes in its ${h.src('nhtsa_teen', 'teen driver guidance')}. The dates in the calculator follow from three numbers per state, each read on the state agency page or handbook:</p>
<ul>
<li><strong>Permit age.</strong> The day you reach it, you may apply for the learner (instruction) permit, pass the knowledge test and the vision check.</li>
<li><strong>Holding period.</strong> The permit must be held for a minimum number of months before the road test for the next stage. ${longHold ? `The longest in our data is ${h.num(longHold.holdMonths as number)} months, in ${h.sl(longHold.code)}.` : ''}</li>
<li><strong>Provisional age.</strong> Even with the months done, the intermediate license cannot be issued before a set age. The provisional date is therefore the later of the two: permit date plus holding period, or the provisional age.</li>
</ul>
<p>A teen who starts the permit late, say at 16 in a state that allows it at 15, reaches the provisional stage when the holding period ends rather than at the minimum age. That is why the calculator asks for the permit date if you already have one: it replaces the earliest legal date and moves everything after it.</p>
<h2>Ages and months in every state</h2>
<p>The table lists the four figures behind the calculator for the ${h.counts.states} jurisdictions. A dash means the agency pages we read do not state the figure; the site does not fill it from another source. Ages are in years; ½ means six months, ¼ three months and ¾ nine.</p>
${h.table(['State', 'Permit', 'Months held', 'Hours', 'Provisional', 'Full'], rows, `Graduated licensing for drivers under 18. ${withAge.length} states with a confirmed permit age.`, ['l', 'r', 'r', 'r', 'r', 'r'])}
<h2>What the calculator does not know</h2>
<p>It counts calendar dates from your birthday, the way the agencies do, but it cannot see holidays, office hours or appointment waits, and it does not check whether a driver education course or school attendance form is complete. Some states shorten the holding period or the hour log for teens who finish an approved course; when the official page says so, the state page explains it. The supervised hours are those the state requires before the road test; the ${h.a('supervised-hours', 'hours guide')} has a counter for what is left.</p>
<!--tool:mini:permitage-->
<p>Fees are the state's own charges for the permit and the first license, without driving school, insurance or photo services. In states where one application fee covers both, it is counted once.</p>`;
    },
  },
  es: {
    slug: 'calculadora-edad-permiso',
    nav: '¿Cuándo puedo sacar el permiso?',
    card: 'Fecha de nacimiento y estado: fechas del permiso, la licencia provisional y la completa.',
    title: 'Edad del permiso de manejo: calcule sus fechas por estado',
    description: 'Calculadora de la edad del permiso en cada estado: con la fecha de nacimiento, el primer día del permiso, de la licencia provisional y de la completa.',
    h1: '¿Cuándo puedo sacar el permiso? Sus fechas por estado',
    intro: 'Indique una fecha de nacimiento y un estado: el primer día del permiso, de la licencia provisional y del fin de las restricciones, con las horas que debe registrar.',
    resume: (h) => {
      const { withAge, youngest, oldest, at14, ca } = F(h);
      return `La edad mínima para el permiso de aprendizaje va de ${h.ageLabel(youngest.permitAge)} en ${h.sl(youngest.code)} a ${h.ageLabel(oldest.permitAge)} en ${h.sl(oldest.code)}, entre los ${withAge.length} estados cuya regla confirmamos en una página oficial. ${at14.length} de ellos permiten empezar antes de los 15. El permiso es solo la primera de las tres etapas de la licencia graduada: tras un tiempo mínimo con el permiso y un registro de horas de manejo supervisado viene una licencia provisional (intermedia) con límites de noche y de pasajeros, y luego la licencia completa al llegar a la edad que fija el estado. En California, por ejemplo, el permiso llega a los ${ca.permitAgeL}, hay que tenerlo ${ca.holdL} con ${ca.hours ?? h.nc} horas de práctica y la licencia provisional es posible a los ${ca.interAgeL}. La calculadora aplica esas tres reglas a una fecha de nacimiento: cada fecha la decide la más tardía entre el límite de edad y el tiempo con el permiso.`;
    },
    faqs: (h) => {
      const { youngest, at16, ca } = F(h);
      return [
        { q: '¿Puedo hacer el examen del permiso antes de mi cumpleaños?', a: `La mayoría de los estados le deja estudiar y pedir cita antes, pero el permiso solo se otorga a partir del día en que cumple la edad mínima. ${h.S(youngest.code).nameL} lo permite desde los ${h.ageLabel(youngest.permitAge)}, la edad más baja de nuestros datos. Algunas agencias aceptan el examen escrito unas semanas antes y guardan el resultado; la página del estado lo indica cuando el texto oficial lo dice.` },
        { q: '¿El tiempo con el permiso empieza el día que apruebo el examen?', a: `Empieza el día en que se emite el permiso, que suele ser el día en que aprueba el examen teórico y paga la tarifa. En California hay que tenerlo ${ca.holdL} antes del examen de manejo de la licencia provisional. Si escribe esa fecha en la calculadora, la fecha provisional se desplaza; si la deja vacía, ve la fecha legal más temprana.` },
        { q: '¿Qué estados hacen esperar hasta los 16 para el permiso?', a: `${at16.length ? `${at16.map((s) => h.S(s.code).nameL).join(', ')} fijan el permiso a los 16 o más entre los estados que confirmamos.` : 'Ninguno de los estados confirmados fija el permiso a los 16 o más.'} Allí los jóvenes pasan por las mismas etapas en menos tiempo, y muchos llegan a la licencia completa a los 17 o 18 como en otros estados.` },
        { q: '¿Qué cambia si tengo 18 años o más?', a: 'En la mayoría de los estados la licencia graduada se aplica a menores de 18. Un adulto debe aprobar el examen teórico y suele tener un permiso antes del examen de manejo, pero el tiempo mínimo, el registro de horas y la etapa provisional a menudo no se aplican o son más cortos. La calculadora muestra las reglas para jóvenes; la página del estado indica las excepciones para adultos que publica la agencia.' },
      ];
    },
    body: (h) => {
      const { withAge, longHold } = F(h);
      const rows = h.STATES.map((s) => { const x = h.S(s.code); return [h.sl(s.code), h.ageShort(s.permitAge), x.holdMonths ?? '–', x.hours ?? '–', h.ageShort(s.interAge), h.ageShort(s.fullAge)]; });
      return `
<h2>Las tres etapas y qué regla manda</h2>
<p>Todos los estados otorgan hoy la licencia a los jóvenes por etapas, un sistema que la NHTSA describe en su ${h.src('nhtsa_teen', 'guía para conductores adolescentes')}. Las fechas de la calculadora salen de tres cifras por estado, leídas en la página de la agencia o en el manual:</p>
<ul>
<li><strong>Edad del permiso.</strong> El día en que la cumple puede solicitar el permiso de aprendizaje, aprobar el examen teórico y la prueba de la vista.</li>
<li><strong>Tiempo con el permiso.</strong> Hay que tenerlo un número mínimo de meses antes del examen de manejo de la siguiente etapa. ${longHold ? `El más largo de nuestros datos es de ${h.num(longHold.holdMonths as number)} meses, en ${h.sl(longHold.code)}.` : ''}</li>
<li><strong>Edad de la licencia provisional.</strong> Aunque haya cumplido los meses, la licencia intermedia no se emite antes de cierta edad. La fecha provisional es la más tardía de las dos: fecha del permiso más el tiempo mínimo, o la edad provisional.</li>
</ul>
<p>Un joven que saca el permiso tarde, por ejemplo a los 16 en un estado que lo permite a los 15, llega a la etapa provisional cuando termina el tiempo mínimo y no a la edad mínima. Por eso la calculadora pide la fecha del permiso si ya lo tiene: sustituye a la fecha legal más temprana y desplaza todo lo que sigue.</p>
<h2>Edades y meses en cada estado</h2>
<p>La tabla reúne las cuatro cifras que usa la calculadora para las ${h.counts.states} jurisdicciones. Un guion significa que las páginas de la agencia que leímos no indican la cifra; el sitio no la completa con otra fuente. Las edades están en años; ½ son seis meses, ¼ tres y ¾ nueve.</p>
${h.table(['Estado', 'Permiso', 'Meses', 'Horas', 'Provisional', 'Completa'], rows, `Licencia graduada para menores de 18 años. ${withAge.length} estados con edad del permiso confirmada.`, ['l', 'r', 'r', 'r', 'r', 'r'])}
<h2>Lo que la calculadora no sabe</h2>
<p>Cuenta fechas de calendario a partir de su cumpleaños, como hacen las agencias, pero no ve los feriados, los horarios ni la espera para una cita, y no comprueba si terminó un curso de educación vial o el formulario de asistencia escolar. Algunos estados acortan el tiempo mínimo o las horas para quien termina un curso aprobado; cuando la página oficial lo dice, la página del estado lo explica. Las horas supervisadas son las que exige el estado antes del examen de manejo; la ${h.a('supervised-hours', 'guía de horas')} tiene un contador de las que faltan.</p>
<!--tool:mini:permitage-->
<p>Las tarifas son los cargos del propio estado por el permiso y la primera licencia, sin autoescuela, seguro ni servicios de foto. Donde una sola tarifa cubre ambos, se cuenta una vez.</p>`;
    },
  },
});
