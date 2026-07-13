import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  try {
    const backendRes = await fetch(
      `${BACKEND_URL}/api/v1/metadata?url=${encodeURIComponent(url)}`,
      { signal: AbortSignal.timeout(10000) }
    );

    if (!backendRes.ok) {
      return NextResponse.json(
        { error: "Backend metadata fetch failed" },
        { status: backendRes.status }
      );
    }

    const data = await backendRes.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        sourceType: "youtube",
        sourceUrl: url,
        videoId: url.split("v=")[1]?.slice(0, 11) || "unknown",
        audioDuration: 0,
        extracted: false,
        error: "Backend unavailable",
      },
      { status: 200 }
    );
  }
}
