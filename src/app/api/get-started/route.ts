import { NextResponse } from "next/server";

export const runtime = "nodejs";

const GHL_BASE = "https://services.leadconnectorhq.com";
const PIPELINE_ID = "2vY5fxvNqCkw24d4Bzzn";
const PIPELINE_STAGE_ID = "42aa2e59-3d24-4ca6-b8dd-2209e54b5088";
const OWNER_EMAIL = "mike@themortgagejedi.com";

const FIELD_FIRST_TIME_BUYER = "cwtGtOBoOXHu9eBcfcTQ";
const FIELD_PAYMENT_RANGE = "LQAzpfIYjSoXvwZbkUMI";
const FIELD_CREDIT_SCORE = "UUjnx9z4GUh38yf28351";
const FIELD_HEAR_ABOUT = "QLrEl8MQGtB4M9aFJAq1";

type QuizBody = {
  intent?: string;
  firstTimeBuyer?: string;
  paymentRange?: string;
  creditScore?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  bestTimeToReach?: string;
  hearAboutSource?: string;
};

function ghlHeaders(apiKey: string) {
  return {
    Authorization: `Bearer ${apiKey}`,
    Version: "2021-07-28",
    "Content-Type": "application/json",
  };
}

function intentToTag(intent: string): string | null {
  switch (intent) {
    case "Buy a home":
      return "purchase";
    case "Refinance":
      return "refinance";
    case "Cash out / use equity":
      return "radar-cashout";
    case "Invest in real estate":
      return "investor-lead";
    default:
      // "I'm not sure yet" and anything unknown -> no additional tag.
      return null;
  }
}

function firstTimeToValue(firstTimeBuyer: string): string | null {
  switch (firstTimeBuyer) {
    case "Yes, first time":
      return "Yes";
    case "No, I've owned before":
      return "No";
    default:
      // "I'm currently renting" is ambiguous -> capture in note instead.
      return null;
  }
}

function creditToBucket(creditScore: string): string | null {
  switch (creditScore) {
    case "Excellent (720+)":
      return "700+";
    case "Good (680 to 719)":
      return "680-700";
    case "Fair (620 to 679)":
      return "640-680";
    case "Building (580 to 619)":
      return "580-640";
    default:
      // "Not sure" -> capture in note instead.
      return null;
  }
}

export async function POST(request: Request) {
  let body: QuizBody;
  try {
    body = (await request.json()) as QuizBody;
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const intent = (body.intent ?? "").trim();
  const firstTimeBuyer = (body.firstTimeBuyer ?? "").trim();
  const paymentRange = (body.paymentRange ?? "").trim();
  const creditScore = (body.creditScore ?? "").trim();
  const firstName = (body.firstName ?? "").trim();
  const lastName = (body.lastName ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const bestTimeToReach = (body.bestTimeToReach ?? "").trim();
  const hearAboutSource = (body.hearAboutSource ?? "").trim();

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
      "[/api/get-started] Missing GHL_API_KEY or GHL_LOCATION_ID env variable.",
    );
    return NextResponse.json(
      { success: false, error: "Lead service is not configured." },
      { status: 500 },
    );
  }

  const headers = ghlHeaders(apiKey);

  try {
    const intentTag = intentToTag(intent);
    const tags = ["Website Lead", "Get Started Quiz"];
    if (intentTag) tags.push(intentTag);

    const firstTimeValue = firstTimeToValue(firstTimeBuyer);
    const creditBucket = creditToBucket(creditScore);

    const customFields: { id: string; field_value: string }[] = [];
    if (firstTimeValue) {
      customFields.push({
        id: FIELD_FIRST_TIME_BUYER,
        field_value: firstTimeValue,
      });
    }
    if (paymentRange) {
      customFields.push({ id: FIELD_PAYMENT_RANGE, field_value: paymentRange });
    }
    if (creditBucket) {
      customFields.push({ id: FIELD_CREDIT_SCORE, field_value: creditBucket });
    }
    if (hearAboutSource) {
      customFields.push({ id: FIELD_HEAR_ABOUT, field_value: hearAboutSource });
    }

    // 1) Upsert the contact.
    const contactRes = await fetch(`${GHL_BASE}/contacts/upsert`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        locationId,
        firstName,
        lastName,
        email,
        phone,
        source: "themortgagejedi.com - Get Started Quiz",
        tags,
        customFields,
      }),
    });

    if (!contactRes.ok) {
      const detail = await contactRes.text().catch(() => "");
      console.error(
        "[/api/get-started] Contact upsert failed",
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
        "[/api/get-started] Contact upsert returned no contact id",
        contactJson,
      );
      return NextResponse.json({ success: false }, { status: 500 });
    }

    // 2) Add a note with the full raw quiz answers.
    const noteBody =
      "Get Started Quiz submitted via themortgagejedi.com\n\n" +
      `Intent: ${intent}\n` +
      `First-time buyer: ${firstTimeBuyer}\n` +
      `Payment range: ${paymentRange}\n` +
      `Credit score: ${creditScore}\n` +
      `Best time to reach: ${bestTimeToReach || "Not provided"}\n` +
      `Heard about Mike via: ${hearAboutSource || "Not provided"}`;

    const noteRes = await fetch(`${GHL_BASE}/contacts/${contactId}/notes`, {
      method: "POST",
      headers,
      body: JSON.stringify({ body: noteBody }),
    });
    if (!noteRes.ok) {
      const detail = await noteRes.text().catch(() => "");
      console.error(
        "[/api/get-started] Note creation failed",
        noteRes.status,
        detail,
      );
    }

    // 3) Create an Opportunity in the Leads pipeline.
    const oppRes = await fetch(`${GHL_BASE}/opportunities/upsert`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        pipelineId: PIPELINE_ID,
        pipelineStageId: PIPELINE_STAGE_ID,
        contactId,
        name: `${firstName} ${lastName} — Get Started (${intent})`,
        status: "open",
      }),
    });
    if (!oppRes.ok) {
      const detail = await oppRes.text().catch(() => "");
      console.error(
        "[/api/get-started] Opportunity upsert failed",
        oppRes.status,
        detail,
      );
    }

    // 4) Email the account owner.
    const emailHtml =
      "<p><strong>New Get Started quiz lead from themortgagejedi.com</strong></p>" +
      `<p>Name: ${firstName} ${lastName}<br>Email: ${email}<br>Phone: ${phone}<br>` +
      `Intent: ${intent}<br>First-time buyer: ${firstTimeBuyer}<br>` +
      `Payment range: ${paymentRange}<br>Credit score: ${creditScore}<br>` +
      `Best time to reach: ${bestTimeToReach || "Not provided"}<br>` +
      `Heard about Mike via: ${hearAboutSource || "Not provided"}</p>`;

    const emailRes = await fetch(`${GHL_BASE}/conversations/messages`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        type: "Email",
        contactId,
        emailTo: OWNER_EMAIL,
        subject: `New Get Started Lead: ${firstName} ${lastName}`,
        html: emailHtml,
      }),
    });
    if (!emailRes.ok) {
      const detail = await emailRes.text().catch(() => "");
      console.error(
        "[/api/get-started] Owner email failed",
        emailRes.status,
        detail,
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/get-started] Unexpected error", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
