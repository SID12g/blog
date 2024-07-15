import styles from "@/app/article/[tag]/page.module.css";
import Background from "@/components/background/background";
import Posts from "@/components/posts/posts";
import Tags from "@/components/tags/tags";
import { articleTags } from "@/utils/article/getTags";

import { redirect } from "next/navigation";

export default function Tech({ params }: { params: { tag: string } }) {
  function findNullTag() {
    if (
      articleTags.find((tags) => tags.link == params.tag)?.tag === undefined
    ) {
      redirect("/article/page/not-found");
    } else {
      return articleTags.find((tags) => tags.link == params.tag)?.tag;
    }
  }

  findNullTag();
  return (
    <main className={styles.main}>
      <Background location="article" />
      <Tags location="article" nowTag={params.tag} />
      <Posts location="article" nowTag={params.tag} />
    </main>
  );
}
