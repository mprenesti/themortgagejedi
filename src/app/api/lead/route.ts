import { NextResponse } from "next/server";
import { sendToGHL, type GHLWebhookKey } from "@/lib/ghl";

const VALID_TYPES: GHLWebhookKey[] = [
  "contact",
  "getStarted",
  "guideOptIn",
  "newsletter",
  "realtor",
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, data } = body as {
      type?: GHLWebhookKey;
      data?: Record<string, unknown>;
    };

    if (!type || !VALID_TYPES.includes(type)) {
      return NextResponse.json(
        { ok: false, error: "Invalid lead type." },
        { status: 400 },
      );
    }

    await sendToGHL(type, {
      ...data,
      source: "themortgagejedi.com",
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/lead] error", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
