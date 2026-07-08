// Solidigm: the work is internal — a rotating mark carries the theme, copy carries
// the impact. Real Solidigm logo replaces the tile when the asset lands.
export default function SpinMark({ letter = 'S' }: { letter?: string }) {
  return (
    <div className="viewer">
      <div className="vhead"><span>Mark</span><span>internal tool — nothing shareable</span></div>
      <div className="spinwrap">
        <div className="spin3d">{letter}</div>
        <p style={{ fontSize: 12.5, color: 'var(--mut)', textAlign: 'center', maxWidth: '34ch', margin: 0 }}>
          The work lives behind the firewall — the copy carries the impact here.
        </p>
      </div>
    </div>
  );
}
