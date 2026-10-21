import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'AZ';
const F = (h: Helpers) => ({ s: h.S(C), nv: h.S('NV'), ca: h.S('CA') });

export default definePage({
  id: 'state-az',
  group: 'states',
  order: 111,
  state: C,
  tool: { kind: 'quiz', props: { type: 'car' } },
  mini: { kind: 'mini:drivered', props: { state: 'AZ' } },
  related: ['home', 'drivers-ed', 'state-nv', 'state-ca', 'state-ut', 'teen-restrictions'],
  sources: ['handbooks', 'mutcd', 'nhtsa_teen'],
  en: {
    slug: 'arizona-permit-test',
    nav: 'Arizona',
    card: 'Arizona MVD permit at 15½: a $7 permit, 30 hours or driver ed, and full privileges at 16½.',
    title: 'Arizona Permit Test 2026: Free MVD Knowledge Practice',
    description: 'Arizona permit practice test, free: MVD-style questions with explained answers, the permit at 15 and a half, the $7 fee, 30 hours or driver ed and the Class G license.',
    h1: 'Arizona permit practice test',
    intro: 'Practice for the Arizona knowledge test, then see how fast the Arizona path runs: a permit at 15½ and a Class G license six months later.',
    resume: (h) => {
      const { s } = F(h);
      return `Arizona has one of the shortest teen paths in the country. The instruction permit is available from ${s.permitAgeL} for a fee of ${s.permitFeeL}, after the knowledge and vision tests at the Motor Vehicle Division. It is held ${s.holdL}, and the teen either logs ${s.hours ?? h.nc} hours of supervised driving, ${s.nightHours ?? h.nc} of them at night, certified by a parent, or completes an approved driver education course, which replaces the hours. The Class G graduated license follows at ${s.interAgeL} for ${s.licenseFeeL}, and its two limits apply only during the first six months: no driving from midnight to 5 a.m. unless with a licensed parent or for school, work, religion or a family emergency, and no more than one passenger under 18 who is not a sibling. By ${s.fullAgeL} the restrictions are gone. Arizona allows no detectable alcohol for drivers under 21 and bans phones for permit holders and new drivers. The Arizona test length and pass mark are not published on the pages we could read; the practice test uses 20 questions and an 80 % target.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'Do I need driver education for an Arizona license?', a: `No, it is a choice. An Arizona teen either completes an approved driver education course or logs ${s.hours ?? 30} hours of supervised practice, ${s.nightHours ?? 10} at night, certified by a parent or guardian. The course also allows the road test to be waived when the school is authorized to give it. The mini-tool above shows the rule of any state.` },
        { q: 'How long do Arizona teen restrictions last?', a: `Six months from the Class G license. During that time, no driving from midnight to 5 a.m. except with a licensed parent or for school, work, religious activity or a family emergency, and at most one passenger under 18 other than siblings. After six months, or at ${s.fullAgeL}, the limits end.` },
        { q: 'Can I take the Arizona permit test online?', a: 'Arizona MVD and its authorized third-party providers offer several services online through the state portal, and the rules on remote knowledge testing change over time. Check the MVD site before going to an office. Our practice test is free online in English and Spanish either way.' },
      ];
    },
    body: (h) => {
      const { s, nv, ca } = F(h);
      return `
<h2>Hours or course</h2>
<p>Arizona leaves the choice between logged hours and driver education. See how any state handles it:</p>
<!--tool:mini:drivered|{"state":"AZ"}-->
<h2>Arizona, Nevada, California</h2>
${h.table(['', 'Arizona', 'Nevada', 'California'], [
  ['Permit age', s.permitAgeL, nv.permitAgeL, ca.permitAgeL],
  ['Supervised hours', s.hours ?? h.nc, nv.hours ?? h.nc, ca.hours ?? h.nc],
  ['Provisional license', s.interAgeL, nv.interAgeL, ca.interAgeL],
  ['Restrictions end', s.fullAgeL, nv.fullAgeL, ca.fullAgeL],
  ['Permit fee', s.permitFeeL, nv.permitFeeL, ca.permitFeeL],
], 'Three southwestern states with the same permit age.', ['l', 'r', 'r', 'r'])}
<p>All three start at 15½, but Arizona lifts its limits a year and a half before Nevada.</p>
<h2>What to study</h2>
<p>The Arizona Driver License Manual covers signs, signals, right of way, freeway merging, dust storms ("pull aside, stay alive"), monsoon flooding and the "stupid motorist law" on driving into flooded washes, as well as alcohol and the under-21 zero tolerance rule. Signs follow the national MUTCD, which the "Road signs only" test drills.</p>
<p>Figures on this page come from ${h.os(C, 'permitAge', 'the Arizona statutes and MVD')}; this site is independent of ADOT and the MVD.</p>`;
    },
  },
  es: {
    slug: 'examen-permiso-arizona',
    nav: 'Arizona',
    card: 'Permiso del MVD de Arizona a los 15½: $7, 30 horas o educación vial y sin límites a los 16½.',
    title: 'Examen del permiso de Arizona 2026: práctica del MVD',
    description: 'Examen de práctica del permiso de Arizona, gratis y en español: preguntas explicadas, el permiso a los 15 años y medio, la tarifa de $7, las 30 horas y la licencia Clase G.',
    h1: 'Examen de práctica del permiso de Arizona',
    intro: 'Practique para el examen de conocimientos de Arizona y vea lo rápido que es el camino en Arizona: permiso a los 15½ y licencia Clase G seis meses después.',
    resume: (h) => {
      const { s } = F(h);
      return `Arizona tiene uno de los caminos más cortos del país para los jóvenes. El permiso de instrucción se obtiene desde los ${s.permitAgeL} por ${s.permitFeeL}, tras los exámenes de conocimientos y de la vista en la División de Vehículos Motorizados (MVD). Se conserva ${s.holdL}, y el joven registra ${s.hours ?? h.nc} horas de manejo supervisado, ${s.nightHours ?? h.nc} de ellas de noche, certificadas por un padre, o termina un curso aprobado de educación vial, que sustituye a las horas. La licencia graduada Clase G llega a los ${s.interAgeL} por ${s.licenseFeeL}, y sus dos límites solo se aplican los seis primeros meses: no manejar de medianoche a 5 a. m. salvo con un padre con licencia o para la escuela, el trabajo, la religión o una emergencia familiar, y no más de un pasajero menor de 18 que no sea hermano. A los ${s.fullAgeL} ya no hay restricciones. Arizona no tolera ninguna cantidad de alcohol a los menores de 21 y prohíbe el teléfono con permiso y licencia nueva. La duración del examen y la nota no se publican en las páginas que pudimos leer; el examen de práctica usa 20 preguntas y una meta del 80 %.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: '¿Necesito educación vial para la licencia en Arizona?', a: `No, es opcional. Un joven de Arizona termina un curso aprobado de educación vial o registra ${s.hours ?? 30} horas de práctica supervisada, ${s.nightHours ?? 10} de noche, certificadas por un padre o tutor. El curso también puede dispensar el examen de manejo si la escuela está autorizada a aplicarlo. La miniherramienta muestra la regla de cualquier estado.` },
        { q: '¿Cuánto duran las restricciones para jóvenes en Arizona?', a: `Seis meses desde la licencia Clase G. Durante ese tiempo no se maneja de medianoche a 5 a. m., salvo con un padre con licencia o para la escuela, el trabajo, una actividad religiosa o una emergencia familiar, y se lleva como máximo un pasajero menor de 18 que no sea hermano. Pasados seis meses, o a los ${s.fullAgeL}, se acaban.` },
        { q: '¿Puedo hacer el examen del permiso de Arizona en línea?', a: 'El MVD de Arizona y sus proveedores autorizados ofrecen varios trámites en línea a través del portal del estado, y las reglas sobre el examen teórico a distancia cambian con el tiempo. Consulte el sitio del MVD antes de ir a una oficina. Nuestro examen de práctica es gratuito en línea, en inglés y en español.' },
      ];
    },
    body: (h) => {
      const { s, nv, ca } = F(h);
      return `
<h2>Horas o curso</h2>
<p>Arizona deja elegir entre las horas registradas y la educación vial. Vea cómo lo resuelve cada estado:</p>
<!--tool:mini:drivered|{"state":"AZ"}-->
<h2>Arizona, Nevada y California</h2>
${h.table(['', 'Arizona', 'Nevada', 'California'], [
  ['Edad del permiso', s.permitAgeL, nv.permitAgeL, ca.permitAgeL],
  ['Horas supervisadas', s.hours ?? h.nc, nv.hours ?? h.nc, ca.hours ?? h.nc],
  ['Licencia provisional', s.interAgeL, nv.interAgeL, ca.interAgeL],
  ['Fin de las restricciones', s.fullAgeL, nv.fullAgeL, ca.fullAgeL],
  ['Tarifa del permiso', s.permitFeeL, nv.permitFeeL, ca.permitFeeL],
], 'Tres estados del suroeste con la misma edad del permiso.', ['l', 'r', 'r', 'r'])}
<p>Los tres empiezan a los 15½, pero Arizona levanta sus límites año y medio antes que Nevada.</p>
<h2>Qué estudiar</h2>
<p>El manual de la licencia de Arizona trata señales, semáforos, derecho de paso, incorporación a la autopista, tormentas de polvo («apártese y siga con vida»), inundaciones del monzón y la llamada ley del conductor imprudente, que hace pagar el rescate a quien entra en un cauce inundado, además del alcohol y la tolerancia cero para menores de 21. Las señales siguen el MUTCD nacional, que repasa el examen «Solo señales de tránsito».</p>
<p>Las cifras de esta página salen de ${h.os(C, 'permitAge', 'las leyes de Arizona y del MVD')}; este sitio es independiente de ADOT y del MVD.</p>`;
    },
  },
});
