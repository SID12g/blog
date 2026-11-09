import Image from "next/image";
import Divider from "@/components/divider";

const links = [
  { label: "GitHub", href: "https://github.com/SID12g/blog", icon: "github" },
  { label: "RSS 구독", href: "/rss", icon: "rss" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="flex flex-col gap-5">
      <Divider />
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm leading-none text-secondary">
          © {year} sid12g - Sungmin Cho
        </p>
        <div className="flex items-center gap-5">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              title={link.label}
              className="-m-1 block p-1 transition-opacity duration-150 hover:opacity-60"
            >
              {/* 아이콘은 원본 색상 그대로 표시하고, 다크 모드에서는 반전해 배경 위에서 보이도록 함 */}
              <Image
                src={`/icons/${link.icon}.svg`}
                alt=""
                width={16}
                height={16}
                className="size-4 dark:invert"
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
