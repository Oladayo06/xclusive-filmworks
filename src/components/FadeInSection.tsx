import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

export default function FadeInSection({ children }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
        >
            {children}
        </motion.div>
    )
}