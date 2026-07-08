import type { Metadata } from 'next';
import GarageBay from '@/components/GarageBay';
import { projects } from '@/content/projects';

export const metadata: Metadata = {
  title: 'The Garage — Manav Gurnani',
  description: 'Side projects and research. Open bays are ready to explore — closed shutters mean work in progress.',
};

export default function GaragePage() {
  return (
    <>
      <div className="hero" style={{ padding: '52px 0 8px' }}>
        <p className="eyebrow">Projects &amp; research</p>
        <h1 className="page">The <span className="gtext">Garage</span></h1>
        <p className="lede">
          Side projects and research live here. Open bays are ready to explore — closed shutters mean work in progress.
          New builds roll in over time.
        </p>
      </div>
      <div className="bays">
        <div className="grid">
          {projects.map((p, i) => <GarageBay key={p.slug} project={p} bayNumber={i + 1} />)}
        </div>
      </div>
    </>
  );
}
