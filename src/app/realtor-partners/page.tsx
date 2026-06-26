import type { Metadata } from "next";
import { Check } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import RealtorForm from "@/components/forms/RealtorForm";

export const metadata: Metadata = {
  title: "Realtor Partners — Let's Build Something Together",
  description:
    "Mike Prenesti partners with Las Vegas real estate agents who care about their clients. Fast pre-approvals, clear communication, and co-branded marketing.",
};

const whyAgents = [
  "Fast pre-approvals (same-day in most cases)",
  "Clear communication throughout the transaction",
  "I'll never embarrass you in front of your client",
  "I match my communication style to yours",
  "I'll be straight with you when a deal isn't going to work",
];

const whatIOffer = [
  "Co-branded First-Time Buyer Guides (with your name and photo)",
  "Lunch and learn sessions for your team",
  "Market updates and rate context you can share with clients",
  "A direct line to me — not a call center",
];

export default function RealtorPartnersPage() {
  return (
    <>
      <PageHero
        label="Realtor Partners"
        title="Realtor Partners — Let's Build Something Together"
        subtitle="I work with real estate agents who care about their clients as much as I do. If that's you, let's talk."
      />

      <div className="container-page grid gap-12 py-16 sm:py-20 lg:grid-cols-2">
        <div className="space-y-10">
          <Reveal>
            <div>
              <h2 className="font-heading text-2xl font-bold text-gold">
                Why agents work with me
              </h2>
              <ul className="mt-5 space-y-3">
                {whyAgents.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-gray-light"
                  >
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <h2 className="font-heading text-2xl font-bold text-gold">
                What I offer agents
              </h2>
              <ul className="mt-5 space-y-3">
                {whatIOffer.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-gray-light"
                  >
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="rounded-2xl border border-gold/30 bg-charcoal p-7 sm:p-9">
            <h2 className="font-heading text-2xl font-bold text-white">
              Let&apos;s Connect
            </h2>
            <p className="mt-2 text-gray-light">
              Tell me a little about you and I&apos;ll reach out.
            </p>
            <div className="mt-6">
              <RealtorForm />
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}
