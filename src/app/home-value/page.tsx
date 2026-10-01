import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Calculator,
  FileText,
  TrendingUp,
  Target,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import HomeValueForm from "@/components/forms/HomeValueForm";

export const metadata: Metadata = {
  title: "Request Your Free Home Value Report",
  description:
    "Wondering what your home is worth right now? Mike Prenesti pulls a real valuation from current comps in your neighborhood and follows up personally, for free. No obligation.",
};

const steps = [
  {
    Icon: MapPin,
    title: "Tell Me Your Address",
    body: "Just the property address, that's all I need to get started.",
  },
  {
    Icon: Calculator,
    title: "I Pull the Real Numbers",
    body: "I'll run a valuation using current sales data and comparable homes in your area, not a generic algorithm.",
  },
  {
    Icon: FileText,
    title: "Get Your Personal Report",
    body: "Within a day or two, I'll follow up with a clear breakdown of what your home is worth today and what that could mean for you, whether that's refinancing, a HELOC, or selling.",
  },
];

const whyCheck = [
  {
    Icon: TrendingUp,
    title: "Rates and Values Both Move",
    body: "Even if you're not planning to sell, knowing your equity position matters for refinancing or tapping a HELOC.",
  },
  {
    Icon: Target,
    title: "More Accurate Than Automated Estimates",
    body: "Zillow and other online tools use broad algorithms. I factor in local comps and condition that automated tools miss.",
  },
  {
    Icon: ShieldCheck,
    title: "No Pressure, No Obligation",
    body: "This is a free report, not a listing agreement or loan application. What you do with the information is up to you.",
  },
];

export default function HomeValuePage() {
  return (
    <>
      <PageHero
        label="Request Your Free Home Value Report"
        title="What's Your Home Actually Worth Right Now?"
        subtitle="Home values shift fast, and a generic online estimate rarely tells the full story. Give me your address and I'll put together a real valuation based on current comps in your neighborhood, no strings attached."
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
          <div className="space-y-4">
            <Reveal>
              <h2 className="font-heading text-2xl font-bold text-gold sm:text-3xl">
                Why Check Your Value
              </h2>
            </Reveal>
            {whyCheck.map(({ Icon, title, body }, i) => (
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

          <div className="space-y-5">
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-gold/30 bg-charcoal p-7 sm:p-9">
                <h2 className="font-heading text-2xl font-bold text-white">
                  Request Your Report
                </h2>
                <p className="mt-2 text-gray-light">
                  Fill out the form below and I&apos;ll put together your
                  personal home value report.
                </p>
                <div className="mt-6">
                  <HomeValueForm />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="text-xs leading-relaxed text-gray-mid">
                This report is for informational purposes only and does not
                constitute an appraisal, loan commitment, or official offer of
                credit. Mike Prenesti, NMLS #1033445. Nexa Lending, LLC, NMLS
                #1660690. Equal Housing Opportunity. Licensed in Nevada.
              </p>
            </Reveal>
          </div>
        </section>

        <Reveal>
          <section className="rounded-2xl border border-gold/20 bg-charcoal p-6 sm:p-8">
            <p className="text-gray-light">
              Already know you have equity and wondering how to put it to work?
              Read:{" "}
              <Link
                href="/resources/blog/heloc-vs-cash-out-refi"
                className="inline-flex items-center gap-1 font-semibold text-gold underline underline-offset-2 hover:text-gold-dark"
              >
                HELOC vs. Cash-Out Refi: Which Is Right for Your Situation?
                <ArrowRight className="h-4 w-4" />
              </Link>
            </p>
          </section>
        </Reveal>
      </div>
    </>
  );
}
