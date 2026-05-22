# Contributing Guidelines

Use this page when you are preparing to make a real change in the repository and want the repo-specific expectations that sit between "I can run the code" and "this is ready for review." It is the workflow guide for contributing responsibly, not the place to learn basic setup commands from scratch.

If you still need install, boot, or first-run instructions, start with the README and the local development guide. Use this page once you are already oriented in the repo and need to know how changes should be shaped, validated, and documented.

## What Good Contributions Look Like Here

Strong contributions in this repo usually have the same qualities:

- they are scoped to the smallest meaningful slice
- they preserve project scoping and existing contract shape unless a deliberate contract change is part of the work
- they put logic in the owning backend or frontend layer rather than stretching shared surfaces unnecessarily
- they use focused validation instead of broad, expensive test runs by default
- they keep docs, instructions, and prompt skills aligned with behavior when a workflow or convention changes

This matters because Digest Engine spans product UI, backend APIs, ingestion, AI workflows, and prompt-driven features. Small inconsistencies compound quickly when changes cross those boundaries without discipline.

## Start From the Right Surface

Before you change code, identify which area actually owns the behavior.

Typical examples:

- use [**System Architecture**](architecture.md) when you need to figure out whether a feature belongs in synchronous request handling, background execution, ingestion, or the AI pipeline
- use [**Backend Conventions**](backend-conventions.md) when the change belongs in Django, Ninja API handlers, Taskiq jobs, ingestion, or project-scoped backend code
- use [**Frontend Conventions**](frontend-conventions.md) when the change belongs in the App Router UI, shared frontend types, or component structure
- use [**Testing & QA**](testing.md) when you need the right validation target for the slice you touched

The fastest way to make a messy change is to start in the wrong layer and keep compensating.

## Keep Changes Narrow and Intentional

Do not turn a localized task into a repo-wide refactor unless the change actually requires it.

Good scoping discipline means:

- fix the root cause of the requested behavior rather than papering over symptoms
- avoid unrelated cleanup in the same change unless it directly blocks the work
- preserve existing APIs, payload shapes, and conventions unless you are intentionally changing them
- prefer iterative edits that can be validated quickly over large speculative rewrites

If a task expands while you work, pause and decide whether the new surface is truly part of the same change or should be handled separately.

## Respect the Current Migration Direction

The backend is moving toward **Ninja** for API work and **Taskiq** for background jobs.

That does not mean every older DRF or Celery-shaped surface disappears immediately, but it does mean new contribution work should follow the migration direction by default.

In practice:

- prefer Ninja-style API work over extending DRF patterns unless you are intentionally touching a legacy surface
- prefer Taskiq-oriented background execution over adding new Celery-shaped patterns
- when you must work inside a legacy area, make the smallest safe change and avoid deepening the old convention unless there is a real constraint

The developer docs and reference docs are being updated with that same assumption, so keep your code changes aligned with it.

## Branch and Commit Hygiene

Branch names should be descriptive and easy to scan. Common prefixes such as `feature/`, `bugfix/`, or `chore/` are fine when they reflect the actual change.

A good branch should make it obvious what problem it is solving. A good commit history should make the progression of the work understandable without burying unrelated experiments in the same branch.

You do not need perfect commit taxonomy, but you do need clear intent.

## Validate the Smallest Relevant Slice

This repo expects executable validation before review, but not every change needs a full-suite run.

Prefer the smallest check that can meaningfully falsify your change:

- a targeted backend or frontend test for the affected slice
- a focused typecheck or lint pass for the touched area
- a narrow command that exercises the changed behavior directly

If you need a broad command, use it for a reason. Otherwise, keep validation scoped so iteration stays fast.

When there is a real repo task that covers the change well, use it. For example, existing lint or typecheck tasks are preferable to ad hoc partial commands when they match the slice you changed.

## Keep Docs in Sync With Behavior

If your change alters how the system behaves, what contributors should do, or where a workflow lives, update the closest relevant doc in the same change.

That especially applies when you change:

- developer workflow expectations
- backend or frontend conventions
- ingestion or AI pipeline behavior
- prompt skill structure or runtime lookup behavior
- deployment or production-facing assumptions

Do not create overlapping documentation when an existing page is already the right home for the change.

## Update Instruction Files When Patterns Change

This repository uses contextual instruction files under `.github/instructions/` to capture stable repo conventions for AI-assisted work.

If your change alters a meaningful development rule or workflow, check whether an instruction file should move with it.

Examples include:

- backend structure or scoping conventions
- frontend component placement rules
- validation expectations
- documentation workflow changes

If a contributor would reasonably be guided by an instruction file and that guidance is now wrong, update it.

## Update Prompt Skills When AI Behavior Changes

Prompt-driven features belong in dedicated `SKILL.md` files under `skills/`, not buried in Python or TypeScript strings.

If you change how an AI feature is instructed or framed:

- update the owning skill file
- keep the skill aligned with the runtime lookup behavior
- avoid scattering prompt logic across multiple unrelated places

For more detail, see the skills reference docs referenced elsewhere in the repo. The important rule here is ownership: prompt behavior should live where contributors expect to find and revise it.

## Preserve Contract and Boundary Discipline

Before marking a change as ready, check that it respects the architectural boundaries documented elsewhere in this guide.

That usually means:

- backend code still enforces project scope correctly
- frontend code still matches backend response shape
- operational logic still lives in the correct workflow layer
- AI workflow changes still account for the broader state they affect

A change can pass tests and still be the wrong shape for the codebase. Boundary discipline is part of review readiness.

## Know When To Expand the Change

Sometimes a contribution does need to span multiple layers. When that happens, do it explicitly rather than by accident.

Examples:

- a backend contract change that also requires frontend type and UI updates
- an ingestion workflow change that also requires skill or pipeline documentation updates
- a repo convention change that also requires instruction-file updates

If a second layer must change for the feature to remain coherent, include it. If not, keep the slice tight.

## A Practical Pre-Review Checklist

Before you consider the work ready for review, confirm that:

1. the change is scoped to the requested behavior
2. the owning layer is the one that was actually edited
3. project scoping and contract shape still make sense
4. the smallest meaningful validation was run
5. docs, instruction files, or skills were updated if the change made them stale
6. the change follows the current Ninja and Taskiq direction where applicable

## What to Read Next

Once the contribution workflow is clear, the next most useful developer pages are:

- [**Backend Conventions**](backend-conventions.md): Use this when the change is in Django, Ninja, Taskiq, ingestion, or project-scoped backend work.
- [**Frontend Conventions**](frontend-conventions.md): Use this when the change is in the App Router UI or shared frontend structures.
- [**Testing & QA**](testing.md): Use this to decide which validation path is appropriate before review.
- [**Deployment & CI/CD**](deployment.md): Read this before making production-impacting changes.

If your change is narrow, validated, migration-aware, and keeps the code, docs, and contributor guidance aligned, it is probably ready for review.
