import Link from "next/link";
import { formatDate } from "@/date";

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
    <div className="flex flex-col gap-5">
      {sortByDateDesc(posts).map((post) => (
        <Link
          key={post.slug}
          href={`/${post.slug}`}
          data-cursor="lift"
          // 떠오를 때 배경이 글자에 붙지 않도록 여백을 주고, 음수 margin으로 레이아웃 위치는 유지
          className="-mx-3 -my-2.5 flex items-center justify-between gap-4 rounded-lg px-3 py-2.5 [--lift-scale:1.01] hover:bg-elevated"
        >
          {/* 줄바꿈 시 줄 간격을 위해 leading 1.4를 주고, 음수 margin으로 한 줄일 때 높이는 leading 1.2와 같게 유지 */}
          <span className="flex min-w-0 flex-col gap-1.5 text-sm leading-[1.4] break-keep *:-my-[0.1em]">
            <span className="font-medium text-primary">
              {post.metadata.title}
            </span>
            {post.metadata.summary ? (
              <span className="line-clamp-2 text-secondary">
                {post.metadata.summary}
              </span>
            ) : null}
          </span>
          <time
            dateTime={post.metadata.publishedAt}
            className="shrink-0 text-right text-xs leading-[1.2] font-medium whitespace-nowrap text-tertiary"
          >
            {formatDate(post.metadata.publishedAt)}
          </time>
        </Link>
      ))}
    </div>
  );
}
