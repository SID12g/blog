import { techContents } from "@/utils/tech/getPosts";
import { NextResponse } from "next/server";

export default function GET() {
  const sanitizedContents = techContents.map(({ content, ...rest }) => rest);

  return NextResponse.json(sanitizedContents);
}
