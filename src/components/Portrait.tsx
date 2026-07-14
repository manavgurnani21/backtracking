// The "MG" monogram sits behind the photo; the img simply covers it once
// public/assets/about/profile.jpg exists (ASSETS_NEEDED #8). No JS needed.
export default function Portrait() {
  return (
    <figure className="portrait">
      <div className="ring">
        <div className="inner">
          <span aria-hidden="true">MG</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/about/profile.jpg" alt="Manav Gurnani" />
        </div>
      </div>
    </figure>
  );
}
