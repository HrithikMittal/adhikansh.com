export interface PersonalInfo {
  name: string;
  /** One line for hero / terminal meta (e.g. role + company). */
  primaryRole: string;
  tagline: string;
  location: string;
  status: string;
  email: string;
  index: string;
  updated: string;
  baseLocation: string;
}

export type ProjectTier = "flagship" | "side";

export interface ProofLink {
  label: string;
  /** Omit when the line is informational only (no public URL). */
  url?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  role: string;
  year: string;
  color: string;
  glyph: string;
  tier: ProjectTier;
  /** Customer or live product examples (shown in UI when set). */
  proofLinks?: ProofLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
  icon?: string;
}

export interface LinkedInPost {
  title: string;
  url: string;
  /** Display date, e.g. 2026.05 */
  date: string;
}

/** Long-form pieces you want listed under Writing (each links to Medium). */
export interface MediumArticle {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  url: string;
}

export interface LabIdea {
  id: string;
  /** Public-facing working title */
  workingTitle: string;
  description: string;
}

export const PERSONAL_INFO: PersonalInfo = {
  name: "Adhikansh Mittal",
  primaryRole: "Co-Founder & CTO, Coraltalk",
  tagline:
    "Most of my time goes to Coraltalk - AI-powered spoken assessment used by 10+ schools. I still write code, ship releases, and answer support threads when it matters.",
  location: "Bengaluru, IN",
  status: "Coraltalk in market",
  email: "hi@adhikansh.com",
  index: "001 / 001",
  updated: "12.05.26",
  baseLocation: "Bengaluru, IN",
};

/** File in /public - used in About and metadata where needed. */
export const PROFILE_IMAGE = "/adhikansh.png";

export const MEDIUM_PROFILE = {
  url: "https://medium.com/@adhikanshmittal",
  label: "Medium",
  handle: "@adhikanshmittal",
} as const;

/** Short “now” line + CTA for LinkedIn-first publishing. */
export const NOW = {
  headline:
    "Long-form posts here are paused. I’m publishing on LinkedIn twice a week - notes on building, education, and side ships.",
  ctaLabel: "Follow on LinkedIn",
  ctaUrl: "https://www.linkedin.com/in/adhikansh-mittal",
} as const;

export const ABOUT = {
  headline:
    "Technical founder who spends most cycles on one bet - and ships smaller products when I want a different kind of puzzle.",
  paragraphs: [
    "I’m Co-Founder & CTO at Coraltalk, where we help schools verify real understanding with voice-first, rubric-aligned conversations - especially now that polished written work is easy to fake. Today more than ten schools run on the product, and that’s where my head and calendar live.",
    "On the side I’m the founder of Staymod and Eatmod: fun builds for boutique hospitality and F&B that I tinker on when I want a break from the main quest. Both are in production - Staymod powers properties like Shangarh Retreat plus another hotel; Eatmod runs in the wild (including at Zostel Shangarh).",
    "I like working with people who care about the unglamorous iteration: the dashboard you delete, the edge case in week six, the hire you wish you’d made earlier. If you’re going from blank repo to real users - or you’re stuck past the founder bottleneck - I’m usually a useful conversation.",
  ],
  /** Short human signal; keep scannable. */
  personal:
    "Away from the keyboard: chess, PS5, cricket and football, painting, bartending, gardening - and a cat named Chillu.",
  stack: {
    stack: "TypeScript · Python · Postgres",
    ai: "Voice · Agents · RAG · Evals",
    cloud: "AWS · Cloudflare · Vercel",
    comfortZone: "First 10 schools · 0 → 1",
  },
};

export const PROJECTS: Project[] = [
  {
    id: "coraltalk",
    name: "Coraltalk",
    description:
      "AI-powered spoken assessment for schools - oral exams, role-play, and explanation-based checks when written assignments stop being reliable evidence.",
    url: "https://coraltalk.com",
    role: "Co-Founder & CTO",
    year: "2024 - present",
    color: "#e76f51",
    glyph: "C",
    tier: "flagship",
  },
  {
    id: "staymod",
    name: "Staymod",
    description:
      "Property and stay management for small hospitality teams - bookings, availability, and ops in one place. A boredom project that accidentally met real guests.",
    url: "https://staymod.in",
    role: "Founder",
    year: "2022 - present",
    color: "#2a4858",
    glyph: "S",
    tier: "side",
    proofLinks: [
      { label: "Shangarh Retreat", url: "https://www.shangarhretreat.com/" },
      { label: "+ 1 more boutique property (private)" },
    ],
  },
  {
    id: "eatmod",
    name: "Eatmod",
    description:
      "F&B and kitchen-side tooling for stays and cafés - menus, orders, and ops adjacent to Staymod. Same itch: ship something small and watch it run in the real world.",
    url: "https://eatmod.in",
    role: "Founder",
    year: "2023 - present",
    color: "#5d6e1e",
    glyph: "E",
    tier: "side",
    proofLinks: [
      {
        label: "Zostel · Shangarh",
        url: "https://www.zostel.com/destination/shangarh/stay/shangarh-kullu-shnh319",
      },
    ],
  },
];

