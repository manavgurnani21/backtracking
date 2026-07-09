'use client';

import { useState } from 'react';
import type { Project } from '@/content/types';

function Tile({ p }: { p: Project }) {
  if (p.tile === 'datascout') {
    return (
      <div className="ptile">
        <svg viewBox="0 0 40 40" width="34" height="34" aria-label="DataScout logo concept">
          <g fill="var(--mut)" opacity="0.6">
            <circle cx="8" cy="8" r="1.7" /><circle cx="20" cy="8" r="1.7" /><circle cx="32" cy="8" r="1.7" />
            <circle cx="8" cy="20" r="1.7" /><circle cx="32" cy="20" r="1.7" />
            <circle cx="8" cy="32" r="1.7" /><circle cx="20" cy="32" r="1.7" /><circle cx="32" cy="32" r="1.7" />
          </g>
          <path d="M20 6 L25 20 L20 34 L15 20 Z" fill="#FF6A3D" /><circle cx="20" cy="20" r="2.4" fill="var(--card)" />
        </svg>
      </div>
    );
  }
  if (p.tile === 'pending') {
    return <div className="ptile mono" style={{ borderStyle: 'dashed', fontSize: 9, color: 'var(--mut)' }}>LOGO<br />pending</div>;
  }
  return <div className="ptile mono" style={{ fontSize: 12, color: 'var(--mut)' }}>{p.tileText}</div>;
}

export default function GarageBay({ project, bayNumber }: { project: Project; bayNumber: number }) {
  const [up, setUp] = useState(false);
  const closed = project.status === 'in-progress';
  const bay = `Bay ${String(bayNumber).padStart(2, '0')}`;

  const classes = ['pcard', closed ? 'closed' : 'openable', up ? 'up' : ''].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div
        className="shutter"
        onClick={(e) => {
          if (closed) return;
          if (!up) setUp(true);
          else if ((e.target as HTMLElement).closest('.slabel')) setUp(false);
        }}
      >
        {closed ? (
          <div className="scenter">
            <span className="tape">Under construction</span>
            <h3>{project.shutterTitle}</h3>
            <p>{project.shutterBlurb}</p>
          </div>
        ) : (
          <div className="scenter">
            <h3>{project.shutterTitle}</h3>
            <p>▲ tap to raise the shutter</p>
          </div>
        )}
        <div className="slabel">
          {closed ? (
            <span>{bay} · closed</span>
          ) : (
            <>
              <span className="lc">{bay} · tap to open</span>
              <span className="lo">{bay} · open</span>
            </>
          )}
          <span className="lamp" />
        </div>
      </div>
      <div className="pbody">
        <Tile p={project} />
        <h3>{project.title}</h3>
        <p>{project.blurb}</p>
        <div className="chips">{project.chips.map((c) => <span key={c} className="chip">{c}</span>)}</div>
        <span className="itag">{project.itag}</span>
      </div>
      <div className="floorline" />
    </div>
  );
}
