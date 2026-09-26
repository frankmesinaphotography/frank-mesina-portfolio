#!/usr/bin/env node
//
// Generates DESIGN.md from app/globals.css.
//
//   npm run design-doc
//
// Token tables written by hand drift the moment someone edits the stylesheet
// and forgets the doc, so every value, class list and count below is read out
// of the CSS and the TSX on each run. Authored guidance lives in the NOTES /
// FAMILIES / RULES blocks in this file. Edit this script, never DESIGN.md.
//
// The core-token list is pulled from the photography site's drift checker so
// the two can't disagree about what "core" means:
//   node "../FM Photography Site/scripts/check-design-tokens.mjs"

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { resolve, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
// Shared with the /design-system page, so the doc and the page can't disagree
// about what the tokens are. Node strips the types on import.
import { parseRootTokens } from '../lib/design-tokens.ts'

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const CSS_PATH = resolve(REPO, 'app/globals.css')
const OUT_PATH = resolve(REPO, 'DESIGN.md')
const CHECK_PATH = resolve(REPO, '..', 'FM Photography Site', 'scripts', 'check-design-tokens.mjs')
const CHECK_CMD = 'node "../FM Photography Site/scripts/check-design-tokens.mjs"'

// Fallback only. The real list comes from the checker when it's reachable.
const CORE_FALLBACK = ['--accent', '--bg', '--surface', '--ease-spring', '--ease-cover', '--font-ui', '--font-serif']

// ── Authored guidance. Values are generated; the "why" is not. ──
const NOTES = {
  '--accent': 'Crimson. Links, eyebrows, hovers, the FM mark. One brand decision across both sites.',
  '--bg': 'Page background. Every full-bleed surface sits on this.',
  '--surface': 'Raised panels: portfolio grid, contact section, component cards.',
  '--font-ui': 'Everything on the site. The fallback stack is longer here than on the photography site, which the checker reports as informational, not drift.',
  '--font-serif': 'Carried for brand parity. Nothing in this repo references it yet.',
  '--ease-spring': 'Slides, expands, drawers: dropdown, hamburger morph, card arrow.',
  '--ease-cover': 'Hover zoom on images. Photo thumbnails only, so far.',
  '--text': 'Neutral white. Body copy, headings, nav links.',
  '--muted': 'Secondary copy: dates, labels, breadcrumbs, footer.',
  '--rule': 'Every 1px divider and border. Roughly 7% white, deliberately faint.',
  '--nav-h': 'Fixed nav height. The mobile menu insets from it, so they stay locked together.',
}

const FAMILIES = {
  ds: 'The live /design-system page.',
  resume: 'The /resume page: timeline entries, contact row, skill tags.',
  detail: 'Full-screen portfolio detail overlays and the image rail.',
  card: 'Portfolio grid cards.',
  portfolio: 'Portfolio grid section and its header.',
  photo: 'Photography teaser grid. Mask plus scaled layer, so a real <img> drops in without restructuring.',
  contact: 'Contact section, links, and the form shell.',
  form: 'Form fields and the submit button. Reused as the primary button on /design-system.',
  footer: 'Site footer.',
  hero: 'Homepage parallax hero.',
  nav: 'Fixed top nav and its links.',
  profile: 'Homepage About block, plus .profile-cta as the standard text link.',
  section: 'Shared section primitives: eyebrow, heading, body. Use these before writing new type styles.',
}

const RULES = [
  'Style new work with the tokens and classes already here before adding CSS. `section-eyebrow`, `section-heading`, `section-body`, `profile-cta` and `form-submit` cover most of what a new page needs.',
  'Never fall back to a bare `ease` or an uncurved transition. Use `--ease-spring` for anything that slides or expands and `--ease-cover` for image zoom. The site used bare `ease` before the token re-sync and it read flatter than the rest of the work.',
  'After changing any core token, run the drift check below. Core is a shared brand decision, so a change here is a change to two sites.',
  'The font `@import` stays the first line of `globals.css`, with the explicit 400 and 700 `@font-face` rules directly after it. The cdnfonts stylesheet lists `local(\'Alte Haas Grotesk\')` first for both weights, which resolves to the installed Regular on a Mac and renders every bold heading at regular weight. The cross-repo check fails a repo that relies on `local()`. Verify a weight change by measuring rendered text width at 400 against 700, never by eye.',
  'Site-only tokens and component classes are free to diverge from the photography repo. They are not expected to match and the checker ignores them.',
  'The distressed title filter is a single SVG `<defs>` block in `app/layout.tsx` (`#distressed-folio`), shared across routes. Reference it with `filter: url(#distressed-folio)`, never a second copy.',
  '`/design-system` is the visual truth for color, type, motion and components. This file holds the rules; the page holds the swatches. Do not restate swatch values here.',
]

// ── Derivation ──
function coreTokens() {
  if (existsSync(CHECK_PATH)) {
    const m = readFileSync(CHECK_PATH, 'utf8').match(/const CORE = \[([^\]]+)\]/)
    if (m) {
      const list = m[1].split(',').map(s => s.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean)
      if (list.length) return { list, source: 'check-design-tokens.mjs' }
    }
  }
  return { list: CORE_FALLBACK, source: 'fallback list in this script' }
}

