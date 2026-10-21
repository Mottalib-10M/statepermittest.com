import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';
import type { StateRec } from '../../lib/engine/states';

/** Pass rule of the motorcycle test, rewritten from the data string in the page language. */
const mPass = (h: Helpers, s: StateRec) => {
  const t = s.motoPass;
  if (!t) return null;
  const of = t.match(/(\d+)\s+of\s+(\d+)/);
  if (of) return `${of[1]}/${of[2]}`;
  const p = t.match(/(\d+)\s*%/);
  return p ? `${p[1]} %` : h.lang === 'en' ? t : null;
};
const F = (h: Helpers) => {
  const withAge = h.STATES.filter((s) => s.motoAge != null);
  const any = h.STATES.filter((s) => s.motoAge != null || s.motoQ != null || s.motoPass != null);
  const young = h.rank((s) => s.motoAge)[0];
  const old = h.rank((s) => s.motoAge, -1)[0];
  const withQ = h.STATES.filter((s) => s.motoQ != null);
  const sameAsCar = withAge.filter((s) => s.permitAge != null && s.motoAge === s.permitAge).length;
  const later = withAge.filter((s) => s.permitAge != null && (s.motoAge as number) > (s.permitAge as number)).length;
  return { withAge, any, young, old, withQ, sameAsCar, later };
};

