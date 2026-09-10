import { NextResponse } from "next/server";

export const runtime = "nodejs";

const GHL_BASE = "https://services.leadconnectorhq.com";

type ContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

function ghlHeaders(apiKey: string) {
  return {
    Authorization: `Bearer ${apiKey}`,
    Version: "2021-07-28",
    "Content-Type": "application/json",
  };
}

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const message = (body.message ?? "").trim();

  // Both email and phone are required on the contact form.
  if (!email || !phone) {
    return NextResponse.json(
      { success: false, error: "Email and phone are required." },
      { status: 400 },
    );
  }

  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!apiKey || !locationId) {
    console.error(
      "[/api/contact] Missing GHL_API_KEY or GHL_LOCATION_ID env variable.",
    );
    return NextResponse.json(
      { success: false, error: "Contact service is not configured." },
      { status: 500 },
    );
  }

  const headers = ghlHeaders(apiKey);

  try {
    // 1) Upsert the contact.
    const contactRes = await fetch(`${GHL_BASE}/contacts/upsert`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        locationId,
        name,
        email,
        phone,
        source: "themortgagejedi.com - Contact Form",
        tags: ["Website Lead", "Contact Form"],
      }),
    });

    if (!contactRes.ok) {
      const detail = await contactRes.text().catch(() => "");
      console.error(
        "[/api/contact] Contact upsert failed",
        contactRes.status,
        detail,
      );
      return NextResponse.json({ success: false }, { status: 500 });
    }

    const contactJson = (await contactRes.json().catch(() => null)) as {
      contact?: { id?: string };
    } | null;
    const contactId = contactJson?.contact?.id;

    if (!contactId) {
      console.error(
        "[/api/contact] Contact upsert returned no contact id",
        contactJson,
      );
      return NextResponse.json({ success: false }, { status: 500 });
    }

    // 2) Add the message as a note.
    const noteRes = await fetch(`${GHL_BASE}/contacts/${contactId}/notes`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        body: `Contact Form message via themortgagejedi.com\n\n${message}`,
      }),
    });
    if (!noteRes.ok) {
      const detail = await noteRes.text().catch(() => "");
      console.error(
        "[/api/contact] Note creation failed",
        noteRes.status,
        detail,
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/contact] Unexpected error", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
