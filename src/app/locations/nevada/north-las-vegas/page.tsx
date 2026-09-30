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
// August and September 2026. Price data cites two sources (Redfin median sale
// price and Zillow's typical home value index) since they diverge slightly.
// Review and update these numbers (and the matching FAQ answers + JSON-LD
// schema) roughly every quarter, or whenever the local market shifts
// materially, so the page stays accurate for search and AI answer engines.

export const metadata: Metadata = {
  title: "North Las Vegas, NV Mortgage Loans",
  description:
    "Current North Las Vegas home prices, loan limits, and programs from a local broker. FHA, VA, and conventional loans in one of the valley's most affordable markets.",
};

// Single source of truth for the FAQ. The visible Accordion and the JSON-LD
// schema are both built from this array, so they always match word for word.
const NORTH_LAS_VEGAS_FAQS: FAQ[] = [
  {
    q: "What is the median home price in North Las Vegas right now?",
    a: "North Las Vegas's median sale price was $422,470 as of August 2026, up 1.8% year over year, according to Redfin. Zillow's typical home value measure puts it slightly lower at $402,439, down 1.5% over the past year. Either way, North Las Vegas remains one of the more affordable cities in the valley.",
  },
  {
    q: "Is North Las Vegas more affordable than Las Vegas overall?",
    a: "Yes, generally. North Las Vegas's home prices run below Henderson and Summerlin and close to or under the broader Las Vegas valley median, making it one of the more accessible entry points into the market for first-time buyers.",
  },
  {
    q: "Does FHA financing work well in North Las Vegas?",
    a: "Very well. The 2026 FHA loan limit for Clark County is $541,287, comfortably above North Las Vegas's typical price range, so FHA's 3.5% down payment option fits the majority of homes here.",
  },
  {
    q: "Is North Las Vegas a good market for VA loans?",
    a: "North Las Vegas is home to Nellis Air Force Base, so VA loans are a common and well-supported option here for eligible veterans, active duty service members, and military families relocating to the area, often with 0% down.",
  },
  {
    q: "What loan programs work best for buyers in North Las Vegas?",
    a: "FHA loans cover most of the market given the price range, VA loans are especially relevant given the proximity to Nellis Air Force Base, and conventional loans work well for buyers with stronger credit and a larger down payment. Jumbo financing is rarely needed here.",
  },
  {
    q: "How much do I need for a down payment to buy in North Las Vegas?",
    a: "FHA loans allow as little as 3.5% down for eligible buyers, VA loans allow eligible veterans and service members to buy with 0% down, and conventional loans typically start around 5% down, though 20% down avoids ongoing mortgage insurance.",
  },
  {
    q: "What credit score do I need to buy a home in North Las Vegas?",
    a: "Most lenders look for a credit score of at least 620 for conventional loans and 580 for FHA loans with the lowest down payment option of 3.5%. FHA also has a program that goes down to a 500 credit score with 10% down, for buyers who don't yet qualify at 580.",
  },
  {
    q: "How competitive is the North Las Vegas housing market right now?",
    a: "Homes are selling in a median of about 46 days and receiving roughly one offer on average, putting North Las Vegas in a fairly balanced, somewhat competitive range rather than the fast-paced bidding seen in some other parts of the valley.",
  },
  {
    q: "How long does it take to close on a house in North Las Vegas?",
    a: "Most purchase loans close in 30 to 45 days from the time an offer is accepted, though VA and FHA loans can sometimes take slightly longer depending on the lender and the appraisal timeline. Getting fully pre-approved before you start shopping is the biggest factor in keeping that timeline tight.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: NORTH_LAS_VEGAS_FAQS.map((item) => ({
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
    name: "FHA loans",
    body: "cover most of the North Las Vegas market. With the 2026 Clark County loan limit of $541,287 sitting comfortably above the city's typical prices, FHA's 3.5% down payment and flexible credit guidelines fit the majority of homes here, which makes it a popular choice for first-time buyers.",
  },
  {
    name: "VA loans",
    body: "are especially relevant in North Las Vegas given the proximity to Nellis Air Force Base. Eligible veterans and active-duty service members can buy with 0% down and no monthly mortgage insurance, which makes VA one of the strongest programs available for the area's large military community.",
  },
  {
    name: "Conventional loans",
    body: "work well for buyers with stronger credit and a larger down payment, and they avoid the ongoing mortgage insurance cost that comes with FHA once a buyer reaches 20% equity. Most North Las Vegas homes fall well within the conforming limit, so conventional financing is straightforward here.",
  },
  {
    name: "DSCR loans",
    body: "are an option for investors buying rental property in North Las Vegas. These loans qualify based on a property's rental income rather than the borrower's personal income, which makes them a fit for building a rental portfolio in one of the valley's more affordable markets.",
  },
];

