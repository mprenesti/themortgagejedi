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
// August 2026. Reno is a distinct market in Washoe County, so the price and
// loan limit figures are local to Reno, not reused from the Las Vegas valley.
// Price data cites two sources (Redfin median sale price and Zillow's typical
// home value index) since they use slightly different methods. Review and
// update these numbers (and the matching FAQ answers + JSON-LD schema) roughly
// every quarter, or whenever the local market shifts materially, so the page
// stays accurate for search and AI answer engines.

export const metadata: Metadata = {
  title: "Reno, NV Mortgage Loans",
  description:
    "Current Reno home prices, Washoe County loan limits, and programs from a local broker. Conventional, FHA, VA, and jumbo loans for Reno buyers.",
};

// Single source of truth for the FAQ. The visible Accordion and the JSON-LD
// schema are both built from this array, so they always match word for word.
const RENO_FAQS: FAQ[] = [
  {
    q: "What is the median home price in Reno right now?",
    a: "Reno's median sale price was $577,118 as of August 2026, up 4.9% year over year, according to Redfin. Zillow's typical home value measure puts it close behind at $573,360, up 1.4% over the past year.",
  },
  {
    q: "Is Reno a separate mortgage market from Las Vegas?",
    a: "Yes. Reno sits in Washoe County, several hundred miles from the Las Vegas valley, with its own local loan limits, pricing, and inventory conditions. Loan programs work the same way statewide, but the local numbers used to size a loan are specific to Reno, not Las Vegas.",
  },
  {
    q: "What is the FHA loan limit in Reno?",
    a: "The 2026 FHA loan limit for Washoe County, which includes Reno, is $638,250 for a single-family home. That's notably higher than the Las Vegas valley's Clark County limit of $541,287, reflecting Reno's higher typical home price.",
  },
  {
    q: "Do I need a jumbo loan to buy in Reno?",
    a: "Usually not. The 2026 conforming loan limit for Washoe County is $832,750, well above Reno's median sale price, so most purchases fit within conventional financing. Jumbo loans typically only come into play for higher-end homes well above the median.",
  },
  {
    q: "What loan programs work best for buyers in Reno?",
    a: "Conventional loans cover the bulk of the market, FHA works well for buyers using a lower down payment given the higher local loan limit, and VA loans remain a strong option for eligible veterans and service members. Jumbo financing is available for homes above the conforming limit.",
  },
  {
    q: "How much do I need for a down payment to buy in Reno?",
    a: "FHA loans allow as little as 3.5% down for eligible buyers, VA loans allow eligible veterans and service members to buy with 0% down, and conventional loans typically start around 5% down, though 20% down avoids ongoing mortgage insurance.",
  },
  {
    q: "What credit score do I need to buy a home in Reno?",
    a: "Most lenders look for a credit score of at least 620 for conventional loans and 580 for FHA loans with the lowest down payment option of 3.5%. FHA also has a program that goes down to a 500 credit score with 10% down, for buyers who don't yet qualify at 580.",
  },
  {
    q: "How competitive is the Reno housing market right now?",
    a: "Reno is currently a balanced market, with about 2.9 months of supply and homes selling in a median of around 46 days. That gives buyers reasonable room to negotiate compared to the faster-paced years prior.",
  },
  {
    q: "How long does it take to close on a house in Reno?",
    a: "Most purchase loans close in 30 to 45 days from the time an offer is accepted, though jumbo, VA, and FHA loans can sometimes take slightly longer depending on the lender and the appraisal timeline. Getting fully pre-approved before you start shopping is the biggest factor in keeping that timeline tight.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: RENO_FAQS.map((item) => ({
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
    body: "cover the bulk of the Reno market. They work well for buyers with stronger credit and a larger down payment, and with the 2026 Washoe County conforming limit at $832,750, well above Reno's median price, most purchases fit comfortably within conventional financing.",
  },
  {
    name: "FHA loans",
    body: "work well for buyers using a lower down payment, and Reno's higher local FHA limit helps. The 2026 Washoe County FHA limit is $638,250, notably above Clark County's, so FHA's 3.5% down payment option reaches more of the Reno market than it does in the Las Vegas valley.",
  },
  {
    name: "VA loans",
    body: "remain a strong option for eligible veterans and active-duty service members buying in Reno. They allow 0% down and carry no monthly mortgage insurance, which makes VA one of the most affordable paths to homeownership for those who qualify.",
  },
  {
    name: "Jumbo loans",
    body: "come into play for higher-end Reno homes that sell above the conforming limit. Jumbo financing carries its own credit, reserve, and down payment requirements, and a broker can help match you to the lender with the best terms for that price range.",
  },
];

