import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';
import type { StateRec } from '../../lib/engine/states';

const bac = (x: number | null) => (x == null ? null : x === 0 ? '0.00' : x.toFixed(2));
/** Text field in the page language; a Spanish field still in English is not shown as Spanish. */
const tr = (h: Helpers, t: StateRec['night']) => (!t ? null : h.lang === 'en' ? t.en : t.es !== t.en ? t.es : null);
const F = (h: Helpers) => {
  const withBac = h.STATES.filter((s) => s.u21bac != null);
  const zero = withBac.filter((s) => s.u21bac === 0);
  const maxBac = h.rank((s) => s.u21bac, -1)[0];
  const phoneYes = h.STATES.filter((s) => s.phoneBan === true);
  const phoneNo = h.STATES.filter((s) => s.phoneBan === false);
  const night = h.STATES.filter((s) => s.night != null);
  const pass = h.STATES.filter((s) => s.passengers != null);
  const early = h.rank((s) => s.fullAge)[0];
  const late = h.rank((s) => s.fullAge, -1)[0];
  const at18 = h.STATES.filter((s) => s.fullAge === 18);
  return { withBac, zero, maxBac, phoneYes, phoneNo, night, pass, early, late, at18 };
};

export default definePage({
  id: 'teen-restrictions',
  group: 'rules',
  order: 40,
  tool: { kind: 'mini:restrictions' },
  mini: { kind: 'mini:bac' },
  related: ['permit-age', 'supervised-hours', 'rules-by-state', 'state-nj', 'state-ny', 'state-ga'],
  sources: ['nhtsa_teen', 'nhtsa_alcohol', 'handbooks'],
  en: {
    slug: 'teen-driving-restrictions',
    nav: 'Teen driving restrictions',
    card: 'Night curfews, passenger limits, phone bans and the under-21 alcohol limit of each state.',
    title: 'Teen Driving Restrictions by State: Curfew, Passengers, BAC',
    description: 'Teen driving restrictions by state: provisional license night curfew, passenger limits, phone ban, the under-21 alcohol limit and the age when restrictions end.',
    h1: 'Teen driving restrictions: night, passengers, phone and alcohol',
    intro: 'Choose a state: the tool shows when the provisional limits end, the phone rule and the alcohol limit for drivers under 21. The tables below quote each state night and passenger rule.',
    resume: (h) => {
      const f = F(h);
      return `A provisional, or intermediate, license lets a teen drive alone, but with limits that target the situations where young drivers crash most: driving late at night, driving with other teens in the car, and using a phone. In our data, ${f.night.length} states publish a night restriction and ${f.pass.length} a passenger limit, usually for the first six to twelve months of the license or until a set age. ${f.phoneYes.length} states confirm a ban on any phone use, hands-free included, for young or novice drivers. The limits end with the full license, from ${f.early ? `${h.ageLabel(f.early.fullAge)} in ${h.S(f.early.code).nameL}` : h.nc} to ${f.late ? `${h.ageLabel(f.late.fullAge)} in ${h.S(f.late.code).nameL}` : h.nc}. Alcohol follows a separate rule that lasts until 21: every state in our data with a published figure sets a limit of ${f.maxBac ? bac(f.maxBac.u21bac) : h.nc} or lower for drivers under 21, and ${f.zero.length} set it at zero, against 0.08 for adults.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Can a teen with a provisional license drive to work at night?', a: 'In most states, yes, with proof. Night restrictions typically exempt driving to or from work, school activities, religious events and emergencies, and some states ask for a signed letter from the employer or school to carry in the car. The exceptions differ by state; the night rule quoted in the table names those the agency publishes.' },
        { q: 'Do siblings count toward the passenger limit?', a: 'Often not. Many states exempt immediate family members, or count only passengers under a set age who are not relatives. Some states have no exemption during the first months. Because the wording varies, read the exact rule for your state in the passenger table below, and keep in mind that a supervising adult usually lifts the limit.' },
        { q: 'What happens if a provisional driver breaks a restriction?', a: 'Penalties range from a fine and points to an extension of the provisional period or a suspension. In several states, a violation also restarts the clock before the full license. Insurance companies see the ticket too. The state handbook lists the consequences, and the safest course is to treat each limit as a hard rule.' },
        { q: 'Why is the alcohol limit lower for drivers under 21?', a: `Drinking is illegal under 21, and zero tolerance laws make any measurable alcohol at the wheel an offense. ${f.withBac.length} states in our data publish the limit; ${f.zero.length} of them use 0.00 and the others a small threshold, usually 0.02, to allow for testing margins. NHTSA documents the higher crash risk of young drinkers.` },
      ];
    },
    body: (h) => {
      const f = F(h);
      const ns = 'not stated';
      const rows = h.STATES.filter((s) => s.night || s.passengers || s.phoneBan != null || s.u21bac != null).map((s) => [h.sl(s.code), tr(h, s.night) ?? ns, tr(h, s.passengers) ?? ns, s.phoneBan == null ? ns : s.phoneBan ? 'banned' : 'general rules', bac(s.u21bac) ?? ns, s.fullAge == null ? ns : h.ageShort(s.fullAge)]);
      return `
<h2>Night, passenger, phone and alcohol rules by state</h2>
<p>The night and passenger columns quote the rule as the agency publishes it, shortened only where it was very long. "Phone" reads "banned" when the state forbids any phone use, hands-free included, for teen or novice drivers, and "general rules" when only the all-driver rules apply. The last column is the age at which the provisional limits end at the earliest.</p>
${h.table(['State', 'Night', 'Passengers', 'Phone', 'BAC under 21', 'Limits end'], rows, `Provisional license restrictions, ${f.night.length} states with a published night rule.`, ['l', 'l', 'l', 'l', 'r', 'r'])}
<h2>Why these three limits</h2>
<p>Each restriction answers a specific risk documented by ${h.src('nhtsa_teen', 'NHTSA research on teen drivers')}. Night driving is harder for everyone, but a new driver has no experience with glare, dark curves or impaired drivers on the road. Each extra teen passenger raises the crash risk of a young driver, through distraction and pressure. Phones take the eyes, the hands and the attention off the road at once. The limits are temporary by design: they cover the first months of solo driving, when the crash rate is at its peak, and lift as the driver gains experience.</p>
<h2>The phone rule</h2>
<p>${f.phoneYes.length} states in our data confirm a total ban for young drivers, ${f.phoneNo.length} apply only the rules that cover all drivers, and the rest do not publish the point on the pages we read. Even in states without a special teen rule, handheld use while driving is widely restricted for everyone, and texting is banned for all drivers in most states. In practice, a teen should put the phone out of reach before starting the car, whatever the state.</p>
<h2>Alcohol: a separate rule until 21</h2>
<p>The provisional limits end at 17 or 18, but the alcohol rule follows age 21. ${f.withBac.length} states publish the under-21 limit in our data: ${f.zero.length} set it at 0.00 and the highest is ${f.maxBac ? bac(f.maxBac.u21bac) : h.nc}. For comparison, the adult limit is 0.08 in almost every state, and commercial drivers are held to 0.04. The mini-tool below the summary shows the figure for any state. A driver under 21 who blows over the limit usually loses the license for a period, even if the level would be legal for an adult.</p>
<h2>When the limits end</h2>
<p>${f.at18.length} states in our data keep provisional limits until 18; others lift them earlier, after a set time without violations. ${f.early ? `The earliest end is in ${h.sl(f.early.code)}, at ${h.ageLabel(f.early.fullAge)}.` : ''} The ${h.a('permit-age', 'date calculator')} gives the date for a given birthday, and the ${h.a('supervised-hours', 'hours guide')} explains the practice that comes before. This page summarizes official rules; it is not legal advice and the site is not an agency.</p>`;
    },
  },
  es: {
    slug: 'restricciones-para-conductores-jovenes',
    nav: 'Restricciones para jóvenes',
    card: 'Horario nocturno, límite de pasajeros, celular y límite de alcohol para menores de 21 en cada estado.',
    title: 'Restricciones para jóvenes: noche, pasajeros y alcohol',
    description: 'Restricciones de la licencia provisional por estado: horario de noche, pasajeros, prohibición del celular, alcohol para menores de 21 y cuándo terminan.',
    h1: 'Restricciones para conductores jóvenes: noche, pasajeros, celular y alcohol',
    intro: 'Elija un estado: la herramienta muestra cuándo terminan los límites de la licencia provisional, la regla del celular y el límite de alcohol para menores de 21. Abajo, la situación de cada estado.',
    resume: (h) => {
      const f = F(h);
      return `La licencia provisional, o intermedia, deja manejar solo a un joven, pero con límites pensados para las situaciones en que más chocan los conductores nuevos: manejar de noche, llevar a otros jóvenes en el auto y usar el celular. En nuestros datos, ${f.night.length} estados publican una restricción de noche y ${f.pass.length} un límite de pasajeros, por lo general durante los primeros seis a doce meses de la licencia o hasta cierta edad. ${f.phoneYes.length} estados confirman la prohibición de todo uso del celular, incluso con manos libres, para conductores jóvenes o novatos. Los límites terminan con la licencia completa, desde los ${f.early ? `${h.ageLabel(f.early.fullAge)} en ${h.S(f.early.code).nameL}` : h.nc} hasta los ${f.late ? `${h.ageLabel(f.late.fullAge)} en ${h.S(f.late.code).nameL}` : h.nc}. El alcohol sigue otra regla, que dura hasta los 21: todos los estados de nuestros datos con una cifra publicada fijan un límite de ${f.maxBac ? bac(f.maxBac.u21bac) : h.nc} o menos para menores de 21, y ${f.zero.length} lo fijan en cero, frente a 0.08 para los adultos.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: '¿Un joven con licencia provisional puede manejar de noche para ir a trabajar?', a: 'En la mayoría de los estados sí, con un comprobante. Las restricciones de noche suelen exceptuar los viajes al trabajo, las actividades escolares, los actos religiosos y las emergencias, y algunos estados piden llevar en el auto una carta firmada del empleador o de la escuela. Las excepciones cambian de un estado a otro; la regla oficial enlazada en la tabla las enumera.' },
        { q: '¿Los hermanos cuentan en el límite de pasajeros?', a: 'A menudo no. Muchos estados exceptúan a la familia inmediata, o solo cuentan a los pasajeros menores de cierta edad que no son parientes. Otros no hacen ninguna excepción durante los primeros meses. Como la redacción varía, lea la regla exacta de su estado en la fuente oficial enlazada abajo, y recuerde que un adulto supervisor suele levantar el límite.' },
        { q: '¿Qué pasa si un conductor con licencia provisional no respeta una restricción?', a: 'Las sanciones van de una multa y puntos a la prórroga del periodo provisional o la suspensión. En varios estados, una infracción también reinicia el plazo antes de la licencia completa. La compañía de seguros también ve la multa. El manual del estado indica las consecuencias, y lo más prudente es tomar cada límite como una regla estricta.' },
        { q: '¿Por qué el límite de alcohol es más bajo para menores de 21?', a: `Beber es ilegal antes de los 21, y las leyes de tolerancia cero convierten en infracción cualquier cantidad medible de alcohol al volante. ${f.withBac.length} estados de nuestros datos publican el límite; ${f.zero.length} usan 0.00 y los demás un margen pequeño, casi siempre 0.02, por la precisión de las pruebas. La NHTSA documenta el mayor riesgo de choque de los jóvenes que beben.` },
      ];
    },
    body: (h) => {
      const f = F(h);
      const ns = 'sin dato';
      const rule = (s: StateRec) => tr(h, s.night) ?? (s.night || s.passengers ? h.os(s.code, s.night ? 'night' : 'passengers', 'ver la regla oficial') : ns);
      const rows = h.STATES.filter((s) => s.night || s.passengers || s.phoneBan != null || s.u21bac != null).map((s) => [h.sl(s.code), rule(s), s.phoneBan == null ? ns : s.phoneBan ? 'prohibido' : 'reglas generales', bac(s.u21bac) ?? ns, s.fullAge == null ? ns : h.ageShort(s.fullAge)]);
      return `
<h2>Noche, pasajeros, celular y alcohol por estado</h2>
<p>La columna de noche y pasajeros enlaza la página oficial donde la agencia publica la regla, con sus horarios y excepciones exactos. «Celular» dice «prohibido» cuando el estado prohíbe todo uso del teléfono, incluso con manos libres, a los conductores jóvenes o novatos, y «reglas generales» cuando solo se aplican las reglas de todos los conductores. La última columna es la edad mínima en que terminan los límites de la licencia provisional.</p>
${h.table(['Estado', 'Noche y pasajeros', 'Celular', 'Alcohol menores de 21', 'Fin de límites'], rows, `Restricciones de la licencia provisional, ${f.night.length} estados con una regla de noche publicada.`, ['l', 'l', 'l', 'r', 'r'])}
<h2>Por qué estos tres límites</h2>
<p>Cada restricción responde a un riesgo concreto que documentan los ${h.src('nhtsa_teen', 'estudios de la NHTSA sobre conductores jóvenes')}. Manejar de noche es más difícil para todos, pero un conductor nuevo no tiene experiencia con los reflejos, las curvas oscuras o los conductores ebrios. Cada pasajero joven adicional aumenta el riesgo de choque de un conductor joven, por la distracción y la presión del grupo. El celular quita a la vez los ojos, las manos y la atención del camino. Los límites son temporales a propósito: cubren los primeros meses de manejo solo, cuando la tasa de choques está en su punto más alto, y se levantan a medida que el conductor gana experiencia.</p>
<h2>La regla del celular</h2>
<p>${f.phoneYes.length} estados de nuestros datos confirman una prohibición total para los jóvenes, ${f.phoneNo.length} aplican solo las reglas generales y los demás no publican el dato en las páginas que leímos. Aun donde no hay una regla especial para jóvenes, el uso del teléfono en la mano al manejar está muy restringido para todos, y la mayoría de los estados prohíbe enviar mensajes de texto a cualquier conductor. En la práctica, un joven debería guardar el celular fuera de su alcance antes de arrancar, sea cual sea el estado.</p>
<h2>Alcohol: otra regla hasta los 21</h2>
<p>Los límites de la licencia provisional terminan a los 17 o 18 años, pero la regla del alcohol sigue hasta los 21. ${f.withBac.length} estados publican el límite para menores de 21 en nuestros datos: ${f.zero.length} lo fijan en 0.00 y el más alto es ${f.maxBac ? bac(f.maxBac.u21bac) : h.nc}. En comparación, el límite para adultos es 0.08 en casi todos los estados, y los choferes comerciales tienen un límite de 0.04. La miniherramienta bajo el resumen muestra la cifra de cualquier estado. Un menor de 21 que supera el límite suele perder la licencia por un tiempo, aunque esa cantidad sería legal para un adulto.</p>
<h2>Cuándo terminan los límites</h2>
<p>${f.at18.length} estados de nuestros datos mantienen los límites hasta los 18; otros los levantan antes, tras cierto tiempo sin infracciones. ${f.early ? `El fin más temprano está en ${h.sl(f.early.code)}, a los ${h.ageLabel(f.early.fullAge)}.` : ''} La ${h.a('permit-age', 'calculadora de fechas')} da la fecha para un cumpleaños concreto, y la ${h.a('supervised-hours', 'guía de horas')} explica la práctica que viene antes. Esta página resume reglas oficiales; no es asesoría legal y el sitio no es una agencia.</p>`;
    },
  },
});
