"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { FieldWrapper, Input, Select } from "./fields";
import BookingEmbed from "@/components/ui/BookingEmbed";
import { cn } from "@/lib/utils";

type ChoiceStep = {
  key: string;
  question: string;
  options: string[];
};

const choiceSteps: ChoiceStep[] = [
  {
    key: "goal",
    question: "What are you looking to do?",
    options: [
      "Buy a home",
      "Refinance",
      "Cash out / use equity",
      "Invest in real estate",
      "I'm not sure yet",
    ],
  },
  {
    key: "firstTime",
    question: "Are you a first time homebuyer?",
    options: ["Yes, first time", "No, I've owned before", "I'm currently renting"],
  },
  {
    key: "payment",
    question: "What's your comfortable monthly payment range?",
    options: [
      "Under $1,500/month",
      "$1,500 - $2,000/month",
      "$2,000 - $2,500/month",
      "$2,500 - $3,000/month",
      "Over $3,000/month",
    ],
  },
  {
    key: "credit",
    question: "What's your credit score range? (approximate is fine)",
    options: [
      "Excellent (720+)",
      "Good (680 to 719)",
      "Fair (620 to 679)",
      "Building (580 to 619)",
      "Not sure",
    ],
  },
];

type Answers = Record<string, string>;

export default function GetStartedQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bestTime: "Morning",
    referral: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const totalSteps = choiceSteps.length + 1; // +1 for contact step
  const isContactStep = step === choiceSteps.length;
  const progress = Math.round(((step + (submitted ? 1 : 0)) / totalSteps) * 100);

  function chooseOption(key: string, value: string) {
    setAnswers((a) => ({ ...a, [key]: value }));
    setStep((s) => s + 1);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "getStarted",
          data: {
            ...answers,
            ...contact,
            name: `${contact.firstName} ${contact.lastName}`.trim(),
          },
        }),
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-gold/30 bg-charcoal p-7 sm:p-9">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-1 h-8 w-8 flex-shrink-0 text-gold" />
          <div>
            <h2 className="font-heading text-2xl font-bold text-white">
              Thanks{contact.firstName ? `, ${contact.firstName}` : ""}!
            </h2>
            <p className="mt-2 text-gray-light">
              Mike will reach out within 1 business day. In the meantime, book a
              time that works for you.
            </p>
          </div>
        </div>
        <div className="mt-6">
          <BookingEmbed />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-charcoal p-7 sm:p-9">
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-gray-mid">
          <span>
            Step {step + 1} of {totalSteps}
          </span>
          <span>{progress}%</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-black/60">
          <div
            className="h-full rounded-full bg-gold transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {!isContactStep ? (
        <div>
          <h2 className="font-heading text-2xl font-bold text-white">
            {choiceSteps[step].question}
          </h2>
          <div className="mt-6 space-y-3">
            {choiceSteps[step].options.map((option) => (
              <button
                key={option}
                onClick={() => chooseOption(choiceSteps[step].key, option)}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg border px-5 py-4 text-left font-heading text-lg font-medium transition-colors",
                  answers[choiceSteps[step].key] === option
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-white/15 bg-black/40 text-white hover:border-gold/50 hover:bg-white/5",
                )}
              >
                {option}
                <ArrowRight className="h-5 w-5 text-gold" />
              </button>
            ))}
          </div>
          {step > 0 ? (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="mt-6 inline-flex items-center gap-1 text-sm text-gray-mid hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          ) : null}
        </div>
      ) : (
        <form onSubmit={submit}>
          <h2 className="font-heading text-2xl font-bold text-white">
            Almost there — how can Mike reach you?
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <FieldWrapper label="First Name" required>
              <Input
                required
                value={contact.firstName}
                onChange={(e) =>
                  setContact({ ...contact, firstName: e.target.value })
                }
              />
            </FieldWrapper>
            <FieldWrapper label="Last Name" required>
              <Input
                required
                value={contact.lastName}
                onChange={(e) =>
                  setContact({ ...contact, lastName: e.target.value })
                }
              />
            </FieldWrapper>
            <FieldWrapper label="Email" required>
              <Input
                type="email"
                required
                value={contact.email}
                onChange={(e) =>
                  setContact({ ...contact, email: e.target.value })
                }
              />
            </FieldWrapper>
            <FieldWrapper label="Phone" required>
              <Input
                type="tel"
                required
                value={contact.phone}
                onChange={(e) =>
                  setContact({ ...contact, phone: e.target.value })
                }
              />
            </FieldWrapper>
            <FieldWrapper label="Best time to reach you">
              <Select
                value={contact.bestTime}
                onChange={(e) =>
                  setContact({ ...contact, bestTime: e.target.value })
                }
              >
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
              </Select>
            </FieldWrapper>
            <FieldWrapper label="How did you hear about Mike?">
              <Input
                value={contact.referral}
                onChange={(e) =>
                  setContact({ ...contact, referral: e.target.value })
                }
                placeholder="Google, referral, social..."
              />
            </FieldWrapper>
          </div>
          <div className="mt-6 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="inline-flex items-center gap-1 text-sm text-gray-mid hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn-gold"
            >
              {submitting ? "Submitting..." : "See My Options"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
