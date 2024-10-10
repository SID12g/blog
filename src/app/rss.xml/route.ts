import { articleContents } from "@/utils/article/getPosts";
import { techContents } from "@/utils/tech/getPosts";
import RSS from "rss";

async function getTechData() {
  return techContents;
}

async function getArticleData() {
  return articleContents;
}

export async function GET() {
  const feed = new RSS({
    title: "sid12g's blog",
    description: "조성민의 블로그에 오신 것을 환영합니다.",
    generator: "RSS for Node and Next.js",
    feed_url: "https://post.sid12g.dev/feed.xml",
    site_url: "https://post.sid12g.dev",
    image_url: "https://post.sid12g.dev/images/blog_image.png",
    copyright: `Copyright ${new Date().getFullYear().toString()}`,
    language: "ko-KR",
    pubDate: new Date().toUTCString(),
    ttl: 60,
  });

  const techPosts = await getTechData();

  const articlePosts = await getArticleData();

  if (techPosts) {
    techPosts.map((post: any) => {
      feed.item({
        title: post.meta.title,
        description: post.meta.description,
        url: `https://post.sid12g.dev/tech/posts/${post.slug}`,
        categories: [post.meta.tag],
        date: post.meta.date,
        custom_elements: [{ "content:encoded": post.content }],
      });
    });
  }

  if (articlePosts) {
    articlePosts.map((post: any) => {
      feed.item({
        title: post.meta.title,
        description: post.meta.description,
        url: `https://post.sid12g.dev/article/posts/${post.slug}`,
        categories: [post.meta.tag],
        date: post.meta.date,
        custom_elements: [{ "content:encoded": post.content }],
      });
    });
  }

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
