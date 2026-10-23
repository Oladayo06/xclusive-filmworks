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

  const updateFromScroll = useCallback(() => {
    setIsScrolled(window.scrollY > SCROLL_THRESHOLD_PX)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', updateFromScroll, { passive: true })
    updateFromScroll()
    return () => window.removeEventListener('scroll', updateFromScroll)
  }, [updateFromScroll])

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
        padding: '20px 48px',
        background: isScrolled ? 'rgba(10,10,12,0.92)' : 'rgba(0,0,0,0)',
        backdropFilter: isScrolled ? 'blur(8px)' : 'none',
        transition: 'background 220ms ease, backdrop-filter 220ms ease',
      }}
    >
      <a href={logoHref} style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logoSrc} alt={logoAlt} style={{ height: 32, width: 'auto' }} />
      </a>

      <nav
        style={{ display: 'flex', alignItems: 'center', gap: 32, '--link-accent': ctaColor } as React.CSSProperties}
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
    </header>
  )
}