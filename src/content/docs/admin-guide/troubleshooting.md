# Troubleshooting & Logs

This page is for organization admins who need to narrow down problems before escalating them. It is not a backend debugging manual. Your job is to figure out what users are experiencing, how broad the impact is, and whether the issue is most likely caused by project setup, access, source quality, intake policy, or a deeper technical fault.

Good troubleshooting is mostly about structure. If you ask the right questions first, you can usually tell whether the problem belongs to an in-app admin or to IT, your hosting provider, or platform support.

## Start With the Scope of the Problem

Before trying to fix anything, determine how wide the issue is.

Ask:

- Is this affecting one person, one project, or multiple teams?
- Did it start suddenly, or has it been drifting over time?
- Is the problem happening all the time or only in certain cases?
- Is the issue about access, content quality, intake, or general availability?

This first step matters because a narrow problem often points to project setup or permissions, while a broad problem is more likely to be technical or systemic.

## Describe the User-Visible Symptom Clearly

Avoid starting with assumptions about the cause. Start with what the user can actually see.

Good examples:

- "A new editor can sign in but cannot access the project they need."
- "Content stopped appearing in one active project this morning."
- "Newsletter forwarding works for one sender but not another."
- "Several projects feel much noisier than usual this week."
- "Multiple users report the app is loading slowly or not responding."

Clear symptom statements make it much easier to decide what to check next.

## Check the Most Likely Admin-Side Causes First

Many issues that feel technical at first are actually admin-side problems.

Review these areas before escalating:

- project membership and roles
- source quality and source coverage
- trusted sender and intake policy
- project structure that no longer matches how the team works
- unclear ownership or missing admin responsibility

If the problem can be explained by one of these, fix that first and then confirm whether the user-visible issue is gone.

## Common Issue Pattern: Someone Cannot Access the Right Project

When a user can sign in but cannot work where they need to, first check:

- whether they were added to the correct project
- whether they have the right level of access
- whether the project is the right one for their role in the first place
- whether the request actually reflects a project-structure problem rather than a missing permission

If a user cannot sign in at all, that is more likely to be an identity, authentication, or platform issue.

## Common Issue Pattern: Content Is Missing or Too Thin

If a project is not receiving the content users expect, start with the obvious admin-side checks:

- Are the right sources attached to the project?
- Are those sources still relevant and active?
- Is the team expecting content from a sender or feed that was never actually added?
- Has the project become too narrowly configured for the editorial need?

If the setup looks valid and content still does not appear, the issue may need technical follow-up.

## Common Issue Pattern: The Feed Is Too Noisy

When users complain that a project is full of irrelevant material, first treat it as a source-governance issue.

Check:

- whether too many sources were added
- whether a sender or source no longer fits the project's purpose
- whether overlapping inputs are producing clutter
- whether the project should be split or narrowed instead of continually cleaned up

This is usually an operations or configuration problem, not an infrastructure failure.

## Common Issue Pattern: Newsletter Intake Is Not Working as Expected

When intake seems broken, narrow it down before escalating.

Ask:

- Is the problem affecting one sender or all senders?
- Is the sender trusted or awaiting confirmation?
- Is the issue that messages never arrive, or that they arrive but are not useful?
- Is the project expecting intake from the correct address and workflow?

Many intake issues come from sender trust, process confusion, or mismatched expectations rather than a platform outage.

## Common Issue Pattern: The App Feels Broken for Multiple People

When several users or projects are affected at once, assume the problem may be technical until proven otherwise.

Warning signs include:

- multiple projects not loading properly
- content failing across several unrelated projects
- widespread sign-in or availability complaints
- repeated failures that do not line up with any recent admin change

At that point, the admin task is to gather the best possible incident summary, not to guess at infrastructure details.

## Gather the Right Facts Before Escalating

When you need help from IT, your hosting provider, or platform support, collect concrete information first.

Useful details include:

- which project or projects are affected
- which users are affected
- when the issue started
- what the expected behavior was
- what actually happened instead
- whether the issue is constant or intermittent
- whether anything changed recently in access, sources, or workflow

This is usually more valuable than sending a vague report like "the app is broken."

## Use Logs as Supporting Evidence, Not as Your Starting Point

As an admin, you may have access to logs, audit history, or operational traces through the product or through a support process. Use that information to support a clear problem statement, not as a substitute for one.

Logs are most useful when you already know:

- what action failed
- who was affected
- which project was involved
- roughly when the problem occurred

Without that context, logs tend to create noise instead of clarity.

## Decide Whether the Next Step Is Fix, Monitor, or Escalate

After initial triage, choose one of three paths:

1. Fix it directly if the problem is clearly about permissions, source setup, sender trust, or project structure.
2. Monitor it briefly if the symptom is minor, isolated, and not yet clearly reproducible.
3. Escalate it if the issue is broad, persistent, or clearly outside normal admin control.

Making that decision explicitly prevents incidents from lingering in a gray area.

## A Practical Troubleshooting Checklist

Use this checklist for first-line admin triage:

1. Define the user-visible symptom in one sentence.
2. Confirm how broad the problem is.
3. Check the most likely admin-side causes first.
4. Identify whether the issue is access, source quality, intake, structure, or system-wide behavior.
5. Gather concrete examples and timestamps.
6. Fix, monitor, or escalate based on the evidence.

## What to Read Next

The most useful companion pages for troubleshooting are:

- [**Daily Operations**](operations.md): Use this to spot recurring problems before they turn into incidents.
- [**Users & Access Management**](users-and-access.md): Review this when the issue is clearly about membership or permissions.
- [**Sources & Allowlists**](sources-and-allowlist.md): Use this when the problem is about noisy inputs, missing content, or sender trust.
- [**Backups & Data Retention**](backups-and-retention.md): Review this if the issue raises continuity or recovery concerns.

If you can describe the symptom clearly, narrow the scope quickly, rule out the common admin-side causes, and escalate with concrete evidence when needed, then your troubleshooting process is doing its job.
