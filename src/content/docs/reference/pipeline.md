# Ingestion Pipeline

Use this page when you need the end-to-end processing flow that turns outside material into project-aware editorial signals. This is the reference for how content enters the system, which stages usually run next, where AI-assisted decisions fit, and how failures or review paths are handled.

This page is intentionally written around stable workflow stages, not one specific orchestration library. The runtime implementation lives in the separate application repo, and the system is currently moving toward Taskiq-first background execution. Legacy Celery-shaped or older orchestration surfaces may still exist during migration, but the important thing to preserve here is the processing model.

## What The Pipeline Actually Is

The pipeline is the set of stages that take content from raw intake to editorially useful state.

At a high level, it answers questions such as:

- how did this content get into the project?
- was it relevant or a duplicate?
- what entities, summaries, or classifications were derived from it?
- did any stage fail or require human review?
- what downstream trend or theme signals should this item influence?

This means the pipeline is not just an AI feature. It is the connective tissue between ingestion, ranking, enrichment, and review.

## Entry Points

Pipeline work usually begins only after content has crossed the first ingestion boundary and been normalized into project-owned records.

Typical entry patterns include:

- per-item processing after a new content record is created
- batch or scheduled processing over accumulated project content
- special-case intake flows, such as newsletter-derived content, that still feed the same broader enrichment path

The exact trigger source may vary, but the important distinction is simple:

- some pipeline work happens immediately after one item arrives
- some pipeline work happens later over groups of items

## Core Processing Stages

The exact implementation can evolve, but most content moves through a recognizable set of stages.

### 1. Normalization And Initial Persistence

Raw source material is converted into the application's content model and attached to a project.

This is the stage where source-specific fetch or parsing logic gives way to project-owned editorial state.

### 2. Embedding And Similarity Preparation

Text needed for semantic operations is embedded so the system can compare it against prior project material.

This stage supports downstream relevance, deduplication, and clustering behavior.

For the algorithmic model behind that, see [**Core Algorithms**](algorithms.md).

### 3. Relevance Evaluation

The system decides whether the new content belongs inside the project's topic boundary.

This usually begins with vector-based relevance banding:

- clearly relevant content passes quickly
- clearly irrelevant content can be suppressed quickly
- ambiguous content may trigger an LLM-based tie-break

This is one of the most important control points in the system because bad relevance decisions pollute nearly everything downstream.

### 4. Deduplication

The system checks whether the incoming item is materially the same as content it has already seen.

This prevents repeated or syndicated variants from crowding the project corpus, review surfaces, and derived editorial outputs.

### 5. Enrichment

Once an item is accepted into the useful corpus, the system may enrich it with additional derived data such as:

- classification
- summarization
- entity extraction
- other prompt-driven or rules-driven outputs

Not every enrichment stage has to be mandatory for every item, but the key idea is that accepted content becomes more useful as more structured signals are attached to it.

### 6. Review-Oriented Routing

If a stage cannot decide confidently or fails in a way that matters, the item may be routed into a review-oriented path rather than being treated as fully resolved.

That keeps the system from pretending certainty where none exists.

### 7. Aggregate And Batch Derivations

Some outputs are not best computed per item. They are derived from a collection of recent or relevant project content.

Examples include:

- theme suggestions
- trend and velocity signals
- diversity or concentration insights
- other grouped or time-windowed editorial artifacts

These stages sit on top of the per-item pipeline rather than replacing it.

## Per-Item Versus Batch Work

One of the most useful ways to understand the pipeline is to split it into two modes.

### Per-Item Work

This happens close to ingestion time and usually includes:

- normalization
- embedding
- relevance evaluation
- deduplication
- enrichment such as summaries or extracted entities

### Batch Work

This runs over groups of content and usually includes:

- trend analysis
- theme formation
- broader editorial or authority recalculations
- other time-windowed derived outputs

Per-item stages decide what enters the useful corpus. Batch stages decide what patterns become visible across that corpus.

## Pipeline And Skills

The pipeline and the skills system are related but not identical.

- the **pipeline** is the overall workflow
- a **skill** is one bounded prompt-driven operation that may run inside that workflow

In other words, the pipeline is the route; skills are some of the tools used at specific points along that route.

For the catalog of prompt-driven operations, see [**Skill Capabilities**](skills.md).

## Failure Handling And Degraded Modes

The pipeline should be resilient rather than all-or-nothing.

Useful failure behavior includes:

- recording which stage failed
- falling back to a simpler decision path where safe
- leaving partially useful content in a recoverable state rather than silently dropping it
- routing uncertain or blocked cases into review rather than inventing false confidence

This is especially important for AI-assisted stages. A model timeout, parse failure, or provider issue should not make the entire workflow opaque.

## Review Queue Relationship

The review queue exists because some decisions are high-impact or ambiguous enough that automatic handling alone is not the right answer.

Pipeline stages may send items there when:

- relevance is unclear
- extraction output is not trustworthy enough to auto-promote
- a stage fails and requires human follow-up
- business rules require an explicit editorial judgment

That means the review queue is not an unrelated subsystem. It is a deliberate pipeline escape hatch for cases the system should not finalize automatically.

## Persisted Workflow State

Pipeline behavior is easier to debug when the system persists workflow evidence alongside logs and metrics.

Important persisted records typically include:

- pipeline run history
- skill result records
- review queue entries
- derived snapshots used by trends or authority features

This is what allows contributors and operators to inspect not just the final state of a content item, but the path it took to get there.

## How The Pipeline Connects To Other Systems

The pipeline sits in the middle of several system boundaries.

- it receives input from ingestion and intake
- it depends on embeddings and vector search for some decisions
- it writes derived state back into relational records
- it can trigger review and downstream editorial artifacts
- it influences trends, themes, and entity views seen elsewhere in the product

This is why a change to the pipeline is rarely isolated. It usually affects storage state, AI behavior, review load, and user-visible output together.

## Debugging The Pipeline By Symptom

When the pipeline seems wrong, start with the symptom:

- **Too much bad content is getting through**: inspect relevance and deduplication stages first.
- **Good content is missing**: inspect ingestion entry, relevance banding, and fallback behavior.
- **Summaries or categories are weak**: inspect enrichment stages and the skills they invoke.
- **Themes feel off**: inspect whether the per-item corpus entering batch stages is already polluted or incomplete.
- **The system feels stuck**: inspect persisted run history, review queue growth, and failure points between stages.

This is usually faster than starting from the orchestration technology itself.

## Migration Boundary

The current architectural direction is toward Taskiq for background execution and Ninja for the main HTTP surface.

That affects how pipeline work is triggered and routed, but it does not change the stable conceptual stages described here. Those stages remain the useful reference layer even as the execution plumbing evolves.

For that reason, this page avoids freezing one library name as the definition of the pipeline. The processing model matters more than the current orchestration mechanism.

## What To Read Next

- [**Core Algorithms**](algorithms.md): Use this when you need the decision logic behind relevance, deduplication, trend velocity, or authority-related behavior.
- [**Skill Capabilities**](skills.md): Use this when you need the prompt-driven operations invoked by parts of the pipeline.
- [**Logging & Observability**](logging-and-observability.md): Use this when debugging which stage ran, failed, or routed into review.
- [**System Architecture**](../developer-guide/architecture.md): Use this when you need to map the pipeline back to ingestion, storage, background execution, and frontend boundaries.

If you understand which stage of the pipeline an item is currently in, and which downstream systems depend on that stage, most workflow debugging becomes much more manageable.
