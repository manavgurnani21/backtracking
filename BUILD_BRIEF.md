# Backtracking — Portfolio Site Build Brief

Handoff brief for the builder agent. Greenfield repo. Owner: **Manav Gurnani**
(UC Davis, B.S. Computer Science & Statistics, ML concentration, grad Aug 2026).

Contact on résumé: manavgurnani21@gmail.com · linkedin.com/in/manav-gurnani ·
github.com/manavgurnani21 · San Jose, CA.

---

## 1. What this is
A personal portfolio site that (a) represents Manav's experience, (b) shows a more personal
side, (c) grows into a public hub for future projects, and (d) fuses two passions — **cars**
and **ML systems / autonomy** — without either feeling bolted on.

**Guiding constraint: do not over-design it.** It must stay intuitive and navigable. "Cool but
navigable" beats "immersive but a maze." When in doubt, choose the simpler, faster, more
maintainable option.

## 2. Design concept (locked)
- **Theme veneer: road-trip map.** Warm, narrative, jump-anywhere by nature (pins/waypoints).
- **Interaction model: progressive immersion.** The top of the site is a conventional,
  navigable layout with a persistent top nav — land and jump to anything in one click. If the
  user *chooses* to scroll from the hero, the map route unfolds and carries them across the
  journey, revealing waypoint "stops" in sequence. **Scroll is a reward, not a gate**; every
  stop is also directly reachable via nav and its own URL.
- **ML is shown, not narrated.** No persistent HUD/chrome. Each experience demonstrates itself;
  the "systems" flavor appears only where relevant (e.g. the EcoCAR stop).
- **3D is reserved for one hero moment** (the EcoCAR LYRIQ). Everything else is lightweight 2D
  (map, cards, diagrams, a fake terminal), which protects load time and navigability.

## 3. Tech stack
- **Next.js (App Router) + TypeScript** — SEO + routing for a public, growing hub.
- **Tailwind CSS** — styling.
- **Lenis + GSAP ScrollTrigger** — smooth scroll and the scroll-driven journey reveal.
- **Framer Motion** — UI transitions.
- **Map/route rendering: SVG or Canvas 2D** — the journey spine is 2D and cheap, not 3D.
- **React Three Fiber + drei + Three.js** — ONLY for the EcoCAR LYRIQ scene, lazy-loaded.
- **Zustand** — light shared state.
- **Content as typed data (TS/MDX)** — see §5; the hub must be trivial to extend.
- **Vercel** hosting + custom domain.

## 4. Information architecture & routes
Persistent top nav on every page: **Home · Journey · Garage · Research · About · Contact**,
plus a **résumé download** button.

| Route | Purpose |
|---|---|
| `/` | Home/hero + the scroll journey (map with waypoint stops) |
| `/journey/[slug]` | Direct-link page for each experience stop (SEO + nav parity) |
| `/garage` | Projects hub — card grid |
| `/garage/[slug]` | Direct-link page per project |
| `/research` | Research section — **renders "under construction" for now** |
| `/about` | Personal + car-passion side (warm, scrapbook feel) |
| `/contact` | Contact + links |

The journey view and the `[slug]` pages render from the same content source (§5). Mobile:
the journey collapses to a plain, tappable stacked list of stops; no heavy 3D except on
capable viewports.

## 5. Content model
Model everything as typed records so the journey view, the direct pages, and the Garage all
render from one source and new entries are a 5-minute edit.

```ts
type Interactive =
  | { kind: 'cdk-synth' }            // AWS: animated construct → cloud graph
  | { kind: 'model-3d'; asset: string; overlays?: SensorOverlay[] } // EcoCAR LYRIQ
  | { kind: 'phone-demo'; src: string; mode: 'video' | 'live' }     // Reddit
  | { kind: 'terminal'; script: TerminalStep[] }                    // VectorEdge
  | { kind: 'spinning'; assets: string[] }                          // Solidigm / GAN / CodyAI
  | { kind: 'video'; src: string }                                  // DataScout
  | { kind: 'none' };

type Stop = {
  slug: string; title: string; org: string; role: string;
  dates: string; location: string; blurb: string; highlights: string[];
  logo: string;                 // asset path; several are pending (see §12)
  cluster: 'industry' | 'cars' | 'research';
  interactive: Interactive;
  links?: { label: string; href: string }[]; // PRs, repos, devpost — several pending
  tbd?: string;                 // notes where details are still being finalized
};
```

