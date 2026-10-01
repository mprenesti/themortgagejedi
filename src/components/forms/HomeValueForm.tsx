"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { FieldWrapper, Input, Textarea } from "./fields";
import LeadSourceField from "./LeadSourceField";
import { submitLead } from "@/lib/submit-lead";
import { getLeadSourceAuto } from "@/lib/attribution";
import { trackGenerateLead } from "@/lib/analytics";

const schema = z.object({
  address: z.string().min(5, "Please enter the property address."),
  firstName: z.string().min(1, "Please enter your first name."),
  lastName: z.string().min(1, "Please enter your last name."),
  email: z.string().email("Please enter a valid email."),
  phone: z.string().optional(),
  reason: z.string().optional(),
  consent: z.literal(true, {
    message: "Please provide your consent to continue.",
  }),
});

type FormValues = z.infer<typeof schema>;

export default function HomeValueForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [leadSource, setLeadSource] = useState("");
  const [leadSourceDetail, setLeadSourceDetail] = useState("");
  const [leadSourceError, setLeadSourceError] = useState<string>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setStatus("idle");
    if (!leadSource) {
      setLeadSourceError("Please let me know how you heard about me.");
      return;
    }
    setLeadSourceError(undefined);
    const message = [
      `Property address: ${values.address}`,
      values.reason ? `Reason for checking value: ${values.reason}` : "",
      "Consent given: Yes (free home value report)",
    ]
      .filter(Boolean)
      .join("\n");
    const ok = await submitLead({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      message,
      formSource: "Home Value Report",
      leadSource,
      leadSourceDetail,
      leadSourceAuto: getLeadSourceAuto(),
    });
    if (ok) {
      trackGenerateLead("Home Value Report", leadSource);
      setStatus("success");
      reset();
    } else {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="card-dark flex items-start gap-3 border-gold/40">
        <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-gold" />
        <div>
          <h3 className="font-heading text-xl font-semibold text-white">
            Request received!
          </h3>
          <p className="mt-1 text-gray-light">
            I&apos;ll pull the comps for your address and follow up within a day
            or two with your personal home value report.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {status === "error" ? (
        <div className="flex items-start gap-3 rounded-md border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-300" />
          <p>
            Something went wrong submitting your request. Please email{" "}
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
            and I&apos;ll put your report together directly.
          </p>
        </div>
      ) : null}

      <FieldWrapper label="Property address" required error={errors.address?.message}>
        <Input
          {...register("address")}
          placeholder="123 Main St, Las Vegas, NV 89101"
          autoComplete="street-address"
        />
      </FieldWrapper>

      <div className="grid gap-4 sm:grid-cols-2">
        <FieldWrapper label="First name" required error={errors.firstName?.message}>
          <Input {...register("firstName")} placeholder="First name" />
        </FieldWrapper>
        <FieldWrapper label="Last name" required error={errors.lastName?.message}>
          <Input {...register("lastName")} placeholder="Last name" />
        </FieldWrapper>
      </div>

      <FieldWrapper label="Email" required error={errors.email?.message}>
        <Input type="email" {...register("email")} placeholder="you@email.com" />
      </FieldWrapper>
      <FieldWrapper label="Phone" error={errors.phone?.message}>
        <Input type="tel" {...register("phone")} placeholder="(702) 555-0123" />
      </FieldWrapper>

      <FieldWrapper
        label="What's prompting you to check your value?"
        error={errors.reason?.message}
      >
        <Textarea
          {...register("reason")}
          placeholder="Thinking about selling, considering a HELOC, just curious..."
        />
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
      />

      <label className="flex items-start gap-3 text-sm text-gray-light">
        <input
          type="checkbox"
          {...register("consent")}
          className="mt-1 h-4 w-4 flex-shrink-0 rounded border-white/25 bg-black/60 text-gold focus:ring-gold"
        />
        <span>
          I consent to Mike Prenesti preparing a free home value report for the
          property address provided. I understand this is not a loan application
          or listing agreement and my information will be kept private.
        </span>
      </label>
      {errors.consent?.message ? (
        <span className="block text-sm text-red-400">
          {errors.consent.message}
        </span>
      ) : null}

      <button type="submit" disabled={isSubmitting} className="btn-gold w-full">
        {isSubmitting ? "Submitting..." : "Get My Free Home Value Report"}
      </button>
    </form>
  );
}
