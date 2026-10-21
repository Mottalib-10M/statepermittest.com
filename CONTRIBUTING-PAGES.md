# Adding or editing a page

One page = one file `src/content/pages/<id>.ts` exporting `definePage({...})` (types in
`src/lib/guide-types.ts`). The file name must equal `id`. Models: `permit-age.ts` (guide with the
date tool) and `state-ca.ts` (state page). The page is built at `/en/<en.slug>/` and, when `es` is
present, at `/es/<es.slug>/`; the hreflang pair, menus, home lists and sitemap follow by themselves.

## Fields

- `group`: `tests` (practice tests), `rules` (permit rules and dates) or `states`.
- `order`: position in its group (guides 1–60, states 100+ in the order of the list).
- `state`: two-letter code on a state page; the tools open on that state.
- `tool`: the main tool, shown right under the H1 (first screen). `{ kind: 'quiz', props: { type: 'car' | 'signs' | 'moto' | 'cdl' } }`,
  `{ kind: 'timeline' }` or `{ kind: 'mini:<spec>' }`. Every page has one (RECETTE §9.3).
- `mini`: a second, smaller tool under the citable block (optional). Mini specs, in `src/lib/mini-specs.ts`:
  `passmark`, `permitage`, `hours`, `fees`, `retake`, `clp`, `bac`, `moto`, `compare`, `restrictions`, `spanish`, `drivered`.
  Props: `{"state":"TX"}`, `{"state":"CA","b":"TX"}` (compare), numbers for number fields.
- In a body, `<!--tool:mini:hours|{"state":"OH"}-->` places a tool between paragraphs.
- `related`: 4–6 page ids (`home`, guides, `state-xx`). Ids that do not exist in a language are skipped.
- `sources`: keys of `src/data/params-2026.json` (`mutcd`, `handbooks`, `nhtsa_teen`, `nhtsa_alcohol`,
  `nhtsa_drowsy`, `nhtsa_moto`, `nhtsa_helmet`, `nhtsa_bus`, `cfr383`, `cfr391`, `cfr392`, `cfr395`,
  `cfr380`, `cfr382`, `cfr396`). A state page adds the agency, its handbook and every page a figure was read on.

## Text rules (checked by `npm run check`)

- `title` 50–60 characters, key term first ("Texas Permit Test 2026: …", never "How…", "What…", "Calculator…").
- `description` 150–160 characters, exactly.
- `resume(h)`: ONE paragraph of at least 130 words that answers the page's question with figures; it is shown
  folded after its first sentence.
- `faqs(h)`: 3–5 questions unique to the page, each answer 40–90 words. Never the same question on two pages.
- `body(h)`: HTML, `<h2>` sections, at least 600 words on a guide (tables count), 450 on a state page. No `<h1>`.
- No em dash (—) anywhere; use a colon, comma or parentheses. American spelling (license, color).
- Spanish: neutral US Spanish ("manejar", "licencia", "usted"), not a word-for-word translation; percent with a
  no-break space (`80 %`), decimal point kept for alcohol limits (0.08).
- Every page must read differently: check-unique fails above 30 % shared sentences between two pages. Do not
  reuse sentence templates across state pages; vary structure, angle and the comparisons.
- No link to another website than official sources (`.gov`, ecfr, state agencies). No driving school, app,
  insurer, affiliate. Never present the site as a DMV; no official logo.

## Figures

Never type a state figure: read it through the helpers `h` (`src/lib/helpers.ts`):
`h.S('TX')` gives the record and labels (`permitAgeL`, `holdL`, `interAgeL`, `fullAgeL`, `pctL`, `need`,
`canMiss`, `retakeL`, `nightL`, `passengersL`, `driversEdL`, `permitFeeL`, `licenseFeeL`, `feeNoteL`, `note(k)`, `nameL`),
`h.sl(code)` state link, `h.a(id, text)` internal link, `h.os(code, field, text)` link to the official page of a
figure, `h.src(key, text)` federal source link, `h.table(headers, rows, caption, align)`, `h.rank(fn, dir)`,
`h.num`, `h.pc`, `h.m` (money), `h.nc` ("not confirmed"). A null figure must read naturally: test it
(`s.testQ ? … : …`) and say the agency does not publish it. Federal facts (MUTCD shapes, 49 CFR rules,
0.08 adult BAC, 0.04 commercial) may be written as text with their source link.
