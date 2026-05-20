# Backups & Data Retention

This page is for organization admins who need to think about continuity, recovery expectations, and how long important information should remain available in Digest Engine. It is not a step-by-step infrastructure restore guide.

In many organizations, the actual backup systems are owned by IT, platform support, or a hosting provider. Your role as an admin is to make sure the right questions have been answered before an incident happens.

## What This Page Helps You Clarify

As an organization admin, this page helps you answer questions like:

- What information in Digest Engine would hurt the team most if it disappeared?
- Which parts of the workspace need to be recoverable after an outage or mistake?
- How long do we expect activity history or operational records to remain available?
- Who do we contact if recovery is needed?
- What should we document now so a future incident is easier to handle?

You do not need to run the backup tooling yourself to be responsible for continuity planning.

## Start With What the Organization Cares About Most

Different teams care about different kinds of loss. Before talking about backup procedures, identify what would actually matter if something went missing.

For many organizations, the most important concerns include:

- project configuration and ownership
- source setup and trusted sender decisions
- accumulated content and editorial context
- records of recent operational activity
- the ability to restore a usable workspace without rebuilding everything from memory

If you know what matters most, you can ask better questions of the people who manage the platform technically.

## Distinguish Continuity From Convenience

Not everything needs the same recovery priority.

Some information is mission-critical because losing it would disrupt editorial operations immediately. Other information is mainly useful for reference, auditing, or diagnosis.

As an admin, it helps to separate:

- what must be recoverable quickly
- what can be reconstructed if necessary
- what only needs to be retained for a limited time

That distinction makes retention decisions much easier and keeps expectations realistic.

## Define Recovery Expectations Before an Incident

You should know, at a practical level, what your team expects if something goes wrong.

Questions worth settling in advance:

- If a project is disrupted, how quickly does the team expect it to be usable again?
- If historical information is lost, how much of it is acceptable to rebuild manually?
- Who decides whether a recovery action is urgent?
- Who approves changes to retention expectations if storage or cost tradeoffs arise?

These are business and operational questions, not just technical ones.

## Know Who Owns the Recovery Process

Continuity planning fails when nobody knows who is responsible during an incident.

Make sure your organization knows:

- who to contact for platform recovery or backup questions
- who can confirm the business importance of affected projects
- who communicates status to editors and stakeholders
- who decides whether to pause work, wait, or switch to a workaround

As an admin, you may not restore the system yourself, but you should know who does and what information they need from you.

## Treat Retention as a Policy Decision

Retention should not be accidental. Decide what types of information your organization wants to keep available long enough to support its editorial and operational needs.

Useful retention questions include:

- How long should operational history remain available for troubleshooting?
- How long do admins need access to past activity when reviewing recurring issues?
- Are there team, legal, or compliance expectations that affect how long records should remain available?
- Are there categories of information that should be cleaned up more aggressively?

Even if the technical settings are handled elsewhere, the policy choice still belongs partly to the people who run the organization's workflow.

## Plan for the Information You Will Need During Recovery

If something is lost or corrupted, admins are often asked for context before recovery can happen safely.

Keep a simple record of:

- the most important active projects
- who owns each project operationally
- which sources and intake patterns are essential to ongoing work
- who should be contacted first if a project becomes unavailable
- what the team considers an acceptable recovery outcome

This makes recovery conversations much faster and more concrete.

## Ask for Evidence, Not Assumptions

If another team handles backups or hosting, do not assume everything is protected just because it is in production.

Reasonable admin questions include:

- Are platform backups being taken consistently?
- Has recovery been tested recently?
- What information is included in the backup scope?
- Are there known gaps in what can or cannot be restored?
- How long is operational history retained before cleanup?

You do not need deep infrastructure knowledge to ask for clear answers.

## Include Recovery Readiness in Periodic Reviews

Continuity planning should be part of occasional admin review, especially after large workspace changes.

Revisit backup and retention assumptions when:

- major new projects are launched
- a team becomes newly dependent on the platform
- intake volume grows significantly
- compliance expectations change
- a recent issue exposes confusion about who owns recovery

These are the moments when hidden gaps become expensive later.

## Know When an Issue Is About Recovery, Not Daily Operations

Some problems are annoying but local. Others raise continuity concerns.

Treat an issue as higher risk when:

- data appears missing rather than simply delayed
- a project becomes unusable for multiple people at once
- important operational history cannot be accessed when needed
- nobody can say whether the affected information can be restored
- there is confusion about who owns the next step

When this happens, escalate early and provide concrete examples of what appears to be missing or at risk.

## A Practical Continuity Checklist

Use this checklist as a lightweight admin review:

1. Confirm which projects and information are most important to protect.
2. Make sure recovery contacts and ownership are still clear.
3. Review whether retention expectations still match business needs.
4. Check whether any recent incidents exposed continuity gaps.
5. Record questions for IT, your hosting provider, or platform support before the next issue occurs.

## What to Read Next

The most useful companion pages for continuity planning are:

- [**Daily Operations**](operations.md): Use this to catch smaller issues before they become recovery problems.
- [**Troubleshooting & Logs**](troubleshooting.md): Start here when something seems wrong and you need to narrow down the impact.
- [**Users & Access Management**](users-and-access.md): Review this if recovery planning depends on clear project ownership.
- [**Sources & Allowlists**](sources-and-allowlist.md): Revisit this if source setup or trusted senders are critical parts of what must be recoverable.

If your organization knows what it needs to protect, how long key information should remain available, and who owns recovery decisions before an incident occurs, then your backup and retention planning is doing its job.
