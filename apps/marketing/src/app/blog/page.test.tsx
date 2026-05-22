import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { defaultBlogPageContent } from "@/sanity/queries/blogPage";

const { mockGetPageMap } = vi.hoisted(() => ({
  mockGetPageMap: vi.fn(),
}));

vi.mock("nextra/page-map", () => ({
  getPageMap: mockGetPageMap,
}));

vi.mock("@/sanity/queries/blogPage", () => ({
  defaultBlogPageContent: {
    metadata: {
      title: "Digest Engine Blog",
      description: "Product notes, release write-ups, and editorial articles from the Digest Engine team.",
    },
    hero: {
      badge: "Blog",
      title: "Notes, experiments, and launch stories from the Digest Engine team.",
      description:
        "This route stays visually independent from the docs area. Each post can bring its own imagery, voice, and long-form layout while the index page stays optimized for browsing.",
    },
    postsSection: {
      fallbackDescription: "Read the latest post from the Digest Engine team.",
    },
  },
  getBlogPageContent: vi.fn(),
}));

import { getBlogPageContent } from "@/sanity/queries/blogPage";

describe("Blog home page", () => {
  beforeEach(() => {
    vi.resetModules();
    mockGetPageMap.mockReset();
    vi.mocked(getBlogPageContent).mockResolvedValue(defaultBlogPageContent);
  });

  it("renders article cards from the blog page map", async () => {
    mockGetPageMap.mockResolvedValue([
      {
        name: "index",
        route: "/blog",
        frontMatter: {
          title: "Blog",
        },
      },
      {
        name: "authority-aware-ranking",
        route: "/blog/authority-aware-ranking",
        frontMatter: {
          title: "Authority-Aware Ranking",
          publishedAt: "May 15, 2026",
        },
      },
    ]);

    const { default: BlogHomePage } = await import("./page");
    const markup = renderToStaticMarkup(await BlogHomePage());

    expect(getBlogPageContent).toHaveBeenCalled();
    expect(mockGetPageMap).toHaveBeenCalledWith("/blog");
    expect(markup).toContain("Authority-Aware Ranking");
    expect(markup).toContain('href="/blog/authority-aware-ranking"');
    expect(markup).toContain(defaultBlogPageContent.postsSection.fallbackDescription);
    expect(markup).toContain("Read article");
    expect(markup).toContain("relative w-full overflow-hidden mx-auto max-w-6xl rounded-4xl");
    expect(markup).toContain("mx-auto grid w-full max-w-6xl gap-6 overflow-hidden");
  });
});
