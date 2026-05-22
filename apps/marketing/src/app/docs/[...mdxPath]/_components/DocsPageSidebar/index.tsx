"use client";

import Link from "next/link";
import { useState } from "react";

import { cn } from "@/lib/utils";

type Heading = {
  depth: 2 | 3 | 4 | 5 | 6;
  value: string;
  id: string;
};

export type DocsSidebarItem = {
  title: string;
  href?: string;
  children?: DocsSidebarItem[];
};

export type DocsSidebarSection = {
  title: string;
  items: DocsSidebarItem[];
};

type Props = {
  currentPath: string;
  navigation: DocsSidebarSection[];
  toc: Heading[];
};

function itemMatchesPath(items: DocsSidebarItem[], currentPath: string): boolean {
  return items.some((item) => {
    if (item.href === currentPath) {
      return true;
    }

    if (item.children?.length) {
      return itemMatchesPath(item.children, currentPath);
    }

    return false;
  });
}

function findOpenSection(navigation: DocsSidebarSection[], currentPath: string): string | null {
  return navigation.find((section) => itemMatchesPath(section.items, currentPath))?.title ?? null;
}

function formatSectionTitle(title: string): string {
  return title.replaceAll("-", " ");
}

function NavigationTree({
  currentPath,
  items,
  level = 0,
}: {
  currentPath: string;
  items: DocsSidebarItem[];
  level?: number;
}) {
  return (
    <ul className="space-y-2">
      {items.map((item) => {
        if (item.children?.length) {
          return (
            <li key={`${item.title}-${level}`} className={cn("space-y-2", level > 0 && "pl-4")}>
              <p className="text-sm font-medium tracking-tight text-primary">{item.title}</p>
              <div className="border-l border-trim-offset pl-3">
                <NavigationTree currentPath={currentPath} items={item.children} level={level + 1} />
              </div>
            </li>
          );
        }

        if (!item.href) {
          return null;
        }

        const isActive = item.href === currentPath;

        return (
          <li key={item.href} className={cn(level > 0 && "pl-4")}>
            <Link
              href={item.href}
              className={cn(
                "block rounded-2xl px-3 py-2 text-sm leading-6 transition-colors",
                isActive
                  ? "bg-secondary text-content-inverse"
                  : "text-content-active hover:bg-page-offset hover:text-primary",
              )}
            >
              {item.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function DocsPageSidebar({ currentPath, navigation, toc }: Props) {
  const [activeTab, setActiveTab] = useState<"files" | "toc">("toc");
  const sectionForCurrentPath = findOpenSection(navigation, currentPath) ?? navigation[0]?.title ?? null;
  const [openSectionState, setOpenSectionState] = useState<{
    path: string;
    title: string | null;
  }>(() => ({ path: currentPath, title: sectionForCurrentPath }));
  const openSection =
    openSectionState.path === currentPath &&
    navigation.some((section) => section.title === openSectionState.title)
      ? openSectionState.title
      : sectionForCurrentPath;

  return (
    <aside className="self-start">
      <div className="overflow-hidden rounded-3xl border border-trim-offset bg-page-base/40">
        <div className="grid grid-cols-2 mt-4 mx-4">
          <button
            type="button"
            className={cn(
              "rounded-2xl px-2 py-2 text-sm font-semibold transition-colors",
              activeTab === "toc"
                ? "bg-secondary text-content-inverse shadow-soft"
                : "text-content-offset hover:text-primary",
            )}
            onClick={() => setActiveTab("toc")}
          >
            Table of Contents
          </button>
          <button
            type="button"
            className={cn(
              "rounded-2xl px-2 py-2 text-sm font-semibold transition-colors",
              activeTab === "files"
                ? "bg-secondary text-content-inverse shadow-soft"
                : "text-content-offset hover:text-primary",
            )}
            onClick={() => setActiveTab("files")}
          >
            Files
          </button>
        </div>

        <div className="overflow-y-auto p-4">
          {activeTab === "files" ? (
            <div className="space-y-3">
              {navigation.map((section) => (
                <details
                  key={section.title}
                  open={openSection === section.title}
                  className="rounded-3xl border border-trim-offset bg-page-base"
                >
                  <summary
                    className="cursor-pointer list-none rounded-3xl px-4 py-3 text-xs font-semibold uppercase tracking-wider text-content-offset transition-colors hover:text-primary [&::-webkit-details-marker]:hidden"
                    onClick={(event) => {
                      event.preventDefault();
                      setOpenSectionState({ path: currentPath, title: section.title });
                    }}
                  >
                    {formatSectionTitle(section.title)}
                  </summary>
                  <div className="px-4 pb-4">
                    <NavigationTree currentPath={currentPath} items={section.items} />
                  </div>
                </details>
              ))}
            </div>
          ) : toc.length ? (
            <nav aria-label="Table of contents">
              <ul className="space-y-2">
                {toc.map((heading) => (
                  <li key={heading.id} className={cn(heading.depth > 2 && "pl-4")}>
                    <Link
                      href={`#${heading.id}`}
                      className="block rounded-2xl px-3 py-2 text-sm leading-6 text-content-active transition-colors hover:bg-page-offset hover:text-primary"
                    >
                      {heading.value}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : (
            <p className="text-sm leading-6 text-content-offset">
              This page does not expose any heading anchors for a table of contents yet.
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}
