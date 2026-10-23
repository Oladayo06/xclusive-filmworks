import { Canvas } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere } from '@react-three/drei'

type Props = {
    color?: string
    metalness?: number
    roughness?: number
    distort?: number
    speed?: number
}

export default function HeroBlob({
    color = '#0a0a0a',
    metalness = 0.6,
    roughness = 0.15,
    distort = 0.45,
    speed = 1.6,
}: Props) {
    return (
        <Canvas
            camera={{ position: [0, 0, 4.5] }}
            style={{ width: '100%', height: '100%' }}
        >
            <ambientLight intensity={0.4} />
            <directionalLight position={[3, 3, 3]} intensity={1.2} />
            <Sphere args={[1.4, 64, 64]}>
                <MeshDistortMaterial
                    color={color}
                    roughness={roughness}
                    metalness={metalness}
                    distort={distort}
                    speed={speed}
                />
            </Sphere>
        </Canvas>
    )
}