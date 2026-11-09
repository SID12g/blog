import { Suspense } from "react";
import BlogExplorer, {
  BlogExplorerFallback,
} from "@/components/blog-explorer";
import { getBlogPosts, getTagCounts } from "@/utils";

export const metadata = {
  title: "sead post",
  description: "Welcome to sead post",
};

export default function Page() {
  const posts = getBlogPosts().map(({ content, ...rest }) => rest);
  const tags = getTagCounts();

  return (
    <div className="flex flex-col gap-[60px]">
      <div className="flex flex-col gap-3">
        <h1 className="font-mono text-lg leading-[1.2] font-semibold text-primary">
          sead post
        </h1>
        <p className="text-sm leading-[1.2] font-medium text-secondary">
          개발하며 배우고 겪은 것들을 기록합니다.
        </p>
      </div>

      <Suspense fallback={<BlogExplorerFallback posts={posts} tags={tags} />}>
        <BlogExplorer posts={posts} tags={tags} />
      </Suspense>
    </div>
  );
}
