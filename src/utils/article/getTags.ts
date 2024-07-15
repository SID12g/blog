import { articleContents } from "./getPosts";

interface TagInfo {
  tag: string;
  count: number;
  link: string;
}

const allArticleTags = articleContents.map((post) => post.meta.tag);

function getCount(tag: string) {
  return allArticleTags.filter((postTag) => postTag == tag).length;
}

const uniqueArticleTags = allArticleTags.filter(
  (item, index) => allArticleTags.indexOf(item) === index
);

function convertToSlug(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-");
}

function generateTagInfo(tags: string[]): TagInfo[] {
  const tagInfoList: TagInfo[] = [];

  tagInfoList.push({
    tag: "All Posts",
    count: allArticleTags.length,
    link: "",
  });

  tags.forEach((tag: string) => {
    tagInfoList.push({
      tag: tag,
      count: getCount(tag),
      link: convertToSlug(tag),
    });
  });

  return tagInfoList;
}

const articleTags = generateTagInfo(uniqueArticleTags).sort((a, b) => {
  if (a.count !== b.count) {
    return b.count - a.count;
  } else {
    return a.tag.localeCompare(b.tag);
  }
});

export { articleTags };
