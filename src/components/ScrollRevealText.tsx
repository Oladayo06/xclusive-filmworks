import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Props = {
    text: string
}

export default function ScrollRevealText({ text }: Props) {
    const containerRef = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        const el = containerRef.current
        if (!el) return

        const words = el.querySelectorAll('.word')

        const animation = gsap.fromTo(
            words,
            { opacity: 0.2 },
            {
                opacity: 1,
                stagger: 0.04,
                ease: 'none',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    end: 'bottom 55%',
                    scrub: true,
                },
            }
        )

        return () => {
            animation.scrollTrigger?.kill()
            animation.kill()
        }
    }, [])

    const words = text.split(' ')

    return (
        <p
            ref={containerRef}
            style={{
                fontSize: 'clamp(18px, 2.8vw, 32px)',
                lineHeight: 1.5,
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
            }}
        >
            {words.map((word, i) => (
                <span
                    key={i}
                    className="word"
                    style={{ marginRight: '0.3em', display: 'inline-block' }}
                >
                    {word}
                </span>
            ))}
        </p>
    )
}