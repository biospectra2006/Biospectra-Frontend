'use client';
import { useRef, useEffect, useState, Suspense, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, PresentationControls } from '@react-three/drei';

// Preload the GLB as soon as the module imports so the file is cached in memory
// before the Canvas even mounts — eliminates the load-on-view stutter.
useGLTF.preload('/assets/3d/tree3d.glb');

/* ─── Animated tree mesh ─────────────────────────────────────── */
function TreeScene() {
  const { scene } = useGLTF('/assets/3d/tree3d.glb');
  const treeRef = useRef();
  const { invalidate } = useThree();

  useEffect(() => {
    if (!scene) return;
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        // Freeze matrix to avoid unnecessary recalculations on static geometry
        if (child.geometry) child.geometry.computeBoundingSphere();
      }
    });
  }, [scene]);

  // frameloop="demand" means we must call invalidate() to request the next frame.
  // useFrame is still called each rendered frame — we use it to animate AND
  // schedule the next frame, creating a self-sustaining loop only while the
  // canvas is mounted/visible.
  useFrame((state) => {
    if (treeRef.current) {
      // In Three.js v183+, state.clock is deprecated, so using state.clock.getElapsedTime() 
      // or state.timer isn't always stable depending on the exact R3F patch. 
      // Safe fallback using native Date object or performance.now() to avoid the warning entirely.
      const time = performance.now() / 1000;
      treeRef.current.rotation.y = time * 0.08;
      treeRef.current.position.y = Math.sin(time * 0.5) * 0.04;
      invalidate(); // request exactly one more frame — keeps animation alive
    }
  });

  return (
    <primitive
      ref={treeRef}
      object={scene}
      scale={[2.2, 2.2, 2.2]}
      position={[0, -1.2, 0]}
    />
  );
}

/* ─── Fallback while GLB streams ─────────────────────────────── */
function LoadingMesh() {
  return (
    <mesh>
      <sphereGeometry args={[0.4, 12, 12]} />
      <meshStandardMaterial color="#2d6a2d" wireframe opacity={0.4} transparent />
    </mesh>
  );
}

/* ─── Main export ────────────────────────────────────────────── */
export default function TreeModel3D({ className = '' }) {
  const wrapperRef = useRef(null);
  // Only mount the Canvas when the element is intersecting the viewport.
  // This prevents GPU work when the hero is scrolled out of view.
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        // Start mounting 200 px before it enters the viewport
        rootMargin: '200px 0px 0px 0px',
        threshold: 0,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`w-full h-full ${className}`}
      style={{ touchAction: 'none' }}
    >
      {isVisible && (
        <Canvas
          // "demand" = only render when invalidate() is called.
          // The TreeScene's useFrame loop calls invalidate() after each rendered
          // frame, so animation stays smooth while consuming zero GPU when idle.
          frameloop="demand"
          camera={{ position: [0, 1, 5], fov: 40 }}
          gl={{
            antialias: true,
            alpha: true,
            // Avoids storing the full frame in VRAM; safe with frameloop="demand"
            preserveDrawingBuffer: false,
            powerPreference: 'high-performance',
          }}
          dpr={[1, 1.5]}   // cap at 1.5x – covers HiDPI without overdraw on 3x screens
          style={{ background: 'transparent' }}
          shadows={{ type: 1 }} // 1 = PCFShadowMap, replaces deprecated PCFSoftShadowMap
          onCreated={({ gl }) => {
            gl.domElement.style.touchAction = 'none';
          }}
        >
          <ambientLight intensity={1.2} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={2}
            castShadow
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
          />
          <directionalLight position={[-3, 3, -3]} intensity={0.5} color="#a8d8a8" />

          <Suspense fallback={<LoadingMesh />}>
            <PresentationControls
              global
              rotation={[0, 0, 0]}
              polar={[0, 0]}
              azimuth={[-Infinity, Infinity]}
              config={{ mass: 2, tension: 300 }}
              snap={false}
            >
              <TreeScene />
            </PresentationControls>

            <ContactShadows
              position={[0, -1.25, 0]}
              opacity={0.25}
              scale={5}
              blur={2.5}
              far={1.5}
              color="#1a4a1a"
            />
            <Environment preset="park" />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
