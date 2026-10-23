import { motion } from 'framer-motion'

type Props = {
    src: string
    alt?: string
}

export default function HeroImageBlob({ src, alt = 'Abstract 3D metallic blob' }: Props) {
    return (
        <motion.div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            animate={{
                y: [0, -18, 0],
                rotate: [0, 4, -4, 0],
            }}
            transition={{
                duration: 7,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
        >
            <motion.img
                src={src}
                alt={alt}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 0 70px rgba(201, 164, 99, 0.35))',
                }}
                animate={{
                    scale: [1, 1.04, 1],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
        </motion.div>
    )
}