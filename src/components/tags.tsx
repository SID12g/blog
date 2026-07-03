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
            `inline-block rounded-full border border-faint bg-muted-15 px-3 py-1 text-xs font-jetbrains-mono text-muted transition-colors duration-150 hover:border-accent hover:bg-hover` +
            (selectedTag === tag ? " border-accent text-primary" : "")
          }
        >
          {tag} <span className="opacity-70">({count})</span>
        </Link>
      ))}
    </div>
  );
}
