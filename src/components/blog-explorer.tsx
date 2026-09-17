"use client";

import { useSearchParams } from "next/navigation";
import { PostList, type Post } from "@/components/posts";

interface Tag {
  tag: string;
  count: number;
}

interface BlogExplorerProps {
  posts: Post[];
  tags: Tag[];
}

export default function BlogExplorer(props: BlogExplorerProps) {
  const tagParam = useSearchParams().get("tag");
  return <BlogExplorerView {...props} tagParam={tagParam} />;
}

// Prerendering can't know the query string yet, so show the unfiltered list first.
export function BlogExplorerFallback(props: BlogExplorerProps) {
  return <BlogExplorerView {...props} tagParam={null} />;
}

function BlogExplorerView({
  posts,
  tags,
  tagParam,
}: BlogExplorerProps & { tagParam: string | null }) {
  const active = tagParam ? (tags.find((t) => t.tag === tagParam) ?? null) : null;
  const filtered = active
    ? posts.filter((post) =>
        (post.metadata.tag || []).map((t) => t.trim()).includes(active.tag),
      )
    : posts;

  // Updates the URL without a page navigation, so the hero above stays put.
  const select = (tag: string | null) => {
    const params = new URLSearchParams(window.location.search);
    if (tag) params.set("tag", tag);
    else params.delete("tag");
    const query = params.toString();
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${query ? `?${query}` : ""}`,
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2">
        {tags.map(({ tag, count }) => {
          const isActive = active?.tag === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => select(isActive ? null : tag)}
              aria-pressed={isActive}
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-150 ${
                isActive
                  ? "border-invert-bg bg-invert-bg text-invert-fg"
                  : "border-faint bg-background text-muted hover:bg-muted-15 hover:text-primary"
              }`}
            >
              {tag}
              <span className="tabular-nums opacity-70">({count})</span>
            </button>
          );
        })}
      </div>
      <PostList posts={filtered} />
    </div>
  );
}
