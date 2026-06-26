import type { Metadata } from "next";
import { ShieldCheck, Clock, BadgeDollarSign } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import SecondOpinionForm from "@/components/forms/SecondOpinionForm";

export const metadata: Metadata = {
  title: "Free Second Opinion on Your Loan Estimate",
  description:
    "Upload the Loan Estimate you received from another lender and Mike Prenesti will personally review your rate, fees, and loan terms — for free.",
};

const points = [
  { Icon: BadgeDollarSign, text: "Honest review of your rate and fees" },
  { Icon: Clock, text: "Personal feedback within 24 hours" },
  { Icon: ShieldCheck, text: "No pressure, no obligation" },
];

export default function SecondOpinionPage() {
  return (
    <>
      <PageHero
        label="Second Opinion"
        title="Get a Free Second Opinion on Your Loan Estimate"
        subtitle="Upload the Loan Estimate you received from another lender and I'll personally review your rate, fees, and loan terms — for free. No pressure, no obligation."
      />

      <div className="container-page grid gap-12 py-16 sm:py-20 lg:grid-cols-2">
        <div className="space-y-6">
          <Reveal>
            <ul className="space-y-4">
              {points.map(({ Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-3 rounded-lg border border-white/10 bg-charcoal p-4"
                >
                  <Icon className="h-6 w-6 flex-shrink-0 text-gold" />
                  <span className="text-gray-light">{text}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-gray-light">
              Comparing offers is one of the smartest things you can do before
              committing to a mortgage. I&apos;ll break down exactly what
              you&apos;re being charged and whether there&apos;s a better fit —
              even if it means telling you to stick with your current lender.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="rounded-2xl border border-gold/30 bg-charcoal p-7 sm:p-9">
            <SecondOpinionForm />
          </div>
        </Reveal>
      </div>
    </>
  );
}
