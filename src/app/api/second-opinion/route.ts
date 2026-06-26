import { NextResponse } from "next/server";
import { sendToGHL } from "@/lib/ghl";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const data: Record<string, unknown> = {};
    let fileName: string | null = null;
    let fileSize: number | null = null;

    formData.forEach((value, key) => {
      if (value instanceof File) {
        if (value.size > 0) {
          fileName = value.name;
          fileSize = value.size;
        }
      } else {
        data[key] = value;
      }
    });

    await sendToGHL("secondOpinion", {
      ...data,
      fileName,
      fileSize,
      source: "themortgagejedi.com",
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/second-opinion] error", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
