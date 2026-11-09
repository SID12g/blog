"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { chipClass } from "@/components/chip";

export default function CopyCurrentLink() {
  let [visible, setVisible] = useState(false);
  let hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  let copy = useCallback(async () => {
    let url = typeof window !== "undefined" ? window.location.href : "";
    try {
      await navigator.clipboard.writeText(url);
      setVisible(true);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => setVisible(false), 1800);
    } catch (e) {
      alert("복사에 실패했습니다. 수동으로 복사해주세요: " + url);
    }
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
      <button
        type="button"
        onClick={copy}
        data-cursor="lift"
        className={`${chipClass} inline-flex cursor-pointer items-center gap-1.5 bg-surface text-secondary transition-colors duration-150 [--lift-scale:1.05] hover:bg-surface-strong hover:text-primary`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        링크 복사
      </button>

      <p
        role="status"
        aria-live="polite"
        className={`text-xs leading-[1.2] font-medium text-tertiary transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        링크가 복사되었습니다.
      </p>
    </div>
  );
}
