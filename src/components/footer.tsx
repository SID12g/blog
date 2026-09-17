import Link from "next/link";
import Divider from "@/components/divider";
import IconLink from "@/components/icon-link";
import { GitHubIcon, RssIcon } from "@/components/icons";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mx-auto flex w-full max-w-[768px] flex-col gap-10 px-6 pt-11 pb-8">
      <Divider />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm leading-none text-muted">
          © {year}{" "}
          <Link
            href="https://sid12g.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 transition-colors duration-150 hover:text-primary"
          >
            sid12g
          </Link>{" "}
          All rights reserved.
        </p>
        <div className="flex items-center gap-1">
          <IconLink href="/rss" label="RSS 구독">
            <RssIcon className="size-[18px]" />
          </IconLink>
          <IconLink href="https://github.com/SID12g/blog" label="GitHub">
            <GitHubIcon className="size-[18px]" />
          </IconLink>
        </div>
      </div>
    </footer>
  );
}
