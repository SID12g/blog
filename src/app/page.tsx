import { Suspense } from "react";
import Link from "next/link";
import BlogExplorer, {
  BlogExplorerFallback,
} from "@/components/blog-explorer";
import Divider from "@/components/divider";
import { ArrowUpRightIcon } from "@/components/icons";
import { getBlogPosts, getTagCounts } from "@/utils";

export const metadata = {
  title: "sead post",
  description: "Welcome to sead post",
};

export default function Page() {
  const posts = getBlogPosts().map(({ content, ...rest }) => rest);
  const tags = getTagCounts();

  return (
    <div className="flex flex-col gap-11">
      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-[40px] leading-none font-bold">sead post</h1>
          <p className="text-base leading-[1.7] font-medium text-muted">
            개발하며 배우고 겪은 것들을 기록합니다.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="https://sid12g.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 rounded-full border border-invert-bg bg-invert-bg px-5 py-3.5 text-sm leading-none font-medium text-invert-fg transition-colors duration-150 hover:border-invert-hover hover:bg-invert-hover"
          >
            포트폴리오 보기
            <ArrowUpRightIcon className="size-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            href="/rss"
            className="flex items-center justify-center rounded-full border border-faint bg-background px-5 py-3.5 text-sm leading-none font-medium transition-colors duration-150 hover:bg-muted-15"
          >
            RSS 구독
          </Link>
        </div>
      </section>

      <Divider />

      <Suspense fallback={<BlogExplorerFallback posts={posts} tags={tags} />}>
        <BlogExplorer posts={posts} tags={tags} />
      </Suspense>
    </div>
  );
}
