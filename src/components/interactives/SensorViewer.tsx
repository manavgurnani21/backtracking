'use client';

import { useState } from 'react';

// Phase 1 placeholder: 2D top-down sensor diagram. Phase 3 swaps this for the
// LYRIQ GLB in React Three Fiber with orbit controls + procedural overlays.
const LAYERS = [
  { id: 'cam', label: 'camera FOV' },
  { id: 'radar', label: 'corner radar' },
  { id: 'lidar', label: 'lidar sweep' },
] as const;

export default function SensorViewer() {
  const [on, setOn] = useState<Record<string, boolean>>({ cam: true, radar: true, lidar: true });

  return (
    <div className="viewer">
      <div className="vhead"><span>LYRIQ · perception view</span><span>drag to orbit · GLB lands in Phase 3</span></div>
      <svg viewBox="0 0 340 300" role="img" aria-label="Top-down car diagram with toggleable sensor fields of view">
        <g opacity={on.cam ? 0.85 : 0} style={{ transition: 'opacity .3s' }}>
          <path d="M170 92 L110 6 L230 6 Z" fill="#4CC2A9" opacity="0.2" />
          <path d="M170 92 L110 6 M170 92 L230 6" stroke="#4CC2A9" strokeWidth="1.5" opacity="0.7" fill="none" />
        </g>
        <g opacity={on.radar ? 0.85 : 0} style={{ transition: 'opacity .3s' }}>
          <path d="M146 100 A70 70 0 0 1 96 130 L146 158 Z" fill="#FF6A3D" opacity="0.3" />
          <path d="M194 100 A70 70 0 0 0 244 130 L194 158 Z" fill="#FF6A3D" opacity="0.3" />
          <path d="M146 208 A70 70 0 0 0 96 240 L146 218 Z" fill="#FF6A3D" opacity="0.3" />
          <path d="M194 208 A70 70 0 0 1 244 240 L194 218 Z" fill="#FF6A3D" opacity="0.3" />
        </g>
        <g opacity={on.lidar ? 0.85 : 0} style={{ transition: 'opacity .3s' }} fill="none" stroke="#D14BC8">
          <circle cx="170" cy="160" r="58" strokeDasharray="4 7" strokeWidth="1.5" opacity="0.8" />
          <circle cx="170" cy="160" r="92" strokeDasharray="3 9" strokeWidth="1.2" opacity="0.5" />
          <circle cx="170" cy="160" r="126" strokeDasharray="2 11" strokeWidth="1" opacity="0.3" />
        </g>
        <g>
          <rect x="142" y="96" width="56" height="128" rx="20" fill="var(--road)" stroke="var(--mut)" strokeWidth="1.5" />
          <rect x="150" y="122" width="40" height="26" rx="6" fill="var(--bg)" opacity="0.85" />
          <rect x="150" y="176" width="40" height="20" rx="6" fill="var(--bg)" opacity="0.55" />
          <circle cx="170" cy="160" r="4" fill="#D14BC8" />
        </g>
      </svg>
      <div className="toggles">
        {LAYERS.map((l) => (
          <label key={l.id}>
            <input type="checkbox" checked={on[l.id]} onChange={() => setOn((p) => ({ ...p, [l.id]: !p[l.id] }))} />
            {l.label}
          </label>
        ))}
      </div>
    </div>
  );
}
