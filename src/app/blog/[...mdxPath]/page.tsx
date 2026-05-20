import type { Metadata } from "next";
import Image from "next/image";
import { generateStaticParamsFor, importPage } from "nextra/pages";
import { cache } from "react";

import { brand } from "@/lib/props";
import { blogHeroImages } from "@/content/blog/images";

type BlogRouteParams = {
  mdxPath: string[];
};

type BlogPageComponentProps = {
  params: BlogRouteParams;
};

type BlogMetadata = Metadata & {
  title: string;
  description?: string;
  publishedAt?: string;
};

function buildBlogMetadata(slug: string, metadata: BlogMetadata): Metadata {
  const heroImage = blogHeroImages[slug];
  const description = metadata.description ?? brand.tagline;

  return {
    ...metadata,
    title: metadata.title,
    description,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      title: metadata.openGraph?.title ?? metadata.title,
      description: metadata.openGraph?.description ?? description,
      images: metadata.openGraph?.images ?? (heroImage ? [{ url: heroImage.src, alt: metadata.title }] : undefined),
    },
    twitter: {
      ...metadata.twitter,
      title: metadata.twitter?.title ?? metadata.title,
      description: metadata.twitter?.description ?? description,
      images: metadata.twitter?.images ?? (heroImage ? [heroImage.src] : undefined),
    },
  };
}

const generateNextraStaticParams = generateStaticParamsFor("mdxPath");
const getBlogStaticParams = cache(async (): Promise<BlogRouteParams[]> => {
  return (await generateNextraStaticParams()) as BlogRouteParams[];
});
const importBlogPage = cache(async (slug: string) => {
  return importPage(["blog", ...slug.split("/").filter(Boolean)]);
});

export async function generateStaticParams(): Promise<BlogRouteParams[]> {
  const params = await getBlogStaticParams();

  return params
    .map(({ mdxPath }) => mdxPath.filter(Boolean))
    .filter((mdxPath) => mdxPath[0] === "blog" && mdxPath.length > 1)
    .map(([, ...mdxPath]) => ({ mdxPath }));
}

export async function generateMetadata(props: {
  params: Promise<BlogRouteParams>;
}): Promise<Metadata> {
  const params = await props.params;
  const slug = params.mdxPath.join("/");
  const { metadata } = (await importBlogPage(slug)) as {
    metadata: BlogMetadata;
  };

  return buildBlogMetadata(slug, metadata);
}

export default async function BlogArticlePage(props: { params: Promise<BlogRouteParams> }) {
  const params = await props.params;
  const slug = params.mdxPath.join("/");
  const heroImage = blogHeroImages[slug];
  const { default: MDXPage, metadata } = (await importBlogPage(slug)) as {
    default: React.ComponentType<BlogPageComponentProps>;
    metadata: BlogMetadata;
  };

  return (
    <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 pt-24">
      <article className="overflow-hidden rounded-4xl border border-trim-offset bg-page-offset shadow-card">
        <div className="relative aspect-2/1">
          {heroImage ? (
            <Image
              src={heroImage}
              alt={metadata.title}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 64rem, 100vw"
            />
          ) : null}
        </div>

        <div className="space-y-8 px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-secondary px-3 py-1 font-medium text-content-inverse">
                Blog
              </span>
              {metadata.publishedAt ? <span>{metadata.publishedAt}</span> : null}
            </div>
          </header>

          <div className="min-w-0 wrap-break-word text-content">
            <MDXPage {...props} params={params} />
          </div>
        </div>
      </article>
    </main>
  );
}
