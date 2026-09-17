import Link from "next/link";
import type { ReactNode } from "react";

export default function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex size-9 items-center justify-center rounded-full text-muted transition-colors duration-150 hover:bg-muted-15 hover:text-primary"
    >
      {children}
    </Link>
  );
}
