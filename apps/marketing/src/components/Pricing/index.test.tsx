// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import type { IPricingProps } from "@/lib/types";

import Pricing from "./index";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

const pricingProps: IPricingProps = {
  title: "Pricing that grows with your workflow",
  description: "A short pricing summary.",
  annualDiscount: 20,
  plans: [
    {
      name: "Open Source",
      monthlyPrice: 0,
      description: "Self-hosted plan.",
      features: ["Unlimited projects", "Community support"],
      link: "https://github.com/webstackdev/digest-engine",
      buttonLabel: "Start self-hosting",
      buttonVariant: "outline",
      isPopular: false,
    },
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
};

describe("Pricing", () => {
  it("renders plan CTAs with the configured destinations", () => {
    render(<Pricing {...pricingProps} />);

    const openSourceLink = screen.getByRole("link", {
      name: pricingProps.plans[0].buttonLabel,
    });
    const hostedLink = screen.getByRole("link", {
      name: pricingProps.plans[1].buttonLabel,
    });

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: pricingProps.title,
      }),
    ).toBeInTheDocument();
    expect(openSourceLink).toHaveAttribute(
      "href",
      "https://github.com/webstackdev/digest-engine",
    );
    expect(hostedLink).toHaveAttribute("href", "/signup");
  });

  it("updates plan pricing when the billing cadence changes", async () => {
    const user = userEvent.setup();

    render(<Pricing {...pricingProps} />);

    expect(screen.queryAllByText("$399").length).toBeGreaterThan(0);
    expect(screen.queryAllByText("$319")).toHaveLength(0);

    await user.click(screen.getAllByRole("button", { name: /yearly/i })[0]);

    expect(screen.queryAllByText("$319").length).toBeGreaterThan(0);
  });
});