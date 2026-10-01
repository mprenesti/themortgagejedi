"use client";

import { useRef, useState } from "react";
import { CheckCircle2, Upload, AlertTriangle } from "lucide-react";
import { FieldWrapper, Input, Textarea, Select } from "./fields";
import LeadSourceField from "./LeadSourceField";
import { trackGenerateLead, trackUploadLoanEstimate } from "@/lib/analytics";

const MAX_FILES = 3;
const MAX_TOTAL_BYTES = 10 * 1024 * 1024; // 10MB total
const ACCEPTED_TYPES = ["application/pdf", "image/"];

const CREDIT_SCORE_OPTIONS = [
  "Excellent (740+)",
  "Good (680 to 739)",
  "Fair (620 to 679)",
  "Below 620",
  "Not sure",
];

function filesAreAccepted(files: File[]): boolean {
  return files.every((f) =>
    ACCEPTED_TYPES.some((t) => f.type === t || f.type.startsWith(t)),
  );
}

export default function SecondOpinionForm() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string>();
  const [leadSource, setLeadSource] = useState("");
  const [leadSourceDetail, setLeadSourceDetail] = useState("");
  const [leadSourceError, setLeadSourceError] = useState<string>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function validateFiles(selected: File[]): string | undefined {
    if (selected.length === 0) {
      return "Please upload your Loan Estimate (PDF or photo).";
    }
    if (selected.length > MAX_FILES) {
      return `Please upload no more than ${MAX_FILES} files.`;
    }
    if (!filesAreAccepted(selected)) {
      return "Only PDF or image files are accepted.";
    }
    const total = selected.reduce((sum, f) => sum + f.size, 0);
    if (total > MAX_TOTAL_BYTES) {
      return "Your files total more than 10MB. Please upload smaller files.";
    }
    return undefined;
  }

  function onFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []);
    setFiles(selected);
    setFileError(validateFiles(selected));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fileValidation = validateFiles(files);
    if (fileValidation) {
      setFileError(fileValidation);
      return;
    }
    if (!leadSource) {
      setLeadSourceError("Please let me know how you heard about me.");
      return;
    }
    setLeadSourceError(undefined);
    setSubmitting(true);
    setError(false);
    try {
      const formData = new FormData(e.currentTarget);
      const res = await fetch("/api/rate-review", {
        method: "POST",
        body: formData,
      });
      const json = (await res.json().catch(() => null)) as {
        success?: boolean;
      } | null;
      if (res.ok && json?.success === true) {
        trackUploadLoanEstimate();
        trackGenerateLead("Loan Estimate Review", leadSource);
        setDone(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
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
      {error ? (
        <div className="flex items-start gap-3 rounded-md border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-300" />
          <p>
            Something went wrong submitting your review request. Please email{" "}
            <a
              href="mailto:mike@themortgagejedi.com"
              className="font-semibold underline"
            >
              mike@themortgagejedi.com
            </a>{" "}
            or call{" "}
            <a href="tel:+17024970584" className="font-semibold underline">
              (702) 497-0584
            </a>{" "}
            and I&apos;ll review your estimate directly.
          </p>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <FieldWrapper label="First name" required>
          <Input name="firstName" required placeholder="First name" />
        </FieldWrapper>
        <FieldWrapper label="Last name" required>
          <Input name="lastName" required placeholder="Last name" />
        </FieldWrapper>
      </div>

      <FieldWrapper label="Email" required>
        <Input name="email" type="email" required placeholder="you@email.com" />
      </FieldWrapper>
      <FieldWrapper label="Phone">
        <Input name="phone" type="tel" placeholder="(702) 555-0123" />
      </FieldWrapper>

      <FieldWrapper label="Approximate credit score" required>
        <Select name="creditScore" required defaultValue="">
          <option value="" disabled>
            Select a range
          </option>
          {CREDIT_SCORE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </FieldWrapper>

      <FieldWrapper label="Tell me a bit about your situation">
        <Textarea
          name="message"
          placeholder="Anything you'd like me to know?"
        />
      </FieldWrapper>

      <FieldWrapper
        label="Upload your Loan Estimate (PDF or photo, up to 3 files)"
        required
        error={fileError}
      >
        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-white/25 bg-black/40 px-4 py-6 text-center text-gray-mid transition-colors hover:border-gold hover:text-gold">
          <Upload className="h-5 w-5 flex-shrink-0" />
          <span>
            {files.length > 0
              ? files.map((f) => f.name).join(", ")
              : "Choose up to 3 files (10MB total)"}
          </span>
          <input
            ref={fileInputRef}
            type="file"
            name="files"
            multiple
            accept="application/pdf,.pdf,image/*"
            className="hidden"
            onChange={onFilesChange}
          />
        </label>
      </FieldWrapper>

      <LeadSourceField
        value={leadSource}
        onValueChange={(v) => {
          setLeadSource(v);
          setLeadSourceError(undefined);
        }}
        detail={leadSourceDetail}
        onDetailChange={setLeadSourceDetail}
        error={leadSourceError}
        name="lead_source"
        detailName="lead_source_detail"
        autoName="lead_source_auto"
      />

      <label className="flex items-start gap-3 text-sm text-gray-light">
        <input
          type="checkbox"
          name="consent"
          value="yes"
          required
          className="mt-1 h-4 w-4 flex-shrink-0 rounded border-white/25 bg-black/60 text-gold focus:ring-gold"
        />
        <span>
          I consent to Mike Prenesti reviewing my Loan Estimate for the purpose
          of providing a free, no-obligation second opinion. I understand this
          is not a loan application and my information will be kept private.
        </span>
      </label>

      <button type="submit" disabled={submitting} className="btn-gold w-full">
        {submitting ? "Submitting..." : "Submit for Free Review"}
      </button>
    </form>
  );
}
