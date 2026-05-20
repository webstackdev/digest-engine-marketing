# Local Development

Use this page for the local workflow in **this repository**.

This repo is the standalone Digest Engine marketing and documentation site. It is not the full application runtime repo, so the local development loop here is much simpler than the product app's backend, worker, and deployment workflow.

If you need Django, Ninja, Taskiq, ingestion, or production-runtime setup, use the application repo's local-development guidance instead. For this repo, the source of truth is the pnpm-based Next.js workflow described below.

## What You Are Running Here

This workspace contains:

- the public marketing site
- pricing and signup pages
- the docs and blog experience
- shared frontend utilities for attribution, consent, analytics, and theme behavior

This workspace does **not** contain the full deployable application stack, background workers, or backend service topology.

## Requirements

Use the versions documented in the repository README:

- Node.js `24.8` or newer
- pnpm `11.1` or newer

## First-Time Setup

Install dependencies from the repository root:

```bash
pnpm install
```

That is the only required bootstrap step for this repo.

## Daily Development Loop

For normal frontend and docs work, start the Next.js development server from the repository root:

```bash
pnpm run dev
```

Use that loop when you are:

- editing marketing pages
- working on docs or blog route behavior
- adjusting MDX rendering or metadata behavior
- changing shared UI components
- checking styling changes in the browser

## Core Validation Commands

The main local commands in this repo are:

- `pnpm run dev`
- `pnpm run build`
- `pnpm run start`
- `pnpm run typecheck`
- `pnpm run lint`
- `pnpm run test`
- `pnpm run format:check`

Prefer the narrowest command that proves your change is correct before running the full set.

## Focused Validation

For most day-to-day work, use targeted checks instead of always running the entire suite.

Examples:

- run a single Vitest file with `pnpm run test -- <path>`
- run `pnpm run typecheck` after changing shared types, route code, or component props
- run `pnpm run lint` when changing JSX, TypeScript, or CSS classes across a wider slice
- run `pnpm run build` when changing route behavior, MDX loading, or metadata paths that must survive production compilation

This repo already has colocated tests for routes, components, and shared helpers, so use the nearest affected test first.

## Typical Local Workflows

### Editing Marketing Pages Or Components

Use this path when changing landing pages, shared layout, pricing content, or section components:

1. Start with `pnpm run dev`.
2. Make the UI change in `src/app/` or `src/components/`.
3. Run the closest component or route test if one exists.
4. Finish with `pnpm run typecheck` or `pnpm run lint` when the change touches shared code.

### Editing Docs Or Blog Behavior

Use this path when changing MDX content, metadata flow, markdown rendering, or docs navigation:

1. Start with `pnpm run dev`.
2. Update the relevant files in `src/content/`, `src/app/docs/`, `src/app/blog/`, or the shared MDX rendering surface.
3. Run the narrowest relevant test, such as a route or sidebar test.
4. Run `pnpm run build` if the change affects static generation, metadata, or content loading behavior.

### Editing Shared Helpers

Use this path when changing attribution, consent, theme, props, or utility helpers in `src/lib/`:

1. Update the helper and its colocated test.
2. Run `pnpm run test -- <path>` for the affected helper.
3. Run `pnpm run typecheck` if the helper is imported broadly.

## Build Verification

Use a production build when you need to confirm that the site still compiles with static content and route generation:

```bash
pnpm run build
```

That is especially important after changes to:

- docs or blog route wiring
- metadata generation
- MDX content loading
- global layout behavior
- sitemap-relevant pages

The build also runs the sitemap generation step through the existing `postbuild` script.

## What Not To Expect In This Repo

Do not expect this repo's local workflow to include:

- Docker Compose for the full application stack
- Python environment bootstrapping
- `just` commands for backend validation
- local Postgres, Redis, Qdrant, or worker orchestration
- application seeding flows

Those belong to the separate application repo, not this marketing/docs repository.

## When To Switch To The App Repo

Move to the application repo when the work depends on:

- backend APIs
- Ninja handlers or schema changes
- Taskiq jobs or ingestion flows
- runtime auth, database, or queue behavior
- deployment and production rollout validation

This repo can document those systems, but it does not run them locally.

## A Practical Checklist

Before considering a local change ready for review, make sure you have:

1. Used the repo-root pnpm workflow rather than stale app-repo commands.
2. Run the narrowest relevant test or validation command for the changed slice.
3. Used `pnpm run build` when route generation or MDX behavior changed.
4. Confirmed the docs in this repo still match the frontend that actually ships here.

## What To Read Next

- [**Frontend Conventions**](frontend-conventions.md): Use this when deciding where frontend code should live.
- [**Testing & QA**](testing.md): Use this when choosing the right validation scope for a change.
- [**Deployment & CI/CD**](deployment.md): Use this when a change affects what ships from this repo versus the separate application repo.

If you keep local development guidance grounded in the actual standalone Next.js workflow here, contributors do not waste time looking for backend or Docker surfaces that this repo does not own.
