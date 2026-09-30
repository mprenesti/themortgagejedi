import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Accordion from "@/components/ui/Accordion";
import CTAStrip from "@/components/ui/CTAStrip";
import JsonLd from "@/components/JsonLd";
import { PHONE_HREF, EMAIL_HREF } from "@/lib/constants";
import type { FAQ } from "@/lib/data";

// CONTENT REFRESH NOTE:
// The rate, price, and loan limit figures below are current as of August 2026.
// Pahrump is a distinct rural market in Nye County, so the price and inventory
// figures are local to Pahrump, not reused from the Las Vegas valley. The FHA
// ($541,287) and conforming ($832,750) limits happen to match Clark County's
// because both sit at the national floor.
//
// USDA CAVEAT: A commonly cited USDA loan cap for the area is roughly $336,500
// for 2026, but that figure came from a third-party lending site rather than
// USDA's own rural development map, and USDA-eligible boundaries within Pahrump
// can be block-specific rather than town-wide. Verify the current USDA income
// and property eligibility maps for Nye County before relying on any specific
// cap. The visible copy intentionally points buyers to check eligibility rather
// than stating a cap as fact.
//
// Review and update these numbers (and the matching FAQ answers + JSON-LD
// schema) roughly every quarter, or whenever the local market shifts
// materially, so the page stays accurate for search and AI answer engines.

export const metadata: Metadata = {
  title: "Pahrump, NV Mortgage Loans",
  description:
    "Current Pahrump home prices, loan limits, and programs from a local broker. USDA rural, FHA, VA, and conventional loans for Pahrump and Nye County buyers.",
};

// Single source of truth for the FAQ. The visible Accordion and the JSON-LD
// schema are both built from this array, so they always match word for word.
const PAHRUMP_FAQS: FAQ[] = [
  {
    q: "What is the median home price in Pahrump right now?",
    a: "Pahrump's median sale price was $362,260 as of August 2026, down 8.3% year over year, according to Redfin. Homes are also taking longer to sell, a median of 90 days compared to 61 days a year earlier, which points to real negotiating room for buyers right now.",
  },
  {
    q: "Can I get a USDA loan in Pahrump?",
    a: "Many parts of Pahrump qualify for USDA rural home loan financing, which requires no down payment for eligible buyers who meet the program's income limits. This is a program that isn't available in Las Vegas, Henderson, Summerlin, or North Las Vegas, so it's worth asking about specifically if you're buying in Pahrump.",
  },
  {
    q: "What is the FHA loan limit in Pahrump?",
    a: "The 2026 FHA loan limit for Nye County, which includes Pahrump, is $541,287 for a single-family home. That's comfortably above Pahrump's typical price range, so FHA's 3.5% down payment option fits the vast majority of homes here.",
  },
  {
    q: "Is now a good time to buy in Pahrump?",
    a: "Prices are down 8.3% year over year and homes are sitting on the market longer than they were a year ago, which gives buyers more negotiating leverage than in most of the Las Vegas valley right now. Combined with USDA and FHA financing options, Pahrump is one of the more accessible markets in the region at the moment.",
  },
  {
    q: "What loan programs work best for buyers in Pahrump?",
    a: "USDA loans are worth checking first for eligible properties and income levels since they require no down payment, FHA covers most of the rest of the market with as little as 3.5% down, and VA loans remain a strong option for eligible veterans and service members. Conventional loans work well for buyers with stronger credit and a larger down payment.",
  },
  {
    q: "How much do I need for a down payment to buy in Pahrump?",
    a: "USDA loans can require no down payment at all for eligible buyers, FHA loans allow as little as 3.5% down, VA loans allow eligible veterans and service members to buy with 0% down, and conventional loans typically start around 5% down.",
  },
  {
    q: "What credit score do I need to buy a home in Pahrump?",
    a: "Most lenders look for a credit score of at least 620 for conventional loans and 580 for FHA loans with the lowest down payment option of 3.5%. FHA also has a program that goes down to a 500 credit score with 10% down, for buyers who don't yet qualify at 580. USDA loans typically look for a credit score in a similar range, depending on the lender.",
  },
  {
    q: "Why are homes selling slower in Pahrump than a year ago?",
    a: "Pahrump's median days on market rose from 61 to 90 days over the past year, alongside a modest price decline. That combination points to more supply relative to demand right now, which tends to benefit buyers with more room to negotiate on price and terms.",
  },
  {
    q: "How long does it take to close on a house in Pahrump?",
    a: "Most purchase loans close in 30 to 45 days from the time an offer is accepted, though USDA loans in particular can sometimes take a bit longer due to the extra property eligibility review. Getting fully pre-approved before you start shopping is the biggest factor in keeping that timeline tight.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: PAHRUMP_FAQS.map((item) => ({
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
    name: "USDA loans",
    body: "are worth checking first in Pahrump, since many rural parts of the area are eligible and the program requires no down payment for buyers who meet its income limits. Eligibility is set by property location and household income, and boundaries can vary block by block, so confirm the specific address against the current USDA rural development map before counting on it.",
  },
  {
    name: "FHA loans",
    body: "cover most of the rest of the Pahrump market. With the 2026 Nye County loan limit at $541,287, comfortably above the area's typical price, FHA's 3.5% down payment and flexible credit guidelines fit the vast majority of homes here.",
  },
  {
    name: "VA loans",
    body: "remain a strong option for eligible veterans and active-duty service members buying in Pahrump. They allow 0% down and carry no monthly mortgage insurance, which makes VA one of the most affordable paths to homeownership for those who qualify.",
  },
  {
    name: "Conventional loans",
    body: "work well for buyers with stronger credit and a larger down payment, and they avoid the ongoing mortgage insurance cost that comes with FHA once a buyer reaches 20% equity. Pahrump prices sit well within the conforming limit, so conventional financing is straightforward here.",
  },
];

