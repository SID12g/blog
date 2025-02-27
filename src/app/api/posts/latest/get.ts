import { articleContents } from "@/utils/article/getPosts";
import { techContents } from "@/utils/tech/getPosts";
import { NextResponse } from "next/server";

export default function GET() {
  const allContents = [...techContents, ...articleContents];

  const sortedContents = allContents.sort((a, b) => {
    const dateA = a.meta.date.toLowerCase();
    const dateB = b.meta.date.toLowerCase();
    return dateB.localeCompare(dateA);
  });

  return NextResponse.json(sortedContents);
}
