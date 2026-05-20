# Projects and Content

This page explains the core workspace inside Digest Engine: the project and the content library that feeds it. If your team spends most of its time reviewing incoming articles, deciding what matters, and shaping the system's recommendations, this is the part of the product you will return to most often.

## What a Project Is

A **project** is the home for one editorial focus. In practice, that usually means one newsletter, publication theme, research stream, or topic area.

Each project keeps its own:

- content feed
- sources and intake settings
- team members and roles
- feedback history
- AI understanding of what is relevant to that topic

That separation matters. If one project is focused on developer tooling and another is focused on healthcare AI, each project learns from its own content and feedback instead of mixing those signals together.

## How Content Gets Into a Project

Your content library fills up from the sources and intake channels connected to the project. That can include imported articles, posts, and links extracted from newsletters that were forwarded into the system.

As new items arrive, Digest Engine analyzes them and adds metadata that helps your team review them quickly. Depending on the item, that can include:

- a category
- a relevance score
- a generated summary
- source information
- detected entities such as people, companies, or products

If you have not connected any sources yet, start with [Newsletter Intake](newsletter-intake.md) or your other project source settings before expecting the content library to populate.

## Using the Content Library

The content library is the working queue for your team. Think of it as the place where raw incoming material becomes editorially useful.

Most teams use it in a simple loop:

1. Review newly arrived items.
2. Filter down to the categories or score ranges that matter most.
3. Open promising items to inspect the summary and source details.
4. Give feedback on the strongest and weakest matches.
5. Move the best material into themes, drafts, or later editorial review.

## Filtering the Feed

As your project gathers more content, filters become the fastest way to focus your review time.

- Use the **Category** filter when you want to isolate a type of content, such as news, tutorials, or analysis.
- Use the **Relevance** controls when you want to hide weaker matches and focus on items that are more likely to fit the project.
- Revisit filters often during editorial review. A broad scan and a narrow, high-relevance scan usually serve different purposes.

For example, a broad scan can help you spot unexpected stories worth keeping, while a narrow scan is better when you are actively assembling a draft or looking for the strongest material first.

## Understanding Relevance Scores

Every content item receives a relevance score that estimates how well it fits the project's editorial focus.

In practical terms:

- **Low scores** usually mean the item is weakly related or off-topic.
- **High scores** usually mean the item is a strong match for the project.
- **Middle-range scores** often mean the item is plausible but needs editorial judgment.

You should treat the score as a prioritization tool, not a final decision. High-scoring items still need human review, and mid-scoring items can sometimes become excellent picks if they add diversity, timeliness, or a new perspective.

If you want the technical explanation for how scoring works, see [Algorithms](../reference/algorithms.md).

## Opening an Item for Review

When you open a content item, you can inspect the details that support an editorial decision. A typical item view may include:

- the original title and source
- a summary of the item
- metadata from ingestion
- extracted entities mentioned in the content
- the current relevance assessment

This is where editors usually decide whether an item is worth saving, promoting, ignoring, or using as a signal for future tuning.

## Giving Feedback That Improves Results

Feedback is one of the most important actions you can take in the content library.

When you mark an item as a strong fit or a poor fit, you are doing more than organizing today's queue. You are also giving the system a clearer picture of what belongs in this project.

Use positive feedback for items that truly represent the kind of content you want more of. Use negative feedback for items that look close on the surface but are not actually useful for this audience.

The best feedback is specific and selective:

- mark up the content that is an excellent example of your project's focus
- mark down content that is clearly not right for the project
- avoid giving casual approval to items that are only "good enough"

That discipline helps the system learn a sharper editorial boundary over time.

## How Feedback Changes Future Ranking

As feedback accumulates, Digest Engine uses it to refine how future items are ranked inside the project. In plain terms, the system gets better at recognizing the types of stories, sources, and themes that match your editorial intent.

That does not mean every score changes instantly for everything you have already reviewed. Instead, your feedback helps shape how new and newly processed content is evaluated going forward.

If you want to understand that process in more detail, continue to [Feedback and Tuning](feedback-and-tuning.md).

## What Good Workflow Looks Like

Teams usually get the best results when they treat the content library as an ongoing editorial workflow rather than a one-time inbox cleanup.

- Review new items regularly instead of letting the queue grow unchecked.
- Use filters to separate quick scanning from deeper editorial review.
- Give feedback on the clearest good and bad matches.
- Revisit strong items when building [Newsletter Drafts](newsletter-drafts.md).
- Watch for recurring entities and topics that may become more important over time in [Entities and Authority](entities-and-authority.md) and [Themes and Trends](themes-and-trends.md).

Once this workflow becomes routine, the project starts to feel less like a raw feed and more like an editorial system that is tuned to your team's judgment.