export default function PahrumpLocationPage() {
  return (
    <>
      <JsonLd data={faqSchema} />

      <PageHero label="Pahrump, Nevada" title="Pahrump, NV Mortgage Loans" />

      <div className="container-page max-w-3xl space-y-12 py-16 sm:py-20">
        <p className="text-lg text-gray-light">
          Pahrump is a distinct, rural market roughly 60 miles from the Las
          Vegas valley, known for larger lots and acreage living at a lower
          price point than Clark County. It sits in Nye County with its own
          pricing and inventory conditions, and it opens up a financing option
          the valley cities don&apos;t have: USDA rural home loans. Between a
          genuine buyer&apos;s market, an affordable median price, and access to
          no-down-payment USDA financing in eligible areas, Pahrump rewards a
          broker who can compare USDA, FHA, VA, and conventional options rather
          than a single bank product.
        </p>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-bold text-gold sm:text-3xl">
            The Pahrump market right now
          </h2>
          <p className="text-gray-light">
            Pahrump is one of the more affordable and buyer-friendly markets in
            the region right now. Redfin put the median sale price at $362,260 as
            of August 2026, down 8.3% year over year. Homes are also taking
            longer to sell, a median of 90 days compared to 61 days a year
            earlier, which points to a genuine buyer&apos;s market with real room
            to negotiate on price and terms. Mortgage rates remain elevated
            compared to a year ago: 30-year conventional rates are running around
            7.2% as of late September 2026, with FHA rates near 5.38% (6.11% APR)
            and VA rates near 6.84% (7.00% APR), depending on the borrower&apos;s
            credit profile and the lender&apos;s pricing that day.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-bold text-gold sm:text-3xl">
            USDA rural financing, a Pahrump advantage
          </h2>
          <p className="text-gray-light">
            One of the biggest differences between Pahrump and the Las Vegas
            valley is access to USDA rural home loans. Many parts of Pahrump fall
            within USDA-eligible areas, and for buyers who qualify, USDA loans
            require no down payment at all. Eligibility depends on both the
            property location and your household income, and the eligible
            boundaries can be specific down to the block rather than covering the
            whole town. Because of that, the smart first step is to check the
            current USDA rural development map for the exact address rather than
            assuming a given home qualifies. If it does, USDA is often the most
            affordable way into a Pahrump home.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-bold text-gold sm:text-3xl">
            Loan limits and what they mean in Pahrump
          </h2>
          <p className="text-gray-light">
            Pahrump is in Nye County, which uses the national floor for its 2026
            loan limits, the same figures as Clark County. The FHA loan limit for
            a single-family home is $541,287, comfortably above Pahrump&apos;s
            median price, so FHA is a strong fit for most homes here. The 2026
            conforming (conventional) loan limit is $832,750, far above typical
            Pahrump prices, so jumbo financing is essentially never a factor. In
            practice, most buyers have their pick of USDA, FHA, VA, and
            conventional programs without running into a loan limit.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-bold text-gold sm:text-3xl">
            Loan programs popular with Pahrump buyers
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
            for your situation, whether that&apos;s a no-down-payment USDA loan
            on an eligible rural property, an FHA loan for a first-time buyer, a
            VA loan for a veteran, or a conventional purchase. If you&apos;re
            buying, refinancing, or investing in the Pahrump area, reach out and
            let&apos;s map out your options.
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
          <Accordion items={PAHRUMP_FAQS} />
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
        title="Ready to run your Pahrump numbers?"
        subtitle="Get a straight answer on rates, programs, and payments for your situation."
        buttonLabel="Book a Call"
        href="/get-started"
      />
    </>
  );
}
