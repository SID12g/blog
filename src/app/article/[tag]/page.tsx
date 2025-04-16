import styles from "@/app/article/[tag]/page.module.css";
import Background from "@/components/background/background";
import Posts from "@/components/posts/posts";
import Tags from "@/components/tags/tags";
import { articleTags } from "@/utils/article/getTags";
import { redirect } from "next/navigation";

export async function generateStaticParams() {
  return articleTags.map((tag) => ({
    tag: tag.link,
  }));
}

export default async function Tech({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const tag = (await params).tag;
  function findNullTag() {
    if (articleTags.find((tags) => tags.link == tag)?.tag === undefined) {
      redirect("/article/page/not-found");
    } else {
      return articleTags.find((tags) => tags.link == tag)?.tag;
    }
  }

  findNullTag();
  return (
    <main className={styles.main}>
      <Background location="article" />
      <Tags location="article" nowTag={tag} />
      <Posts location="article" nowTag={tag} />
    </main>
  );
}
