import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPosts } from "@/app/utils";

export async function generateStaticParams() {
  let posts = getBlogPosts();
  let tagSet = new Set<string>();
  for (let post of posts) {
    for (let tag of post.metadata.tag || []) {
      let key = tag.trim();
      if (!key) continue;
      tagSet.add(key);
    }
  }
  return Array.from(tagSet).map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: { tag: string };
}) {
  const { tag } = await params;
  let title = `Tag: ${tag}`;
  let description = `Posts tagged with ${tag}.`;
  return { title, description };
}

export default async function TagDetailPage({
  params,
}: {
  params: { tag: string };
}) {
  const { tag } = await params;
  let posts = getBlogPosts();
  let filtered = posts
    .filter((p) => (p.metadata.tag || []).map((t) => t.trim()).includes(tag))
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt))
        return -1;
      return 1;
    });

  if (filtered.length === 0) {
    notFound();
  }

  return (
    <section>
      <h1 className="title font-semibold text-2xl tracking-tighter">
        Tag: {tag}
      </h1>
      <div className="mt-4 mb-6">
        <Link className="text-sm underline" href={`/tags`}>
          ← All tags
        </Link>
      </div>
      <div>
        {filtered.map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
                {post.metadata.publishedAt}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.metadata.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
