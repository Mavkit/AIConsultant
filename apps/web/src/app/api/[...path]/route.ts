import { NextRequest, NextResponse } from "next/server";

const apiBaseUrl = process.env.API_INTERNAL_URL ?? "http://127.0.0.1:3001";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  const safePath = path.map(encodeURIComponent).join("/");
  const upstreamUrl = new URL(`/api/${safePath}`, apiBaseUrl);
  upstreamUrl.search = request.nextUrl.search;

  try {
    const upstream = await fetch(upstreamUrl, {
      cache: "no-store",
      headers: { accept: request.headers.get("accept") ?? "application/json" },
      signal: AbortSignal.timeout(5_000),
    });

    return new NextResponse(upstream.body, {
      status: upstream.status,
      headers: {
        "content-type": upstream.headers.get("content-type") ?? "application/json",
        "cache-control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      {
        type: "https://el-rager.no/problems/api-unavailable",
        title: "Rådgivningstjenesten er midlertidig utilgjengelig",
        status: 502,
      },
      { status: 502 },
    );
  }
}
