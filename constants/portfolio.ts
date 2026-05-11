export interface PersonalInfo {
  name: string;
  tagline: string;
  location: string;
  status: string;
  email: string;
  index: string;
  updated: string;
  baseLocation: string;
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
}

export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
  icon?: string;
}

export interface Essay {
  title: string;
  subtitle: string;
  date: string;
  slug: string;
  readTime: string;
}

export const PERSONAL_INFO: PersonalInfo = {
  name: "Adhikansh Mittal",
  tagline: "Technical founder building AI products from 0 → 1. I write code, ship features, and answer support tickets — usually the same week.",
  location: "Bengaluru, IN",
  status: "Currently building Coraltalk",
  email: "hi@adhikansh.com",
  index: "001 / 001",
  updated: "10.05.26",
  baseLocation: "Bengaluru, IN",
};

export const ABOUT = {
  headline: "Multidisciplinary technical founder. Comfortable in code, taste, and customer calls.",
  paragraphs: [
    "I started Coraltalk after a decade of bouncing between engineering, product, and the messy in-between. Before that I co-founded StayMod and EatMod — turning hand-written specs into production systems and live customers.",
    "I care about the parts of building that don't show up in case studies: the second iteration that nobody asks for, the dashboards you delete, the hire you should have made earlier. I work best with people who treat simplicity as the hardest design constraint.",
    "If you're trying to take an idea from blank repo to first ten paying customers — or scale that work past the founder bottleneck — I'm a useful person to talk to.",
  ],
  stack: {
    stack: "TypeScript · Python · Postgres",
    ai: "RAG · Agents · Evals",
    cloud: "AWS · Cloudflare · Vercel",
    comfortZone: "First 10 customers",
  },
};

export const PROJECTS: Project[] = [
  {
    id: "coraltalk",
    name: "Coraltalk",
    description:
      "AI-powered conversation intelligence platform. From cold-start to first paying customers.",
    url: "https://coraltalk.com",
    role: "Founder, Engineering",
    year: "2024 — present",
    color: "#e76f51",
    glyph: "C",
  },
  {
    id: "staymod",
    name: "StayMod",
    description:
      "Modular stay-management for boutique hospitality. Built the full stack from spec to scale.",
    url: "https://staymod.in",
    role: "Co-founder, Tech",
    year: "2022 — present",
    color: "#2a4858",
    glyph: "S",
  },
  {
    id: "eatmod",
    name: "EatMod",
    description:
      "Smart kitchen operations and menu intelligence — built as the consumer-facing sister product.",
    url: "https://eatmod.in",
    role: "Co-founder, Tech",
    year: "2023 — present",
    color: "#5d6e1e",
    glyph: "E",
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: "Email",
    url: "mailto:hi@adhikansh.com",
    handle: "hi@adhikansh.com",
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/in/adhikansh-mittal",
    handle: "in/adhikansh-mittal",
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
    platform: "StayMod",
    url: "https://staymod.in",
    handle: "staymod.in",
  },
];

export const ESSAYS: Essay[] = [
  {
    title: "Shipping AI products from zero",
    subtitle: "What 0→1 actually feels like when the model is the product.",
    date: "2025.04",
    slug: "shipping-ai-products-from-zero",
    readTime: "8 MIN",
  },
  {
    title: "Hiring engineer #1, honestly",
    subtitle: "On signal, taste, and not pretending you have a culture yet.",
    date: "2024.11",
    slug: "hiring-engineer-1-honestly",
    readTime: "5 MIN",
  },
  {
    title: "The right amount of infrastructure",
    subtitle: "How much platform should a five-person company own?",
    date: "2024.07",
    slug: "right-amount-of-infrastructure",
    readTime: "6 MIN",
  },
  {
    title: "Saying no to the demo",
    subtitle: "Letting prospects feel the rough edges so they trust the polish.",
    date: "2024.02",
    slug: "saying-no-to-demo",
    readTime: "4 MIN",
  },
];

export const TICKER_ITEMS = [
  "Sharp",
  "Honest",
  "Technical",
  "0 → 1",
  "Shipping",
  "Founder mode",
  "AI products",
];

export const TERMINAL_TAGLINE =
  "BOLD · CONFIDENT · SHIPPING";
