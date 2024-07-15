import fs from "fs";
import path from "path";
import matter from "gray-matter";

const techDir = "contents/tech";
const techFiles = fs.readdirSync(path.join(process.cwd(), techDir));

const allTechContents = techFiles
  .map((filename) => {
    const fileContent = fs.readFileSync(path.join(techDir, filename), "utf-8");
    const { data: frontMatter } = matter(fileContent);
    return {
      meta: frontMatter,
      slug: filename.replace(".mdx", ""),
      content: fileContent,
    };
  })
  .filter((post) => post.meta.tag);

const techContents = allTechContents.sort((a, b) => {
  const dateA = a.meta.date.toLowerCase();
  const dateB = b.meta.date.toLowerCase();
  return dateB.localeCompare(dateA);
});

export { techContents };
