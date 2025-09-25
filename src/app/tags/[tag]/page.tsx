import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPosts } from "@/utils";
import Tags from "@/components/tags";
import Image from "next/image";

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

export async function generateMetadata({ params }) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  let title = `sead post: ${decodedTag}`;
  let description = `Posts tagged with ${decodedTag}.`;
  return { title, description };
}

export default async function TagDetailPage({ params }) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  let posts = getBlogPosts();
  let filtered = posts
    .filter((p) =>
      (p.metadata.tag || []).map((t) => t.trim()).includes(decodedTag)
    )
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
      <Link
        href="https://www.youtube.com/watch?v=DXvjwv_9yHU&list=LL&index=4"
        target="_blank"
      >
        <Image
          src="/background.png"
          alt="Background"
          width={544}
          height={240}
          quality={95}
          priority
          className="w-full h-auto"
        />
      </Link>
      <Tags selectedTag={decodeURIComponent(tag)} />
      <div>
        {filtered.map((post) => (
          <Link
            key={post.slug}
            className="group flex flex-col space-y-1 mb-1 -mx-2 px-2 py-1 rounded-md transition hover:bg-neutral-100 dark:hover:bg-neutral-900"
            href={`/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors w-[100px] tabular-nums">
                {post.metadata.publishedAt}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight group-hover:underline group-hover:decoration-neutral-400 group-hover:underline-offset-2">
                {post.metadata.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
