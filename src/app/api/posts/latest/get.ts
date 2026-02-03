import { getBlogPosts } from "@/utils";
import { NextResponse } from "next/server";

export default function GET() {
  const allContents = getBlogPosts();

  const sortedContents = allContents.sort((a, b) => {
    const dateA = a.metadata.publishedAt.toLowerCase();
    const dateB = b.metadata.publishedAt.toLowerCase();
    return dateB.localeCompare(dateA);
  });

  const sanitizedContents = sortedContents.map(({ content, ...rest }) => rest);

  return NextResponse.json(sanitizedContents);
}
