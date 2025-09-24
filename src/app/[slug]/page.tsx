import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { getBlogPosts } from "@/app/utils";
import { baseUrl } from "@/app/sitemap";
import Image from "next/image";

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

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
    tag,
  } = post.metadata;
  let ogImage = image ? image : `기본 이미지`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
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
    <section>
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
              : `기본 이미지`,
            url: `${baseUrl}/${post.slug}`,
            author: {
              "@type": "Person",
              name: "Sungmin Cho",
            },
          }),
        }}
      />
      <Image
        src={post.metadata.image ? post.metadata.image : `기본 이미지`}
        alt={post.metadata.title}
        width={800}
        height={400}
        className="rounded-md mb-4"
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {post.metadata.publishedAt}
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
      {post.metadata.tag && post.metadata.tag.length > 0 && (
        <div className="mt-12 flex flex-wrap gap-2">
          {post.metadata.tag.map((t) => (
            <a
              key={t}
              href={`http://localhost:3000/tag/${encodeURIComponent(t)}`}
              className="inline-block rounded-md bg-neutral-100 px-2 py-1 text-xs text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
            >
              {t}
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
