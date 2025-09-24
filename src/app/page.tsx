import { BlogPosts } from "@/components/posts";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <section>
      <p className="mb-4">
        {`안녕하세요, 조성민입니다.` +
          `글 쓰는 것에 큰 재주가 있는 것은 아니지만, 세상에 Contribute 하고 싶은 마음으로 글을 작성해보려고 합니다.`}
      </p>
      <BlogPosts />
    </section>
  );
}
