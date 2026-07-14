'use client';

import { useState } from 'react';

// Matches the real public API from the shipped docs (defineMap/definePlace/defineCollection
// in amplify/geo/resource.ts, composed into defineBackend) — not an illustrative mock.
const NODES = [
  { label: 'defineBackend()', left: '26%', top: 18 },
  { label: 'auth', left: '2%', top: 104 },
  { label: 'map', left: '27%', top: 104 },
  { label: 'place', left: '52%', top: 104 },
  { label: 'collection', left: '76%', top: 104 },
];

export default function CdkSynth() {
  const [on, setOn] = useState(false);

  return (
    <div className="viewer">
      <div className="vhead">
        <span>CDK synth</span>
        <button className="btn" style={{ padding: '5px 13px' }} onClick={() => setOn((v) => !v)}>
          {on ? '↺ reset' : '▸ cdk synth'}
        </button>
      </div>
      <div className={`synth${on ? ' on' : ''}`}>
        <div className="code">
          <span className="kw">import</span> {'{'} map, place, collection {'}'} <span className="kw">from</span> <span className="st">&apos;./geo/resource&apos;</span>;<br />
          <br />
          <span className="cl">defineBackend</span>({'{'}<br />
          &nbsp;&nbsp;auth,<br />
          &nbsp;&nbsp;map, place, collection,<br />
          {'}'});
        </div>
        <div className="syngraph">
          <svg aria-hidden="true">
            <line x1="48%" y1="44" x2="10%" y2="104" /><line x1="48%" y1="44" x2="38%" y2="104" />
            <line x1="48%" y1="44" x2="64%" y2="104" /><line x1="48%" y1="44" x2="88%" y2="104" />
          </svg>
          {NODES.map((n) => (
            <div key={n.label} className="node" style={{ left: n.left, top: n.top }}>
              <em>◆</em> {n.label}
            </div>
          ))}
        </div>
        <p className="syncount">synth → <b>4 resources: auth + map + place + collection</b> · defined via defineMap/definePlace/defineCollection</p>
      </div>
    </div>
  );
}
