import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';
import type { StateRec } from '../../lib/engine/states';

const WEEKS_PER_MONTH = 52 / 12;
/** Hours a week needed to log the state requirement within the minimum holding period. */
const perWeek = (s: StateRec) => (s.hours != null && s.holdMonths ? s.hours / (s.holdMonths * WEEKS_PER_MONTH) : null);
const F = (h: Helpers) => {
  const withH = h.STATES.filter((s) => s.hours != null);
  const most = h.rank((s) => s.hours, -1)[0];
  const least = h.rank((s) => s.hours)[0];
  const night = h.STATES.filter((s) => s.nightHours != null && s.nightHours > 0);
  const mostNight = h.rank((s) => s.nightHours, -1)[0];
  const avg = withH.length ? withH.reduce((t, s) => t + (s.hours as number), 0) / withH.length : null;
  const fifty = withH.filter((s) => s.hours === 50).length;
  const hardest = h.rank(perWeek, -1)[0];
  const silent = h.STATES.filter((s) => s.hours == null);
  const paces = h.STATES.map(perWeek).filter((x): x is number => x != null).sort((a, b) => a - b);
  const typical = paces.length ? paces[Math.floor(paces.length / 2)] : null;
  const nc: Record<number, number> = {};
  for (const s of night) nc[s.nightHours as number] = (nc[s.nightHours as number] ?? 0) + 1;
  const nightMode = Object.entries(nc).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
  return { withH, most, least, night, mostNight, avg, fifty, hardest, silent, typical, nightMode };
};

