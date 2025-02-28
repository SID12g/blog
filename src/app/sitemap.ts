import { articleContents } from "@/utils/article/getPosts";
import { techContents } from "@/utils/tech/getPosts";
import { MetadataRoute } from "next";

const URL = "https://post.sid12g.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const techContentsList = techContents.map((postName) => ({
    name: postName.meta.title,
    url: postName.url,
    slug: postName.slug,
    date: postName.meta.date,
  }));

  const articleContentsList = articleContents.map((postName) => ({
    name: postName.meta.title,
    url: postName.url,
    slug: postName.slug,
    date: postName.meta.date,
  }));

  const techContentsRoute = techContentsList.map(({ url, date }) => {
    return {
      url: url,
      lastModified: date,
    };
  });

  const articleContentsRoute = articleContentsList.map(({ url, date }) => {
    return {
      url: url,
      lastModified: date,
    };
  });

  const routes = [""].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...techContentsRoute, ...articleContentsRoute];
}
