'use client';
import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, PresentationControls, Float } from '@react-three/drei';

// Preload the journal model to eliminate stutter on load
const MODEL_PATH = '/assets/3d/biospec-book.glb';
useGLTF.preload(MODEL_PATH);

/* ─── Journal Scene ────────────────────────────────────────── */
function JournalScene() {
  const { scene } = useGLTF(MODEL_PATH);
  const journalRef = useRef();
  const { invalidate } = useThree();

  useEffect(() => {
    if (!scene) return;
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        // Enhance material for a more "Elite" look
        if (child.material) {
          child.material.roughness = 0.4;
          child.material.metalness = 0.2;
        }
      }
    });
  }, [scene]);

  // Slow auto-rotation loop
  useFrame((state) => {
    if (journalRef.current) {
      const time = performance.now() / 1000;
      // Very slow rotation
      journalRef.current.rotation.y = time * 0.15;
      invalidate(); // request next frame
    }
  });

  return (
    <primitive
      ref={journalRef}
      object={scene}
      scale={[1.4, 1.4, 1.4]}
      position={[0, -0.1, 0]}
    />
  );
}

/* ─── Fallback Loading Mesh ────────────────────────────────── */
function LoadingMesh() {
  return (
    <mesh rotateX={Math.PI / 2}>
      <boxGeometry args={[1, 1.4, 0.2]} />
      <meshStandardMaterial color="#8b00cc" wireframe opacity={0.2} transparent />
    </mesh>
  );
}

/* ─── Main Component ───────────────────────────────────────── */
export default function JournalModel3D({ className = '' }) {
  const wrapperRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '200px 0px 0px 0px', threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full h-[400px] lg:h-[500px] ${className}`}
      style={{ touchAction: 'none' }}
    >
      {isVisible && (
        <Canvas
          frameloop="demand"
          camera={{ position: [0, 0, 6], fov: 35 }}
          gl={{
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: false,
            powerPreference: 'high-performance',
          }}
          dpr={[1, 1.5]}
          style={{ background: 'transparent' }}
          shadows
        >
          <ambientLight intensity={1.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#3eb489" />

          <Suspense fallback={<LoadingMesh />}>
            <PresentationControls
              global
              rotation={[0, 0, 0]}
              polar={[-0.4, 0.4]} // Limit vertical rotation
              azimuth={[-Infinity, Infinity]} // Full 360 azimuth
              config={{ mass: 2, tension: 400 }}
              snap={false}
            >
              <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                <JournalScene />
              </Float>
            </PresentationControls>

            <ContactShadows
              position={[0, -1.2, 0]}
              opacity={0.4}
              scale={10}
              blur={2.5}
              far={1.5}
              color="#064e3b"
            />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
