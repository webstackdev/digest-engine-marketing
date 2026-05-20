# Users & Access Management

This page is for organization admins who decide who can work in Digest Engine, which projects they should use, and how much control they should have inside each workspace. It is not a technical authentication or identity-provider setup guide.

Good access management keeps the system usable. People should be able to do their work without being blocked, but they also should not end up in projects they do not need or receive admin powers they will never use.

## What This Page Helps You Decide

As an in-app admin, you are usually answering questions like:

- Who should have access to which projects?
- Who needs admin privileges versus normal working access?
- How do we onboard a new editor, team lead, or stakeholder?
- When should someone be removed from a project?
- How often should we review membership and clean it up?

If you treat access as part of editorial operations rather than a one-time setup task, the workspace stays clearer and easier to manage.

## Start With the Project, Not the Person

The best access decisions usually begin with the project itself.

For each project, define:

- who actively works in it every week
- who needs to manage project settings or membership
- who only needs read access or occasional visibility
- who should not be included because the project is outside their role

This avoids the common mistake of adding people broadly first and figuring out the boundaries later.

## Use Roles Deliberately

Not every user needs the same level of control.

In most cases, you should think in three practical groups:

- **Project admins**: People who manage membership, oversee configuration, and help resolve project-level problems.
- **Active contributors**: Editors or operators who work with content regularly but do not need to manage access.
- **Readers or observers**: Stakeholders who need visibility into a project but are not responsible for changing how it runs.

Keep the number of project admins small. The more people who can change access or setup, the harder it is to maintain consistency.

## Onboard New People With a Clear Default Process

When adding someone new, use the same short checklist every time:

1. Confirm which project or projects they actually need.
2. Assign the lowest level of access that still lets them do their job.
3. Tell them where they are expected to work.
4. Confirm who they should contact if they cannot access something they need.
5. Review their access again after their first real week of use.

This keeps onboarding predictable and reduces the need for later cleanup.

## Avoid Common Access Mistakes

Access issues often come from process, not technology.

Watch for patterns like these:

- everyone gets added to every project by default
- project admins are assigned too broadly
- former contributors keep access indefinitely
- readers are given admin permissions out of convenience
- one person becomes the only admin for a critical project

Each of these creates either unnecessary risk or unnecessary friction.

## Decide Who Owns Membership Changes

Membership management works best when the responsibility is explicit.

For each project, make sure it is clear:

- who approves new access
- who removes access when responsibilities change
- who handles urgent requests when someone is blocked
- who performs regular access reviews

If this responsibility is vague, access requests tend to pile up, and project membership drifts away from reality.

## Review Access Regularly

Do not wait for a problem to review permissions. A lightweight recurring review is usually enough.

At a regular interval, check:

- whether every listed member still needs access
- whether the number of project admins is still appropriate
- whether any users are missing access they now need
- whether inactive or former team members should be removed
- whether new projects need their own dedicated admin owner

These reviews are especially useful after team reorganizations, role changes, or newsletter launches.

## Handle Departures and Role Changes Quickly

When someone changes roles or leaves the organization, update project access promptly.

At minimum:

- remove access to projects they no longer support
- transfer any admin responsibility they held
- confirm that no important project is left without an accountable admin

Fast cleanup protects the integrity of the workspace and reduces confusion for the remaining team.

## Know the Boundary Between App Access and Identity Systems

As an in-app admin, you are usually responsible for project membership and role decisions inside Digest Engine.

Your IT or platform team may still control:

- how accounts are created
- which login methods are available
- single sign-on or identity provider setup
- organization-wide security rules

If a person cannot sign in at all, that is often not a project-membership problem. If they can sign in but cannot reach the right project, that usually is an admin-guide problem.

## A Practical Access Review Checklist

Use this checklist when reviewing membership for a project:

1. List the people who actually work in the project.
2. Confirm which of them truly need admin control.
3. Remove users who no longer need access.
4. Add missing contributors or readers with the right level of permission.
5. Make sure at least one active owner is accountable for the project.
6. Record any unresolved access problems for follow-up.

## What to Read Next

After access is in good shape, the next most useful admin pages are:

- [**Initial Configuration**](configuration.md): Use this to make sure projects are structured sensibly.
- [**Sources & Allowlists**](sources-and-allowlist.md): Control who and what can feed content into projects.
- [**Daily Operations**](operations.md): Build a repeatable routine for oversight and cleanup.
- [**Troubleshooting & Logs**](troubleshooting.md): Use this when access behavior seems wrong and you need to narrow down the issue.

If the right people are in the right projects, with the right level of control, and membership stays aligned with actual responsibility over time, then your access model is working.
