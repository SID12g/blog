import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { getBlogPosts } from "@/utils";
import { baseUrl } from "@/app/sitemap";
import Image from "next/image";
import CopyCurrentLink from "@/components/copy-link";
import Comments from "@/components/comments";

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
  } = post.metadata;
  let ogImage = image ? image : `${baseUrl}/background.webp`;

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
              : `${baseUrl}/background.webp`,
            url: `${baseUrl}/${post.slug}`,
            author: {
              "@type": "Person",
              name: "Sungmin Cho",
            },
          }),
        }}
      />
      {post.metadata.image && (
        <Image
          src={post.metadata.image}
          alt={post.metadata.title}
          width={800}
          height={400}
          sizes="(max-width: 640px) 100vw, 800px"
          className="w-full h-auto rounded-md mb-4"
        />
      )}
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2  text-sm">
        <p className="text-sm text-muted font-jetbrains-mono">
          {post.metadata.publishedAt}
        </p>
      </div>
      {post.metadata.tag && post.metadata.tag.length > 0 && (
        <div className="mt-2 mb-8">
          <div className="flex flex-wrap gap-2">
            {post.metadata.tag.sort().map((t) => (
              <a
                key={t}
                href={`tags/${encodeURIComponent(t)}`}
                className="inline-block rounded-full border border-faint bg-muted-15 px-3 py-1 text-xs font-jetbrains-mono text-muted transition-colors duration-150 hover:border-accent hover:bg-hover"
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      )}
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
      <div className="mt-12" />
      <CopyCurrentLink />
      <div className="h-[40px]" />
      <Comments />
      <div className="mt-12" />
    </section>
  );
}
