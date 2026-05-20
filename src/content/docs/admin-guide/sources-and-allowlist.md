# Sources & Allowlists

This page is for organization admins who decide which content enters Digest Engine and which senders are trusted to feed newsletter intake. It is not a low-level guide to ingestion plugins or backend models.

Good source governance matters because input quality shapes everything downstream. If the sources are noisy, unreliable, or too broad, editors spend more time cleaning up the feed than using it.

## What This Page Helps You Manage

As an in-app admin, you are usually making decisions like:

- Which sources should each project rely on?
- Which senders should be trusted for newsletter intake?
- Who is allowed to add or change sources?
- When should a source be removed or reviewed?
- How should the team respond when intake becomes noisy or unreliable?

The goal is not to connect every possible input. The goal is to keep each project fed by sources that are credible, relevant, and maintainable.

## Start With Source Quality, Not Source Volume

When setting up a project, begin with a small set of high-confidence sources.

Strong early choices usually include:

- trusted industry publications
- official organization feeds
- dependable topic-specific outlets
- newsletters the team already uses to stay informed

Avoid adding too many sources at once. A smaller, cleaner input set makes it easier to understand what is working and what needs adjustment.

## Match Sources to the Purpose of the Project

Every project should have a clear editorial purpose, and source choices should support that purpose directly.

Before adding a source, ask:

- Does this source consistently cover the topic this project exists to track?
- Is the signal quality high enough to justify ongoing review?
- Will this source overlap heavily with other existing inputs?
- Is this source useful to the people actually working in the project?

If the answer is unclear, do not add it yet. It is easier to expand a clean source list than to clean up an overloaded one.

## Decide Who Can Add or Change Sources

Source management should not be completely open-ended.

Define clearly:

- who can add a new source
- who can remove a source
- who reviews source quality problems
- who approves trusted senders for newsletter intake

In many teams, this responsibility should stay with project admins or a small set of editorial operations owners rather than every contributor.

## Use Trusted Senders Deliberately

Newsletter intake works best when trusted senders are managed as a policy decision, not treated as a casual convenience.

Good candidates for trusted senders are usually:

- shared editorial inboxes
- known newsletters your team actively relies on
- approved internal distribution addresses
- a limited set of individuals responsible for forwarding content intentionally

Avoid trusting broad or loosely controlled sender addresses unless there is a clear reason to do so.

## Keep Intake Focused and Predictable

Once newsletter intake is available, it is easy for teams to overuse it.

Set expectations early:

- what kinds of newsletters should be forwarded
- which projects they should feed into
- who is responsible for watching for bad input
- when a sender should be reviewed or removed

This keeps intake from becoming a second uncontrolled inbox feeding noise into the editorial workflow.

## Review Source Health From an Admin Perspective

You do not need to understand every ingestion mechanism to manage sources well. What matters is whether the inputs are serving the project reliably.

Signs that a source needs review include:

- it stops producing useful content
- it becomes noisy or off-topic
- editors start ignoring most of what it sends
- it creates duplicates or obvious clutter
- it appears to fail repeatedly or stop updating

When you see these patterns, decide whether the source should be fixed, paused, or removed.

## Remove Bad Inputs Quickly

Do not leave broken or low-quality inputs in place just because they used to be useful.

Remove or review a source or sender when it:

- consistently delivers irrelevant material
- causes confusion about where content is coming from
- starts behaving unpredictably
- creates editorial cleanup work without enough value in return
- is no longer aligned with the project's purpose

Fast cleanup is usually better than letting a bad input degrade trust in the project feed.

## Create a Simple Source Review Routine

Source management is easier when it is treated as recurring maintenance.

At a regular interval, review:

- which sources are still producing useful content
- which trusted senders are still appropriate
- whether any projects have too many overlapping inputs
- whether editors are complaining about noise, gaps, or stale content
- whether a new team or project needs a distinct source strategy

This can be lightweight, but it should be consistent.

## Know When a Source Problem Is Really a Technical Problem

Some problems belong to source policy, while others need technical help.

It is usually an admin decision when:

- a source is too noisy
- a sender should no longer be trusted
- a project has the wrong content mix
- too many overlapping inputs are feeding one workspace

It is more likely a technical issue when:

- valid sources stop updating unexpectedly
- intake messages never appear at all
- confirmation or trust steps do not complete as expected
- system-wide ingestion appears delayed or broken

When in doubt, collect specific examples before escalating so IT or platform support can distinguish a source-policy issue from a system issue.

## A Practical Source Governance Checklist

Use this checklist when reviewing a project's inputs:

1. Confirm the project's editorial purpose.
2. Review whether each source still supports that purpose.
3. Remove or pause noisy, stale, or low-value inputs.
4. Confirm that trusted senders are still appropriate.
5. Check whether editors are getting the right balance of coverage and signal.
6. Record any recurring failures or odd behavior for follow-up.

## What to Read Next

After source governance is in place, the next most useful admin pages are:

- [**Users & Access Management**](users-and-access.md): Decide who can manage projects and source changes.
- [**Daily Operations**](operations.md): Build recurring checks around source quality and intake health.
- [**Troubleshooting & Logs**](troubleshooting.md): Use this when a source or sender seems broken rather than simply low quality.
- [**Initial Configuration**](configuration.md): Revisit this if project structure is making source governance harder than it should be.

If each project has a focused set of reliable sources, only the right senders are trusted, and low-value inputs are removed quickly, then your source and allowlist process is working.