export default function RenoLocationPage() {
  return (
    <>
      <JsonLd data={faqSchema} />

      <PageHero label="Reno, Nevada" title="Reno, NV Mortgage Loans" />

      <div className="container-page max-w-3xl space-y-12 py-16 sm:py-20">
        <p className="text-lg text-gray-light">
          Reno is a genuinely separate market from the Las Vegas valley, not an
          adjacent submarket. It sits in Washoe County with its own economy,
          pricing, and loan limits, driven in part by logistics, manufacturing,
          and tech employers that have expanded in the region, along with steady
          relocation demand from California and the broader Pacific Northwest.
          That means the local numbers used to size your loan are specific to
          Reno. As a broker licensed across Nevada, I work Reno files with the
          same range of loan programs I use statewide, matched to the county's
          own limits and price points.
        </p>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-bold text-gold sm:text-3xl">
            The Reno market right now
          </h2>
          <p className="text-gray-light">
            Reno&apos;s median sale price was $577,118 as of August 2026, up
            4.9% year over year, according to Redfin, with a median of 46 days
            on market, down three days from a year earlier. Zillow&apos;s
            typical home value measure, which tracks the value of a typical home
            rather than the median of what actually sold, comes in close behind
            at $573,360 as of August 31, 2026, up 1.4% over the past year. The
            two measures largely agree here, and both point to a market that has
            kept rising modestly. Inventory sits at roughly 2.9 months of
            supply, a balanced market that gives both buyers and sellers room to
            negotiate. Mortgage rates remain elevated compared to a year ago:
            30-year conventional rates are running around 7.2% as of late
            September 2026, with FHA rates near 5.38% (6.11% APR) and VA rates
            near 6.84% (7.00% APR), depending on the borrower&apos;s credit
            profile and the lender&apos;s pricing that day.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-bold text-gold sm:text-3xl">
            A market of its own, with its own loan limits
          </h2>
          <p className="text-gray-light">
            Reno is in Washoe County, a different county than the Las Vegas
            valley cities, and it has its own 2026 loan limits. The FHA loan
            limit for a single-family home is $638,250, notably higher than
            Clark County&apos;s $541,287, which reflects Reno&apos;s higher price
            point and lets FHA reach more of the local market. The 2026
            conforming (conventional) loan limit for Washoe County is $832,750,
            the same as Clark County and well above Reno&apos;s median sale
            price, so jumbo financing only comes into play for homes well above
            the median.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-bold text-gold sm:text-3xl">
            Loan programs popular with Reno buyers
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
            for your situation, whether that&apos;s a conventional purchase, an
            FHA loan taking advantage of Reno&apos;s higher county limit, a VA
            loan for a veteran buyer, or jumbo financing for a higher-end home.
            If you&apos;re buying, refinancing, or investing in the Reno area,
            reach out and let&apos;s map out your options.
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
          <Accordion items={RENO_FAQS} />
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
        title="Ready to run your Reno numbers?"
        subtitle="Get a straight answer on rates, programs, and payments for your situation."
        buttonLabel="Book a Call"
        href="/get-started"
      />
    </>
  );
}
