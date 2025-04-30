import styles from "@/components/tags/tags.module.css";
import { articleTags } from "@/utils/article/getTags";
import { techTags } from "@/utils/tech/getTags";
import Link from "next/link";

export default function Tags({
  location,
  nowTag,
}: {
  location: string;
  nowTag: string;
}) {
  const tags = location === "tech" ? techTags : articleTags;
  function Tag({ tag }: { tag: string }) {
    const link = tags.filter((tag1) => tag1.tag === tag)[0].link;
    return (
      <Link
        href={"/" + location + "/" + link}
        className={nowTag === link ? styles.tag_selected : styles.tag}
        scroll={false}
      >
        {tag}
      </Link>
    );
  }

  return (
    <div className={styles.tags_wrap}>
      {tags.map((tag, index) => (
        <Tag tag={tag.tag} key={index} />
      ))}
    </div>
  );
}
