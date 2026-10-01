import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import {
  leadSourceCustomFields,
  leadSourceNote,
  leadSourceEmailHtml,
} from "@/lib/ghl-lead-source";

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

const MAX_FILES = 3;
const MAX_TOTAL_BYTES = 10 * 1024 * 1024; // 10MB total
const ACCEPTED_FILE_PREFIXES = ["application/pdf", "image/"];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const firstName = String(formData.get("firstName") ?? "").trim();
    const lastName = String(formData.get("lastName") ?? "").trim();
    // Fall back to a single "name" field for backward compatibility.
    const name =
      [firstName, lastName].filter(Boolean).join(" ").trim() ||
      String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const creditScore = String(formData.get("creditScore") ?? "").trim();
    const lenderName = String(formData.get("lenderName") ?? "").trim();
    const loanAmount = String(formData.get("loanAmount") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const consent =
      String(formData.get("consent") ?? "")
        .trim()
        .toLowerCase() === "yes";
    // Accept both the new multi-file "files" key and the legacy single "file".
    const uploaded = [
      ...formData.getAll("files"),
      ...formData.getAll("file"),
    ].filter((f): f is File => f instanceof File && f.size > 0);
    const leadSourceData = {
      leadSource: String(formData.get("lead_source") ?? "").trim(),
      leadSourceDetail: String(formData.get("lead_source_detail") ?? "").trim(),
      leadSourceAuto: String(formData.get("lead_source_auto") ?? "").trim(),
    };

    // Email is required; name and consent are required by the form.
    if (!email || !name) {
      return NextResponse.json(
        { success: false, error: "Name and email are required." },
        { status: 400 },
      );
    }
    if (!consent) {
      return NextResponse.json(
        { success: false, error: "Consent is required." },
        { status: 400 },
      );
    }

    // Validate uploads as a safety net behind the client-side checks.
    if (uploaded.length > MAX_FILES) {
      return NextResponse.json(
        { success: false, error: `Please upload no more than ${MAX_FILES} files.` },
        { status: 400 },
      );
    }
    const totalBytes = uploaded.reduce((sum, f) => sum + f.size, 0);
    if (totalBytes > MAX_TOTAL_BYTES) {
      return NextResponse.json(
        { success: false, error: "Uploaded files exceed the 10MB limit." },
        { status: 400 },
      );
    }
    const badType = uploaded.some(
      (f) => !ACCEPTED_FILE_PREFIXES.some((p) => f.type.startsWith(p)),
    );
    if (badType) {
      return NextResponse.json(
        { success: false, error: "Only PDF or image files are accepted." },
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

    // 1) Upload each Loan Estimate file to Vercel Blob (if provided).
    const blobUrls: string[] = [];
    for (const upload of uploaded) {
      try {
        const safeName = upload.name.replace(/[^\w.\-]+/g, "_");
        const blob = await put(
          `loan-estimates/${Date.now()}-${safeName}`,
          upload,
          { access: "public" },
        );
        blobUrls.push(blob.url);
      } catch (err) {
        // A blob failure should not lose the lead, so log and continue.
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
        customFields: leadSourceCustomFields(leadSourceData),
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
    const filesList =
      blobUrls.length > 0 ? blobUrls.join("\n") : "Not uploaded";
    const noteBody =
      "Loan Estimate Review Request submitted via themortgagejedi.com\n\n" +
      `Credit Score: ${creditScore || "Not provided"}\n` +
      `Current Lender: ${lenderName || "Not provided"}\n` +
      `Loan Amount: ${loanAmount || "Not provided"}\n` +
      `Message: ${message || "None"}\n` +
      `Consent given: ${consent ? "Yes" : "No"}\n` +
      `Loan Estimate files:\n${filesList}\n\n` +
      leadSourceNote(leadSourceData);

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
      `<p>Name: ${name}<br>Email: ${email}<br>Phone: ${phone || "Not provided"}<br>` +
      `Credit Score: ${creditScore || "Not provided"}<br>` +
      `Current Lender: ${lenderName || "Not provided"}<br>` +
      `Loan Amount: ${loanAmount || "Not provided"}<br>` +
      `Message: ${message || "None"}<br>` +
      `Consent given: ${consent ? "Yes" : "No"}<br>` +
      `Files uploaded: ${blobUrls.length}</p>` +
      `<p>${leadSourceEmailHtml(leadSourceData)}</p>`;

    const emailRes = await fetch(`${GHL_BASE}/conversations/messages`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        type: "Email",
        contactId,
        emailTo: OWNER_EMAIL,
        subject: `New Loan Estimate Review Lead: ${name}`,
        html: emailHtml,
        attachments: blobUrls,
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
