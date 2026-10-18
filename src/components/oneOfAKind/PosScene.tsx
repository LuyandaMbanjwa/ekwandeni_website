import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import type { Group } from 'three';

function TillCluster({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (reducedMotion || !group.current) return;
    group.current.rotation.y += delta * 0.22;
  });

  return (
    <group ref={group} position={[0, -0.15, 0]}>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.35}>
        <RoundedBox args={[2.4, 1.35, 0.12]} radius={0.08} smoothness={4} position={[0, 0.2, 0]}>
          <meshStandardMaterial color="#1c1917" metalness={0.35} roughness={0.45} />
        </RoundedBox>
        <mesh position={[0, 0.95, 0.08]}>
          <boxGeometry args={[2.1, 1.15, 0.06]} />
          <meshStandardMaterial color="#0ea5e9" emissive="#1f9cc8" emissiveIntensity={0.35} />
        </mesh>
        {[ -0.55, 0, 0.55].map((x, i) => (
          <mesh key={i} position={[x, 0.15, 0.14]}>
            <boxGeometry args={[0.42, 0.42, 0.04]} />
            <meshStandardMaterial color={i === 1 ? '#fbbf24' : '#34d399'} />
          </mesh>
        ))}
      </Float>

      <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.5}>
        <group position={[1.35, 0.55, 0.45]} rotation={[0.2, -0.35, 0.1]}>
          <mesh position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.14, 0.16, 0.75, 24]} />
            <meshPhysicalMaterial
              color="#7ccfe8"
              transmission={0.92}
              thickness={0.35}
              roughness={0.08}
              metalness={0}
              transparent
            />
          </mesh>
          <mesh position={[0, 0.78, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.12, 16]} />
            <meshStandardMaterial color="#a8a29e" metalness={0.8} roughness={0.25} />
          </mesh>
        </group>
      </Float>

      <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.45}>
        <group position={[-1.25, 0.35, 0.35]} rotation={[0.15, 0.4, -0.05]}>
          <mesh position={[0, 0.28, 0]}>
            <cylinderGeometry args={[0.11, 0.13, 0.55, 24]} />
            <meshStandardMaterial color="#166534" transparent opacity={0.85} roughness={0.2} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

function SceneContent({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} />
      <directionalLight position={[-3, 2, -2]} intensity={0.35} color="#7ccfe8" />
      <TillCluster reducedMotion={reducedMotion} />
    </>
  );
}

export function PosScene({ reducedMotion = false }: { reducedMotion?: boolean }) {
  return (
    <Canvas
      className="r3f-canvas h-full w-full"
      camera={{ position: [0, 0.6, 4.2], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <SceneContent reducedMotion={reducedMotion} />
    </Canvas>
  );
}
