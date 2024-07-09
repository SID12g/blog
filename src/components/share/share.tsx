"use client";
import styles from "@/components/share/share.module.css";
import { usePathname } from "next/navigation";

export default function Share() {
  const pathname = usePathname();
  function CopyPath() {
    window.navigator.clipboard
      .writeText(`https://post.sid12g.dev` + pathname)
      .then(() => {
        alert("링크가 복사되었습니다.");
      });
  }
  return (
    <div onClick={() => CopyPath()} className={styles.share}>
      🔗 공유
    </div>
  );
}
