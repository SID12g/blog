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
    <div className="flex flex-col gap-10">
      {sortByDateDesc(posts).map((post) => (
        <Link
          key={post.slug}
          href={`/${post.slug}`}
          className="group flex w-full flex-wrap items-start justify-between gap-x-5 gap-y-3"
        >
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <h3 className="-my-[0.15em] text-[17px] leading-[1.3] font-semibold transition-colors duration-150 group-hover:text-muted">
              {post.metadata.title}
            </h3>
            {post.metadata.summary ? (
              <p className="line-clamp-2 text-sm leading-[1.5] font-medium text-muted">
                {post.metadata.summary}
              </p>
            ) : null}
            {post.metadata.tag?.length ? (
              <p className="flex flex-wrap gap-x-3 gap-y-1 text-sm leading-none font-medium text-muted sm:hidden">
                {post.metadata.tag.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </p>
            ) : null}
          </div>

          <div className="flex shrink-0 flex-col items-end gap-3 text-sm leading-none font-normal whitespace-nowrap text-muted">
            <span>{post.metadata.publishedAt}</span>
            {post.metadata.tag?.[0] ? (
              <span className="hidden sm:block">{post.metadata.tag[0]}</span>
            ) : null}
          </div>
        </Link>
      ))}
    </div>
  );
}
