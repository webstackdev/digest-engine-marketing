# Glossary of Terms

Use this page when you need a precise definition of a Digest Engine term that appears across the product, codebase, or documentation set.

The goal is consistency. These definitions should stay stable enough that developers, advanced users, and operators can use the same words to mean the same things even as the runtime implementation evolves.

## Core Workspace Terms

### Project

The top-level workspace boundary in Digest Engine.

A project owns its own:

- settings and configuration
- members and roles
- sources and intake rules
- content corpus
- entities, trends, and workflow state

`Project` is the correct term throughout this codebase and documentation set.

### Tenant

An outdated or incorrect term for what Digest Engine calls a **Project**.

Do not use `tenant` in user docs, admin docs, contributor docs, or new implementation discussions unless you are explicitly comparing Digest Engine to another system that uses that language.

## Content And Editorial Terms

### Content

The canonical project-owned record for an ingested article, post, link, or extracted newsletter item.

Everything the system ranks, summarizes, clusters, or associates with an entity begins as content.

### User Feedback

An explicit editorial signal on a content item, such as a positive or negative judgment.

Feedback is important because it does more than record preference in the moment. It can also influence future ranking and project-specific topic behavior.

### Theme Suggestion

A proposed editorial theme derived from recent project content and trend behavior.

It is a generated organizational artifact, not a raw input item.

### Original Content Idea

A generated suggestion for something the editorial team could write or cover directly.

This differs from a theme suggestion because it points toward a possible authored angle rather than just grouping outside content.

## Source And Intake Terms

### Source Plugin

The integration type used to bring content into the system.

Examples might include feed-based, social, or newsletter-related ingestion methods. The plugin is the mechanism category, not one specific configured source.

### Source Config

The project-specific configured instance of a source plugin.

If a plugin is the type of connector, the source config is the actual configured source that belongs to one project.

### Intake

The workflow that receives and processes forwarded newsletter or email-based content into Digest Engine.

Intake is both a parsing concern and a trust-boundary concern because the system has to decide whether the sender is allowed to submit material to a project.

### Intake Allowlist

The set of trusted sender identities allowed to inject newsletter content into a project's intake path.

This is a project-protection mechanism, not just an email convenience feature.

## Entity Terms

### Entity

A tracked named thing that matters inside a project's editorial universe.

An entity is often a person, company, vendor, product, organization, or open-source project whose importance can be measured over time.

### Entity Candidate

A possible entity detected during extraction but not yet treated as a fully trusted tracked entity.

Candidates exist so the system can separate uncertain extraction output from the cleaner long-term entity graph.

### Authority

The system's measure of how important or influential an entity appears within the context of a specific project.

Authority is not just raw mention count. It is a project-relative influence signal shaped by mention patterns, timing, and contextual importance.

## AI And Workflow Terms

### Skill

A discrete prompt-driven operation performed by an LLM as part of the broader system workflow.

Examples include classification, relevance tie-breaking, summarization, extraction, or other bounded AI tasks.

Use `discrete`, not `discreet`, for this concept.

### Pipeline Run

A recorded execution of the enrichment or processing workflow for one item or batch of items.

The exact orchestration technology may evolve, but the core idea is stable: a pipeline run captures that the system moved content through multiple processing stages and recorded what happened.

### Ingestion Run

A recorded execution of a content-ingestion workflow.

This usually refers to the act of fetching, receiving, or normalizing source material before or alongside deeper enrichment steps.

### Review Queue

The human-review surface for items that should not be handled entirely automatically.

This is where the system can route ambiguous, failed, or higher-risk cases that need editorial judgment.

## Algorithm And Tuning Terms

### Embedding

A vector representation of text used for similarity comparison and other semantic operations.

Embeddings support relevance estimation, deduplication, and related algorithmic behavior.

### Topic Centroid

The project's evolving semantic center of gravity.

It starts from reference material and can shift over time as the project accumulates more explicit feedback.

### Trend Velocity

The measure of whether a topic is gaining momentum, not just appearing often.

Velocity matters because the system is trying to detect change, not only volume.

## Runtime And URL Terms

### Internal URL

A non-public service-to-service URL used within a deployment environment.

This is the address one internal service may use to talk to another without going through the public internet path.

### Public URL

The externally reachable URL used for browser access, links, callbacks, or other user- and provider-facing entry points.

The exact deployment topology can vary, but the distinction between internal and public URLs remains important.

## How To Use This Glossary

When writing or reviewing docs, prefer these terms consistently across:

- user and admin guides
- reference and developer docs
- code comments and implementation discussions
- API and schema explanations

If another page uses a different word for the same concept, the page is probably drifting and should be corrected.

## What To Read Next

- [**Data Model Schema**](data-model.md): Use this when you need to see how these terms map into record families and project ownership.
- [**API Reference**](api.md): Use this when a glossary term affects route structure, path scoping, or contract shape.
- [**Core Algorithms**](algorithms.md): Use this when a term such as authority, centroid, embedding, or trend velocity needs system-level context.

If the same vocabulary is used consistently across product, docs, and implementation conversations, the rest of the reference guide becomes much easier to trust.
