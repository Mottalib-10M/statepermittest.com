/**
 * Questions specific to one state, generated from the verified state record: they can only say
 * what the official page says, and they change by themselves when the data file is updated.
 * A field left null produces no question.
 */
import type { Question } from './quiz';
import { ageLabel, monthsLabel, type StateRec } from './states';
import { formatNumberL } from '../format-l';

/** Three wrong options picked around the right value, never equal to it, always distinct. */
function around(v: number, cands: number[]): number[] {
  const c = [...new Set(cands.filter((x) => Math.abs(x - v) > 1e-9))].sort((a, b) => Math.abs(a - v) - Math.abs(b - v));
  return c.slice(0, 3);
}
function q4(id: string, t: string, src: string, q: { en: string; es: string }, right: { en: string; es: string }, wrong: Array<{ en: string; es: string }>, x: { en: string; es: string }): Question {
  return { id, t, src, q, o: { en: [right.en, ...wrong.map((w) => w.en)], es: [right.es, ...wrong.map((w) => w.es)] }, a: 0, x };
}
const both = (f: (l: 'en' | 'es') => string) => ({ en: f('en'), es: f('es') });

export function stateQuestions(s: StateRec): Question[] {
  const out: Question[] = [];
  const N = { en: s.name, es: s.es };
  const id = (k: string) => `st-${s.code.toLowerCase()}-${k}`;
  const ag = s.agency;
  if (s.permitAge != null) {
    const w = around(s.permitAge, [14, 14.5, 15, 15.5, 16, 16.5, 17]);
    out.push(q4(id('age'), 'state', 'permitAge',
      { en: `In ${N.en}, what is the youngest age to get a learner (instruction) permit?`, es: `En ${N.es}, ¿cuál es la edad mínima para obtener el permiso de aprendizaje?` },
      both((l) => ageLabel(s.permitAge, l)), w.map((a) => both((l) => ageLabel(a, l))),
      { en: `${N.en} issues the first learner permit at ${ageLabel(s.permitAge, 'en')}, according to ${ag}.`, es: `${N.es} otorga el primer permiso de aprendizaje a los ${ageLabel(s.permitAge, 'es')}, según ${ag}.` }));
  }
  if (s.holdMonths != null && s.holdMonths > 0) {
    const w = around(s.holdMonths, [3, 6, 9, 12, 18]);
    out.push(q4(id('hold'), 'state', 'holdMonths',
      { en: `How long must a teen hold a ${N.en} learner permit before the next license stage?`, es: `¿Cuánto tiempo debe tener un adolescente el permiso de aprendizaje de ${N.es} antes de pasar a la siguiente licencia?` },
      both((l) => monthsLabel(s.holdMonths, l)), w.map((m) => both((l) => monthsLabel(m, l))),
      { en: `The permit must be held for at least ${monthsLabel(s.holdMonths, 'en')} in ${N.en} before the road test for the next stage.`, es: `En ${N.es} hay que tener el permiso al menos ${monthsLabel(s.holdMonths, 'es')} antes del examen de manejo de la siguiente etapa.` }));
  }
  if (s.hours != null && s.hours > 0) {
    const w = around(s.hours, [20, 30, 40, 50, 60, 65, 70]);
    const night = s.nightHours ? { en: `, including ${s.nightHours} at night`, es: `, de las cuales ${s.nightHours} de noche` } : { en: '', es: '' };
    out.push(q4(id('hours'), 'state', 'hours',
      { en: `How many hours of supervised driving must a ${N.en} teen log before the road test?`, es: `¿Cuántas horas de manejo supervisado debe registrar un adolescente de ${N.es} antes del examen de manejo?` },
      both((l) => `${formatNumberL(s.hours!, l)} ${l === 'es' ? 'horas' : 'hours'}`), w.map((h) => both((l) => `${formatNumberL(h, l)} ${l === 'es' ? 'horas' : 'hours'}`)),
      { en: `${N.en} requires ${s.hours} hours of supervised practice${night.en}, certified by a parent, guardian or instructor.`, es: `${N.es} exige ${s.hours} horas de práctica supervisada${night.es}, certificadas por un padre, tutor o instructor.` }));
  }
  if (s.testQ != null && s.testPass != null) {
    const need = s.testPass;
    const w = around(need, [need - 4, need - 2, need + 2, need - 6, need + 1]).filter((x) => x > 0 && x <= s.testQ!);
    out.push(q4(id('pass'), 'state', 'testQ',
      { en: `The ${N.en} knowledge test has ${s.testQ} questions. How many must you answer correctly to pass?`, es: `El examen teórico de ${N.es} tiene ${s.testQ} preguntas. ¿Cuántas debe contestar bien para aprobar?` },
      both(() => String(need)), w.slice(0, 3).map((x) => both(() => String(x))),
      { en: `You need ${need} correct answers out of ${s.testQ}, so you can miss ${s.testQ - need}.`, es: `Necesita ${need} respuestas correctas de ${s.testQ}, así que puede fallar ${s.testQ - need}.` }));
  }
  if (s.u21bac != null) {
    const fmt = (v: number) => (v === 0 ? '0.00' : v.toFixed(2));
    const w = around(s.u21bac, [0, 0.01, 0.02, 0.04, 0.05, 0.08]).slice(0, 3);
    out.push(q4(id('bac'), 'state', 'u21bac',
      { en: `In ${N.en}, what blood alcohol concentration is illegal for a driver under 21?`, es: `En ${N.es}, ¿a partir de qué concentración de alcohol en la sangre es ilegal manejar para un menor de 21 años?` },
      both((l) => (s.u21bac === 0 ? (l === 'es' ? 'Cualquier cantidad (0.00)' : 'Any amount (0.00)') : `${fmt(s.u21bac!)} ${l === 'es' ? 'o más' : 'or more'}`)),
      w.map((v) => both((l) => (v === 0 ? (l === 'es' ? 'Cualquier cantidad (0.00)' : 'Any amount (0.00)') : `${fmt(v)} ${l === 'es' ? 'o más' : 'or more'}`))),
      { en: `${N.en} applies a ${fmt(s.u21bac)} limit to drivers under 21, far below the 0.08 adult limit used in most states. Penalties include losing the license.`, es: `${N.es} aplica un límite de ${fmt(s.u21bac)} a los menores de 21 años, muy por debajo del 0.08 de los adultos en la mayoría de los estados. Las sanciones incluyen perder la licencia.` }));
  }
  if (s.interAge != null && s.permitAge != null && s.interAge > s.permitAge) {
    const w = around(s.interAge, [15.5, 16, 16.5, 17, 17.5, 18]);
    out.push(q4(id('inter'), 'state', 'interAge',
      { en: `What is the earliest age for a provisional (intermediate) license in ${N.en}?`, es: `¿Cuál es la edad mínima para la licencia provisional (intermedia) en ${N.es}?` },
      both((l) => ageLabel(s.interAge, l)), w.map((a) => both((l) => ageLabel(a, l))),
      { en: `A ${N.en} teen can move from the permit to the provisional license at ${ageLabel(s.interAge, 'en')} at the earliest, once the holding period and hours are done.`, es: `Un adolescente de ${N.es} puede pasar del permiso a la licencia provisional a partir de los ${ageLabel(s.interAge, 'es')}, una vez cumplidos el tiempo con permiso y las horas.` }));
  }
  if (s.phoneBan === true) {
    out.push(q4(id('phone'), 'state', 'phoneBan',
      { en: `Can a ${N.en} driver with a learner permit or provisional license use a cellphone while driving?`, es: `¿Puede un conductor de ${N.es} con permiso de aprendizaje o licencia provisional usar el celular al manejar?` },
      { en: 'No, not even hands-free, except to call for help in an emergency', es: 'No, ni siquiera con manos libres, salvo para pedir ayuda en una emergencia' },
      [{ en: 'Yes, with a hands-free device', es: 'Sí, con manos libres' }, { en: 'Yes, at red lights', es: 'Sí, en los semáforos en rojo' }, { en: 'Yes, for GPS and texting', es: 'Sí, para GPS y mensajes' }],
      { en: `${N.en} bans all phone use for young drivers in the permit and provisional stages; the exact exceptions are listed by ${ag}.`, es: `${N.es} prohíbe todo uso del celular a los conductores jóvenes durante el permiso y la licencia provisional; ${ag} detalla las excepciones.` }));
  }
  if (s.motoAge != null) {
    const w = around(s.motoAge, [14, 15, 15.5, 16, 17, 18]);
    out.push(q4(id('moto'), 'state-moto', 'motoAge',
      { en: `In ${N.en}, from what age can you get a motorcycle instruction permit?`, es: `En ${N.es}, ¿desde qué edad se puede obtener el permiso de aprendizaje de motocicleta?` },
      both((l) => ageLabel(s.motoAge, l)), w.map((a) => both((l) => ageLabel(a, l))),
      { en: `${N.en} issues motorcycle permits from ${ageLabel(s.motoAge, 'en')}; extra training rules may apply to young riders.`, es: `${N.es} otorga el permiso de motocicleta desde los ${ageLabel(s.motoAge, 'es')}; los pilotos jóvenes pueden tener requisitos adicionales de capacitación.` }));
  }
  return out;
}