export default function NorthLasVegasLocationPage() {
  return (
    <>
      <JsonLd data={faqSchema} />

      <PageHero
        label="North Las Vegas, Nevada"
        title="North Las Vegas, NV Mortgage Loans"
      />

      <div className="container-page max-w-3xl space-y-12 py-16 sm:py-20">
        <p className="text-lg text-gray-light">
          North Las Vegas is one of the most affordable cities in the valley,
          which makes it a common entry point for first-time buyers and a strong
          market for VA financing thanks to nearby Nellis Air Force Base. Home
          prices here run below Henderson and Summerlin and sit close to or
          under the overall Las Vegas valley median, so most purchases fall
          comfortably within FHA and conventional loan limits. That said, buyers
          still benefit from a broker who can compare FHA, VA, and conventional
          options rather than a single bank product to find the right fit.
        </p>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-bold text-gold sm:text-3xl">
            The North Las Vegas market right now
          </h2>
          <p className="text-gray-light">
            North Las Vegas remains one of the more affordable cities in the
            valley. Redfin put the median sale price at $422,470 as of August
            2026, up 1.8% year over year, with a median of 46 days on market, up
            five days from a year earlier. Zillow&apos;s typical home value
            measure, which tracks the value of a typical home rather than the
            median of what actually sold, comes in slightly lower at $402,439 as
            of August 31, 2026, down 1.5% over the past year. The two measures
            diverge a little, but both point to an affordable, roughly balanced
            market. Redfin rates it &quot;somewhat competitive,&quot; with homes
            receiving around one offer on average. Mortgage rates remain
            elevated compared to a year ago: 30-year conventional rates are
            running around 7.2% as of late September 2026, with FHA rates near
            5.38% (6.11% APR) and VA rates near 6.84% (7.00% APR), depending on
            the borrower&apos;s credit profile and the lender&apos;s pricing that
            day.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-bold text-gold sm:text-3xl">
            Loan limits and what they mean in North Las Vegas
          </h2>
          <p className="text-gray-light">
            North Las Vegas is in Clark County, so it uses the county&apos;s
            2026 loan limits. The FHA loan limit for a single-family home is
            $541,287, comfortably above North Las Vegas&apos;s median price,
            which makes FHA a strong fit for most homes in the city. The 2026
            conforming (conventional) loan limit for Clark County is $832,750,
            well above typical North Las Vegas prices, so jumbo financing is
            rarely a factor here. In practice that means most buyers have their
            pick of FHA, VA, and conventional programs without bumping into a
            loan limit.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-bold text-gold sm:text-3xl">
            A strong market for VA loans
          </h2>
          <p className="text-gray-light">
            North Las Vegas is home to Nellis Air Force Base, which makes VA loan
            volume and military relocation a meaningful part of the local
            market. Eligible veterans, active-duty service members, and military
            families relocating to the area can buy with 0% down and no monthly
            mortgage insurance, which typically makes VA the least expensive path
            to homeownership for those who qualify. Working with a broker who
            handles VA loans regularly helps keep the appraisal and approval
            timeline on track.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-bold text-gold sm:text-3xl">
            Loan programs popular with North Las Vegas buyers
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
            for your situation, whether that&apos;s an FHA loan for a first-time
            buyer, a VA loan for a veteran or service member near Nellis, or a
            conventional purchase. If you&apos;re buying, refinancing, or
            investing in the North Las Vegas area, reach out and let&apos;s map
            out your options.
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
          <Accordion items={NORTH_LAS_VEGAS_FAQS} />
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
        title="Ready to run your North Las Vegas numbers?"
        subtitle="Get a straight answer on rates, programs, and payments for your situation."
        buttonLabel="Book a Call"
        href="/get-started"
      />
    </>
  );
}
