# Developer Overview

Use this section when you already know where the repository lives and need the deeper context behind how Digest Engine is structured, why certain conventions exist, and where to look when changing a particular part of the system. This guide is meant to complement the repository README, not repeat its basic setup instructions.

If you need install, build, test, or run commands, start with the README and the focused setup pages it links to. Use this section when you are moving past first-run setup and into implementation details, architectural boundaries, and contribution standards.

## What This Guide Covers

This developer guide is the right place to answer questions like:

- How do requests, ingestion jobs, and AI pipeline steps move through the system?
- Where should new backend or frontend code live?
- Which conventions matter for project scoping, API shape, testing, and UI structure?
- What standards should changes follow before they are ready for review?
- Where should I look before changing deployment, CI/CD, or production-facing behavior?

## Start Here

- [**System Architecture**](architecture.md): Start here when you need the big picture for request flow, async processing, ingestion, and frontend/backend boundaries.
- [**Contributing Guidelines**](contributing.md): Read this before making changes so your branch, validation flow, and prompt-skill updates follow repo expectations.
- [**Backend Conventions**](backend-conventions.md): Use this when working in Django, DRF, Celery, ingestion, or project-scoped backend code.
- [**Frontend Conventions**](frontend-conventions.md): Use this when touching App Router routes, shared frontend types, component structure, or UI tests.

## Getting Started

These pages help once you are past the high-level README and need workflow-specific detail:

- [**Local Development**](local-development.md): Development workflow details for the host-side and Docker tracks.
- [**Contributing Guidelines**](contributing.md): Repository expectations for validation, instructions, and skill-driven changes.

## Codebase Standards

These pages are the core implementation references for day-to-day development work:

- [**Backend Conventions**](backend-conventions.md): Project scoping, API patterns, code placement, task conventions, and schema discipline.
- [**Frontend Conventions**](frontend-conventions.md): App Router layout, component placement, shared type rules, and frontend testing expectations.
- [**Testing & QA**](testing.md): Test placement, target selection, and validation expectations for both backend and frontend work.

## Production Context

- [**Deployment & CI/CD**](deployment.md): Use this when a change affects containers, deployment shape, or promotion into production environments.

## Suggested Reading Paths

- **New contributor to the codebase**: Read [**System Architecture**](architecture.md), [**Contributing Guidelines**](contributing.md), and [**Testing & QA**](testing.md).
- **Backend feature work**: Read [**System Architecture**](architecture.md), [**Backend Conventions**](backend-conventions.md), and then the relevant reference docs such as [**Pipeline**](../reference/pipeline.md) or [**API Reference**](../reference/api.md).
- **Frontend feature work**: Read [**Frontend Conventions**](frontend-conventions.md), [**Testing & QA**](testing.md), and then the relevant docs pages that describe the product surface you are changing.
- **Production-impacting work**: Read [**Deployment & CI/CD**](deployment.md) together with [**System Architecture**](architecture.md) and the appropriate reference docs.

Keep this page as the map for deeper developer documentation. When the README gets you into the repo, this guide should help you understand how to change it responsibly.
