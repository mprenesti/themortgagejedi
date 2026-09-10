"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertTriangle } from "lucide-react";
import { FieldWrapper, Input } from "./fields";
import { submitLead } from "@/lib/submit-lead";

const schema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  phone: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function GuideOptIn({
  formSource = "First-Time Buyer Guide Download",
}: {
  formSource?: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setStatus("idle");
    const ok = await submitLead({
      name: values.name,
      email: values.email,
      phone: values.phone,
      formSource,
    });
    if (ok) {
      router.push("/thank-you?guide=true");
    } else {
      setStatus("error");
    }
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
            and I&apos;ll send the guide over.
          </p>
        </div>
      ) : null}
      <FieldWrapper label="Name" required error={errors.name?.message}>
        <Input {...register("name")} placeholder="Your full name" />
      </FieldWrapper>
      <FieldWrapper label="Email" required error={errors.email?.message}>
        <Input type="email" {...register("email")} placeholder="you@email.com" />
      </FieldWrapper>
      <FieldWrapper label="Phone (optional)" error={errors.phone?.message}>
        <Input type="tel" {...register("phone")} placeholder="(702) 555-0123" />
      </FieldWrapper>
      <button type="submit" disabled={isSubmitting} className="btn-gold w-full">
        {isSubmitting ? "Sending..." : "Download the Free Guide"}
      </button>
      <p className="text-center text-xs text-gray-mid">
        No spam. Unsubscribe anytime.
      </p>
    </form>
  );
}