Suggested files: `content/experiences.ts`, `content/projects.ts`, `content/research.ts`.

---

## 6. Journey — experiences (the road)
Order chronologically on the map. Clusters can drive branching visuals later; for now render
as a single navigable route.

### 6.1 AWS — `cluster: industry`
- **Org / role:** Amazon Web Services (AWS) — Software Development Engineer Intern (AWS Amplify)
- **Dates / location:** Jun – Sep 2025 · Seattle, WA
- **Highlights (from résumé):**
  - Reduced backend configuration and CI/CD efforts by 65% by architecting an automated
    CloudFormation IaC framework within AWS Amplify, eliminating redundancy in Geo and RESTful
    configurations.
  - Improved platform reliability for 2,100+ customers by building reusable TypeScript CDK
    components that abstracted resource orchestration and service integration.
  - Lowered REST API onboarding overhead by designing API Gateway routing and Cognito
    authorization abstractions, standardizing auth and request flows across Amplify apps.
  - Increased API development velocity by 75% by introducing Express-style Lambda backends into
    Amplify's REST service.
- **Logo:** AWS logo (place on the map pin).
- **Interactive:** **"CDK synth" diagram** — a compact CDK construct that, on click, animates/
  expands into the full provisioned cloud graph (API Gateway → Cognito → Lambda → resources),
  visualizing the abstraction layer Manav built. 2D (SVG/Canvas), no 3D.
- **Links:** PR links to be provided (add as reference chips).
- **Note:** The work was **feature-complete and release-ready** but not publicly published —
  present it as finished, not incomplete.
- **TBD:** exact constructs/resources shown in the synth animation.

### 6.2 EcoCAR at UC Davis — `cluster: cars`
- **Org / role:** EcoCAR at UC Davis — Undergraduate Software Lead, Connected Autonomous
  Vehicle (CAV)
- **Dates / location:** Jan 2024 – Jun 2026 · Davis, CA
- **Highlights (from résumé):**
  - Led a 15-member autonomous systems team designing perception, fusion, and driver-assistance
    features for an industry-level connected autonomous vehicle.
  - Improved object detection and tracking accuracy by 50% by implementing a C++ sensor-fusion
    pipeline combining computer vision, k-means clustering for object classification, and
    Kalman-filter–based multi-target tracking.
  - Developed a real-time driver monitoring system using signal processing and time-series
    statistical inference to detect behavioral anomalies and trigger driver-attention alerts.
- **Logo:** UC Davis or EV Challenge (**asset pending** — Manav to provide).
- **Interactive:** **Rotating, orbitable 3D Cadillac LYRIQ** the user can spin around
  (orbit controls), with **sensor-highlight overlays** rendered as procedural R3F geometry —
  transparent, additive-blended cones (camera FOV), arcs/wedges (radar), and ray-lines (lidar)
  anchored at the sensor mounts and toggled/animated in code (not baked into the model, not real
  lights). Optional `<Bloom>` for glow. This is the site's single hero 3D moment; lazy-load it
  and gate heavy rendering to capable viewports with an image fallback.
- **Assets:** **LYRIQ GLB model — in hand ✅** (optimize with `gltf-transform`: Draco/meshopt +
  KTX2 before shipping; prefer a model with a separated body material if a paint-color swap is
  wanted). LYRIQ multi-angle photos still useful for the image fallback gallery (optional).
- **TBD:** which specific sensors / perception regions to highlight (the rendering approach is
  settled above).

### 6.3 Reddit — `cluster: industry`
- **Org / role:** Reddit — Software Engineering Intern, Contract (Media and Business Development)
- **Dates / location:** Sep – Dec 2025 · Davis, CA
- **Highlights (from résumé):**
  - Built a React/TypeScript-powered real-time community sports platform for NBA, MLB, and NFL,
    enabling 500+ users to vote on live games while tracking personalized voting history.
  - Designed a dynamic Redis caching layer with dynamically calculated expiry times aligned to
    game lifecycles, reducing redundant API calls and minimizing storage overhead.
- **Logo:** Reddit logo.
- **Interactive:** **Phone-frame demo** of the Devvit app. Default to a **recorded/scripted
  interaction** (Devvit apps run inside Reddit's webview, so a standalone live embed may be
  impractical); upgrade to a live embed only if it hosts cleanly.
