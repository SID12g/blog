import { techContents } from "@/utils/tech/getPosts";
import { NextResponse } from "next/server";

export default function GET() {
  return NextResponse.json(techContents);
}
