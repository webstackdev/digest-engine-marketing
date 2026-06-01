"use client";

import { useState } from "react";
import Link from "next/link";

import type { ConsentComponentContent } from "@/sanity/queries/consentComponent";
import {
  CONSENT_STORAGE_KEY,
  readConsentPreferences,
  writeConsentPreferences,
} from "@/lib/marketingConsent";

export { CONSENT_STORAGE_KEY };

function getInitialIsOpen() {
  if (typeof window === "undefined") {
    return false;
  }

  return readConsentPreferences() === null;
}

interface ConsentProps {
  content: ConsentComponentContent;
}

/**
 * Presents a site-wide cookie consent banner and stores preferences in local storage.
 */
export function Consent({ content }: ConsentProps) {
  const [isOpen, setIsOpen] = useState(getInitialIsOpen);

  const {
    badge,
    title,
    description,
    essentialOption,
    marketingOption,
    policyLink,
    essentialOnlyButtonText,
    acceptAllButtonText,
  } = content;

  const handleEssentialOnly = () => {
    writeConsentPreferences(false);
    setIsOpen(false);
  };

  const handleAcceptAll = () => {
    writeConsentPreferences(true);
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 p-4">
      <div
        role="dialog"
        aria-labelledby="cookie-consent-title"
        className="pointer-events-auto mx-auto w-full bg-page-base p-6 sm:p-8"
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end">
          <div className="space-y-4">
            <span className="inline-flex rounded-full border border-trim-offset bg-background px-4 py-2 text-sm font-medium text-content-offset">
              {badge}
            </span>

            <div className="space-y-3">
              <h2
                id="cookie-consent-title"
                className="text-2xl font-semibold tracking-tight text-content-active sm:text-3xl"
              >
                {title}
              </h2>
              <p className="max-w-3xl text-base leading-7 text-content-offset">
                {description}
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <Link
                href={policyLink.href}
                className="text-sm font-semibold text-content-active no-underline transition-colors hover:text-content-offset"
              >
                {policyLink.label}
              </Link>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleEssentialOnly}
                  className="inline-flex items-center justify-center rounded-full border border-trim-offset px-5 py-3 text-base font-semibold text-content-active transition-colors hover:text-content-offset"
                >
                  {essentialOnlyButtonText}
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-base font-semibold text-primary-inverse transition-colors hover:bg-accent-offset"
                >
                  {acceptAllButtonText}
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-3xl border border-trim-offset bg-background p-4">
              <p className="text-sm font-semibold uppercase tracking-widest text-content-offset">
                {essentialOption.eyebrow}
              </p>
              <p className="mt-2 text-base font-semibold text-content-active">{essentialOption.status}</p>
              <p className="mt-2 text-sm leading-6 text-content-offset">
                {essentialOption.description}
              </p>
            </div>

            <div className="rounded-3xl border border-trim-offset bg-background p-4">
              <p className="text-sm font-semibold uppercase tracking-widest text-content-offset">
                {marketingOption.eyebrow}
              </p>
              <p className="mt-2 text-base font-semibold text-content-active">{marketingOption.status}</p>
              <p className="mt-2 text-sm leading-6 text-content-offset">
                {marketingOption.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
