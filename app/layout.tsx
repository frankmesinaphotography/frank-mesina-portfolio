import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Frank Mesina',
  description: 'Creative Director & Design Systems — Chicago.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* ── SVG FILTER — same distressed-title recipe as the photography
            site, defined once here (not per-page) so every route can use
            filter: url(#distressed-folio). */}
        <svg width="0" height="0" style={{ position: 'absolute', overflow: 'hidden' }}>
          <defs>
            <filter id="distressed-folio" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.055" numOctaves="4" seed="2" stitchTiles="stitch" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" result="displaced" />
              <feComposite in="displaced" in2="SourceGraphic" operator="in" />
            </filter>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  )
}
