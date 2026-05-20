# API Reference

Use this page when you need the contract-level shape of the Digest Engine API: how resources are scoped, which surfaces are synchronous versus real-time, which paths are intentionally unscoped, and what assumptions the frontend and integrations should preserve.

This page is intentionally migration-aware. The application runtime is moving toward **Ninja** as the default HTTP API layer, while some legacy **DRF** surfaces may still exist during transition. The authoritative implementation lives in the separate application repo, so this document focuses on stable API concepts and path conventions rather than claiming every exact runtime endpoint from this workspace.

## API Shape At A Glance

Digest Engine exposes a few different external surfaces:

- a project-scoped HTTP API for most product behavior
- selected unscoped inbound endpoints for external systems that cannot know a project ID up front
- real-time or message-delivery paths where interactive features require them

The most important rule across all of them is that project ownership is a core backend invariant, not an optional client-side filtering convention.

## Primary HTTP API Direction

For new work, think of the main HTTP API as **Ninja-first**.

That means:

- request validation should be explicit
- response shapes should be stable and intentional
- project scoping should be enforced by the backend before data is read or mutated
- frontend consumers should preserve backend payload shape instead of inventing alternate conventions

During migration, some existing endpoints may still be served through DRF-era handlers or serializer patterns. That legacy surface should be treated as transitional, not as the long-term API direction.

## Authentication

The runtime supports more than one access mode depending on caller type.

The two most important categories are:

- **session-oriented access** for browser-driven product usage
- **programmatic access** for integrations, automation, or non-browser clients

Which exact mechanism is enabled for a given deployment belongs to the application repo and environment configuration, but the contract-level distinction is stable: browser usage and machine usage do not always enter the system the same way.

## Project-Scoped Path Convention

Most API resources are scoped under a project-specific path shape:

```text
/api/v1/projects/{project_id}/...
```

This path pattern exists for a reason:

- it makes data ownership explicit
- it prevents accidental cross-project access
- it keeps authorization logic aligned with the system's core data model

If a resource belongs to a project, the backend should treat that scoping as part of the contract, not as metadata inferred later.

For the domain model behind that rule, see [**Data Model Schema**](data-model.md).

## Common Resource Families

The exact route list may evolve, but the API generally exposes resource families such as:

- projects and membership
- project content and editorial feedback
- sources and intake configuration
- tracked entities and review-oriented data
- newsletter and intake-related workflow state
- pipeline or review surfaces tied to enrichment and triage

When reading or designing an endpoint, the most important question is usually not "which HTTP verb is this?" but "which project-owned resource family does this belong to, and what backend invariant does it need to preserve?"

## Inbound And Unscoped Endpoints

Not every API path can be project-scoped in the URL itself.

Inbound email and webhook-style entry points are the main exception. External systems often cannot know a Digest Engine `project_id`, so those endpoints may be intentionally unscoped at the path level.

In that case, the backend must recover project context by other trusted means, such as:

- a token
- a sender or allowlist mapping
- a signed callback context
- another verified lookup key

This is an important distinction:

- **project-owned resources** should usually be scoped in the path
- **external inbound surfaces** may need to resolve project context indirectly

The exception does not weaken the project-scoping rule. It only changes how the backend discovers the owning project.

## Real-Time And Messaging Surfaces

Some features may expose real-time or socket-driven behavior rather than plain request and response APIs.

Where that exists, the important architectural point is that those surfaces are separate from the normal HTTP request cycle and typically follow the ASGI path described in [**System Architecture**](../developer-guide/architecture.md).

Use real-time paths only where the product genuinely needs them. Most workflow operations should stay on the simpler HTTP path unless there is a clear interaction reason to do otherwise.

## Payload Shape Discipline

Backend contract shape should remain consistent across the system.

In practice:

- do not casually rename fields between backend and frontend
- preserve stable response semantics when possible
- make project ownership and related foreign-key constraints explicit
- treat schema changes as cross-boundary changes that may require frontend, docs, and runtime updates together

The frontend and docs code in this repo should describe and consume the contract that the backend actually serves, not an aspirational or transformed version of it.

## Filtering, Pagination, And Query Semantics

Individual endpoints may differ in details, but a few general expectations should hold:

- collection endpoints should paginate rather than return unbounded project data
- filters should narrow results in a way that respects project scoping and explicit field meaning
- query semantics should be predictable enough that the frontend can consume them without custom guesswork

If an endpoint scales with content volume, entities, or review queues, pagination behavior is part of the contract, not an implementation afterthought.

## Feedback And Mutating Endpoints

Mutation paths deserve extra care because they often do more than update a single field.

Examples include endpoints that:

- record editorial feedback
- change source configuration
- accept or reject entity candidates
- adjust project membership or permissions
- trigger review or workflow transitions

These endpoints often have downstream consequences for ranking, ingestion behavior, or future project state. Treat them as workflow boundaries, not just CRUD handlers.

## Schema And Discoverability

The runtime should expose an OpenAPI-style schema and related API discovery surface, but the exact tooling and route paths belong to the application repo.

This page intentionally avoids freezing generator-specific details from a legacy DRF-only stack. The stable expectation is simpler:

- the API should be schema-documented
- the schema should reflect the currently supported HTTP surface
- migration from DRF-era tooling to newer patterns should not break contract discoverability

If you need the exact schema URL or the current docs UI path, check the application repo or the live deployment configuration rather than assuming a historical default from this docs repo.

## Debugging API Questions By Category

When an API issue comes up, start by identifying which category it belongs to:

- **Wrong data returned**: check project scoping, filtering, and membership boundaries.
- **Wrong shape returned**: check schema drift, serializer or response-model changes, and frontend contract assumptions.
- **Inbound event failed**: check unscoped inbound routing, token or sender resolution, and allowlist logic.
- **Real-time behavior failed**: check whether the issue belongs to the ASGI and messaging path rather than the HTTP path.
- **Mutation caused unexpected downstream changes**: inspect workflow effects such as scoring, feedback, intake, or review-queue behavior.

This categorization usually gets you to the right owning surface faster than starting with a route table alone.

## Implementation Boundary

The exact API router definitions, schema generation, authentication plumbing, and runtime transport details live in the separate application repo.

This reference page should therefore stay focused on:

- stable path conventions
- project-scoping rules
- inbound exceptions
- contract discipline
- migration-aware API expectations

If this page drifts into line-by-line route inventory that cannot be verified here, it will become stale quickly.

## What To Read Next

- [**Data Model Schema**](data-model.md): Use this to understand which resources are project-owned and why path scoping matters.
- [**Ingestion Pipeline**](pipeline.md): Use this when an endpoint hands work off into ingestion or enrichment flows.
- [**System Tunables & Configuration**](tunables.md): Use this when API behavior depends on environment-driven runtime settings.
- [**System Architecture**](../developer-guide/architecture.md): Use this when you need to distinguish the standard HTTP path from the real-time and background-processing paths.

If you keep the API reference centered on project scoping, contract shape, and runtime-surface boundaries, it stays useful even while the underlying implementation continues its migration from older DRF patterns to a Ninja-first design.
