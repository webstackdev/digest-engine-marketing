# Logging & Observability

Use this page when you need to understand how Digest Engine makes runtime behavior inspectable: what should be logged, how work is correlated across requests and background jobs, which kinds of metrics matter, and how internal audit records are retained over time.

This page is intentionally focused on stable observability concepts rather than tooling-specific implementation details that may change during migration. The application runtime is moving toward Ninja and Taskiq, and some legacy DRF or Celery-era surfaces may still exist, but the core observability goals remain the same.

## Why Observability Matters Here

Digest Engine does a lot of work outside a simple request and response cycle.

That includes:

- project-scoped API requests
- background ingestion and enrichment work
- newsletter intake routing
- AI-assisted pipeline stages
- review and retry flows

Because that work can cross multiple systems and time boundaries, observability is not optional. If logs, metrics, and audit records are weak, the system becomes difficult to debug even when each individual component appears healthy in isolation.

## The Main Observability Surfaces

There are three main layers to think about:

- **structured logs** for event-level detail
- **metrics** for aggregate health and trends
- **persisted audit or workflow records** for system history and recovery

Each layer answers a different question:

- logs explain what happened in one specific execution path
- metrics show whether a class of behavior is getting better or worse over time
- persisted records show where work entered the system, what stages ran, and what state remains actionable

## Structured Logging

Structured logging should be treated as the default, not an optional enhancement.

The important point is not the exact logging library. The important point is that log events should be machine-readable and carry stable context fields that make cross-system debugging possible.

Useful context fields commonly include:

- `project_id` when the event belongs to a specific project
- `content_id` when the event concerns one content item
- run or workflow identifiers when the event belongs to ingestion, pipeline, or review processing
- request or correlation identifiers when the event is part of a larger execution chain

The goal is that one log event should be easy to connect to the surrounding workflow rather than existing as an isolated string message.

## Correlation Across Runtime Paths

Digest Engine work often crosses more than one execution path.

For example:

1. an inbound request or scheduled trigger starts work
2. ingestion creates or updates project-owned records
3. downstream enrichment or AI processing runs in background work
4. review or retry state is recorded later

Observability is much stronger when those stages can be correlated by a shared request, run, or trace identifier.

The exact mechanism can vary by runtime surface, but the principle is stable: if one workflow touches multiple processes or stages, contributors should be able to reconstruct that path without guessing.

## Logging Priorities By Area

Different parts of the system need different kinds of visibility.

### API Surface

For API work, the most useful signals are:

- request success and failure
- authorization and project-scoping failures
- validation failures
- mutation paths that trigger significant downstream work

### Ingestion And Intake

For ingestion and intake, the most useful signals are:

- source selection and project resolution
- fetch or parsing failures
- duplicate suppression outcomes
- downstream handoff into enrichment or review

### AI And Pipeline Work

For AI-assisted processing, the most useful signals are:

- stage entry and exit
- fallback or degraded-mode behavior
- model or provider failures
- review-queue creation when automatic handling is not sufficient

### Real-Time And Messaging Paths

For real-time paths, the most useful signals are:

- connection lifecycle events
- channel or broadcast failures
- coordination failures between web and worker processes

## Metrics

Logs explain individual events. Metrics explain system health at scale.

The exact exported metric set may change with deployment tooling, but the useful categories are stable:

- HTTP request volume, latency, and error rate
- background job throughput, latency, and failure rate
- ingestion success and retry behavior
- AI or skill invocation count, failure rate, and latency
- review queue growth or backlog behavior

Metrics should make it easy to answer questions such as:

- Is the API getting slower?
- Are background jobs backing up?
- Are model calls failing more often?
- Is one part of the workflow producing too many review items?

If a metric cannot support an operational decision, it may be noise rather than signal.

## Dashboards And Operational Views

Dashboards should group metrics by operational question rather than by raw component list.

Useful views often include:

- request latency and error-rate dashboards
- ingestion health and backlog dashboards
- worker throughput and failure dashboards
- AI-stage reliability and cost-trend dashboards
- review-queue volume and aging dashboards

The exact dashboard platform may vary by deployment, but those are the questions operators and contributors usually need answered first.

## Persisted Audit And Workflow Records

Not all observability should live only in logs and metrics.

Digest Engine also relies on persisted records such as:

- ingestion runs
- pipeline runs
- skill results
- review queue entries
- snapshot-style derived records used for debugging or trend inspection

These records matter because they keep system history attached to the domain model. They let you ask not only "did an error happen?" but also "what item, project, or workflow state is now affected?"

## Retention And Pruning

Observability data is useful only if it stays queryable and affordable.

For persisted audit-style records, the runtime applies retention rules so operational history does not grow without bound. The currently documented retention knobs live in [**System Tunables & Configuration**](tunables.md).

The important principle is:

- keep enough history to debug trends and workflow problems
- prune enough history to avoid operational drag and storage bloat

Retention is therefore part of observability design, not just a cleanup afterthought.

## What Good Log Events Look Like

Good log events are:

- structured rather than free-form only
- scoped to the relevant project or workflow when possible
- specific about the stage or action that failed
- careful about not leaking unnecessary sensitive payload data
- useful to both humans reading them directly and systems parsing them automatically

Bad log events usually fail in one of two ways:

- they are too vague to diagnose anything
- they dump too much raw data without enough stable identifiers or meaning

## Observability During Migration

The current runtime direction is toward Ninja for the primary HTTP surface and Taskiq for background execution.

That means observability should be designed so it survives implementation shifts.

In practice:

- do not make the observability model depend on one legacy transport or worker system name
- keep correlation ideas stable even if the exact job runner changes
- preserve audit continuity across old and new execution paths during migration

The point is to keep the system debuggable while the internals evolve, not to make the docs brittle by freezing old implementation details.

## Debugging By Signal Type

When an issue appears, choose the signal type that answers the question fastest:

- **One request or one workflow seems broken**: start with structured logs and correlated run records.
- **Something is degrading over time**: start with metrics and dashboards.
- **You need to understand what state was left behind**: inspect persisted workflow and review records.
- **A migration changed where failures appear**: compare correlation paths across the old and new runtime surfaces.

Using the right observability layer first usually saves more time than searching every signal source at once.

## Implementation Boundary

The exact logger configuration, metric export tooling, scraping setup, tracing hooks, and retention jobs live in the separate application repo and deployment environment.

This page should therefore stay focused on:

- what must be observable
- how work should be correlated
- which operational questions metrics should answer
- why persisted audit records matter

If this page drifts into deployment-specific scraper paths, Helm assumptions, or legacy worker-specific naming, it will go stale quickly.

## What To Read Next

- [**System Tunables & Configuration**](tunables.md): Use this for retention-related knobs and other runtime controls that shape observability behavior.
- [**Ingestion Pipeline**](pipeline.md): Use this when you need to understand which workflow stages should emit logs, metrics, or review records.
- [**API Reference**](api.md): Use this when the observability question starts from a request-path contract or mutation boundary.
- [**System Architecture**](../developer-guide/architecture.md): Use this to map observability signals back to the request, background, or real-time path that owns them.

If logs, metrics, and persisted workflow records all point at the same underlying execution path, Digest Engine becomes much easier to operate and debug.
