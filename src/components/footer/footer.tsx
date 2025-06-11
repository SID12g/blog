import styles from "@/components/footer/footer.module.css";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      Copyright ⓒ {year}{" "}
      <Link className={styles.link} href="mailto:i@sid12g.dev">
        sid12g
      </Link>{" "}
      All rights reserved.
    </footer>
  );
}
