# Data Model Schema

Use this page when you need the relational shape of Digest Engine at a systems level: which model families exist, which records are project-owned, how workflow state is represented, and where the relational boundary stops.

This page is intentionally more durable than a line-by-line model dump. The runtime implementation lives in the separate application repo, so the goal here is to document the stable schema concepts and ownership rules that other docs, API behavior, and contributor decisions depend on.

## The Main Modeling Idea

Digest Engine is built around one core relational idea:

- almost all meaningful product state belongs to a specific **Project**

That single rule explains most of the system design:

- why APIs are project-scoped
- why cross-project joins and lookups are tightly constrained
- why feedback, entities, content, intake, and workflow state are all treated as project-owned records

If you lose track of project ownership, most data-model bugs follow quickly.

## Model Families

Instead of thinking about the schema as one long flat list, it is more useful to think in terms of model families.

### Identity And Access

This family covers people, invitations, and membership state.

Representative records in this area include:

- the application user record
- project membership records
- invitation or access-grant workflow records

The key boundary is that a user can exist independently of any one project, but most meaningful permissions are evaluated through project membership rather than through global role assumptions.

## Projects And Configuration

This family defines the top-level workspace and the settings that shape its behavior.

Representative records in this area include:

- the `Project` itself
- per-project configuration such as scoring or centroid settings
- source configuration for each enabled ingestion path
- project-scoped credentials or integration state where applicable

The important distinction here is between:

- **project identity**: what the workspace is
- **project configuration**: how that workspace behaves

Those should remain related, but not collapsed into one giant settings record.

## Content And Editorial Feedback

This family holds the canonical editorial corpus and the signals users provide about it.

Representative records in this area include:

- ingested content items
- explicit feedback on those items
- source metadata and relevance-related state attached to content

This is the center of gravity for most product behavior. Many downstream systems depend on content records being stable, project-owned, and safe to relate back to sources, entities, themes, and workflow state.

## Ingestion And Intake State

This family tracks how material enters the system.

Representative records in this area include:

- source configuration instances
- ingestion execution history
- newsletter intake records
- intake allowlist or sender-trust records

The key idea is that ingestion is not just external fetch logic. It has its own persisted operational state, trust boundaries, and audit trail.

## Entities And Authority

This family models the people, organizations, vendors, products, and other named things the system tracks across content.

Representative records in this area include:

- tracked entities
- extracted-but-unresolved entity candidates
- mention records linking entities back to content
- authority snapshots or recalculation history

This family is what lets Digest Engine talk about who matters inside a project, not just what articles were ingested.

## Pipeline And Review Workflow

This family captures enrichment and human-review state around content processing.

Representative records in this area include:

- pipeline or workflow run records
- per-skill result records
- review queue entries

The purpose of this family is to make AI-assisted processing observable and recoverable. It is the difference between "the system did a thing" and "the system can explain which stage ran, what happened, and what still needs review."

## Trends, Themes, And Derived Editorial Assets

This family stores higher-level outputs built from accumulated project content.

Representative records in this area include:

- theme suggestions
- centroid or trend snapshots
- original content idea records

These are not raw input records. They are derived editorial artifacts that sit on top of the content, feedback, and entity layers.

## Project Ownership Invariant

The most important schema rule is that almost every operational record is owned by exactly one project.

In practice, that means:

- content belongs to one project
- entities belong to one project
- intake and ingestion state belong to one project
- review and pipeline state belong to one project
- theme and trend outputs belong to one project

The most common exception is the user identity layer, which can exist outside a single project and then connect into one or more projects through membership records.

This ownership rule should be reflected consistently in:

- database relationships
- API scoping
- validation logic
- query construction

## Cross-Project Safety

Because so much of the schema is project-owned, cross-project linkage is a high-risk area.

The safe default is:

- if two operational records relate to each other, they should belong to the same project unless there is a very explicit exception

That applies especially to relationships crossing:

- content and entities
- content and feedback
- content and review queues
- intake and source configuration
- trends and the content sets they summarize

If a change makes those boundaries blurry, it is probably introducing a bug rather than a new feature.

## Relational State Versus Vector State

Not all important system state lives in the relational model.

The relational database is the source of truth for:

- ownership
- permissions
- workflow state
- content metadata
- audit and review history

Vector search state lives outside that model.

In practice:

- content and project records live in relational storage
- embeddings and similarity-search payloads live in Qdrant
- identifiers and project scoping need to line up across both systems

This means the schema boundary matters: vector search supports the relational model, but it does not replace it.

## Snapshot And Audit Models

Several parts of the system are best understood as snapshot or audit records rather than as mutable source-of-truth rows.

Examples include:

- ingestion run history
- pipeline run history
- skill result records
- authority snapshots
- centroid snapshots

These records are important because they make change over time visible. Without them, the system can tell you only what is true now, not how it got there.

## How To Think About Derived Records

Some records exist because the system observed or received something. Others exist because the system inferred or generated something.

That distinction is useful:

- **source records**: users, projects, source configs, content, memberships, intake records
- **derived records**: skill results, authority snapshots, theme suggestions, original content ideas, centroid snapshots

When debugging or redesigning a feature, ask whether the record you are touching is an input record or a derived one. The lifecycle and safety expectations are often different.

## Query And Indexing Expectations

The exact index set belongs to the runtime repo, but a few design expectations are stable:

- project ownership fields should support fast scoped lookup
- high-volume content and workflow tables should be queryable by project and time
- review, trend, and audit records should support operational filtering without full-table scans
- identifiers shared with vector state should remain stable enough for cross-system lookup

If a schema change makes project-scoped lookup slower or less explicit, it is pushing against a core system assumption.

## Debugging The Schema By Symptom

When a data problem appears, use the symptom to identify the model family first:

- **A user sees the wrong project data**: inspect project ownership and membership boundaries.
- **A content item behaves oddly in ranking or review**: inspect content, feedback, pipeline, and derived records together.
- **Entity views look polluted or inconsistent**: inspect entity, mention, and candidate boundaries.
- **Trend or theme output looks wrong**: inspect the derived editorial assets and the underlying project content set.
- **Inbound intake seems routed incorrectly**: inspect intake, allowlist, source configuration, and project resolution state.

This is usually faster than starting with raw SQL or individual fields in isolation.

## Implementation Boundary

The exact Django model classes, field definitions, constraints, and migrations live in the separate application repo. This page should therefore stay focused on stable schema concepts rather than pretending this docs repo can be the authoritative source for every field and table.

What should stay stable here is:

- the family-level model map
- the project ownership rule
- the distinction between relational and vector state
- the meaning of source versus derived records

## What To Read Next

- [**Glossary of Terms**](glossary.md): Use this for consistent names of the main domain objects.
- [**API Reference**](api.md): Use this to see how project-owned records surface through the HTTP API.
- [**Core Algorithms**](algorithms.md): Use this when the records you are looking at are inputs to scoring, trend, or authority behavior.
- [**System Architecture**](../developer-guide/architecture.md): Use this when you need to understand which runtime path creates or mutates a given family of records.

If you keep the data model in mind as a set of project-owned record families rather than a random list of tables, the rest of the system becomes much easier to reason about.
