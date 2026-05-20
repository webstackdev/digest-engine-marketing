# Deployment & CI/CD

Use this page when a change affects how Digest Engine is built, promoted, or operated in production. The main point of this page is to clarify **ownership and boundaries** so contributors know which repository actually owns runtime deployment work.

The most important fact is simple: the application runtime lives in a **different repository**. This repo does not own the full Django, Ninja, Taskiq, ingestion, and production deployment surface. If you are changing runtime deployment behavior, the authoritative implementation and release workflow live in the application repo.

## What This Repo Owns Versus What the App Repo Owns

This repo contains the marketing and documentation experience. The application repo owns the deployable product runtime.

In practical terms:

- this repo owns documentation and site content changes that affect what users and contributors read
- the application repo owns runtime containers, infrastructure configuration, background job deployment shape, and environment promotion
- this repo may need to change when a runtime feature changes, but it is not the source of truth for how the app is actually deployed

If a page in this repo describes production rollout steps for the application, that guidance should point back to the app repo's deployment workflow rather than pretending the assets live here.

## The App Repo Is the Source of Truth for Runtime Deployment

When you need to build, package, promote, or roll out the actual Digest Engine application, work from the app repo.

That includes changes to:

- container build behavior
- environment configuration used by the running application
- production process topology
- ingress, cluster, or hosting configuration
- rollout sequencing for backend, frontend, ingestion, or background job changes

The app repo uses `just`, so the current `Justfile` there should be treated as the canonical entry point for deployment-oriented commands.

Because that repo is not open in this workspace, this page intentionally does not freeze specific `just` target names that cannot be verified here.

## When a Change in This Repo Still Has Deployment Impact

Even though this repo is not the runtime source of truth, changes here can still matter for release coordination.

Typical examples:

- a feature launch that requires updated documentation at the same time the app ships
- renamed product concepts that must stay aligned between UI behavior and docs
- new user or admin workflows that require documentation before production rollout
- developer-facing changes, such as the Ninja or Taskiq migration, that require contributor docs to move with the codebase

In those cases, deployment work happens in the app repo, but release readiness may still depend on docs in this repo being updated in the same window.

## How To Think About Production-Impacting Changes

Before treating a change as ready for rollout, answer these questions:

1. Which repository owns the actual runtime behavior?
2. Does this change affect only documentation and marketing content, or does it require a coordinated runtime release?
3. Are there user-facing, admin-facing, or developer-facing docs that must ship with the change?
4. Does the runtime change alter architecture, API behavior, background execution, or operational expectations?
5. Does the app repo's `just`-driven deployment workflow need to be updated there?

If the answer to the last question is yes, the deployment change belongs in the app repo even if the explanatory docs live here.

## Migration-Sensitive Deployments

The current architectural direction is toward **Ninja** for API work and **Taskiq** for background execution.

That means production-impacting backend changes should be reviewed with migration context in mind.

For example, a rollout may need special attention if it changes:

- which API surface is authoritative during a DRF-to-Ninja transition
- how background work is scheduled or executed while moving from Celery-style patterns to Taskiq
- how worker topology, queue routing, or operational monitoring maps to the new job system

This page does not define those rollout mechanics directly. It documents the expectation that those mechanics should be handled in the app repo and described there with verified commands and deployment assets.

## CI/CD Expectations

For the application runtime:

- treat the app repo's CI/CD configuration as the canonical promotion path
- use the app repo's `just` tasks as the verified command surface for build and deploy workflows
- keep deployment-specific docs close to the repo that actually ships the runtime

For this repo:

- validate documentation and site changes with the appropriate checks in this workspace
- update docs promptly when production-facing behavior changes elsewhere
- avoid adding stale deployment instructions that cannot be verified from this repo

## What To Update When Deployment Behavior Changes

If a deployment or promotion workflow changes in the app repo, check whether any of the following docs in this repo need to move with it:

- developer-guide pages that describe architecture, conventions, or release expectations
- admin-guide pages whose operational assumptions depend on runtime behavior
- user-guide pages whose setup or workflow descriptions changed because of the release

The goal is to keep this repo accurate without duplicating the app repo's operational playbook.

## A Practical Release Coordination Checklist

Use this checklist when a change may touch deployment or rollout:

1. Confirm whether the runtime change belongs in the app repo.
2. Use the app repo's `Justfile` and CI/CD setup as the source of truth for deployment commands.
3. Update docs in this repo only where user, admin, or contributor understanding needs to change.
4. Keep architecture and developer-guide pages aligned with the current runtime direction, including Ninja and Taskiq.
5. Avoid documenting unverifiable cluster paths, manifests, or command names in this repo.

## What to Read Next

After clarifying deployment ownership, the most useful companion pages are:

- [**System Architecture**](architecture.md): Use this when a production change affects runtime shape or workflow boundaries.
- [**Contributing Guidelines**](contributing.md): Use this to decide how docs and code changes should move together before review.
- [**Local Development**](local-development.md): Use this when you need the local workflow that precedes any release work.
- [**Testing & QA**](testing.md): Use this to choose the right validation path before handing off to a runtime deployment flow.

If you can clearly separate what ships from this repo versus what ships from the app repo, and you treat the app repo's `just` workflow as the source of truth for runtime rollout, then your deployment documentation is pointing contributors in the right direction.