/** Flagship first, then side projects (stable sort for UI). */
export const PROJECTS_ORDERED: Project[] = [
  ...PROJECTS.filter((p) => p.tier === "flagship"),
  ...PROJECTS.filter((p) => p.tier === "side"),
];

/** Curate after each LinkedIn post - no API required. */
export const LINKEDIN_POSTS: LinkedInPost[] = [];

/** Pipeline ideas - not shipped; names are working titles only. */
export const LAB_IDEAS: LabIdea[] = [
  {
    id: "linkedin-fix",
    workingTitle: "Signalcraft (working name)",
    description:
      "LinkedIn profile and post polish - stronger signal, less generic “thought leadership.” Exploring; no timeline.",
  },
  {
    id: "resume",
    workingTitle: "Roleproof (working name)",
    description:
      "Resume builder biased toward credibility and role fit, not keyword stuffing. Paper napkin stage.",
  },
  {
    id: "bhakti",
    workingTitle: "BhaktiPath (working name)",
    description:
      "Mobile experience around bhakti / devotion - calm daily ritual, not another feed. Idea only; open to collaborators with taste.",
  },
];

/** Curated Medium stories - add rows here (no fetching). */
export const MEDIUM_ARTICLES: MediumArticle[] = [
  {
    id: "flamingo-central-mapping-aff62c13136e",
    title:
      "Flamingo: The Central Mapping — Revolutionizing Our Annotation Process",
    subtitle:
      "Efficiency and speed are everything when it comes to data annotation and mapping. Let's start by clarifying what Data annotation really means and what I mean by mapping as well.",
    date: "2024.06",
    readTime: "7 min",
    url: "https://medium.com/attentive-ai-engineering/flamingo-the-central-mapping-revolutionizing-our-annotation-process-aff62c13136e",
  },
  {
    id: "what-is-redux-b1eac1b81ee1",
    title: "What is Redux?",
    subtitle:
      "Hey everyone — I'm Adhikansh again. Here I explain what Redux is in theory, and how to reason about it before you dive in and create multiple reducers.",
    date: "2019.09",
    readTime: "5 min",
    url: "https://medium.com/siam-vit/what-is-redux-b1eac1b81ee1",
  },
];

/** Copy for the Writing section (Swiss + modes). */
export const WRITING_SECTION = {
  headlineBefore: "Notes on building, hiring, and the unromantic parts of",
  headlineEm: " founder mode.",
  headlineAfter: "",
  highlightsEmpty:
    "Standout posts will show up here as I curate them - for now everything new goes to LinkedIn first.",
  archiveLabel: "MEDIUM ARCHIVE",
  mediumBlurb:
    "Featured Medium posts appear in the archive below when I curate them; the full archive is on my Medium profile.",
} as const;

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: "Email",
    url: "mailto:hi@adhikansh.com",
    handle: "hi@adhikansh.com",
  },
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/adhikansh-mittal",
    handle: "in/adhikansh-mittal",
  },
  {
    platform: "Medium",
    url: MEDIUM_PROFILE.url,
    handle: MEDIUM_PROFILE.handle,
  },
  {
    platform: "GitHub",
    url: "https://github.com/HrithikMittal",
    handle: "@HrithikMittal",
  },
  {
    platform: "Topmate",
    url: "https://topmate.io/adhikansh",
    handle: "topmate.io/adhikansh",
  },
  {
    platform: "Coraltalk",
    url: "https://coraltalk.com",
    handle: "coraltalk.com",
  },
  {
    platform: "Staymod",
    url: "https://staymod.in",
    handle: "staymod.in",
  },
  {
    platform: "Eatmod",
    url: "https://eatmod.in",
    handle: "eatmod.in",
  },
];

export const TICKER_ITEMS = [
  "Coraltalk",
  "10+ schools",
  "Spoken assessment",
  "Staymod",
  "Eatmod",
  "Chess",
  "Chillu",
  "Shipping",
];

export const TERMINAL_TAGLINE = "BOLD · CONFIDENT · SHIPPING";
