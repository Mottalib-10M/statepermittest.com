/**
 * Mini-tools of the guides (RECETTE §9.3): one subject = one calculation, always from the state
 * dataset or the federal rules of the engine, never a second formula. Both languages here.
 */
import type { MiniSpec } from './mini-types';
import { STATES, stateName, ageLabel, ageShort, monthsLabel, txt } from './engine/states';
import { money, formatNumberL } from './format-l';
import { addMonths } from './engine/timeline';

type L = 'en' | 'es';
const opts = (lang: L) => STATES.map((s, i) => ({ value: String(i), label: stateName(s, lang) }));
const at = (v: Record<string, number>, k = 'state') => STATES[Math.max(0, Math.min(STATES.length - 1, Math.round(v[k] ?? 0)))];
export const stateIdx = (code: string) => Math.max(0, STATES.findIndex((s) => s.code === code));
const DEF = stateIdx('CA');
const W = (lang: L) => (lang === 'es'
  ? { nc: 'no confirmado', state: 'Estado', yes: 'Sí', no: 'No' }
  : { nc: 'not confirmed', state: 'State', yes: 'Yes', no: 'No' });
const bacF = (x: number) => (x === 0 ? '0.00' : x.toFixed(2));

const SPECS: Record<string, (lang: L) => MiniSpec> = {
  passmark: (lang) => ({
    title: lang === 'es' ? 'Nota para aprobar el examen teórico de su estado' : 'Pass mark of your state\'s knowledge test', cta: lang === 'es' ? 'Hacer el examen de práctica' : 'Take the practice test', ctaPage: 'home',
    inputs: [{ id: 'state', label: W(lang).state, def: DEF, options: opts(lang) }],
    run: (v) => {
      const s = at(v), w = W(lang);
      const need = s.testPass ?? (s.testQ && s.testPct ? Math.ceil(s.testQ * s.testPct - 1e-9) : null);
      return {
        head: [lang === 'es' ? 'Respuestas correctas necesarias' : 'Correct answers needed', need && s.testQ ? `${need} / ${s.testQ}` : w.nc],
        rows: [
          [lang === 'es' ? 'Preguntas' : 'Questions', s.testQ ? String(s.testQ) : w.nc],
          [lang === 'es' ? 'Porcentaje mínimo' : 'Minimum score', s.testPct ? `${formatNumberL(s.testPct * 100, lang, Number.isInteger(Math.round(s.testPct * 1000) / 10) ? 0 : 1)} %` : w.nc],
          [lang === 'es' ? 'Errores permitidos' : 'Mistakes allowed', need && s.testQ ? String(s.testQ - need) : w.nc],
          [lang === 'es' ? 'Si reprueba, repetir tras' : 'Retake after a fail', txt(s.retake, lang, w.nc)],
        ],
        note: s.testPass == null && s.testPct ? (lang === 'es' ? 'El estado publica un porcentaje, no un número de respuestas: el número se deduce del porcentaje.' : 'The state publishes a percentage, not a number of answers: the count is derived from it.') : undefined,
      };
    },
  }),
  permitage: (lang) => ({
    title: lang === 'es' ? '¿Ya puedo sacar el permiso?' : 'Can I get my permit yet?', cta: lang === 'es' ? 'Calcular todas mis fechas' : 'Work out all my dates', ctaPage: 'permit-age',
    inputs: [{ id: 'state', label: W(lang).state, def: DEF, options: opts(lang) }, { id: 'age', label: lang === 'es' ? 'Edad actual' : 'Age today', def: 15, unit: lang === 'es' ? 'años' : 'yrs', max: 99, decimals: 1 }],
    run: (v) => {
      const s = at(v), w = W(lang), age = v.age ?? 15;
      const months = s.permitAge == null ? null : Math.max(0, Math.ceil((s.permitAge - age) * 12 - 1e-9));
      const head = months == null ? w.nc : months === 0 ? (lang === 'es' ? 'Sí, ya puede' : 'Yes, now') : (lang === 'es' ? `En ${months} ${months === 1 ? 'mes' : 'meses'}` : `In ${months} month${months === 1 ? '' : 's'}`);
      return {
        head: [lang === 'es' ? `Permiso de aprendizaje en ${stateName(s, lang)}` : `Learner permit in ${stateName(s, lang)}`, head],
        rows: [
          [lang === 'es' ? 'Edad mínima del permiso' : 'Minimum permit age', ageLabel(s.permitAge, lang)],
          [lang === 'es' ? 'Licencia provisional' : 'Provisional license', ageLabel(s.interAge, lang)],
          [lang === 'es' ? 'Sin restricciones' : 'Restrictions end', ageLabel(s.fullAge, lang)],
        ],
      };
    },
  }),
  hours: (lang) => ({
    title: lang === 'es' ? 'Horas de práctica supervisada que le faltan' : 'Supervised practice hours you still need', cta: lang === 'es' ? 'Ver todas mis fechas' : 'See all my dates', ctaPage: 'permit-age',
    inputs: [{ id: 'state', label: W(lang).state, def: DEF, options: opts(lang) }, { id: 'done', label: lang === 'es' ? 'Horas ya registradas' : 'Hours already logged', def: 20, unit: 'h', max: 500 }, { id: 'night', label: lang === 'es' ? 'De ellas, de noche' : 'Of which at night', def: 4, unit: 'h', max: 500 }],
    run: (v) => {
      const s = at(v), w = W(lang);
      const left = s.hours == null ? null : Math.max(0, s.hours - (v.done ?? 0));
      const nleft = s.nightHours == null ? null : Math.max(0, s.nightHours - (v.night ?? 0));
      return {
        head: [lang === 'es' ? 'Horas que faltan' : 'Hours left', left == null ? w.nc : s.hours === 0 ? (lang === 'es' ? 'No se exigen' : 'None required') : `${formatNumberL(left, lang)} h`],
        rows: [
          [lang === 'es' ? 'Exigidas por el estado' : 'Required by the state', s.hours == null ? w.nc : `${formatNumberL(s.hours, lang)} h`],
          [lang === 'es' ? 'De noche exigidas' : 'Night hours required', s.nightHours == null ? w.nc : `${formatNumberL(s.nightHours, lang)} h`],
          [lang === 'es' ? 'De noche que faltan' : 'Night hours left', nleft == null ? w.nc : `${formatNumberL(nleft, lang)} h`],
        ],
      };
    },
  }),
  fees: (lang) => ({
    title: lang === 'es' ? 'Lo que cobra el estado por el permiso y la licencia' : 'What the state charges for the permit and license', cta: lang === 'es' ? 'Calcular mis fechas y el costo' : 'Work out my dates and cost', ctaPage: 'permit-age',
    inputs: [{ id: 'state', label: W(lang).state, def: DEF, options: opts(lang) }],
    run: (v) => {
      const s = at(v), w = W(lang);
      const tot = s.permitFee == null && s.licenseFee == null ? null : (s.permitFee ?? 0) + (s.licenseFee ?? 0);
      return {
        head: [lang === 'es' ? 'Permiso + primera licencia' : 'Permit + first license', tot == null ? w.nc : money(tot, lang)],
        rows: [
          [lang === 'es' ? 'Permiso de aprendizaje' : 'Learner permit', s.permitFee == null ? w.nc : money(s.permitFee, lang)],
          [lang === 'es' ? 'Licencia' : 'License', s.feeCombined ? (lang === 'es' ? 'Incluida' : 'Included') : s.licenseFee == null ? w.nc : money(s.licenseFee, lang)],
        ],
        note: txt(s.feeNote, lang, '') || undefined,
      };
    },
  }),
  retake: (lang) => ({
    title: lang === 'es' ? 'Si reprueba: cuándo puede volver a presentarlo' : 'If you fail: when you can take it again', cta: lang === 'es' ? 'Practicar antes de volver' : 'Practice before you go back', ctaPage: 'home',
    inputs: [{ id: 'state', label: W(lang).state, def: DEF, options: opts(lang) }],
    run: (v) => {
      const s = at(v), w = W(lang);
      const need = s.testPass ?? (s.testQ && s.testPct ? Math.ceil(s.testQ * s.testPct - 1e-9) : null);
      return {
        head: [lang === 'es' ? 'Espera antes de repetir' : 'Wait before a retake', txt(s.retake, lang, w.nc)],
        rows: [
          [lang === 'es' ? 'Preguntas' : 'Questions', s.testQ ? String(s.testQ) : w.nc],
          [lang === 'es' ? 'Para aprobar' : 'To pass', need && s.testQ ? `${need} / ${s.testQ}` : s.testPct ? `${Math.round(s.testPct * 100)} %` : w.nc],
        ],
      };
    },
  }),
  clp: (lang) => ({
    title: lang === 'es' ? 'Permiso de aprendiz comercial (CLP): sus plazos' : 'Commercial learner\'s permit (CLP): your dates', cta: lang === 'es' ? 'Examen de práctica CDL' : 'CDL practice test', ctaPage: 'cdl',
    inputs: [{ id: 'days', label: lang === 'es' ? 'Días desde que recibió el CLP' : 'Days since your CLP was issued', def: 5, unit: lang === 'es' ? 'días' : 'days', max: 3650 }, { id: 'age', label: lang === 'es' ? 'Su edad' : 'Your age', def: 20, unit: lang === 'es' ? 'años' : 'yrs', max: 99 }],
    run: (v) => {
      const d = v.days ?? 0, age = v.age ?? 20;
      const wait = Math.max(0, 14 - d), exp = 365 - d;
      return {
        head: [lang === 'es' ? 'Examen práctico posible' : 'Skills test allowed', wait === 0 ? (lang === 'es' ? 'Ya' : 'Now') : (lang === 'es' ? `En ${wait} días` : `In ${wait} days`)],
        rows: [
          [lang === 'es' ? 'El CLP vence en' : 'CLP expires in', exp > 0 ? (lang === 'es' ? `${formatNumberL(exp, lang)} días` : `${formatNumberL(exp, lang)} days`) : (lang === 'es' ? 'Vencido' : 'Expired')],
          [lang === 'es' ? 'Manejar entre estados' : 'Interstate driving', age >= 21 ? W(lang).yes : (lang === 'es' ? 'No antes de los 21' : 'Not before 21')],
          [lang === 'es' ? 'Nota mínima por examen' : 'Pass mark per test', '80 %'],
        ],
        note: lang === 'es' ? 'Plazos de 14 días y de un año: 49 CFR 383.25. Edad de 21 años entre estados: 49 CFR 391.11.' : '14-day and one-year limits: 49 CFR 383.25. Age 21 for interstate driving: 49 CFR 391.11.',
      };
    },
  }),
  bac: (lang) => ({
    title: lang === 'es' ? 'Límite de alcohol para menores de 21 años' : 'Alcohol limit for drivers under 21', cta: lang === 'es' ? 'Practicar las preguntas de alcohol' : 'Practice alcohol questions', ctaPage: 'home',
    inputs: [{ id: 'state', label: W(lang).state, def: DEF, options: opts(lang) }],
    run: (v) => {
      const s = at(v), w = W(lang);
      return {
        head: [lang === 'es' ? `Menores de 21 en ${stateName(s, lang)}` : `Under 21 in ${stateName(s, lang)}`, s.u21bac == null ? w.nc : bacF(s.u21bac)],
        rows: [
          [lang === 'es' ? 'Adultos' : 'Adults', s.code === 'UT' ? '0.05' : '0.08'],
          [lang === 'es' ? 'Choferes de vehículo comercial' : 'Commercial vehicle drivers', '0.04'],
        ],
      };
    },
  }),
  moto: (lang) => ({
    title: lang === 'es' ? 'Permiso de motocicleta de su estado' : 'Your state\'s motorcycle permit', cta: lang === 'es' ? 'Examen de práctica de moto' : 'Motorcycle practice test', ctaPage: 'motorcycle',
    inputs: [{ id: 'state', label: W(lang).state, def: DEF, options: opts(lang) }],
    run: (v) => {
      const s = at(v), w = W(lang);
      return {
        head: [lang === 'es' ? 'Permiso de moto desde' : 'Motorcycle permit from', s.motoAge == null ? w.nc : ageShort(s.motoAge)],
        rows: [
          [lang === 'es' ? 'Preguntas del examen' : 'Test questions', s.motoQ ? String(s.motoQ) : w.nc],
          [lang === 'es' ? 'Para aprobar' : 'To pass', s.motoPass ?? w.nc],
        ],
      };
    },
  }),
  compare: (lang) => ({
    title: lang === 'es' ? 'Comparar dos estados' : 'Compare two states', cta: lang === 'es' ? 'Calcular mis fechas' : 'Work out my dates', ctaPage: 'permit-age',
    inputs: [{ id: 'state', label: lang === 'es' ? 'Estado A' : 'State A', def: DEF, options: opts(lang) }, { id: 'b', label: lang === 'es' ? 'Estado B' : 'State B', def: stateIdx('TX'), options: opts(lang) }],
    run: (v) => {
      const a = at(v), b = at(v, 'b'), w = W(lang);
      const h = (x: number | null) => (x == null ? w.nc : `${x} h`);
      return {
        head: [lang === 'es' ? 'Edad del permiso' : 'Permit age', `${ageShort(a.permitAge)} · ${ageShort(b.permitAge)}`],
        rows: [
          [lang === 'es' ? 'Tiempo con permiso' : 'Time on the permit', `${monthsLabel(a.holdMonths, lang)} · ${monthsLabel(b.holdMonths, lang)}`],
          [lang === 'es' ? 'Horas supervisadas' : 'Supervised hours', `${h(a.hours)} · ${h(b.hours)}`],
          [lang === 'es' ? 'Preguntas del examen' : 'Test questions', `${a.testQ ?? '–'} · ${b.testQ ?? '–'}`],
          [lang === 'es' ? 'Sin restricciones' : 'Restrictions end', `${ageShort(a.fullAge)} · ${ageShort(b.fullAge)}`],
        ],
      };
    },
  }),
  restrictions: (lang) => ({
    title: lang === 'es' ? 'Restricciones de la licencia provisional' : 'Provisional license restrictions', cta: lang === 'es' ? 'Ver mis fechas' : 'See my dates', ctaPage: 'permit-age',
    inputs: [{ id: 'state', label: W(lang).state, def: DEF, options: opts(lang) }],
    run: (v) => {
      const s = at(v), w = W(lang);
      return {
        head: [lang === 'es' ? 'Restricciones hasta' : 'Restrictions until', s.fullAge == null ? w.nc : ageShort(s.fullAge)],
        rows: [
          [lang === 'es' ? 'Celular' : 'Phone', s.phoneBan == null ? w.nc : s.phoneBan ? (lang === 'es' ? 'Prohibido' : 'Banned') : (lang === 'es' ? 'Reglas generales' : 'General rules')],
          [lang === 'es' ? 'Menores de 21: alcohol' : 'Under 21: alcohol', s.u21bac == null ? w.nc : bacF(s.u21bac)],
        ],
        note: [txt(s.night, lang, ''), txt(s.passengers, lang, '')].filter(Boolean).join(' · ') || undefined,
      };
    },
  }),
  spanish: (lang) => ({
    title: lang === 'es' ? '¿Se puede presentar en español en su estado?' : 'Can you take it in Spanish in your state?', cta: lang === 'es' ? 'Practicar en español' : 'Practice in Spanish', ctaPage: 'home',
    inputs: [{ id: 'state', label: W(lang).state, def: DEF, options: opts(lang) }],
    run: (v) => {
      const s = at(v), w = W(lang);
      return {
        head: [lang === 'es' ? 'Examen teórico en español' : 'Knowledge test in Spanish', s.spanish == null ? w.nc : s.spanish ? w.yes : w.no],
        rows: [[lang === 'es' ? 'Agencia' : 'Agency', s.agency]],
      };
    },
  }),
  drivered: (lang) => ({
    title: lang === 'es' ? 'Educación vial obligatoria en su estado' : 'Driver education rules in your state', cta: lang === 'es' ? 'Ver mis fechas' : 'See my dates', ctaPage: 'permit-age',
    inputs: [{ id: 'state', label: W(lang).state, def: DEF, options: opts(lang) }],
    run: (v) => {
      const s = at(v), w = W(lang);
      return {
        head: [lang === 'es' ? `Permiso en ${stateName(s, lang)} desde` : `Permit in ${stateName(s, lang)} from`, s.permitAge == null ? w.nc : ageShort(s.permitAge)],
        rows: [[lang === 'es' ? 'Horas supervisadas' : 'Supervised hours', s.hours == null ? w.nc : `${s.hours} h`]],
        note: txt(s.driversEd, lang, w.nc),
      };
    },
  }),
};
export function getSpec(kind: string, lang: L = 'en'): MiniSpec {
  const f = SPECS[kind];
  if (!f) throw new Error(`Unknown mini spec ${kind}`);
  return f(lang);
}
export const SPEC_KINDS = Object.keys(SPECS);
export { addMonths };
