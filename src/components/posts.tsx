import Link from "next/link";
import { getBlogPosts } from "@/utils";

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
            className="group flex flex-col space-y-1 mb-1 -mx-2 px-2 py-1 rounded-md transition-colors duration-150 hover:bg-hover"
            href={`/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <div>
                <p className="text-muted font-jetbrains-mono transition-colors duration-150 w-[100px] tabular-nums">
                  {post.metadata.publishedAt}
                </p>
              </div>
              <p className="text-primary tracking-tight group-hover:underline group-hover:decoration-muted group-hover:underline-offset-2">
                {post.metadata.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
}
