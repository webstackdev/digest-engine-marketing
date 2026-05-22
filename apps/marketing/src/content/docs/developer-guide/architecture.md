# System Architecture

Use this page when you need the big-picture map of how Digest Engine is put together: which runtime surfaces handle user requests, how content moves through ingestion and AI processing, where project scoping is enforced, and which storage systems are responsible for which kinds of data.

This is not meant to be a line-by-line infrastructure manual. The goal is to help you answer practical contributor questions such as:

- Where does a given kind of request actually go?
- Which part of the stack owns a behavior: Django, Ninja API handlers, Taskiq jobs, Channels, the pipeline, or the frontend?
- When a feature touches content ingestion or scoring, what other systems does it depend on?
- What should stay synchronous, and what should move into background work?

## Architectural Shape at a Glance

Digest Engine is split across a few major responsibilities:

- a Django backend whose HTTP API surface is moving toward Ninja as the default interface layer
- background workers for ingestion, enrichment, and AI-driven processing
- a Next.js App Router frontend for the interactive product UI
- Postgres for primary relational state
- Redis for queues, broker duties, and real-time coordination
- Qdrant for vector storage and similarity search

The most important architectural boundary is that relational product state and editorial workflow state live in Postgres, while semantic retrieval and similarity operations depend on vector data in Qdrant.

Because the codebase is in transition, you may still encounter legacy DRF and Celery surfaces. The architectural direction, however, is to treat Ninja as the primary API layer and Taskiq as the primary background job system.

## Core Runtime Paths

Most behaviors in the system fall into one of three paths:

1. synchronous HTTP request and response work
2. asynchronous background work triggered by schedules or pipeline events
3. real-time event delivery for interactive UI features

Understanding which path a feature belongs to is usually the first step in finding the right implementation surface.

## Synchronous Request Path

Standard product interactions such as loading content, updating project settings, editing entities, or saving feedback generally follow the normal Django request path.

At a high level, that path looks like this:

1. **Nginx** terminates the public request and forwards it to the appropriate application process.
2. **Gunicorn** serves the Django WSGI app for standard HTTP request handling.
3. **Django and Ninja** handle authentication, routing, validation, and response shaping for the main HTTP API surface.
4. The backend enforces project scoping and ownership rules before reading or mutating application state.
5. State changes are persisted in **PostgreSQL**.
6. The API returns structured data to the frontend or another caller.

During migration, some endpoints may still flow through DRF-era viewsets and serializers. New work should be reasoned about from the Ninja-first direction unless there is a concrete legacy constraint.

For backend feature work, the most important detail is that project scoping is not optional glue added later. It is a core invariant of the system and should shape queryset, validation, and API design from the beginning.

## Real-Time and WebSocket Path

Some interactive features rely on an ASGI path rather than the standard WSGI request cycle.

That path generally looks like this:

1. **Nginx** upgrades the connection when a WebSocket is required.
2. **Daphne** serves the ASGI application.
3. **Django Channels** accepts the socket connection and manages group or channel communication.
4. **Redis** backs the channel layer and coordinates broadcasts between processes.

This path is only necessary for features that truly need real-time delivery. Most product behavior should stay on the simpler request and response path unless there is a clear interaction reason to do otherwise.

## Ingestion Path

Ingestion is the path that moves outside content into the editorial system.

At a high level, the flow is:

1. **Taskiq** scheduling or another trigger starts ingestion work.
2. A **Taskiq worker** looks up active source configuration and dispatches to the matching plugin or intake flow.
3. Raw source material is fetched or received and normalized into application-level records.
4. Novel items are persisted as content records in **Postgres**.
5. Text needed for semantic search is embedded and written to **Qdrant**.
6. The item is handed off to downstream enrichment, classification, and scoring work.

This means ingestion is not just "fetch and save." It is the handoff point between source configuration, deduplication, editorial storage, vector search, and AI-driven processing.

As with the API layer, migration matters here: some existing task entry points may still be Celery-shaped, but the contributor-facing direction should be Taskiq-first.

## Newsletter Intake Path

Newsletter intake is a special case of ingestion with its own trust and confirmation workflow.

Instead of polling a feed, the system receives newsletter content through an inbound email path, validates whether the sender is trusted or eligible for confirmation, extracts useful links and content, and then routes those items into the same broader content workflow used by other ingestion sources.

