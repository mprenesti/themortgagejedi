"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { FieldWrapper, Input, Textarea } from "./fields";
import { submitLead } from "@/lib/submit-lead";

const schema = z.object({
  name: z.string().min(2, "Please enter your name."),
  brokerage: z.string().min(2, "Please enter your brokerage."),
  phone: z.string().min(7, "Please enter a valid phone number."),
  email: z.string().email("Please enter a valid email."),
  lookingFor: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function RealtorForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setStatus("idle");
    const message = [
      values.brokerage ? `Brokerage: ${values.brokerage}` : "",
      values.lookingFor ? `Looking for: ${values.lookingFor}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    const ok = await submitLead({
      name: values.name,
      email: values.email,
      phone: values.phone,
      message,
      formSource: "Realtor Partner",
    });
    if (ok) {
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
            Thanks for reaching out!
          </h3>
          <p className="mt-1 text-gray-light">
            I&apos;ll be in touch shortly to set up a time to connect.
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
            Something went wrong. Please call{" "}
            <a href="tel:+17024970584" className="font-semibold underline">
              (702) 497-0584
            </a>{" "}
            or email{" "}
            <a
              href="mailto:mike@themortgagejedi.com"
              className="font-semibold underline"
            >
              mike@themortgagejedi.com
            </a>{" "}
            and let&apos;s connect directly.
          </p>
        </div>
      ) : null}
      <FieldWrapper label="Name" required error={errors.name?.message}>
        <Input {...register("name")} placeholder="Your full name" />
      </FieldWrapper>
      <FieldWrapper label="Brokerage" required error={errors.brokerage?.message}>
        <Input {...register("brokerage")} placeholder="Your brokerage" />
      </FieldWrapper>
      <FieldWrapper label="Phone" required error={errors.phone?.message}>
        <Input type="tel" {...register("phone")} placeholder="(702) 555-0123" />
      </FieldWrapper>
      <FieldWrapper label="Email" required error={errors.email?.message}>
        <Input type="email" {...register("email")} placeholder="you@email.com" />
      </FieldWrapper>
      <FieldWrapper
        label="What are you looking for in a lender?"
        error={errors.lookingFor?.message}
      >
        <Textarea
          {...register("lookingFor")}
          placeholder="Tell me what matters most to you and your clients..."
        />
      </FieldWrapper>
      <button type="submit" disabled={isSubmitting} className="btn-gold w-full">
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
