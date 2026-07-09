'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Bounds, ContactShadows, Environment, Html, Lightformer, OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import SensorViewer from './SensorViewer';

const MODEL = '/models/lyriq.glb';
useGLTF.preload(MODEL, false);

// Model bbox (from gltf-transform inspect). Front of the car is +Z.
const HALF = { x: 0.41, y: 0.31, z: 0.95 };

type SensorId = 'camera' | 'longRadar' | 'medRadar' | 'shortRadar' | 'v2x';
type Layers = Record<SensorId, boolean>;

const SENSORS: Array<{ id: SensorId; label: string; color: string }> = [
  { id: 'longRadar', label: 'long-range radar', color: '#2E9E4F' },
  { id: 'medRadar', label: 'medium-range radar', color: '#E24B4A' },
  { id: 'shortRadar', label: 'short-range radar', color: '#29B6D8' },
  { id: 'camera', label: 'camera', color: '#E0952E' },
  { id: 'v2x', label: 'V2X radio', color: '#8B5CF6' },
];

// EcoCAR team livery — glossy two-tone: deep indigo tail → gold nose.
const LIVERY: Array<[number, string]> = [
  [0.0, '#242469'], [1.0, '#fed622'],
];

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch { return false; }
}

function useLiveryTexture() {
  return useMemo(() => {
    const cv = document.createElement('canvas');
    cv.width = 512; cv.height = 1;
    const ctx = cv.getContext('2d')!;
    const g = ctx.createLinearGradient(0, 0, 512, 0);
    LIVERY.forEach(([t, c]) => g.addColorStop(t, c));
    ctx.fillStyle = g; ctx.fillRect(0, 0, 512, 1);
    const tex = new THREE.CanvasTexture(cv);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

function Car() {
  const { scene } = useGLTF(MODEL, false);
  const grad = useLiveryTexture();
  const cloned = useMemo(() => scene.clone(true), [scene]);

  useMemo(() => {
    cloned.traverse((o) => {
      const m = o as THREE.Mesh;
      if (!m.isMesh) return;
      const mat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0.5, roughness: 0.32, clearcoat: 1, clearcoatRoughness: 0.06, envMapIntensity: 1.5 });
      mat.onBeforeCompile = (shader) => {
        shader.uniforms.uGrad = { value: grad };
        shader.vertexShader = shader.vertexShader
          .replace('#include <common>', '#include <common>\nvarying float vT;\nvarying vec3 vLP;')
          .replace('#include <begin_vertex>', '#include <begin_vertex>\nvT = clamp((position.z + 0.95) / 1.9, 0.0, 1.0);\nvLP = position;');
        shader.fragmentShader = shader.fragmentShader
          .replace('#include <common>', '#include <common>\nvarying float vT;\nvarying vec3 vLP;\nuniform sampler2D uGrad;')
          .replace('#include <color_fragment>', `#include <color_fragment>
            diffuseColor.rgb *= texture2D(uGrad, vec2(vT, 0.5)).rgb;
            float star = fract(sin(dot(floor(vLP.xy * 240.0), vec2(12.9898, 78.233))) * 43758.5453);
            diffuseColor.rgb += smoothstep(0.9955, 1.0, star) * 0.7 * (1.0 - vT);`);
      };
      m.material = mat;
      m.castShadow = true;
    });
  }, [cloned, grad]);

  return <primitive object={cloned} />;
}

function Beam({ origin, dir, radius, length, color, opacity }: {
  origin: [number, number, number]; dir: [number, number, number]; radius: number; length: number; color: string; opacity: number;
}) {
  const geo = useMemo(() => {
    const g = new THREE.ConeGeometry(radius, length, 40, 1, true);
    g.translate(0, -length / 2, 0); // apex at origin, opens toward -Y
    return g;
  }, [radius, length]);
  const quat = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, -1, 0), new THREE.Vector3(...dir).normalize());
    return q;
  }, [dir]);
  return (
    <mesh geometry={geo} position={origin} quaternion={quat}>
      <meshBasicMaterial color={color} transparent opacity={opacity} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

function V2XPulse({ color }: { color: string }) {
  const refs = [useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null)];
  const reduce = useRef(false);
  useEffect(() => { reduce.current = matchMedia('(prefers-reduced-motion: reduce)').matches; }, []);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    refs.forEach((r, i) => {
      if (!r.current) return;
      const phase = reduce.current ? (i / 3) : ((t * 0.45 + i / 3) % 1);
      const s = 0.3 + phase * 2.4;
      r.current.scale.set(s, s, 1);
      (r.current.material as THREE.MeshBasicMaterial).opacity = (1 - phase) * 0.4;
    });
  });
  return (
    <group rotation-x={-Math.PI / 2} position-y={-HALF.y + 0.006}>
      {refs.map((r, i) => (
        <mesh key={i} ref={r}>
          <ringGeometry args={[0.84, 0.9, 72]} />
          <meshBasicMaterial color={color} transparent depthWrite={false} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  );
}

function Overlays({ layers }: { layers: Layers }) {
  const F = HALF.z;
  return (
    <group>
      {layers.longRadar && <Beam origin={[0, -0.04, F]} dir={[0, 0, 1]} radius={0.14} length={2.5} color="#2E9E4F" opacity={0.3} />}
      {layers.camera && <Beam origin={[0, 0.14, F * 0.55]} dir={[0, 0, 1]} radius={0.44} length={1.8} color="#E0952E" opacity={0.16} />}
      {layers.medRadar && (
        <group>
          <Beam origin={[0, -0.04, F]} dir={[0, 0, 1]} radius={0.62} length={1.15} color="#E24B4A" opacity={0.16} />
          <Beam origin={[0, -0.04, -F]} dir={[0, 0, -1]} radius={0.62} length={1.15} color="#E24B4A" opacity={0.16} />
        </group>
      )}
      {layers.shortRadar && ([[1, 1], [-1, 1], [1, -1], [-1, -1]] as const).map(([sx, sz], i) => (
        <Beam key={i} origin={[sx * HALF.x, -0.04, sz * (F - 0.1)]} dir={[sx * 0.6, 0, sz * 0.8]} radius={0.45} length={0.85} color="#29B6D8" opacity={0.18} />
      ))}
      {layers.v2x && <V2XPulse color="#8B5CF6" />}
    </group>
  );
}

function Scene({ layers }: { layers: Layers }) {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 5, 2]} intensity={1.2} castShadow />
      <Bounds fit clip observe margin={1.15}>
        <group position-y={-0.02}><Car /></group>
      </Bounds>
      <Overlays layers={layers} />
      <ContactShadows position={[0, -HALF.y, 0]} opacity={0.5} scale={5} blur={2.6} far={2} />
      <Environment resolution={512} frames={1} background={false}>
        <Lightformer form="rect" intensity={3.2} position={[0, 4, 1]} rotation-x={Math.PI / 2} scale={[7, 0.5, 1]} />
        <Lightformer form="rect" intensity={2} position={[0, 2, 4]} scale={[5, 4, 1]} />
        <Lightformer form="rect" intensity={1} color="#6EA8FF" position={[-4, 1, -2]} scale={[3, 3, 1]} />
        <Lightformer form="rect" intensity={1} color="#E0952E" position={[4, 1, -2]} scale={[3, 3, 1]} />
      </Environment>
      <OrbitControls
        makeDefault enablePan={false} enableDamping dampingFactor={0.08}
        minDistance={2} maxDistance={7} minPolarAngle={0.15} maxPolarAngle={Math.PI / 2 - 0.03}
        autoRotate autoRotateSpeed={0.55}
      />
    </>
  );
}

