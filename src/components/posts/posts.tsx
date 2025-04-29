import styles from "@/components/posts/posts.module.css";
import { articleContents } from "@/utils/article/getPosts";
import { articleTags } from "@/utils/article/getTags";
import getBlurImg from "@/utils/getBlurImg";
import { techContents } from "@/utils/tech/getPosts";
import { techTags } from "@/utils/tech/getTags";

import Image from "next/image";
import Link from "next/link";

export default function Posts({
  location,
  nowTag,
}: {
  location: string;
  nowTag: string;
}) {
  const contents =
    location === "tech"
      ? nowTag === "all-posts"
        ? techContents
        : techContents.filter(
            (content) =>
              content.meta.tag ===
              techTags.filter((tag) => tag.link === nowTag)[0].tag
          )
      : nowTag === "all-posts"
      ? articleContents
      : articleContents.filter(
          (content) =>
            content.meta.tag ===
            articleTags.filter((tag) => tag.link === nowTag)[0].tag
        );

  return (
    <div className={styles.posts}>
      {contents.map((post, index) => (
        <Post
          image={post.meta.image}
          title={post.meta.title}
          description={post.meta.description}
          date={post.meta.date}
          tag={post.meta.tag}
          slug={post.slug}
          location={location}
          key={index}
        />
      ))}
    </div>
  );
}

async function Post({
  image,
  title,
  description,
  date,
  tag,
  slug,
  location,
}: {
  image: string;
  title: string;
  description: string;
  date: string;
  tag: string;
  slug: string;
  location: string;
}) {
  const blurImg = await getBlurImg(image);
  return (
    <div className={styles.post}>
      <Link className={styles.link} href={"/" + location + "/posts/" + slug}>
        <div className={styles.image_wrap}>
          <Image
            className={styles.image}
            src={image}
            alt="thumbnail"
            width={528}
            height={297}
            placeholder="blur"
            blurDataURL={blurImg}
          />
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <p className={styles.information}>
          {date} • {tag}
        </p>
      </Link>
    </div>
  );
}
