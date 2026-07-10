import { NextResponse } from "next/server";

const BACKEND_URL = process.env.API_URL ?? "http://localhost:8000";

export async function POST(request: Request) {
  const body = await request.text();

  let res: Response;
  try {
    res = await fetch(`${BACKEND_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
  } catch {
    return NextResponse.json(
      { detail: "Could not reach the backend" },
      { status: 502 },
    );
  }

  const data = await res.text();
  return new NextResponse(data, {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}
