# Assets & Inputs Needed — Hi-Fi → Final Build

Placeholders are live in the hi-fi mockup for everything below. Drop files into the repo
(suggested paths shown) or paste links in chat; each one slots in without design changes.

## Priority 1 — biggest visual impact


| #   | Asset                                 | Spec                                                                    | Target path                          | Status  |
| --- | ------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------ | ------- |
| 1   | Solidigm logo + 3D mark               | Transparent PNG + a rotatable 3D GLB, color #4809AE                     | `public/assets/logos/solidigm.png`   | done    |
| 2   | VectorEdge logo                       | SVG or transparent PNG                                                  | `public/assets/logos/vectoredge.svg` | done    |
| 3   | Cody Codelab logo                     | SVG or transparent PNG                                                  | `public/assets/logos/cody.svg`       | N/A     |
| 4   | UC Davis / EV Challenge logo (EcoCAR) | SVG or transparent PNG                                                  | `public/assets/logos/ecocar.svg`     | done    |
| 5   | LYRIQ renders                         | 2–3 screenshots of the GLB: front ¾, side, top-down (PNG, ≥1200px wide) | `public/assets/lyriq/`               | unused — files present, superseded by the live 3D viewer |
| 6   | LYRIQ GLB file                        | The model itself (will be optimized: Draco/meshopt + KTX2)              | `public/models/lyriq.glb`            | done    |
| 7   | Reddit Devvit app visuals             | Screenshots or short screen recording of the real app                   | `public/assets/reddit/`              | done    |
| 8   | About photos                          | You + the LYRIQ; one personal/team shot (JPG/PNG)                       | `public/assets/about/`               | done    |




## Priority 2 — content & links


| #   | Item                           | Notes                                                                           | Status |
| --- | ------------------------------ | ------------------------------------------------------------------------------- | ------ |
| 9   | Copy sign-off                  | Tagline ("Follow the road."), About draft, quick-facts voice — bless or redline | done   |
| 10  | AWS PR links                   | Rendered as reference chips on the AWS stop                                     | done   |
| 11  | Reddit repo link               | Chip on the Reddit stop                                                         | N/A    |
| 12  | DataScout video + Devpost link | Video thumbnail on the Garage card                                              | files dropped, not yet wired into the bay UI |
| 13  | CodyAI demo/video (optional)   | Upgrades Bay 03 from rotating gallery                                           | N/A    |




## Priority 3 — decisions (no files needed)


| #   | Decision                             | Default if no preference                            | Status  |
| --- | ------------------------------------ | --------------------------------------------------- | ------- |
| 14  | Webfont pairing                      | I pick a modern grotesque + mono for the real build | open    |
| 15  | Domain name                          | Deploys to `*.vercel.app` until chosen              | open    |
| 16  | Final résumé PDF                     | Download button target                              | pending |
| 17  | AWS CDK synth: exact resources shown | Current mock: API GW, Cognito, router, 3 Lambdas    | done    |
| 18  | EcoCAR: which sensors to highlight   | Current mock: camera FOV, corner radar, lidar       | done    |


**Not needed:** logo design (DataScout mark is being designed in-mockup); AWS/Reddit/UC Davis marks (standard sources).
