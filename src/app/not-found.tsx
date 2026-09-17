import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <p className="text-sm leading-none font-medium text-nav-inactive">
          404
        </p>
        <h1 className="text-[40px] leading-[1.2] font-bold">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="text-base leading-[1.7] font-medium text-muted">
          이 페이지는 존재하지 않습니다.
        </p>
      </div>
      <Link
        href="/"
        className="flex w-fit items-center justify-center rounded-full border border-invert-bg bg-invert-bg px-5 py-3.5 text-sm leading-none font-medium text-invert-fg transition-colors duration-150 hover:border-invert-hover hover:bg-invert-hover"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
