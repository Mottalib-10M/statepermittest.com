/** Configuration centrale du site (générée par new-site.py). */
export const SITE_URL = "https://statepermittest.com";
export const SITE_NAMES: Record<string, string> = {"en": "State Permit Test", "es": "Examen del Permiso por Estado"};
export const LANG_TAGS: Record<string, string> = {"en": "en-US", "es": "es-US"};
export const OG_LOCALES: Record<string, string> = {"en": "en_US", "es": "es_US"};
export const LOCALE_TAG = 'en-US';
export const CURRENCY = 'USD';
export const YEAR = 2026;
/** Année de création du site — signal d'ancienneté (RECETTE §8.0). */
export const SITE_FOUNDED = '2026';
export const LAST_UPDATED = '2026-10-22';
export const AUTHOR_NAME = 'Radif Partners';
export const AUTHOR_ROLE: Record<string, string> = {"en": "Independent publisher of free permit practice tests and state-by-state learner permit rules for the United States", "es": "Editor independiente de exámenes de práctica gratuitos y de las reglas del permiso de aprendizaje de cada estado de Estados Unidos"};
export const AUTHOR_DESC: Record<string, string> = {"en": "Radif Partners reads each state's official driver handbook, its motor vehicle agency pages and its graduated licensing statute, then writes its own practice questions from those facts and records, for all 50 states and DC, the permit age, holding period, supervised hours, test length, passing mark, retake wait and fees, each with the official page it came from. Nothing is locked behind a premium plan: every question, explanation and date calculation is free, works without an account and runs in your browser.", "es": "Radif Partners lee el manual oficial del conductor de cada estado, las páginas de su agencia de vehículos y su ley de licencias graduadas; con esos datos escribe sus propias preguntas de práctica y registra, para los 50 estados y DC, la edad del permiso, el tiempo que hay que tenerlo, las horas supervisadas, el número de preguntas, la nota para aprobar, la espera para repetir y las tarifas, cada dato con la página oficial de donde sale. No hay plan premium: todas las preguntas, explicaciones y fechas son gratis, sin cuenta, y se calculan en su navegador."};
/** Sujets sur lesquels l'editeur est competent (schema.org knowsAbout). Ce sont les
 *  themes reellement traites par le site, pas une liste de mots-cles : un sujet
 *  declare ici sans page qui le couvre est une declaration fausse. */
export const KNOWS_ABOUT: Record<string, string[]> = {"en": ["Learner permit knowledge tests in US states", "Graduated driver licensing laws", "Road signs under the MUTCD", "Commercial learner's permit rules (49 CFR 383)", "Motorcycle permit tests", "Driver license fees by state"], "es": ["Exámenes teóricos del permiso de aprendizaje en los estados de EE. UU.", "Leyes de licencias graduadas", "Señales de tránsito según el MUTCD", "Reglas del permiso de aprendiz comercial (49 CFR 383)", "Exámenes del permiso de motocicleta", "Tarifas de licencias de conducir por estado"]};
export const CONTACT_EMAIL = "contact@statepermittest.com";
export const THEME_COLOR = '#1F3A6E';
export const LOGO_SYMBOL = 'L';
export const BING_VERIFY_CODE = '';
export const GOOGLE_VERIFY_CODE = '';
/** Régime : 'none' pour tous les sites (RECETTE §15.6, décision de l'éditeur du 2026-10-06) :
 *  aucun bandeau ; Clarity chargé en mode sans cookie (consentv2 denied) ; GA4 avec cookies si GA4_ID.
 *  'opt-in' / 'notice' ne servent plus qu'aux sites anciens qui les portent encore. */
export const CONSENT_MODE: 'opt-in' | 'notice' | 'none' = 'none';
/** Propriété Google Analytics 4 (décision de l'éditeur du 2026-10-17, RECETTE §15.6) : GA4 normal,
 *  avec cookies _ga / _ga_<ID> (390 jours), sans bandeau, publicité refusée. Créée par
 *  `seo-platform/scripts/create-ga4.ts accounts/372759688` (RECETTE §15.3, étape 15), puis
 *  pages légales régénérées : `python3 scripts/gen-legal-pages.py .`. Vide = pas de GA4. */
export const GA4_ID = '';
/** Projet Microsoft Clarity (compte amradif), chargé sans cookie. Vide = aucune mesure. */
export const CLARITY_ID = '';
export const INDEXNOW_KEY = '4f04d1cf32a2341be7648bf6de790dec';

/* ------------------------------------------------------------------------- *
 * IDENTITÉ LÉGALE — À COMPLÉTER AVANT LA MISE EN LIGNE
 * Ces champs alimentent la mention légale du pays, la politique de confidentialité,
 * la page contact et le schema Organization. Un champ vide s'affiche en jaune
 * sur le site. Contrôle : `npm run check:legal`.
 * ------------------------------------------------------------------------- */
export interface LegalHosting { name: string; address: string; phone: string; url: string }
export interface LegalIdentity {
  entityName: string; legalForm: string; street: string; postalCode: string; city: string;
  country: string; phone: string; registerLabel: string; registerNumber: string;
  vatLabel: string; vatNumber: string; jurisdiction: string;
  supervisoryAuthority: string; supervisoryAuthorityUrl: string; hosting: LegalHosting;
}
export const LEGAL: LegalIdentity = {
  entityName: 'Radif Partners',            // raison sociale ou nom commercial exploité
  legalForm: '',             // ex. entreprise individuelle, SASU, GmbH, eenmanszaak
  street: '49 rue du Ressort',
  postalCode: '63000',
  city: 'Clermont-Ferrand',
  country: "France",
  phone: '',                 // ligne de contact publiée
  registerLabel: "SIREN",
  registerNumber: '',
  vatLabel: "VAT",
  vatNumber: '',             // laisser vide si non assujetti
  jurisdiction: "France",
  supervisoryAuthority: "Commission nationale de l'informatique et des libertés (CNIL)",
  supervisoryAuthorityUrl: "https://www.cnil.fr",
  hosting: { name: 'GitHub, Inc. (GitHub Pages)', address: '88 Colin P Kelly Jr Street, San Francisco, CA 94107, United States', phone: '', url: 'https://pages.github.com' },
};

/** Champs sans lesquels le site ne doit pas être mis en ligne. */
export const LEGAL_REQUIRED: Array<keyof LegalIdentity> = ['entityName', 'street', 'postalCode', 'city'];  // forme juridique non publiée, comme sur les autres sites du portefeuille

/** Profils publics de l'auteur (schema.org sameAs). Laisser vide si aucun. */
export const AUTHOR_SAME_AS: string[] = [];

/** Rythme de revue éditoriale annoncé sur le site, en mois. */
export const REVIEW_CYCLE_MONTHS = 12;
