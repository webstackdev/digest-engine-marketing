# Backend Conventions

Use this page when you are changing Django-side product behavior and need the guardrails that keep the backend consistent. The most important themes are project scoping, thin API handlers, correct placement of operational logic, and keeping background jobs and ingestion workflows explicit.

Digest Engine is in the middle of a migration away from DRF and Celery. For new backend work, default to **Ninja** for API surfaces and **Taskiq** for background job execution. You may still encounter older DRF or Celery-shaped code paths while working in the repo, but those should be treated as legacy surfaces unless there is a concrete reason to extend them.

## Project Scoping Is a Hard Invariant

This is a multi-project system, and accidental cross-project data access is one of the highest-severity backend failures.

Treat project scoping as a design constraint, not a cleanup step.

In practice, that means:

- project-aware endpoints should stay nested under a project-specific route shape such as `/api/v1/projects/{project_id}/...`
- query logic must be scoped before data is returned, mutated, or linked to another record
- related-object writes must verify that the referenced object belongs to the same project when that relationship is supposed to be project-local
- frontend filtering is never an acceptable substitute for backend scoping

If you are adding a feature and cannot explain how project boundaries are enforced, the design is not ready.

## Prefer Ninja-First API Work

For current backend API work, think in terms of Ninja routers, request and response schemas, and focused handler functions.

Good backend API conventions include:

- keep handlers thin and move business logic into helpers, services, tasks, or workflow-owned modules
- validate request shape explicitly rather than relying on implicit ORM behavior
- make project context explicit in routing and handler logic
- keep response shapes stable and intentional so frontend types can track them cleanly

If you touch a legacy DRF surface during migration, the goal should usually be one of two things:

1. make the smallest safe change needed to support the feature
2. move the behavior toward the Ninja-style shape rather than deepening the legacy pattern

## Keep Request Handling Thin

Backend request handlers should coordinate work, not contain the whole feature.

As a rule of thumb, handlers should be responsible for:

- authentication and permission entry points
- route and project lookup
- request validation and schema translation
- calling the right domain helper, workflow, or job trigger
- returning the correct response shape

They should not quietly accumulate parsing rules, workflow orchestration, third-party calls, or cross-step operational branching.

When a handler starts deciding too much, move the deeper logic into a backend module that is owned by the feature.

## Put Logic in the Owning App, Not in `core/`

Do not expand `core/` just because it is already central.

Use the owning app whenever possible:

- trend clustering or trend-specific behavior belongs in `trends/`
- newsletter intake behavior belongs with the newsletter or intake workflow that owns it
- ingestion-source behavior belongs in the ingestion and plugin surface that fetches it
- entity-specific ranking or review behavior belongs with the entity domain

Treat `core/` as the home for true cross-cutting plumbing such as shared auth, abstract foundations, or reusable system-wide helpers.

If a change is only needed because one feature exists, that change probably belongs outside `core/`.

## Keep Operational Logic Out of the API Layer

Operational work should live in the workflow layer that actually owns it.

Depending on the feature, that usually means:

- Taskiq jobs for background execution
- pipeline modules for multi-step AI or enrichment flow
- ingestion plugins for source-specific fetch behavior
- focused helpers for reusable domain logic

This keeps the backend easier to test and prevents request handlers from becoming the only place where a feature can run.

## Taskiq Job Conventions

Background jobs should be designed as explicit, serializable execution units.

Follow these conventions:

- pass IDs and simple primitives into jobs rather than ORM instances or large serialized objects
- load fresh database state inside the job when the work begins
- keep retry and failure handling explicit rather than hidden in request-time behavior
- make job boundaries match real workflow steps rather than bundling unrelated work together

If a workflow is long-running, failure-prone, or depends on external services, it almost certainly belongs in a Taskiq-driven path rather than inside a synchronous request.

## Ingestion Plugin Conventions

Source-specific ingestion code should stay behind a consistent plugin interface.

That means each source implementation should:

- expose the standardized fetch behavior expected by the ingestion framework
- keep source-specific parsing rules local to that plugin
- normalize outputs into the common ingestion path instead of inventing one-off side channels
- avoid mixing unrelated downstream AI or ranking concerns into fetch logic

The plugin should answer "how do we get usable items from this source?" It should not own the entire downstream editorial workflow.

## Schema and Contract Discipline

Backend contracts must stay deliberate because the frontend depends on them directly.

When changing an API shape:

- update the backend schema definitions with the change
- keep naming consistent with the existing backend contract style
- avoid ad hoc shape drift across similar endpoints
- make sure the frontend-facing types can move with the change cleanly

During migration, this matters even more: if legacy and migrated endpoints expose inconsistent shapes for the same concept, frontend code becomes harder to reason about quickly.

## Prefer Workflow-Oriented Thinking for AI Features

When a feature touches ingestion, scoring, summarization, classification, embeddings, or review queues, do not treat it as a single function change.

Instead, ask:

- what state changes in Postgres?
- what vector or retrieval state changes elsewhere?
- what background execution path owns the work?
- what happens when one stage fails or produces low-confidence results?

These features usually cross storage, job, and workflow boundaries. Design them that way from the start.

## Validation Discipline for Backend Changes

Use the smallest focused validation that can falsify your change.

Typical examples include:

- a narrow backend test for the touched behavior
- a targeted check for the affected Django slice
- a focused schema or type validation when the contract changes

Avoid broad "run everything" validation when the slice is local, but do not skip executable validation if a narrow check exists.

## Docstrings and Module Clarity

Python backend code should follow the repo's Google-style docstring conventions with PEP 257 discipline.

In practice:

- add module docstrings where they help contributors understand the file's role
- document public classes, public functions, and non-obvious helpers
- skip noisy boilerplate on trivial one-liners
- prefer concise explanations of intent over restating the code literally

The goal is to make workflow ownership and boundaries easier to understand when somebody lands in the file later.

## What to Read Next

After these backend rules are clear, the next most useful pages are:

- [**System Architecture**](architecture.md): Use this when you need the full request, ingestion, and background-work map.
- [**Testing & QA**](testing.md): Use this to choose the right focused validation path for backend changes.
- [**Contributing Guidelines**](contributing.md): Read this before opening a review or changing repo-level behavior.
- [**Pipeline**](../reference/pipeline.md): Use this when backend work touches multi-step AI workflow orchestration.

If your backend change preserves project boundaries, keeps handlers thin, places logic with the owning workflow, and treats Ninja and Taskiq as the default direction, it is probably aligned with the codebase.
