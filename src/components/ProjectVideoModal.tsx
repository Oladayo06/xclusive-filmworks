import { useState, useEffect } from 'react'

function parseVideoUrl(url: string) {
  if (!url) return { kind: 'unknown' as const }

  try {
    const u = new URL(url)
    const host = u.hostname.replace('www.', '')

    if (/\.(mp4|webm)$/i.test(u.pathname)) {
      return { kind: 'direct' as const, directUrl: url }
    }

    if (host === 'youtu.be' || host.includes('youtube.com')) {
      const id =
        host === 'youtu.be'
          ? u.pathname.slice(1)
          : u.searchParams.get('v') || u.pathname.split('/').pop()
      return { kind: 'youtube' as const, embedUrl: `https://www.youtube.com/embed/${id}` }
    }

    if (host.includes('vimeo.com')) {
      const id = u.pathname.split('/').filter(Boolean).pop()
      return { kind: 'vimeo' as const, embedUrl: `https://player.vimeo.com/video/${id}` }
    }
  } catch {
    // fall through to unknown
  }

  return { kind: 'unknown' as const }
}

type Props = {
  videoUrl: string
  title: string
  accentColor?: string
}

export default function ProjectVideoModal({
  videoUrl,
  title,
  accentColor = '#CC0000',
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen])

  const parsed = parseVideoUrl(videoUrl)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        aria-label={`Play ${title}`}
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          border: `1px solid ${isHovering ? accentColor : 'rgba(255,255,255,0.35)'}`,
          background: isHovering ? 'rgba(0,0,0,0.75)' : 'rgba(0,0,0,0.55)',
          color: '#fff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        ▶
      </button>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.9)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ width: '90%', maxWidth: 960, aspectRatio: '16/9' }}
          >
            {parsed.kind === 'direct' && (
              <video
                src={parsed.directUrl}
                controls
                autoPlay
                style={{ width: '100%', height: '100%' }}
              />
            )}
            {(parsed.kind === 'youtube' || parsed.kind === 'vimeo') && (
              <iframe
                src={parsed.embedUrl}
                allow="autoplay; fullscreen"
                allowFullScreen
                style={{ width: '100%', height: '100%', border: 0 }}
              />
            )}
            {parsed.kind === 'unknown' && (
              <p style={{ color: '#fff' }}>This video URL isn't supported.</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}