import Link from 'next/link';
import Journey from '@/components/Journey';
import Portrait from '@/components/Portrait';

export default function Home() {
  return (
    <>
      <div className="hero hero-bleed">
        <div className="wrap">
          <div className="heroGrid">
            <div>
              <p className="eyebrow">Software engineer · ML systems · UC Davis &apos;26</p>
              <h1 className="name">Manav<br />Gurnani</h1>
              <p className="tagline gtext">Follow the road.</p>
              <p className="lede">
                I build ML systems, cloud infrastructure, and the software brains of an autonomous Cadillac. This site
                is the road trip through all of it — scroll to travel the journey, or jump straight to any stop.
              </p>
              <div className="statrow">
                <span className="stat"><b>5</b>&nbsp; career stops</span>
                <span className="stat"><b>6</b>&nbsp; garage bays</span>
                <span className="stat"><b>1</b>&nbsp; autonomous LYRIQ</span>
              </div>
              <div className="ctas">
                <a className="btn primary" href="#journey">Travel the journey ↓</a>
                <Link className="btn" href="/garage">Skip to the Garage</Link>
              </div>
              <p className="scrollcue"><span>▼</span>&nbsp; scroll to travel</p>
            </div>
            <Portrait />
          </div>
        </div>
      </div>

      <Journey />

      <div className="cta-band">
        <div>
          <h3>Want the spec sheet?</h3>
          <p>The one-page version of this whole road, in PDF.</p>
        </div>
        <a className="btn primary" href="/resume.pdf">Download résumé ↓</a>
      </div>
    </>
  );
}
