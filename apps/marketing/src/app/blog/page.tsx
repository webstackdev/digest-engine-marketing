import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { PageMapItem } from "nextra";
import { getPageMap } from "nextra/page-map";
import { cache } from "react";
import { ArrowRight, Newspaper } from "lucide-react";

import { blogPreviewImages } from "@/content/blog/images";

import { brand } from "@/lib/props";
import { PageSection } from "@/components/Section";

type BlogCard = {
  href: string;
  title: string;
  description: string;
  previewImage: StaticImageData | string;
  publishedAt?: string;
};

type BlogFrontMatter = {
  title?: string;
  description?: string;
  publishedAt?: string;
};

export const metadata: Metadata = {
  title: `${brand.name} Blog`,
  description: "Product notes, release write-ups, and editorial articles from the Digest Engine team.",
};

const getBlogPageMap = cache(async () => getPageMap("/blog"));

function getFolderTitle(item: PageMapItem): string {
  if ("frontMatter" in item && item.frontMatter?.title) {
    return String(item.frontMatter.title);
  }

  return "name" in item ? item.name : "Article";
}

function buildBlogCards(items: PageMapItem[]): BlogCard[] {
  return items.flatMap<BlogCard>((item) => {
    if ("data" in item) {
      return [];
    }

    if ("children" in item) {
      return buildBlogCards(item.children);
    }

    if (!item.route?.startsWith("/blog/") || item.route === "/blog") {
      return [];
    }

    const slug = item.route.replace("/blog/", "");
    const previewImage = blogPreviewImages[slug];

    const frontMatter = (
      "frontMatter" in item ? item.frontMatter : undefined
    ) as BlogFrontMatter | undefined;

    if (!previewImage) {
      return [];
    }

    return [
      {
        href: item.route,
        title: getFolderTitle(item),
        description:
          frontMatter?.description ?? "Read the latest post from the Digest Engine team.",
        previewImage,
        publishedAt: frontMatter?.publishedAt,
      },
    ];
  });
}

export default async function BlogHomePage() {
  const pageMap = await getBlogPageMap();
  const posts = buildBlogCards(pageMap);

  return (
    <main className="relative mx-auto flex w-full flex-col gap-8 pb-16 pt-24">
      <PageSection
        classes="px-6 py-10 sm:px-10 sm:py-12"
      >
        <div className="space-y-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 font-medium text-content-inverse">
            <Newspaper className="h-4 w-4" aria-hidden="true" />
            Blog
          </span>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-secondary">
            Notes, experiments, and launch stories from the {brand.name} team.
          </h1>
          <p className="text-lg leading-8 text-content-active">
            This route stays visually independent from the docs area. Each post can bring its own imagery, voice, and long-form layout while the index page stays optimized for browsing.
          </p>
        </div>
      </PageSection>

      <section className="relative mx-auto grid w-full max-w-6xl gap-6 overflow-hidden md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.href}
            href={post.href}
            className="group overflow-hidden rounded-3xl border border-trim-offset bg-page-offset shadow-card transition-transform duration-200 hover:-translate-y-1"
          >
            <article className="flex h-full flex-col">
              <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                <Image
                  src={post.previewImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(min-width: 1280px) 22rem, (min-width: 768px) 45vw, 100vw"
                />
              </div>
              <div className="flex flex-1 flex-col gap-4 px-6 py-6">
                {post.publishedAt ? (
                  <p className="text-sm font-medium text-content-offset">{post.publishedAt}</p>
                ) : null}
                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold tracking-tight text-secondary">{post.title}</h2>
                  <p className="text-base leading-7 text-content-active">{post.description}</p>
                </div>
                <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-secondary">
                  Read article
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </div>
            </article>
          </Link>
        ))}
      </section>
    </main>
  );
}
