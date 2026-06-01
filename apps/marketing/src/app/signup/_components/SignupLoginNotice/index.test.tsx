// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const { useSearchParams } = vi.hoisted(() => ({
  useSearchParams: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useSearchParams,
}));

import SignupLoginNotice from ".";

describe("SignupLoginNotice", () => {
  afterEach(() => {
    cleanup();
    useSearchParams.mockReset();
  });

  it("renders the missing-account notice for fake login redirects", () => {
    useSearchParams.mockReturnValue(new URLSearchParams("login=missing-account"));

    render(<SignupLoginNotice />);

    expect(screen.getByRole("status")).toHaveTextContent(
      "We couldn't find your account. Would you like to sign up?",
    );
  });

  it("renders nothing when signup is opened directly", () => {
    useSearchParams.mockReturnValue(new URLSearchParams(""));

    const { container } = render(<SignupLoginNotice />);

    expect(container).toBeEmptyDOMElement();
  });
});