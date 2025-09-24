import { getBlogPosts } from "@/app/utils";
import { baseUrl } from "@/app/sitemap";

export const metadata = {
  title: "Tags",
  description: "Browse posts by tag.",
};

function getTagCounts() {
  let posts = getBlogPosts();
  let tagToCount: Record<string, number> = {};
  for (let post of posts) {
    for (let tag of post.metadata.tag || []) {
      let key = tag.trim();
      if (!key) continue;
      tagToCount[key] = (tagToCount[key] || 0) + 1;
    }
  }
  return Object.entries(tagToCount)
    .sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1];
      return a[0].localeCompare(b[0]);
    })
    .map(([tag, count]) => ({ tag, count }));
}

export default function TagsPage() {
  let tagCounts = getTagCounts();

  return (
    <section>
      <h1 className="title font-semibold text-2xl tracking-tighter">Tags</h1>
      <div className="mt-4 flex flex-wrap gap-2">
        {tagCounts.map(({ tag, count }) => (
          <a
            key={tag}
            href={`tags/${encodeURIComponent(tag)}`}
            className="inline-block rounded-md bg-neutral-100 px-2 py-1 text-xs text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
          >
            {tag} <span className="opacity-70">({count})</span>
          </a>
        ))}
      </div>
    </section>
  );
}
