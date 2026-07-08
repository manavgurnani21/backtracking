// The "MG" monogram sits behind the photo; the img simply covers it once
// public/assets/about/profile.jpg exists (ASSETS_NEEDED #8). No JS needed.
export default function Portrait() {
  return (
    <figure className="portrait" title="Profile photo — drops in at public/assets/about/profile.jpg">
      <div className="ring">
        <div className="inner" style={{ position: 'relative' }}>
          <span aria-hidden="true">MG</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/about/profile.jpg"
            alt=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>
    </figure>
  );
}
