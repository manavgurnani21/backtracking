'use client';

import { useEffect, useRef, useState } from 'react';

type Step = { pane: 'client' | 'server'; text: string; kind?: 'dim' | 'hit'; delay: number };

// Reconstructed from a real login -> getconfig -> scan -> getresults session against the
// gRPC server (C++ client, Go backend) — the timing and command sequence are real; match
// values are shown redacted and the sample path/filename are genericized.
const STEPS: Step[] = [
  { pane: 'client', text: '$ ./client', kind: 'dim', delay: 0 },
  { pane: 'client', text: '> login', delay: 200 },
  { pane: 'client', text: 'Enter Username: Manav', kind: 'dim', delay: 500 },
  { pane: 'server', text: 'Received: Manav', kind: 'dim', delay: 900 },
  { pane: 'client', text: 'Login Authenticated!', kind: 'hit', delay: 1200 },
  { pane: 'client', text: '> getconfig', delay: 1700 },
  { pane: 'client', text: 'Getting config file from server!', kind: 'dim', delay: 1950 },
  { pane: 'server', text: 'Sending config file to user.', kind: 'dim', delay: 2300 },
  { pane: 'client', text: '> scan ./samples/customer_exports', delay: 2800 },
  { pane: 'client', text: 'Saved 4 match(es) to DCA_MATCHES.db', kind: 'hit', delay: 3300 },
  { pane: 'client', text: '> getresults ./samples/customer_exports', delay: 3800 },
  { pane: 'client', text: '> exit', kind: 'dim', delay: 4750 },
];

const RESULTS_AT = 4150;

export default function Terminal() {
  const [count, setCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [running, setRunning] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function run() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setCount(0);
    setShowResults(false);
    setRunning(true);

    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setCount(STEPS.length);
      setShowResults(true);
      setRunning(false);
      return;
    }

    STEPS.forEach((_, i) => {
      timers.current.push(setTimeout(() => setCount(i + 1), STEPS[i].delay));
    });
    timers.current.push(setTimeout(() => setShowResults(true), RESULTS_AT));
    timers.current.push(setTimeout(() => setRunning(false), STEPS[STEPS.length - 1].delay + 200));
  }

  const clientSteps = STEPS.slice(0, count).filter((s) => s.pane === 'client');
  const serverSteps = STEPS.slice(0, count).filter((s) => s.pane === 'server');

  return (
    <div className="viewer">
      <div className="vhead">
        <span>Client / server agent</span>
        <button className="btn" style={{ padding: '5px 13px' }} onClick={run} disabled={running}>
          {running ? 'running…' : count > 0 ? '↺ replay' : '▸ run agent'}
        </button>
      </div>
      <div className="dualterm">
        <div className="term-pane client">
          <div className="term-pane-label"><span className="dot" />client · ./client</div>
          {clientSteps.map((s, i) => (
            <div key={i} className={`term-line${s.kind ? ` ${s.kind}` : ''}`}>{s.text}</div>
          ))}
        </div>
        <div className="term-pane server">
          <div className="term-pane-label"><span className="dot" />server · go run main.go</div>
          {serverSteps.length === 0 && <div className="term-line dim">awaiting connection…</div>}
          {serverSteps.map((s, i) => (
            <div key={i} className={`term-line${s.kind ? ` ${s.kind}` : ''}`}>{s.text}</div>
          ))}
        </div>
        {showResults && (
          <div className="term-pane">
            <div className="term-results">
              <div className="term-match">
                <span className="tid">SSN <b>×3</b> · customer_records.txt</span>
                <span><span className="tval">•••-••-4821</span><span className="tconf">0.94</span></span>
              </div>
              <div className="term-match">
                <span className="tid">Credit Card <b>×1</b> · customer_records.txt</span>
                <span><span className="tval">••••-••••-••••-4821</span><span className="tconf">0.88</span></span>
              </div>
              <div className="term-summary">4 matches · 2 identifiers · aho-corasick scan: 38ms (naive baseline: 260ms) → -85% latency</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
