import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';
import type { StateRec } from '../../lib/engine/states';

type Kind = 'req' | 'no' | 'cond';
/** Category read from the start of the official rule as recorded (English source text). */
const kind = (s: StateRec): Kind | null => {
  const t = s.driversEd?.en?.trim();
  if (!t) return null;
  if (/^not required/i.test(t)) return 'no';
  if (/^required/i.test(t)) return 'req';
  return 'cond';
};
const LABEL: Record<Kind, { en: string; es: string }> = {
  req: { en: 'Required', es: 'Obligatoria' },
  no: { en: 'Not required', es: 'No obligatoria' },
  cond: { en: 'Depends on age or route', es: 'Según la edad o la vía' },
};
const F = (h: Helpers) => {
  const known = h.STATES.filter((s) => kind(s) != null);
  const req = known.filter((s) => kind(s) === 'req');
  const no = known.filter((s) => kind(s) === 'no');
  const cond = known.filter((s) => kind(s) === 'cond');
  const silent = h.STATES.filter((s) => kind(s) == null);
  const swap = no.filter((s) => /hour|replace|alternative|reduc|shorten/i.test(s.driversEd?.en ?? ''));
  return { known, req, no, cond, silent, swap };
};
const tr = (h: Helpers, t: { en: string; es: string } | null | undefined) => (!t ? null : h.lang === 'en' ? t.en : t.es !== t.en ? t.es : null);
const names = (h: Helpers, l: StateRec[]) => l.map((s) => h.S(s.code).nameL).join(', ');

