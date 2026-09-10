import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const runtime = "nodejs";

const GHL_BASE = "https://services.leadconnectorhq.com";
const OWNER_EMAIL = "mike@themortgagejedi.com";

function ghlHeaders(apiKey: string) {
  return {
    Authorization: `Bearer ${apiKey}`,
    Version: "2021-07-28",
    "Content-Type": "application/json",
  };
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const lenderName = String(formData.get("lenderName") ?? "").trim();
    const loanAmount = String(formData.get("loanAmount") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const file = formData.get("file");

    // Both email and phone are required on the form.
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
        "[/api/rate-review] Missing GHL_API_KEY or GHL_LOCATION_ID env var.",
      );
      return NextResponse.json(
        { success: false, error: "Lead service is not configured." },
        { status: 500 },
      );
    }

    // 1) Upload the Loan Estimate PDF to Vercel Blob (if provided).
    let blobUrl: string | null = null;
    if (file instanceof File && file.size > 0) {
      try {
        const safeName = file.name.replace(/[^\w.\-]+/g, "_");
        const blob = await put(
          `loan-estimates/${Date.now()}-${safeName}`,
          file,
          { access: "public" },
        );
        blobUrl = blob.url;
      } catch (err) {
        // A blob failure should not lose the lead — log and continue.
        console.error("[/api/rate-review] Blob upload failed", err);
      }
    }

    const headers = ghlHeaders(apiKey);

    // 2) Upsert the contact.
    const contactRes = await fetch(`${GHL_BASE}/contacts/upsert`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        locationId,
        name,
        email,
        phone,
        source: "themortgagejedi.com - Loan Estimate Review",
        tags: ["Website Lead", "Loan Estimate Review"],
      }),
    });

    if (!contactRes.ok) {
      const detail = await contactRes.text().catch(() => "");
      console.error(
        "[/api/rate-review] Contact upsert failed",
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
        "[/api/rate-review] Contact upsert returned no contact id",
        contactJson,
      );
      return NextResponse.json({ success: false }, { status: 500 });
    }

    // 3) Add a note with all submitted details.
    const noteBody =
      "Loan Estimate Review Request submitted via themortgagejedi.com\n\n" +
      `Current Lender: ${lenderName || "Not provided"}\n` +
      `Loan Amount: ${loanAmount || "Not provided"}\n` +
      `Message: ${message || "None"}\n` +
      `Loan Estimate PDF: ${blobUrl || "Not uploaded"}`;

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
      console.error(
        "[/api/rate-review] Note creation failed",
        noteRes.status,
        detail,
      );
    }

    // 4) Email the account owner.
    const emailHtml =
      "<p><strong>New loan estimate review request from themortgagejedi.com</strong></p>" +
      `<p>Name: ${name}<br>Email: ${email}<br>Phone: ${phone}<br>` +
      `Current Lender: ${lenderName || "Not provided"}<br>` +
      `Loan Amount: ${loanAmount || "Not provided"}<br>` +
      `Message: ${message || "None"}</p>`;

    const emailRes = await fetch(`${GHL_BASE}/conversations/messages`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        type: "Email",
        contactId,
        emailTo: OWNER_EMAIL,
        subject: `New Loan Estimate Review Lead: ${name}`,
        html: emailHtml,
        attachments: blobUrl ? [blobUrl] : [],
      }),
    });
    if (!emailRes.ok) {
      const detail = await emailRes.text().catch(() => "");
      console.error(
        "[/api/rate-review] Owner email failed",
        emailRes.status,
        detail,
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/rate-review] Unexpected error", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
