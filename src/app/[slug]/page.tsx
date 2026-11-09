import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CustomMDX } from "@/components/mdx";
import { getBlogPosts } from "@/utils";
import { formatDate } from "@/date";
import { baseUrl } from "@/app/sitemap";
import CopyCurrentLink from "@/components/copy-link";
import Comments from "@/components/comments";
import Section from "@/components/section";
import { ArrowLeftIcon } from "@/components/icons";

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

  const tags = [...(post.metadata.tag ?? [])].sort();

  return (
    <div className="flex flex-col gap-[60px]">
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

      <div className="flex flex-col gap-8">
        <Link
          href="/"
          className="-my-1 flex w-fit items-center gap-1.5 py-1 pr-2 text-sm leading-[1.2] font-medium text-secondary transition-colors duration-150 hover:text-primary"
        >
          <ArrowLeftIcon className="size-3.5" />
          목록으로
        </Link>

        {post.metadata.image && (
          <div className="aspect-video w-full overflow-hidden rounded-lg bg-surface">
            <Image
              src={post.metadata.image}
              alt={post.metadata.title}
              width={1200}
              height={675}
              sizes="(min-width: 648px) 600px, 100vw"
              className="size-full object-cover"
              priority
            />
          </div>
        )}

        <div className="flex flex-col gap-4">
          {/* 줄바꿈 시 줄 간격을 위해 leading 1.4를 주고, 음수 margin으로 한 줄일 때 높이는 leading 1.2와 같게 유지 */}
          <div className="flex min-w-0 flex-col gap-2 leading-[1.4] break-keep *:-my-[0.1em]">
            <h1 className="text-lg font-semibold text-balance text-primary">
              {post.metadata.title}
            </h1>
            {post.metadata.summary ? (
              <p className="text-sm text-secondary">{post.metadata.summary}</p>
            ) : null}
          </div>

          {/* 제목 아래에 날짜와 태그를 한 줄로 조용히 표시 */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <time
              dateTime={post.metadata.publishedAt}
              className="text-xs leading-none font-medium text-tertiary tabular-nums"
            >
              {formatDate(post.metadata.publishedAt)}
            </time>
            {tags.length > 0 && (
              <>
                <span aria-hidden="true" className="h-3 w-px bg-line" />
                <ul className="flex flex-wrap gap-1.5">
                  {tags.map((t) => (
                    <li key={t} className="flex">
                      <Link
                        href={`/?tag=${encodeURIComponent(t)}`}
                        className="rounded-md bg-surface px-2 py-1 text-xs leading-none font-medium text-secondary transition-colors duration-150 hover:bg-surface-strong hover:text-primary"
                      >
                        {t}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>

      <article className="prose">
        <CustomMDX source={post.content} />
      </article>

      <CopyCurrentLink />

      <Section title="댓글">
        <Comments />
      </Section>
    </div>
  );
}
