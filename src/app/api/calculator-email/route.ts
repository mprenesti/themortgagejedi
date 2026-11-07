import { NextResponse } from "next/server";
import { z } from "zod";
import { formatCurrency } from "@/lib/utils";
import {
  leadSourceCustomFields,
  leadSourceNote,
} from "@/lib/ghl-lead-source";
import {
  CALCULATOR_EMAIL_TAG,
  calculatorDisplayFields,
} from "@/lib/calculator-email";
import { calculatorCustomFields } from "@/lib/ghl-calculator-fields";

export const runtime = "nodejs";

const GHL_BASE = "https://services.leadconnectorhq.com";
const GHL_UPSERT_URL = `${GHL_BASE}/contacts/upsert`;

const snapshotSchema = z.object({
  calculatorName: z.string().min(1).max(80),
  homePrice: z.number().finite().min(0).max(1_000_000_000),
  downPayment: z.number().finite().min(0).max(1_000_000_000),
  downPercent: z.number().finite().min(0).max(100),
  loanAmount: z.number().finite().min(0).max(1_000_000_000),
  loanTermYears: z.number().int().min(1).max(50),
  interestRate: z.number().finite().min(0).max(50),
  monthlyPi: z.number().finite().min(0).max(1_000_000),
  monthlyTax: z.number().finite().min(0).max(1_000_000),
  monthlyInsurance: z.number().finite().min(0).max(1_000_000),
  monthlyPmi: z.number().finite().min(0).max(1_000_000).nullable(),
  monthlyTotal: z.number().finite().min(0).max(1_000_000),
});

const bodySchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(40).optional(),
  website: z.string().optional(),
  consent: z.literal(true),
  lead_source: z.string().trim().max(120).optional(),
  lead_source_detail: z.string().trim().max(500).optional(),
  lead_source_auto: z.string().trim().max(120).optional(),
  calculator: snapshotSchema,
});

function shouldDeliverToCrm() {
  if (process.env.VERCEL_ENV === "preview") return false;
  if (process.env.NODE_ENV === "development") return false;
  return true;
}

function ghlHeaders(apiKey: string) {
  return {
    Authorization: `Bearer ${apiKey}`,
    Version: "2021-07-28",
    "Content-Type": "application/json",
  };
}

function phoneDigits(phone: string) {
  return phone.replace(/\D/g, "");
}

function calculatorNote(
  calc: z.infer<typeof snapshotSchema>,
  leadSourceData: {
    leadSource?: string;
    leadSourceDetail?: string;
    leadSourceAuto?: string;
  },
) {
  const display = calculatorDisplayFields(calc);
  const pmiLine =
    calc.monthlyPmi === null
      ? "PMI (monthly): not shown on this calculator"
      : `PMI (monthly): ${formatCurrency(calc.monthlyPmi)}`;
  return [
    `Calculator email request (${CALCULATOR_EMAIL_TAG})`,
    `Calculator: ${calc.calculatorName}`,
    `Home price: ${display["contact.calc_home_price"]}`,
    `Down payment: ${display["contact.calc_down_payment"]}`,
    `Loan amount: ${display["contact.calc_loan_amount"]}`,
    `Loan term: ${display["contact.calc_loan_term"]}`,
    `Interest rate used: ${display["contact.calc_interest_rate"]}`,
    `Estimated monthly principal and interest: ${display["contact.calc_monthly_pi"]}`,
    `Property tax (monthly): ${display["contact.calc_monthly_tax"]}`,
    `Insurance (monthly): ${display["contact.calc_monthly_insurance"]}`,
    pmiLine,
    `Estimated total monthly payment: ${display["contact.calc_total_monthly_payment"]}`,
    "Consent: Yes",
    "",
    leadSourceNote(leadSourceData),
  ].join("\n");
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "Please check the form and try again." },
      { status: 400 },
    );
  }

  const body = parsed.data;

  // Honeypot: pretend success and do not create a contact.
  if (body.website && body.website.trim() !== "") {
    return NextResponse.json({ success: true });
  }

  if (body.phone) {
    const digits = phoneDigits(body.phone);
    if (digits.length > 0 && (digits.length < 7 || digits.length > 15)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid phone number." },
        { status: 400 },
      );
    }
  }

  if (!shouldDeliverToCrm()) {
    return NextResponse.json({ success: true });
  }

  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!apiKey || !locationId) {
    console.error(
      "[/api/calculator-email] Missing GHL_API_KEY or GHL_LOCATION_ID environment variable.",
    );
    return NextResponse.json(
      { success: false, error: "Lead service is not configured." },
      { status: 500 },
    );
  }

  const leadSourceData = {
    leadSource: body.lead_source,
    leadSourceDetail: body.lead_source_detail,
    leadSourceAuto: body.lead_source_auto,
  };
  const phone = body.phone?.trim() ? body.phone.trim() : undefined;
  const headers = ghlHeaders(apiKey);
  const leadFields = leadSourceCustomFields(leadSourceData);

  try {
    const calcFields = await calculatorCustomFields(body.calculator, {
      locationId,
      headers,
    });
    const upsertBody = (customFields: typeof leadFields) =>
      JSON.stringify({
        locationId,
        firstName: body.firstName,
        email: body.email,
        phone,
        source: "themortgagejedi.com",
        tags: ["Website Lead", CALCULATOR_EMAIL_TAG],
        customFields,
      });

    let res = await fetch(GHL_UPSERT_URL, {
      method: "POST",
      headers,
      body: upsertBody([...leadFields, ...calcFields]),
    });

    if (!res.ok && calcFields.length > 0) {
      await res.text().catch(() => "");
      console.warn(
        "[/api/calculator-email] Calculator custom fields rejected; retrying without them",
        res.status,
      );
      res = await fetch(GHL_UPSERT_URL, {
        method: "POST",
        headers,
        body: upsertBody(leadFields),
      });
    }

    if (!res.ok) {
      await res.text().catch(() => "");
      console.error("[/api/calculator-email] GoHighLevel API error", res.status);
      return NextResponse.json(
        {
          success: false,
          error: "We could not send your breakdown. Please try again.",
        },
        { status: 500 },
      );
    }

    const contactJson = (await res.json().catch(() => null)) as {
      contact?: { id?: string };
    } | null;
    const contactId = contactJson?.contact?.id;
    if (contactId) {
      const noteRes = await fetch(`${GHL_BASE}/contacts/${contactId}/notes`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          body: calculatorNote(body.calculator, leadSourceData),
        }),
      });
      if (!noteRes.ok) {
        console.error(
          "[/api/calculator-email] Note creation failed",
          noteRes.status,
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    console.error("[/api/calculator-email] Request to GoHighLevel failed");
    return NextResponse.json(
      {
        success: false,
        error: "We could not send your breakdown. Please try again.",
      },
      { status: 500 },
    );
  }
}
