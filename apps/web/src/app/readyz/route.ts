import { NextResponse } from "next/server";

const apiBaseUrl = process.env.API_INTERNAL_URL ?? "http://127.0.0.1:3001";

export async function GET() {
  try {
    const response = await fetch(new URL("/ready", apiBaseUrl), {
      cache: "no-store",
      signal: AbortSignal.timeout(3_000),
    });
    if (!response.ok) throw new Error("API readiness failed");
    return NextResponse.json({ status: "ready", checks: { web: "ok", api: "ok" } });
  } catch {
    return NextResponse.json(
      { status: "not-ready", checks: { web: "ok", api: "unavailable" } },
      { status: 503 },
    );
  }
}
