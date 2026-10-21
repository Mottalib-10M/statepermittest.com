/** Writing helpers handed to every page: links, state figures read from the data, tables, sources. */
import { route, hasRoute, ROUTES, type Locale } from '../i18n/routes';
import { STATES, stateByCode, stateName, ageLabel, ageShort, monthsLabel, txt, META, type StateRec } from './engine/states';
import { BANK, CDL, MOTO } from './engine/quiz';
import { formatNumberL, money, pct, dateL } from './format-l';
import P from '../data/params-2026.json';

export type SourceKey = keyof typeof P.sources;
const esc = (s: string | number) => String(s).replace(/&(?!(?:[a-z]+|#\d+);)/g, '&amp;').replace(/</g, '&lt;');
export function table(headers: string[], rows: Array<Array<string | number>>, caption?: string, align: Array<'l' | 'r'> = [], lang: Locale = 'en') {
  const al = (i: number) => (align[i] === 'r' ? 'text-right' : 'text-left');
  return `<div class="not-prose my-6 overflow-x-auto"><table class="journal w-full text-sm">${caption ? `<caption class="mb-2 text-left text-sm text-navy-600">${caption}</caption>` : ''}<thead><tr>${headers.map((h, i) => `<th scope="col" class="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-navy-700 ${al(i)}">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td class="tabular-nums border-b border-navy-100 px-3 py-2 text-navy-800 ${al(i)}">${typeof c === 'number' ? esc(formatNumberL(c, lang)) : c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

export function helpers(lang: Locale, strict = false) {
  const a = (id: string, text: string) => {
    if (!ROUTES.some((r) => r.id === id)) { if (strict && !process.env.PAGES_DRAFT) throw new Error(`Unknown page id in a link: ${id}`); return text; }
    return `<a href="${route(id, lang)}">${text}</a>`;
  };
  const statePage = (code: string) => `state-${code.toLowerCase()}`;
  /** Link to a state's own page in this language when it exists, else its name. */
  const sl = (code: string, text?: string) => { const s = stateByCode(code); const n = text ?? stateName(s, lang); return hasRoute(statePage(code), lang) ? a(statePage(code), n) : n; };
  const ext = (url: string, text: string) => `<a href="${url}" target="_blank" rel="nofollow noopener noreferrer">${text}</a>`;
  /** Link to the official page a state figure was read on. */
  const os = (code: string, field: string, text: string) => { const s = stateByCode(code); const u = s.src[field] ?? s.agencyUrl; return ext(u, text); };
  const src = (k: SourceKey, text: string) => ext(P.sources[k].url, text);
  const m = (n: number) => money(n, lang);
  const num = (n: number, d = 0) => formatNumberL(n, lang, d);
  const pc = (x: number, d = 0) => pct(x, lang, d);
  const nc = lang === 'es' ? 'no confirmado' : 'not confirmed';
  const S = (code: string) => {
    const s = stateByCode(code);
    const need = s.testPass ?? (s.testQ && s.testPct ? Math.ceil(s.testQ * s.testPct - 1e-9) : null);
    return {
      ...s, s, nameL: stateName(s, lang), need, canMiss: s.testQ && need ? s.testQ - need : null,
      permitAgeL: ageLabel(s.permitAge, lang), interAgeL: ageLabel(s.interAge, lang), fullAgeL: ageLabel(s.fullAge, lang),
      holdL: monthsLabel(s.holdMonths, lang), ageS: ageShort(s.permitAge),
      pctL: s.testPct ? pct(s.testPct, lang) : nc,
      retakeL: txt(s.retake, lang, nc), nightL: txt(s.night, lang, nc), passengersL: txt(s.passengers, lang, nc),
      driversEdL: txt(s.driversEd, lang, nc), feeNoteL: txt(s.feeNote, lang, ''),
      permitFeeL: s.permitFee != null ? money(s.permitFee, lang) : nc, licenseFeeL: s.feeCombined ? (lang === 'es' ? 'incluida en la tarifa del permiso' : 'included in the permit fee') : s.licenseFee != null ? money(s.licenseFee, lang) : nc,
      note: (k: string) => txt(s.notes[k] ?? null, lang, ''),
    };
  };
  return {
    lang, a, sl, ext, os, src, m, num, pc, nc, S, STATES, META, table: (h: string[], r: Array<Array<string | number>>, c?: string, al: Array<'l' | 'r'> = []) => table(h, r, c, al, lang),
    date: (iso: string) => dateL(iso, lang), stateName: (s: StateRec) => stateName(s, lang), ageLabel: (x: number | null) => ageLabel(x, lang), ageShort,
    counts: { general: BANK.length, cdl: CDL.length, moto: MOTO.length, states: STATES.length },
    /** Ranking helper: states sorted by a numeric field (nulls dropped). */
    rank: (f: (s: StateRec) => number | null, dir: 1 | -1 = 1) => STATES.filter((s) => f(s) != null).sort((x, y) => dir * ((f(x) as number) - (f(y) as number))),
    P,
  };
}
export type Helpers = ReturnType<typeof helpers>;
