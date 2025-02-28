import fs from "fs";
import path from "path";
import matter from "gray-matter";

const articleDir = "contents/article";

const articleFiles = fs.readdirSync(path.join(process.cwd(), articleDir));

const allArticleContents = articleFiles
  .map((filename) => {
    const fileContent = fs.readFileSync(
      path.join(articleDir, filename),
      "utf-8"
    );
    const { data: frontMatter } = matter(fileContent);
    return {
      meta: frontMatter,
      slug: filename.replace(".mdx", ""),
      content: fileContent,
      url: `https://post.sid12g.dev/article/posts/${filename
        .replace(".mdx", "")
        .toString()}`,
    };
  })
  .filter((post) => post.meta.tag);

const articleContents = allArticleContents.sort((a, b) => {
  const dateA = a.meta.date.toLowerCase();
  const dateB = b.meta.date.toLowerCase();
  return dateB.localeCompare(dateA);
});

export { articleContents };
