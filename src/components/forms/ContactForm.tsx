"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { FieldWrapper, Input, Textarea } from "./fields";

const schema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  phone: z.string().min(7, "Please enter a valid phone number."),
  message: z.string().min(5, "Please enter a short message."),
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          message: values.message,
        }),
      });
      const json = (await res.json().catch(() => null)) as {
        success?: boolean;
      } | null;
      if (res.ok && json?.success === true) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="card-dark flex items-start gap-3 border-gold/40">
        <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-gold" />
        <div>
          <h3 className="font-heading text-xl font-semibold text-white">
            Message sent!
          </h3>
          <p className="mt-1 text-gray-light">
            Thanks for reaching out. Mike will get back to you within one
            business day.
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
            Something went wrong sending your message. Please call{" "}
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
            and I&apos;ll take care of you directly.
          </p>
        </div>
      ) : null}
      <FieldWrapper label="Name" required error={errors.name?.message}>
        <Input {...register("name")} placeholder="Your full name" />
      </FieldWrapper>
      <FieldWrapper label="Email" required error={errors.email?.message}>
        <Input type="email" {...register("email")} placeholder="you@email.com" />
      </FieldWrapper>
      <FieldWrapper label="Phone" required error={errors.phone?.message}>
        <Input type="tel" {...register("phone")} placeholder="(702) 555-0123" />
      </FieldWrapper>
      <FieldWrapper label="Message" required error={errors.message?.message}>
        <Textarea
          {...register("message")}
          placeholder="Tell me a little about what you're looking for..."
        />
      </FieldWrapper>
      <button type="submit" disabled={isSubmitting} className="btn-gold w-full">
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
