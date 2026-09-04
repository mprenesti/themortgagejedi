import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Loan Options — FHA, VA, Conventional, DSCR & More",
  description:
    "Purchase, refinance, investor, home equity, self-employed, and specialty loan programs. With 16 years of experience, Mike Prenesti finds the right fit for your situation.",
};

type Program = { name: string; desc: string; bold?: boolean };
type LoanSection = {
  id: string;
  title: string;
  who: string;
  programsLabel: string;
  programs: Program[];
  benefits?: string[];
  note?: string;
};

const sections: LoanSection[] = [
  {
    id: "purchase",
    title: "Purchase Loans",
    who: "First time buyers, move up buyers, anyone purchasing a primary residence.",
    programsLabel: "Programs",
    programs: [
      {
        name: "FHA Loans",
        desc: "As low as 3.5% down. Credit scores from 580+. Great for first time buyers.",
        bold: true,
      },
      {
        name: "VA Loans",
        desc: "0% down for eligible veterans and active duty service members.",
        bold: true,
      },
      {
        name: "Conventional Loans",
        desc: "Flexible options, often with lower PMI than FHA.",
        bold: true,
      },
      {
        name: "Jumbo Loans",
        desc: "For higher priced homes above conforming loan limits.",
        bold: true,
      },
    ],
    benefits: [
      "Payment first approach — we start with your comfortable monthly payment",
      "Pre-approval in as little as 24 hours",
      "Guidance from application to closing",
    ],
  },
  {
    id: "refinance",
    title: "Refinancing",
    who: "Current homeowners looking to optimize their mortgage or access cash.",
    programsLabel: "Options",
    programs: [
      {
        name: "Rate & term refinance",
        desc: "Lower your rate or shorten your term.",
      },
      {
        name: "Cash out refinance",
        desc: "Access equity for renovations, debt payoff, or investment.",
      },
      {
        name: "Streamline refinance",
        desc: "Simplified process for existing FHA/VA loans.",
      },
      {
        name: "Debt consolidation",
        desc: "Roll high interest debt into your mortgage.",
      },
    ],
  },
  {
    id: "investor",
    title: "Investor Financing",
    who: "Real estate investors, portfolio builders, Airbnb operators, fix & flip.",
    programsLabel: "Programs",
    programs: [
      {
        name: "DSCR Loans",
        desc: "Qualify based on property rental income alone. No personal income verification required.",
        bold: true,
      },
      {
        name: "Bank Statement Loans",
        desc: "12 or 24 months of bank statements. No tax returns needed.",
        bold: true,
      },
      {
        name: "1099 Loans",
        desc: "Perfect for independent contractors and gig workers.",
        bold: true,
      },
      {
        name: "P&L Loans",
        desc: "Qualify using a CPA prepared profit and loss statement.",
        bold: true,
      },
    ],
    benefits: [
      "No personal income verification (DSCR)",
      "Finance multiple properties simultaneously",
      "Competitive rates across multiple lenders",
    ],
  },
  {
    id: "equity",
    title: "Home Equity Solutions",
    who: "Homeowners looking to leverage existing equity.",
    programsLabel: "Options",
    programs: [
      {
        name: "HELOC",
        desc: "Revolving line of credit secured by your home.",
        bold: true,
      },
      {
        name: "2nd Mortgage",
        desc: "Lump sum against your equity.",
        bold: true,
      },
      {
        name: "Cash Out Refinance",
        desc: "Refinance your first mortgage and pull cash out.",
        bold: true,
      },
    ],
    benefits: [
      "Keep your existing low mortgage rate (HELOC/2nd mortgage)",
      "Flexible use of funds: renovations, investments, debt payoff",
      "Tax-deductible interest in many cases",
    ],
  },
  {
    id: "non-qm",
    title: "Self-Employed & Non-QM",
    who: "Self-employed borrowers, business owners, 1099 workers, anyone who doesn't fit the traditional W-2 box.",
    programsLabel: "Programs",
    programs: [
      { name: "Bank Statement Loans (12 or 24 months)", desc: "" },
      { name: "1099 Only Loans", desc: "" },
      { name: "P&L Loans (CPA prepared)", desc: "" },
      { name: "Asset Based Qualification", desc: "" },
      { name: "Recent credit events considered", desc: "" },
    ],
    note: "If your tax returns don't reflect what you actually earn, we have programs built for that.",
  },
  {
    id: "specialty",
    title: "Specialty Loans",
    who: "Buyers with unique situations or properties.",
    programsLabel: "Programs",
    programs: [
      {
        name: "New Construction",
        desc: "Finance the build of a new home.",
        bold: true,
      },
      {
        name: "Land Loans",
        desc: "Purchase land before building.",
        bold: true,
      },
      {
        name: "Hard Money Exit Refinances",
        desc: "Refinance out of short-term hard money loans into long-term financing.",
        bold: true,
      },
      {
        name: "2nd Mortgages",
        desc: "Secondary financing for additional equity access.",
        bold: true,
      },
    ],
  },
];

