'use client';

import { useState } from 'react';

// Phase 1 mock of the Devvit app's voting mechanic. Real recorded screens replace
// the app body when assets land (ASSETS_NEEDED #7).
export default function PhoneDemo() {
  const [votes, setVotes] = useState([62, 38]);
  const total = votes[0] + votes[1];
  const pct = votes.map((v) => Math.round((v / total) * 100));

  return (
    <div className="viewer">
      <div className="vhead"><span>App demo</span><span>tap to vote · real screens pending</span></div>
      <div className="phone">
        <div className="sbar"><span>9:41</span><span>●●●</span></div>
        <div className="app">
          <div className="ahead">r/nba · game thread</div>
          <div className="score">LAL 102 — 99 BOS</div>
          <div className="q">Q4 · 4:12 — who takes this one?</div>
          <div className="vote">
            {(['Lakers', 'Celtics'] as const).map((team, i) => (
              <button key={team} onClick={() => setVotes((v) => v.map((x, j) => (j === i ? x + 4 : x)))}>
                {team} <span>{pct[i]}%</span>
                <span className="bar"><i style={{ width: `${pct[i]}%` }} /></span>
              </button>
            ))}
          </div>
          <div className="live"><b>●</b> live · {total + 32} votes · your pick is tracked</div>
        </div>
      </div>
    </div>
  );
}
