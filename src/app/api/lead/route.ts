import { NextResponse } from "next/server";

export const runtime = "nodejs";

type LeadBody = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
  formSource?: string;
};

const GHL_UPSERT_URL = "https://services.leadconnectorhq.com/contacts/upsert";

export async function POST(request: Request) {
  let body: LeadBody;
  try {
    body = (await request.json()) as LeadBody;
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const { firstName, lastName, email, phone, formSource } = body;

  // At least one contact method is required to create a usable lead.
  if (!email && !phone) {
    return NextResponse.json(
      { success: false, error: "An email or phone number is required." },
      { status: 400 },
    );
  }

  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!apiKey || !locationId) {
    // Missing configuration is a server problem, not a client one. Never leak
    // which variable is missing to the client.
    console.error(
      "[/api/lead] Missing GHL_API_KEY or GHL_LOCATION_ID environment variable.",
    );
    return NextResponse.json(
      { success: false, error: "Lead service is not configured." },
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
        firstName,
        lastName,
        email,
        phone,
        source: "themortgagejedi.com",
        tags: ["Website Lead", formSource].filter(Boolean),
      }),
    });

    if (!res.ok) {
      // Log the raw status/response server-side only for debugging. Never
      // return the API key or raw GHL response to the client.
      const detail = await res.text().catch(() => "");
      console.error("[/api/lead] GoHighLevel API error", res.status, detail);
      return NextResponse.json(
        {
          success: false,
          error: "We couldn't submit your request. Please try again.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/lead] Request to GoHighLevel failed", err);
    return NextResponse.json(
      {
        success: false,
        error: "We couldn't submit your request. Please try again.",
      },
      { status: 500 },
    );
  }
}
