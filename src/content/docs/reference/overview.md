# Reference Overview

Use this section when you need precise, system-level answers about how Digest Engine is named, structured, configured, and operated. Unlike the User Guide, these pages are meant to be a working reference for developers, operators, and advanced users who need exact definitions and implementation-facing details.

If you are browsing, start with the **Table of Contents** tab to move around the current page. If you are trying to find a specific system document, open the **Files** tab and jump directly to the reference page you need.

## Core Reference Pages

- [**Glossary of Terms**](glossary.md): Defines the shared language used across the product, docs, and codebase.
- [**Data Model Schema**](data-model.md): Maps the main application models and explains the core project-scoping boundaries.
- [**API Reference**](api.md): Documents the main REST surface, auth modes, and the project-scoped endpoint structure.

## Engine Internals

- [**Ingestion Pipeline**](pipeline.md): Explains how content moves through ingestion, enrichment, retries, and batch processing.
- [**Core Algorithms**](algorithms.md): Describes the main scoring, embedding, centroid, and authority logic used by the engine.
- [**Skill Capabilities**](skills.md): Lists the prompt-driven skills, what they consume, what they return, and where the prompts live.

## System Observability

- [**System Tunables & Configuration**](tunables.md): Central reference for environment variables, thresholds, and runtime controls.
- [**Logging & Observability**](logging-and-observability.md): Covers structured logging, traceability, metrics, dashboards, and telemetry retention.

## Suggested Reading Paths

- **Learning the platform vocabulary**: Start with [**Glossary of Terms**](glossary.md), then continue to [**Data Model Schema**](data-model.md).
- **Understanding request and data flow**: Read [**API Reference**](api.md), [**Ingestion Pipeline**](pipeline.md), and [**Core Algorithms**](algorithms.md).
- **Operating and tuning the system**: Read [**System Tunables & Configuration**](tunables.md) and [**Logging & Observability**](logging-and-observability.md).
- **Working on prompt behavior**: Read [**Skill Capabilities**](skills.md) alongside [**Ingestion Pipeline**](pipeline.md).

Keep this page as the starting point for reference material. When you need implementation detail instead of product guidance, the links above should get you to the right document quickly.
