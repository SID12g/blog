"use client";

import { useSearchParams } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";
import { chipClass } from "@/components/chip";
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

// 프리렌더링 시점에는 쿼리스트링을 알 수 없으므로 전체 목록을 먼저 보여줌
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

  // 페이지 이동 없이 URL만 바꿔 위쪽 내용이 그대로 유지되게 함
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
    <section id="posts" className="flex w-full flex-col gap-8">
      <DragScroller activeKey={active?.tag ?? null}>
        <TagTab
          label="전체"
          count={posts.length}
          active={active === null}
          onClick={() => select(null)}
        />
        {tags.map(({ tag, count }) => (
          <TagTab
            key={tag}
            label={tag}
            count={count}
            active={active?.tag === tag}
            // 이미 선택된 태그를 다시 누르면 전체로 돌아감
            onClick={() => select(active?.tag === tag ? null : tag)}
          />
        ))}
      </DragScroller>
      <PostList posts={filtered} />
    </section>
  );
}

function TagTab({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      data-cursor="lift"
      className={`${chipClass} shrink-0 cursor-pointer transition-colors duration-150 [--lift-scale:1.05] ${
        active
          ? "bg-invert-bg text-invert-fg"
          : "bg-surface text-secondary hover:bg-surface-strong hover:text-primary"
      }`}
    >
      {label} <span className="tabular-nums opacity-60">{count}</span>
    </button>
  );
}

const DRAG_THRESHOLD = 4;

function readEdges(el: HTMLElement) {
  return {
    start: el.scrollLeft > 0,
    end: el.scrollLeft + el.clientWidth < el.scrollWidth - 1,
  };
}

// 마우스로 가로 드래그해서 스크롤할 수 있는 영역 (터치는 기본 스크롤 사용)
function DragScroller({
  activeKey,
  children,
}: {
  activeKey: string | null;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ pointerId: -1, startX: 0, scrollLeft: 0, moved: false });
  const [dragging, setDragging] = useState(false);
  const [edges, setEdges] = useState({ start: false, end: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // observe() 직후 콜백이 한 번 호출되므로 초기값도 여기서 계산됨
    const observer = new ResizeObserver(() => setEdges(readEdges(el)));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 선택된 태그가 화면 밖에 있으면 보이도록 스크롤 (예: 글 상세 페이지에서 태그로 진입)
  useEffect(() => {
    const el = ref.current;
    const button = el?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!el || !button) return;
    const padding = 24;
    const left = button.offsetLeft - padding;
    const right = button.offsetLeft + button.offsetWidth + padding;
    if (left < el.scrollLeft || right > el.scrollLeft + el.clientWidth) {
      el.scrollLeft = left;
    }
  }, [activeKey]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    drag.current.moved = false;
    if (e.pointerType !== "mouse" || e.button !== 0 || !ref.current) return;
    drag.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      scrollLeft: ref.current.scrollLeft,
      moved: false,
    };
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    const el = ref.current;
    if (state.pointerId !== e.pointerId || !el) return;
    const dx = e.clientX - state.startX;
    if (!state.moved) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return;
      state.moved = true;
      el.setPointerCapture(e.pointerId);
      setDragging(true);
    }
    el.scrollLeft = state.scrollLeft - dx;
  };

  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    if (drag.current.pointerId !== e.pointerId) return;
    drag.current.pointerId = -1;
    setDragging(false);
  };

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
      onScroll={(e) => setEdges(readEdges(e.currentTarget))}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={(e) => {
        // 드래그가 끝난 직후의 클릭은 태그 선택으로 처리하지 않음
        if (drag.current.moved) {
          e.preventDefault();
          e.stopPropagation();
          drag.current.moved = false;
        }
      }}
      onDragStart={(e) => e.preventDefault()}
      className={`relative -mx-6 -my-3 flex items-center gap-2 overflow-x-auto overscroll-x-contain px-6 py-3 select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${mask} ${
        dragging ? "cursor-grabbing *:cursor-grabbing" : ""
      }`}
    >
      {children}
    </div>
  );
}
