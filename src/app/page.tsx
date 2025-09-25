import { BlogPosts } from "@/components/posts";
import Tags from "@/components/tags";
import HeroSection from "@/components/hero-section";

export const metadata = {
  title: "sead post",
  description: "Welcome to sead post",
};

export default function Page() {
  return (
    <section>
      <HeroSection />
      <Tags />
      <BlogPosts />
    </section>
  );
}