- **Links:** git repo (**pending**).

### 6.4 Solidigm (Formerly Intel) — `cluster: industry`
- **Org / role:** Solidigm — Software Developer Intern
- **Dates / location:** Jan – Jun 2025 · Davis, CA
- **Highlights (from résumé):**
  - Doubled team productivity by developing an internal workflow web app with React.js, Node.js,
    and Supabase.
  - Integrated Okta single sign-on (SSO), reducing login time by 34% and simplifying employee
    authentication.
  - Connected to the Workday API to automate goal and milestone tracking, supporting 1,600+
    staff across the organization.
- **Logo:** Solidigm logo (**asset pending**).
- **Interactive:** **Lightweight spinning treatment** (rotating logo / simple animated mark) —
  the internal tool can't be shown and there's no shareable artifact, so keep it minimal and
  honest. Copy carries the impact.

### 6.5 VectorEdge — `cluster: industry`
- **Org / role:** VectorEdge — Software Engineering Intern (Data Loss Prevention)
- **Dates / location:** Jun – Aug 2024 · San Jose, CA
- **Highlights (from résumé):**
  - Built a production-style CLI agent supporting user authentication, query retrieval, and
    recursive scanning for 2,000+ users.
  - Reduced search latency by 85% by implementing a search engine with Aho-Corasick automata and
    SQLite indexing.
  - Designed a cross-language gRPC service with a C++ client and Go backend communicating for
    secure query execution.
- **Logo:** VectorEdge logo (**asset pending**).
- **Interactive:** **In-page interactive terminal** — visitor runs a sample search command and
  watches the Aho-Corasick engine highlight multi-pattern matches across sample text, with a
  latency readout that makes the "85% faster" tangible. 2D/JS.
- **Links:** repo/PR (optional, if provided).

---

## 7. Garage — projects (separate `/garage` page, card grid)
Card-grid hub, data-driven, easy to extend. Each card opens a panel/`[slug]` page with its
interactive. Collapses to a simple responsive grid on all widths (no over-design).

### 7.1 DataScout
- **Date / stack:** Jun 2026 · Claude API, Bedrock (Claude), AWS Lambda, DynamoDB, OpenSearch, CDK
- **Highlights:**
  - Built a serverless dataset-discovery tool that turns natural-language queries into ranked
    Kaggle recommendations using Amazon Bedrock (Claude) for structured intent extraction over
    an OpenSearch index.
  - Architected an event-driven AWS pipeline with DynamoDB as system-of-record, a rebuildable
    search index, and keyword-search fallback for resilience.
- **Logo:** custom — proposed concept: a minimal monoline **compass needle sweeping over a
  dot-grid dataset** ("discovery over data"). Builder to mock.
- **Interactive:** **video demo** + **Devpost link** (both pending from Manav).

### 7.2 Emotion Detector with Synthetic Data Augmentation (GAN)
- **Date / stack:** Nov – Dec 2025 · PyTorch, DCGAN, CNNs
- **Highlights:**
  - Trained a DCGAN guided by a pre-trained emotion classifier to generate synthetic samples for
    underrepresented classes and expand dataset coverage.
  - Evaluated GAN-augmented training regimes, observing minimal accuracy gains and increased
    inter-class confusion — highlighting the limits of synthetic data for fine-grained emotion
    recognition.
- **Logo:** UC Davis.
- **Interactive:** **rotating pipeline diagrams / pictures** (2D spinning cards). No live demo.

### 7.3 CodyAI
- **Date / stack:** Jun – Sep 2025 · TypeScript, Tailwind CSS, Gemini API, Vercel AI SDK, PostgreSQL
- **Highlights:**
  - Deployed a full-stack AI-powered RAG chatbot using Next.js, React, and TypeScript,
    implementing modern App Router architecture and server-side rendering for performance.
- **Logo:** Cody Codelab (**asset pending**).
- **Interactive:** **rotating pictures / logo** (video demo if one becomes available). No live demo.

---

## 8. Research — `/research` (UNDER CONSTRUCTION for now)
Render as a polished "under construction / coming soon" section. Do not build out interactives
yet — most of this work is ongoing. Keep the entries listed below as data so it's easy to flip
on later. (Consideration for later: the monocular lane-segmentation work is EcoCAR Senior
Design perception and could surface next to the EcoCAR stop rather than under Research.)

