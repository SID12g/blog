import Link from "next/link";
import { getBlogPosts } from "@/app/utils";

export function BlogPosts() {
  let allBlogs = getBlogPosts();

  return (
    <div>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
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
  );
}
