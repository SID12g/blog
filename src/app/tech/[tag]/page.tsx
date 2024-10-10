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

export default function Tech({ params }: { params: { tag: string } }) {
  function findNullTag() {
    if (techTags.find((tags) => tags.link == params.tag)?.tag === undefined) {
      redirect("/tech/page/not-found");
    } else {
      return techTags.find((tags) => tags.link == params.tag)?.tag;
    }
  }

  findNullTag();
  return (
    <main className={styles.main}>
      <Background location="tech" />
      <Tags location="tech" nowTag={params.tag} />
      <Posts location="tech" nowTag={params.tag} />
    </main>
  );
}
