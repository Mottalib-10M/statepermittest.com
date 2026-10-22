import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'WA';
const F = (h: Helpers) => ({ s: h.S(C), or: h.S('OR') });

export default definePage({
  id: 'state-wa',
  group: 'states',
  order: 109,
  state: C,
  tool: { kind: 'quiz', props: { type: 'car' } },
  mini: { kind: 'mini:fees', props: { state: 'WA' } },
  related: ['home', 'fees', 'drivers-ed', 'state-or', 'state-ca', 'how-many-questions'],
  sources: ['handbooks', 'mutcd'],
  en: {
    slug: 'washington-permit-test',
    nav: 'Washington',
    card: 'Washington DOL knowledge test: 40 questions, 32 right, driver training before 18.',
    title: 'Washington Permit Test 2026: Free DOL Knowledge Practice',
    description: 'Washington permit practice test, free: 40 DOL-style questions scored at 32 correct, explained answers, the permit at 15, driver training, fees and limits.',
    h1: 'Washington permit practice test',
    intro: 'Practice the Washington knowledge test at its real length of 40 questions, then see what driver training and the intermediate license ask of a teen.',
    resume: (h) => {
      const { s } = F(h);
      return `The Washington knowledge test has ${s.testQ ?? h.nc} questions and you pass with ${s.need ?? h.nc} correct, ${s.pctL}, according to the Department of Licensing. It is given by approved driver training schools and testing locations, which set their own fee for it, and the waiting time after a failure depends on the location. A teen can hold an instruction permit from ${s.permitAgeL} when enrolled in driver training, the course of 30 classroom hours and 6 behind the wheel that Washington requires of anyone who wants a license before 18. The permit costs ${s.permitFeeL}. It is held ${s.holdL}, with ${s.hours ?? h.nc} hours of supervised driving, ${s.nightHours ?? h.nc} at night, before the intermediate license at ${s.interAgeL}. For its first six months, no passengers under 20 except family; then up to three, until 18 or a year without a ticket or crash. Night driving between 1 a.m. and 5 a.m. requires a parent, guardian or licensed driver of 25 or more.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'Where do I take the Washington knowledge test?', a: 'At a driver training school or a testing business approved by the Department of Licensing, not at a licensing office. Many students take it at the end of the classroom part of their driver training course. Each location sets its own fee and its own retest policy, so ask before booking.' },
        { q: 'How much does a Washington teen license cost?', a: `The instruction permit costs ${s.permitFeeL} and the first license ${s.licenseFeeL}, for six years. The knowledge and drive test fees come on top and vary by testing location. The mini-tool above adds the two state fees for any state, so you can compare Washington with its neighbors.` },
        { q: 'Do adults need driver training in Washington?', a: 'No. Driver training is required only to get a license before 18. An adult can apply for an instruction permit, pass the knowledge test and practice, then take the drive test, without a course, although many still take some lessons.' },
      ];
    },
    body: (h) => {
      const { s, or } = F(h);
      return `
<h2>The state fees</h2>
<p>Washington's first license is among the more expensive, because it is issued for six years. The mini-tool sums the permit and license fees of any state:</p>
<!--tool:mini:fees|{"state":"WA"}-->
<h2>Washington and Oregon</h2>
${h.table(['', 'Washington', 'Oregon'], [
  ['Permit age', s.permitAgeL, or.permitAgeL],
  ['Questions', s.testQ ?? h.nc, or.testQ ?? h.nc],
  ['Correct needed', s.need ?? h.nc, or.need ?? h.nc],
  ['Supervised hours', s.hours ?? h.nc, or.hours ?? h.nc],
], 'The two Pacific Northwest states.', ['l', 'r', 'r'])}
<p>Oregon asks for twice the practice hours unless the teen takes an approved course; Washington makes the course mandatory instead.</p>
<h2>What to study</h2>
<p>The Washington Driver Guide covers signs and signals, lane use including HOV lanes and roundabouts, sharing the road with bicycles, the move-over law, and alcohol: the under-21 limit is ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc}. Phones are banned for intermediate license holders. The test is also offered in Spanish.</p>
<p>Figures on this page come from the ${h.os(C, 'testQ', 'Washington Department of Licensing')}; this site is independent of the DOL.</p>`;
    },
  },
  es: {
    slug: 'examen-permiso-washington',
    nav: 'Washington',
    card: 'Examen del DOL de Washington: 40 preguntas, 32 correctas y educación vial antes de los 18.',
    title: 'Examen del permiso de Washington 2026: práctica gratis',
    description: 'Examen de práctica del permiso de Washington, gratis y en español: 40 preguntas con 32 correctas, el permiso a los 15, la educación vial y las tarifas.',
    h1: 'Examen de práctica del permiso de Washington',
    intro: 'Practique el examen de conocimientos de Washington con su duración real de 40 preguntas y vea qué exigen la educación vial y la licencia intermedia.',
    resume: (h) => {
      const { s } = F(h);
      return `El examen de conocimientos de Washington tiene ${s.testQ ?? h.nc} preguntas y se aprueba con ${s.need ?? h.nc} correctas, el ${s.pctL}, según el Departamento de Licencias (DOL). Lo aplican las autoescuelas y los centros de examen aprobados, que fijan su propia tarifa, y la espera tras un fallo depende del centro. Un adolescente puede tener el permiso de instrucción desde los ${s.permitAgeL} si está inscrito en educación vial, el curso de 30 horas de clase y 6 al volante que Washington exige a quien quiere la licencia antes de los 18. El permiso cuesta ${s.permitFeeL}. Se conserva ${s.holdL}, con ${s.hours ?? h.nc} horas de manejo supervisado, ${s.nightHours ?? h.nc} de noche, antes de la licencia intermedia a los ${s.interAgeL}. Los seis primeros meses, ningún pasajero menor de 20 que no sea de la familia; luego hasta tres, hasta los 18 o un año sin multas ni choques. Entre la 1 a. m. y las 5 a. m. hay que ir con un padre, tutor o conductor con licencia de 25 años o más.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: '¿Dónde se presenta el examen de conocimientos en Washington?', a: 'En una autoescuela o un centro de examen aprobado por el Departamento de Licencias, no en una oficina de licencias. Muchos estudiantes lo presentan al final de la parte teórica del curso de educación vial. Cada centro fija su tarifa y su política para repetir, así que pregunte antes de reservar.' },
        { q: '¿Cuánto cuesta la licencia de un joven en Washington?', a: `El permiso de instrucción cuesta ${s.permitFeeL} y la primera licencia ${s.licenseFeeL}, por seis años. Las tarifas de los exámenes teórico y práctico se suman y cambian según el centro. La miniherramienta suma las dos tarifas del estado para cualquier estado.` },
        { q: '¿Los adultos necesitan educación vial en Washington?', a: 'No. La educación vial solo se exige para obtener la licencia antes de los 18. Un adulto puede pedir el permiso de instrucción, aprobar el examen teórico y practicar, y luego presentar el examen de manejo sin curso, aunque muchos toman algunas clases.' },
      ];
    },
    body: (h) => {
      const { s, or } = F(h);
      return `
<h2>Las tarifas del estado</h2>
<p>La primera licencia de Washington es de las más caras porque se emite por seis años. La miniherramienta suma las tarifas del permiso y de la licencia de cualquier estado:</p>
<!--tool:mini:fees|{"state":"WA"}-->
<h2>Washington y Oregón</h2>
${h.table(['', 'Washington', 'Oregón'], [
  ['Edad del permiso', s.permitAgeL, or.permitAgeL],
  ['Preguntas', s.testQ ?? h.nc, or.testQ ?? h.nc],
  ['Correctas necesarias', s.need ?? h.nc, or.need ?? h.nc],
  ['Horas supervisadas', s.hours ?? h.nc, or.hours ?? h.nc],
], 'Los dos estados del noroeste del Pacífico.', ['l', 'r', 'r'])}
<p>Oregón pide el doble de horas de práctica salvo con un curso aprobado; Washington, en cambio, hace obligatorio el curso.</p>
<h2>Qué estudiar</h2>
<p>La guía del conductor de Washington trata señales y semáforos, uso de carriles incluidos los carriles HOV y las glorietas, la convivencia con bicicletas, la ley de cambiar de carril ante vehículos detenidos y el alcohol: el límite para menores de 21 es ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc}. El teléfono está prohibido con licencia intermedia. El examen también se ofrece en español.</p>
<p>Las cifras de esta página salen del ${h.os(C, 'testQ', 'Departamento de Licencias de Washington')}; este sitio es independiente del DOL.</p>`;
    },
  },
});
