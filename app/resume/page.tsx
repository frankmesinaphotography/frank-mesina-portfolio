import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Résumé — Frank Mesina',
  description: 'Creative Director & Design Systems — 25+ years across design systems, UX, mobile, TV, and kiosk interfaces.',
}

// ── Experience — transcribed from FMesina_resume_2022.pdf, with Tempus's
// description merged with the fuller AI-initiative framing already live on
// the homepage (same ongoing role, newer detail — not a contradiction).
// Everything else ported faithfully; recent roles keep full detail, older
// roles are condensed to keep the page readable — no facts trimmed, just
// prose length. ──
const EXPERIENCE = [
  {
    role: 'Design Systems Lead, Senior Product Designer',
    org: 'Tempus', loc: 'Chicago, IL', dates: 'Apr 2021 — Present',
    desc: `Led the shift from a fragmented, product-by-product design system to a single core system — the shared foundation every team now builds from, instead of maintaining separate one-off systems per product — spanning 30+ reusable styles, patterns, and components with a focus on accessibility at the component level. Also driving the system's evolution into a machine-readable format, so Claude can interpret component tokens and specs directly in VS Code, cutting design-to-development handoff friction across the org. Additional responsibilities span roadmap planning, gathering acceptance criteria with product teams, UAT testing, and evangelizing the system through release notes, office hours, and design syncs.`,
  },
  {
    role: 'Contract Lead Visual Designer, Web Applications Design Systems',
    org: 'Walgreens Boots Alliance', loc: 'Chicago, IL', dates: 'Dec 2019 — Mar 2021',
    desc: `Oversaw the conversion of Walgreens' Renewal program design system from Material Design to Microsoft Fluent — directing internal and third-party partner teams to ensure consistency across design and development. Managed library components in Figma, ran weekly design reviews, and implemented version-control procedures across Figma and Confluence.`,
  },
  {
    role: 'Contract Senior Mobile UX/UI Designer, iOS/Web App',
    org: 'BMW Technology Corporation', loc: 'Chicago, IL', dates: 'Sept 2018 — Nov 2019',
    desc: `Designed UI/UX for the Financial Services and After Sales areas of the BMW Connected app within an agile, bi-weekly sprint cycle, collaborating with designers in Chicago and Munich. Built UX prototypes to illustrate future-platform flows for concept and user testing, and presented designs to stakeholders while auditing existing patterns for design integrity during implementation.`,
  },
  {
    role: 'Senior UX/UI Designer, Enterprise Software',
    org: 'Magenic', loc: 'Chicago, IL', dates: 'Apr 2017 — Aug 2018',
    desc: `Designed UX for web, Android, and iOS enterprise applications — defining user flows, site maps, and personas from user interviews, running heuristic analysis, and prototyping in InVision from Sketch designs. Clients: Boston Consultancy Group, Ernst & Young, Polaris, UNFI Foods.`,
  },
  {
    role: 'Contract Lead UX Designer, iOS/Android',
    org: 'General Growth Properties', loc: 'Chicago, IL', dates: 'May 2016 — Nov 2016',
    desc: `Led UX/UI for GGP's native iOS & Android shopping-mall app redesign — wireframes and InVision prototypes for leadership review, remote and onsite user-testing scripts, and style guides/redlines to protect design integrity through development.`,
  },
  {
    role: 'Senior UX Designer',
    org: 'KAPOW', loc: 'Chicago, IL', dates: 'Jan 2015 — Apr 2016',
    desc: `Managed usability and visual design for the Kapow corporate-events marketplace, redesigning real-time booking flows and validating concepts via wireframes and Optimizely testing to improve conversion.`,
  },
  {
    role: 'Contract Senior Mobile/UX Designer, iOS and Android',
    org: 'TuneIn Radio', loc: 'Palo Alto, CA', dates: 'Sept 2014 — Dec 2015',
    desc: `Delivered design comps, flows, and style guides for a TuneIn special project on iOS and Android, and refreshed the core Android radio app to current style guidelines, working remotely with a PM and senior product designer.`,
  },
  {
    role: 'UX/UI Visual Design Lead, CE & Connected Devices',
    org: 'Redbox Instant by Verizon', loc: 'Oakbrook, IL', dates: 'May 2012 — Sept 2014',
    desc: `Designed and managed the core UX/visual design set for the Redbox Instant CE application across Sony PlayStation 3 & 4, LG Smart TV, and Samsung Smart Hub, with maintenance support for Google TV and Roku.`,
  },
  {
    role: 'Freelance',
    org: 'Paramount Pictures, National Geographic, Archangel, MTV India, Nokia, Museum Towers, Prince Tennis, Centex Construction',
    loc: 'Dallas, TX / Chicago, IL', dates: 'Feb 2010 — Aug 2014',
    desc: '',
  },
  {
    role: 'Senior Interactive Designer',
    org: 'Redbox', loc: 'Oakbrook, IL', dates: 'Nov 2010 — May 2012',
    desc: `Art direction and visual design for the Redbox Instant website — owned the digital UI through aggressive phased deadlines, collaborating with joint-venture partners and information architects on redboxinstant.com.`,
  },
  {
    role: 'Contract Senior Art Director',
    org: 'Sapient Nitro', loc: 'Chicago, IL', dates: 'Feb 2010 — Jun 2010',
    desc: `Revamped sections of Hyatt.com with a team of information architects, content strategists, and developers, introducing updated visual design and art direction best practices.`,
  },
  {
    role: 'Creative Director',
    org: 'Clickmotive', loc: 'Plano, TX', dates: 'Feb 2008 — Jan 2010',
    desc: `Art direction and design for automotive-industry web applications; managed a design team's standards and creative growth. Clients: Acura, Toyota, Scion, Ford, Nissan, AutoNation.`,
  },
  {
    role: 'Creative Director',
    org: 'Digital Standard, Inc.', loc: 'Plano, TX', dates: 'Feb 2005 — Feb 2008',
    desc: `Developed brands for Digital Standard and its Saki Mobile platform — mobile UI, social apps, icons, and illustration, plus all print/online marketing collateral. Clients: Cinemark Theaters, Webshots, INgrooves, Blastro.`,
  },
  {
    role: 'Creative Director',
    org: 'd2 Digital Designs', loc: 'Dallas, TX', dates: 'Mar 2001 — Feb 2005',
    desc: `Creative direction across kiosk, CD-ROM, web, and print for a large client roster, leading a multimedia production staff from concept through delivery. Clients included AOL Time Warner Center, Starwood Hotels, The Related Companies, and Hillwood.`,
  },
  {
    role: 'Senior Design Director',
    org: 'Sapient', loc: 'Dallas, TX', dates: 'Jul 2000 — Mar 2001',
    desc: `Designed a web-based healthcare application interface, establishing brand direction through mood boards, competitive analysis, and detailed style guides. Client: Em3 Healthcare.`,
  },
  {
    role: 'Senior Art Director',
    org: 'Satama Interactive', loc: 'Dallas, TX', dates: 'Dec 1999 — Jun 2000',
    desc: `Recreated Satama's U.S. brand image across web, collateral, and marketing materials. Clients: Sportsfair, Williamhouse Paper.`,
  },
  {
    role: 'Art Director/Senior Designer',
    org: 'USWeb/CKS', loc: 'Dallas, TX', dates: 'Jun 1999 — Dec 1999',
    desc: `Art directed and designed e-commerce sites and business-development comps for American Airlines, JCPenney, and Tenant Healthcare.`,
  },
  {
    role: 'Art Director/Senior Designer',
    org: 'iMC2', loc: 'Dallas, TX', dates: 'Jan 1997 — Jun 1999',
    desc: `Established look/feel and site structure for client web properties, designed proposal and marketing art, and served as HR point person for designer hiring. Clients: The Campbell's Soup Company, Virgin Records, Procter & Gamble, Nestlé.`,
  },
]

