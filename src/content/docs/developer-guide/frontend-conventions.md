# Frontend Conventions

Use this page when working on the Next.js marketing site, documentation experience, shared UI components, or the frontend utilities that support attribution, consent, theming, and page composition.

The key rule is simple: document and follow the frontend that actually exists in this repository. This repo does **not** use a `frontend/src/` subtree. The real implementation lives directly under `src/`.

## Frontend Shape In This Repo

The main frontend surfaces are:

- `src/app/`: App Router pages, layouts, error boundaries, and route-specific UI
- `src/components/`: reusable marketing and docs UI such as `Header`, `Footer`, `HomePage/*`, `Pricing`, and consent-related components
- `src/content/`: MDX-backed docs and blog content
- `src/lib/`: shared props, types, theme helpers, attribution helpers, conversion helpers, and utility functions
- `src/styles/`: global CSS, theme tokens, typography, markdown, print, and related styling layers
- `src/assets/`: static images and other imported frontend assets

If a proposed convention assumes folders that do not exist here, do not copy it over from another repo. Start from this structure instead.

## App Router Conventions

`src/app/` owns route-level composition.

Use it for:

- top-level pages such as the home page, pricing, tour, signup, compliance, privacy, and terms routes
- docs and blog route handling under `src/app/docs/` and `src/app/blog/`
- layout-level concerns such as the root layout, not-found page, and global error handling

Keep route files focused on page assembly. When a page needs substantial presentational structure, move that structure into `src/components/` and keep the route thin.

## Component Placement

`src/components/` is organized by feature or responsibility rather than by a generic design-system taxonomy.

Examples already present in this repo include:

- route-wide structural pieces such as `Header` and `Footer`
- cross-cutting support components such as `Consent`, `Clarity`, and `GoogleTagManagerWithConsent`
- page families such as `HomePage/` and `Pricing/`
- small shared primitives or helpers in `shared/` and `Section/`

Follow the existing local pattern before introducing a new folder shape.

In practical terms:

- keep shared page sections with the page family they belong to
- keep one-off route composition out of global shared folders unless the component is actually reused
- prefer extending an existing feature folder over inventing a new abstraction layer too early

## Folder-Carried Component Names

This repo already uses the pattern where the folder carries the component name and the implementation sits in `index.tsx`.

Examples include folders such as `src/components/Header/`, `src/components/Footer/`, and `src/components/AttributionCapture/`.

When a component already follows that pattern, keep using:

- `index.tsx`
- `index.test.tsx`

Do not add barrel re-export files just to bounce exports through another `index.ts` unless there is a real architectural reason.

## Content-Driven Frontend Work

This repo is partly a content system, not just a collection of React pages.

That means frontend changes often span both rendering code and MDX content:

- docs content lives in `src/content/docs/`
- blog content lives in `src/content/blog/`
- route rendering lives in `src/app/docs/` and `src/app/blog/`

When changing docs or blog presentation, check both the content source and the rendering surface. Styling or metadata work may involve App Router code, MDX component overrides, and the underlying content files together.

## Shared Frontend Data And Props

This repo's `src/lib/` directory is mostly about frontend-facing data shapes and helpers, not a generic API client layer.

Use it for things such as:

- shared prop data in `src/lib/props.tsx`
- reusable TypeScript interfaces in `src/lib/types.ts`
- attribution and conversion helpers
- theme initialization and utility helpers

If a helper is specific to one component family, keep it close to that family instead of pushing everything into `src/lib/`.

## Client Versus Server Boundaries

Be deliberate about `"use client"`.

Use a client component when the code genuinely depends on:

- browser APIs
- interaction state
- effects
- event-driven behavior such as menu toggles, consent handling, or analytics integration

Do not mark a component as client-only unless it actually needs client behavior. Keep static and content-driven rendering server-friendly by default.

## Styling Conventions

The frontend styling model here combines global CSS layers with utility-class composition.

Important styling anchors include:

- `src/styles/globals.css`
- `src/styles/theme.css`
- `src/styles/typography.css`
- `src/styles/markdown.css`
- `src/styles/themes/`

When changing appearance:

- prefer the existing token and theme vocabulary over ad hoc one-off values
- keep docs and marketing styling aligned with the site's current visual language
- change MDX presentation through the established markdown rendering surface when the behavior is content-wide

## Testing Expectations

Frontend tests are colocated and use Vitest.

Current examples in this repo include:

- route tests beside route files in `src/app/`
- component tests beside component implementations in `src/components/`
- utility tests beside helpers in `src/lib/`

When you change a route, component, or shared helper, update or add the closest relevant test in the same slice of the tree.

For focused validation, the core commands in this repo are:

- `pnpm run test -- <path>`
- `pnpm run typecheck`
- `pnpm run lint`

Choose the smallest check that can prove the change works before widening scope.

## What Not To Import From Other Repo Patterns

Avoid writing docs or code as though this repository had:

- a `frontend/src/` root
- a default `elements/layout/ui/providers` component taxonomy
- a shared backend API client contract that does not exist here

Those patterns may make sense elsewhere. They are not the source of truth for this codebase.

## A Practical Frontend Checklist

Before sending a frontend change for review, check that you have done the following:

1. Put the code in the real owning area under `src/`.
2. Kept route files focused and moved reusable UI into `src/components/`.
3. Updated MDX content or rendering code together when the docs or blog experience changed.
4. Reused existing style tokens, shared helpers, and folder conventions.
5. Added or updated the closest colocated Vitest coverage.
6. Run the narrowest relevant validation command for the changed slice.

## What To Read Next

- [**Testing & QA**](testing.md): Use this when deciding how much validation a frontend change needs.
- [**Contributing Guidelines**](contributing.md): Use this when a frontend change also affects docs, branch hygiene, or review expectations.
- [**System Architecture**](architecture.md): Use this when the frontend change affects the boundary between the marketing/docs site and the broader product experience.

If you keep frontend guidance anchored to the real `src/` structure in this repo, most placement and naming decisions become straightforward.
