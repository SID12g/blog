import styles from "@/app/tech/[tag]/page.module.css";
import Background from "@/components/background/background";
import Posts from "@/components/posts/posts";
import Tags from "@/components/tags/tags";
import { techTags } from "@/utils/tech/getTags";
import { redirect } from "next/navigation";

export async function generateStaticParams() {
  return techTags.map((tag) => ({
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
    if (techTags.find((tags) => tags.link == tag)?.tag === undefined) {
      redirect("/tech/page/not-found");
    } else {
      return techTags.find((tags) => tags.link == tag)?.tag;
    }
  }

  findNullTag();
  return (
    <main className={styles.main}>
      <Background location="tech" />
      <Tags location="tech" nowTag={tag} />
      <Posts location="tech" nowTag={tag} />
    </main>
  );
}
