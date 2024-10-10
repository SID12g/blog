"use client";

import styles from "@/app/not-found.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname().split("/")[1];
  return (
    <div className={styles.container}>
      <div className={styles.text_wrap}>
        <p className={styles.status}>404</p>
        <p className={styles.text}>This page could not be found.</p>
      </div>
      <Link
        className={styles.button}
        href={pathname === "article" ? "/article/all-posts" : "/tech/all-posts"}
      >
        🏠 Home
      </Link>
    </div>
  );
}