function definedClasses(css) {
  const bare = css.replace(/\/\*[\s\S]*?\*\//g, '')
  const classes = new Set()
  for (const m of bare.matchAll(/([^{}]+)\{/g)) {
    const head = m[1].trim()
    if (head.startsWith('@')) continue
    for (const c of head.matchAll(/\.([a-zA-Z][\w-]*)/g)) classes.add(c[1])
  }
  return classes
}

function tsxFiles(dir, found = []) {
  for (const name of readdirSync(dir)) {
    const full = resolve(dir, name)
    if (statSync(full).isDirectory()) tsxFiles(full, found)
    else if (name.endsWith('.tsx')) found.push(full)
  }
  return found
}

// Classes reach the DOM three ways here, and a scanner that only reads the
// first one reports live state classes as dead:
//   className="a b"                       plain
//   className={`a ${open ? 'open' : ''}`} template + toggled state
//   cardClass: 'card-1'                   data arrays spread into className
// So: read plain attributes, then any quoted or backticked run inside a
// className={...} expression, then bare string literals anywhere that match
// a class the stylesheet actually defines.
function usedClasses(defined) {
  const used = new Map()
  // Ternaries and template syntax inside className={...} shred into operator
  // fragments (':', '?', '}'), which otherwise surface as phantom classes.
  const looksLikeClass = cls => /^[a-zA-Z][\w-]*$/.test(cls)
  const mark = (cls, file) => {
    if (!looksLikeClass(cls)) return
    if (!used.has(cls)) used.set(cls, new Set())
    used.get(cls).add(relative(REPO, file))
  }
  for (const file of tsxFiles(resolve(REPO, 'app'))) {
    const src = readFileSync(file, 'utf8')
    for (const m of src.matchAll(/className="([^"]+)"/g)) {
      for (const cls of m[1].split(/\s+/).filter(Boolean)) mark(cls, file)
    }
    for (const m of src.matchAll(/className=\{([\s\S]*?)\}\s*(?:>|\n|\/>)/g)) {
      for (const lit of m[1].matchAll(/['"`]([^'"`]*)['"`]/g)) {
        for (const cls of lit[1].split(/\s+/).filter(Boolean)) {
          if (!cls.includes('$')) mark(cls, file)
        }
      }
    }
    // Data arrays: only count a bare literal when it names a real class.
    for (const lit of src.matchAll(/['"`]([a-zA-Z][\w-]*)['"`]/g)) {
      if (defined.has(lit[1])) mark(lit[1], file)
    }
  }
  return used
}

function tokenRefs(css, files) {
  const refs = new Map()
  const sources = [css, ...files.map(f => readFileSync(f, 'utf8'))]
  for (const src of sources) {
    for (const m of src.matchAll(/var\((--[\w-]+)\)/g)) {
      refs.set(m[1], (refs.get(m[1]) ?? 0) + 1)
    }
  }
  return refs
}

const css = readFileSync(CSS_PATH, 'utf8')
const { list: CORE, source: coreSource } = coreTokens()
const tokens = parseRootTokens(css)
const defined = definedClasses(css)
const used = usedClasses(defined)
const refs = tokenRefs(css, tsxFiles(resolve(REPO, 'app')))

const siteOnly = [...tokens.keys()].filter(t => !CORE.includes(t))

// Group by dashed prefix, but only where a prefix genuinely has members.
// Splitting blindly on the first dash invents families out of single state
// classes (.open, .prev, .has-dropdown), which reads like structure that
// isn't there.
const byPrefix = new Map()
for (const cls of [...defined].sort()) {
  const key = cls.includes('-') ? cls.split('-')[0] : cls
  if (!byPrefix.has(key)) byPrefix.set(key, [])
  byPrefix.get(key).push(cls)
}
const isFamily = ([key, classes]) => classes.length > 1 || key in FAMILIES
const families = new Map([...byPrefix].filter(isFamily))
const standalone = [...byPrefix].filter(e => !isFamily(e)).flatMap(([, classes]) => classes).sort()

const usedNotDefined = [...used.keys()].filter(c => !defined.has(c)).sort()
const definedNotUsed = [...defined].filter(c => !used.has(c)).sort()
const unreferencedTokens = [...tokens.keys()].filter(t => !refs.has(t))

// ── Emit ──
const note = t => NOTES[t] ?? ''
const row = t => `| \`${t}\` | \`${tokens.get(t) ?? '(missing)'}\` | ${note(t)} |`

const lines = []
lines.push('# Design')
lines.push('')
lines.push('<!-- Generated by scripts/generate-design-doc.mjs. Run `npm run design-doc` after editing app/globals.css. Do not hand-edit this file. -->')
lines.push('')
lines.push('How this site is styled, and the rules for adding to it. There are no swatches here on purpose: [`/design-system`](app/design-system/page.tsx) renders the real tokens live and is the visual truth. This file is the written half.')
lines.push('')
lines.push('Tokens live in one place, the `:root` block of [`app/globals.css`](app/globals.css). There is no theme layer and no Tailwind config in play; Tailwind is installed but unused.')
lines.push('')

lines.push('## Core (shared with the photography site)')
lines.push('')
lines.push('One brand decision across both repos. Changing a value here changes two sites, so treat it as a brand change rather than a CSS tweak.')
lines.push('')
lines.push('| Token | Value | Used for |')
lines.push('|---|---|---|')
for (const t of CORE) lines.push(row(t))
lines.push('')
lines.push('The photography site\'s own table is not duplicated here. To confirm the two repos still agree, run:')
lines.push('')
lines.push('```bash')
lines.push(CHECK_CMD)
lines.push('```')
lines.push('')
lines.push(`Exit 0 is in sync, exit 1 prints the drifted values. Font tokens compare the first family only, since fallback stacks legitimately differ between the repos. The list above is read from that checker at generation time (source: ${coreSource}), so the two definitions of "core" cannot drift apart.`)
lines.push('')

lines.push('## This site only')
lines.push('')
lines.push('Not shared, not checked, free to diverge from the photography repo.')
lines.push('')
lines.push('| Token | Value | Used for |')
lines.push('|---|---|---|')
for (const t of siteOnly) lines.push(row(t))
lines.push('')
lines.push('### Component classes')
lines.push('')
lines.push('Plain global classes in `app/globals.css`, no CSS modules. Grouped by prefix.')
lines.push('')
lines.push('| Family | Classes | What it covers |')
lines.push('|---|---|---|')
for (const [family, classes] of families) {
  lines.push(`| \`${family}-*\` | ${classes.length} | ${FAMILIES[family] ?? ''} |`)
}
lines.push('')
if (standalone.length) {
  lines.push(`Plus ${standalone.length} standalone state and modifier classes, toggled from TSX rather than written into markup: ${standalone.map(c => `\`.${c}\``).join(', ')}.`)
  lines.push('')
}

lines.push('## Rules')
lines.push('')
for (const rule of RULES) lines.push(`- ${rule}`)
lines.push('')

if (usedNotDefined.length || definedNotUsed.length || unreferencedTokens.length) {
  lines.push('## Flags')
  lines.push('')
  lines.push('Generated each run. An entry here is a thing to fix or to decide about, not a permanent fact.')
  lines.push('')
  if (usedNotDefined.length) {
    lines.push('**Used in TSX, not defined in CSS** (renders unstyled):')
    lines.push('')
    for (const c of usedNotDefined) {
      lines.push(`- \`.${c}\` in ${[...used.get(c)].map(f => `\`${f}\``).join(', ')}`)
    }
    lines.push('')
  }
  if (definedNotUsed.length) {
    lines.push(`**Defined in CSS, unused in TSX** (${definedNotUsed.length}): ${definedNotUsed.map(c => `\`.${c}\``).join(', ')}`)
    lines.push('')
    lines.push('Some of these are applied by state or by a parent selector rather than written into markup, so check before deleting.')
    lines.push('')
  }
  if (unreferencedTokens.length) {
    lines.push(`**Tokens never referenced via \`var()\`**: ${unreferencedTokens.map(t => `\`${t}\``).join(', ')}`)
    lines.push('')
  }
}

writeFileSync(OUT_PATH, lines.join('\n'))
console.log(`wrote ${relative(REPO, OUT_PATH)}`)
console.log(`  core tokens:      ${CORE.length} (from ${coreSource})`)
console.log(`  site-only tokens: ${siteOnly.length}`)
console.log(`  classes:          ${defined.size} in ${families.size} families`)
if (usedNotDefined.length) console.log(`  flagged:          ${usedNotDefined.length} class(es) used but undefined`)
