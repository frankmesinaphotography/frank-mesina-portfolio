// The one `:root` parser in this repo.
//
// Two things read the design tokens: the /design-system page, which renders
// them, and scripts/generate-design-doc.mjs, which documents them. Both used
// to restate the values instead — the page hardcoded hex strings while
// claiming to read from the stylesheet — so they now share this module and
// there is exactly one definition of "what the tokens are."
//
// Server-side only. It touches the filesystem, so never import it into a
// client component. The /design-system page is a server component, so its
// read happens once at build time and ships as static HTML.
//
// The generator imports this file directly (Node 24 strips the types), so
// keep the syntax erasable: no enums, no namespaces, no parameter
// properties.

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

export type Tokens = Map<string, string>

export const GLOBALS_CSS = resolve(process.cwd(), 'app/globals.css')

/** Pull `--name: value;` pairs out of the first `:root` block. */
export function parseRootTokens(css: string): Tokens {
  const root = css.match(/:root\s*\{([\s\S]*?)\n\}/)
  if (!root) throw new Error('no :root block found in app/globals.css')
  const body = root[1].replace(/\/\*[\s\S]*?\*\//g, '')
  const tokens: Tokens = new Map()
  for (const line of body.split('\n')) {
    const m = line.match(/^\s*(--[\w-]+)\s*:\s*(.+?);/)
    if (m) tokens.set(m[1], m[2].trim())
  }
  return tokens
}

export function readTokens(cssPath: string = GLOBALS_CSS): Tokens {
  return parseRootTokens(readFileSync(cssPath, 'utf8'))
}

/**
 * Value for a token that the caller knows exists. Throws rather than
 * returning a placeholder: a swatch quietly rendering "(missing)" is the
 * drift this module exists to prevent.
 */
export function tokenValue(tokens: Tokens, name: string): string {
  const value = tokens.get(name)
  if (value === undefined) {
    throw new Error(`design token ${name} is not defined in app/globals.css`)
  }
  return value
}
