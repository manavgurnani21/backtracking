'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Bounds, ContactShadows, Environment, Html, Lightformer, OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const MODEL = '/models/solidigm-logo.glb';
useGLTF.preload(MODEL, false);

const BRAND = '#4809AE';

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch { return false; }
}

function Logo() {
  const { scene } = useGLTF(MODEL, false);
  const cloned = useMemo(() => scene.clone(true), [scene]);

  useMemo(() => {
    cloned.traverse((o) => {
      const m = o as THREE.Mesh;
      if (!m.isMesh) return;
      m.material = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(BRAND), metalness: 0.4, roughness: 0.28,
        clearcoat: 1, clearcoatRoughness: 0.1, envMapIntensity: 1.4,
      });
      m.castShadow = true;
    });
  }, [cloned]);

  return <primitive object={cloned} />;
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 2]} intensity={1.2} castShadow />
      <Bounds fit clip observe margin={1.0}>
        <Logo />
      </Bounds>
      <ContactShadows position={[0, -0.02, 0]} opacity={0.45} scale={4} blur={2.4} far={1.5} />
      <Environment resolution={512} frames={1} background={false}>
        <Lightformer form="rect" intensity={3} position={[0, 3, 2]} scale={[5, 3, 1]} />
        <Lightformer form="rect" intensity={1.2} color="#D14BC8" position={[-4, 1, -1]} scale={[3, 3, 1]} />
        <Lightformer form="rect" intensity={1.2} color="#635BFF" position={[4, 1, -1]} scale={[3, 3, 1]} />
      </Environment>
      <OrbitControls
        makeDefault enablePan={false} enableDamping dampingFactor={0.08}
        minDistance={1.2} maxDistance={5} minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2}
        autoRotate autoRotateSpeed={1.1}
      />
    </>
  );
}

export default function SolidigmViewer() {
  const [mounted, setMounted] = useState(false);
  const [webgl, setWebgl] = useState(true);

  useEffect(() => { setMounted(true); setWebgl(hasWebGL()); }, []);

  if (mounted && !webgl) {
    return (
      <div className="viewer">
        <div className="vhead"><span>Mark</span><span>internal tool — nothing shareable</span></div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '30px 0' }}>
          <div style={{
            width: 90, height: 90, borderRadius: 20, background: BRAND, display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 34,
          }}>S</div>
          <p style={{ fontSize: 12.5, color: 'var(--mut)', textAlign: 'center', maxWidth: '34ch', margin: 0 }}>
            The work lives behind the firewall — the copy carries the impact here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="viewer">
      <div className="vhead"><span>Mark</span><span>drag to orbit · internal tool, nothing shareable</span></div>
      <div style={{ height: 260, borderRadius: 12, overflow: 'hidden', position: 'relative' }}>
        {mounted ? (
          <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 3], fov: 40 }} style={{ background: 'transparent' }}>
            <Suspense fallback={<Html center><span className="mono" style={{ fontSize: 12, color: 'var(--mut)' }}>loading mark…</span></Html>}>
              <Scene />
            </Suspense>
          </Canvas>
        ) : (
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
            <span className="mono" style={{ fontSize: 12, color: 'var(--mut)' }}>initializing 3D…</span>
          </div>
        )}
      </div>
      <p style={{ fontSize: 12.5, color: 'var(--mut)', margin: '10px 0 0' }}>
        The work lives behind the firewall — the copy carries the impact here.
      </p>
    </div>
  );
}
