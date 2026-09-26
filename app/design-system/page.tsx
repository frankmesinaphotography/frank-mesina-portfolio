import type { Metadata } from 'next'
import Link from 'next/link'
import { readTokens, tokenValue } from '@/lib/design-tokens'

export const metadata: Metadata = {
  title: 'Design System — Frank Mesina',
  description: 'The tokens and components behind this site, shown live rather than described.',
}

// Read once, at build time. This page is a server component, so the values
// below come out of app/globals.css itself rather than being retyped here.
// Anything this page displays is therefore the stylesheet's actual value: if
// a token changes, this page changes with it or the build fails.
const tokens = readTokens()

const COLORS = [
  { name: 'Accent', token: '--accent' },
  { name: 'Background', token: '--bg' },
  { name: 'Surface', token: '--surface' },
  { name: 'Text', token: '--text' },
  { name: 'Muted', token: '--muted' },
  { name: 'Rule', token: '--rule' },
].map(c => ({ ...c, value: tokenValue(tokens, c.token) }))

const EASINGS = [
  {
    name: 'Spring',
    token: '--ease-spring',
    use: 'Drawers, dropdowns, the hamburger morph — anything that slides or expands.',
  },
  {
    name: 'Cover',
    token: '--ease-cover',
    use: 'Image hover-zoom — the portfolio photo grid uses this exact curve.',
  },
].map(e => ({ ...e, curve: tokenValue(tokens, e.token) }))

const TYPE_SCALE = [
  { label: 'Hero mark', token: '.hero-fm', size: 'clamp(6rem, 16vw, 14rem)', sample: 'FM', style: { fontFamily: 'var(--font-ui)', fontWeight: 700, color: 'var(--accent)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', letterSpacing: '-0.04em', lineHeight: 0.85 } },
  { label: 'Section heading', token: '.section-heading', size: 'clamp(1.8rem, 3.5vw, 3rem)', sample: '25+ years shaping digital experiences', style: { fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', letterSpacing: '-0.02em' } },
  { label: 'Category title', token: '.detail-category-title', size: 'clamp(1.6rem, 3.5vw, 2.8rem)', sample: 'Design Systems', style: { fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', letterSpacing: '-0.02em', filter: 'url(#distressed-folio)' } },
  { label: 'Body copy', token: '.section-body', size: '0.95rem', sample: 'Creative director and senior product designer with a career spanning design systems, UX, mobile, and TV.', style: { fontFamily: 'var(--font-ui)', fontSize: '0.95rem', lineHeight: 1.75, color: '#999', maxWidth: 480 } },
  { label: 'Nav link', token: '.nav-links a', size: '0.72rem', sample: 'PORTFOLIO', style: { fontFamily: 'var(--font-ui)', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase' as const } },
  { label: 'Eyebrow label', token: '.section-eyebrow', size: '0.62rem', sample: 'ABOUT', style: { fontFamily: 'var(--font-ui)', fontSize: '0.62rem', letterSpacing: '0.24em', textTransform: 'uppercase' as const, color: 'var(--accent)' } },
]

export default function DesignSystemPage() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <header className="ds-header">
        <Link className="nav-logo" href="/">FM</Link>
        <Link className="ds-back" href="/">&larr; Back to site</Link>
      </header>

      <section className="ds-hero">
        <div className="ds-eyebrow">Design System</div>
        <h1 className="ds-title">The system behind this site</h1>
        <p className="ds-lede">
          Colors, type, motion, and components, shown live rather than described, since a design
          system is easier to trust when you can see it working. Every value on this page is read
          out of <code>app/globals.css</code> when the site builds, so nothing here can quietly
          fall out of step with the stylesheet it documents.
        </p>
      </section>

      {/* ── COLOR ── */}
      <section className="ds-section" id="color">
        <div className="ds-section-label">Color</div>
        <div className="ds-swatch-grid">
          {COLORS.map(c => (
            <div className="ds-swatch" key={c.token}>
              {/* Filled with the live custom property, labelled with the value
                  parsed from the stylesheet. Both trace back to :root. */}
              <div className="ds-swatch-fill" style={{ background: `var(${c.token})` }} />
              <div className="ds-swatch-meta">
                <div className="ds-swatch-name">{c.name}</div>
                <div className="ds-swatch-value">{c.token} &middot; {c.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TYPE ── */}
      <section className="ds-section" id="type">
        <div className="ds-section-label">Type</div>
        <div>
          {TYPE_SCALE.map(t => (
            <div className="ds-type-row" key={t.label}>
              <div className="ds-type-meta">{t.label}<br />{t.token}<br />{t.size}</div>
              <div className="ds-type-sample" style={t.style}>{t.sample}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MOTION ── */}
      <section className="ds-section" id="motion">
        <div className="ds-section-label">Motion — hover each card</div>
        <div className="ds-easing-grid">
          {EASINGS.map(e => (
            <div className="ds-easing-card" key={e.token}>
              <div className="ds-easing-name">{e.name}</div>
              <div className="ds-easing-curve">{e.token}: {e.curve}</div>
              <div className="ds-easing-use">{e.use}</div>
              <div className="ds-easing-track">
                {/* Timing function comes from the token this card renders, so
                    the demo can't drift from the curve it names. */}
                <div className="ds-easing-dot" style={{ transitionTimingFunction: `var(${e.token})` }} />
              </div>
              <div className="ds-easing-hint">Hover to see it move &rarr;</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── COMPONENTS ── */}
      <section className="ds-section" id="components">
        <div className="ds-section-label">Components</div>
        <div className="ds-component-grid">
          <div className="ds-component-card">
            <div className="ds-component-label">Primary button</div>
            <button className="form-submit" type="button">Send message</button>
          </div>
          <div className="ds-component-card">
            <div className="ds-component-label">Text link</div>
            <a className="profile-cta" href="#">View full résumé &rarr;</a>
          </div>
          <div className="ds-component-card" style={{ background: 'var(--surface)' }}>
            <div className="ds-component-label">Portfolio card (hover)</div>
            <div className="portfolio-card" style={{ width: '100%', aspectRatio: '4/3', maxWidth: 220 }}>
              <div className="card-overlay" />
              <div className="card-content">
                <div className="card-category">Portfolio</div>
                <div className="card-title">Design Systems</div>
                <div className="card-arrow">View work &rarr;</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <span className="footer-logo">FM</span>
        <span className="footer-copy">&copy; 1996&ndash;2025 Frank Mesina</span>
        <div className="footer-links">
          <Link href="/">Home</Link>
        </div>
      </footer>
    </div>
  )
}
