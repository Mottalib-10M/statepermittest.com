import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'cdl',
  group: 'tests',
  order: 3,
  tool: { kind: 'quiz', props: { type: 'cdl' } },
  mini: { kind: 'mini:clp' },
  related: ['dmv-written-test', 'road-signs', 'motorcycle', 'home', 'state-tx', 'state-oh'],
  sources: ['cfr383', 'cfr391', 'cfr380', 'cfr382', 'cfr392', 'cfr395', 'cfr396'],
  en: {
    slug: 'cdl-practice-test',
    nav: 'CDL practice test',
    card: 'CDL general knowledge questions from the federal rules, with the CLP dates and the 80 % pass mark.',
    title: 'CDL Practice Test 2026: General Knowledge and CLP Rules',
    description: 'CDL practice test, free: general knowledge questions from the federal rules, scored at 80 %, plus the CLP timeline, the license classes and endorsements.',
    h1: 'CDL practice test: general knowledge and the CLP rules',
    intro: 'Practice the general knowledge test that every commercial applicant takes first, then check your commercial learner\'s permit dates with the CLP tool.',
    resume: (h) => `A commercial driver's license starts with a written general knowledge test and a commercial learner's permit (CLP), under federal rules every state applies. Under 49 CFR 383.25, the CLP is valid for no more than one year, and you must hold it at least 14 days before taking the skills test. While on the permit, you drive only with a CDL holder of the right class physically beside you. Every knowledge test, the general one and each endorsement test, is passed with at least 80 % of correct answers (49 CFR 383.135). To drive a commercial vehicle across state lines you must be 21, under 49 CFR 391.11; within one state, the age set by state law applies, often 18. Since 2022, first-time Class A and B applicants must also finish entry-level driver training from a registered provider before the skills test. Our practice test has ${h.counts.cdl} questions written from those federal rules, each with its source and an explanation.`,
    faqs: (h) => [
      { q: 'What is on the CDL general knowledge test?', a: `It covers what every commercial driver must know whatever the vehicle: inspection, basic control, shifting, seeing and communicating, speed and space management, night and winter driving, hazards, alcohol and drugs, cargo securement and emergencies. Endorsements add their own tests. Our ${h.counts.cdl} practice questions focus on the federal rules behind those topics, the part most often missed by drivers who already hold a car license.` },
      { q: 'Can I drive alone with a commercial learner\'s permit?', a: 'No. Under 49 CFR 383.25 a CLP holder may drive a commercial vehicle only with a CDL holder who has the right class and endorsements, seated in the front passenger seat or, on a bus, directly behind the driver or in the first row. The permit also forbids hauling hazardous materials, and tank vehicles must be empty.' },
      { q: 'Which endorsements can I add to a CLP?', a: 'Federal rules allow only three on a CLP: passenger (P), school bus (S) and tank vehicle (N). With P or S you cannot carry passengers other than examiners, trainers and other permit or license holders, and with N the tank must be empty and purged. Hazmat (H), doubles and triples (T) and combined tank and hazmat (X) wait for the full CDL.' },
      { q: 'What blood alcohol limit applies to commercial drivers?', a: 'A commercial driver is legally under the influence at 0.04, half the usual adult limit, while operating a commercial vehicle. Federal rules in parts 382 and 392 also forbid driving within four hours of drinking, and set random, post-crash and reasonable-suspicion testing. A refusal counts as a positive result.' },
    ],
    body: (h) => `
<h2>The steps from car license to CDL</h2>
<p>The commercial license sits on top of a regular license: you need a valid non-commercial license first. Then come a medical certificate, the knowledge tests, the commercial learner's permit, training, and the skills test. The order below is the one set by the federal rules in ${h.src('cfr383', '49 CFR part 383')}; the state agency runs each step and sets the fees.</p>
<ol>
<li><strong>Medical certificate.</strong> A DOT physical by a certified examiner, valid for up to 24 months, required for most interstate drivers (${h.src('cfr391', 'part 391')}).</li>
<li><strong>Knowledge tests.</strong> General knowledge, plus air brakes and combination vehicles for Class A, plus any endorsement. Each is passed at 80 %.</li>
<li><strong>Commercial learner's permit.</strong> Issued after the tests, valid up to one year, held at least 14 days before the skills test.</li>
<li><strong>Entry-level driver training.</strong> Required since February 2022 for a first Class A or B, an upgrade from B to A, and a first P, S or H endorsement, from a provider listed in the federal registry (${h.src('cfr380', 'part 380')}).</li>
<li><strong>Skills test.</strong> Pre-trip inspection, basic control and an on-road drive, in a vehicle of the class you apply for.</li>
</ol>
<h2>License classes and endorsements</h2>
<p>The class depends on the vehicle you will drive, not on what you carry. Endorsements are added for specific uses, each with its own knowledge test and, for some, a skills test.</p>
${h.table(['Class', 'Vehicles covered'], [
  ['A', 'Combination of vehicles with a gross combination weight rating of 26,001 lb or more, the towed unit over 10,000 lb'],
  ['B', 'Single vehicle rated 26,001 lb or more, or such a vehicle towing up to 10,000 lb'],
  ['C', 'Smaller vehicle carrying 16 or more people including the driver, or placarded hazardous materials'],
], 'Commercial license classes, 49 CFR 383.91.', ['l', 'l'])}
${h.table(['Code', 'Endorsement'], [
  ['H', 'Hazardous materials (knowledge test and a federal security check)'],
  ['N', 'Tank vehicle'],
  ['P', 'Passenger vehicle (knowledge and skills tests)'],
  ['S', 'School bus (knowledge and skills tests)'],
  ['T', 'Double and triple trailers'],
  ['X', 'Combined tank vehicle and hazardous materials'],
], 'Endorsements, 49 CFR 383.93.', ['l', 'l'])}
<h2>Your CLP dates</h2>
<p>The CLP tool above counts from the day the permit was issued. The skills test cannot be taken before day 14, and the permit expires after one year at most; some states allow a single renewal, others ask you to retake the knowledge test. Age also matters for where you can drive: under 21, a CLP or CDL is valid only within your state, if state law allows it, because ${h.src('cfr391', '49 CFR 391.11')} sets 21 as the minimum for interstate commerce.</p>
<h2>Rules the general knowledge test likes to ask</h2>
<p><strong>Hours of service.</strong> For property-carrying drivers, ${h.src('cfr395', 'part 395')} allows 11 hours of driving after 10 consecutive hours off duty, within a 14-hour window, with a 30-minute break after 8 hours of driving, and a weekly cap of 60 hours in 7 days or 70 in 8.</p>
<p><strong>Alcohol and drugs.</strong> The commercial limit is 0.04 blood alcohol, and no alcohol at all within four hours of going on duty (${h.src('cfr392', 'part 392')}). Employers test under ${h.src('cfr382', 'part 382')}, and violations are recorded in the federal Drug and Alcohol Clearinghouse.</p>
<p><strong>Inspection.</strong> The driver must be satisfied the vehicle is in safe condition before driving and report defects at the end of the day (${h.src('cfr396', 'part 396')}). The pre-trip inspection is also the first part of the skills test, so the knowledge questions on brakes, tires, lights and coupling devices pay twice.</p>
<p><strong>Railroad crossings and space.</strong> Commercial vehicles that must stop at crossings include buses with passengers and placarded hazmat loads. Following distance is longer than for cars: about one second per ten feet of vehicle length at low speed, plus one second above 40 mph.</p>
<h2>The other knowledge tests</h2>
<p>General knowledge is only the first written test. A Class A applicant also takes the combination vehicles test, and anyone who will drive a vehicle with air brakes takes the air brakes test; without it, the license carries an air brake restriction. Each endorsement adds its own test, and hazmat adds a federal security threat assessment. All of them use the same 80 % line, so plan the session at the agency to fit several tests in one visit.</p>
<h2>How to use the practice test</h2>
<p>Run the CDL test until you clear 80 % with room to spare, then read the explanation of each miss: each question names the federal section it comes from. The state commercial driver manual remains the reference for your test, and your state agency for fees and appointments. If you also need a car or motorcycle permit, the ${h.a('dmv-written-test', 'written test practice')} and the ${h.a('motorcycle', 'motorcycle test')} work the same way. This page is an independent study aid and is not issued by any licensing agency.</p>`,
  },
  es: {
    slug: 'examen-de-practica-cdl',
    nav: 'Examen de práctica CDL',
    card: 'Preguntas de conocimientos generales de la CDL basadas en las reglas federales, con los plazos del CLP y la nota del 80 %.',
    title: 'Examen de práctica CDL 2026: conocimientos generales y CLP',
    description: 'Examen de práctica CDL gratis: conocimientos generales según las reglas federales, nota del 80 %, plazos del permiso CLP y clases de licencia comercial.',
    h1: 'Examen de práctica CDL: conocimientos generales y reglas del CLP',
    intro: 'Practique el examen de conocimientos generales que todo solicitante comercial presenta primero y luego revise los plazos de su permiso de aprendiz comercial con la herramienta del CLP.',
    resume: (h) => `La licencia de conducir comercial (CDL) empieza con un examen escrito de conocimientos generales y un permiso de aprendiz comercial (CLP), según reglas federales que aplican todos los estados. Conforme al 49 CFR 383.25, el CLP vale como máximo un año y hay que tenerlo al menos 14 días antes del examen práctico. Mientras tenga el permiso, solo puede manejar con un titular de CDL de la clase correcta sentado a su lado. Cada examen teórico, el general y el de cada endoso, se aprueba con al menos el 80 % de respuestas correctas (49 CFR 383.135). Para manejar un vehículo comercial entre estados hay que tener 21 años, según el 49 CFR 391.11; dentro de un solo estado rige la edad de la ley estatal, a menudo 18. Desde 2022, quien pide por primera vez la clase A o B debe completar además una capacitación inicial con un proveedor registrado antes del examen práctico. Nuestro examen de práctica tiene ${h.counts.cdl} preguntas escritas a partir de esas reglas federales, cada una con su fuente y su explicación.`,
    faqs: (h) => [
      { q: '¿Qué preguntas trae el examen de conocimientos generales de la CDL?', a: `Cubre lo que todo chofer comercial debe saber sea cual sea el vehículo: inspección, control básico, cambios, visibilidad y comunicación, velocidad y distancia, manejo de noche y en invierno, peligros, alcohol y drogas, sujeción de la carga y emergencias. Los endosos tienen sus propios exámenes. Nuestras ${h.counts.cdl} preguntas se centran en las reglas federales de esos temas, lo que más fallan quienes ya tienen licencia de auto.` },
      { q: '¿Puedo manejar solo con el permiso de aprendiz comercial?', a: 'No. Según el 49 CFR 383.25, quien tiene un CLP solo puede manejar un vehículo comercial acompañado de un titular de CDL con la clase y los endosos correctos, sentado en el asiento del copiloto o, en un autobús, justo detrás del chofer o en la primera fila. El permiso tampoco deja transportar materiales peligrosos, y los tanques deben ir vacíos.' },
      { q: '¿Qué endosos se pueden añadir a un CLP?', a: 'Las reglas federales solo permiten tres en un CLP: pasajeros (P), autobús escolar (S) y vehículo tanque (N). Con P o S no puede llevar más pasajeros que examinadores, instructores y otros titulares de permiso o licencia, y con N el tanque debe ir vacío y purgado. Materiales peligrosos (H), remolques dobles y triples (T) y tanque con materiales peligrosos (X) esperan a la CDL completa.' },
      { q: '¿Qué límite de alcohol tienen los choferes comerciales?', a: 'Un chofer comercial se considera bajo los efectos del alcohol desde 0.04, la mitad del límite habitual para adultos, cuando maneja un vehículo comercial. Las reglas federales de las partes 382 y 392 también prohíben manejar dentro de las cuatro horas siguientes a beber y fijan pruebas aleatorias, tras un choque y por sospecha razonable. Negarse cuenta como resultado positivo.' },
    ],
    body: (h) => `
<h2>Los pasos de la licencia de auto a la CDL</h2>
<p>La licencia comercial se añade a una licencia normal: primero hace falta una licencia vigente no comercial. Después vienen el certificado médico, los exámenes teóricos, el permiso de aprendiz comercial, la capacitación y el examen práctico. El orden de abajo es el que fijan las reglas federales del ${h.src('cfr383', '49 CFR parte 383')}; la agencia estatal se encarga de cada paso y fija las tarifas.</p>
<ol>
<li><strong>Certificado médico.</strong> Un examen físico del DOT con un médico certificado, válido hasta 24 meses, obligatorio para la mayoría de los choferes entre estados (${h.src('cfr391', 'parte 391')}).</li>
<li><strong>Exámenes teóricos.</strong> Conocimientos generales, más frenos de aire y vehículos combinados para la clase A, más cada endoso. Todos se aprueban con el 80 %.</li>
<li><strong>Permiso de aprendiz comercial.</strong> Se emite tras los exámenes, vale hasta un año y debe tenerse al menos 14 días antes del examen práctico.</li>
<li><strong>Capacitación inicial.</strong> Obligatoria desde febrero de 2022 para una primera clase A o B, el paso de B a A y un primer endoso P, S o H, con un proveedor inscrito en el registro federal (${h.src('cfr380', 'parte 380')}).</li>
<li><strong>Examen práctico.</strong> Inspección previa al viaje, control básico y manejo en carretera, en un vehículo de la clase que solicita.</li>
</ol>
<h2>Clases de licencia y endosos</h2>
<p>La clase depende del vehículo que va a manejar, no de lo que transporta. Los endosos se añaden para usos concretos, cada uno con su examen teórico y, en algunos casos, uno práctico.</p>
${h.table(['Clase', 'Vehículos'], [
  ['A', 'Combinación de vehículos con peso bruto combinado nominal de 26,001 libras o más, con la unidad remolcada de más de 10,000 libras'],
  ['B', 'Vehículo sencillo de 26,001 libras o más, o ese vehículo con un remolque de hasta 10,000 libras'],
  ['C', 'Vehículo más pequeño que lleva 16 personas o más contando al chofer, o materiales peligrosos con letreros'],
], 'Clases de licencia comercial, 49 CFR 383.91.', ['l', 'l'])}
${h.table(['Código', 'Endoso'], [
  ['H', 'Materiales peligrosos (examen teórico y revisión federal de seguridad)'],
  ['N', 'Vehículo tanque'],
  ['P', 'Vehículo de pasajeros (examen teórico y práctico)'],
  ['S', 'Autobús escolar (examen teórico y práctico)'],
  ['T', 'Remolques dobles y triples'],
  ['X', 'Tanque con materiales peligrosos'],
], 'Endosos, 49 CFR 383.93.', ['l', 'l'])}
<h2>Los plazos de su CLP</h2>
<p>La herramienta del CLP cuenta desde el día en que se emitió el permiso. El examen práctico no se puede presentar antes del día 14, y el permiso vence como máximo al año; algunos estados permiten una sola renovación y otros piden repetir el examen teórico. La edad también decide dónde puede manejar: antes de los 21, el CLP o la CDL solo valen dentro de su estado, si la ley estatal lo permite, porque el ${h.src('cfr391', '49 CFR 391.11')} fija los 21 años como mínimo para el comercio entre estados.</p>
<h2>Reglas que el examen general suele preguntar</h2>
<p><strong>Horas de servicio.</strong> Para choferes de carga, la ${h.src('cfr395', 'parte 395')} permite 11 horas de manejo tras 10 horas seguidas fuera de servicio, dentro de una ventana de 14 horas, con una pausa de 30 minutos después de 8 horas al volante, y un tope de 60 horas en 7 días o 70 en 8.</p>
<p><strong>Alcohol y drogas.</strong> El límite comercial es de 0.04 de alcohol en la sangre, y nada de alcohol en las cuatro horas antes de entrar de servicio (${h.src('cfr392', 'parte 392')}). Los empleadores hacen pruebas según la ${h.src('cfr382', 'parte 382')}, y las infracciones se anotan en el registro federal de drogas y alcohol (Clearinghouse).</p>
<p><strong>Inspección.</strong> El chofer debe comprobar que el vehículo está en buen estado antes de salir y reportar los defectos al final del día (${h.src('cfr396', 'parte 396')}). La inspección previa es también la primera parte del examen práctico, así que las preguntas sobre frenos, llantas, luces y enganches cuentan dos veces.</p>
<p><strong>Cruces de tren y distancia.</strong> Entre los vehículos comerciales que deben parar en los cruces están los autobuses con pasajeros y las cargas de materiales peligrosos con letreros. La distancia con el de adelante es mayor que en un auto: alrededor de un segundo por cada diez pies de largo del vehículo a baja velocidad, y un segundo más por encima de 40 mph.</p>
<h2>Los demás exámenes teóricos</h2>
<p>El de conocimientos generales es solo el primer examen escrito. Quien pide la clase A presenta también el de vehículos combinados, y quien va a manejar un vehículo con frenos de aire presenta el de frenos de aire; sin él, la licencia lleva una restricción de frenos de aire. Cada endoso suma su propio examen, y el de materiales peligrosos añade una evaluación federal de seguridad. Todos usan la misma nota del 80 %, así que conviene organizar la visita a la agencia para presentar varios exámenes el mismo día.</p>
<h2>Cómo usar el examen de práctica</h2>
<p>Haga el examen CDL hasta superar el 80 % con margen y lea la explicación de cada error: cada pregunta indica la sección federal de la que sale. El manual del conductor comercial de su estado sigue siendo la referencia para su examen, y la agencia estatal para tarifas y citas. Si además necesita el permiso de auto o de moto, la ${h.a('dmv-written-test', 'práctica del examen escrito')} y el ${h.a('motorcycle', 'examen de moto')} funcionan igual. Esta página es una ayuda independiente para estudiar y no la emite ninguna agencia de licencias.</p>`,
  },
});
