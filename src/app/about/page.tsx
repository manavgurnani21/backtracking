import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Manav Gurnani',
  description: 'The personal side: cars, EcoCAR, and the systems in between.',
};

export default function AboutPage() {
  return (
    <>
      <div className="hero hero-bleed" style={{ padding: '52px 0 8px' }}>
        <div className="wrap">
          <p className="eyebrow">About</p>
          <h1 className="page">Off the clock, I&apos;m still <span className="gtext">thinking about cars.</span></h1>
        </div>
      </div>
      <div className="about-cols">
        <div className="prose">
          <p>
            I got into software the way a lot of car people eventually do: I wanted to know what was actually making
            decisions under the hood. That curiosity turned into leading the autonomy software for UC Davis&apos;s EcoCAR
            team — fifteen of us teaching a Cadillac LYRIQ to see the road — and it never really switched off.
          </p>
          <p>
            Along the way I&apos;ve built cloud infrastructure at AWS, a live sports platform at Reddit, internal tools at
            Solidigm, and a search engine at VectorEdge. The through-line is the same everywhere: I like systems you can
            trust at speed — pipelines, infra, and models that hold up when the data is moving fast.
          </p>
          <p>
            When I&apos;m not building, I&apos;m probably at a cars-and-coffee, deep in a spec sheet, or arguing about the
            best driver&apos;s car under 30k.
          </p>
        </div>
        <div>
          <div className="photo photo-lyriq">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/about/1000017581.JPG" alt="Manav with the EcoCAR LYRIQ" />
            <span>Manav + the LYRIQ</span>
          </div>
          <div className="photo alt photo-team">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/about/DSC_4344.jpg" alt="EcoCAR team at UC Davis" />
            <span>EcoCAR team</span>
          </div>
          <div className="facts">
            <b>Quick facts</b><br />
            UC Davis · CS &amp; Statistics (ML) · Aug 2026<br />
            San Jose, CA · EcoCAR software lead<br />
            Happiest at: apex of a good on-ramp
          </div>
        </div>
      </div>
    </>
  );
}
