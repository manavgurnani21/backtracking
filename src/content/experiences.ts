import type { Stop } from './types';

// Ordered most recent first (by end date); the journey road renders top→bottom from now back to the start.
export const stops: Stop[] = [
  {
    slug: 'ecocar',
    org: 'EcoCAR at UC Davis',
    role: 'Undergraduate Software Lead, CAV',
    dates: 'Jan 2024 – Jun 2026',
    location: 'Davis, CA',
    blurb: 'Leading the autonomy software for a Cadillac LYRIQ — the car this whole site is themed after.',
    cardBlurb: 'Software lead for a 15-person autonomy team turning a Cadillac LYRIQ into a connected autonomous vehicle.',
    highlights: [
      'Led a 15-member autonomous systems team across perception, fusion, and driver-assistance features.',
      '+50% object detection and tracking accuracy via a C++ sensor-fusion pipeline — CV, k-means classification, Kalman-filter multi-target tracking.',
      'Real-time driver monitoring: signal processing + time-series inference triggering driver-attention alerts.',
    ],
    chips: ['C++', 'OpenCV', 'Kalman filters', 'RTMaps'],
    pendingChips: ['links pending'],
    initials: 'EC',
    hue: '#2E7D32',
    logoTitle: 'UC Davis EV / EcoCAR logo',
    logo: '/assets/logos/ecocar.png',
    cluster: 'cars',
    interactive: 'sensor-viewer',
  },
  {
    slug: 'reddit',
    org: 'Reddit',
    role: 'SWE Intern (Contract), Media & Business Development',
    dates: 'Sep – Dec 2025',
    location: 'Davis, CA',
    blurb: 'A live sports voting platform inside Reddit — real games, real time, real fans.',
    cardBlurb: 'Real-time community sports voting platform for NBA, MLB and NFL — 500+ users on live games.',
    highlights: [
      'React/TypeScript real-time community sports platform for NBA, MLB, NFL — 500+ users voting on live games with personalized history.',
      'Dynamic Redis caching with expiry aligned to game lifecycles — fewer redundant API calls, minimal storage overhead.',
    ],
    chips: ['React', 'TypeScript', 'Redis', 'Devvit'],
    pendingChips: ['repo link pending'],
    initials: 'RD',
    hue: '#FF4500',
    logoTitle: 'Reddit logo — standard source',
    logo: '/assets/logos/reddit.png',
    cluster: 'industry',
    interactive: 'app-demo',
  },
  {
    slug: 'aws',
    org: 'Amazon Web Services',
    role: 'SDE Intern, AWS Amplify',
    dates: 'Jun – Sep 2025',
    location: 'Seattle, WA',
    blurb: 'The L3 CDK construct for Amazon Location Service in AWS Amplify Gen 2 — real, merged, open source.',
    cardBlurb: 'Built the L3 CDK construct for Amazon Location Service in AWS Amplify Gen 2 — cut backend config effort 65%.',
    highlights: [
      'Built and shipped the L3 CDK construct for Amazon Location Service (Geo) in AWS Amplify Gen 2 — closing a Gen 1 → Gen 2 gap: map config, location search, geofencing, API-key auth, and a Google Maps migration path. Cut backend config + CI/CD effort by 65%.',
      'Shipped with integration tests and public documentation on the Amplify docs site — reusable TypeScript CDK components serving 2,100+ customers.',
      'API Gateway routing + Cognito auth abstractions; Express-style Lambda backends → +75% API dev velocity.',
    ],
    chips: ['TypeScript', 'AWS CDK', 'Amazon Location Service', 'CloudFormation'],
    pendingChips: [],
    links: [
      { label: 'PR #1: L3 construct', href: 'https://github.com/aws-amplify/amplify-backend/pull/2912' },
      { label: 'PR #2: API key auth', href: 'https://github.com/aws-amplify/amplify-backend/pull/2937' },
      { label: 'PR #3: Integration tests', href: 'https://github.com/aws-amplify/amplify-backend/pull/2950' },
      { label: 'PR #4: Docs', href: 'https://github.com/aws-amplify/docs/pull/8412' },
    ],
    initials: 'AW',
    hue: '#FF9900',
    logoTitle: 'AWS logo — standard source',
    logo: '/assets/logos/aws.png',
    logoDark: '/assets/logos/aws-color.png',
    cluster: 'industry',
    interactive: 'cdk-synth',
  },
  {
    slug: 'solidigm',
    org: 'Solidigm',
    orgSuffix: '(formerly Intel)',
    role: 'Software Developer Intern',
    dates: 'Jan – Jun 2025',
    location: 'Davis, CA',
    blurb: 'Internal tooling that 1,600+ people rely on — invisible outside, load-bearing inside.',
    cardBlurb: 'Internal workflow web app with Okta SSO and Workday integration, used by 1,600+ staff.',
    highlights: [
      '2× team productivity via an internal workflow web app — React.js, Node.js, Supabase.',
      'Okta SSO integration: −34% login time, simpler auth for employees.',
      'Workday API integration automating goal + milestone tracking org-wide.',
    ],
    chips: ['React', 'Node.js', 'Supabase', 'Okta', 'Workday API'],
    pendingChips: [],
    initials: 'SD',
    hue: '#4809AE',
    logoTitle: 'Solidigm logo',
    logo: '/assets/logos/solidigm.png',
    cluster: 'industry',
    interactive: 'logo-3d',
  },
  {
    slug: 'vectoredge',
    org: 'VectorEdge',
    role: 'SWE Intern, Data Loss Prevention',
    dates: 'Jun – Aug 2024',
    location: 'San Jose, CA',
    blurb: 'A production-style CLI agent that finds sensitive data before it leaks.',
    cardBlurb: 'Data-loss-prevention CLI search engine — Aho-Corasick automata, 85% faster queries.',
    highlights: [
      'CLI agent with user auth, query retrieval, and recursive scanning for 2,000+ users.',
      '-85% search latency — Aho-Corasick automata + SQLite indexing.',
      'Cross-language gRPC service: C++ client ↔ Go backend for secure query execution.',
    ],
    chips: ['C++', 'Go', 'gRPC', 'SQLite'],
    pendingChips: [],
    initials: 'VE',
    hue: '#2962FF',
    logoTitle: 'VectorEdge logo',
    logo: '/assets/logos/vectoredge.png',
    cluster: 'industry',
    interactive: 'terminal',
  },
];

export function getStop(slug: string): Stop | undefined {
  return stops.find((s) => s.slug === slug);
}

export function adjacentStops(slug: string): { prev: Stop; next: Stop } {
  const i = stops.findIndex((s) => s.slug === slug);
  const prev = stops[(i - 1 + stops.length) % stops.length];
  const next = stops[(i + 1) % stops.length];
  return { prev, next };
}

export const education = {
  school: 'University of California, Davis',
  degree: 'B.S. Computer Science & Statistics — ML concentration',
  dates: 'Aug 2022 – Aug 2026 (expected)',
  location: 'Davis, CA',
  note: 'Every stop on the road happened while enrolled — EcoCAR, three internships, and two research labs all run through this sector.',
};