export default definePage({
  id: 'supervised-hours',
  group: 'rules',
  order: 30,
  tool: { kind: 'mini:hours' },
  related: ['permit-age', 'rules-by-state', 'teen-restrictions', 'drivers-ed', 'state-pa', 'state-or'],
  sources: ['nhtsa_teen', 'nhtsa_drowsy', 'handbooks'],
  en: {
    slug: 'supervised-driving-hours',
    nav: 'Supervised driving hours',
    card: 'Hours of supervised practice required before the road test in each state, night hours included.',
    title: 'Supervised Driving Hours by State: Permit Practice Log',
    description: 'Supervised driving hours by state: the practice and night hours a teen must log on the permit before the road test, and the weekly pace to finish in time.',
    h1: 'Supervised driving hours required in each state',
    intro: 'Enter your state and the hours already in your log: the tool shows what is left, day and night. Below, every state requirement and the weekly pace it implies.',
    resume: (h) => {
      const f = F(h);
      return `Most states require a teen to log a set number of supervised driving hours on the learner permit before the road test, signed off by a parent, guardian or other licensed adult. Among the ${f.withH.length} jurisdictions in our data that publish the figure, the requirement goes from ${f.least ? `${f.least.hours} hours in ${h.S(f.least.code).nameL}` : h.nc} to ${f.most ? `${f.most.hours} hours in ${h.S(f.most.code).nameL}` : h.nc}, and ${f.fifty} states settle on exactly 50. The average is ${f.avg != null ? h.num(f.avg) : h.nc} hours. ${f.night.length} states also set a minimum of night hours, most often ${f.nightMode ?? h.nc}, ${f.mostNight ? `up to ${f.mostNight.nightHours} in ${h.S(f.mostNight.code).nameL}` : ''}. Because the permit must also be held for a minimum number of months, the real constraint is the pace: spread over the holding period, the requirement means about ${f.typical != null ? h.num(f.typical, 1) : h.nc} hours a week in the median state, more where the period is short. A few states reduce the hours for teens who complete an approved driver education course.`;
    },
    faqs: (h) => [
      { q: 'Who can sign my supervised driving log?', a: 'Usually a parent, guardian or another licensed adult the state accepts, often 21 or older, who sits in the front passenger seat during the practice. Some states require the parent to certify the total even when another adult supervised part of it. The log form or online certification is described in the state handbook, with the minimum age of the supervisor.' },
      { q: 'Do hours with a driving instructor count toward the total?', a: 'In many states, behind-the-wheel lessons from an approved instructor count toward the log, and in some they replace part of it. The rules are specific: some states count instructor hours one for one, others count them only within a cap. Read the hours section of your state manual, or the state page here, before planning on it.' },
      { q: 'What counts as night driving for the log?', a: 'Night hours are generally hours driven between sunset and sunrise, as defined by the state. They exist because darkness changes everything: distance judgment, glare, tired drivers and pedestrians in dark clothing. Plan them in winter, when it gets dark early and you can practice before dinner instead of late at night.' },
      { q: 'What happens if I lie about my hours?', a: `The log is a signed certification to the state, and a false statement can lead to the cancellation of the permit or the license and, in some states, to penalties for the adult who signed it. More practically, the hours exist because crash risk drops with experience. NHTSA links the first months of solo driving to the highest crash rates.` },
    ],
    body: (h) => {
      const f = F(h);
      const ns = 'not stated';
      const rows = h.rank((s) => s.hours, -1).map((s) => { const w = perWeek(s); return [h.sl(s.code), s.hours as number, s.nightHours ?? ns, s.holdMonths == null ? ns : h.num(s.holdMonths, s.holdMonths % 1 ? 1 : 0), w == null ? ns : h.num(w, 1)]; });
      return `
<h2>Hours required, state by state</h2>
<p>The table ranks every state that publishes an hour requirement, highest first. The last column divides the hours by the minimum holding period, in weeks: it is the pace you need to finish the log on the earliest possible date. Starting later or practicing less only pushes the road test back.</p>
${h.table(['State', 'Total hours', 'Night hours', 'Months on permit', 'Hours a week'], rows, `Supervised practice before the road test, drivers under 18. ${f.withH.length} states with a published requirement.`, ['l', 'r', 'r', 'r', 'r'])}
<p>${f.silent.length ? `No hour requirement appears on the official pages we read for ${f.silent.map((s) => h.S(s.code).nameL).join(', ')}. That can mean the state sets none, or sets it in a statute the agency does not quote.` : 'Every jurisdiction in our data publishes an hour requirement.'}</p>
<h2>The pace that matters</h2>
<p>${f.hardest ? `The tightest schedule is in ${h.sl(f.hardest.code)}, where ${f.hardest.hours} hours must fit in ${h.num(f.hardest.holdMonths as number, (f.hardest.holdMonths as number) % 1 ? 1 : 0)} months, about ${h.num(perWeek(f.hardest) as number, 1)} hours a week.` : ''} ${f.most ? `At the other end of the hour scale, ${h.sl(f.most.code)} asks for ${f.most.hours} hours, but the pace also depends on how long the permit is held.` : ''} A realistic plan is two to four sessions a week: two short drives on school days and a longer one on the weekend. Forty-five minutes is a good length; beyond an hour, a beginner tires and the practice loses value, which is the point NHTSA makes on ${h.src('nhtsa_drowsy', 'drowsy driving')}.</p>
<h2>What to practice, in what order</h2>
<ol>
<li><strong>Empty parking lot.</strong> Starting, stopping, steering, mirrors, backing up. Two or three sessions are enough.</li>
<li><strong>Quiet residential streets.</strong> Stop signs, right turns, speed control, scanning for children and pets.</li>
<li><strong>Busier roads.</strong> Left turns across traffic, lane changes, traffic lights, parking on a street.</li>
<li><strong>Highway.</strong> Merging, keeping a gap, exits. Start outside rush hour.</li>
<li><strong>Night and weather.</strong> The required night hours, rain, and if your state has it, snow.</li>
</ol>
<p>Log each session the day it happens, with the date, duration and conditions. Some states provide a paper form, others an online log or a parent affidavit; the state handbook says which.</p>
<h2>Making the hours count</h2>
<p>Two teens can log the same 50 hours and come out with very different skills. Hours spent on the same route to school teach little after the first week. Vary the roads, the time of day and the weather, and give each session one goal: a smooth left turn across traffic, three clean lane changes, parallel parking on a real street. The supervising adult should talk less as the weeks pass, letting the new driver make decisions and explaining afterward. A short note in the log about what was practiced also helps you spot what is still missing before the road test.</p>
<h2>How hours fit with the other rules</h2>
<p>The hours are one of three conditions for the road test, with the minimum age and the holding period, and the latest of the three sets the date. The ${h.a('permit-age', 'date calculator')} combines them from a date of birth. In several states, driver education changes the count; the ${h.a('drivers-ed', 'driver education guide')} shows where. Once the road test is passed, the provisional license brings night and passenger limits, described in the ${h.a('teen-restrictions', 'teen restrictions guide')}. All figures here come from state agency pages; this site is not an agency and the handbook prevails.</p>`;
    },
  },
  es: {
    slug: 'horas-de-manejo-supervisado',
    nav: 'Horas de manejo supervisado',
    card: 'Horas de práctica supervisada que exige cada estado antes del examen de manejo, incluidas las de noche.',
    title: 'Horas de manejo supervisado por estado: registro del permiso',
    description: 'Horas de manejo supervisado por estado: las horas de práctica y de noche que un joven debe registrar con el permiso antes del examen, y el ritmo semanal.',
    h1: 'Horas de manejo supervisado que exige cada estado',
    intro: 'Indique su estado y las horas que ya registró: la herramienta muestra las que faltan, de día y de noche. Abajo, la exigencia de cada estado y el ritmo semanal que supone.',
    resume: (h) => {
      const f = F(h);
      return `La mayoría de los estados exige que un joven registre cierto número de horas de manejo supervisado con el permiso de aprendizaje antes del examen práctico, firmadas por un padre, tutor u otro adulto con licencia. Entre las ${f.withH.length} jurisdicciones de nuestros datos que publican la cifra, la exigencia va de ${f.least ? `${f.least.hours} horas en ${h.S(f.least.code).nameL}` : h.nc} a ${f.most ? `${f.most.hours} horas en ${h.S(f.most.code).nameL}` : h.nc}, y ${f.fifty} estados piden exactamente 50. El promedio es de ${f.avg != null ? h.num(f.avg) : h.nc} horas. ${f.night.length} estados fijan además un mínimo de horas de noche, casi siempre ${f.nightMode ?? h.nc}, ${f.mostNight ? `y hasta ${f.mostNight.nightHours} en ${h.S(f.mostNight.code).nameL}` : ''}. Como el permiso también debe tenerse un número mínimo de meses, lo que de verdad limita es el ritmo: repartida en ese tiempo, la exigencia equivale a unas ${f.typical != null ? h.num(f.typical, 1) : h.nc} horas por semana en el estado mediano, y más donde el plazo es corto. Algunos estados reducen las horas para quien termina un curso aprobado de educación vial.`;
    },
    faqs: (h) => [
      { q: '¿Quién puede firmar mi registro de horas de manejo?', a: 'Normalmente un padre, tutor u otro adulto con licencia que el estado acepte, a menudo de 21 años o más, sentado en el asiento del copiloto durante la práctica. En algunos estados el padre debe certificar el total aunque otro adulto haya supervisado una parte. El manual del estado describe el formulario o la certificación en línea y la edad mínima del supervisor.' },
      { q: '¿Las horas con un instructor de manejo cuentan para el total?', a: 'En muchos estados las clases prácticas con un instructor aprobado cuentan para el registro, y en algunos sustituyen una parte. Las reglas son precisas: unos cuentan las horas del instructor una por una, otros solo hasta cierto tope. Lea la sección de horas del manual de su estado, o la página del estado en este sitio, antes de contar con ellas.' },
      { q: '¿Qué cuenta como manejo de noche en el registro?', a: 'Las horas de noche son, en general, las que se manejan entre la puesta y la salida del sol, según la defina el estado. Existen porque la oscuridad lo cambia todo: el cálculo de distancias, los reflejos de las luces, los conductores cansados y los peatones con ropa oscura. Prográmelas en invierno, cuando oscurece temprano y se puede practicar antes de cenar.' },
      { q: '¿Qué pasa si miento sobre mis horas?', a: `El registro es una certificación firmada ante el estado, y una declaración falsa puede llevar a cancelar el permiso o la licencia y, en algunos estados, a sanciones para el adulto que firmó. Además, las horas existen porque el riesgo de choque baja con la experiencia: la NHTSA relaciona los primeros meses de manejo solo con las tasas de choque más altas.` },
    ],
    body: (h) => {
      const f = F(h);
      const ns = 'sin dato';
      const rows = h.rank((s) => s.hours, -1).map((s) => { const w = perWeek(s); return [h.sl(s.code), s.hours as number, s.nightHours ?? ns, s.holdMonths == null ? ns : h.num(s.holdMonths, s.holdMonths % 1 ? 1 : 0), w == null ? ns : h.num(w, 1)]; });
      return `
<h2>Horas exigidas, estado por estado</h2>
<p>La tabla ordena de mayor a menor los estados que publican una exigencia de horas. La última columna divide las horas entre el tiempo mínimo con el permiso, en semanas: es el ritmo necesario para completar el registro en la fecha más temprana posible. Empezar más tarde o practicar menos solo retrasa el examen de manejo.</p>
${h.table(['Estado', 'Horas', 'De noche', 'Meses con permiso', 'Horas por semana'], rows, `Práctica supervisada antes del examen de manejo, menores de 18 años. ${f.withH.length} estados con exigencia publicada.`, ['l', 'r', 'r', 'r', 'r'])}
<p>${f.silent.length ? `En las páginas oficiales que leímos no aparece ninguna exigencia de horas para ${f.silent.map((s) => h.S(s.code).nameL).join(', ')}. Puede que el estado no fije ninguna o que la fije en una ley que la agencia no cita.` : 'Todas las jurisdicciones de nuestros datos publican una exigencia de horas.'}</p>
<h2>El ritmo es lo que cuenta</h2>
<p>${f.hardest ? `El calendario más apretado está en ${h.sl(f.hardest.code)}, donde ${f.hardest.hours} horas deben caber en ${h.num(f.hardest.holdMonths as number, (f.hardest.holdMonths as number) % 1 ? 1 : 0)} meses, unas ${h.num(perWeek(f.hardest) as number, 1)} horas por semana.` : ''} ${f.most ? `En el otro extremo de la escala de horas, ${h.sl(f.most.code)} pide ${f.most.hours}, pero el ritmo depende también de cuánto tiempo se tiene el permiso.` : ''} Un plan realista son de dos a cuatro sesiones por semana: dos salidas cortas entre semana y una más larga el fin de semana. Cuarenta y cinco minutos es una buena duración; pasada una hora, el principiante se cansa y la práctica rinde menos, como recuerda la NHTSA sobre el ${h.src('nhtsa_drowsy', 'manejo con sueño')}.</p>
<h2>Qué practicar y en qué orden</h2>
<ol>
<li><strong>Estacionamiento vacío.</strong> Arrancar, frenar, girar el volante, espejos, reversa. Bastan dos o tres sesiones.</li>
<li><strong>Calles residenciales tranquilas.</strong> Altos, vueltas a la derecha, control de la velocidad, atención a niños y mascotas.</li>
<li><strong>Calles con más tránsito.</strong> Vueltas a la izquierda, cambios de carril, semáforos, estacionarse en la calle.</li>
<li><strong>Autopista.</strong> Incorporarse, mantener la distancia, salidas. Empiece fuera de las horas pico.</li>
<li><strong>Noche y mal tiempo.</strong> Las horas de noche exigidas, lluvia y, si su estado la tiene, nieve.</li>
</ol>
<p>Anote cada sesión el mismo día, con fecha, duración y condiciones. Algunos estados dan un formulario en papel, otros un registro en línea o una declaración jurada de los padres; el manual del estado indica cuál.</p>
<h2>Que las horas sirvan de verdad</h2>
<p>Dos jóvenes pueden registrar las mismas 50 horas y terminar con habilidades muy distintas. Repetir el mismo camino a la escuela enseña poco después de la primera semana. Cambie de calles, de hora y de clima, y dé a cada sesión un objetivo: una vuelta a la izquierda limpia con tránsito de frente, tres cambios de carril bien hechos, estacionarse en paralelo en una calle real. El adulto supervisor debería hablar menos con el paso de las semanas, dejar que el conductor nuevo decida y comentar después. Una nota breve en el registro sobre lo practicado ayuda a ver qué falta antes del examen de manejo.</p>
<h2>Cómo encajan las horas con las demás reglas</h2>
<p>Las horas son una de las tres condiciones del examen de manejo, junto con la edad mínima y el tiempo con el permiso, y la última en cumplirse fija la fecha. La ${h.a('permit-age', 'calculadora de fechas')} las combina a partir de una fecha de nacimiento. En varios estados, la educación vial cambia la cuenta; la ${h.a('drivers-ed', 'guía de educación vial')} indica dónde. Tras aprobar, la licencia provisional trae límites de noche y de pasajeros, descritos en la ${h.a('teen-restrictions', 'guía de restricciones para jóvenes')}. Todas las cifras vienen de páginas de agencias estatales; este sitio no es una agencia y el manual prevalece.</p>`;
    },
  },
});
