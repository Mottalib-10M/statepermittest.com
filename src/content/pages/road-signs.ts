import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';
import BANK from '../../data/questions/bank-general.json';

const n = (t: string) => (BANK as Array<{ t: string }>).filter((q) => q.t === t).length;
const F = (h: Helpers) => ({ signs: n('signs'), markings: n('markings'), signals: n('signals'), withQ: h.STATES.filter((s) => s.testQ != null).length });

export default definePage({
  id: 'road-signs',
  group: 'tests',
  order: 2,
  tool: { kind: 'quiz', props: { type: 'signs' } },
  related: ['dmv-written-test', 'home', 'how-many-questions', 'spanish', 'state-fl', 'state-ca'],
  sources: ['mutcd'],
  en: {
    slug: 'road-signs-test',
    nav: 'Road signs test',
    card: 'Sign questions only, with the federal rules of shape and color that make every sign readable.',
    title: 'Road Signs Test 2026: Shapes, Colors and Free Practice',
    description: 'Road signs test practice, free: sign questions with explanations, plus the federal shape and color code of US traffic signs, pavement markings and signals.',
    h1: 'Road signs test: practice and the shape and color code',
    intro: 'The practice test above uses only sign, signal and marking questions. Below, the federal code that gives every US sign its shape and color, so you can read a sign you have never seen.',
    resume: (h) => {
      const f = F(h);
      return `Road sign questions are the most predictable part of the permit test, because every state uses the same federal rulebook, the Manual on Uniform Traffic Control Devices published by the Federal Highway Administration. Its 11th edition fixes the shape and color of each sign family: the octagon is reserved for STOP, the downward triangle for YIELD, the diamond for warnings, the pentagon for school zones, the round sign for a railroad crossing ahead and the pennant for a no-passing zone. Colors carry meaning too: red for stop and prohibition, yellow for general warnings, orange for work zones, green for directions, blue for services and brown for recreation. Learn those two codes and most sign questions can be answered from the shape alone. Our signs-only practice test draws on ${f.signs} sign questions, plus ${f.signals} on signals and ${f.markings} on pavement markings, each with an explanation.`;
    },
    faqs: () => [
      { q: 'Which sign shapes are used for only one sign?', a: 'Under the federal manual the octagon is used only for STOP, the downward-pointing triangle only for YIELD, the crossbuck only at railroad crossings, the round sign only for a railroad crossing ahead, and the sideways pennant only for a no-passing zone. If a test question shows one of those shapes, even blank, the answer is already decided.' },
      { q: 'What does a fluorescent yellow-green sign mean?', a: 'That bright yellow-green color is reserved for warnings about people on foot or on bikes and for school areas: pedestrian crossings, bicycle crossings, school zones and playgrounds. It is meant to stand out from ordinary yellow warning signs. On a test, treat it as a cue to slow down and watch for children, walkers and cyclists.' },
      { q: 'Are road signs different from one state to another?', a: 'The shapes, colors and symbols are national, set by the federal manual that every state must follow or match. States may add their own signs for local rules, such as a specific fine or a move-over reminder, but they must keep the national design code. A sign learned for one state test is valid in every other.' },
      { q: 'What is the difference between white and yellow pavement lines?', a: 'Yellow lines separate traffic moving in opposite directions, so you have a yellow line on your left on a two-way road. White lines separate lanes going the same way and mark the right edge of the road. A solid line discourages or forbids crossing; a broken line allows it when safe.' },
    ],
    body: (h) => {
      const f = F(h);
      const shapes = [
        ['Octagon', 'STOP only', 'Come to a full stop, then go when the way is clear'],
        ['Triangle, point down', 'YIELD only', 'Slow down, stop if needed, let others go first'],
        ['Circle', 'Railroad crossing ahead', 'Look, listen, be ready to stop'],
        ['Crossbuck (X)', 'Railroad crossing', 'Yield to trains; stop if one is coming'],
        ['Pennant (sideways triangle)', 'No passing zone', 'Do not start to pass; placed on the left side'],
        ['Pentagon', 'School zone or school crossing ahead', 'Watch for children, obey the school speed limit'],
        ['Diamond', 'Warning', 'A hazard or a change in the road ahead'],
        ['Vertical rectangle', 'Regulatory', 'A rule you must obey: speed, turns, lanes'],
        ['Horizontal rectangle', 'Guide', 'Directions, distances, exits'],
        ['Trapezoid', 'Recreation and some route markers', 'Parks and cultural sites'],
      ];
      const colors = [
        ['Red', 'Stop, yield, prohibition (DO NOT ENTER, WRONG WAY)'],
        ['White', 'Regulatory signs (black text on white)'],
        ['Yellow', 'General warning'],
        ['Fluorescent yellow-green', 'Pedestrian, bicycle and school warnings'],
        ['Orange', 'Temporary traffic control, work zones'],
        ['Fluorescent pink', 'Incident management (crash scenes)'],
        ['Green', 'Guide signs, permitted movements'],
        ['Blue', 'Services for drivers, evacuation routes'],
        ['Brown', 'Recreation and cultural interest'],
        ['Purple', 'Lanes for vehicles with an electronic toll account'],
      ];
      return `
<h2>Shapes: the first clue on every sign</h2>
<p>The federal ${h.src('mutcd', 'Manual on Uniform Traffic Control Devices')} gives each sign family a shape, so that a driver can recognize it from a distance, from behind, or covered in snow. Test makers rely on this: many sign questions show a blank shape or a symbol without words. Five shapes belong to a single sign or a single situation; the others group whole families.</p>
${h.table(['Shape', 'Used for', 'What to do'], shapes, 'Sign shapes under the federal MUTCD, 11th edition.', ['l', 'l', 'l'])}
<p>Two of these shapes are tested more than any other. The octagon means stop completely at the line, before the crosswalk, or at the point where you can see cross traffic, whichever comes first. The downward triangle means you may roll through if no one is coming, but must give way to vehicles and pedestrians already there.</p>
<h2>Colors: what kind of message</h2>
<p>Color is the second clue. Red always signals a stop or a ban, which is why DO NOT ENTER and WRONG WAY share it with STOP. Yellow and the brighter yellow-green warn; orange marks temporary work zones where fines are often higher. Green, blue and brown are informational and never order you to do anything.</p>
${h.table(['Color', 'Meaning'], colors, 'Sign colors under the federal MUTCD. Light blue and coral are reserved for future use.', ['l', 'l'])}
<h2>Signals and arrows</h2>
<p>Signal questions turn on the difference between steady and flashing lights. A steady red means stop and stay stopped; a right turn on red is allowed after a full stop unless a sign forbids it. A flashing red is treated like a STOP sign. A steady yellow warns that red is about to appear, so stop if you can do it safely. A flashing yellow means proceed with caution. A flashing yellow arrow allows a left turn only after yielding to oncoming traffic and pedestrians, which is the most missed signal question in practice. Our bank has ${f.signals} questions on signals.</p>
<h2>Pavement markings</h2>
<p>Markings follow their own color logic. Yellow separates opposite directions, white separates lanes in the same direction. A double solid yellow line forbids passing for both sides; a solid line next to a broken one lets only the side with the broken line pass. White diamonds mark lanes reserved for buses, carpools or other special use, and a solid white line between lanes means stay in your lane. We have ${f.markings} marking questions in the practice bank.</p>
<h2>How to drill the sign section</h2>
<p>Start with the shapes in the first table until you can name each one in a second. Then learn the colors, then the symbols. The signs-only practice test above mixes all three and explains every answer. Sign items appear on the written test in every state, whatever its length; ${f.withQ} states in our data publish how many questions the full test has, and the ${h.a('how-many-questions', 'question count guide')} shows how many you can miss. When signs are solid, move on to the ${h.a('dmv-written-test', 'full written test practice')}.</p>
<p>A last tip: signs carry English words such as STOP, YIELD and ONE WAY in every state, even when you take the test in another language. The ${h.a('spanish', 'Spanish test guide')} lists those words with their meaning.</p>`;
    },
  },
  es: {
    slug: 'examen-de-senales-de-transito',
    nav: 'Examen de señales',
    card: 'Solo preguntas de señales, con las reglas federales de forma y color que hacen legible cada señal.',
    title: 'Señales de tránsito: examen de práctica, formas y colores',
    description: 'Examen de señales de tránsito gratis: preguntas de señales con explicación y el código federal de formas y colores de las señales, marcas y semáforos del país.',
    h1: 'Examen de señales de tránsito: práctica y código de formas y colores',
    intro: 'El examen de práctica de arriba solo usa preguntas de señales, semáforos y marcas. Abajo, el código federal que da a cada señal su forma y su color, para leer incluso una señal que nunca vio.',
    resume: (h) => {
      const f = F(h);
      return `Las preguntas de señales son la parte más previsible del examen del permiso, porque todos los estados usan el mismo reglamento federal, el Manual de dispositivos uniformes de control de tránsito (MUTCD) que publica la Administración Federal de Carreteras. Su 11.ª edición fija la forma y el color de cada familia de señales: el octágono es exclusivo del ALTO (STOP), el triángulo con la punta hacia abajo del CEDA EL PASO (YIELD), el rombo de las advertencias, el pentágono de las zonas escolares, el círculo de un cruce de tren más adelante y el banderín de la zona donde no se puede rebasar. Los colores también hablan: rojo para detenerse y prohibir, amarillo para advertir, naranja para obras, verde para direcciones, azul para servicios y café para recreación. Con esos dos códigos se resuelve gran parte de las preguntas de señales solo por la forma. Nuestro examen de solo señales usa ${f.signs} preguntas de señales, más ${f.signals} de semáforos y ${f.markings} de marcas en el pavimento, todas explicadas.`;
    },
    faqs: () => [
      { q: '¿Qué formas de señal se usan para una sola señal?', a: 'Según el manual federal, el octágono solo se usa para ALTO, el triángulo con la punta hacia abajo solo para CEDA EL PASO, la cruz en X solo en cruces de tren, el círculo solo para avisar de un cruce de tren más adelante y el banderín horizontal solo para la zona sin rebase. Si una pregunta muestra una de esas formas, aunque esté en blanco, la respuesta ya está clara.' },
      { q: '¿Qué significa una señal amarillo verdoso fluorescente?', a: 'Ese color brillante se reserva para advertir de peatones, ciclistas y zonas escolares: cruces peatonales, cruces de bicicletas, escuelas y parques infantiles. Está pensado para destacar frente a las señales amarillas comunes. En el examen, tómelo como aviso de reducir la velocidad y vigilar a niños, peatones y ciclistas.' },
      { q: '¿Las señales cambian de un estado a otro?', a: 'Las formas, los colores y los símbolos son nacionales, fijados por el manual federal que todos los estados deben seguir o igualar. Un estado puede añadir señales propias para reglas locales, como una multa concreta o un recordatorio de cambiar de carril, pero debe respetar el diseño nacional. Una señal aprendida para un estado vale en todos los demás.' },
      { q: '¿Qué diferencia hay entre las líneas blancas y amarillas del pavimento?', a: 'Las líneas amarillas separan el tránsito que va en sentidos opuestos, por eso en una calle de doble sentido la línea amarilla queda a su izquierda. Las blancas separan carriles que van en el mismo sentido y marcan el borde derecho. Una línea continua desaconseja o prohíbe cruzarla; una discontinua lo permite si es seguro.' },
    ],
    body: (h) => {
      const f = F(h);
      const shapes = [
        ['Octágono', 'Solo ALTO (STOP)', 'Detenerse por completo y seguir cuando esté libre'],
        ['Triángulo con la punta abajo', 'Solo CEDA EL PASO (YIELD)', 'Reducir, parar si hace falta, dejar pasar'],
        ['Círculo', 'Cruce de tren más adelante', 'Mirar, escuchar, estar listo para parar'],
        ['Cruz en X', 'Cruce de tren', 'Ceder el paso al tren; parar si viene uno'],
        ['Banderín (triángulo horizontal)', 'Zona sin rebase', 'No empezar a rebasar; va del lado izquierdo'],
        ['Pentágono', 'Zona escolar o cruce escolar más adelante', 'Atención a los niños y al límite escolar'],
        ['Rombo', 'Advertencia', 'Un peligro o un cambio en el camino'],
        ['Rectángulo vertical', 'Reglamento', 'Una regla obligatoria: velocidad, vueltas, carriles'],
        ['Rectángulo horizontal', 'Guía', 'Direcciones, distancias, salidas'],
        ['Trapecio', 'Recreación y algunas rutas', 'Parques y sitios culturales'],
      ];
      const colors = [
        ['Rojo', 'Alto, ceda el paso, prohibición (DO NOT ENTER, WRONG WAY)'],
        ['Blanco', 'Señales de reglamento (texto negro sobre blanco)'],
        ['Amarillo', 'Advertencia general'],
        ['Amarillo verdoso fluorescente', 'Peatones, bicicletas y escuelas'],
        ['Naranja', 'Control temporal del tránsito, zonas de obras'],
        ['Rosa fluorescente', 'Manejo de incidentes (lugar de un choque)'],
        ['Verde', 'Señales de guía, movimientos permitidos'],
        ['Azul', 'Servicios para conductores, rutas de evacuación'],
        ['Café', 'Recreación e interés cultural'],
        ['Morado', 'Carriles para vehículos con cuenta de peaje electrónico'],
      ];
      return `
<h2>La forma: la primera pista de cada señal</h2>
<p>El ${h.src('mutcd', 'manual federal MUTCD')} asigna una forma a cada familia de señales, para que el conductor la reconozca de lejos, por detrás o cubierta de nieve. Los exámenes se apoyan en eso: muchas preguntas muestran una forma en blanco o un símbolo sin palabras. Cinco formas pertenecen a una sola señal o a una sola situación; las demás agrupan familias enteras.</p>
${h.table(['Forma', 'Se usa para', 'Qué hacer'], shapes, 'Formas de las señales según el MUTCD federal, 11.ª edición.', ['l', 'l', 'l'])}
<p>Dos de esas formas salen más que ninguna otra. El octágono obliga a detenerse por completo en la línea, antes del paso peatonal o donde se vea el tránsito que cruza, lo que llegue primero. El triángulo invertido permite seguir sin parar si no viene nadie, pero obliga a dejar pasar a los vehículos y peatones que ya están ahí.</p>
<h2>El color: qué tipo de mensaje</h2>
<p>El color es la segunda pista. El rojo siempre indica detenerse o una prohibición; por eso DO NOT ENTER (no entre) y WRONG WAY (sentido contrario) lo comparten con el ALTO. El amarillo y el amarillo verdoso advierten; el naranja marca obras temporales, donde las multas suelen ser más altas. El verde, el azul y el café informan y nunca dan una orden.</p>
${h.table(['Color', 'Significado'], colors, 'Colores de las señales según el MUTCD federal. El azul claro y el coral están reservados para usos futuros.', ['l', 'l'])}
<h2>Semáforos y flechas</h2>
<p>Las preguntas de semáforos dependen de la diferencia entre luz fija e intermitente. Con rojo fijo hay que parar y quedarse parado; dar vuelta a la derecha en rojo se permite tras un alto total, salvo que una señal lo prohíba. El rojo intermitente equivale a un ALTO. El amarillo fijo avisa que viene el rojo, así que hay que parar si se puede hacer con seguridad. El amarillo intermitente indica seguir con precaución. La flecha amarilla intermitente permite la vuelta a la izquierda solo después de ceder el paso al tránsito de frente y a los peatones, y es la pregunta de semáforos que más se falla. Nuestro banco tiene ${f.signals} preguntas de semáforos.</p>
<h2>Marcas en el pavimento</h2>
<p>Las marcas siguen su propia lógica de color. El amarillo separa sentidos opuestos; el blanco separa carriles del mismo sentido. Una doble línea amarilla continua prohíbe rebasar a ambos lados; una continua junto a una discontinua solo deja rebasar al lado de la discontinua. Los rombos blancos marcan carriles reservados para autobuses, vehículos compartidos u otros usos, y una línea blanca continua entre carriles significa no cambiar de carril. Tenemos ${f.markings} preguntas de marcas en el banco.</p>
<h2>Cómo practicar la parte de señales</h2>
<p>Empiece por las formas de la primera tabla hasta nombrarlas en un segundo. Luego aprenda los colores y después los símbolos. El examen de solo señales de arriba mezcla los tres y explica cada respuesta. Las señales salen en el examen escrito de todos los estados, sea cual sea su duración; ${f.withQ} estados de nuestros datos publican cuántas preguntas tiene el examen completo, y la ${h.a('how-many-questions', 'guía del número de preguntas')} indica cuántas puede fallar. Cuando domine las señales, pase al ${h.a('dmv-written-test', 'examen escrito completo')}.</p>
<p>Un último consejo: las señales llevan palabras en inglés, como STOP, YIELD u ONE WAY, en todos los estados, aunque presente el examen en otro idioma. La ${h.a('spanish', 'guía del examen en español')} reúne esas palabras con su significado.</p>`;
    },
  },
});