- **Aviran Lab** — Undergraduate Researcher (Jan 2026 – Present, Davis, CA). Multimodal feature
  integration (GraphConv, cross-attention, transformer, DPRBP) in a state-of-the-art RNA-protein
  interaction model (PaRPI); extending BRIDGE (motif-enhanced RNA-binding predictor) with
  protein-aware context; +20% computational efficiency via multi-threading.
- **Karzand Lab** — Undergraduate Researcher (Jun 2026 – Present, Davis, CA). Investigating
  whether heuristic information-theoretic proxies in the InfoBoost transfer-learning algorithm
  accurately approximate true mutual information and KL divergence (closed-form Gaussian
  mean-estimation experiments).
- **Real-time Monocular Lane Segmentation & Vehicle Tracking** — Undergraduate Researcher, UC
  Davis EcoCAR Senior Design (Jan – Jun 2026, Davis, CA). Monocular ML-based vehicle perception
  (object segmentation, tracking, lane detection), -85% autonomous sensory requirements;
  monolithic transformer framework + continual-learning pipeline.

---

## 9. Interactive components — quick reference
| Stop | Treatment | Build weight |
|---|---|---|
| AWS | Animated "CDK synth" diagram (2D) | Medium |
| EcoCAR | Orbitable 3D LYRIQ + sensor overlays | High (only 3D) |
| Reddit | Phone-frame recorded/scripted demo | Low–Medium |
| Solidigm | Spinning logo / mark | Low |
| VectorEdge | Interactive terminal (Aho-Corasick match highlighting) | Medium |
| DataScout | Video + Devpost link | Low |
| GAN | Rotating pipeline diagrams/pictures | Low |
| CodyAI | Rotating pictures/logo | Low |

## 10. Performance & accessibility guardrails
- Mobile fallback: map → tappable pin list; the 3D LYRIQ gated to capable viewports with an
  image fallback.
- Lazy-load the 3D scene; loading states; compress GLB (Draco/meshopt) + KTX2 textures; budget.
- Honor `prefers-reduced-motion`: journey collapses to plain scannable sections.
- Per-stop / per-project routes with metadata for SEO and shareability.

## 11. Phased roadmap
- **Phase 0 — Foundation:** scaffold Next + TS + Tailwind, Vercel deploy pipeline, set up the
  content model (§5) populated from §6–§8.
- **Phase 1 — Navigable 2D site:** hero, nav, all experience stops as content, Garage grid,
  Research "under construction", About, Contact, fully responsive. **Ship this.**
- **Phase 2 — The journey:** map route + scroll-driven waypoint reveal (2D), direct-link parity.
- **Phase 3 — Interactives:** CDK synth diagram, VectorEdge terminal, Reddit phone demo, then
  the EcoCAR 3D LYRIQ (its own sub-phase). Spinning treatments for Solidigm/GAN/CodyAI.
- **Phase 4 — Polish:** motion, transitions, performance, mobile fallbacks, SEO, reduced-motion.
- **Phase 5 — Hub:** confirm adding a future project is a single data/MDX edit.

## 12. Assets & info pending from Manav
- Logos: **UC Davis / EV Challenge** (EcoCAR), **Solidigm**, **VectorEdge**, **Cody Codelab**.
  (AWS, Reddit, UC Davis logos are standard/available.)
- **LYRIQ GLB model — received ✅** (no longer pending). Multi-angle photos still optional, for
  the image fallback gallery only.
- **AWS PR links**, **Reddit repo link**, **DataScout video + Devpost link**, any **CodyAI**
  demo/video.
- Résumé PDF for the download button.

## 13. Open clarifications (finalize before/with the relevant phase)
- AWS: exact constructs/resources depicted in the CDK synth animation.
- EcoCAR: which specific sensors / perception regions to highlight (rendering approach settled in §6.2).
- Reddit: whether a live Devvit embed is viable, else final recorded demo.
- Domain name for the custom domain.

## 14. Verification
Per phase, run `next dev` and drive the real flows: nav jumps land on the right sections; the
scroll journey reveals waypoints and reaches every stop; each interactive works (CDK synth
expands, terminal matches, phone demo plays, LYRIQ orbits with overlays, spinning treatments
render). Test a mobile viewport and `prefers-reduced-motion`. Run Lighthouse for perf/SEO. Push
a Vercel preview deploy each phase for an end-to-end check.
