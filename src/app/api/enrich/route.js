import { NextResponse } from "next/server";

export async function POST(req) {
  const { url } = await req.json();

  try {
    const res = await fetch(url);
    const html = await res.text();

    return NextResponse.json({
      content: html.slice(0, 3000),
      source: url,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch website" },
      { status: 500 }
    );
  }
}