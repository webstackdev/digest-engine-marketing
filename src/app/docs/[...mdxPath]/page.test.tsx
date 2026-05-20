import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockGenerateStaticParamsFor, mockGetPageMap, mockImportPage } = vi.hoisted(() => ({
  mockGenerateStaticParamsFor: vi.fn(),
  mockGetPageMap: vi.fn(),
  mockImportPage: vi.fn(),
}));

vi.mock("nextra/pages", () => ({
  generateStaticParamsFor: mockGenerateStaticParamsFor,
  importPage: mockImportPage,
}));

vi.mock("nextra/page-map", () => ({
  getPageMap: mockGetPageMap,
}));

describe("Docs catch-all page", () => {
  beforeEach(() => {
    vi.resetModules();
    mockGenerateStaticParamsFor.mockReset();
    mockGetPageMap.mockReset();
    mockImportPage.mockReset();
  });

  it("filters the docs index route out of catch-all static params", async () => {
    mockGenerateStaticParamsFor.mockReturnValue(
      vi.fn().mockResolvedValue([
        { mdxPath: ["docs"] },
        { mdxPath: ["docs", "reference", "pipeline"] },
        { mdxPath: ["blog", "some-article"] },
      ]),
    );

    const { generateStaticParams } = await import("./page");

    await expect(generateStaticParams()).resolves.toEqual([
      { mdxPath: ["reference", "pipeline"] },
    ]);
  });

  it("loads the requested MDX page", async () => {
    mockGenerateStaticParamsFor.mockReturnValue(vi.fn().mockResolvedValue([]));
    mockGetPageMap.mockResolvedValue([
      {
        name: "reference",
        route: "/docs/reference",
        children: [
          {
            name: "pipeline",
            route: "/docs/reference/pipeline",
            frontMatter: { title: "Pipeline" },
          },
        ],
      },
    ]);
    mockImportPage.mockResolvedValue({
      default: () => <div>Reference doc</div>,
      metadata: { title: "Pipeline", filePath: "reference/pipeline.md" },
      toc: [{ depth: 2, id: "overview", value: "Overview" }],
    });

    const { default: Page } = await import("./page");
    const markup = renderToStaticMarkup(
      await Page({ params: Promise.resolve({ mdxPath: ["reference", "pipeline"] }) }),
    );

    expect(mockImportPage).toHaveBeenCalledWith(["docs", "reference", "pipeline"]);
    expect(mockGetPageMap).toHaveBeenCalledWith("/docs");
    expect(markup).toContain('id="docs-content"');
    expect(markup).toContain("Files");
    expect(markup).toContain("Table of Contents");
    expect(markup).toContain("Reference doc");
  });

  it("maps docs frontmatter into next metadata", async () => {
    mockGenerateStaticParamsFor.mockReturnValue(vi.fn().mockResolvedValue([]));
    mockImportPage.mockResolvedValue({
      metadata: {
        title: "Pipeline",
        description: "How the pipeline works.",
      },
    });

    const { generateMetadata } = await import("./page");
    const metadata = await generateMetadata({
      params: Promise.resolve({ mdxPath: ["reference", "pipeline"] }),
    });

    expect(metadata.title).toBe("Pipeline");
    expect(metadata.description).toBe("How the pipeline works.");
    expect(metadata.openGraph).toMatchObject({
      title: "Pipeline",
      description: "How the pipeline works.",
    });
  });
});
