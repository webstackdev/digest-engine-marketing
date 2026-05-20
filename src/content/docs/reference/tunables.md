# System Tunables & Configuration

Use this page when you need the knobs that change how Digest Engine behaves without changing code: model selection, relevance thresholds, project-level scoring behavior, URL configuration, retention windows, and integration toggles.

This page is intentionally focused on durable configuration concepts and the currently documented setting names, not one specific deployment style. The exact settings loader, environment injection method, and runtime file layout live in the separate application repo, so this document should stay useful even as the implementation moves forward.

## Two Kinds Of Tunables

Digest Engine has two broad configuration layers.

### Global Runtime Settings

These are deployment-level controls that shape behavior across the whole system.

Examples include:

- model provider settings
- base URLs
- messaging or channel configuration
- observability retention windows
- external integration credentials

These are usually environment-driven rather than changed one project at a time.

### Project-Scoped Settings

These are per-project controls that let one project behave differently from another.

Examples include:

- authority decay behavior
- whether topic-centroid recomputation happens immediately after feedback
- other project-specific editorial or ranking behavior

These belong to the project configuration model rather than to global deployment configuration.

## What Good Tunables Look Like

Useful tunables have a few properties:

- they control meaningful behavior, not arbitrary implementation noise
- they are stable enough to document clearly
- they have a predictable scope: global or project-specific
- they are observable enough that operators can tell whether changing them helped or hurt

If a setting cannot be explained in terms of user-visible behavior, operational cost, or system safety, it may not be a good candidate for long-term documentation.

## Model And Embedding Settings

These settings control the system's global inference and semantic-retrieval behavior.

Currently documented examples include:

- `EMBEDDING_PROVIDER`
- `EMBEDDING_MODEL`
- `OLLAMA_URL`
- `OPENROUTER_API_KEY`
- `OPENROUTER_API_BASE`

These settings matter because they affect:

- which embedding system is used
- where inference requests are routed
- how model-backed skills and semantic operations behave across the whole deployment

For the algorithmic impact of these choices, see [**Core Algorithms**](algorithms.md).

## Relevance Thresholds

One of the most important tuning surfaces is the relevance banding model.

Digest Engine uses threshold bands to separate:

- clearly relevant content
- clearly irrelevant content
- ambiguous content that may need an LLM tie-break

The currently documented thresholds are:

- high-confidence relevant at or above `0.85`
- clear non-match below `0.50`
- ambiguous handling in the band between them

These thresholds matter because they directly influence corpus quality, downstream workload, and how much inference budget is spent on borderline content.

## Deduplication Thresholds

Deduplication also depends on tunable similarity behavior.

The currently documented rule of thumb is that very small nearest-neighbor distance can be treated as near-duplicate behavior, for example a threshold like `< 0.05`.

This is an especially sensitive area because changing duplicate sensitivity affects:

- how noisy the content corpus becomes
- whether syndicated or rewritten variants accumulate
- how trustworthy theme and trend outputs feel later

## Project-Level Scoring Controls

Some of the most important tunables live at the project level because editorial intent differs across projects.

### Authority Decay

The currently documented project-level setting here is:

- `authority_decay_rate` with a documented default of `0.95`

This controls how quickly old authority fades without reinforcing new mentions.

### Topic Centroid Recompute Behavior

The currently documented project-level setting here is:

- `recompute_topic_centroid_on_feedback_save` with a documented default of `True`

This controls whether explicit feedback immediately shifts the project's semantic center.

These settings matter because they shape how fast a project adapts to editorial behavior over time.

## URL And Routing Settings

Base URL settings determine how different system surfaces refer to each other and how external users or providers reach the product.

Currently documented examples include:

- `NEWSLETTER_API_INTERNAL_URL`
- `NEWSLETTER_PUBLIC_URL`
- `NEWSLETTER_API_BASE_URL`
- `FRONTEND_BASE_URL`

The exact deployment topology may vary, but the conceptual distinction stays stable:

- some URLs are meant for internal service-to-service traffic
- some URLs are meant for public-facing links, callbacks, or browser access

For the API-side meaning of those boundaries, see [**API Reference**](api.md).

## Observability Retention Settings

Observability settings matter because retained workflow and audit history can grow quickly if left unmanaged.

Currently documented retention-related settings include:

- `OBSERVABILITY_SNAPSHOT_RETENTION_DAYS`
- `OBSERVABILITY_TREND_TASK_RUN_RETENTION_DAYS`
- `OBSERVABILITY_REVIEW_QUEUE_RETENTION_DAYS`

These settings define how long internal operational history is kept before pruning.

For the operational reasoning behind those knobs, see [**Logging & Observability**](logging-and-observability.md).

## External Integration Toggles And Credentials

Some capabilities exist only when the relevant provider configuration is present.

Currently documented examples include:

- `LINKEDIN_CLIENT_ID`
- `LINKEDIN_CLIENT_SECRET`
- `LINKEDIN_OAUTH_SCOPES`
- `REDDIT_CLIENT_ID`
- `REDDIT_CLIENT_SECRET`
- `REDDIT_USER_AGENT`

These are less like editorial tuning knobs and more like capability gates. If the credentials are not present, the associated integration surface should not be assumed to exist.

## Messaging And Real-Time Settings

Some settings support message propagation or real-time features rather than core HTTP request handling.

Currently documented examples include:

- `CHANNEL_LAYER_URL`
- `MESSAGING_ENABLED`

These settings matter when the deployment includes real-time or channel-based behavior. They are not central to every workflow, but they are important when interactive messaging or socket-driven features are in use.

## How To Think About A Configuration Change

Before changing a tunable, ask a few questions:

1. Is this a global runtime setting or a project-specific one?
2. What user-visible or operator-visible behavior should change?
3. Which page explains the affected behavior: algorithms, API, pipeline, or observability?
4. How will you tell whether the change improved the system?
5. Could the change increase review load, corpus noise, or operational cost?

This keeps tuning from becoming guesswork.

## Migration Boundary

The runtime is moving toward Ninja for the primary API surface and Taskiq for background execution, but that does not invalidate the tunable categories documented here.

What may change during migration is:

- where settings are loaded in code
- which runtime components consume them first
- how some execution paths are wired internally

What should remain stable in this document is:

- the meaning of the setting categories
- the difference between global and project-scoped controls
- the documented setting names that other reference pages rely on

## Implementation Boundary

The exact settings module layout, default-value implementation, environment loader, and validation behavior live in the separate application repo.

This page should therefore stay focused on:

- what kinds of behavior are tunable
- which setting names are currently documented and important
- whether a setting is global or project-scoped
- why an operator or contributor would change it

If this page drifts into deployment-specific startup mechanics or hardcoded infrastructure assumptions, it will become stale faster than the rest of the reference guide.

## What To Read Next

- [**Core Algorithms**](algorithms.md): Use this when a tunable affects relevance, deduplication, authority, centroid drift, or trends.
- [**API Reference**](api.md): Use this when URL or routing settings change how API surfaces are consumed.
- [**Logging & Observability**](logging-and-observability.md): Use this when retention settings or runtime visibility controls are involved.
- [**Ingestion Pipeline**](pipeline.md): Use this when a configuration change affects how content moves through per-item or batch processing.

If you can identify which behavior a setting changes, whether that setting is global or project-specific, and how you will observe the result, most tuning decisions become much safer.
