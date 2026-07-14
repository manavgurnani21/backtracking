export type Cluster = 'industry' | 'cars' | 'research';

export type InteractiveKind =
  | 'sensor-viewer' // EcoCAR — 2D now, R3F GLB in Phase 3
  | 'cdk-synth'     // AWS
  | 'app-demo'      // Reddit — real screen recording, widescreen web/Devvit UI
  | 'terminal'      // VectorEdge
  | 'logo-3d'       // Solidigm — real 3D logo model, rotate/orbit
  | 'none';

export interface StopLink {
  label: string;
  href: string;
}

export interface Stop {
  slug: string;
  org: string;
  orgSuffix?: string;
  role: string;
  dates: string;
  location: string;
  blurb: string;
  cardBlurb: string;
  highlights: string[];
  chips: string[];
  pendingChips: string[];
  initials: string;
  hue: string; // brand hex used for tinted tiles/bands
  logoTitle: string;
  logo?: string; // real logo image path; falls back to initials tile when absent
  logoDark?: string; // dark-mode variant, shown instead of `logo` when the site is in dark mode
  cluster: Cluster;
  interactive: InteractiveKind;
  links?: StopLink[];
}

export type ProjectStatus = 'open' | 'in-progress';

export interface Project {
  slug: string;
  title: string;
  shutterTitle: string;
  shutterBlurb?: string; // closed bays only
  blurb: string;
  chips: string[];
  itag: string;
  status: ProjectStatus;
  tile: 'datascout' | 'text' | 'pending';
  tileText?: string;
}
