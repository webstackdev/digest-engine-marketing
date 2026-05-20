# Entities and Authority

Entities and authority scoring help Digest Engine understand not just what topics are showing up in your project, but which people, companies, products, and organizations matter most inside that topic.

For editorial teams, this creates an extra layer of signal. It helps the system recognize important names, reduce noise, and surface content connected to the people and organizations that carry real weight in your space.

## What an Entity Is

An **entity** is a named thing the system tracks as meaningful within your project. In most cases, that includes:

- people
- companies
- products
- vendors
- organizations

If your project focuses on a specific industry or subject area, entities help the system build a map of the important actors inside that space.

For example, in a project about developer tools, entities might include notable founders, major open-source projects, infrastructure vendors, or widely used products. In a healthcare or biotech project, entities might instead be companies, regulators, research groups, or leading experts.

## Why Entity Tracking Matters

Entity tracking gives the system more context than keywords alone.

It helps answer questions like:

- Which names appear repeatedly in the most relevant content?
- Which companies or people are becoming more influential in this project?
- Which articles mention organizations we already know are important?
- Which newly discovered names should be added to the project's view of the space?

That extra structure can improve ranking and help your team spot meaningful patterns more quickly.

## What the Candidate Review Queue Is For

When Digest Engine reads incoming content, it may find proper nouns or named references that look important but are not yet recognized as tracked entities.

Those names are placed into an **entity candidate review queue** for human review.

This queue exists because entity quality matters. Without review, the system could end up tracking noisy terms, duplicate names, vague references, or words that only look important out of context.

The queue gives your team a way to keep the entity layer clean and useful.

## Reviewing Entity Candidates

When you open the review queue, you are deciding how the project should interpret a newly detected name.

Typical actions include:

- **Approve**: Accept the candidate as a real tracked entity.
- **Reject**: Mark the candidate as something the project should not track.
- **Merge**: Combine the candidate with an existing entity when the system has identified the same real-world thing under a different name.

For example, a merge is useful when a company appears under multiple forms such as a full legal name, product shorthand, stock symbol, or acronym.

## When to Approve, Reject, or Merge

Use approval when the candidate is clearly important to your editorial space and likely to appear again in content worth tracking.

Use rejection when the candidate is:

- too generic
- not relevant to the project
- a false positive
- a term that should not become a long-term tracked entity

Use merge when the candidate is real and important, but it is actually the same entity you already track under another label.

Good review discipline matters here. A clean entity list makes authority scoring more useful, while a noisy one weakens the signal.

## What Authority Means

Authority is the system's way of estimating how influential or important a tracked entity is within the context of your project.

Authority is not just about how often a name appears. It is shaped by whether that entity shows up in the kinds of content your project considers important.

In practice, an entity's authority tends to rise when it appears repeatedly in strong, relevant content that aligns with your project's editorial focus.

That means authority is project-specific. The same company or person might be highly important in one project and much less important in another.

## How Authority Affects Content Ranking

Authority becomes useful when new content arrives.

If an incoming item mentions entities that already carry strong authority inside the project, that can increase the likelihood that the content deserves attention. This helps Digest Engine surface material connected to influential people, companies, and products more effectively.

For editors, that means authority can help answer a practical question:

"Is this article connected to names we already know are important in this space?"

That does not replace editorial judgment, but it gives the ranking system another meaningful signal.

## How to Use This in Practice

Most teams get value from entities and authority when they treat them as an ongoing maintenance and discovery workflow.

Useful habits include:

- reviewing entity candidates regularly instead of letting the queue build up
- approving only the names that truly matter to the project
- merging duplicates quickly to keep authority concentrated on the right entities
- rejecting weak or noisy candidates before they clutter the system
- watching which entities recur in your strongest content

Over time, this helps the project become better at recognizing who and what matters in your niche.

## Relationship to the Rest of the Workflow

Entities and authority work best when paired with the rest of your editorial process.

- Use [**Projects and Content**](projects-and-content.md) to review the articles where important entities appear.
- Use [**Themes and Trends**](themes-and-trends.md) to spot broader patterns those entities may be part of.
- Use [**Feedback and Tuning**](feedback-and-tuning.md) to reinforce the kinds of content and signals your project should prioritize.

When these pieces work together, entity tracking becomes more than background metadata. It becomes part of how your project learns who the key players are in the space you cover.
