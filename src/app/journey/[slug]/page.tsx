import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { adjacentStops, getStop, stops } from '@/content/experiences';
import type { Stop } from '@/content/types';
import AppDemo from '@/components/interactives/AppDemo';
import CdkSynth from '@/components/interactives/CdkSynth';
import LyriqViewer from '@/components/interactives/LyriqViewer';
import SpinMark from '@/components/interactives/SpinMark';
import Terminal from '@/components/interactives/Terminal';

export function generateStaticParams() {
  return stops.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const stop = getStop((await params).slug);
  if (!stop) return {};
  return {
    title: `${stop.org} — Manav Gurnani`,
    description: `${stop.role} · ${stop.dates}. ${stop.blurb}`,
  };
}

function Interactive({ stop }: { stop: Stop }) {
  switch (stop.interactive) {
    case 'sensor-viewer': return <LyriqViewer />;
    case 'cdk-synth': return <CdkSynth />;
    case 'app-demo': return <AppDemo />;
    case 'terminal': return <Terminal />;
    case 'spin': return <SpinMark letter={stop.initials[0]} />;
    default: return null;
  }
}

export default async function StopPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const stop = getStop(slug);
  if (!stop) notFound();
  const { prev, next } = adjacentStops(slug);

  const tile = {
    background: `color-mix(in srgb, ${stop.hue} 16%, var(--card))`,
    color: `color-mix(in srgb, ${stop.hue} 78%, var(--ink))`,
  };

  return (
    <>
      <p className="crumb"><Link href="/#journey">← Back to the road</Link> · Journey / {stop.org}</p>
      <div className="stopband"
        style={{ background: `radial-gradient(70% 130% at 8% 0%, color-mix(in srgb, ${stop.hue} 13%, transparent), transparent)` }}>
        <div className="stophead">
          <span className="lg" style={tile} title={stop.logoTitle}>{stop.initials}</span>
          <div>
            <p className="eyebrow" style={{ margin: '0 0 4px' }}>{stop.dates} · {stop.location} · {stop.role}</p>
            <h2 className="sect" style={{ margin: 0 }}>
              {stop.org}
              {stop.orgSuffix && <span style={{ color: 'var(--mut)', fontWeight: 500, fontSize: '0.62em' }}> {stop.orgSuffix}</span>}
            </h2>
          </div>
        </div>
      </div>

      <div className="cols">
        <div>
          <p className="sect-sub" style={{ marginTop: 6 }}>{stop.blurb}</p>
          <ul className="hl">
            {stop.highlights.map((h) => <li key={h}>{h}</li>)}
          </ul>
          <div className="chips">
            {stop.chips.map((c) => <span key={c} className="chip">{c}</span>)}
            {stop.links?.map((l) => <a key={l.href} className="chip" href={l.href} target="_blank" rel="noreferrer">{l.label} ↗</a>)}
            {stop.pendingChips.map((c) => <span key={c} className="chip pending">{c}</span>)}
          </div>
        </div>
        <Interactive stop={stop} />
      </div>

      <div className="stopnav">
        <Link href={`/journey/${prev.slug}`}>← {prev.org}</Link>
        <Link href={`/journey/${next.slug}`}>{next.org} →</Link>
      </div>
    </>
  );
}
