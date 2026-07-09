'use client';

import { useState } from 'react';

const NODES = [
  { label: 'CFN stack', icon: '◆', left: '2%', top: 18 },
  { label: 'API Gateway', icon: '◆', left: '40%', top: 18 },
  { label: 'Cognito pool', icon: '◆', left: '66%', top: 18 },
  { label: 'Router + authorizer', icon: '◆', left: '36%', top: 70 },
  { label: 'GET /items', icon: 'λ', left: '6%', top: 132 },
  { label: 'POST /items', icon: 'λ', left: '39%', top: 132 },
  { label: 'auth flow', icon: 'λ', left: '70%', top: 132 },
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
          <span className="kw">new</span> <span className="cl">AmplifyRestApi</span>(stack, <span className="st">&apos;api&apos;</span>, {'{'}<br />
          &nbsp;&nbsp;auth: <span className="cl">cognito</span>(),<br />
          &nbsp;&nbsp;routes: <span className="cl">express</span>(),<br />
          {'}'});
        </div>
        <div className="syngraph">
          <svg aria-hidden="true">
            <line x1="18%" y1="32" x2="50%" y2="32" /><line x1="50%" y1="44" x2="50%" y2="78" />
            <line x1="50%" y1="92" x2="22%" y2="136" /><line x1="50%" y1="92" x2="50%" y2="136" /><line x1="50%" y1="92" x2="78%" y2="136" />
            <line x1="78%" y1="32" x2="62%" y2="32" />
          </svg>
          {NODES.map((n) => (
            <div key={n.label} className="node" style={{ left: n.left, top: n.top }}>
              <em>{n.icon}</em> {n.label}
            </div>
          ))}
        </div>
        <p className="syncount">synth → <b>1 construct = 12 CloudFormation resources</b> · this abstraction is the work</p>
      </div>
    </div>
  );
}
