"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { FieldWrapper, Input, Textarea } from "./fields";

const schema = z.object({
  name: z.string().min(2, "Please enter your name."),
  brokerage: z.string().min(2, "Please enter your brokerage."),
  phone: z.string().min(7, "Please enter a valid phone number."),
  email: z.string().email("Please enter a valid email."),
  lookingFor: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function RealtorForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "realtor",
        data: { ...values, tag: "realtor-partner" },
      }),
    });
  }

  if (isSubmitSuccessful) {
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
