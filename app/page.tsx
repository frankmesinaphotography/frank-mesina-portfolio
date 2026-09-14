'use client'

import { useEffect, useRef, useState } from 'react'

type Category = {
  key: string
  title: string
  cardClass: string
  icon: React.ReactNode
  slides: string[]
  subtitle: string
  desc: string
  role: string
}

// ── Category icons — exact line-art from the original exploration ──
const DesignSystemsIcon = () => (
  <svg width="80" height="70" viewBox="0 0 80 70" fill="none">
    <rect x="6" y="6" width="68" height="58" rx="2" stroke="#fff" strokeWidth="1.5" />
    <line x1="6" y1="18" x2="74" y2="18" stroke="#fff" strokeWidth="1" />
    <rect x="12" y="26" width="16" height="8" rx="1" fill="#fff" opacity="0.15" />
    <rect x="32" y="26" width="16" height="8" rx="1" fill="#fff" opacity="0.1" />
    <rect x="52" y="26" width="16" height="8" rx="1" fill="#fff" opacity="0.1" />
    <rect x="12" y="40" width="16" height="8" rx="1" fill="#fff" opacity="0.08" />
    <rect x="32" y="40" width="16" height="8" rx="1" fill="#fff" opacity="0.12" />
    <rect x="52" y="40" width="16" height="8" rx="1" fill="#fff" opacity="0.06" />
  </svg>
)
const MobileIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    <rect x="10" y="16" width="60" height="48" rx="2" stroke="#fff" strokeWidth="1.5" />
    <rect x="30" y="68" width="20" height="4" fill="#fff" />
    <line x1="10" y1="56" x2="70" y2="56" stroke="#fff" strokeWidth="1.5" />
  </svg>
)
const TVIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    <rect x="6" y="12" width="68" height="44" rx="2" stroke="#fff" strokeWidth="1.5" />
    <rect x="28" y="58" width="24" height="6" fill="#fff" opacity="0.5" />
    <rect x="32" y="64" width="16" height="4" fill="#fff" opacity="0.3" />
  </svg>
)
const WebsitesIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    <rect x="8" y="10" width="64" height="50" rx="2" stroke="#fff" strokeWidth="1.5" />
    <line x1="8" y1="22" x2="72" y2="22" stroke="#fff" strokeWidth="1.5" />
    <rect x="14" y="28" width="20" height="16" rx="1" fill="#fff" opacity="0.15" />
    <rect x="40" y="28" width="26" height="6" rx="1" fill="#fff" opacity="0.1" />
    <rect x="40" y="38" width="18" height="6" rx="1" fill="#fff" opacity="0.08" />
  </svg>
)
const LogosIcon = () => (
  <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
    <circle cx="20" cy="30" r="14" stroke="#fff" strokeWidth="1.5" />
    <path d="M34 30 L60 30" stroke="#fff" strokeWidth="1.5" />
    <path d="M52 22 L60 30 L52 38" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
)
const KioskIcon = () => (
  <svg width="60" height="80" viewBox="0 0 60 80" fill="none">
    <rect x="8" y="6" width="44" height="68" rx="2" stroke="#fff" strokeWidth="1.5" />
    <rect x="16" y="20" width="28" height="20" rx="1" fill="#fff" opacity="0.1" />
    <rect x="16" y="46" width="28" height="6" rx="1" fill="#fff" opacity="0.08" />
    <rect x="16" y="56" width="20" height="6" rx="1" fill="#fff" opacity="0.06" />
  </svg>
)

