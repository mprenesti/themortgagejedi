import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Accordion from "@/components/ui/Accordion";
import CTAStrip from "@/components/ui/CTAStrip";
import JsonLd from "@/components/JsonLd";
import { PHONE_HREF, EMAIL_HREF } from "@/lib/constants";
import type { FAQ } from "@/lib/data";

// CONTENT REFRESH NOTE:
// The rate, price, inventory, and loan limit figures below are current as of
// August 2026. Summerlin's sub-areas vary widely, so the figures reflect a
// spread rather than one median. Review and update these numbers (and the
// matching FAQ answers + JSON-LD schema) roughly every quarter, or whenever the
// local market shifts materially, so the page stays accurate for search and AI
// answer engines.

export const metadata: Metadata = {
  title: "Summerlin, NV Mortgage Loans",
  description:
    "Current Summerlin home values, loan limits, and programs from a local broker. Conventional, jumbo, FHA, and VA loans across Summerlin North, South, and West.",
};

// Single source of truth for the FAQ. The visible Accordion and the JSON-LD
// schema are both built from this array, so they always match word for word.
const SUMMERLIN_FAQS: FAQ[] = [
  {
    q: "What is the typical home price in Summerlin right now?",
    a: "Summerlin South's typical home value was $713,676 as of August 2026, down about 1.1% over the past year. Prices vary widely across Summerlin's sub-areas, from more affordable homes in Summerlin North to newer construction in Summerlin West that often exceeds $1 million.",
  },
  {
    q: "Why is there such a big price range within Summerlin?",
    a: "Summerlin isn't one uniform market. Summerlin North is the oldest and most affordable section, Summerlin South sits in the middle, and Summerlin West is the newest, with golf course lots, Red Rock Canyon views, and Downtown Summerlin nearby, all of which push prices well above the rest of the valley.",
  },
  {
    q: "Do I need a jumbo loan to buy in Summerlin?",
    a: "It depends on the home. The 2026 conforming loan limit for Clark County is $832,750, and a meaningful share of homes in Summerlin, especially in Summerlin West, sell above that, requiring jumbo financing. Homes in Summerlin North and parts of Summerlin South often still fit within conventional limits.",
  },
  {
    q: "What loan programs work best for buyers in Summerlin?",
    a: "Conventional loans cover most of the market, jumbo financing comes into play for higher-end homes in Summerlin West, FHA can work for homes at the more affordable end near or below the county's $541,287 loan limit, and VA loans remain a strong option for eligible veterans and service members at any price point within the VA loan limit.",
  },
  {
    q: "How much do I need for a down payment to buy in Summerlin?",
    a: "FHA loans allow as little as 3.5% down for eligible homes, VA loans allow eligible veterans and service members to buy with 0% down, and conventional loans typically start around 5% down, though 20% down avoids ongoing mortgage insurance and is common on jumbo loans.",
  },
  {
    q: "What credit score do I need to buy a home in Summerlin?",
    a: "Most lenders look for a credit score of at least 620 for conventional loans and 580 for FHA loans with the lowest down payment option of 3.5%. FHA also has a program that goes down to a 500 credit score with 10% down, for buyers who don't yet qualify at 580. Jumbo loans on higher-end Summerlin homes typically require stronger credit, often 700 or above.",
  },
  {
    q: "Is now a good time to buy in Summerlin?",
    a: "Summerlin has shifted toward a more balanced market, with inventory up 15 to 20% year over year and prices essentially flat to slightly down compared to a year ago. That gives buyers more negotiating room and selection than they had in recent years, particularly in the mid to upper price tiers.",
  },
  {
    q: "How competitive is the Summerlin housing market right now?",
    a: "Homes are selling in a median of about 34 days, though that varies a lot by price tier, entry-level homes under $600,000 move in 25 to 35 days, while luxury homes above $1.5 million can take 60 to 120 days. With 2.5 to 3.5 months of supply, it's a more balanced market than the ultra-competitive years prior.",
  },
  {
    q: "How long does it take to close on a house in Summerlin?",
    a: "Most purchase loans close in 30 to 45 days from the time an offer is accepted, though jumbo loans and VA or FHA loans can sometimes take slightly longer depending on the lender and the appraisal timeline. Getting fully pre-approved, including a jumbo pre-approval if needed, is the biggest factor in keeping that timeline tight.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: SUMMERLIN_FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const loanPrograms: { name: string; body: string }[] = [
  {
    name: "Conventional loans",
    body: "cover most of the Summerlin market, working well for buyers with stronger credit and a larger down payment. They fit homes at or below the 2026 Clark County conforming limit of $832,750, which includes much of Summerlin North and parts of Summerlin South.",
  },
  {
    name: "Jumbo loans",
    body: "come into play for the higher-end homes common in Summerlin West, where newer construction, golf course lots, and Red Rock Canyon views frequently push prices above the conforming limit. Jumbo financing carries its own credit, reserve, and down payment requirements that a broker can help you navigate.",
  },
  {
    name: "FHA loans",
    body: "can work at the more affordable end of Summerlin, for homes near or below the 2026 Clark County loan limit of $541,287. FHA allows down payments as low as 3.5% and is more flexible on credit history than conventional financing.",
  },
  {
    name: "VA loans",
    body: "remain a strong option for eligible veterans and active-duty service members buying in Summerlin. They allow 0% down and carry no monthly mortgage insurance, which makes VA one of the most affordable paths to homeownership for those who qualify.",
  },
];

export default function SummerlinLocationPage() {
  return (
    <>
      <JsonLd data={faqSchema} />

      <PageHero
        label="Summerlin, Nevada"
        title="Summerlin, NV Mortgage Loans"
      />

      <div className="container-page max-w-3xl space-y-12 py-16 sm:py-20">
        <p className="text-lg text-gray-light">
          Summerlin is one of the most desirable master-planned communities in
          the country, and financing here rewards a broker who understands how
          different its sub-areas really are. Prices range from relatively
          affordable homes in Summerlin North to luxury new construction in
          Summerlin West that regularly runs past $1 million, which means the
          right loan program depends heavily on exactly where and what you buy.
          Between conforming and jumbo limits, a wide spread of price tiers, and
          a market that has cooled toward balance, most Summerlin buyers benefit
          from a broker who can work across loan programs rather than a single
          bank product.
        </p>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-bold text-gold sm:text-3xl">
            The Summerlin market right now
          </h2>
          <p className="text-gray-light">
            Summerlin South&apos;s typical home value was $713,676 as of August
            31, 2026, down about 1.1% over the past year, a notably different
            trend than the broader Las Vegas valley&apos;s growth. Inventory has
            grown to roughly 2.5 to 3.5 months of supply, up 15 to 20% year over
            year, marking a shift from a seller&apos;s market toward more
            balanced conditions. Homes are selling in a median of about 34 days,
            though that varies sharply by price tier: entry-level homes under
            $600,000 move in 25 to 35 days, mid-tier homes from $600,000 to $1.2
            million run 35 to 60 days, and luxury homes above $1.5 million
            average 60 to 120 days. Mortgage rates remain elevated compared to a
            year ago: 30-year conventional rates are running around 7.2% as of
            late September 2026, with FHA rates near 5.38% (6.11% APR) and VA
            rates near 6.84% (7.00% APR), depending on the borrower&apos;s credit
            profile and the lender&apos;s pricing that day.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-bold text-gold sm:text-3xl">
            One name, three very different markets
          </h2>
          <p className="text-gray-light">
            Summerlin isn&apos;t one uniform market, and that matters when it
            comes to financing. Summerlin North is the oldest and most
            established section, and it tends to be the most affordable.
            Summerlin South sits in the middle on both age and price. Summerlin
            West is the newest and most expensive, home to golf courses, Red
            Rock Canyon views, and Downtown Summerlin, with newer construction
            that often exceeds $1 million. Where you buy within Summerlin can
            move you from conventional territory into jumbo financing, so it
            pays to line up the right program for your target sub-area before you
            start shopping.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-bold text-gold sm:text-3xl">
            Loan limits and what they mean in Summerlin
          </h2>
          <p className="text-gray-light">
            Summerlin is in Clark County, so it uses the county&apos;s 2026 loan
            limits. The FHA loan limit for a single-family home is $541,287,
            which covers only the lower end of Summerlin&apos;s price range. The
            2026 conforming (conventional) loan limit for Clark County is
            $832,750, and a meaningful share of Summerlin homes, especially in
            Summerlin West, sell above that and require jumbo financing. Homes in
            Summerlin North and parts of Summerlin South often still fit within
            conventional limits, so the loan that fits your purchase depends
            directly on the home&apos;s price.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-bold text-gold sm:text-3xl">
            Loan programs popular with Summerlin buyers
          </h2>
          <div className="space-y-4">
            {loanPrograms.map((program) => (
              <p key={program.name} className="text-gray-light">
                <strong className="font-semibold text-white">
                  {program.name}
                </strong>{" "}
                {program.body}
              </p>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-bold text-gold sm:text-3xl">
            Work with a local broker, not just a local bank
          </h2>
          <p className="text-gray-light">
            As a broker rather than a single bank, I shop your loan across
            multiple lenders and programs to find the fit that actually works
            for your situation, whether that&apos;s a conventional purchase in
            Summerlin North, jumbo financing for a new build in Summerlin West,
            or a VA loan for a veteran buyer. If you&apos;re buying, refinancing,
            or investing in the Summerlin area, reach out and let&apos;s map out
            your options.
          </p>
          <div className="rounded-2xl border border-gold/30 bg-charcoal p-6">
            <p className="font-heading text-lg font-bold text-white">
              Contact The Mortgage Jedi
            </p>
            <p className="mt-2 text-gray-light">
              Mike Prenesti, NMLS #1033445
              <br />
              Nexa Lending, LLC, NMLS #1660690
              <br />
              <a href={PHONE_HREF} className="hover:text-gold">
                702-497-0584
              </a>{" "}
              |{" "}
              <a href={EMAIL_HREF} className="hover:text-gold">
                mike@themortgagejedi.com
              </a>
            </p>
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="font-heading text-2xl font-bold text-gold sm:text-3xl">
            Frequently Asked Questions
          </h2>
          <Accordion items={SUMMERLIN_FAQS} />
        </section>

        <p className="text-sm text-gray-mid">
          Explore more about{" "}
          <Link href="/loan-options" className="underline hover:text-gold">
            loan options
          </Link>{" "}
          or{" "}
          <Link href="/get-started" className="underline hover:text-gold">
            start your pre-approval
          </Link>
          .
        </p>
      </div>

      <CTAStrip
        title="Ready to run your Summerlin numbers?"
        subtitle="Get a straight answer on rates, programs, and payments for your situation."
        buttonLabel="Book a Call"
        href="/get-started"
      />
    </>
  );
}
