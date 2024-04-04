import Profile from "@/components/profile/profile";
import styles from "./page.module.css";
import NewPost from "@/components/newPost/newPost";
import Alarm from "@/components/alarm/alarm";
import MainPostList from "@/components/mainPostList/mainPostList";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <meta
        name="naver-site-verification"
        content="64a062d6249bccc8a191d99ee7deb1dcfd4904b0"
      />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.alarm}>
            <Alarm />
          </div>
          <div className={styles.top}>
            <h1 className={styles.newText}>NEW. 새로운 포스트 🔥</h1>
            <div className={styles.topContent}>
              <NewPost />
              <Profile />
            </div>
          </div>
          <div className={styles.bottom}>
            <h1 className={styles.allText}>ALL. 모든 포스트 📖</h1>
            <MainPostList tag="All Posts" />

            <div className={styles.more}>
              <Link
                href="/tags/all-posts"
                style={{ textDecoration: "none", color: "var(--accent-color)" }}
              >
                <p className={styles.moreText}>더보기</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