const quickFilters = [
  { label: "First time buyer? Start here", href: "#purchase" },
  { label: "Self-employed? See your options", href: "#non-qm" },
  { label: "Veteran? Full VA loan guide", href: "#purchase" },
  { label: "Investor? DSCR & more", href: "#investor" },
  { label: "Refinancing? See the options", href: "#refinance" },
  { label: "Need equity access? HELOC & more", href: "#equity" },
];

export default function LoanOptionsPage() {
  return (
    <>
      <PageHero
        label="Loan Options"
        title="Loan Options for Every Situation"
        subtitle="With 16 years of experience and a full range of programs, I can find the right fit — no matter your situation."
      >
        <div className="flex flex-wrap gap-2">
          {quickFilters.map((f) => (
            <a
              key={f.label}
              href={f.href}
              className="rounded-full border border-gold/40 bg-gold/5 px-4 py-2 text-sm text-gold transition-colors hover:bg-gold/15"
            >
              {f.label}
            </a>
          ))}
        </div>
      </PageHero>

      <div className="container-page space-y-6 py-16 sm:py-20">
        {sections.map((section, idx) => (
          <Reveal key={section.id}>
            <section
              id={section.id}
              className="scroll-mt-28 rounded-2xl border border-white/10 bg-charcoal p-7 sm:p-9"
            >
              <h2 className="font-heading text-3xl font-bold text-gold">
                {section.title}
              </h2>
              <p className="mt-3 text-gray-light">
                <span className="font-semibold text-white">Who it&apos;s for: </span>
                {section.who}
              </p>

              <h3 className="mt-6 font-heading text-lg font-semibold uppercase tracking-wide text-white">
                {section.programsLabel}
              </h3>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {section.programs.map((p) => (
                  <li
                    key={p.name}
                    className="rounded-lg border border-white/10 bg-black/40 p-4"
                  >
                    <span className="font-heading font-semibold text-gold">
                      {p.name}
                    </span>
                    {p.desc ? (
                      <span className="mt-1 block text-sm text-gray-light">
                        {p.desc}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>

              {section.benefits ? (
                <>
                  <h3 className="mt-6 font-heading text-lg font-semibold uppercase tracking-wide text-white">
                    Key Benefits
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {section.benefits.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-gray-light"
                      >
                        <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}

              {section.note ? (
                <p className="mt-6 rounded-lg border-l-2 border-gold bg-black/40 p-4 italic text-gray-light">
                  {section.note}
                </p>
              ) : null}

              <Link
                href="/get-started"
                className="btn-gold mt-7 inline-flex"
                data-section={idx}
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </section>
          </Reveal>
        ))}
      </div>

      <section className="bg-gold">
        <div className="container-page flex flex-col items-center gap-4 py-12 text-center">
          <h2 className="font-heading text-2xl font-bold text-black sm:text-3xl">
            Not sure which option is right for you?
          </h2>
          <p className="text-black/80">
            Take the quiz and I&apos;ll help you figure it out. It takes 2
            minutes.
          </p>
          <Link
            href="/get-started"
            className="inline-flex items-center gap-2 rounded-md bg-black px-6 py-3 font-heading font-semibold uppercase tracking-wide text-gold transition-colors hover:bg-charcoal"
          >
            Find My Best Loan Option <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