// ── Portfolio categories — real subtitle/desc/role where it exists (Design
// Systems, TV & Connected Devices); everything else is still an honest
// "Placeholder" exactly as it was in the original exploration — not invented. ──
const CATEGORIES: Category[] = [
  {
    key: 'design-systems', title: 'Design Systems', cardClass: 'card-6', icon: <DesignSystemsIcon />,
    slides: ['DS — Component library overview', 'DS — Token architecture', 'DS — AI handoff documentation', 'DS — VS Code integration'],
    subtitle: 'Tempus — AI-Ready Design System',
    desc: `Leading the evolution of Tempus's design system to be machine-readable — enabling Claude to interpret component tokens and specs directly in VS Code, reducing design-to-developer handoff friction across the product org.`,
    role: 'Role: Creative Director / Design Systems Lead',
  },
  {
    key: 'mobile-media', title: 'Mobile Media', cardClass: 'card-1', icon: <MobileIcon />,
    slides: ['Mobile project — screen 1', 'Mobile project — screen 2', 'Mobile project — screen 3'],
    subtitle: 'Project Title Placeholder', desc: 'Placeholder — add project description here.', role: 'Role: Placeholder',
  },
  {
    key: 'tv-connected', title: 'TV & Connected Devices', cardClass: 'card-2', icon: <TVIcon />,
    slides: ['Redbox Instant — Now Playing screen', 'Redbox Instant — Browse screen', 'Redbox Instant — PS4 nav', 'Redbox Instant — Detail screen'],
    subtitle: 'Sony PlayStation 3 & 4 Application',
    desc: 'Designed and managed core set of UX and visual designs for Redbox Instant Consumer Electronics application for Sony PlayStation 3 & 4.',
    role: 'Role: UX/UI Visual Design Lead',
  },
  {
    key: 'websites', title: 'Websites', cardClass: 'card-3', icon: <WebsitesIcon />,
    slides: ['Website project — screen 1', 'Website project — screen 2', 'Website project — screen 3'],
    subtitle: 'Project Title Placeholder', desc: 'Placeholder — add project description here.', role: 'Role: Placeholder',
  },
  {
    key: 'logos', title: 'Logos & Illustration', cardClass: 'card-4', icon: <LogosIcon />,
    slides: ['Logo / branding — concept 1', 'Logo / branding — concept 2', 'Illustration work'],
    subtitle: 'Project Title Placeholder', desc: 'Placeholder — add project description here.', role: 'Role: Placeholder',
  },
  {
    key: 'kiosk', title: 'Kiosk', cardClass: 'card-5', icon: <KioskIcon />,
    slides: ['Kiosk project — screen 1', 'Kiosk project — screen 2', 'Kiosk project — screen 3'],
    subtitle: 'Project Title Placeholder', desc: 'Placeholder — add project description here.', role: 'Role: Placeholder',
  },
]

