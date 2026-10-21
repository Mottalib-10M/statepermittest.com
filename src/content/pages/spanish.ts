import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const F = (h: Helpers) => {
  const yes = h.STATES.filter((s) => s.spanish === true);
  const no = h.STATES.filter((s) => s.spanish === false);
  const unknown = h.STATES.filter((s) => s.spanish == null);
  return { yes, no, unknown };
};
const list = (h: Helpers, l: Array<{ code: string }>) => l.map((s) => h.sl(s.code)).join(', ');
const plain = (h: Helpers, l: Array<{ code: string }>) => l.map((s) => h.S(s.code).nameL).join(', ');
const WORDS: Array<[string, string, string]> = [
  ['STOP', 'ALTO', 'Detenerse por completo'],
  ['YIELD', 'CEDA EL PASO', 'Dejar pasar a otros antes de seguir'],
  ['DO NOT ENTER', 'NO ENTRE', 'Prohibido entrar en esa calle o rampa'],
  ['WRONG WAY', 'SENTIDO CONTRARIO', 'Va en contra del tránsito: salga ya'],
  ['ONE WAY', 'UN SOLO SENTIDO', 'Todo el tránsito va hacia la flecha'],
  ['NO TURN ON RED', 'NO DAR VUELTA CON LUZ ROJA', 'Esperar la luz verde para girar'],
  ['MERGE', 'INCORPORACIÓN', 'Dos carriles se juntan más adelante'],
  ['SCHOOL ZONE', 'ZONA ESCOLAR', 'Velocidad reducida cuando hay niños'],
  ['RIGHT LANE MUST TURN RIGHT', 'EL CARRIL DERECHO DEBE GIRAR A LA DERECHA', 'No siga recto desde ese carril'],
  ['KEEP RIGHT', 'MANTÉNGASE A LA DERECHA', 'Pase el obstáculo por la derecha'],
];

