"use client";

import styles from "@/components/share/share.module.css";
import { usePathname } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function Share() {
  const pathname = usePathname();
  function CopyPath() {
    window.navigator.clipboard
      .writeText(`https://post.sid12g.dev` + pathname)
      .then(() => {
        toast("링크가 복사되었습니다.", {
          icon: "✅",
          style: {
            borderRadius: "12px",
            background: "#333",
            color: "#fff",
          },
        });
      });
  }
  return (
    <div onClick={() => CopyPath()} className={styles.share}>
      🔗 공유
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}
