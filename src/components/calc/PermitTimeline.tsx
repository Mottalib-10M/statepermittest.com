/**
 * "When can I get my permit?": date of birth + state → earliest permit, provisional and full
 * license dates, hours to log and fees. First render uses the build day (__BUILD_DAY__) and a
 * default birth date; today's date and a shared link are applied after mount (RECETTE §17.5).
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { STATES, stateByCode, stateName, ageLabel, monthsLabel } from '../../lib/engine/states';
import { timeline, daysBetween } from '../../lib/engine/timeline';
import { dateL, money, formatNumberL } from '../../lib/format-l';
import { readParams, str, updateURL } from '../../lib/url-state';

declare const __BUILD_DAY__: string;
const T = {
  en: {
    state: 'State', dob: 'Date of birth', pdate: 'Permit date (if you already have it)', pdateHelp: 'Leave empty: we use the earliest possible date.',
    head: 'Learner permit from', now: 'You are old enough now', inter: 'Provisional / intermediate license from', full: 'Full license (restrictions end) from',
    hours: 'Supervised hours to log', night: 'of which at night', test: 'Knowledge test', fees: 'DMV fees (permit + license)', nc: 'not confirmed by the state',
    young: 'This permit date is before the minimum age: counted from the earliest legal date.', days: (d: number) => `in ${formatNumberL(d, 'en')} days`,
    q: (n: number, p: string) => `${n} questions, ${p} to pass`, hold: 'Minimum time with the permit', src: 'Official rules of', none: 'none required',
  },
  es: {
    state: 'Estado', dob: 'Fecha de nacimiento', pdate: 'Fecha del permiso (si ya lo tiene)', pdateHelp: 'Déjela vacía: usamos la fecha más temprana posible.',
    head: 'Permiso de aprendizaje desde', now: 'Ya tiene la edad', inter: 'Licencia provisional / intermedia desde', full: 'Licencia completa (sin restricciones) desde',
    hours: 'Horas supervisadas a registrar', night: 'de ellas de noche', test: 'Examen teórico', fees: 'Tarifas del DMV (permiso + licencia)', nc: 'no confirmado por el estado',
    young: 'Esa fecha de permiso es anterior a la edad mínima: contamos desde la fecha legal más temprana.', days: (d: number) => `dentro de ${formatNumberL(d, 'es')} días`,
    q: (n: number, p: string) => `${n} preguntas, ${p} para aprobar`, hold: 'Tiempo mínimo con el permiso', src: 'Reglas oficiales de', none: 'no se exigen',
  },
} as const;

interface Props { lang?: 'en' | 'es'; state?: string; idPrefix?: string }
const defaultDob = (day: string) => `${Number(day.slice(0, 4)) - 15}-${day.slice(5)}`;

export default function PermitTimeline({ lang = 'en', state = 'CA', idPrefix = 't' }: Props) {
  const L = T[lang];
  const [code, setCode] = useState(state);
  const [today, setToday] = useState(__BUILD_DAY__);
  const [dob, setDob] = useState(defaultDob(__BUILD_DAY__));
  const [pdate, setPdate] = useState('');
  useEffect(() => {
    const t = new Date().toISOString().slice(0, 10); setToday(t);
    const u = readParams(window.location.search);
    const c = str(u, 'state', state); if (STATES.some((s) => s.code === c)) setCode(c);
    const b = str(u, 'dob', ''); if (/^\d{4}-\d{2}-\d{2}$/.test(b)) setDob(b); else setDob(defaultDob(t));
    const p = str(u, 'permit', ''); if (/^\d{4}-\d{2}-\d{2}$/.test(p)) setPdate(p);
  }, []);
  useEffect(() => { updateURL({ state: code, dob, permit: pdate || undefined }); }, [code, dob, pdate]);
  const st = stateByCode(code);
  const valid = /^\d{4}-\d{2}-\d{2}$/.test(dob);
  const tl = useMemo(() => (valid ? timeline(st, dob, today, pdate || null) : null), [st, dob, today, pdate, valid]);
  const d = (iso: string | null) => (iso ? dateL(iso, lang) : L.nc);
  const rel = (iso: string | null) => (iso && iso > today ? ` · ${L.days(daysBetween(today, iso))}` : '');
  const inputCls = 'h-12 w-full rounded-lg border border-navy-300 bg-white px-3 text-navy-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20';
  const pPass = st.testPass && st.testQ ? `${st.testPass}/${st.testQ}` : st.testPct ? `${Math.round(st.testPct * 100)} %` : '';
  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
      <form className="grid content-start gap-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <SelectField id={`${idPrefix}-state`} label={L.state} value={code} onChange={setCode} options={STATES.map((s) => ({ value: s.code, label: stateName(s, lang) }))} />
        <div className="grid grid-rows-subgrid row-span-3 content-start gap-y-0">
          <label htmlFor={`${idPrefix}-dob`} className="mb-1 block text-sm font-medium text-navy-700">{L.dob}</label>
          <input id={`${idPrefix}-dob`} type="date" value={dob} max={today} onChange={(e) => setDob(e.target.value)} className={inputCls} />
          <span />
        </div>
        <div className="grid grid-rows-subgrid row-span-3 content-start gap-y-0 sm:col-span-2">
          <label htmlFor={`${idPrefix}-pdate`} className="mb-1 block text-sm font-medium text-navy-700">{L.pdate}</label>
          <input id={`${idPrefix}-pdate`} type="date" value={pdate} onChange={(e) => setPdate(e.target.value)} className={`${inputCls} sm:max-w-xs`} aria-describedby={`${idPrefix}-pdate-help`} />
          <p id={`${idPrefix}-pdate-help`} className="mt-1 text-xs text-navy-600">{L.pdateHelp}</p>
        </div>
      </form>
      <div data-resultat aria-live="polite" className="rounded-xl border border-accent-200 bg-accent-50/60 p-4">
        <p className="text-sm font-medium text-navy-600">{L.head} · {stateName(st, lang)} ({ageLabel(st.permitAge, lang)})</p>
        <p className="tabular-nums mt-1 text-3xl font-bold text-navy-900">{tl ? (tl.permitFrom && tl.permitFrom <= today ? L.now : d(tl.permitFrom)) : '–'}</p>
        {tl && tl.permitFrom && tl.permitFrom > today && <p className="text-sm text-navy-700">{L.days(daysBetween(today, tl.permitFrom))}</p>}
        {tl?.tooYoung && <p className="mt-2 text-xs font-medium text-amber-800" role="status">{L.young}</p>}
        {tl && (
          <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
            <tr><td className="py-1.5 pr-2 text-navy-700">{L.hold}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{monthsLabel(st.holdMonths, lang)}</td></tr>
            <tr><td className="py-1.5 pr-2 text-navy-700">{L.inter}</td><td className="tabular-nums py-1.5 text-right font-semibold text-navy-900">{d(tl.interFrom)}{rel(tl.interFrom)}</td></tr>
            <tr><td className="py-1.5 pr-2 text-navy-700">{L.full}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{d(tl.fullFrom)}</td></tr>
            <tr><td className="py-1.5 pr-2 text-navy-700">{L.hours}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{st.hours == null ? L.nc : st.hours === 0 ? L.none : `${st.hours}${st.nightHours ? ` (${st.nightHours} ${L.night})` : ''}`}</td></tr>
            <tr><td className="py-1.5 pr-2 text-navy-700">{L.test}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{st.testQ && pPass ? L.q(st.testQ, pPass) : L.nc}</td></tr>
            <tr><td className="py-1.5 pr-2 text-navy-700">{L.fees}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{tl.fees != null ? money(tl.fees, lang) : L.nc}</td></tr>
          </tbody></table>
        )}
        <p className="mt-3 text-xs text-navy-600">{L.src} <a href={st.agencyUrl} target="_blank" rel="nofollow noopener noreferrer" className="underline">{st.agency}</a></p>
      </div>
    </div>
  );
}
