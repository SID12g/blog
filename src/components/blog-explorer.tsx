"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
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
    <section id="posts" className="flex scroll-mt-24 flex-col gap-8">
      <h2 className="text-xl leading-none font-bold">글</h2>

      <TagScroller activeKey={active?.tag ?? null}>
        <button
          type="button"
          onClick={() => select(null)}
          aria-pressed={!active}
          className={`shrink-0 cursor-pointer py-2 text-base leading-none font-medium whitespace-nowrap transition-colors duration-150 ${
            !active
              ? "text-primary"
              : "text-nav-inactive hover:text-muted"
          }`}
        >
          전체 <span className="tabular-nums">({posts.length})</span>
        </button>
        {tags.map(({ tag, count }) => {
          const isActive = active?.tag === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => select(isActive ? null : tag)}
              aria-pressed={isActive}
              className={`shrink-0 cursor-pointer py-2 text-base leading-none font-medium whitespace-nowrap transition-colors duration-150 ${
                isActive
                  ? "text-primary"
                  : "text-nav-inactive hover:text-muted"
              }`}
            >
              {tag} <span className="tabular-nums">({count})</span>
            </button>
          );
        })}
      </TagScroller>
      <PostList posts={filtered} />
    </section>
  );
}

function readEdges(el: HTMLElement) {
  return {
    start: el.scrollLeft > 0,
    end: el.scrollLeft + el.clientWidth < el.scrollWidth - 1,
  };
}

function TagScroller({
  activeKey,
  children,
}: {
  activeKey: string | null;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: false, end: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setEdges(readEdges(el));
    const observer = new ResizeObserver(update);
    observer.observe(el);
    update();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    const button = el?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!el || !button) return;
    const padding = 24;
    const left = button.offsetLeft - padding;
    const right = button.offsetLeft + button.offsetWidth + padding;
    if (left < el.scrollLeft || right > el.scrollLeft + el.clientWidth) {
      el.scrollTo({ left, behavior: "smooth" });
    }
  }, [activeKey]);

  const mask =
    edges.start && edges.end
      ? "[mask-image:linear-gradient(to_right,transparent,black_32px,black_calc(100%-32px),transparent)]"
      : edges.start
        ? "[mask-image:linear-gradient(to_right,transparent,black_32px)]"
        : edges.end
          ? "[mask-image:linear-gradient(to_left,transparent,black_32px)]"
          : "";

  return (
    <div
      ref={ref}
      onScroll={(event) => setEdges(readEdges(event.currentTarget))}
      className={`-mx-6 -my-2 flex items-center gap-5 overflow-x-auto overscroll-x-contain px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${mask}`}
    >
      {children}
    </div>
  );
}
