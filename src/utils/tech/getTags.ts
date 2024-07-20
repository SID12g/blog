import { techContents } from "./getPosts";

interface TagInfo {
  tag: string;
  count: number;
  link: string;
}

const allTechTags = techContents.map((post) => post.meta.tag);

function getCount(tag: string) {
  return allTechTags.filter((postTag) => postTag == tag).length;
}

const uniqueTechTags = allTechTags.filter(
  (item, index) => allTechTags.indexOf(item) === index
);

function convertToSlug(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-");
}

function generateTagInfo(tags: string[]): TagInfo[] {
  const tagInfoList: TagInfo[] = [];

  tagInfoList.push({
    tag: "All Posts",
    count: allTechTags.length,
    link: "all-posts",
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

const techTags = generateTagInfo(uniqueTechTags).sort((a, b) => {
  if (a.count !== b.count) {
    return b.count - a.count;
  } else {
    return a.tag.localeCompare(b.tag);
  }
});

export { techTags };
