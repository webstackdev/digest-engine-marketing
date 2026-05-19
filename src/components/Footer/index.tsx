import Image from "next/image";
import Link from "next/link";

import { PageSection } from "../Section";
import { Button } from "../shared/button";
import logo from "@/assets/images/logo.svg";
import { brand } from "@/lib/props";

const productLinks = [
  { href: "/tour", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/docs", label: "Docs" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/cookies", label: "Cookies" },
  { href: "/compliance", label: "Compliance" },
];

/**
 * Marketing site footer navigation.
 */
export function Footer() {
  return (
    <PageSection as="footer" id="marketing-footer" classes="my-6 py-6 sm:py-8 px-6 sm:px-12">
      <div className="grid gap-8 lg:grid-cols-[4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-5">
          <Link
            href="/"
            className="flex items-center gap-4 text-content-active no-underline"
          >
            <Image
              src={logo}
              alt={`${brand.name} logo`}
              className="h-14 w-14 shrink-0"
            />
            <div>
              <p className="m-0 text-lg font-semibold tracking-tight text-content-active">
                {brand.name}
              </p>
              <p className="m-0 text-sm text-content-offset">{brand.tagline}</p>
            </div>
          </Link>

          <p className="m-0 max-w-xl text-sm leading-7 text-content-offset sm:text-base">
            Train one project on your editorial taste and start each issue
            with a ranked shortlist, summaries, and a draft outline instead
            of a research scramble.
          </p>
        </div>

        <nav aria-label="Footer product links" className="flex flex-col gap-4">
          <p className="m-0 text-xs font-semibold uppercase tracking-widest text-content-active">
            Explore
          </p>
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {productLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-content-offset no-underline transition-colors hover:text-content-active"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer legal links" className="flex flex-col gap-4">
          <p className="m-0 text-xs font-semibold uppercase tracking-widest text-content-active">
            Legal
          </p>
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-content-offset no-underline transition-colors hover:text-content-active"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex w-full max-w-56 flex-col gap-3 justify-center lg:justify-self-center">
          <Button
            asChild
            className="h-11 w-full rounded-full px-5 text-sm font-semibold bg-primary transition-colors hover:bg-primary-offset"
          >
            <Link href="/signup">Start Your First Project</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="h-11 w-full rounded-full px-5 text-sm font-semibold bg-secondary transition-colors hover:bg-secondary/90"
          >
            <Link href="/docs">Read the docs</Link>
          </Button>
        </div>
      </div>
    </PageSection>
  );
}