export default definePage({
  id: 'spanish',
  group: 'tests',
  order: 6,
  tool: { kind: 'quiz', props: { type: 'car' } },
  mini: { kind: 'mini:spanish' },
  related: ['dmv-written-test', 'road-signs', 'state-ca', 'state-tx', 'state-fl', 'state-ny'],
  sources: ['handbooks', 'mutcd'],
  en: {
    slug: 'permit-test-in-spanish',
    nav: 'Permit test in Spanish',
    card: 'Which states confirm a Spanish knowledge test, with a Spanish practice test and the sign words to learn.',
    title: 'Permit Test in Spanish 2026: Which States Offer It',
    description: 'Permit test in Spanish: the states that confirm a Spanish knowledge test on their official pages, how to request it, and a free practice test in Spanish.',
    h1: 'Taking the permit test in Spanish',
    intro: 'The practice test above switches to Spanish on the Spanish version of this page. Pick your state in the tool below the summary to see whether its agency confirms a Spanish knowledge test.',
    resume: (h) => {
      const f = F(h);
      return `Many states let you take the written permit test in Spanish, but not all say so clearly. Of the ${h.counts.states} jurisdictions in our data, ${f.yes.length} confirm a Spanish knowledge test on an official page or in the handbook, ${f.no.length} state that the test is offered in English only or without Spanish, and ${f.unknown.length} do not address the question on the pages we read. A Spanish test covers the same rules and is scored the same way as the English one; only the language of the questions changes. Two things do not change with the language: road signs carry English words such as STOP, YIELD and ONE WAY everywhere in the United States, and the road test is given in traffic, where the examiner's instructions are short and often in English. Our practice test is available in full in Spanish, with the same ${h.counts.general} car questions and the same explanations.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'How do I ask for the Spanish version at the DMV office?', a: 'Tell the clerk when you check in, or choose the language on the touch screen before the test starts. In states that offer it, no extra form or fee is needed. If you booked online, some agencies let you pick the language in the appointment. Bring the same documents as for the English test: the language choice changes nothing else.' },
        { q: 'Is there a Spanish driver handbook?', a: `Many agencies publish their handbook in Spanish, sometimes as a separate PDF, sometimes as a translated web page. ${f.yes.length ? `It is common in the ${f.yes.length} states that confirm a Spanish test.` : ''} USA.gov links to every state agency, where the handbook is listed. Read the English sign words in it too, since signs are not translated on the road.` },
        { q: 'Can I bring an interpreter to the written test?', a: 'Policies differ. Some agencies allow a certified interpreter for languages without a translated test, others forbid any interpreter for the knowledge test and offer an audio version instead. Ask the agency in advance, because an interpreter who has not been approved will be turned away. Family members are generally not accepted as interpreters.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      return `
<h2>States that confirm a Spanish knowledge test</h2>
<p>We count a state as "yes" only when the agency page or the handbook says the knowledge test is available in Spanish. A state is "no" when its official text says the test is given only in English or lists languages without Spanish.</p>
${h.table(['Status', 'States', 'Count'], [
  ['Spanish test confirmed', list(h, f.yes) || 'none', f.yes.length],
  ['No Spanish test stated', list(h, f.no) || 'none', f.no.length],
  ['Not addressed on the pages read', plain(h, f.unknown) || 'none', f.unknown.length],
], `Knowledge test in Spanish, ${h.counts.states} jurisdictions, read on ${h.date(h.META.retrieved)}.`, ['l', 'l', 'r'])}
<p>"Not addressed" does not mean the test is unavailable. Some agencies offer it at the counter without saying so online. Call or check the testing location page before you go, and ask whether an audio version exists if reading is the harder part for you.</p>
<h2>What changes, and what does not</h2>
<p>The Spanish test asks the same rules, at the same length and pass mark as the English test of the same state. The ${h.a('how-many-questions', 'question count guide')} applies to both. Translation quality varies, and a few terms do not map neatly: a "learner permit" can appear as <em>permiso de aprendizaje</em> or <em>permiso de instrucción</em>, "yield" as <em>ceder el paso</em>. Practicing in both languages helps you recognize the rule whatever the wording.</p>
<p>The road test is another matter. The examiner gives short directions, such as "turn left at the next light" or "pull over to the curb", and many agencies run it in English, sometimes with a list of standard phrases translated. Learn those phrases before the drive, along with the sign words below.</p>
<h2>Sign words to know in English</h2>
<p>Under the federal ${h.src('mutcd', 'sign manual')}, regulatory and warning signs are written in English in every state. Shapes and colors help, but a handful of word signs come up on the test and on every drive.</p>
${h.table(['Sign text', 'In Spanish', 'What to do'], WORDS.map(([a, b, c]) => [a, b, c]), 'Common English word signs. Meanings follow the federal MUTCD; the Spanish column is our translation.', ['l', 'l', 'l'])}
<h2>A study plan in two languages</h2>
<p>Start with the Spanish handbook if your agency has one, for the rules. Then take the practice test in Spanish until you pass with a margin, and switch to English for the sign section, since that is what you will read on the road. The ${h.a('road-signs', 'road signs test')} drills the shapes and colors. Family members who help a teen study can follow the Spanish explanations while the teen takes the test in the language the state offers.</p>
<!--tool:mini:spanish|{"state":"TX"}-->
<h2>Other languages</h2>
<p>Several agencies translate the test into a long list of languages, from Chinese and Vietnamese to Arabic and Russian; others offer English and Spanish only. Our practice test exists in English and Spanish. The state pages on this site report the language information each agency publishes, and the ${h.a('dmv-written-test', 'written test guide')} describes the format common to all of them. We are an independent site, not a licensing agency.</p>`;
    },
  },
  es: {
    slug: 'examen-del-permiso-en-espanol',
    nav: 'Examen del permiso en español',
    card: 'Qué estados confirman el examen teórico en español, con un examen de práctica en español y las palabras de las señales.',
    title: 'Examen del permiso en español 2026: estados que lo ofrecen',
    description: 'Examen del permiso de manejo en español: qué estados lo confirman en sus páginas oficiales, cómo pedirlo y un examen de práctica gratis con explicaciones.',
    h1: 'Presentar el examen del permiso en español',
    intro: 'El examen de práctica de arriba está completo en español. Elija su estado en la herramienta bajo el resumen para ver si su agencia confirma un examen teórico en español.',
    resume: (h) => {
      const f = F(h);
      return `Muchos estados permiten presentar el examen escrito del permiso en español, pero no todos lo dicen con claridad. De las ${h.counts.states} jurisdicciones de nuestros datos, ${f.yes.length} confirman un examen teórico en español en una página oficial o en el manual, ${f.no.length} indican que el examen se da solo en inglés o sin español, y ${f.unknown.length} no tratan el tema en las páginas que leímos. El examen en español cubre las mismas reglas y se califica igual que el de inglés; solo cambia el idioma de las preguntas. Dos cosas no cambian con el idioma: las señales llevan palabras en inglés, como STOP, YIELD u ONE WAY, en todo Estados Unidos, y el examen de manejo se hace en la calle, donde el examinador da instrucciones breves, a menudo en inglés. Nuestro examen de práctica está completo en español, con las mismas ${h.counts.general} preguntas de auto y las mismas explicaciones.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: '¿Cómo pido la versión en español en la oficina del DMV?', a: 'Dígalo al registrarse en la oficina, o elija el idioma en la pantalla táctil antes de empezar. En los estados que lo ofrecen no hace falta ningún formulario ni pago extra. Si pidió cita en línea, algunas agencias dejan escoger el idioma al reservar. Lleve los mismos documentos que para el examen en inglés: el idioma no cambia nada más.' },
        { q: '¿Hay un manual del conductor en español?', a: `Muchas agencias publican su manual en español, a veces como PDF aparte, a veces como página web traducida. ${f.yes.length ? `Es habitual en los ${f.yes.length} estados que confirman el examen en español.` : ''} USA.gov enlaza a cada agencia estatal, donde aparece el manual. Lea también las palabras en inglés de las señales, porque en la calle no se traducen.` },
        { q: '¿Puedo llevar un intérprete al examen escrito?', a: 'Depende del estado. Algunas agencias aceptan un intérprete certificado para idiomas sin examen traducido; otras prohíben cualquier intérprete en el examen teórico y ofrecen en cambio una versión en audio. Pregunte antes, porque un intérprete no aprobado no podrá entrar. Por lo general no se aceptan familiares como intérpretes.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      return `
<h2>Estados que confirman el examen teórico en español</h2>
<p>Contamos un estado como «sí» solo cuando la página de la agencia o el manual dicen que el examen teórico existe en español. Un estado es «no» cuando su texto oficial indica que el examen se da solo en inglés o enumera idiomas sin incluir el español.</p>
${h.table(['Situación', 'Estados', 'Total'], [
  ['Examen en español confirmado', list(h, f.yes) || 'ninguno', f.yes.length],
  ['Sin examen en español', list(h, f.no) || 'ninguno', f.no.length],
  ['No se menciona en las páginas leídas', plain(h, f.unknown) || 'ninguno', f.unknown.length],
], `Examen teórico en español, ${h.counts.states} jurisdicciones, consultadas el ${h.date(h.META.retrieved)}.`, ['l', 'l', 'r'])}
<p>«No se menciona» no quiere decir que no exista. Algunas agencias lo ofrecen en la oficina sin anunciarlo en internet. Llame o revise la página del lugar de examen antes de ir, y pregunte si hay versión en audio si leer le cuesta más.</p>
<h2>Qué cambia y qué no</h2>
<p>El examen en español pregunta las mismas reglas, con la misma duración y la misma nota que el examen en inglés del mismo estado. La ${h.a('how-many-questions', 'guía del número de preguntas')} vale para los dos. La calidad de la traducción varía y algunos términos no tienen un equivalente exacto: el <em>learner permit</em> puede aparecer como permiso de aprendizaje o permiso de instrucción, y <em>yield</em> como ceder el paso o ceda el paso. Practicar en los dos idiomas ayuda a reconocer la regla sea cual sea la redacción.</p>
<p>El examen de manejo es otra cosa. El examinador da indicaciones breves, como «turn left at the next light» (vuelta a la izquierda en el próximo semáforo) o «pull over to the curb» (oríllese junto a la banqueta), y muchas agencias lo hacen en inglés, a veces con una lista de frases traducidas. Aprenda esas frases antes, junto con las palabras de las señales de abajo.</p>
<h2>Palabras de las señales que debe conocer en inglés</h2>
<p>Según el ${h.src('mutcd', 'manual federal de señales')}, las señales de reglamento y de advertencia se escriben en inglés en todos los estados. La forma y el color ayudan, pero unas cuantas señales con texto salen en el examen y en cada viaje.</p>
${h.table(['Texto de la señal', 'En español', 'Qué hacer'], WORDS.map(([a, b, c]) => [a, b, c]), 'Señales con texto en inglés más comunes. El significado sigue el MUTCD federal; la columna en español es nuestra traducción.', ['l', 'l', 'l'])}
<h2>Un plan de estudio en dos idiomas</h2>
<p>Empiece por el manual en español si su agencia lo tiene, para las reglas. Luego haga el examen de práctica en español hasta aprobar con margen, y pase al inglés para la parte de señales, porque es lo que leerá en la calle. El ${h.a('road-signs', 'examen de señales')} repasa formas y colores. Los padres que ayudan a un hijo a estudiar pueden seguir las explicaciones en español mientras el joven presenta el examen en el idioma que ofrezca el estado.</p>
<!--tool:mini:spanish|{"state":"TX"}-->
<h2>Otros idiomas</h2>
<p>Varias agencias traducen el examen a una larga lista de idiomas, del chino y el vietnamita al árabe y el ruso; otras solo lo ofrecen en inglés y español. Nuestro examen de práctica existe en inglés y en español. Las páginas de estado de este sitio recogen la información de idiomas que publica cada agencia, y la ${h.a('dmv-written-test', 'guía del examen escrito')} describe el formato común a todas. Somos un sitio independiente, no una agencia de licencias.</p>`;
    },
  },
});
