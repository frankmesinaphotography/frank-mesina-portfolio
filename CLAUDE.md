# Frank Mesina Portfolio

Personal design and development portfolio. Next.js 15, React 19, TypeScript, plain CSS
custom properties (Tailwind is installed but unused).

## Design system governance

**The FM Photography site owns the master design system**: its `DESIGN.md` and the core
tokens in its `app/globals.css`. This site is a consumer.

- **Never edit the photo site's repo, its `DESIGN.md`, or its core tokens.** Not to fix
  something, and not to "sync." Reading it is fine; writing to it is not.
- **If this site needs a different core value, do not change the master.** Declare an
  override in this repo at `design-overrides.json`, with a reason:
  ```json
  { "--accent": "why this site deviates" }
  ```
  A declared override is visible and passes. Silent divergence is the thing this prevents.
- **Correctness rules cannot be overridden at all.** The locked Alte Haas font faces are
  one of these: the font `@import` stays the first line of `app/globals.css`, with explicit
  400 and 700 `@font-face` rules directly after it. Never rely on `local('Alte Haas Grotesk')`,
  which resolves to the installed Regular on a Mac and renders every bold heading at regular
  weight. Verify a weight change by measuring rendered text width at 400 against 700, never
  by eye.
- **Verify before any push that touches `app/globals.css`:**
  ```bash
  COMPARE_DIR="$PWD" node "../FM Photography Site/scripts/check-design-tokens.mjs"
  ```
  `✓` match, `~` declared override, `✗` drift. Undeclared drift exits 1. The check also
  fails a repo whose Bold depends on `local()`.
- **If the system itself should change, tell Frank.** He decides, and the change is made in
  the photo site session, not here.

As of 2026-09-26 this repo declares **no overrides** and the check passes. One known
non-issue: `--font-ui` carries a longer fallback stack here than on the photo site. The
check compares the first family only and reports that as informational, not drift, so it
needs no override. Leave it alone.

## This repo's own design doc

- `DESIGN.md` is **generated** by `scripts/generate-design-doc.mjs` (`npm run design-doc`).
  **Edit the script, never `DESIGN.md`.** Re-run it after any change to `app/globals.css`.
- `lib/design-tokens.ts` is the only `:root` parser in the repo. The `/design-system` page
  and the generator both import it, so the page and the doc cannot disagree. Keep its syntax
  erasable (no enums, namespaces or parameter properties) or the generator's `.ts` import
  breaks.
- `/design-system` is the visual truth for color, type, motion and components. `DESIGN.md`
  holds the rules; the page holds the swatches.

## Going live

**Nothing gets committed or pushed until Frank says "push."** If a message is ambiguous
about going live, ask. "Local only" means hold everything until an explicit push, then
bundle the whole stretch into one push.

Push means, in order:

```bash
git checkout dev && git commit   # work lands on dev, never straight on main
git push origin dev
git checkout main && git merge dev --no-edit
git push origin main             # this is what deploys production
```

Then watch the Vercel deployment until it's Ready and confirm the real changed content on
https://frank-mesina-portfolio.vercel.app without being asked. Next streams HTML, so
`curl | grep` produces false alarms; look at the rendered page.

- **Stage only the files for the approved work.** Never `git add .`. This repo is public,
  and `docs/` holds local-only material that must not land here.
- Commits are authored `Frank Mesina <fmesina68@gmail.com>` (already set in this repo's git
  config). Vercel's Hobby plan blocks deploys whose author it can't match to Frank's account.
- **Run `npm run build` before trusting a deploy.** `next dev` skips the lint-as-error pass,
  which is what broke the first production build.
- **frankmesina.com stays unpointed** until Frank explicitly says go. It's still on
  Squarespace, and this rebuild is the path off it, but the DNS move is his call alone.

## Dev server

- This project runs on **port 3001**: `preview_start` with the "Frank Mesina Portfolio"
  config in `.claude/launch.json`, or `npm run dev -- -p 3001`.
- **Port 3000 is the photography site. Never kill it.**
- When freeing 3001, kill the **listener only**: `lsof -ti :3001 -sTCP:LISTEN`. A bare
  `lsof -ti :3001` also returns connected browser processes, and piping that to `kill`
  takes out part of the browser.
- **Never run `npm run build` while the dev server is running.** Both write `.next`, and the
  build rewrites chunks underneath the running server, producing Next error E394
  (`Cannot find module './NNN.js'`) on every route. Stop the server, build, restart.
- Only `rm -rf .next` on real corruption evidence like E394, never preventatively.

## Images

Every image has to land in **two** places or production breaks:

1. `public/` — what local dev on 3001 serves.
2. The **R2 bucket** (rclone remote `r2-portfolio:`) — what Vercel Preview and Production
   serve. Same relative path in both.

`NEXT_PUBLIC_IMAGE_BASE` is set on Vercel Preview and Production only, so
`imageUrl()` in `lib/images.ts` resolves to `public/` locally and to the bucket when
deployed. **An image added only to `public/` looks perfect locally and 404s in production.**
Always reference images through `imageUrl()`, never a bare root-relative path.

Frank stages source images on an external drive and hands over a folder; mirror its
structure under `public/images/`, lowercase with hyphens, and copy with `cp -n` so nothing
existing is ever overwritten.
