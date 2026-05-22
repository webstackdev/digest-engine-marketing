# Skill Capabilities

Use this page when you need the prompt-driven capability map for Digest Engine: what kinds of bounded LLM operations exist, what role each one plays in the broader workflow, and how skill failures should be interpreted.

This page is about the stable concept of a **skill**, not the exact loader implementation in one runtime file. The authoritative runtime code and prompt inventory live in the separate application repo, so this document focuses on capability categories and workflow behavior that remain meaningful even as the plumbing evolves.

## What A Skill Is

A skill is one discrete prompt-driven operation inside the larger system.

The important idea is bounded scope.

A skill should do one focused kind of work, such as:

- classify a content item
- break a relevance tie
- generate a short summary
- extract candidate entities
- turn grouped material into a higher-level editorial artifact

The pipeline may invoke several skills in one end-to-end flow, but each individual skill should still be narrow enough that its purpose, inputs, and failure behavior are understandable on their own.

## Skills Versus The Pipeline

The distinction matters:

- the **pipeline** is the full processing route from ingestion to editorially useful state
- a **skill** is one bounded AI operation that may run at one step in that route

That means a pipeline can exist without every stage being a skill, and a skill is not the same thing as the whole workflow.

For the broader stage model, see [**Ingestion Pipeline**](pipeline.md).

## Why Skills Exist

Skills are useful when the system needs language understanding or generation but the task should remain constrained and inspectable.

That gives the system a few advantages:

- prompt behavior can be tuned without redefining the whole workflow
- failures can be isolated to one stage
- output contracts can be evaluated per capability
- contributors can reason about one AI step at a time instead of treating the whole pipeline as a black box

This is especially important in a system where some decisions should fall back gracefully or route into review rather than failing opaquely.

## Common Skill Families

The exact inventory may evolve, but the stable skill families are recognizable.

### Classification Skills

These assign a bounded categorical interpretation to content.

Typical use:

- label an item as a broad content type or category
- support filtering, grouping, or downstream editorial triage

The key property is that the output is structured and category-like rather than open-ended prose.

### Relevance Tie-Break Skills

These are used when the algorithmic relevance layer cannot make a confident decision on its own.

Typical use:

- inspect borderline content that falls into the ambiguous relevance band
- return a more explicit judgment or explanation than cosine similarity alone can provide

These skills are most useful when they act as a bounded second opinion, not as a replacement for the entire ranking model.

### Summarization Skills

These condense accepted content into short editor-facing summaries.

Typical use:

- give editors a fast read on a content item
- attach a structured, readable short-form description to content already accepted into the corpus

The most important boundary is that summarization should make content faster to review, not distort the underlying editorial meaning.

### Extraction Skills

These pull structured signals out of unstructured input.

Typical use:

- extract candidate entities from article text
- parse newsletter or email content into more structured units
- identify fields or fragments needed for later project logic

Extraction skills are often upstream of review because not every extracted result should be trusted automatically.

### Grouping And Editorial Synthesis Skills

These work over grouped or aggregated content rather than one isolated item.

Typical use:

- turn clustered content into theme suggestions
- produce human-readable section candidates or editorial summaries from related items

These skills usually depend on the quality of earlier relevance, deduplication, and extraction stages. If upstream stages are noisy, the group-level outputs will usually be noisy too.

## Inputs And Outputs

Good skills are defined as much by their contract as by their prompt wording.

In practice, that means each skill should have a clear answer to questions like:

- what inputs does it receive?
- what context is required for it to do useful work?
- what shape should its output take?
- what should happen if the model output is malformed or inconclusive?

Examples of useful inputs include:

- candidate text
- project topic or reference context
- precomputed similarity signals
- grouped content for synthesis-oriented tasks

Examples of useful outputs include:

- category labels
- numeric or bounded relevance judgments
- short summaries
- extracted candidate names or structured fields
- grouped editorial suggestions

The safer the output contract, the easier it is to validate the skill's behavior inside the broader system.

## Failure Behavior

Skill failures should be explicit and recoverable.

Common failure modes include:

- timeout or provider failure
- malformed output
- low-confidence result
- contradictory or unusable extraction

Good system behavior in those cases usually means one of three things:

- fall back to an algorithmic or simpler non-LLM path
- leave the item in a partially useful but recoverable state
- send the item into a review-oriented path

A failed skill should not make the rest of the workflow impossible to inspect.

## Skill Quality Depends On Upstream Context

Skills do not operate in a vacuum.

Their usefulness depends heavily on the quality of:

- the content entering the pipeline
- the project context supplied to the prompt
- upstream relevance and deduplication decisions
- the output contract expected by the calling stage

When a skill behaves poorly, the problem may be in the prompt itself, but it may also be in bad upstream inputs or an unrealistic contract.

## Skills And Review

Not every skill output should be treated as final truth.

Review is especially important when:

- the skill is extracting uncertain entities
- the skill is making a borderline judgment with downstream consequences
- the output is structurally valid but editorially questionable
- model behavior degraded and fallback logic is insufficient

This is why the review queue and skill system are closely related even though they are not the same subsystem.

## Skills And Observability

Skill behavior should be visible through the same observability layers used elsewhere in the system.

Useful signals include:

- which skill ran
- what stage invoked it
- whether it succeeded, failed, or degraded gracefully
- how often it needed fallback or review routing
- how its latency and failure rate changed over time

For the broader observability model, see [**Logging & Observability**](logging-and-observability.md).

## Debugging Skill Problems By Symptom

When a skill appears to be the issue, start with the symptom:

- **Wrong category labels**: inspect classification skill inputs and output constraints.
- **Borderline relevance feels off**: inspect the relevance tie-break skill and the similarity context it received.
- **Summaries are weak or misleading**: inspect summarization scope and whether irrelevant items were admitted upstream.
- **Too many noisy entities appear**: inspect extraction output quality and candidate-promotion boundaries.
- **Theme suggestions feel vague**: inspect grouped-content quality and upstream corpus cleanliness before blaming the synthesis prompt alone.

This approach is usually more productive than starting with the prompt text in isolation.

## Implementation Boundary

The exact prompt files, runtime loader behavior, model bindings, and invocation wrappers live in the separate application repo.

This page should therefore stay focused on:

- what a skill is
- which skill families exist conceptually
- how skills relate to pipeline stages
- what kind of input, output, and failure behavior is expected

If this page drifts into a brittle inventory of prompt paths or loader files that cannot be verified here, it will go stale quickly.

## What To Read Next

- [**Ingestion Pipeline**](pipeline.md): Use this to see where skills fit into the broader workflow.
- [**Core Algorithms**](algorithms.md): Use this when a skill is acting as a bounded layer on top of a relevance, deduplication, or trend-related algorithmic path.
- [**Logging & Observability**](logging-and-observability.md): Use this when you need to inspect skill failures, fallback behavior, or review routing.
- [**Glossary of Terms**](glossary.md): Use this when you need consistent language for skills, review queues, entities, and related workflow concepts.

If each skill stays bounded, observable, and easy to relate back to one stage of the pipeline, the AI layer remains much easier to debug and improve.
