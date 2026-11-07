"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { FieldWrapper, Input } from "@/components/forms/fields";
import LeadSourceField from "@/components/forms/LeadSourceField";
import { getLeadSourceAuto } from "@/lib/attribution";
import { trackGenerateLead } from "@/lib/analytics";
import { SITE } from "@/lib/constants";
import type { CalculatorEmailSnapshot } from "@/lib/calculator-email";
import { CALCULATOR_EMAIL_TAG } from "@/lib/calculator-email";

const DISCLAIMER =
  "These are estimates for educational purposes only, not a loan offer, a Loan Estimate, or a commitment to lend. Actual rates, payments, and eligibility depend on your financial situation and loan program.";

export default function CalculatorEmailCapture({
  snapshot,
}: {
  snapshot: CalculatorEmailSnapshot;
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [consent, setConsent] = useState(false);
  const [leadSource, setLeadSource] = useState("");
  const [leadSourceDetail, setLeadSourceDetail] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    firstName?: string;
    email?: string;
    phone?: string;
    consent?: string;
  }>({});

  function validate() {
    const next: typeof fieldErrors = {};
    if (!firstName.trim()) next.firstName = "Please enter your first name.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Please enter a valid email.";
    }
    const digits = phone.replace(/\D/g, "");
    if (digits.length > 0 && (digits.length < 7 || digits.length > 15)) {
      next.phone = "Please enter a valid phone number.";
    }
    if (!consent) {
      next.consent = "Please check the box to continue.";
    }
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "success" || submitting) return;
    setStatus("idle");
    setErrorMessage("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/calculator-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          website,
          consent: true,
          lead_source: leadSource || undefined,
          lead_source_detail: leadSourceDetail || undefined,
          lead_source_auto: getLeadSourceAuto(),
          calculator: snapshot,
        }),
      });
      const json = (await res.json().catch(() => null)) as {
        success?: boolean;
        error?: string;
      } | null;
      if (res.ok && json?.success === true) {
        trackGenerateLead(snapshot.calculatorName, CALCULATOR_EMAIL_TAG);
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(
          json?.error || "Something went wrong. Please try again.",
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      id="calculator-email-capture"
      className="rounded-2xl border border-white/10 bg-charcoal p-5 sm:p-6"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="text-sm font-semibold text-gold hover:underline"
        aria-expanded={open}
      >
        {open ? "Hide email form" : "Email me this breakdown"}
      </button>

      {open ? (
        <div className="mt-4">
          {status === "success" ? (
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-gold" />
              <p className="text-gray-light">
                Check your inbox. If you do not see it in a few minutes, check
                your spam folder.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="relative space-y-4">
              {status === "error" ? (
                <div className="flex items-start gap-3 rounded-md border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">
                  <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-300" />
                  <p>{errorMessage}</p>
                </div>
              ) : null}

              <p className="text-sm text-gray-mid">{DISCLAIMER}</p>

              <div aria-hidden="true" className="sr-only">
                <label>
                  Website
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    name="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </label>
              </div>

              <FieldWrapper
                label="First name"
                required
                error={fieldErrors.firstName}
              >
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="given-name"
                  placeholder="First name"
                />
              </FieldWrapper>

              <FieldWrapper label="Email" required error={fieldErrors.email}>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="you@email.com"
                />
              </FieldWrapper>

              <FieldWrapper
                label="Mobile phone (optional)"
                error={fieldErrors.phone}
              >
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  placeholder="(702) 555-0123"
                />
              </FieldWrapper>

              <LeadSourceField
                value={leadSource}
                onValueChange={setLeadSource}
                detail={leadSourceDetail}
                onDetailChange={setLeadSourceDetail}
                required={false}
              />

              <label className="flex items-start gap-3 text-sm text-gray-light">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 flex-shrink-0 rounded border-white/25 bg-black/60 text-gold focus:ring-gold"
                />
                <span>
                  I agree to receive my calculator results and follow-up from
                  Mike Prenesti, {SITE.name}, at {SITE.company} ({SITE.nmls}
                  ; {SITE.corporateNmls}) by email. If I enter a phone number, I
                  agree to be contacted by call or text. Message and data rates
                  may apply. I can unsubscribe at any time. See our{" "}
                  <Link href="/privacy-policy" className="text-gold underline">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/terms" className="text-gold underline">
                    Terms of Use
                  </Link>
                  .
                </span>
              </label>
              {fieldErrors.consent ? (
                <span className="block text-sm text-red-400">
                  {fieldErrors.consent}
                </span>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className="btn-outline w-full"
              >
                {submitting ? "Sending..." : "Email me this breakdown"}
              </button>
            </form>
          )}
        </div>
      ) : null}
    </div>
  );
}
