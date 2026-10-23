import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Service = {
    number: string
    title: string
    description: string
}

const services: Service[] = [
    {
        number: '01',
        title: 'CONTENT',
        description:
            'We create photography, video, and branded storytelling designed to communicate ideas and connect with audiences.',
    },
    {
        number: '02',
        title: 'SOCIALS',
        description:
            'We develop social strategy and creative communication that keeps a brand consistent across every platform.',
    },
    {
        number: '03',
        title: 'DIGITAL',
        description:
            'We build websites, landing pages, and digital interfaces that translate brand identity into practical digital touchpoints.',
    },
    {
        number: '04',
        title: 'COMMUNICATION',
        description:
            "We shape clear, consistent messaging that reflects a brand's voice across every channel.",
    },
    {
        number: '05',
        title: 'CAMPAIGN',
        description:
            "We develop campaign concepts, creative direction, and coordinated assets that support a brand's objectives.",
    },
    {
        number: '06',
        title: 'BRAND DIRECTION',
        description:
            'Identity Systems - Every production has a story, but how that story is presented matters just as much. We build clear identity systems that bring your production company, films, and creative projects together, making your brand instantly recognizable across screens, platforms, and audiences.',
    },
    {
        number: '07',
        title: 'BRAND MANAGEMENT',
        description:
            'We provide ongoing brand stewardship and manage how a brand presents itself over time.',
    },
]

export default function ServicesAccordion() {
    const [activeScroll, setActiveScroll] = useState(0)
    const [expanded, setExpanded] = useState<number | null>(null)
    const [hovered, setHovered] = useState<number | null>(null)
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = sectionRef.current
        if (!el) return

        const rows = el.querySelectorAll('.accordion-row')
        const triggers: ScrollTrigger[] = []

        rows.forEach((row, i) => {
            const trigger = ScrollTrigger.create({
                trigger: row,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => setActiveScroll(i),
                onEnterBack: () => setActiveScroll(i),
            })
            triggers.push(trigger)
        })

        return () => triggers.forEach((t) => t.kill())
    }, [])

    const toggle = (i: number) => {
        setExpanded((prev) => (prev === i ? null : i))
    }

    return (
        <section
            ref={sectionRef}
            style={{
                padding: '80px var(--section-padding-x)',
                background: 'rgba(60, 60, 60, 0.7)',
            }}
        >
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
                {['Creativity', 'Originality', 'Authenticity', 'Excellence', 'Impact'].map((t) => (
                    <span
                        key={t}
                        style={{
                            border: '1px solid rgba(255,255,255,0.25)',
                            color: 'var(--color-accent-media)',
                            padding: '8px 16px',
                            borderRadius: 20,
                            fontSize: 12,
                            textTransform: 'uppercase',
                            letterSpacing: 0.5,
                        }}
                    >
                        {t}
                    </span>
                ))}
            </div>

            <div>
                {services.map((s, i) => {
                    const isExpanded = expanded === i
                    const isHighlighted = isExpanded || hovered === i || activeScroll === i

                    return (
                        <div
                            key={s.number}
                            className="accordion-row"
                            style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
                        >
                            <div
                                onClick={() => toggle(i)}
                                onMouseEnter={() => setHovered(i)}
                                onMouseLeave={() => setHovered(null)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 24,
                                    padding: '28px 16px',
                                    cursor: 'pointer',
                                    background: isHighlighted ? 'rgba(201,164,99,0.06)' : 'transparent',
                                    transition: 'background 0.25s ease',
                                }}
                            >
                                <span
                                    style={{
                                        fontFamily: 'var(--font-heading)',
                                        fontSize: 13,
                                        color: 'var(--color-accent-media)',
                                        width: 32,
                                    }}
                                >
                                    {s.number}
                                </span>
                                <span
                                    style={{
                                        fontFamily: 'var(--font-heading)',
                                        fontSize: 'clamp(24px, 4vw, 44px)',
                                        color: isHighlighted ? 'var(--color-accent-media)' : '#fff',
                                        flex: 1,
                                        transition: 'color 0.25s ease',
                                    }}
                                >
                                    {s.title}
                                </span>
                                <span
                                    style={{
                                        fontSize: 20,
                                        opacity: isHighlighted ? 1 : 0.5,
                                        transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.3s ease, opacity 0.25s ease',
                                        color: isHighlighted ? 'var(--color-accent-media)' : '#fff',
                                    }}
                                >
                                    ↗
                                </span>
                            </div>

                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateRows: isExpanded ? '1fr' : '0fr',
                                    transition: 'grid-template-rows 0.4s ease',
                                }}
                            >
                                <div style={{ overflow: 'hidden' }}>
                                    <p
                                        style={{
                                            padding: '0 16px 28px 72px',
                                            maxWidth: 760,
                                            fontSize: 'clamp(15px, 1.6vw, 18px)',
                                            lineHeight: 1.7,
                                            opacity: 0.8,
                                        }}
                                    >
                                        {s.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}