const MOBILE_LINKS = [
  { href: '#profile', label: 'About' },
  { href: '#resume', label: 'Résumé' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#photography', label: 'Photography' },
  { href: '#contact', label: 'Contact' },
]

export default function HomePage() {
  const [navScrolled, setNavScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDetail, setActiveDetail] = useState<string | null>(null)
  const heroBgRef = useRef<HTMLDivElement>(null)

  // Nav scroll state + hero parallax — rAF-throttled, same pattern as the
  // photography site's GalleryView hero parallax.
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      setNavScrolled(window.scrollY > 60)
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        if (heroBgRef.current && y < window.innerHeight * 1.5) {
          heroBgRef.current.style.transform = `translateY(${y * 0.35}px)`
        }
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function closeMenu() {
    setMobileMenuOpen(false)
  }

  const active = CATEGORIES.find(c => c.key === activeDetail) ?? null
  const activeIdx = active ? CATEGORIES.indexOf(active) : -1
  const prevCategory = activeIdx > 0 ? CATEGORIES[activeIdx - 1] : null
  const nextCategory = activeIdx >= 0 && activeIdx < CATEGORIES.length - 1 ? CATEGORIES[activeIdx + 1] : null

  return (
    <>
      {/* ── NAV ── */}
      <nav className={navScrolled ? 'scrolled' : ''}>
        <a className="nav-logo" href="#">FM</a>
        <ul className="nav-links">
          <li><a href="#profile">About</a></li>
          <li><a href="#resume">Résumé</a></li>
          <li className="has-dropdown">
            <a href="#portfolio">+ Portfolio</a>
            <div className="dropdown">
              {CATEGORIES.map(c => (
                <a key={c.key} href="#" onClick={e => { e.preventDefault(); setActiveDetail(c.key) }}>
                  {c.title}
                </a>
              ))}
            </div>
          </li>
          <li><a href="#photography">Photography</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button
          className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}
          aria-label="Menu"
          onClick={() => setMobileMenuOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        {MOBILE_LINKS.map(link => (
          <a key={link.href} href={link.href} onClick={closeMenu}>{link.label}</a>
        ))}
      </div>

      {/* ── HERO ── */}
      <section className="hero" id="hero">
        <div className="hero-bg" ref={heroBgRef} />
        <div className="hero-content">
          <div className="hero-fm">FM</div>
          <div className="hero-name">Frank Mesina</div>
          <div className="hero-title">Creative Director&nbsp;&middot;&nbsp;Design Systems&nbsp;&middot;&nbsp;Chicago</div>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ── PROFILE / ABOUT ── */}
      <section className="profile-section" id="profile">
        <div className="profile-visual">Portrait placeholder</div>
        <div className="profile-text">
          <div className="section-eyebrow">About</div>
          <h2 className="section-heading">25+ years shaping digital experiences</h2>
          <p className="section-body">
            Creative director and senior product designer with a career spanning design systems, UX, mobile, TV, and
            kiosk interfaces. Currently leading design system strategy at Tempus — including an initiative to make
            the system machine-ready using AI-assisted design-to-development workflows.
          </p>
          {/* TODO: this pointed at a résumé Artifact that no longer exists — needs a real destination. */}
          <a className="profile-cta" href="#" id="resume">View full résumé &rarr;</a>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section className="portfolio-section" id="portfolio">
        <div className="portfolio-header">
          <div className="section-eyebrow">Work</div>
          <h2 className="section-heading">Selected portfolio</h2>
        </div>
        <div className="portfolio-grid">
          {CATEGORIES.map(c => (
            <button key={c.key} className={`portfolio-card ${c.cardClass}`} onClick={() => setActiveDetail(c.key)}>
              <div className="card-placeholder">{c.icon}</div>
              <div className="card-overlay" />
              <div className="card-content">
                <div className="card-category">Portfolio</div>
                <div className="card-title">{c.title}</div>
                <div className="card-arrow">View work &rarr;</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── PHOTOGRAPHY ── */}
      <section className="photo-section" id="photography">
        <div className="profile-text">
          <div className="section-eyebrow">Photography</div>
          <h2 className="section-heading">Concert photography</h2>
          <p className="section-body">
            An ongoing body of work documenting live music in Chicago and beyond — in black &amp; white and color.
            Available at frankmesinaphotography.com.
          </p>
          <a className="profile-cta" href="https://frankmesinaphotography.com" target="_blank" rel="noopener noreferrer">
            Visit photography site &rarr;
          </a>
        </div>
        <div className="photo-grid">
          <div className="photo-thumb">Photo placeholder</div>
          <div className="photo-thumb" style={{ aspectRatio: 1 }}>Placeholder</div>
          <div className="photo-thumb" style={{ aspectRatio: 1 }}>Placeholder</div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="contact-section" id="contact">
        <div className="contact-inner">
          <div>
            <div className="section-eyebrow">Contact</div>
            <h2 className="section-heading">Let&apos;s work together</h2>
            <div className="contact-links">
              <a className="contact-link" href="mailto:fmesina68@gmail.com">
                <span className="contact-link-label">Email</span>
                <span className="contact-link-value">fmesina68@gmail.com</span>
              </a>
              <a className="contact-link" href="tel:9722498871">
                <span className="contact-link-label">Phone</span>
                <span className="contact-link-value">972.249.8871</span>
              </a>
              <a className="contact-link" href="https://linkedin.com/in/frankmesina" target="_blank" rel="noopener noreferrer">
                <span className="contact-link-label">LinkedIn</span>
                <span className="contact-link-value">linkedin.com/in/frankmesina</span>
              </a>
            </div>
          </div>
          {/* Not wired to send anywhere yet — needs a real destination (API route + email service, or a form backend) before this goes live. */}
          <form className="contact-form" onSubmit={e => e.preventDefault()}>
            <div className="form-field">
              <label>Name</label>
              <input type="text" placeholder="Your name" />
            </div>
            <div className="form-field">
              <label>Email</label>
              <input type="email" placeholder="your@email.com" />
            </div>
            <div className="form-field">
              <label>Message</label>
              <textarea rows={5} placeholder="Tell me about your project..." />
            </div>
            <button className="form-submit" type="submit">Send message</button>
          </form>
        </div>
      </section>

      {/* ── PORTFOLIO DETAIL OVERLAY ──
          Keyed by category so switching (or closing) categories remounts a
          fresh instance — the rail resets to slide 0 for free via initial
          state, no effect-driven setState needed. */}
      {active && (
        <DetailOverlay
          key={active.key}
          category={active}
          prevCategory={prevCategory}
          nextCategory={nextCategory}
          onClose={() => setActiveDetail(null)}
          onSelect={setActiveDetail}
        />
      )}

      {/* ── FOOTER ── */}
      <footer>
        <span className="footer-logo">FM</span>
        <span className="footer-copy">&copy; 1996&ndash;2025 Frank Mesina</span>
        <div className="footer-links">
          <a href="#profile">About</a>
          <a href="#portfolio">Work</a>
          <a href="#contact">Contact</a>
          <a href="https://frankmesinaphotography.com" target="_blank" rel="noopener noreferrer">Photography</a>
        </div>
      </footer>
    </>
  )
}

// Full-screen portfolio category detail — mounted fresh per category (see
// the `key={active.key}` at its call site), so `railIndex` starts at 0
// naturally on every open/switch with no reset effect required.
function DetailOverlay({
  category, prevCategory, nextCategory, onClose, onSelect,
}: {
  category: Category
  prevCategory: Category | null
  nextCategory: Category | null
  onClose: () => void
  onSelect: (key: string) => void
}) {
  const [railIndex, setRailIndex] = useState(0)
  const railRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  function railScroll(dir: number) {
    const rail = railRef.current
    if (!rail) return
    rail.scrollBy({ left: dir * rail.offsetWidth, behavior: 'smooth' })
  }

  function onRailScroll() {
    const rail = railRef.current
    if (!rail) return
    setRailIndex(Math.round(rail.scrollLeft / rail.offsetWidth))
  }

  return (
    <div className="detail-page">
      <div className="detail-nav">
        <button className="detail-back" onClick={onClose}>&larr; Back to Portfolio</button>
        <span className="detail-breadcrumb">Portfolio / {category.title}</span>
      </div>
      <div className="detail-category-header">
        <div className="detail-category-eyebrow">Portfolio</div>
        <h2 className="detail-category-title">{category.title}</h2>
      </div>
      <div className="detail-project">
        <div className="detail-rail-wrap">
          <div className="detail-rail" ref={railRef} onScroll={onRailScroll}>
            {category.slides.map(slide => (
              <div className="detail-rail-slide" key={slide}><span>{slide}</span></div>
            ))}
          </div>
          <button className="detail-rail-arrow prev" onClick={() => railScroll(-1)}>&#8592;</button>
          <button className="detail-rail-arrow next" onClick={() => railScroll(1)}>&#8594;</button>
        </div>
        <div className="detail-rail-counter">{railIndex + 1} / {category.slides.length}</div>
        <div className="detail-project-text">
          <div className="detail-project-subtitle">{category.subtitle}</div>
          <p className="detail-project-desc">{category.desc}</p>
          <div className="detail-project-role">{category.role}</div>
        </div>
      </div>
      <div className="detail-footer-nav">
        {prevCategory
          ? <button className="detail-next-btn" onClick={() => onSelect(prevCategory.key)}>&larr; {prevCategory.title}</button>
          : <span />}
        {nextCategory
          ? <button className="detail-next-btn" onClick={() => onSelect(nextCategory.key)}>{nextCategory.title} &rarr;</button>
          : <span />}
      </div>
    </div>
  )
}