That makes newsletter intake both an ingestion concern and an application policy concern. Changes here often affect:

- sender trust and allowlist behavior
- content parsing and extraction
- project routing
- downstream enrichment and scoring

If you are changing this area, treat it as a full workflow rather than a simple email parsing utility.

## AI Processing and Pipeline Path

Once content enters the system, additional AI-driven work may enrich, classify, summarize, or score it.

This processing is orchestrated as a pipeline rather than a single monolithic step. In practice, that means:

- different nodes or stages can handle separate responsibilities
- failures can be isolated to a specific stage instead of corrupting the whole flow
- retry, fallback, and review behavior can be handled explicitly

The pipeline is where the system turns raw ingested material into something more editorially useful. Depending on the feature, that can include categorization, summarization, relevance assistance, or routing into review-oriented queues.

For deeper detail on the orchestration model, continue to [**Pipeline**](../reference/pipeline.md).

## Storage Responsibilities

Each storage system has a distinct role.

### PostgreSQL

Postgres is the source of truth for core application state, including users, projects, content records, feedback, configuration, workflow state, and most operational history.

If a feature changes business rules, ownership, permissions, workflow state, or data exposed through the API, Postgres-backed models are usually the center of gravity.

### Redis

Redis supports transient coordination concerns such as Taskiq-related queueing or broker behavior, and channel-layer messaging.

If something depends on task fan-out, background coordination, or live updates between processes, Redis is usually in the path.

### Qdrant

Qdrant stores vectors used for semantic retrieval and similarity operations.

If a feature relies on embeddings, nearest-neighbor search, or content similarity, Qdrant is part of the flow. It complements Postgres rather than replacing it.

## Frontend and Backend Boundary

The frontend is a Next.js App Router application that consumes backend APIs rather than duplicating core business logic.

At a high level:

- Server Components support initial page assembly and route-level loading behavior.
- Client Components handle interactive UI state where needed.
- shared frontend API helpers and types define the contract with the backend
- client-side caching and revalidation are used for responsive data-driven interfaces

From an architecture perspective, the important rule is that the frontend should preserve backend contract shape rather than inventing alternate payload conventions. When data shape changes intentionally, the backend contract, frontend types, and consuming UI should move together.

## Where Contributors Usually Need to Look

When changing a feature, use the architectural path to narrow the code search.

- For project-scoped API behavior, start in Ninja routers, validation layers, and the helpers that enforce scoping, while checking legacy DRF surfaces when the flow has not yet been migrated.
- For ingestion behavior, follow the path from source configuration to plugin or intake flow, then to downstream jobs.
- For pipeline behavior, inspect the orchestration and node-specific logic rather than only the first trigger.
- For real-time behavior, check the Channels and Redis-backed path.
- For UI-only behavior, stay in the frontend unless the issue is really a backend contract problem.

The system gets harder to reason about when these boundaries blur, so a good first question is always: which runtime path really owns the behavior I am changing?

## Common Architectural Boundaries to Respect

The most important boundaries in this codebase are:

- project scoping belongs in core backend patterns, not ad hoc frontend filtering
- operational logic should live in Taskiq jobs, pipeline code, plugins, or focused helpers rather than bloated request handlers
- frontend code should consume backend contracts consistently instead of reshaping them arbitrarily
- AI workflow changes should account for database state, queue behavior, and vector state together

If a change crosses multiple boundaries, treat it as a workflow change, not a single-file edit.

## What to Read Next

Once the system shape is clear, the next most useful developer guide pages are:

- [**Backend Conventions**](backend-conventions.md): Use this to understand where Django, Ninja API work, Taskiq jobs, and project-scoped backend changes should live.
- [**Frontend Conventions**](frontend-conventions.md): Use this when the change is in the App Router UI, shared frontend types, or test structure.
- [**Testing & QA**](testing.md): Use this to choose the right focused validation path for the slice you are changing.
- [**Deployment & CI/CD**](deployment.md): Read this before changing container shape, promotion flow, or production-facing behavior.

If you can identify which request path owns a feature, which storage systems it depends on, and which architectural boundaries it must preserve, you will usually know where to make the change next.
