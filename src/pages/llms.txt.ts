/** llms.txt (RECETTE §21): what the site is, where its figures come from, its main pages. Built from the data. */
import type { APIRoute } from 'astro';
import { PAGES } from '../lib/guides';
import { route } from '../i18n/routes';
import { SITE_URL, LAST_UPDATED } from '../data/site-config';
import { STATES, META } from '../lib/engine/states';
import { BANK, CDL, MOTO } from '../lib/engine/quiz';
export const GET: APIRoute = () => {
  const lines = [
    '# State Permit Test',
    '',
    `> Free learner permit practice tests for the ${STATES.length} US jurisdictions (50 states and DC), in English and Spanish: ${BANK.length} general questions written from state driver handbooks and the federal MUTCD, questions specific to each state generated from its verified rules, ${CDL.length} CDL and ${MOTO.length} motorcycle questions, every answer explained. Each state's permit age, holding period, supervised hours, test length, pass mark, retake wait and fees were read on the official page of its motor vehicle agency (${META.fields - META.nulls} confirmed figures of ${META.fields}, last checked ${LAST_UPDATED}); figures not found on an official page are shown as not confirmed. A calculator gives the permit, provisional and full license dates from a date of birth. Published by Radif Partners, an independent publisher; not a DMV, no paywall, no account.`,
    '',
    '## Tools and guides (English)',
    `- [Permit practice test](${SITE_URL}${route('home', 'en')}): scored against the chosen state's pass mark.`,
    ...PAGES.map((p) => `- [${p.en.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.en.card}`),
    '',
    '## En español',
    `- [Examen de práctica del permiso](${SITE_URL}${route('home', 'es')})`,
    ...PAGES.filter((p) => p.es).map((p) => `- [${p.es!.nav}](${SITE_URL}${route(p.id, 'es')}): ${p.es!.card}`),
    '',
    '## Method',
    `- [How the questions and state rules are built](${SITE_URL}${route('method', 'en')})`,
    `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
