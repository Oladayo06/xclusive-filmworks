import { useEffect, useState, useCallback } from 'react'

const SCROLL_THRESHOLD_PX = 24

type Link = {
  href: string
  label: string
}

type Props = {
  logoSrc: string
  logoAlt: string
  logoHref: string
  links: Link[]
  ctaLabel: string
  ctaHref: string
  ctaVariant?: 'filled' | 'outline'
  ctaColor?: string
}

export default function StickyHeader({
  logoSrc,
  logoAlt,
  logoHref,
  links,
  ctaLabel,
  ctaHref,
  ctaVariant = 'filled',
  ctaColor = '#CC0000',
}: Props) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [ctaHovered, setCtaHovered] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const updateFromScroll = useCallback(() => {
    setIsScrolled(window.scrollY > SCROLL_THRESHOLD_PX)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', updateFromScroll, { passive: true })
    updateFromScroll()
    return () => window.removeEventListener('scroll', updateFromScroll)
  }, [updateFromScroll])

  useEffect(() => {
    if (!menuOpen) return

    const html = document.documentElement
    const body = document.body
    const prevHtmlOverflow = html.style.overflow
    const prevBodyOverflow = body.style.overflow

    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)

    return () => {
      html.style.overflow = prevHtmlOverflow
      body.style.overflow = prevBodyOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const ctaStyle =
    ctaVariant === 'filled'
      ? {
        background: ctaHovered ? '#000' : ctaColor,
        border: `1px solid ${ctaHovered ? ctaColor : 'transparent'}`,
        color: '#fff',
      }
      : {
        background: ctaHovered ? `${ctaColor}1A` : 'transparent',
        border: `1px solid ${ctaHovered ? ctaColor : 'rgba(255,255,255,0.3)'}`,
        color: ctaHovered ? ctaColor : '#fff',
      }

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '18px clamp(20px, 5vw, 48px)',
        background: isScrolled || menuOpen ? 'rgba(10,10,12,0.92)' : 'rgba(0,0,0,0)',
        backdropFilter: isScrolled || menuOpen ? 'blur(8px)' : 'none',
        transition: 'background 220ms ease, backdrop-filter 220ms ease',
      }}
    >
      <a href={logoHref} style={{ display: 'flex', alignItems: 'center', zIndex: 60, position: 'relative' }}>
        <img src={logoSrc} alt={logoAlt} style={{ height: 30, width: 'auto' }} />
      </a>

      <nav
        className="nav-desktop"
        style={{ '--link-accent': ctaColor } as React.CSSProperties}
      >
        {links.map((l) => (
          <a key={l.href} href={l.href} className="nav-link">
            {l.label}
          </a>
        ))}

        <a
          href={ctaHref}
          onMouseEnter={() => setCtaHovered(true)}
          onMouseLeave={() => setCtaHovered(false)}
          style={{
            ...ctaStyle,
            padding: '10px 18px',
            borderRadius: 4,
            textDecoration: 'none',
            fontSize: 13,
            fontWeight: 600,
            transition: 'background 0.25s ease, border-color 0.25s ease, color 0.25s ease',
          }}
        >
          {ctaLabel}
        </a>
      </nav>

      <button
        className="nav-toggle"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>

      <div
        className={`nav-mobile-panel ${menuOpen ? 'open' : ''}`}
        style={{
          '--link-accent': ctaColor,
          backgroundColor: '#0a0a0a',
        } as React.CSSProperties}
      >
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
            {l.label}
          </a>
        ))}

        <a
          href={ctaHref}
          onClick={() => setMenuOpen(false)}
          style={{
            marginTop: 16,
            background: ctaColor,
            color: '#fff',
            padding: '14px 28px',
            borderRadius: 4,
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {ctaLabel}
        </a>
      </div>
    </header>
  )
}