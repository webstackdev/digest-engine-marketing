import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { defaultPricingPageContent } from "@/sanity/queries/pricingPage";

vi.mock("@/sanity/queries/pricingPage", () => ({
  defaultPricingPageContent: {
    metadata: {
      title: "Digest Engine Pricing",
      description: "Pricing, plan comparison, and rollout guidance for Digest Engine.",
    },
    hero: {
      eyebrow: "Pricing",
      title: "Pricing that fits the way your newsroom actually works",
      description:
        "Start with the open-source stack, move into a shared editorial workspace, or hand off the infrastructure entirely. Every tier keeps the project-scoped workflow intact so you do not have to relearn the product as you grow.",
      primaryAction: {
        text: "Start Your First Project",
        link: "/signup",
      },
      secondaryAction: {
        text: "Read the docs",
        link: "/docs/reference/overview",
      },
    },
    highlightsSection: {
      items: ["Open source foundation"],
    },
    matrixSection: {
      heading: "Compare plans at a glance",
      description:
        "Use this matrix as a starting point for evaluation. We can tune packaging and limits later, but these examples show how the plans differ in practice.",
      columns: ["Open Source", "Team", "Hosted", "Enterprise"],
      rows: [
        {
          feature: "Deployment",
          values: ["Self-hosted", "Shared cloud", "Managed hosting", "Private cloud or on-prem"],
        },
      ],
    },
    faqSection: {
      heading: "Pricing FAQ",
      description:
        "These are the questions most teams ask before choosing a plan. We can refine the details once you decide how hands-on you want to be.",
      items: [
        {
          question: "Can we start open source and upgrade later?",
          answer:
            "Yes. The workflow stays consistent across plans, so teams can start self-hosted and move into Team, Hosted, or Enterprise when they want less operational overhead.",
        },
      ],
    },
    ctaSection: {
      eyebrow: "Start your first project",
      title: "Turn scattered feeds into a shortlist you can trust.",
      description:
        "Connect the sources you already trust, train one project on your editorial taste, and let the next issue start with ranked content, summaries, and a draft outline instead of a pile of tabs.",
      badges: ["Project-scoped ranking"],
      primaryAction: {
        text: "Start Your First Project",
        link: "/signup",
      },
      highlights: [
        {
          step: "01",
          title: "Rank the signal",
          description:
            "Pull your sources into one project and get a shortlist shaped by what your editorial team actually trusts.",
        },
      ],
    },
  },
  getPricingPageContent: vi.fn(),
}));

import { getPricingPageContent } from "@/sanity/queries/pricingPage";

import PricingPage from "./page";

describe("PricingPage", () => {
  beforeEach(() => {
    vi.mocked(getPricingPageContent).mockResolvedValue(defaultPricingPageContent);
  });

  it("renders the pricing route with Sanity-backed comparison and faq sections", async () => {
    const markup = renderToStaticMarkup(await PricingPage());

    expect(markup).toContain("Pricing that fits the way your newsroom actually works");
    expect(markup).toContain('aria-label="Pricing feature matrix"');
    expect(markup).toContain("Compare plans at a glance");
    expect(markup).toContain("Open Source");
    expect(markup).toContain("Enterprise");
    expect(markup).toContain("Pricing FAQ");
    expect(markup).toContain('href="/signup"');
  });
});
