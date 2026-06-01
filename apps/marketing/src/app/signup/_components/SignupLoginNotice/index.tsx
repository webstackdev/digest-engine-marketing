"use client";

import { useSearchParams } from "next/navigation";

/**
 * Shows the missing-account notice after the fake login route redirects to signup.
 */
export default function SignupLoginNotice() {
  const searchParams = useSearchParams();

  if (searchParams.get("login") !== "missing-account") {
    return null;
  }

  return (
    <p
      role="status"
      className="w-fit rounded-2xl border border-trim-offset bg-danger-offset px-4 py-3 text-sm font-medium text-content-inverse shadow-card"
    >
      We couldn&apos;t find your account. Would you like to sign up?
    </p>
  );
}