export default definePage({
  id: 'motorcycle',
  group: 'tests',
  order: 4,
  tool: { kind: 'quiz', props: { type: 'moto' } },
  mini: { kind: 'mini:moto' },
  related: ['dmv-written-test', 'road-signs', 'cdl', 'rules-by-state', 'state-ny', 'state-nv'],
  sources: ['nhtsa_moto', 'nhtsa_helmet', 'handbooks'],
  en: {
    slug: 'motorcycle-permit-test',
    nav: 'Motorcycle permit test',
    card: 'Motorcycle knowledge questions with explanations, plus the permit age and test length by state.',
    title: 'Motorcycle Permit Test 2026: Free Practice and State Rules',
    description: 'Motorcycle permit test practice, free: rider questions with explanations, plus the motorcycle permit age, test length and pass mark published by each state.',
    h1: 'Motorcycle permit test: practice and rules by state',
    intro: 'The practice test above uses rider questions only. Pick your state in the tool under the summary to see the motorcycle permit age and the test rules its agency publishes.',
    resume: (h) => {
      const f = F(h);
      return `A motorcycle permit, often called a Class M instruction permit, is earned with its own written knowledge test, separate from the car test, on riding technique, protective gear and the rules that apply to two wheels. Of the ${h.counts.states} jurisdictions in our data, ${f.withAge.length} publish a minimum age for it, ranging from ${f.young ? `${h.ageLabel(f.young.motoAge)} in ${h.S(f.young.code).nameL}` : h.nc} to ${f.old ? `${h.ageLabel(f.old.motoAge)} in ${h.S(f.old.code).nameL}` : h.nc}. In ${f.sameAsCar} of them the motorcycle age equals the car permit age, while ${f.later} make riders wait longer. Only ${f.withQ.length} agencies state how many questions the motorcycle test has on the pages we read. Permit riders usually face limits such as no passengers, daylight only and a helmet at all times, so the permit is a stage for practice, not for commuting. Our ${h.counts.moto} practice questions cover the topics every rider manual shares, each with a short explanation.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Do I need a car license before a motorcycle permit?', a: `Not in every state. Some issue a motorcycle permit as a first license, others require a regular license first or let you add the M class to it. ${f.later ? `In ${f.later} states of our data the motorcycle age is above the car permit age.` : ''} The state page and the agency manual say which route applies to you.` },
        { q: 'Can I carry a passenger on a motorcycle permit?', a: 'Almost never. Motorcycle permits are written for practice, and agencies usually forbid passengers, riding after dark and riding on some highways until you pass the skills test. A helmet is typically required for permit holders even in states where licensed adult riders may ride without one. Check your state manual for the exact list before your first ride.' },
        { q: 'What does a DOT-compliant helmet look like?', a: 'A helmet that meets the federal standard, FMVSS No. 218, carries a DOT symbol on the back, applied by the manufacturer, and a label inside with the maker, model and size. NHTSA warns against novelty helmets: thin shells, little padding, and a chin strap that may not hold. A real one weighs about three pounds.' },
        { q: 'Does a rider safety course replace the skills test?', a: 'In many states an approved basic rider course ends with a riding evaluation that the agency accepts instead of its own skills test, and sometimes instead of the knowledge test too. The rules vary, and some states make the course mandatory for young riders. The state manual names the approved programs; this site does not recommend any provider.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      const ns = 'not stated';
      const rows = h.rank((s) => (s.motoAge != null || s.motoQ != null || s.motoPass != null ? s.motoAge ?? 99 : null)).map((s) => [h.sl(s.code), s.motoAge == null ? ns : h.ageShort(s.motoAge), s.permitAge == null ? ns : h.ageShort(s.permitAge), s.motoQ ?? ns, mPass(h, s) ?? ns]);
      const notes = f.withAge.filter((s) => h.S(s.code).note('motoAge'));
      return `
<h2>Motorcycle permit rules in each state</h2>
<p>The table compares the motorcycle permit age with the car permit age of the same state, and shows the test length and pass line when the agency publishes them. States sorted by motorcycle age, youngest first.</p>
${h.table(['State', 'Motorcycle permit', 'Car permit', 'Questions', 'To pass'], rows, `Motorcycle instruction permit, ${f.any.length} jurisdictions with at least one published figure. Ages in years.`, ['l', 'r', 'r', 'r', 'r'])}
${notes.length ? `<p>${notes.map((s) => `${h.sl(s.code)}: ${h.S(s.code).note('motoAge')}`).join(' ')}</p>` : ''}
<p>Where a cell reads "not stated", the agency pages we read leave the figure out; we do not fill the gap with the car rule. Rider licensing is the area where states diverge most, from the age to the training route, so the state manual is the only safe reference.</p>
<h2>What the motorcycle knowledge test covers</h2>
<p>Rider manuals share a common structure, and the knowledge test follows it:</p>
<ul>
<li><strong>Preparing to ride.</strong> Helmet, eye protection, jacket, gloves, boots; a pre-ride check of tires, controls, lights, oil and chain.</li>
<li><strong>Control.</strong> Using both brakes, the front one doing most of the stopping; countersteering, where a push on the right grip leans the bike right; looking through a turn.</li>
<li><strong>Lane position.</strong> Choosing the part of the lane that lets you see and be seen, and never sharing a lane side by side with a car.</li>
<li><strong>Hazards.</strong> Intersections, where most collisions with cars happen; gravel, wet leaves and painted lines; crossing railroad tracks at an angle.</li>
<li><strong>Passengers and cargo.</strong> Rules for carrying a passenger once licensed and how weight changes braking.</li>
<li><strong>Alcohol and fatigue.</strong> Riding demands more balance and attention than driving; NHTSA's ${h.src('nhtsa_moto', 'motorcycle safety page')} details the risks.</li>
</ul>
<p>Our bank holds ${h.counts.moto} questions on those themes. They are general rider knowledge, valid across states; the road sign items of the car test also apply to riders, and the ${h.a('road-signs', 'road signs test')} covers them.</p>
<h2>Helmets and gear</h2>
<p>Helmet laws differ by state and often by age, but the federal standard for helmets does not. A compliant helmet has the DOT symbol and an inside label; NHTSA's ${h.src('nhtsa_helmet', 'helmet guide')} shows how to spot novelty helmets that look similar but protect far less. For the permit test, expect questions on full-face versus open-face protection, eye protection when the helmet has no visor, and bright clothing for visibility.</p>
<h2>Riding on the permit</h2>
<p>The permit is a learning stage, and the conditions attached to it reflect that. Expect a list of limits in your state manual: often no passengers, no riding between sunset and sunrise, no interstate highways, and a helmet with eye protection on every ride. The permit period is the time to build the habits the skills test checks: a smooth clutch and throttle, a full stop with a foot down, head turns before every lane change, and a scan of each intersection. Practice in an empty parking lot before you ride in traffic.</p>
<h2>From permit to motorcycle license</h2>
<p>After the knowledge test, a rider practices on the permit, then passes a skills test on a closed course or in traffic, or completes an approved rider course that the agency accepts instead. The permit duration and any renewal limit are set by the state. If you are also working toward a car permit, the ${h.a('dmv-written-test', 'written test practice')} uses the car bank; commercial applicants have the ${h.a('cdl', 'CDL practice test')}. This page helps you study and is not a licensing agency.</p>`;
    },
  },
  es: {
    slug: 'examen-permiso-de-moto',
    nav: 'Examen del permiso de moto',
    card: 'Preguntas de motocicleta con explicaciones, más la edad del permiso y la duración del examen por estado.',
    title: 'Permiso de moto: examen de práctica y reglas por estado',
    description: 'Examen de práctica del permiso de moto gratis: preguntas para motociclistas con explicación, más la edad, la duración y la nota que publica cada estado.',
    h1: 'Examen del permiso de moto: práctica y reglas por estado',
    intro: 'El examen de práctica de arriba solo usa preguntas para motociclistas. Elija su estado en la herramienta bajo el resumen para ver la edad del permiso de moto y las reglas que publica su agencia.',
    resume: (h) => {
      const f = F(h);
      return `El permiso de motocicleta, a menudo llamado permiso de instrucción clase M, se obtiene con un examen escrito propio, distinto del de auto, sobre técnica de manejo, equipo de protección y reglas que valen para las dos ruedas. De las ${h.counts.states} jurisdicciones de nuestros datos, ${f.withAge.length} publican una edad mínima para él, que va de ${f.young ? `${h.ageLabel(f.young.motoAge)} en ${h.S(f.young.code).nameL}` : h.nc} a ${f.old ? `${h.ageLabel(f.old.motoAge)} en ${h.S(f.old.code).nameL}` : h.nc}. En ${f.sameAsCar} de ellas la edad de la moto es la misma que la del permiso de auto, y ${f.later} hacen esperar más a los motociclistas. Solo ${f.withQ.length} agencias indican cuántas preguntas tiene el examen de moto en las páginas que leímos. Con el permiso suele haber límites como no llevar pasajero, manejar solo de día y usar casco siempre, así que es una etapa para practicar, no para ir al trabajo. Nuestras ${h.counts.moto} preguntas de práctica cubren los temas que comparten todos los manuales, cada una con una breve explicación.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: '¿Necesito licencia de auto antes del permiso de moto?', a: `No en todos los estados. Algunos dan el permiso de moto como primera licencia, otros exigen antes una licencia normal o permiten añadirle la clase M. ${f.later ? `En ${f.later} estados de nuestros datos la edad de la moto es mayor que la del permiso de auto.` : ''} La página del estado y el manual de la agencia indican qué camino le corresponde.` },
        { q: '¿Puedo llevar pasajero con el permiso de moto?', a: 'Casi nunca. El permiso de moto está pensado para practicar, y las agencias suelen prohibir los pasajeros, manejar de noche y usar ciertas autopistas hasta aprobar el examen práctico. El casco suele ser obligatorio para quien tiene permiso, incluso donde los adultos con licencia pueden ir sin él. Revise la lista exacta en el manual de su estado antes de salir.' },
        { q: '¿Cómo se reconoce un casco que cumple la norma del DOT?', a: 'Un casco que cumple la norma federal FMVSS No. 218 lleva el símbolo DOT en la parte de atrás, puesto por el fabricante, y una etiqueta interior con marca, modelo y talla. La NHTSA advierte contra los cascos de fantasía: carcasa delgada, poco relleno y una correa que puede no aguantar. Uno de verdad pesa unas tres libras.' },
        { q: '¿Un curso de seguridad para motociclistas reemplaza el examen práctico?', a: 'En muchos estados un curso básico aprobado termina con una evaluación de manejo que la agencia acepta en lugar de su propio examen práctico, y a veces también del teórico. Las reglas varían, y algunos estados hacen obligatorio el curso para los más jóvenes. El manual del estado nombra los programas aprobados; este sitio no recomienda a ningún proveedor.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      const ns = 'sin dato';
      const rows = h.rank((s) => (s.motoAge != null || s.motoQ != null || s.motoPass != null ? s.motoAge ?? 99 : null)).map((s) => [h.sl(s.code), s.motoAge == null ? ns : h.ageShort(s.motoAge), s.permitAge == null ? ns : h.ageShort(s.permitAge), s.motoQ ?? ns, mPass(h, s) ?? ns]);
      const notes = f.withAge.filter((s) => h.S(s.code).note('motoAge'));
      return `
<h2>Reglas del permiso de moto en cada estado</h2>
<p>La tabla compara la edad del permiso de moto con la del permiso de auto del mismo estado, y muestra la duración del examen y la nota cuando la agencia las publica. Los estados van ordenados por la edad de la moto, de menor a mayor.</p>
${h.table(['Estado', 'Permiso de moto', 'Permiso de auto', 'Preguntas', 'Para aprobar'], rows, `Permiso de instrucción de motocicleta, ${f.any.length} jurisdicciones con al menos una cifra publicada. Edades en años.`, ['l', 'r', 'r', 'r', 'r'])}
${notes.length ? `<p>Algunas edades tienen una condición propia, explicada en la fuente oficial: ${notes.map((s) => h.os(s.code, 'motoAge', h.S(s.code).nameL)).join(', ')}.</p>` : ''}
<p>Donde la casilla dice «sin dato», las páginas de la agencia que leímos no dan la cifra; no la completamos con la regla del auto. Las licencias de moto son el terreno donde más difieren los estados, desde la edad hasta la forma de capacitarse, así que el manual estatal es la única referencia segura.</p>
<h2>Qué cubre el examen teórico de moto</h2>
<p>Los manuales para motociclistas tienen una estructura común, y el examen la sigue:</p>
<ul>
<li><strong>Prepararse.</strong> Casco, protección para los ojos, chaqueta, guantes, botas; revisión previa de llantas, mandos, luces, aceite y cadena.</li>
<li><strong>Control.</strong> Usar los dos frenos, con el delantero haciendo la mayor parte; el contramanillar, en que empujar el puño derecho inclina la moto a la derecha; mirar hacia la salida de la curva.</li>
<li><strong>Posición en el carril.</strong> Elegir la parte del carril que permite ver y ser visto, y nunca compartir el carril lado a lado con un auto.</li>
<li><strong>Peligros.</strong> Los cruces, donde ocurren la mayoría de los choques con autos; grava, hojas mojadas y pintura; cruzar las vías del tren en ángulo.</li>
<li><strong>Pasajero y carga.</strong> Cómo llevar a un pasajero una vez con licencia y cómo el peso cambia el frenado.</li>
<li><strong>Alcohol y cansancio.</strong> Manejar una moto pide más equilibrio y atención que un auto; la ${h.src('nhtsa_moto', 'página de seguridad en motocicleta de la NHTSA')} detalla los riesgos.</li>
</ul>
<p>Nuestro banco tiene ${h.counts.moto} preguntas sobre esos temas. Son conocimientos generales para motociclistas, válidos en todos los estados; las preguntas de señales del examen de auto también se aplican a la moto, y el ${h.a('road-signs', 'examen de señales')} las cubre.</p>
<h2>Casco y equipo</h2>
<p>Las leyes del casco cambian según el estado y a menudo según la edad, pero la norma federal de los cascos no cambia. Un casco que la cumple lleva el símbolo DOT y una etiqueta interior; la ${h.src('nhtsa_helmet', 'guía de cascos de la NHTSA')} enseña a reconocer los cascos de fantasía, parecidos por fuera pero mucho menos protectores. Para el examen, espere preguntas sobre casco integral frente a casco abierto, protección de los ojos si el casco no tiene visera y ropa de colores vivos para ser visto.</p>
<h2>Manejar con el permiso</h2>
<p>El permiso es una etapa de aprendizaje, y sus condiciones lo reflejan. Espere una lista de límites en el manual de su estado: a menudo sin pasajero, sin manejar entre la puesta y la salida del sol, sin autopistas interestatales, y con casco y protección para los ojos en cada salida. Ese tiempo sirve para crear los hábitos que mide el examen práctico: embrague y acelerador suaves, alto total con un pie en el suelo, girar la cabeza antes de cada cambio de carril y revisar cada cruce. Practique en un estacionamiento vacío antes de salir al tránsito.</p>
<h2>Del permiso a la licencia de moto</h2>
<p>Tras el examen teórico, se practica con el permiso y luego se aprueba un examen práctico en un circuito cerrado o en la calle, o un curso aprobado que la agencia acepta en su lugar. La duración del permiso y las renovaciones las fija cada estado. Si además va por el permiso de auto, la ${h.a('dmv-written-test', 'práctica del examen escrito')} usa el banco de auto; para la licencia comercial está el ${h.a('cdl', 'examen de práctica CDL')}. Esta página es una ayuda para estudiar y no una agencia de licencias.</p>`;
    },
  },
});
