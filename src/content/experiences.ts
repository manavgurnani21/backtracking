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
    logoTitle: 'EcoCAR logo — pending',
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
    cluster: 'industry',
    interactive: 'phone-demo',
  },
  {
    slug: 'aws',
    org: 'Amazon Web Services',
    role: 'SDE Intern, AWS Amplify',
    dates: 'Jun – Sep 2025',
    location: 'Seattle, WA',
    blurb: 'One TypeScript construct in, a whole backend out — feature-complete and release-ready.',
    cardBlurb: 'Reusable TypeScript CDK constructs for AWS Amplify — IaC framework cut backend config effort 65%.',
    highlights: [
      '-65% backend config + CI/CD effort: automated CloudFormation IaC framework in Amplify.',
      'Reusable TypeScript CDK components abstracting orchestration for 2,100+ customers.',
      'API Gateway routing + Cognito auth abstractions; Express-style Lambda backends → +75% API dev velocity.',
    ],
    chips: ['TypeScript', 'AWS CDK', 'CloudFormation', 'Cognito'],
    pendingChips: ['PR links pending'],
    initials: 'AW',
    hue: '#FF9900',
    logoTitle: 'AWS logo — standard source',
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
    hue: '#00BFA5',
    logoTitle: 'Solidigm logo — pending',
    cluster: 'industry',
    interactive: 'spin',
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
    pendingChips: ['repo link optional'],
    initials: 'VE',
    hue: '#2962FF',
    logoTitle: 'VectorEdge logo — pending',
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
