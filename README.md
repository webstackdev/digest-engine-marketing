# Digest Engine Marketing

![Digest Engine marketing site header](./readme.jpg)

Standalone marketing site for Digest Engine.

This repository contains the public website, pricing pages, signup flow, blog, and product documentation content for Digest Engine. It is built with Next.js App Router, Nextra-powered content routes, Tailwind CSS, and Vitest.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Nextra for blog and docs content
- Vitest and Testing Library
- pnpm 11

## Getting Started

Requirements:

- Node.js 24.8 or newer
- pnpm 11.1 or newer

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm run dev
```

Create a production build:

```bash
pnpm run build
```

The build also generates the sitemap via the `postbuild` script.

## Common Commands

```bash
pnpm run dev
pnpm run build
pnpm run start
pnpm run typecheck
pnpm run lint
pnpm run lint:style
pnpm run test
pnpm run format:check
```

## Project Layout

- `src/app/`: Next.js routes and page entry points
- `src/components/`: reusable UI and page components
- `src/content/`: blog and docs source content
- `src/lib/`: shared helpers, props, and client utilities
- `src/styles/`: global theme and styling layers
- `.github/workflows/`: CI workflows for lint, test, build, branch rules, and CodeQL

## Notes

- This repo is a standalone pnpm project, not a monorepo.
- Root CI workflows install dependencies with pnpm and run from the repository root.
- Content for the public docs and blog is stored in-repo and statically built with the site.
