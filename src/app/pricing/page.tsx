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
        <span className="inline-flex items-center gap-2 rounded-full border border-trim-offset bg-secondary px-3 py-1.5 text-sm font-semibold text-secondary-inverse">
          <Check aria-hidden="true" className="size-4 text-secondary-inverse" />
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
            <span className="w-fit rounded-full border border-trim-offset bg-secondary px-8 py-2 font-medium text-content-inverse">
              {PricingPageProps.eyebrow}
            </span>

            <div className="space-y-5">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-secondary sm:text-5xl lg:text-6xl">
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
                variant="secondary"
                size="lg"
                className="h-12 rounded-full px-6 text-lg font-semibold"
              >
                <Link href="/docs/reference/overview">Read the docs</Link>
              </Button>
            </div>
          </div>

          <div className=" h-full flex flex-col justify-center gap-8">
            {PricingPageProps.highlights.map((highlight) => (
              <div
                key={highlight}
                className="flex justify-center rounded-3xl bg-page-active p-5"
              >
                <p className="text-lg text-content-active font-semibold tracking-tight">
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
          <h2 className="text-3xl sm:text-4xl text-secondary font-semibold tracking-tight">
            {PricingPageProps.matrixHeading}
          </h2>
          <p className="mt-3 text-base leading-7 text-content-offset">
            {PricingPageProps.matrixDescription}
          </p>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table aria-label="Pricing feature matrix" className="min-w-full table-fixed border-collapse text-left">
            <colgroup>
              <col className="w-[34%] sm:w-[28%]" />
              {PricingPageProps.matrixColumns.map((column) => (
                <col key={column} className="w-[22%] sm:w-[18%]" />
              ))}
            </colgroup>
            <thead>
              <tr className="border-b border-trim-offset">
                <th
                  className="p-0 align-middle text-sm font-semibold uppercase tracking-widest text-primary"
                  scope="col"
                >
                  <div className="py-4 sm:py-6 pl-4 sm:pl-6 pr-4 sm:pr-6">
                    Feature
                  </div>
                </th>
                {PricingPageProps.matrixColumns.map((column) => (
                  <th
                    key={column}
                    className="p-0 text-center text-base font-semibold tracking-tight text-content-active sm:text-lg align-middle"
                    scope="col"
                  >
                    <div className="py-4 sm:py-6 px-4 sm:px-6">
                      {column}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-trim-offset">
              {PricingPageProps.matrixRows.map((row) => (
                <tr key={row.feature}>
                  <th
                    className="p-0 align-middle text-base font-semibold tracking-tight text-primary"
                    scope="row"
                  >
                    <div className="py-4 sm:py-6 pl-4 sm:pl-6 pr-4 sm:pr-6">
                      {row.feature}
                    </div>
                  </th>
                  {row.values.map((value, index) => (
                    <td
                      key={`${row.feature}-${index}`}
                      className="p-0 text-center align-middle text-base font-semibold tracking-tight text-primary"
                    >
                      <div className="py-4 sm:py-6 px-4 sm:px-6">
                        {renderMatrixValue(value)}
                      </div>
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
          <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-secondary">
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
              <h3 className="text-xl font-semibold tracking-tight text-secondary">
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
