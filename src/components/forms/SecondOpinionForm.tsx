"use client";

import { useRef, useState } from "react";
import { CheckCircle2, Upload } from "lucide-react";
import { FieldWrapper, Input, Textarea } from "./fields";

export default function SecondOpinionForm() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      await fetch("/api/second-opinion", {
        method: "POST",
        body: formData,
      });
      setDone(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="card-dark flex items-start gap-3 border-gold/40">
        <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-gold" />
        <div>
          <h3 className="font-heading text-xl font-semibold text-white">
            Got it!
          </h3>
          <p className="mt-1 text-gray-light">
            I&apos;ll review your Loan Estimate and reach out within 24 hours
            with my honest feedback.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
      <FieldWrapper label="Name" required>
        <Input name="name" required placeholder="Your full name" />
      </FieldWrapper>
      <FieldWrapper label="Email" required>
        <Input name="email" type="email" required placeholder="you@email.com" />
      </FieldWrapper>
      <FieldWrapper label="Phone" required>
        <Input name="phone" type="tel" required placeholder="(702) 555-0123" />
      </FieldWrapper>
      <FieldWrapper label="Current lender name">
        <Input name="lender" placeholder="Who gave you the estimate?" />
      </FieldWrapper>
      <FieldWrapper label="Loan amount (approximate)">
        <Input name="loanAmount" placeholder="$400,000" />
      </FieldWrapper>

      <FieldWrapper label="Upload your Loan Estimate (PDF)">
        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-white/25 bg-black/40 px-4 py-6 text-gray-mid transition-colors hover:border-gold hover:text-gold">
          <Upload className="h-5 w-5" />
          <span>{fileName ?? "Choose a PDF file"}</span>
          <input
            type="file"
            name="loanEstimate"
            accept="application/pdf,.pdf"
            className="hidden"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
          />
        </label>
      </FieldWrapper>

      <FieldWrapper label="Message (optional)">
        <Textarea name="message" placeholder="Anything you'd like me to know?" />
      </FieldWrapper>

      <button type="submit" disabled={submitting} className="btn-gold w-full">
        {submitting ? "Submitting..." : "Submit for Free Review"}
      </button>
    </form>
  );
}
