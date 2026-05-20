# Initial Configuration

This page is for organization admins configuring Digest Engine for real team use inside the application. It is not a reference for environment variables, deployment manifests, or infrastructure secrets.

By the time you are using this guide, the platform should already be running. Your job is to make sensible decisions about how your group will use it: how projects should be structured, who should have access, which sources should be connected first, and what editorial guardrails should be in place.

## What Configuration Means for an In-App Admin

For an in-app admin, configuration usually means answering questions like:

- How should we divide our work into projects?
- Which teams or roles need access to which projects?
- Which sources should we connect first?
- How should newsletter intake be handled?
- What should users do themselves, and what should stay under admin control?

Good configuration reduces confusion later. It helps your organization start with a clear structure instead of improvising access, sources, and workflows after content is already piling up.

## Decide How Projects Should Be Organized

The first major configuration choice is project structure.

Most organizations should decide early whether projects will be separated by:

- newsletter or publication
- team or department
- topic area
- audience segment
- region or business unit

Good project boundaries are specific enough to keep editorial intent clear, but not so fragmented that every minor variation becomes its own workspace.

As a rule, create a separate project when the content focus, audience, or editorial ownership is meaningfully different.

## Define Who Should Administer Projects

Not everyone with access to a project needs admin privileges. Early on, decide who should be responsible for:

- managing membership
- reviewing source setup
- overseeing newsletter intake
- resolving day-to-day workflow problems
- coordinating with internal IT or platform support when something breaks

Keeping project administration intentional helps avoid permission sprawl and makes it clear who owns operational decisions inside each workspace.

For role-specific guidance, continue to [**Users & Access Management**](users-and-access.md).

## Choose Strong Starting Sources

Source quality has a major impact on whether the system feels useful in the first week.

When configuring new projects, start with a small number of high-signal sources that match the editorial purpose of the project. Good starting sources are usually:

- trusted industry publications
- high-quality feeds from known organizations
- communities that consistently surface relevant material
- curated newsletters your team already reads and trusts

It is usually better to begin with a manageable set of reliable sources than to flood a new project with too many noisy inputs.

## Decide How Newsletter Intake Should Be Used

If newsletter intake is enabled in your environment, decide early how your team should use it.

Questions to settle up front:

- Which projects should have intake used actively?
- Which senders should be considered trusted?
- Should intake be limited to a few editors or shared more broadly?
- Who is responsible for reviewing allowlist or sender confirmation issues?

Even when the email intake flow is already available, the admin policy around who can feed content into projects still matters.

For day-to-day management, see [**Sources & Allowlists**](sources-and-allowlist.md).

## Set Expectations for Early Users

A newly configured workspace works best when users know what they are expected to do in the first few days.

As an admin, it helps to communicate a simple operating model:

- which projects people should work in
- where content is expected to come from
- how often editors should review the feed
- who should approve or reject noisy inputs
- when users should escalate a problem instead of working around it

This is often more important than technical configuration. A well-structured workspace still struggles if nobody knows how to use it consistently.

## Review Early Signals and Adjust Quickly

After initial setup, do a short review cycle rather than assuming the first configuration is perfect.

Look for signs that the setup needs adjustment:

- projects are too broad or too narrow
- the wrong users have access
- source quality is poor
- one team is mixing multiple editorial goals into a single project
- newsletter intake is being underused or misused

Small structural fixes are easiest at the beginning, before habits harden and content history grows.

## Know What Still Belongs to IT, Hosting, or Platform Support

Some issues may look like configuration problems but are actually infrastructure or deployment problems.

Escalate to internal IT, your hosting provider, or platform support when you see issues such as:

- login methods not working at all
- projects not loading reliably
- no content ingesting despite valid source setup
- newsletter confirmation emails never arriving
- system-wide performance or availability problems

As an in-app admin, your role is to identify when the problem is inside workspace setup versus when it needs technical intervention.

## A Good First Configuration Checklist

Use this checklist when setting up a new organization or team:

1. Confirm the initial set of projects and their purpose.
2. Assign the right project admins and user roles.
3. Add a small set of trusted starting sources.
4. Decide how newsletter intake will be managed.
5. Verify that content is flowing into each active project.
6. Make sure editors know where to work and what is expected of them.
7. Review the first week of activity and adjust where needed.

## What to Read Next

After initial configuration, the next most useful admin pages are:

- [**Users & Access Management**](users-and-access.md): Set and maintain the right project roles.
- [**Sources & Allowlists**](sources-and-allowlist.md): Manage incoming content channels and trusted senders.
- [**Daily Operations**](operations.md): Build a repeatable routine for keeping projects healthy.
- [**Troubleshooting & Logs**](troubleshooting.md): Know how to narrow down issues before escalating them.

If your teams are in the right projects, the right users have access, strong sources are connected, and content is flowing into a usable editorial workflow, then your initial configuration is doing its job.
