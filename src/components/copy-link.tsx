"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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
    <div className="relative mb-6">
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-2 rounded-md border border-neutral-300 px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-100 active:translate-y-[0.5px] dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
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
        공유
      </button>

      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-none absolute left-0 top-full mt-2 flex items-center gap-2 rounded-md bg-neutral-900/90 px-3 py-1.5 text-xs text-white shadow transition-opacity duration-300 dark:bg-neutral-100/90 dark:text-neutral-900 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        링크가 복사되었습니다.
      </div>
    </div>
  );
}
