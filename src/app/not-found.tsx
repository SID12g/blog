import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="font-mono text-sm leading-[1.2] font-medium text-tertiary">
          404
        </p>
        <h1 className="text-lg leading-[1.2] font-semibold text-primary">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="text-sm leading-[1.7] text-secondary">
          이 페이지는 존재하지 않습니다.
        </p>
      </div>
      <Link
        href="/"
        data-cursor="lift"
        className="w-fit rounded-lg bg-invert-bg px-3 py-1.5 text-xs leading-[normal] font-medium text-invert-fg transition-colors duration-150 hover:bg-invert-hover"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
