import { NextResponse } from "next/server";

export const runtime = "nodejs";

const GHL_UPSERT_URL = "https://services.leadconnectorhq.com/contacts/upsert";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: { email?: string };
  try {
    body = (await request.json()) as { email?: string };
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const email = (body.email ?? "").trim();

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { success: false, error: "A valid email is required." },
      { status: 400 },
    );
  }

  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!apiKey || !locationId) {
    console.error(
      "[/api/newsletter] Missing GHL_API_KEY or GHL_LOCATION_ID env variable.",
    );
    return NextResponse.json(
      { success: false, error: "Newsletter service is not configured." },
      { status: 500 },
    );
  }

  try {
    const res = await fetch(GHL_UPSERT_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Version: "2021-07-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        locationId,
        email,
        source: "themortgagejedi.com - Newsletter Signup",
        tags: ["Website Lead", "newsletter lead"],
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(
        "[/api/newsletter] GoHighLevel API error",
        res.status,
        detail,
      );
      return NextResponse.json({ success: false }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/newsletter] Request to GoHighLevel failed", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
