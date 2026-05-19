// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";

import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Footer } from "./index";

vi.mock("next/image", () => ({
  default: ({ alt, className, src }: { alt: string; className?: string; src: string | { src: string } }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} className={className} src={typeof src === "string" ? src : src.src} />
  ),
}));

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("Footer", () => {
  it("renders brand, navigation groups, and legal links", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    const productNav = within(footer).getByRole("navigation", {
      name: "Footer product links",
    });
    const legalNav = within(footer).getByRole("navigation", {
      name: "Footer legal links",
    });

    expect(footer).toHaveAttribute("id", "marketing-footer");
    expect(within(footer).getByRole("img", { name: "Digest Engine logo" })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: "Start Your First Project" })).toHaveAttribute("href", "/signup");
    expect(within(productNav).getByRole("link", { name: "How It Works" })).toHaveAttribute("href", "/tour");
    expect(within(productNav).getByRole("link", { name: "Docs" })).toHaveAttribute("href", "/docs");
    expect(within(legalNav).getByRole("link", { name: "Privacy" })).toHaveAttribute("href", "/privacy");
    expect(within(legalNav).getByRole("link", { name: "Compliance" })).toHaveAttribute("href", "/compliance");
  });
});
