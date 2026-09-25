import { NextResponse } from "next/server";
import {
  leadSourceCustomFields,
  leadSourceNote,
} from "@/lib/ghl-lead-source";

export const runtime = "nodejs";

type LeadBody = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
  formSource?: string;
  lead_source?: string;
  lead_source_detail?: string;
  lead_source_auto?: string;
};

const GHL_BASE = "https://services.leadconnectorhq.com";
const GHL_UPSERT_URL = `${GHL_BASE}/contacts/upsert`;

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

  const { firstName, lastName, email, phone, message, formSource } = body;
  const leadSourceData = {
    leadSource: body.lead_source,
    leadSourceDetail: body.lead_source_detail,
    leadSourceAuto: body.lead_source_auto,
  };

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

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    Version: "2021-07-28",
    "Content-Type": "application/json",
  };

  try {
    const res = await fetch(GHL_UPSERT_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        locationId,
        firstName,
        lastName,
        email,
        phone,
        source: "themortgagejedi.com",
        tags: ["Website Lead", formSource].filter(Boolean),
        customFields: leadSourceCustomFields(leadSourceData),
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

    // Best-effort note so the message and lead source always land on the
    // contact record even when the optional custom fields are not configured.
    const contactJson = (await res.json().catch(() => null)) as {
      contact?: { id?: string };
    } | null;
    const contactId = contactJson?.contact?.id;
    if (contactId) {
      const noteBody =
        (message ? `${message}\n\n` : "") + leadSourceNote(leadSourceData);
      const noteRes = await fetch(
        `${GHL_BASE}/contacts/${contactId}/notes`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({ body: noteBody }),
        },
      );
      if (!noteRes.ok) {
        const detail = await noteRes.text().catch(() => "");
        console.error("[/api/lead] Note creation failed", noteRes.status, detail);
      }
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
