import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'NM';
const F = (h: Helpers) => ({ s: h.S(C), az: h.S('AZ'), tx: h.S('TX'), ok: h.S('OK') });
/** Mistakes allowed on a test of n questions at the state's percentage. */
const miss = (n: number, pct: number | null) => n - Math.ceil(n * (pct ?? 0.8) - 1e-9);

export default definePage({
  id: 'state-nm',
  group: 'states',
  order: 129,
  state: C,
  tool: { kind: 'quiz', props: { type: 'car' } },
  mini: { kind: 'mini:passmark', props: { state: 'NM' } },
  related: ['home', 'spanish', 'how-many-questions', 'state-az', 'state-tx', 'state-ok'],
  sources: ['handbooks', 'mutcd', 'nhtsa_alcohol'],
  en: {
    slug: 'new-mexico-permit-test',
    nav: 'New Mexico',
    card: 'New Mexico MVD permit at 15: a 70 % pass mark, driver ed with a DWI module and a license at 15½.',
    title: 'New Mexico Permit Test 2026: Free MVD Practice at 70 %',
    description: 'New Mexico permit practice test, free: MVD-style questions graded at 70 %, answers explained, the permit at 15 for $10, driver ed with DWI module, 50 hours.',
    h1: 'New Mexico permit practice test',
    intro: 'Practice the New Mexico MVD knowledge test at its 70 % pass mark, in English or Spanish, and see how quickly a New Mexico teen reaches a provisional license.',
    resume: (h) => {
      const { s } = F(h);
      return `New Mexico's Motor Vehicle Division issues the instruction permit at ${s.permitAgeL}, for ${s.permitFeeL}. Applicants under 18 need driver education: ${s.driversEdL.replace(/^Required under 18: /, '')} The knowledge test is passed at ${s.pctL}, one of the lowest marks in the country, and it is offered in Spanish; the number of questions is not stated on the MVD pages we could read, so the practice test uses 20 questions graded at that same ${s.pctL}. The permit is held ${s.holdL} with ${s.hours ?? h.nc} hours of supervised driving, ${s.nightHours ?? h.nc} of them at night. The provisional license then comes at ${s.interAgeL}, earlier than in most states; ${s.feeNoteL.charAt(0).toLowerCase() + s.feeNoteL.slice(1)} It carries a midnight curfew and a cap of one young non-family passenger, both lifted once the driver earns a full license, at ${s.fullAgeL} at the earliest. Under 21, the alcohol limit is ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc}.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'Is a 70 % pass mark easier in New Mexico?', a: `A ${s.pctL} mark allows more mistakes: ${miss(20, s.testPct)} on a 20-question form against 4 at 80 %. But the MVD does not publish the length of its test on the pages we read, and a lower bar does not make the questions easier. Practice until you score well above it, so a hard draw of questions does not catch you out.` },
        { q: 'What is the DWI part of New Mexico driver education?', a: `New Mexico requires driver education approved by the Traffic Safety Bureau for applicants under 18, and the course includes a 3-hour module on driving while intoxicated. It covers how alcohol and drugs affect a driver and the legal consequences, including the ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc} limit for drivers under 21.` },
        { q: 'When can a New Mexico provisional driver drive after midnight?', a: `${s.nightL.replace(/^Provisional: /, 'The provisional rule is: ')} The curfew ends with the full license, available at ${s.fullAgeL} at the earliest. Until then, late trips need a good reason or a licensed adult in the car.` },
      ];
    },
    body: (h) => {
      const { s, az, tx, ok } = F(h);
      return `
<h2>What 70 % means in answers</h2>
<p>New Mexico publishes a percentage only. The tool turns any state's mark into answers; on New Mexico it shows the percentage and leaves the count as not confirmed.</p>
<!--tool:mini:passmark|{"state":"NM"}-->
<p>On a 25-question form, ${s.pctL} would allow ${miss(25, s.testPct)} errors; on a 50-question form, ${miss(50, s.testPct)}. The New Mexico motorcycle test uses the same mark: ${s.motoPass ?? h.nc}.</p>
<p>The practice test on this page follows the same rule: on its 20 questions, it marks a pass at the New Mexico percentage, not at 80 %. If you want a safety margin, treat 16 or more correct answers as your personal target before the MVD visit; that is what an 80 % state would demand.</p>
<h2>New Mexico and its neighbors</h2>
${h.table(['', 'New Mexico', 'Arizona', 'Texas', 'Oklahoma'], [
  ['Pass mark', s.pctL, az.pctL, tx.pctL, ok.pctL],
  ['Permit age', s.permitAgeL, az.permitAgeL, tx.permitAgeL, ok.permitAgeL],
  ['Provisional license', s.interAgeL, az.interAgeL, tx.interAgeL, ok.interAgeL],
  ['Permit fee', s.permitFeeL, az.permitFeeL, tx.permitFeeL, ok.permitFeeL],
], 'The Southwest compared.', ['l', 'r', 'r', 'r', 'r'])}
<p>A New Mexico teen can hold a provisional license at ${s.interAgeL}, half a year before teens in ${h.sl('AZ')}, ${h.sl('TX')} or ${h.sl('OK')}. ${h.sl('OK')} has a mark close to New Mexico's, ${ok.pctL}.</p>
<h2>Driving in New Mexico</h2>
<p>The New Mexico Driver Manual (${s.handbookEdition ?? 'current edition'}) is the base of the test. Beyond signs, signals and right of way, it covers topics that matter on New Mexico roads: long rural highways where fatigue sets in, high altitude and mountain passes with snow in winter, sudden summer storms and flash flooding, dust and wind, and livestock or wildlife on the road. Alcohol questions get extra weight, matching the DWI module of driver education; the federal background on impaired driving is summarized by ${h.src('nhtsa_alcohol', 'NHTSA')}. Signs follow the ${h.src('mutcd', 'MUTCD')}.</p>
<h2>From permit to full license</h2>
<p>The New Mexico steps follow each other without gaps. The permit comes at ${s.permitAgeL}; after ${s.holdL} and ${s.hours ?? h.nc} hours, the provisional license is possible at ${s.interAgeL}, exactly when the holding period ends for a teen who started on the first eligible day. The provisional stage then lasts until ${s.fullAgeL} at the earliest, ${h.num(((s.fullAge ?? 16.5) - (s.interAge ?? 15.5)) * 12)} months in all. During that stage the night rule reads: ${s.nightL.replace(/^Provisional: /, '')}</p>
<p>Because the provisional license can come at ${s.interAgeL}, a New Mexico teen can drive alone during the first years of high school. The two provisional rules, the curfew and the passenger cap, are designed for exactly that age group, and both end with the full license.</p>
<p>Passenger rule for provisional drivers: ${s.passengersL.replace(/^Provisional: /, '')} The figures on this page come from ${h.os(C, 'testPct', 'the New Mexico MVD')}; this site is independent of the MVD and the Taxation and Revenue Department.</p>`;
    },
  },
  es: {
    slug: 'examen-permiso-nuevo-mexico',
    nav: 'Nuevo México',
    card: 'Permiso del MVD de Nuevo México a los 15: nota del 70 %, educación vial con módulo DWI y licencia a los 15½.',
    title: 'Examen del permiso de Nuevo México 2026: práctica gratis',
    description: 'Examen de práctica del permiso de Nuevo México, gratis y en español: preguntas explicadas con la nota del 70 % del MVD, el permiso a los 15 por $10, 50 horas.',
    h1: 'Examen de práctica del permiso de Nuevo México',
    intro: 'Practique el examen de conocimientos del MVD de Nuevo México con su nota del 70 %, en español o en inglés, y vea lo pronto que un joven llega a la licencia provisional.',
    resume: (h) => {
      const { s } = F(h);
      return `La División de Vehículos Motorizados (MVD) de Nuevo México emite el permiso de instrucción a los ${s.permitAgeL}, por ${s.permitFeeL}. Los menores de 18 deben seguir un curso de educación vial: ${s.driversEdL.replace(/^Obligatoria antes de los 18: /, '')} El examen de conocimientos, disponible en español, se aprueba con el ${s.pctL}, una de las notas más bajas del país. El MVD no indica el número de preguntas en las páginas que pudimos leer, así que el examen de práctica usa 20 preguntas calificadas con ese mismo ${s.pctL}. El permiso se conserva ${s.holdL}, con ${s.hours ?? h.nc} horas de manejo supervisado, ${s.nightHours ?? h.nc} de ellas de noche. La licencia provisional llega a los ${s.interAgeL}, antes que en la mayoría de los estados; ${s.feeNoteL.charAt(0).toLowerCase() + s.feeNoteL.slice(1)} Esa licencia impide manejar de madrugada sin un adulto y limita los pasajeros jóvenes que no son de la familia, hasta la licencia completa, a los ${s.fullAgeL} como pronto. Para menores de 21, el límite de alcohol es ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc}.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: '¿Es más fácil aprobar con el 70 % en Nuevo México?', a: `Una nota del ${s.pctL} permite más errores: ${miss(20, s.testPct)} en un examen de 20 preguntas frente a 4 con el 80 %. Pero el MVD no publica la duración del examen en las páginas que leímos, y una nota más baja no hace más fáciles las preguntas. Practique hasta superarla con margen, para que una tanda difícil no le sorprenda.` },
        { q: '¿Qué es el módulo DWI de la educación vial en Nuevo México?', a: `Nuevo México exige a los menores de 18 un curso de educación vial aprobado por la Oficina de Seguridad Vial (TSB), con un módulo de 3 horas sobre manejar bajo los efectos del alcohol. Explica cómo el alcohol y las drogas afectan al conductor y sus consecuencias legales, entre ellas el límite de ${s.u21bac != null ? s.u21bac.toFixed(2) : h.nc} para menores de 21.` },
        { q: '¿Puede un conductor provisional de Nuevo México manejar después de medianoche?', a: `${s.nightL.replace(/^Provisional: /, 'La regla provisional es: ')} El horario termina con la licencia completa, a los ${s.fullAgeL} como pronto. Mientras tanto, un viaje tarde necesita un motivo válido o un adulto con licencia en el vehículo.` },
      ];
    },
    body: (h) => {
      const { s, az, tx, ok } = F(h);
      return `
<h2>El 70 % en respuestas</h2>
<p>Nuevo México solo publica un porcentaje. La herramienta convierte la nota de cualquier estado en respuestas; para Nuevo México muestra el porcentaje y deja el número como no confirmado.</p>
<!--tool:mini:passmark|{"state":"NM"}-->
<p>En un examen de 25 preguntas, el ${s.pctL} permitiría ${miss(25, s.testPct)} errores; en uno de 50, ${miss(50, s.testPct)}. El examen de moto de Nuevo México usa la misma nota: ${s.motoPass ?? h.nc}.</p>
<p>El examen de práctica de esta página sigue la misma regla: en sus 20 preguntas marca el aprobado con el porcentaje de Nuevo México, no con el 80 %. Si quiere un margen de seguridad, póngase como meta 16 respuestas correctas o más antes de ir al MVD; es lo que pediría un estado con el 80 %.</p>
<h2>Nuevo México y sus vecinos</h2>
${h.table(['', 'Nuevo México', 'Arizona', 'Texas', 'Oklahoma'], [
  ['Nota para aprobar', s.pctL, az.pctL, tx.pctL, ok.pctL],
  ['Edad del permiso', s.permitAgeL, az.permitAgeL, tx.permitAgeL, ok.permitAgeL],
  ['Licencia provisional', s.interAgeL, az.interAgeL, tx.interAgeL, ok.interAgeL],
  ['Tarifa del permiso', s.permitFeeL, az.permitFeeL, tx.permitFeeL, ok.permitFeeL],
], 'El suroeste comparado.', ['l', 'r', 'r', 'r', 'r'])}
<p>Un joven de Nuevo México puede tener la licencia provisional a los ${s.interAgeL}, medio año antes que en ${h.sl('AZ')}, ${h.sl('TX')} u Oklahoma. Oklahoma tiene una nota cercana, el ${ok.pctL}.</p>
<h2>Manejar en Nuevo México</h2>
<p>El manual del conductor de Nuevo México es la base del examen. Además de señales, semáforos y derecho de paso, trata temas propios de sus carreteras: largas rutas rurales donde aparece el cansancio, altitud y pasos de montaña con nieve en invierno, tormentas de verano e inundaciones repentinas, polvo y viento, y ganado o animales salvajes en la vía. Las preguntas sobre alcohol pesan mucho, en línea con el módulo DWI del curso; la ${h.src('nhtsa_alcohol', 'NHTSA')} resume el contexto federal. Las señales siguen el ${h.src('mutcd', 'MUTCD')}.</p>
<h2>Del permiso a la licencia completa</h2>
<p>En Nuevo México las etapas se encadenan sin huecos. El permiso llega a los ${s.permitAgeL}; tras ${s.holdL} y ${s.hours ?? h.nc} horas, la licencia provisional es posible a los ${s.interAgeL}, justo cuando termina el tiempo con el permiso para quien empezó el primer día posible. La etapa provisional dura luego hasta los ${s.fullAgeL} como pronto, ${h.num(((s.fullAge ?? 16.5) - (s.interAge ?? 15.5)) * 12)} meses en total. Durante esa etapa, la regla nocturna dice: ${s.nightL.replace(/^Provisional: /, '')}</p>
<p>Como la licencia provisional puede llegar a los ${s.interAgeL}, un joven de Nuevo México puede manejar solo durante los primeros años de la secundaria. Las dos reglas provisionales, el horario nocturno y el límite de pasajeros, están pensadas para esa edad y terminan con la licencia completa.</p>
<p>Regla de pasajeros para la licencia provisional: ${s.passengersL.replace(/^Provisional: /, '')} Las cifras de esta página salen del ${h.os(C, 'testPct', 'MVD de Nuevo México')}; este sitio es independiente del MVD y del Departamento de Impuestos e Ingresos.</p>`;
    },
  },
});
