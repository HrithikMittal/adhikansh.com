# Adhikansh Mittal - Portfolio

A multi-mode portfolio website built with Next.js 15, featuring three distinct viewing experiences.

## Features

### 🎨 Three Modes

1. **HUMAN Mode** - Swiss minimal design with light/dark theme
2. **DEV Mode** - Terminal interface  
3. **AGENT Mode** - AI/LLM-optimized

### 🎯 Key Features

- **Single Source of Truth**: All content lives in `/constants/portfolio.ts`
- **Component-based Architecture**: Reusable, maintainable components
- **Mode Switcher**: Bottom-sticky control with localStorage persistence
- **Responsive Design**: Mobile-first, works on all devices

## Content Management

All content is centralized in `/constants/portfolio.ts`. To update:

1. **Personal Info**: Edit `PERSONAL_INFO` object
2. **Projects**: Add/edit items in `PROJECTS` array
3. **Essays**: Add/edit items in `ESSAYS` array
4. **Social Links**: Add/edit items in `SOCIAL_LINKS` array
5. **About Section**: Edit `ABOUT` object

Changes automatically reflect across all three modes.

## Development

```bash
npm install
npm run dev
npm run build
```

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- next-themes
- Framer Motion
