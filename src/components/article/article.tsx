import styles from "@/components/article/article.module.css";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import rehypeSlug from "rehype-slug";
import remarkToc from "remark-toc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import Comments from "@/components/comments/comments";
import rehypeCodeTitles from "rehype-code-titles";
import Share from "@/components/share/share";
import { techTags } from "@/utils/tech/getTags";
import { articleTags } from "@/utils/article/getTags";
import getBlurImg from "@/utils/getBlurImg";

const options: any = {
  mdxOptions: {
    remarkPlugins: [remarkToc],
    rehypePlugins: [
      rehypeSlug,
      rehypeCodeTitles,
      [
        rehypePrettyCode,
        {
          theme: "github-light",
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: [styles.anchor],
          },
        },
      ],
    ],
  },
};

export default async function Article({
  props,
  location,
}: {
  props: {
    frontMatter: {
      [key: string]: any;
    };
    slug: string;
    content: string;
  };
  location: string;
}) {
  const tags = location === "article" ? articleTags : techTags;
  function getLink() {
    return tags.find((tags) => tags.tag == props.frontMatter.tag)?.link;
  }
  const blurImg = await getBlurImg(props.frontMatter.image);
  return (
    <article className={styles.article}>
      <Image
        src={props.frontMatter.image}
        className={styles.image}
        alt="thumbnail"
        width={800}
        height={450}
        placeholder="blur"
        blurDataURL={blurImg}
        priority={true}
      />
      <h1 className={styles.title}>{props.frontMatter.title}</h1>
      <div className={styles.information_wrap}>
        <Link className={styles.tag} href={`/${location}/` + getLink()}>
          {props.frontMatter.tag}
        </Link>
        <p className={styles.date}>{props.frontMatter.date}</p>
      </div>
      <p className={styles.description}>{props.frontMatter.description}</p>
      <div className={styles.content}>
        <MDXRemote source={props.content} options={options} />
      </div>
      <Share />
      <Comments />
    </article>
  );
}
