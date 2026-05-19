"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Button } from "@/components/shared/button";
import { cn } from "@/lib/utils";
import { PageSection } from "../Section";
import { IPricingProps } from "@/lib/types";

const Pricing: React.FC<IPricingProps> = ({
  title,
  description,
  plans,
  annualDiscount,
}) => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <PageSection id="pricing" classes="px-6 py-8 sm:px-8 sm:py-10">
      <div className="flex flex-col gap-1 mb-4">
        <div className="flex items-start justify-between gap-4">
          <h2 className="min-w-0 flex-1 font-semibold tracking-tight text-4xl sm:text-5xl text-secondary">
            {title}
          </h2>
          <div
            className={cn(
              "relative shrink-0 self-start flex items-center gap-3 rounded-full border border-trim-offset bg-page-base px-2 py-2 shadow-soft backdrop-blur-[18px]",
            )}
          >
            <button
              type="button"
              className={cn(
                "relative flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors",
                isYearly ? "text-primary" : "text-content-offset",
              )}
              onClick={() => setIsYearly(true)}
            >
              {isYearly && (
                <span className="absolute inset-0 -z-10 rounded-full border border-trim-offset bg-secondary shadow-soft backdrop-blur-[18px]" />
              )}
              Yearly
              <span className="text-primary">
                Save {annualDiscount}%
              </span>
            </button>
            <button
              type="button"
              className={cn(
                "relative flex items-center rounded-full px-5 py-2 text-sm font-semibold transition-colors",
                !isYearly ? "text-content-active" : "text-content-offset",
              )}
              onClick={() => setIsYearly(false)}
            >
              {!isYearly && (
                <span className="absolute inset-0 -z-10 rounded-full border border-trim-offset bg-secondary shadow-soft backdrop-blur-[18px]" />
              )}
              Monthly
            </button>
          </div>
        </div>
        <p className="mt-3 text-base leading-7 text-primary">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        {plans.map((plan) => {
          const buttonClass = plan.isPopular
            ? "text-primary-inverse bg-primary hover:bg-primary"
            : "border-trim-offset text-primary backdrop-blur-[18px] bg-secondary hover:bg-page-base";

          return (
            <div
              key={plan.name}
              className={cn(
                "flex h-full flex-col gap-8 rounded-4xl border p-7 transition-transform duration-200 hover:-translate-y-1 sm:p-8",
                plan.isPopular
                  ? "border-accent-offset bg-page-base shadow-soft"
                  : "border-trim-offset bg-page-base",
              )}
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold uppercase tracking-widest text-content-offset">
                      {plan.name}
                    </p>
                    {plan.isPopular && (
                      <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-primary">
                        Popular
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-4xl font-semibold tracking-tight text-content-active">
                      $
                      {isYearly
                        ? Math.round(
                            plan.monthlyPrice * (1 - annualDiscount / 100),
                          )
                        : plan.monthlyPrice}
                      <span className="text-base font-medium text-content-offset">
                        /mo
                      </span>
                    </h3>
                  </div>
                </div>

                <p className="leading-7 text-content-offset">
                  {plan.description}
                </p>

                <div>
                  <ul className="mt-4 space-y-3">
                    {plan.features.map((feature) => {
                      const [value, ...rest] = feature.split(" ");
                      return (
                        <li key={feature} className="flex items-start gap-3">
                          <svg
                            className="mt-1 h-4 w-4 shrink-0 text-primary"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 111.414-1.414L8.75 11.586l6.543-6.543a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-content-offset">
                            <span className="font-semibold text-content-active">
                              {value}
                            </span>{" "}
                            {rest.join(" ")}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <Button
                asChild
                variant={plan.buttonVariant}
                className={cn(
                  "mt-auto h-12 w-full rounded-full border-transparent text-base font-semibold transition-colors",
                  buttonClass,
                )}
              >
                <Link href={plan.link}>{plan.buttonLabel}</Link>
              </Button>
            </div>
          );
        })}
      </div>
    </PageSection>
  );
};
export default Pricing;
