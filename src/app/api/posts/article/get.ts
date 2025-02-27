import { articleContents } from "@/utils/article/getPosts";
import { NextResponse } from "next/server";

export default function GET() {
  return NextResponse.json(articleContents);
}
