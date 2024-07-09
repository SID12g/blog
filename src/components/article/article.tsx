import styles from "@/components/article/article.module.css";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { techTags } from "@/utils/getTags";
import rehypeSlug from "rehype-slug";
import remarkToc from "remark-toc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import Comments from "@/components/comments/comments";
import rehypeCodeTitles from "rehype-code-titles";
import Share from "@/components/share/share";

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

export default function Article({
  props,
}: {
  props: {
    frontMatter: {
      [key: string]: any;
    };
    slug: string;
    content: string;
  };
}) {
  function getLink() {
    return techTags.find((tags) => tags.tag == props.frontMatter.tag)?.link;
  }
  return (
    <article className={styles.article}>
      <Image
        src={props.frontMatter.image}
        className={styles.image}
        alt="preview"
        width={1920}
        height={1080}
      />
      <h1 className={styles.title}>{props.frontMatter.title}</h1>
      <div className={styles.information_wrap}>
        <Link className={styles.tag} href={"/tech/" + getLink()}>
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
