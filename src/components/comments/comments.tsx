"use client";

import styles from "@/components/comments/comments.module.css";
import Giscus from "@giscus/react";

export default function Comments() {
  return (
    <div className={styles.container}>
      <Giscus
        id="comments"
        repo="sid12g/post.sid12g.dev"
        repoId="R_kgDOMSXcpA"
        category="Comments"
        categoryId="DIC_kwDOMSXcpM4CgnDr"
        mapping="url"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="light"
        lang="ko"
        loading="lazy"
      />
    </div>
  );
}