export default definePage({
  id: 'drivers-ed',
  group: 'rules',
  order: 60,
  tool: { kind: 'mini:drivered' },
  related: ['permit-age', 'supervised-hours', 'fees', 'rules-by-state', 'state-tx', 'state-va'],
  sources: ['nhtsa_teen', 'handbooks'],
  en: {
    slug: 'drivers-ed-requirements',
    nav: 'Driver education requirements',
    card: 'Which states require a driver education course for teens, and what it changes for the permit and license.',
    title: 'Drivers Ed by State 2026: Online Classes, Who Must Take One',
    description: 'Drivers ed requirements by state: where teens must complete driver education before the permit or license, where it is optional, and what the course changes.',
    h1: 'Driver education requirements in every state',
    intro: 'Pick a state: the tool quotes its driver education rule next to the permit age and the supervised hours. The table below classifies every state rule we could confirm.',
    resume: (h) => {
      const f = F(h);
      return `Whether a teen must take a driver education course depends entirely on the state. Of the ${f.known.length} jurisdictions in our data with a published rule, ${f.req.length} make an approved course a requirement for drivers under 18, usually before the permit or before the provisional license; ${f.no.length} do not require it; and ${f.cond.length} tie it to a particular age or licensing route. Where the course is required, the usual format is about 30 hours of classroom or online instruction and 6 hours behind the wheel with an instructor, though the exact hours are set by each state. Where it is optional, the course often still pays off: several states shorten the supervised practice log, the holding period or the wait for an unrestricted license for teens who complete it. Adults are mostly exempt, with a few states extending a shorter course to young adults. Our figures quote each agency's rule; the course provider must be one the state approves.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Can driver education be taken online?', a: 'Many states accept an online classroom portion from an approved provider, while the behind-the-wheel hours are always in a car with an instructor or, in some states, a parent under a parent-taught program. Each state publishes its list of approved providers. A course that is not on that list does not count, however it is advertised.' },
        { q: 'Does driver education replace the supervised hours?', a: `In some states it does, fully or partly. ${f.swap.length ? `In our data, ${names(h, f.swap)} let an approved course replace or reduce the practice log.` : 'The official rules we read rarely say so explicitly.'} Elsewhere the course and the hours are both required. The table below quotes each rule; the hours guide gives the log requirement.` },
        { q: 'What is a parent-taught driver education program?', a: 'A few states let a parent or guardian deliver the course, using a state-approved curriculum and logbook, instead of a school. The parent usually must meet conditions on their own license and driving record. It is a legal route only where the state rule names it; elsewhere a course taught at home does not count toward the requirement.' },
        { q: 'Is driver education required if I wait until 18?', a: 'In most states the requirement applies only under 18, so an adult can apply for a permit without a course. A few states extend a shorter course to young adults, and some require a short pre-licensing class at any age before the road test. The state rule in the table says which age groups it covers.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      const rows = f.known.map((s) => [h.sl(s.code), LABEL[kind(s) as Kind].en, h.S(s.code).driversEdL, s.hours ?? 'not stated']);
      return `
<h2>Driver education rules, state by state</h2>
<p>The category in the second column is read from the opening of each official rule: "Required" when the agency states the course is required for teens, "Not required" when it states the opposite, and "Depends on age or route" when the rule applies only to some ages or license paths. The third column quotes the rule as recorded from the agency page. The supervised hours are shown alongside because the two often interact.</p>
${h.table(['State', 'Category', 'Official rule', 'Practice hours'], rows, `Driver education for drivers under 18, ${f.known.length} jurisdictions with a published rule.`, ['l', 'l', 'l', 'r'])}
<p>${f.silent.length ? `We found no driver education rule on the official pages read for ${names(h, f.silent)}.` : 'Every jurisdiction in our data publishes a driver education rule.'}</p>
<h2>What a required course looks like</h2>
<p>A state-approved course has two parts. The classroom part, in a school, a licensed driving school or online, covers the handbook rules, defensive driving, alcohol and drugs, and sharing the road. The in-car part puts the student with a certified instructor in a dual-control car, and in some states adds hours of observation from the back seat. On completion, the provider issues a certificate the agency checks at the permit or license counter. Where the state sets the hours, the rule in the table quotes them.</p>
<h2>Why states require it, or not</h2>
<p>Driver education was once a standard high school class; many districts dropped it for budget reasons, and states took different paths. Some made it a condition for licensing under 18, often combined with a long supervised log. Others rely on parents and the practice log alone, and use the course as an incentive: finish it and you reach the next stage sooner. ${h.src('nhtsa_teen', 'NHTSA')} treats driver education as one part of a graduated system rather than a substitute for supervised experience, which is why the hours remain even where the course is required.</p>
<h2>How the course changes your dates</h2>
<p>In states where the course is an incentive, it can move the timeline: an earlier permit, a shorter holding period, fewer logged hours or an earlier unrestricted license. The ${h.a('permit-age', 'date calculator')} shows the default dates; the official rule in the table says what the course changes. Remember that the course has a cost, set by the provider, on top of the state ${h.a('fees', 'permit and license fees')}.</p>
<h2>Finding an approved class near you</h2>
<p>Only a provider on the state approved list counts. The agency publishes that list, usually with license numbers, and it is the place to look for a class close to home: in Texas, for example, the Department of Licensing and Regulation keeps a searchable list of approved driver education providers, parent-taught courses included. This site does not recommend any school or program; check the list yourself, and compare the hours and the price of two or three approved options. If you also need to log practice, the ${h.a('supervised-hours', 'supervised hours guide')} includes a counter for what is left.</p>`;
    },
  },
  es: {
    slug: 'educacion-vial-obligatoria',
    nav: 'Educación vial obligatoria',
    card: 'Qué estados exigen un curso de educación vial a los jóvenes y qué cambia para el permiso y la licencia.',
    title: 'Educación vial obligatoria por estado: quién hace el curso',
    description: 'Educación vial obligatoria por estado: dónde los jóvenes deben completar un curso antes del permiso o la licencia, dónde es opcional y qué cambia en sus fechas.',
    h1: 'Educación vial obligatoria en cada estado',
    intro: 'Elija un estado: la herramienta muestra su regla de educación vial junto a la edad del permiso y las horas supervisadas. La tabla de abajo clasifica cada regla estatal que pudimos confirmar.',
    resume: (h) => {
      const f = F(h);
      return `Que un joven tenga que tomar un curso de educación vial depende por completo del estado. De las ${f.known.length} jurisdicciones de nuestros datos con una regla publicada, ${f.req.length} exigen un curso aprobado a los menores de 18, normalmente antes del permiso o de la licencia provisional; ${f.no.length} no lo exigen, y ${f.cond.length} lo vinculan a cierta edad o a una vía concreta de obtener la licencia. Donde es obligatorio, el formato habitual ronda las 30 horas de clase presencial o en línea y 6 horas al volante con un instructor, aunque cada estado fija las horas exactas. Donde es opcional, el curso suele compensar igual: varios estados acortan el registro de práctica supervisada, el tiempo con el permiso o la espera para la licencia sin restricciones a quien lo termina. Los adultos casi siempre están exentos, y unos pocos estados piden un curso más corto a los adultos jóvenes. Nuestras cifras siguen la regla de cada agencia, y el proveedor del curso debe estar aprobado por el estado.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: '¿Se puede tomar la educación vial en línea?', a: 'Muchos estados aceptan la parte teórica en línea con un proveedor aprobado, mientras que las horas al volante siempre se hacen en un auto con un instructor o, en algunos estados, con un padre dentro de un programa enseñado por los padres. Cada estado publica su lista de proveedores aprobados. Un curso que no está en esa lista no cuenta, por mucho que se anuncie.' },
        { q: '¿La educación vial reemplaza las horas supervisadas?', a: `En algunos estados sí, del todo o en parte. ${f.swap.length ? `En nuestros datos, ${names(h, f.swap)} permiten que un curso aprobado reemplace o reduzca el registro de práctica.` : 'Las reglas oficiales que leímos rara vez lo dicen de forma explícita.'} En otros, se exigen ambas cosas. La tabla de abajo resume la regla de cada estado.` },
        { q: '¿Qué es un programa de educación vial enseñado por los padres?', a: 'Algunos estados permiten que un padre o tutor imparta el curso, con un programa y un registro aprobados por el estado, en lugar de una escuela. El padre suele tener que cumplir condiciones sobre su propia licencia e historial. Solo es válido donde la regla estatal lo nombra; en otros estados un curso hecho en casa no cuenta.' },
        { q: '¿Necesito educación vial si espero a cumplir 18?', a: 'En la mayoría de los estados la exigencia solo se aplica a menores de 18, así que un adulto puede pedir el permiso sin curso. Unos pocos estados piden un curso más corto a los adultos jóvenes, y algunos exigen una clase breve antes del examen práctico a cualquier edad. La regla de cada estado, resumida en la tabla, indica a qué edades se aplica.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      const rows = f.known.map((s) => [h.sl(s.code), LABEL[kind(s) as Kind].es, s.permitAge == null ? 'sin dato' : h.ageShort(s.permitAge), s.hours ?? 'sin dato', tr(h, s.driversEd) ?? h.os(s.code, 'driversEd', 'regla oficial')]);
      return `
<h2>Reglas de educación vial, estado por estado</h2>
<p>La categoría de la segunda columna sale del comienzo de cada regla oficial: «Obligatoria» cuando la agencia dice que el curso se exige a los jóvenes, «No obligatoria» cuando dice lo contrario, y «Según la edad o la vía» cuando la regla solo afecta a ciertas edades o caminos hacia la licencia. La edad del permiso y las horas supervisadas aparecen al lado porque suelen combinarse con el curso. La última columna resume la regla tal como la publica la agencia; el enlace a cada página oficial está en la página del estado.</p>
${h.table(['Estado', 'Categoría', 'Edad del permiso', 'Horas de práctica', 'Regla oficial'], rows, `Educación vial para menores de 18 años, ${f.known.length} jurisdicciones con una regla publicada.`, ['l', 'l', 'r', 'r', 'l'])}
<p>${f.silent.length ? `No encontramos ninguna regla de educación vial en las páginas oficiales leídas para ${names(h, f.silent)}.` : 'Todas las jurisdicciones de nuestros datos publican una regla de educación vial.'}</p>
<h2>Cómo es un curso obligatorio</h2>
<p>Un curso aprobado por el estado tiene dos partes. La teórica, en una escuela, una autoescuela con licencia o en línea, cubre las reglas del manual, el manejo defensivo, el alcohol y las drogas, y cómo compartir la vía. La práctica pone al alumno con un instructor certificado en un auto con doble mando, y en algunos estados añade horas de observación desde el asiento trasero. Al terminar, el proveedor entrega un certificado que la agencia revisa al tramitar el permiso o la licencia. Donde el estado fija las horas, la regla de la tabla las indica.</p>
<h2>Por qué unos estados lo exigen y otros no</h2>
<p>La educación vial fue durante años una clase normal de la preparatoria; muchos distritos la quitaron por falta de presupuesto, y los estados tomaron caminos distintos. Unos la convirtieron en condición para la licencia antes de los 18, a menudo junto con un registro largo de horas. Otros confían en los padres y en el registro de práctica, y usan el curso como incentivo: quien lo termina pasa antes a la siguiente etapa. La ${h.src('nhtsa_teen', 'NHTSA')} ve la educación vial como una pieza del sistema graduado y no como un sustituto de la experiencia supervisada, por eso las horas se mantienen incluso donde el curso es obligatorio.</p>
<h2>Cómo cambia el curso sus fechas</h2>
<p>En los estados donde el curso es un incentivo, puede mover el calendario: un permiso antes, menos tiempo con él, menos horas registradas o una licencia sin restricciones más temprana. La ${h.a('permit-age', 'calculadora de fechas')} muestra las fechas normales; la regla oficial dice qué cambia el curso. Recuerde que el curso tiene un precio, que fija el proveedor, además de las ${h.a('fees', 'tarifas del permiso y la licencia')}.</p>
<h2>Encontrar un curso aprobado cerca de usted</h2>
<p>Solo cuenta un proveedor de la lista aprobada por el estado. La agencia publica esa lista, normalmente con números de licencia, y es donde buscar un curso cerca de casa: en Texas, por ejemplo, el Departamento de Licencias y Regulación mantiene una lista consultable de proveedores aprobados de educación vial, incluidos los cursos impartidos por los padres. Este sitio no recomienda ninguna escuela ni programa; revise la lista usted mismo y compare las horas y el precio de dos o tres opciones aprobadas. Si además debe registrar práctica, la ${h.a('supervised-hours', 'guía de horas supervisadas')} incluye un contador de las que faltan.</p>`;
    },
  },
});
