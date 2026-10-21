import type { Locale } from './routes';
const en = {
  updatedOn: 'State rules checked on', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Questions and state rules by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'Questions new drivers ask', relatedCalculators: 'Keep practicing', sourcesTitle: 'Official handbooks and rules behind this page', writtenBy: 'Written by',
  asOf: 'Permit rules for 2026 read on each state agency site', lastUpdated: 'last checked on',
  footerValidated: 'Every state figure links to the official page it came from',
  footerBrowser: 'Tests and dates run in your browser · nothing you type is sent · free, no account, no premium plan, no email',
  footerDisclaimer: 'State Permit Test is an independent site published by Radif Partners. It is not a DMV, a state agency or a driving school, and its practice questions are not the official test. Questions and dates are for guidance only and do not replace your state handbook: rules change, so confirm with your state before you go.',
  footerPopular: 'Practice tests by state',
  notFound: 'There is no page at this address. The free practice test for every state is on the home page.',
  readMore: 'Read more', back: 'Home',
  disclaimer: 'Practice questions written by Radif Partners from each state handbook and federal rules; they are not questions from the official test. Permit rules and fees change: check with your state motor vehicle agency before your visit.',
};
const es: typeof en = {
  updatedOn: 'Reglas estatales revisadas el', editorialPolicy: 'Política editorial', contactLabel: 'Contacto', reviewedBy: 'Preguntas y reglas estatales por',
  skipToContent: 'Ir al contenido', mainNav: 'Navegación principal', breadcrumbLabel: 'Ruta de navegación', breadcrumbHome: 'Inicio', menuOpen: 'Abrir menú',
  faqTitle: 'Preguntas de los nuevos conductores', relatedCalculators: 'Siga practicando', sourcesTitle: 'Manuales y reglas oficiales de esta página', writtenBy: 'Escrito por',
  asOf: 'Reglas del permiso 2026 leídas en el sitio de cada agencia estatal', lastUpdated: 'última revisión el',
  footerValidated: 'Cada dato estatal enlaza a la página oficial de donde sale',
  footerBrowser: 'Exámenes y fechas se calculan en su navegador · nada de lo que escribe se envía · gratis, sin cuenta, sin plan premium, sin correo',
  footerDisclaimer: 'Examen del Permiso por Estado es un sitio independiente publicado por Radif Partners. No es un DMV, ni una agencia estatal, ni una autoescuela, y sus preguntas de práctica no son el examen oficial. Preguntas y fechas son orientativas y no sustituyen el manual de su estado: las reglas cambian, confírmelas con su estado antes de ir.',
  footerPopular: 'Exámenes de práctica por estado',
  notFound: 'No hay ninguna página en esta dirección. El examen de práctica gratuito de cada estado está en la página de inicio.',
  readMore: 'Leer más', back: 'Inicio',
  disclaimer: 'Preguntas de práctica escritas por Radif Partners a partir del manual de cada estado y de las reglas federales; no son preguntas del examen oficial. Las reglas y tarifas cambian: consulte la agencia de vehículos de su estado antes de ir.',
};
export function t(lang: Locale) { return lang === 'es' ? es : en; }
