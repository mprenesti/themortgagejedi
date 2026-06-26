import type { Metadata } from "next";
import { BookOpen, Quote } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import GuideOptIn from "@/components/forms/GuideOptIn";

export const metadata: Metadata = {
  title: "The Ultimate First-Time Homebuyer Guide",
  description:
    "Everything you need to know before, during, and after the mortgage process — in plain English. Free download from The Mortgage Jedi.",
};

const sections = [
  {
    title: "Section 1: Am I Ready to Buy?",
    points: [
      "Are you better off buying than renting?",
      "Do you understand the true cost of homeownership?",
      "Are you financially stable?",
      "How does your credit score affect your ability to buy?",
    ],
  },
  {
    title: "Section 2: What Do I Need to Know Before I Apply?",
    points: [
      "How much home can I comfortably afford?",
      "How to determine your down payment (0%, 3.5%, 5%, 10%, 20% options)",
      "Fixed-rate vs adjustable-rate mortgages explained",
      "PMI and mortgage insurance explained simply",
    ],
  },
  {
    title: "Section 3: What Do I Need to Do Before I Start Shopping?",
    points: [
      "What documents you'll need to apply",
      "How to choose the right lender (and why a broker beats a bank)",
      "Pre-qualification vs pre-approval — what's the difference?",
    ],
  },
  {
    title: "Section 4: Finding a Home and Making an Offer",
    points: [
      "How to find the right real estate agent",
      "How to negotiate and make a fair offer",
      "What to look for in a home inspection",
    ],
  },
  {
    title: "Section 5: After Your Offer Is Accepted",
    points: [
      "How to complete your loan application",
      "Should you lock in your interest rate?",
      "What happens between application and closing?",
      "Closing day — what to expect",
    ],
  },
];

export default function FirstTimeBuyerGuidePage() {
  return (
    <>
      <PageHero
        label="Free Download"
        title="The Ultimate First-Time Homebuyer Guide"
        subtitle="Everything you need to know before, during, and after the mortgage process — in plain English. Free download."
      />

      <div className="container-page grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <BookOpen className="h-7 w-7 text-gold" />
            <h2 className="font-heading text-2xl font-bold text-white">
              What&apos;s Inside
            </h2>
          </div>
          <div className="mt-8 space-y-6">
            {sections.map((section, i) => (
              <Reveal key={section.title} delay={i * 0.05}>
                <div className="rounded-2xl border border-white/10 bg-charcoal p-6">
                  <h3 className="font-heading text-xl font-semibold text-gold">
                    {section.title}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {section.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-2 text-gray-light"
                      >
                        <span className="mt-1 text-gold">›</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-gold/30 bg-charcoal p-7">
            <h2 className="font-heading text-2xl font-bold text-white">
              Get the Free Guide
            </h2>
            <p className="mt-2 text-gray-light">
              Enter your info and I&apos;ll send the guide straight to your inbox.
            </p>
            <div className="mt-6">
              <GuideOptIn />
            </div>
          </div>

          <figure className="mt-6 rounded-2xl border border-white/10 bg-black p-6">
            <Quote className="h-6 w-6 text-gold/50" />
            <blockquote className="mt-2 text-gray-light">
              “Mike&apos;s guide helped me understand the process before I even
              called him. By the time we talked, I knew what questions to ask.”
            </blockquote>
            <figcaption className="mt-3 text-sm text-gray-mid">
              — Las Vegas first-time buyer
            </figcaption>
          </figure>
        </div>
      </div>
    </>
  );
}
