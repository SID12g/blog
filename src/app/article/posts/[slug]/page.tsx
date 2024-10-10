import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Article from "@/components/article/article";
import { articleContents } from "@/utils/article/getPosts";

export async function generateStaticParams() {
  return articleContents.map((post) => ({
    slug: post.slug,
  }));
}

function getPost({ slug }: { slug: string }) {
  const markdownFile = fs.readFileSync(
    path.join("contents/article", slug + ".mdx"),
    "utf-8"
  );
  const { data: frontMatter, content } = matter(markdownFile);
  return {
    frontMatter,
    slug,
    content,
  };
}

export async function generateMetadata({ params }: any) {
  const post = getPost(params);

  return {
    title: post.frontMatter.title,
    description: post.frontMatter.description,
    openGraph: {
      title: post.frontMatter.title,
      description: post.frontMatter.description,
      url: `https://post.sid12g.dev/article/posts/${post.slug}`,
      images: [
        {
          url: `https://post.sid12g.dev/contents/article/${post.slug}/thumbnail.png`,
        },
      ],
      locale: "ko_KR",
      type: "article",
    },
  };
}

export default function Post({ params }: { params: { slug: string } }) {
  const props = getPost(params);
  return <Article props={props} location="article" />;
}
