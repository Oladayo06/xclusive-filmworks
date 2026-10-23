import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import ProjectVideoModal from './ProjectVideoModal.tsx'

type Project = {
    title: string
    client: string
    category: string
    year: string
    featured?: boolean
    videoUrl?: string
    posterUrl?: string
    slug?: { current: string }
}

type Props = {
    projects: Project[]
}

export default function ProjectsGrid({ projects }: Props) {
    const [activeCategory, setActiveCategory] = useState('All')

    const categories = useMemo(() => {
        const unique = Array.from(new Set(projects.map((p) => p.category).filter(Boolean)))
        return ['All', ...unique]
    }, [projects])

    const filtered =
        activeCategory === 'All'
            ? projects
            : projects.filter((p) => p.category === activeCategory)

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    gap: 12,
                    flexWrap: 'wrap',
                    marginBottom: 48,
                }}
            >
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        style={{
                            background: activeCategory === cat ? '#CC0000' : 'transparent',
                            border: `1px solid ${activeCategory === cat ? '#CC0000' : 'rgba(255,255,255,0.25)'}`,
                            color: '#fff',
                            padding: '8px 18px',
                            borderRadius: 20,
                            fontSize: 12,
                            textTransform: 'uppercase',
                            letterSpacing: 0.5,
                            cursor: 'pointer',
                            transition: 'background 0.25s ease, border-color 0.25s ease',
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 24,
                }}
            >
                {filtered.map((p, i) => (
                    <motion.a
                        key={`${p.title}-${i}`}
                        href={p.slug?.current ? `/projects/${p.slug.current}` : '#'}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5, delay: Math.min(i, 5) * 0.08, ease: 'easeOut' }}
                        className="project-card"
                    >
                        <div
                            className="project-card-image"
                            style={p.posterUrl ? { backgroundImage: `url(${p.posterUrl})` } : undefined}
                        />
                        <div className="project-card-overlay" />

                        {p.featured && <span className="featured-badge">FEATURED</span>}

                        {p.videoUrl && (
                            <div
                                className="project-play"
                                onClick={(e) => e.preventDefault()}
                            >
                                <ProjectVideoModal videoUrl={p.videoUrl} title={p.title} accentColor="#CC0000" />
                            </div>
                        )}

                        <div className="project-card-info">
                            <p className="project-category">{p.category}</p>
                            <h3 className="project-title">{p.title}</h3>
                            <p className="project-meta">
                                {p.client} · {p.year}
                            </p>
                        </div>
                    </motion.a>
                ))}
            </div>

            <style>{`
        .project-card {
          position: relative;
          display: block;
          aspect-ratio: 4 / 5;
          border-radius: 6px;
          overflow: hidden;
          text-decoration: none;
        }

        .project-card-image {
          position: absolute;
          inset: 0;
          background-color: #111;
          background-size: cover;
          background-position: center;
          transition: transform 0.6s ease;
        }

        .project-card:hover .project-card-image {
          transform: scale(1.08);
        }

        .project-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(10,10,10,0.1) 30%, rgba(10,10,10,0.92) 100%);
          transition: background 0.4s ease;
        }

        .project-card:hover .project-card-overlay {
          background: linear-gradient(180deg, rgba(10,10,10,0.3) 20%, rgba(10,10,10,0.95) 100%);
        }

        .featured-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          z-index: 2;
          background: #C9A463;
          color: #0a0a0a;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.5px;
          padding: 5px 10px;
          border-radius: 4px;
        }

        .project-play {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 2;
        }

        .project-card-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 2;
          padding: 20px;
        }

        .project-category {
          color: #C9A463;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 0 0 6px;
        }

        .project-title {
          font-family: var(--font-heading);
          font-size: 22px;
          color: #fff;
          margin: 0 0 4px;
        }

        .project-meta {
          opacity: 0.65;
          font-size: 13px;
          margin: 0;
        }

        @media (max-width: 900px) {
          .project-card-image, .project-card-overlay {
            transition: none;
          }
        }

        @media (max-width: 768px) {
          div[style*="grid-template-columns: repeat(3, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </div>
    )
}