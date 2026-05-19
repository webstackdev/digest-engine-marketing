import type { Metadata } from "next";
import Link from "next/link";
import { Check, Minus } from "lucide-react";

import { CTA } from "@/components/HomePage/CTA";
import Pricing from "@/components/Pricing";
import { PageSection } from "@/components/Section";
import { Button } from "@/components/shared/button";
import { brand, CtaProps, PricingPageProps, PricingProps } from "@/lib/props";

export const metadata: Metadata = {
  title: `${brand.name} Pricing`,
  description: "Pricing, plan comparison, and rollout guidance for Digest Engine.",
};

export default function PricingPage() {
  const renderMatrixValue = (value: string) => {
    if (value === "Included") {
      return (
        <span className="inline-flex items-center gap-2 rounded-full border border-trim-offset bg-secondary px-3 py-1.5 text-sm font-semibold text-content-active">
          <Check aria-hidden="true" className="size-4 text-primary" />
          {value}
        </span>
      );
    }

    if (value === "Custom") {
      return (
        <span className="inline-flex items-center gap-2 rounded-full border border-trim-offset bg-page-offset px-3 py-1.5 text-sm font-semibold text-content-active">
          <Minus aria-hidden="true" className="size-4 text-content-offset" />
          {value}
        </span>
      );
    }

    return <span className="text-base leading-7 text-content-active">{value}</span>;
  };

  return (
    <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-5 pt-24 md:gap-6">
      <PageSection id="pricing-page-hero" classes="px-6 py-10 sm:px-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
          <div className="flex flex-col gap-6">
            <span className="w-fit rounded-full border border-trim-offset bg-page-base px-4 py-2 text-sm font-medium text-content-offset shadow-soft backdrop-blur-[18px]">
              {PricingPageProps.eyebrow}
            </span>

            <div className="space-y-5">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-primary sm:text-5xl lg:text-6xl">
                {PricingPageProps.title}
              </h1>

              <p className="max-w-2xl text-lg leading-8 text-content-active">
                {PricingPageProps.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                variant="default"
                size="lg"
                className="h-12 rounded-full bg-accent px-6 text-lg font-semibold text-primary-inverse transition-colors hover:bg-accent-offset"
              >
                <Link href="/signup">Start Your First Project</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-full px-6 text-lg font-semibold"
              >
                <Link href="/docs/reference/overview">Read the docs</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {PricingPageProps.highlights.map((highlight) => (
              <div
                key={highlight}
                className="rounded-3xl border border-trim-offset bg-page-base p-5 shadow-card backdrop-blur-[18px]"
              >
                <p className="text-base font-semibold tracking-tight text-content-active">
                  {highlight}
                </p>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      <Pricing {...PricingProps} />

      <PageSection id="pricing-matrix" classes="px-6 py-8 sm:px-8 sm:py-10">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-content-offset">
            Plan comparison
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-content-active sm:text-3xl">
            {PricingPageProps.matrixHeading}
          </h2>
          <p className="mt-3 text-base leading-7 text-content-offset">
            {PricingPageProps.matrixDescription}
          </p>
        </div>

        <div className="mt-8 overflow-x-auto border border-trim-offset bg-page-base shadow-card">
          <table aria-label="Pricing feature matrix" className="min-w-full table-fixed border-separate border-spacing-0 text-left">
            <colgroup>
              <col className="w-[28%]" />
              {PricingPageProps.matrixColumns.map((column) => (
                <col key={column} className="w-[18%]" />
              ))}
            </colgroup>
            <thead>
              <tr>
                <th
                  className="border-b border-trim-offset bg-page-base px-6 py-5 align-bottom text-sm font-semibold uppercase tracking-widest text-content-offset"
                  scope="col"
                >
                  Feature
                </th>
                {PricingPageProps.matrixColumns.map((column) => (
                  <th
                    key={column}
                    className="border-b border-trim-offset bg-page-base px-6 py-5 text-base font-semibold tracking-tight text-content-active sm:text-lg"
                    scope="col"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PricingPageProps.matrixRows.map((row, rowIndex) => (
                <tr
                  key={row.feature}
                  className={rowIndex % 2 === 0 ? "bg-page-base" : "bg-page-offset"}
                >
                  <th
                    className="border-b border-trim-offset px-6 py-5 align-top text-base font-semibold tracking-tight text-content-active last:border-b-0"
                    scope="row"
                  >
                    {row.feature}
                  </th>
                  {row.values.map((value, index) => (
                    <td
                      key={`${row.feature}-${index}`}
                      className="border-b border-trim-offset px-6 py-5 align-top text-base last:border-b-0"
                    >
                      {renderMatrixValue(value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection id="pricing-faq" classes="px-6 py-8 sm:px-8 sm:py-10">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-content-offset">
            FAQ
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-content-active sm:text-3xl">
            {PricingPageProps.faqHeading}
          </h2>
          <p className="mt-3 text-base leading-7 text-content-offset">
            {PricingPageProps.faqDescription}
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {PricingPageProps.faqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-3xl border border-trim-offset bg-page-base p-6 shadow-card"
            >
              <h3 className="text-xl font-semibold tracking-tight text-content-active">
                {faq.question}
              </h3>
              <p className="mt-3 text-base leading-7 text-content-offset">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </PageSection>

      <CTA {...CtaProps} />
    </main>
  );
}
