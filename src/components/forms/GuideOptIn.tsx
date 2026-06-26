"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FieldWrapper, Input } from "./fields";

const schema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  phone: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function GuideOptIn() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "guideOptIn",
        data: { ...values, tag: "first-time-buyer-guide" },
      }),
    });
    router.push("/thank-you?guide=true");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
