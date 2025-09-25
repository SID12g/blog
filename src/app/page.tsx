import { BlogPosts } from "@/components/posts";
import Tags from "@/components/tags";
import Image from "next/image";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <section>
      <Image
        src="/background.png"
        alt="Background"
        width={544}
        height={240}
        quality={95}
        priority
        className="w-full h-auto"
      />
      <Tags />
      <BlogPosts />
    </section>
  );
}
