// @vitest-environment jsdom

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DocsPageSidebar } from "./index";

describe("DocsPageSidebar", () => {
  it("renders file navigation as a single-open accordion and normalizes section labels", () => {
    const { container } = render(
      <DocsPageSidebar
        currentPath="/docs/admin-guide/configuration"
        navigation={[
          {
            title: "admin-guide",
            items: [
              { title: "Overview", href: "/docs/admin-guide/overview" },
              { title: "Configuration", href: "/docs/admin-guide/configuration" },
            ],
          },
          {
            title: "reference",
            items: [
              { title: "Overview", href: "/docs/reference/overview" },
              { title: "Glossary", href: "/docs/reference/glossary" },
            ],
          },
        ]}
        toc={[
          { depth: 2, id: "how-it-works", value: "How it works" },
        ]}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Files" }));

    const adminGuideSection = screen.getByText("admin guide").closest("details");
    const referenceSection = screen.getByText("reference").closest("details");

    expect(screen.getByRole("button", { name: "Table of Contents" })).toBeTruthy();
    expect(adminGuideSection?.hasAttribute("open")).toBe(true);
    expect(referenceSection?.hasAttribute("open")).toBe(false);
    expect(container.innerHTML.includes('href="/docs/admin-guide/configuration"')).toBe(true);

    fireEvent.click(screen.getByText("reference"));

    expect(referenceSection?.hasAttribute("open")).toBe(true);
    expect(adminGuideSection?.hasAttribute("open")).toBe(false);
  });
});
