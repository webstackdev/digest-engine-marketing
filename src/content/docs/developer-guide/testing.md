# Testing & QA

Use this page for the test and validation workflow in **this repository**.

This repo is the standalone marketing and documentation site, so the testing surface here is frontend- and content-oriented. It does not include the application repo's backend pytest layout, `just`-driven split targets, or service-level integration environment.

## What This Repo Uses

The test runner here is **Vitest**.

The current configuration includes test files matching:

- `src/**/*.{test,spec}.{ts,tsx}`

That means the default testing surface in this repo is:

- App Router route tests under `src/app/`
- component tests under `src/components/`
- utility and helper tests under `src/lib/`

## Test Placement

Tests are colocated with the files they cover.

Examples already present in this repo include:

- `src/app/global-error.test.tsx`
- `src/app/not-found.test.tsx`
- `src/components/Header/index.test.tsx`
- `src/components/ThemeToggle/index.test.tsx`
- `src/lib/utils.test.ts`

Do not move frontend tests into a separate top-level test tree when the implementation already lives under `src/`.

## What Good Test Placement Looks Like

Use the nearest existing pattern:

- route tests beside route files
- component tests beside component implementations
- helper tests beside shared utilities

When a folder already uses the folder-carried naming pattern, keep the colocated test in the same folder, such as `index.tsx` with `index.test.tsx`.

## DOM Versus Non-DOM Tests

Not every test in this repo needs a browser-like environment.

Use a plain Vitest test when the code is just data shaping, props, or utility behavior.

Use `jsdom` when the test depends on:

- DOM APIs
- browser state
- user interaction
- rendered client components

In this repo, `jsdom` is commonly enabled per file with:

```ts
// @vitest-environment jsdom
```

That keeps DOM-heavy behavior explicit instead of forcing the whole suite into a browser-like environment.

## Testing Library Usage

Many UI tests here use Testing Library and, when helpful, `@testing-library/jest-dom/vitest`.

The existing patterns include:

- `render`, `screen`, and `cleanup` for component rendering assertions
- `userEvent` for interaction-driven behavior
- direct `expect(...).toBeInTheDocument()` style assertions when jest-dom is loaded
- plain string or DOM assertions when a lighter approach is enough

Match the style already used by the nearest test instead of forcing a single pattern everywhere.

## What To Test

Prioritize tests that prove behavior, not implementation trivia.

For this repo, that usually means:

- route-level rendering and error-path behavior
- navigation and interaction states in shared components
- consent, analytics, attribution, and theme behavior
- docs and blog UI behavior when route rendering changes
- helper logic in `src/lib/` that affects user-visible behavior or tracking

Avoid adding noisy tests that only snapshot markup without proving a real behavior change.

## Validation Strategy

Prefer the smallest check that can falsify your change.

In practice:

1. Run the closest affected test file first.
2. Run `pnpm run typecheck` if the change touches shared types, props, or route code.
3. Run `pnpm run lint` if the change spans a broader slice or includes CSS and JSX updates.
4. Run `pnpm run build` if the change affects route generation, MDX loading, metadata, or static rendering behavior.

The key command patterns in this repo are:

- `pnpm run test -- <path>`
- `pnpm run test`
- `pnpm run typecheck`
- `pnpm run lint`
- `pnpm run build`

## When To Run A Focused Test

Use a single-file or narrow-slice test run when:

- you are changing one component or route
- you are debugging a specific regression
- you want the fastest feedback after a local edit

Example:

```bash
pnpm run test -- src/app/docs/[...mdxPath]/_components/DocsPageSidebar/index.test.tsx
```

That should usually be your first validation step after a localized edit.

## When To Widen Validation

Run broader checks when the change affects shared behavior across multiple routes or content surfaces.

Examples include:

- changes to MDX rendering
- changes to root layout behavior
- changes to metadata wiring
- shared helper changes imported broadly across the site
- styling changes with potential cross-page impact

In those cases, do not stop at one passing test file if a broader compile, lint, or build check can still catch a real regression.

## Coverage Expectations

This repo does not need tests for every line of markup, but new behavior should come with direct evidence.

At a minimum:

- add or update a colocated test when changing route behavior, component interaction, or shared helper logic
- cover new logic branches when they affect rendering, state transitions, or tracking behavior
- keep tests close enough to the implementation that failures point to the changed slice quickly

If you need help identifying the right missing test surface, the coverage-auditor skill remains a good backstop, but this page should be enough for normal contributor decisions.

## What Not To Document Here

Do not document this repo as though it owned:

- backend pytest suites
- application integration-test orchestration
- `just` targets for backend and frontend split execution
- Storybook conventions that are not present in the tree

Those belong to a different repository or do not exist here.

## A Practical Pre-Review Checklist

Before sending a change for review, make sure you have:

1. Added or updated the nearest colocated test when behavior changed.
2. Used `jsdom` only when the test genuinely needed DOM behavior.
3. Run the narrowest relevant test first.
4. Followed up with typecheck, lint, or build when the scope justified it.
5. Avoided documenting or depending on test workflows that belong to the separate app repo.

## What To Read Next

- [**Local Development**](local-development.md): Use this for the repo-root pnpm workflow that surrounds the test loop.
- [**Frontend Conventions**](frontend-conventions.md): Use this when deciding where new test-covered frontend code should live.
- [**Contributing Guidelines**](contributing.md): Use this when deciding how much validation is enough before review.

If the testing guidance stays anchored to the real Vitest and App Router workflow in this repo, contributors get faster feedback and much less confusion about which repository owns which validation path.
