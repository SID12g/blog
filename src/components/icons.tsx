import type { CSSProperties } from "react";

// public/icons/*.svg를 마스크로 사용해 모양은 원본 그대로, 색상은 currentColor(텍스트 색)를 따르게 해
// 다크 모드와 호버 상태에서도 색이 자연스럽게 바뀌도록 합니다.
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

export const ArrowLeftIcon = ({ className }: IconProps) => (
  <Icon src="/icons/arrow-left.svg" className={className} />
);
