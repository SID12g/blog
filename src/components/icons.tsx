import type { CSSProperties } from "react";

// public/icons/*.svg is used as a CSS mask so the shape stays fixed while the
// color follows currentColor (text color), keeping icons correct across
// light/dark mode and hover states automatically.
interface IconProps {
  className?: string;
}

function Icon({ src, className = "" }: IconProps & { src: string }) {
  const style: CSSProperties = {
    maskImage: `url(${src})`,
    WebkitMaskImage: `url(${src})`,
  };
  return (
    <span aria-hidden="true" style={style} className={`icon ${className}`} />
  );
}

export const ArrowUpRightIcon = ({ className }: IconProps) => (
  <Icon src="/icons/arrow-up-right.svg" className={className} />
);

export const ArrowLeftIcon = ({ className }: IconProps) => (
  <Icon src="/icons/arrow-left.svg" className={className} />
);

export const CalendarIcon = ({ className }: IconProps) => (
  <Icon src="/icons/calendar.svg" className={className} />
);

export const GitHubIcon = ({ className }: IconProps) => (
  <Icon src="/icons/github.svg" className={className} />
);

export const RssIcon = ({ className }: IconProps) => (
  <Icon src="/icons/rss.svg" className={className} />
);
