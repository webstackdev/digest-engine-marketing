import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { defaultPricingComponentContent } from "@/sanity/queries/pricingComponent";

vi.mock("@/sanity/queries/pricingComponent", () => ({
  defaultPricingComponentContent: {
    title: "Pick the operating model that fits your stack",
    description:
      "Start open source, move to a hosted workflow later, or keep the whole pipeline in your own infrastructure from day one.",
    annualDiscount: 20,
    plans: [
      {
        name: "Hosted",
        monthlyPrice: 399,
        description: "Managed plan.",
        features: ["Managed upgrades", "Email support"],
        link: "/signup",
        buttonLabel: "Join waitlist",
        buttonVariant: "default",
        isPopular: true,
      },
    ],
  },
  getPricingComponentContent: vi.fn(),
}));

import { getPricingComponentContent } from "@/sanity/queries/pricingComponent";

import Home from "./page";

describe("Marketing home page", () => {
  beforeEach(() => {
    vi.mocked(getPricingComponentContent).mockResolvedValue(defaultPricingComponentContent);
  });

  it("renders the Digest Engine landing page sections in the expected order", async () => {
    const markup = renderToStaticMarkup(await Home());
    const featuresIndex = markup.indexOf('id="features"');
    //const clientsIndex = markup.indexOf('id="clients"');
    const pricingIndex = markup.indexOf('id="pricing"');
    const faqIndex = markup.indexOf('id="faq"');
    const ctaIndex = markup.indexOf('id="cta"');

    expect(markup).toContain("pt-24");
    expect(markup).toContain("The research desk for your newsletter");
    expect(markup).toContain("Why Digest Engine feels different");
    expect(markup).toContain("Pick the operating model that fits your stack");
    expect(markup).toContain("Questions teams ask before they trust this with their workflow");
    expect(markup).toContain('aria-label="Homepage call to action"');
    //expect(clientsIndex).toBeGreaterThan(-1);
    expect(featuresIndex).toBeGreaterThan(-1);
    //expect(featuresIndex).toBeGreaterThan(clientsIndex);
    expect(pricingIndex).toBeGreaterThan(featuresIndex);
    expect(faqIndex).toBeGreaterThan(pricingIndex);
    expect(ctaIndex).toBeGreaterThan(faqIndex);
  });
});