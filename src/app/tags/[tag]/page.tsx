import { notFound } from "next/navigation";
import { getBlogPosts } from "@/utils";
import Tags from "@/components/tags";
import HeroSection from "@/components/hero-section";
import FilterPostsList from "@/components/filtered-posts-list";

export async function generateStaticParams() {
  let posts = getBlogPosts();
  let tagSet = new Set<string>();
  for (let post of posts) {
    for (let tag of post.metadata.tag || []) {
      let key = tag.trim();
      if (!key) continue;
      tagSet.add(key);
    }
  }
  return Array.from(tagSet).map((tag) => ({ tag }));
}

export async function generateMetadata({ params }) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  let title = `sead post: ${decodedTag}`;
  let description = `Posts tagged with ${decodedTag}.`;
  return { title, description };
}

export default async function TagDetailPage({ params }) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  let posts = getBlogPosts();
  let filtered = posts
    .filter((p) =>
      (p.metadata.tag || []).map((t) => t.trim()).includes(decodedTag)
    )
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt))
        return -1;
      return 1;
    });

  if (filtered.length === 0) {
    notFound();
  }

  return (
    <section>
      <HeroSection />
      <Tags selectedTag={decodeURIComponent(tag)} />
      <FilterPostsList posts={filtered} />
    </section>
  );
}
