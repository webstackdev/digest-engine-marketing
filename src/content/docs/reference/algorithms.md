# Core Algorithms

Use this page when you need the engine's decision logic in one place: what gets embedded, what gets ranked, what gets suppressed, what gets promoted, and why a project starts behaving differently over time.

This page is meant to describe the stable algorithmic behavior of Digest Engine, not every implementation detail. The authoritative runtime code lives in the separate application repo, so this document focuses on the logic contributors and operators need to reason about, debug, and tune.

## How To Read This Page

Most of the system's decision-making fits into one of these buckets:

- convert content into vectors
- compare new content against project-specific reference material
- use explicit editorial feedback to shift future ranking behavior
- track authority, trends, duplicates, and source concentration over time
- decide when uncertain extracted entities can be promoted automatically

If a result looks strange in production, the fastest debugging move is to identify which bucket is responsible before looking for a code-level explanation.

## Embeddings And Vector Space

Digest Engine turns candidate content into dense vector representations so it can compare meaning, not just exact keyword overlap.

At a high level:

- candidate text is embedded into vector space
- reference material for a project is embedded into the same space
- nearest-neighbor comparison is used to estimate semantic similarity

This algorithm is the foundation for relevance scoring, deduplication, and some downstream trend and clustering behavior.

The main global controls for this layer live in [**System Tunables & Configuration**](tunables.md), especially the embedding provider and model settings.

## Relevance Banding

Relevance is not decided by a single model call. The engine first uses vector similarity to sort incoming content into three broad bands:

1. **Clear match**: similarity is high enough that the item is treated as relevant without an LLM tie-break.
2. **Clear non-match**: similarity is low enough that the item is treated as irrelevant without extra inference.
3. **Ambiguous band**: similarity is plausible but not decisive, so an LLM-based relevance skill can break the tie.

This matters because it keeps the system efficient:

- obvious matches and obvious misses do not spend extra inference budget
- only borderline content pays the cost of a second opinion

The currently documented thresholds for this banding are described in [**System Tunables & Configuration**](tunables.md). The exact orchestration path may evolve as the runtime stack moves forward, but the three-band decision model is the important stable concept.

For the LLM-side tie-break behavior, see [**Skill Capabilities**](skills.md).

## Topic Centroid Feedback Loop

Projects do not stay static after initial setup. Explicit editorial feedback shifts the project's semantic center over time.

Conceptually, the engine maintains a project-level topic center derived from reference examples and reinforced or corrected by later feedback.

When editors repeatedly approve or reject content:

- accepted items pull the project representation toward that kind of content
- rejected items push the project representation away from that kind of content

This is why the same ingestion stream can start producing better rankings after a project has been used for a while, even if the raw source list has not changed.

The key practical outcome is that Digest Engine becomes more project-specific with use, rather than staying locked to its initial seed examples forever.

## Authority Scoring

Authority scoring estimates how important an entity is inside the context of a project, not just how often the entity appears on the internet.

Important signals typically include:

- how often an entity is mentioned
- whether it appears in sources the project already treats as important
- how recently those mentions occurred
- whether the mentions appear in substantive contexts rather than passing references

Authority should be thought of as a weighted, decaying influence signal.

That means:

- repeated recent mention in trusted content tends to raise authority
- older influence fades unless reinforced
- raw frequency alone is not enough to imply importance

This is one of the main reasons the engine can distinguish "commonly mentioned" from "editorially important."

## Deduplication

Deduplication tries to suppress content that is effectively the same item seen again through another path.

At a high level, the system compares new content against nearby existing items using embedding proximity and related duplicate-detection heuristics.

The goal is not only exact string matching. The more important question is whether the system has already seen materially the same content, such as:

- syndicated reposts
- lightly rewritten summaries of the same source
- repeated ingestion of the same newsletter-linked item

This keeps rankings, theme formation, and editorial review queues from being polluted by clones.

## Trend Velocity

Trend detection is about **acceleration**, not just raw volume.

The core idea is to compare a recent window against a baseline window and ask whether a topic is gaining energy faster than expected.

In plain terms:

- a topic with high volume but flat movement may be important, but not trending
- a topic with lower absolute volume but a sharp recent increase may be an emerging trend

This distinction is important because editorial teams usually want to spot movement early, not just confirm what has already become obvious.

## Source Diversity And Concentration

The engine also tracks how concentrated a project's intake is across sources.

This is less about ranking one item and more about guarding the health of the corpus. If most content comes from one source, one subreddit, one newsletter family, or one narrow publisher cluster, the project can start to overfit that viewpoint.

The diversity metric is therefore a concentration-risk signal:

- higher concentration means more caution is needed when interpreting themes and trends
- broader distribution makes rankings and trend signals more representative

You can think of this as a structural quality check on the incoming content mix.

## Entity Candidate Confidence

Entity extraction does not end when the LLM spots a possible person, company, product, or organization name. The system still has to decide whether that extracted fragment is trustworthy enough to promote automatically.

Confidence is typically shaped by signals such as:

- similarity to known aliases or existing tracked entities
- recurrence across multiple items
- contextual plausibility
- formatting and capitalization quality

Higher-confidence candidates may be promoted automatically. Lower-confidence ones are better held for review so the system does not pollute the tracked-entity graph with noisy fragments.

## How These Algorithms Work Together

The important thing is not any single formula in isolation. The engine behavior contributors actually see is produced by the interaction between these systems.

In a typical flow:

1. content is embedded
2. relevance banding decides whether it is obviously relevant, obviously irrelevant, or ambiguous
3. ambiguous cases may invoke an LLM skill
4. duplicate suppression removes clones
5. extracted entities feed authority and candidate-promotion logic
6. aggregated recent content contributes to trend and diversity signals
7. editor feedback shifts future project behavior

This is why debugging often requires looking across multiple layers rather than blaming a single score.

## Debugging By Symptom

When behavior looks wrong, use the symptom to pick the likely algorithm first:

- **Too many irrelevant items are getting through**: start with relevance banding, reference quality, and centroid drift.
- **Important items are being missed**: inspect reference examples, ambiguous-band behavior, and whether the project center has drifted too narrowly.
- **The same story keeps appearing**: inspect deduplication thresholds and ingestion-path duplication.
- **Themes feel stale or obvious**: inspect trend velocity and source concentration.
- **The wrong people or companies dominate entity views**: inspect authority signals, alias resolution, and candidate-promotion quality.

This framing usually gets you to the right root cause faster than jumping directly into individual prompts or low-level implementation details.

## Implementation Boundary

The runtime implementation of these algorithms lives in the separate application repo. That means this page should describe the logic and operator-facing behavior, while exact code paths, task wiring, or storage details should be maintained close to the runtime that ships.

The current migration toward Ninja and Taskiq changes how the system is served and orchestrated, but it does not change the high-level algorithm categories described here. Those remain the stable reference surface.

## What To Read Next

- [**Ingestion Pipeline**](pipeline.md): Use this to see where the algorithms are invoked inside the broader processing flow.
- [**Skill Capabilities**](skills.md): Use this when a relevance, extraction, or summarization decision depends on an LLM prompt.
- [**System Tunables & Configuration**](tunables.md): Use this when you need the thresholds, provider settings, or runtime controls that influence algorithm behavior.

If you understand which of these algorithms is making the decision you are looking at, most debugging and tuning work becomes much more tractable.