const CORE_STRENGTHS = [
  'Creative Direction', 'Design Systems', 'UX / UI Design', 'iOS & Android',
  'Enterprise Websites', 'TV & Connected Devices', 'Kiosk UI', 'Accessibility',
]
const SOFTWARE = ['Figma', 'Sketch', 'Illustrator', 'Photoshop', 'InVision', 'Principle']

const EDUCATION = [
  { school: 'The Art Institute of Dallas', loc: 'Dallas, TX', detail: 'Associate of Applied Arts, Visual Communications — 1992' },
  { school: 'The University of Illinois at Chicago', loc: 'Chicago, IL', detail: 'Graphic Design — Aug 1986 – Jun 1988' },
]

export default function ResumePage() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <header className="ds-header">
        <Link className="nav-logo" href="/">FM</Link>
        <Link className="ds-back" href="/">&larr; Back to site</Link>
      </header>

      <section className="ds-hero">
        <div className="ds-eyebrow">Résumé</div>
        <h1 className="ds-title">Frank Mesina</h1>
        <p className="ds-lede">
          Creative Director &middot; Design Systems &middot; Chicago — 25+ years shaping digital experiences across
          design systems, UX, mobile, TV, and kiosk interfaces. Currently leading design system strategy at Tempus,
          including an initiative to make the system machine-readable using AI-assisted design-to-development
          workflows.
        </p>
        <div className="resume-contact-row">
          <a className="profile-cta" href="mailto:fmesina68@gmail.com">fmesina68@gmail.com</a>
          <a className="profile-cta" href="tel:9722498871">972.249.8871</a>
          <a className="profile-cta" href="https://linkedin.com/in/frankmesina" target="_blank" rel="noopener noreferrer">
            linkedin.com/in/frankmesina
          </a>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section className="ds-section" id="experience">
        <div className="ds-section-label">Experience</div>
        <div className="resume-timeline">
          {EXPERIENCE.map((e, i) => (
            <div className="resume-entry" key={i}>
              <div className="resume-entry-dates">{e.dates}<br />{e.loc}</div>
              <div className="resume-entry-body">
                <div className="resume-entry-role">{e.role}</div>
                <div className="resume-entry-org">{e.org}</div>
                {e.desc && <p className="section-body">{e.desc}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section className="ds-section" id="skills">
        <div className="ds-section-label">Core Strengths</div>
        <div className="resume-skills">
          {CORE_STRENGTHS.map(s => <span className="resume-skill-tag" key={s}>{s}</span>)}
        </div>
        <div className="ds-section-label" style={{ marginTop: '2.5rem' }}>Software</div>
        <div className="resume-skills">
          {SOFTWARE.map(s => <span className="resume-skill-tag" key={s}>{s}</span>)}
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section className="ds-section" id="education">
        <div className="ds-section-label">Education</div>
        <div className="resume-timeline">
          {EDUCATION.map(ed => (
            <div className="resume-entry" key={ed.school}>
              <div className="resume-entry-dates">{ed.loc}</div>
              <div className="resume-entry-body">
                <div className="resume-entry-role">{ed.school}</div>
                <div className="resume-entry-org">{ed.detail}</div>
              </div>
            </div>
          ))}
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
