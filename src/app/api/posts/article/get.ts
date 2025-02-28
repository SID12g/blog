import { articleContents } from "@/utils/article/getPosts";
import { NextResponse } from "next/server";

export default function GET() {
  const sanitizedContents = articleContents.map(({ content, ...rest }) => rest);

  return NextResponse.json(sanitizedContents);
}
