// Phase 1: static terminal render. A later phase makes it type-your-own-pattern
// with an in-browser Aho-Corasick implementation.
export default function Terminal() {
  return (
    <div className="viewer">
      <div className="vhead"><span>Live terminal</span><span>interactive in a later pass</span></div>
      <div className="term" role="img" aria-label="Terminal showing a pattern search with highlighted matches">
        <div><span className="p">vedge&gt;</span> scan --patterns &quot;ssn,api_key,card&quot; ./exports/q3</div>
        <div className="dim">scanning 1,204 files · aho-corasick automaton · 3 patterns</div>
        <div>exports/q3/users.csv:41 &nbsp;…customer <span className="hit">ssn</span>=550-xx-xxxx…</div>
        <div>exports/q3/env.bak:7 &nbsp;&nbsp;&nbsp;…AWS_<span className="hit">api_key</span>=AKIA********…</div>
        <div>exports/q3/orders.json:203 …&quot;<span className="hit">card</span>&quot;: &quot;4242-****…&quot;</div>
        <div className="dim">3 hits · 38 ms &nbsp;(naive scan: 260 ms → 85% faster)</div>
        <div><span className="p">vedge&gt;</span> <span className="cursor">▊</span></div>
      </div>
    </div>
  );
}