export default function LyriqViewer() {
  const [mounted, setMounted] = useState(false);
  const [webgl, setWebgl] = useState(true);
  const [layers, setLayers] = useState<Layers>({ camera: true, longRadar: true, medRadar: true, shortRadar: true, v2x: true });

  useEffect(() => { setMounted(true); setWebgl(hasWebGL()); }, []);

  if (mounted && !webgl) return <SensorViewer />;

  return (
    <div className="viewer">
      <div className="vhead"><span>LYRIQ · sensor suite</span><span>drag to orbit · scroll to zoom</span></div>
      <div style={{ height: 320, borderRadius: 12, overflow: 'hidden', position: 'relative' }}>
        {mounted ? (
          <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }} camera={{ position: [2.4, 1.5, 2.8], fov: 42 }} style={{ background: 'transparent' }}>
            <Suspense fallback={<Html center><span className="mono" style={{ fontSize: 12, color: 'var(--mut)' }}>loading LYRIQ…</span></Html>}>
              <Scene layers={layers} />
            </Suspense>
          </Canvas>
        ) : (
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
            <span className="mono" style={{ fontSize: 12, color: 'var(--mut)' }}>initializing 3D…</span>
          </div>
        )}
      </div>
      <div className="toggles">
        {SENSORS.map((s) => (
          <label key={s.id}>
            <input type="checkbox" checked={layers[s.id]} onChange={() => setLayers((p) => ({ ...p, [s.id]: !p[s.id] }))} />
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: s.color, display: 'inline-block' }} />
            {s.label}
          </label>
        ))}
      </div>
    </div>
  );
}
