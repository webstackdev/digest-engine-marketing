"use client";
import * as Sentry from "@sentry/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import notFoundImage from "@/assets/images/404.jpg";

const recoveryLinks = [
  {
    href: "/tour",
    label: "How It Works",
    description: "Walk back through the product tour while the failed route reloads in a fresh tab or session.",
  },
  {
    href: "/pricing",
    label: "Pricing",
    description: "Double-check the hosted and self-managed rollout paths if that is where you were headed.",
  },
  {
    href: "/docs",
    label: "Docs",
    description: "Open the current docs set for setup guidance, product notes, and implementation details.",
  },
  {
    href: "/signup",
    label: "Sign Up",
    description: "Return to the evaluation flow if you were trying to request access or start a rollout conversation.",
  },
];

/**
 * Renders the top-level fallback UI for uncaught App Router errors.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className='bg-page-base px-4 text-content-active'>
        <GlobalErrorContent error={error} reset={reset} />
      </body>
    </html>
  );
}

type GlobalErrorContentProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

/**
 * Renders the branded recovery UI and reports the failure to Sentry.
 */
export function GlobalErrorContent({
  error,
  reset,
}: GlobalErrorContentProps) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <main className='mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 pb-16 pt-32 sm:pt-36'>
      <section className='grid w-full gap-8 rounded-[2rem] border border-trim-offset bg-page-base p-6 shadow-card-strong lg:grid-cols-[1.1fr_0.9fr] lg:p-8'>
        <div className='relative min-h-96 overflow-hidden rounded-[1.5rem] border border-trim-offset bg-page-offset'>
          <Image
            src={notFoundImage}
            alt='Digest Engine error illustration'
            priority
            fill
            sizes='(min-width: 1024px) 50vw, 100vw'
            className='h-full w-full object-cover'
          />
        </div>

        <div className='flex flex-col justify-center gap-6 text-left'>
          <div className='space-y-4'>
            <p className='text-sm font-semibold uppercase tracking-widest text-primary'>
              Error
            </p>
            <h1 className='text-4xl font-semibold tracking-tight text-content-active sm:text-5xl'>
              Digest Engine hit an unexpected problem
            </h1>
            <p className='max-w-2xl text-base leading-7 text-content-offset sm:text-lg'>
              We logged the failure for review. You can retry this route now, head back to the homepage, or use one of the main site paths below.
            </p>
            {error.digest ? (
              <p className='rounded-2xl border border-trim-offset bg-page-offset px-4 py-3 text-sm text-content-offset'>
                Reference: {error.digest}
              </p>
            ) : null}
          </div>

          <div className='grid gap-4 sm:grid-cols-2'>
            {recoveryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='rounded-3xl border border-trim-offset bg-page-offset px-5 py-5 text-left no-underline transition-colors hover:border-content-offset hover:bg-background'
              >
                <p className='m-0 text-lg font-semibold tracking-tight text-content-active'>
                  {link.label}
                </p>
                <p className='mt-2 text-sm leading-6 text-content-offset'>{link.description}</p>
              </Link>
            ))}
          </div>

          <div className='flex flex-col gap-3 sm:flex-row'>
            <button
              type='button'
              onClick={reset}
              className='rounded-full bg-secondary px-5 py-3 text-sm font-medium text-content-active transition-colors hover:bg-accent'
            >
              Try again
            </button>
            <Link
              href='/'
              className='rounded-full border border-trim-offset px-5 py-3 text-center text-sm font-medium text-content-active transition-colors hover:border-content-offset hover:bg-background'
            >
              Return home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
