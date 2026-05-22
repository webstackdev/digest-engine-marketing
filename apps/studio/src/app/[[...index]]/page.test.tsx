import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("./AdminStudio", () => ({
  default: () => <div>Sanity Studio</div>,
}));

import StudioPage from "./page";

describe("StudioPage", () => {
  it("renders the Sanity Studio wrapper", () => {
    const markup = renderToStaticMarkup(<StudioPage />);

    expect(markup).toContain("Sanity Studio");
  });
});