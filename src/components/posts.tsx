import Link from "next/link";

export interface Post {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
    summary?: string;
    tag?: string[];
  };
}

function sortByDateDesc(posts: Post[]) {
  return [...posts].sort((a, b) =>
    a.metadata.publishedAt > b.metadata.publishedAt ? -1 : 1,
  );
}

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="flex flex-col">
      {sortByDateDesc(posts).map((post) => (
        <Link
          key={post.slug}
          href={`/${post.slug}`}
          className="group flex flex-col gap-2 border-b border-divider py-6 first:pt-0 last:border-b-0"
        >
          <div className="flex items-baseline justify-between gap-4">
            <p className="text-[17px] leading-snug font-semibold tracking-tight transition-colors duration-150 group-hover:text-muted">
              {post.metadata.title}
            </p>
            <p className="shrink-0 font-jetbrains-mono text-xs text-nav-inactive tabular-nums">
              {post.metadata.publishedAt}
            </p>
          </div>
          {post.metadata.summary ? (
            <p className="line-clamp-2 text-sm leading-relaxed font-medium text-muted">
              {post.metadata.summary}
            </p>
          ) : null}
        </Link>
      ))}
    </div>
  );
}
