import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CustomMDX } from "@/components/mdx";
import { getBlogPosts } from "@/utils";
import { baseUrl } from "@/app/sitemap";
import Divider from "@/components/divider";
import CopyCurrentLink from "@/components/copy-link";
import Comments from "@/components/comments";
import { ArrowLeftIcon, CalendarIcon } from "@/components/icons";

export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let post = getBlogPosts().find((post) => post.slug === slug);
  if (!post) {
    return;
  }

  let { title, publishedAt: publishedTime, summary: description, image } = post.metadata;
  let ogImage = image ? `${baseUrl}${image}` : `${baseUrl}/images/og-image.png`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/${post.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({ params }) {
  const { slug } = await params;
  let post = getBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : undefined,
            url: `${baseUrl}/${post.slug}`,
            author: {
              "@type": "Person",
              name: "Sungmin Cho",
            },
          }),
        }}
      />

      <Link
        href="/"
        className="-my-2 flex w-fit items-center gap-2 py-2 pr-2 text-sm leading-none font-medium text-nav-inactive transition-colors duration-150 hover:text-primary"
      >
        <ArrowLeftIcon className="size-3.5" />
        목록으로
      </Link>

      {post.metadata.image && (
        <div className="aspect-video w-full overflow-hidden rounded-2xl border border-surface-border">
          <Image
            src={post.metadata.image}
            alt={post.metadata.title}
            width={1440}
            height={810}
            sizes="(min-width: 768px) 720px, 100vw"
            className="size-full object-cover"
          />
        </div>
      )}

      <div className="flex flex-col gap-5">
        <h1 className="title text-[32px] leading-tight font-bold">
          {post.metadata.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3">
          <span className="flex items-center gap-2 font-jetbrains-mono text-sm text-muted">
            <CalendarIcon className="size-3.5" />
            {post.metadata.publishedAt}
          </span>

          {post.metadata.tag && post.metadata.tag.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.metadata.tag.sort().map((t) => (
                <Link
                  key={t}
                  href={`/?tag=${encodeURIComponent(t)}`}
                  className="inline-block rounded-full border border-faint bg-background px-3 py-1 text-xs font-medium text-muted transition-colors duration-150 hover:bg-muted-15 hover:text-primary"
                >
                  {t}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <Divider />

      <article className="prose">
        <CustomMDX source={post.content} />
      </article>

      <CopyCurrentLink />

      <Divider />

      <Comments />
    </div>
  );
}
