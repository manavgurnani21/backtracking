'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { stops, education } from '@/content/experiences';

const PIN_Y = [260, 480, 760, 1010, 1260];
const CARD_TOP = ['15%', '30%', '48.5%', '65.5%', '82.5%'];
const MILE_MARKERS: Array<[number, string]> = [[200, '2026'], [700, '2025'], [1380, '2024']];

function tileStyle(hue: string) {
  return {
    background: `color-mix(in srgb, ${hue} 16%, var(--card))`,
    color: `color-mix(in srgb, ${hue} 78%, var(--ink))`,
  } as React.CSSProperties;
}

export default function Journey() {
  const router = useRouter();
  const journeyRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = journeyRef.current;
    if (!el) return;

    if (reduce) {
      setProgress(1);
      el.querySelectorAll('.reveal').forEach((r) => r.classList.add('vis'));
      return;
    }

    const paint = () => {
      const r = el.getBoundingClientRect();
      setProgress(Math.min(1, Math.max(0, (innerHeight * 0.78 - r.top) / r.height)));
    };
    addEventListener('scroll', paint, { passive: true });
    addEventListener('resize', paint);
    paint();

    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); } }),
      { threshold: 0.25 },
    );
    el.querySelectorAll('.reveal').forEach((r) => io.observe(r));

    return () => { removeEventListener('scroll', paint); removeEventListener('resize', paint); io.disconnect(); };
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setModalOpen(false); };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [modalOpen]);

  return (
    <>
      <div id="journey" style={{ scrollMarginTop: 80 }} />
      <h2 className="sect">The journey</h2>
      <p className="sect-sub">
        Five stops, most recent first — the road starts at now and runs back to where it began. The whole road runs
        through UC Davis; tap the gantry for education. Every stop also lives at its own URL.
      </p>

      <div className="journey" ref={journeyRef}>
        <svg className="road" viewBox="0 0 1000 1480" role="img"
          aria-label="A wide straight highway through the UC Davis sector with five chronological career stops">
          <defs>
            <linearGradient id="gline" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="1480">
              <stop offset="0" stopColor="#FF6A3D" /><stop offset="0.5" stopColor="#D14BC8" /><stop offset="1" stopColor="#635BFF" />
            </linearGradient>
            <filter id="glow" x="-80%" y="-5%" width="260%" height="110%"><feGaussianBlur stdDeviation="7" /></filter>
            <filter id="grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
              <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.05 0" />
            </filter>
          </defs>

          <g fontFamily="var(--mono)" fontSize="13" letterSpacing="2">
            <circle cx="930" cy="84" r="26" fill="none" stroke="var(--mut)" strokeWidth="1.5" />
            <path d="M930 64 l6 20 l-6 -5 l-6 5 z" fill="url(#gline)" />
            <text x="930" y="128" textAnchor="middle" fill="var(--mut)">N</text>
          </g>

          <rect x="330" y="0" width="340" height="1480" fill="var(--road)" />
          <rect x="330" y="0" width="340" height="1480" filter="url(#grain)" opacity="0.5" />
          <rect x="342" y="0" width="5" height="1480" fill="var(--dash)" opacity="0.9" />
          <rect x="653" y="0" width="5" height="1480" fill="var(--dash)" opacity="0.9" />
          <line className="lanedash" x1="418" y1="0" x2="418" y2="1480" stroke="var(--dash)" strokeWidth="5" strokeDasharray="30 34" opacity="0.7" />
          <line className="lanedash" x1="582" y1="0" x2="582" y2="1480" stroke="var(--dash)" strokeWidth="5" strokeDasharray="30 34" opacity="0.7" />
          <line x1="500" y1="6" x2="500" y2="1474" stroke="url(#gline)" strokeWidth="20" strokeLinecap="round"
            pathLength={1} strokeDasharray="1" strokeDashoffset={1 - progress} filter="url(#glow)" opacity="0.45" />
          <line x1="500" y1="6" x2="500" y2="1474" stroke="url(#gline)" strokeWidth="10" strokeLinecap="round"
            pathLength={1} strokeDasharray="1" strokeDashoffset={1 - progress} opacity="0.85" />

          <g onClick={() => setModalOpen(true)} style={{ cursor: 'pointer' }} role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') setModalOpen(true); }}
            aria-label="UC Davis sector — view education">
            <title>View education</title>
            <rect x="320" y="26" width="9" height="72" rx="3" fill="var(--roadedge)" />
            <rect x="671" y="26" width="9" height="72" rx="3" fill="var(--roadedge)" />
            <rect x="308" y="32" width="384" height="40" rx="9" fill="var(--card)" stroke="url(#gline)" strokeWidth="1.5" />
            <text x="492" y="57" textAnchor="middle" fill="var(--ink)" fontFamily="var(--mono)" fontSize="14" letterSpacing="2.5">
              UC DAVIS SECTOR · 2023 – 2026
            </text>
            <circle cx="668" cy="52" r="9" fill="none" stroke="var(--mut)" strokeWidth="1.3" />
            <text x="668" y="56" textAnchor="middle" fill="var(--mut)" fontFamily="var(--mono)" fontSize="11">i</text>
          </g>

          <g fontFamily="var(--mono)" fontSize="13" letterSpacing="2" fill="var(--mut)">
            {MILE_MARKERS.map(([y, label]) => (
              <g key={label}>
                <rect x="700" y={y} width="64" height="26" rx="6" fill="none" stroke="var(--mut)" strokeWidth="1.2" />
                <text x="732" y={y + 18} textAnchor="middle">{label}</text>
              </g>
            ))}
          </g>

          <g fontFamily="var(--mono)" fontSize="9.5" fontWeight="700">
            {stops.map((s, i) => {
              const left = i % 2 === 0;
              const cx = left ? 347 : 655;
              return (
                <g key={s.slug} style={{ cursor: 'pointer' }} role="link" tabIndex={0}
                  aria-label={`${s.org} — open stop`}
                  onClick={() => router.push(`/journey/${s.slug}`)}
                  onKeyDown={(e) => { if (e.key === 'Enter') router.push(`/journey/${s.slug}`); }}>
                  <circle cx={cx} cy={PIN_Y[i]} r="17" fill="var(--card)" stroke="url(#gline)" strokeWidth="4" />
                  <text x={cx} y={PIN_Y[i] + 4} textAnchor="middle" fill="var(--ink)">{s.initials}</text>
                </g>
              );
            })}
          </g>
          <g stroke="var(--line)" strokeWidth="2" strokeDasharray="4 5">
            {stops.map((s, i) => {
              const left = i % 2 === 0;
              return left
                ? <line key={s.slug} x1="330" y1={PIN_Y[i]} x2="298" y2={PIN_Y[i]} />
                : <line key={s.slug} x1="672" y1={PIN_Y[i]} x2="704" y2={PIN_Y[i]} />;
            })}
          </g>

          <g fontFamily="var(--mono)" fontSize="12" letterSpacing="1.5">
            <rect x="415" y="1432" width="170" height="30" rx="6" fill="none" stroke="var(--mut)" strokeWidth="1.5" strokeDasharray="5 4" />
            <text x="500" y="1452" textAnchor="middle" fill="var(--mut)">MILE 0 · THE START</text>
          </g>
        </svg>

        <div className="edu reveal">
          <h4>{education.school}</h4>
          <p>{education.degree} · Aug 2026. Every stop below happened while enrolled.</p>
          <button className="openlnk" onClick={() => setModalOpen(true)}>About my education →</button>
        </div>

        {stops.map((s, i) => {
          const left = i % 2 === 0;
          return (
            <div key={s.slug} className="stop-card reveal" style={{ left: left ? '2%' : '71%', top: CARD_TOP[i] }}>
              <span className="lg" style={tileStyle(s.hue)} title={s.logoTitle}>{s.initials}</span>
              <div className="meta">{s.dates} · {s.location}</div>
              <h3>{s.org}</h3>
              <p>{s.cardBlurb}</p>
              <Link className="openlnk" href={`/journey/${s.slug}`}>Pull over →</Link>
            </div>
          );
        })}
      </div>

      <div className={`modal${modalOpen ? ' open' : ''}`} role="dialog" aria-modal="true" aria-label="Education"
        onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}>
        <div className="mcard">
          <button className="btn" aria-label="Close" onClick={() => setModalOpen(false)}
            style={{ position: 'absolute', top: 14, right: 14, padding: '6px 11px' }}>✕</button>
          <span className="lg" style={{ ...tileStyle('#B49000'), float: 'none', width: 52, height: 52, borderRadius: 13, fontSize: 13 }}
            title="UC Davis logo — standard source">UCD</span>
          <h3 style={{ margin: '16px 0 2px', fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em' }}>{education.school}</h3>
          <p style={{ margin: '0 0 12px', color: 'var(--mut)', fontSize: 14 }}>{education.degree}</p>
          <div className="chips"><span className="chip">{education.dates}</span><span className="chip">{education.location}</span></div>
          <p style={{ fontSize: 13.5, color: 'var(--mut)', margin: '10px 0 18px' }}>{education.note}</p>
          <Link className="btn primary" href="/about" onClick={() => setModalOpen(false)}>More on the About page →</Link>
        </div>
      </div>
    </>
  );
}
