import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { TourPageProps } from "@/lib/props";

import TourPage from "./page";

describe("TourPage", () => {
  it("renders the tour route with workflow and capabilities sections", () => {
    const markup = renderToStaticMarkup(<TourPage />);

    expect(markup).toContain(TourPageProps.heroEyebrow);
    expect(markup).toContain(TourPageProps.workflowTitle);
    expect(markup).toContain(TourPageProps.capabilities[0].title);
    expect(markup).toContain(`href="${TourPageProps.primaryAction.link}"`);
    expect(markup).toContain(`href="${TourPageProps.capabilitiesLink.link}"`);
  });
});
