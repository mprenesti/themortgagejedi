import type { Metadata } from "next";
import Link from "next/link";
import {
  Upload,
  UserCheck,
  FileText,
  ShieldCheck,
  Trash2,
  Info,
  Percent,
  Receipt,
  Building2,
  Layers,
  Coins,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import SecondOpinionForm from "@/components/forms/SecondOpinionForm";

export const metadata: Metadata = {
  title: "Free Second Opinion on Your Loan Estimate",
  description:
    "Already have a Loan Estimate from another lender? Upload it and Mike Prenesti will personally review your rate, fees, and loan terms within 24 hours, for free. No obligation.",
};

const steps = [
  {
    Icon: Upload,
    title: "Upload Your Loan Estimate",
    body: "Snap a photo or upload the PDF you received from your lender. Don't worry about formatting, I've seen them all.",
  },
  {
    Icon: UserCheck,
    title: "I Review It Personally",
    body: "Within 24 hours, I'll analyze your rate, fees, loan type, and closing costs. No bots, no AI, just me.",
  },
  {
    Icon: FileText,
    title: "Get Your Custom Breakdown",
    body: "I'll reach out with a clear, jargon-free breakdown of what I found and whether I think you can do better.",
  },
];

const trust = [
  {
    Icon: ShieldCheck,
    title: "Secure & Private",
    body: "Your Loan Estimate and personal details are transmitted securely and never shared with third parties. I'm the only one who sees your file.",
  },
  {
    Icon: Trash2,
    title: "Deleted After Review",
    body: "Your uploaded documents are permanently deleted within 30 days of review, or sooner upon request.",
  },
  {
    Icon: Info,
    title: "For Review Purposes Only",
    body: "This is an educational review, not a loan application. Submitting your Loan Estimate does not create a lender-borrower relationship or trigger a credit check.",
  },
];

const lookFor = [
  {
    Icon: Percent,
    title: "Interest Rate & APR",
    body: "Are you getting a competitive rate for your credit profile and loan type?",
  },
  {
    Icon: Receipt,
    title: "Lender Fees",
    body: "Origination charges, underwriting fees, and processing costs can vary widely between lenders.",
  },
  {
    Icon: Building2,
    title: "Third-Party Costs",
    body: "Title, escrow, and insurance, I'll flag anything that looks inflated.",
  },
  {
    Icon: Layers,
    title: "Loan Program Fit",
    body: "Are you in the right loan product? Sometimes a different program saves thousands.",
  },
  {
    Icon: Coins,
    title: "Credits & Points",
    body: "Lender credits and discount points can shift the math significantly. I'll make sure they add up.",
  },
  {
    Icon: TrendingUp,
    title: "Long-Term Cost",
    body: "Monthly payment is just one piece. I look at the total cost over the life of the loan.",
  },
];

export default function SecondOpinionPage() {
  return (
    <>
      <PageHero
        label="Free Second Opinion on Your Loan Estimate"
        title="Not Sure You're Getting the Best Deal?"
        subtitle="Upload your Loan Estimate and I'll give you an honest second opinion, no strings attached. Most people don't realize how much they could save just by having someone else take a look."
      />

      <div className="container-page space-y-20 py-16 sm:py-20">
        <section className="space-y-8">
          <Reveal>
            <h2 className="font-heading text-2xl font-bold text-gold sm:text-3xl">
              How It Works
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map(({ Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-white/10 bg-charcoal p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-heading text-sm font-semibold uppercase tracking-wide text-gray-mid">
                      Step {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-bold text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-gray-light">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-10">
            <div className="space-y-6">
              <Reveal>
                <h2 className="font-heading text-2xl font-bold text-gold sm:text-3xl">
                  What I Look For
                </h2>
              </Reveal>
              <div className="grid gap-4 sm:grid-cols-2">
                {lookFor.map(({ Icon, title, body }, i) => (
                  <Reveal key={title} delay={i * 0.05}>
                    <div className="h-full rounded-xl border border-white/10 bg-charcoal p-5">
                      <Icon className="h-6 w-6 text-gold" />
                      <h3 className="mt-3 font-heading text-base font-bold text-white">
                        {title}
                      </h3>
                      <p className="mt-1.5 text-sm text-gray-light">{body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Reveal>
                <h2 className="font-heading text-2xl font-bold text-gold sm:text-3xl">
                  Your Privacy
                </h2>
              </Reveal>
              {trust.map(({ Icon, title, body }, i) => (
                <Reveal key={title} delay={i * 0.06}>
                  <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-charcoal p-4">
                    <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
                    <div>
                      <h3 className="font-heading text-base font-semibold text-white">
                        {title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-light">{body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-gold/30 bg-charcoal p-7 sm:p-9">
                <h2 className="font-heading text-2xl font-bold text-white">
                  Submit Your Loan Estimate
                </h2>
                <p className="mt-2 text-gray-light">
                  Fill out the form below and I&apos;ll get back to you within 24
                  hours with an honest breakdown.
                </p>
                <div className="mt-6">
                  <SecondOpinionForm />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="text-xs leading-relaxed text-gray-mid">
                This review is for educational purposes only and does not
                constitute a loan commitment, approval, or official offer of
                credit. Mike Prenesti, NMLS #1033445. Nexa Lending, LLC, NMLS
                #1660690. Equal Housing Opportunity. Licensed in Nevada.
              </p>
            </Reveal>
          </div>
        </section>

        <Reveal>
          <section className="rounded-2xl border border-gold/20 bg-charcoal p-6 sm:p-8">
            <p className="text-gray-light">
              Curious why a broker can often find a better deal than a bank in
              the first place? Read:{" "}
              <Link
                href="/resources/blog/broker-vs-bank"
                className="inline-flex items-center gap-1 font-semibold text-gold underline underline-offset-2 hover:text-gold-dark"
              >
                Mortgage Broker vs. Bank: What Actually Wins You the Better Loan
                <ArrowRight className="h-4 w-4" />
              </Link>
            </p>
          </section>
        </Reveal>
      </div>
    </>
  );
}
