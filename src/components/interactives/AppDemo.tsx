// Real screen recording of the Devvit app — a widescreen web widget, not a
// phone screen, so it's framed like a lightweight browser window instead of a
// phone bezel. Silent, autoplaying, looping; native 732:512 aspect ratio.
export default function AppDemo() {
  return (
    <div className="viewer">
      <div className="vhead"><span>App demo</span><span>live recording · muted loop</span></div>
      <div className="appframe">
        <div className="appframe-bar">
          <span className="appframe-dots"><i /><i /><i /></span>
          <span className="appframe-url">reddit.com/r/nba · Devvit app</span>
        </div>
        <div className="appframe-videoClip">
          <video
            className="appframe-video"
            src="/assets/reddit/reddit-demo.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      </div>
    </div>
  );
}
