import { useMDXComponents as getNextraComponents } from "nextra-theme-docs";
import type { MDXComponents } from "mdx/types";

import { cn } from "@/lib/utils";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...getNextraComponents(),
    ...components,
    // Add custom classes to standard Markdown tags
    h1: ({ children, ...props }) => (
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-secondary" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="pt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-secondary" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="pt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-secondary" {...props}>
        {children}
      </h3>
    ),
    a: ({ children, className, ...props }) => (
      <a
        className={cn(
          "font-medium text-content-active underline decoration-dotted decoration-current underline-offset-4 transition-colors hover:text-primary",
          className,
        )}
        {...props}
      >
        {children}
      </a>
    ),
    ul: ({ children, ...props }) => (
      <ul className="my-6 ml-6 list-disc space-y-2 marker:text-content-offset text-content" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="my-6 ml-6 list-decimal space-y-2 marker:text-content-offset text-content" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="leading-7" {...props}>
        {children}
      </li>
    ),
  }
}

