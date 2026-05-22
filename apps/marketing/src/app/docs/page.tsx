import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Orbit, PanelsTopLeft, ShieldCheck } from "lucide-react";

import { PageSection } from "@/components/Section";
import { Button } from "@/components/shared/button";
import { brand } from "@/lib/props";

const docsHighlights = [
  {
    title: "User Guide",
    description: "Start with the day-to-day workflow for projects, sources, queues, and the editorial loop inside Digest Engine.",
    icon: PanelsTopLeft,
    href: "/docs/user-guide/overview",
  },
  {
    title: "Developer Guide",
    description: "Understand how ingestion, ranking, review queues, and drafting fit together before you wire the system into your stack.",
    icon: Orbit,
    href: "/docs/developer-guide/overview",
  },
  {
    title: "Reference",
    description: "Use the deeper MDX docs for implementation details while this landing page stays focused on orientation and navigation.",
    icon: BookOpen,
    href: "/docs/reference/overview",
  },
  {
    title: "Admin Guide",
    description: "Go straight to installation, configuration, operations, and access management when you are running the platform.",
    icon: ShieldCheck,
    href: "/docs/admin-guide/overview",
  },
] as const;

export const metadata: Metadata = {
  title: `${brand.name} Docs`,
  description: "Product documentation, implementation notes, and architecture guidance for Digest Engine.",
};

export default function DocsHomePage() {
  return (
    <main className="relative mx-auto flex w-full flex-col gap-5 pt-24 md:gap-6">
      <PageSection id="docs-home" classes="px-6 py-10 sm:px-10 sm:py-12">
        <div className="flex flex-col gap-6">
          <span className="w-fit rounded-full bg-secondary px-4 py-2 font-medium text-content-inverse">
            Documentation
          </span>

          <div className="space-y-5">
            <h1 className="text-wrap text-4xl sm:text-5xl font-semibold tracking-tight text-secondary">
              A dedicated docs landing page for the builders using {brand.name}.
            </h1>

            <p className="text-lg leading-8 text-content-active">
              This route is now a custom entry point instead of the root MDX document, so you can style /docs separately from the deeper reference pages.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
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
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {docsHighlights.map(({ title, description, icon: Icon, href }) => (
            <Link
              key={title}
              href={href}
              className="block rounded-3xl border border-trim-offset bg-page-offset p-6 shadow-card transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-card-strong"
            >
              <article>
                <div className="flex justify-start">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-trim-offset bg-secondary text-content-inverse shadow-soft">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h2 className="pt-2 pl-4 text-2xl font-semibold tracking-tight text-secondary">{title}</h2>
                </div>
                <p className="mtext-base leading-7 text-content-active">{description}</p>
              </article>
            </Link>
          ))}
        </div>
      </PageSection>
    </main>
  );
}
