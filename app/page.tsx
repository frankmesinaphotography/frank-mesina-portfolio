const NAV_LINKS = [
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#resume',    label: 'Resumé' },
  { href: '#contact',   label: 'Contact' },
]

export default function HomePage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', color: '#fff' }}>

      {/* ── NAV ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2.5rem', height: 72,
        borderBottom: '1px solid var(--border-nav)',
        background: 'var(--overlay-header)',
        backdropFilter: 'blur(12px)',
      }}>
        <span style={{
          fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '1.4rem',
          color: 'var(--accent)', letterSpacing: '-0.02em',
        }}>
          FM
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--text-nav)', textDecoration: 'none',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'flex-start', justifyContent: 'center',
        padding: '0 2.5rem', maxWidth: 900,
      }}>
        <p style={{
          fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase',
          color: 'var(--accent)', marginBottom: '1.5rem',
        }}>
          Frank Mesina
        </p>
        <h1 style={{
          fontFamily: 'var(--font-ui)', fontWeight: 700,
          fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', lineHeight: 0.98,
          textTransform: 'uppercase', color: '#fff', marginBottom: '1.5rem',
        }}>
          Design &amp;<br />Development
        </h1>
        <p style={{
          fontSize: '0.95rem', lineHeight: 1.75, color: 'var(--text-body)',
          maxWidth: 560,
        }}>
          Placeholder intro copy — replace with the real line. This scaffold
          carries over the FM Photography rebuild's palette, type, and dark
          theme; content and structure (portfolio pieces, résumé, case studies)
          still need to be built out.
        </p>
      </section>

      {/* ── PORTFOLIO (placeholder) ── */}
      <section id="portfolio" style={{ padding: '6rem 2.5rem', borderTop: '1px solid var(--border-default)' }}>
        <p style={{
          fontSize: '0.5rem', letterSpacing: '0.4em', textTransform: 'uppercase',
          color: 'var(--text-ghost)', marginBottom: '1.5rem',
        }}>
          Portfolio
        </p>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Project entries go here — not yet built.
        </p>
      </section>

      {/* ── RESUME (placeholder) ── */}
      <section id="resume" style={{ padding: '6rem 2.5rem', borderTop: '1px solid var(--border-default)' }}>
        <p style={{
          fontSize: '0.5rem', letterSpacing: '0.4em', textTransform: 'uppercase',
          color: 'var(--text-ghost)', marginBottom: '1.5rem',
        }}>
          Résumé
        </p>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Experience / skills go here — not yet built.
        </p>
      </section>

      {/* ── CONTACT / FOOTER ── */}
      <footer id="contact" style={{
        padding: '3rem 2.5rem', borderTop: '1px solid var(--border-default)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 16,
      }}>
        <a href="mailto:frankmesina@sbcglobal.net" style={{
          fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase',
          color: 'var(--accent)', textDecoration: 'none',
        }}>
          frankmesina@sbcglobal.net
        </a>
        <span style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--text-ghost)' }}>
          © Frank Mesina
        </span>
      </footer>
    </div>
  )
}
