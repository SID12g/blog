import { getBlogPosts } from "@/utils";
import Link from "next/link";

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

export default function Tags({ selectedTag }: { selectedTag?: string }) {
  let tagCounts = getTagCounts();

  return (
    <div className="mt-6 flex flex-wrap gap-2 mb-6">
      {tagCounts.map(({ tag, count }) => (
        <Link
          key={tag}
          href={selectedTag === tag ? `/` : `/tags/${encodeURIComponent(tag)}`}
          className={
            `inline-block rounded-md bg-neutral-100 px-2 py-1 text-xs text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700` +
            (selectedTag === tag ? " bg-neutral-200 dark:bg-neutral-700" : "")
          }
        >
          {tag} <span className="opacity-70">({count})</span>
        </Link>
      ))}
    </div>
  );
}
