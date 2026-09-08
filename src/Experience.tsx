import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function Dust() {
  const points = useRef<THREE.Points>(null!)
  const positions = useMemo(() => {
    const data = new Float32Array(280 * 3)
    for (let i = 0; i < 280; i += 1) {
      const radius = 3.5 + Math.random() * 6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      data[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      data[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      data[i * 3 + 2] = radius * Math.cos(phi)
    }
    return data
  }, [])

  useFrame((state, delta) => {
    points.current.rotation.y += delta * 0.016
    points.current.rotation.x = state.pointer.y * 0.035
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#f5f5ef" size={0.018} transparent opacity={0.5} sizeAttenuation depthWrite={false} />
    </points>
  )
}

function Artifact() {
  const root = useRef<THREE.Group>(null!)
  const halo = useRef<THREE.Mesh>(null!)

  useFrame((state, delta) => {
    root.current.rotation.y += delta * 0.105
    root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, state.pointer.y * 0.24, 0.03)
    root.current.rotation.z = THREE.MathUtils.lerp(root.current.rotation.z, -state.pointer.x * 0.15, 0.03)
    root.current.position.x = THREE.MathUtils.lerp(root.current.position.x, state.pointer.x * 0.3, 0.025)
    halo.current.rotation.z -= delta * 0.13
  })

  return (
    <group ref={root} rotation={[0.28, 0.2, -0.12]}>
      <Float speed={1.15} rotationIntensity={0.28} floatIntensity={0.38}>
        <mesh>
          <icosahedronGeometry args={[1.78, 2]} />
          <meshStandardMaterial color="#dfff4f" roughness={0.28} metalness={0.46} />
        </mesh>
        <mesh scale={1.035}>
          <icosahedronGeometry args={[1.78, 1]} />
          <meshBasicMaterial color="#080808" wireframe transparent opacity={0.34} />
        </mesh>
      </Float>
      <mesh ref={halo} rotation={[Math.PI / 2.6, 0.25, 0]}>
        <torusGeometry args={[2.7, 0.012, 6, 120]} />
        <meshBasicMaterial color="#f4f4ef" transparent opacity={0.42} />
      </mesh>
      <mesh rotation={[1.1, 0.2, 0.75]}>
        <torusGeometry args={[3.25, 0.009, 6, 120]} />
        <meshBasicMaterial color="#dfff4f" transparent opacity={0.22} />
      </mesh>
    </group>
  )
}

export default function Experience() {
  return (
    <div className="webgl" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 42 }}
        dpr={[1, 1.35]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={1.7} />
        <directionalLight position={[4, 5, 6]} intensity={3.3} color="#ffffff" />
        <pointLight position={[-4, -2, 3]} intensity={15} distance={9} color="#dfff4f" />
        <Dust />
        <Artifact />
      </Canvas>
    </div>
  )
}
