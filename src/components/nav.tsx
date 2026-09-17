import Link from "next/link";
import IconLink from "@/components/icon-link";
import { ArrowUpRightIcon, GitHubIcon, RssIcon } from "@/components/icons";

export function Navbar() {
  return (
    <header className="sticky top-4 z-50 mb-11 flex justify-center px-6 sm:mb-[60px]">
      <nav className="flex w-full items-center justify-between gap-3 rounded-full border border-faint bg-background px-3 py-2 md:w-fit">
        <Link
          href="/"
          className="shrink-0 py-2.5 pl-3 text-base leading-none font-semibold"
        >
          sead post
        </Link>

        <div className="flex shrink-0 items-center gap-1">
          <IconLink href="/rss" label="RSS 구독">
            <RssIcon className="size-[18px]" />
          </IconLink>
          <IconLink href="https://github.com/SID12g/blog" label="GitHub">
            <GitHubIcon className="size-[18px]" />
          </IconLink>
          <Link
            href="https://sid12g.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="group ml-1 flex items-center gap-2 rounded-full border border-invert-bg bg-invert-bg px-3 py-2.5 text-sm leading-none font-medium whitespace-nowrap text-invert-fg transition-colors duration-150 hover:border-invert-hover hover:bg-invert-hover"
          >
            Portfolio
            <ArrowUpRightIcon className="size-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
