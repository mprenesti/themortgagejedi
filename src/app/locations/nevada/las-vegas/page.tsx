import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Accordion from "@/components/ui/Accordion";
import CTAStrip from "@/components/ui/CTAStrip";
import JsonLd from "@/components/JsonLd";
import { PHONE_HREF, EMAIL_HREF } from "@/lib/constants";
import type { FAQ } from "@/lib/data";

// CONTENT REFRESH NOTE:
// The rate, price, and inventory figures below are current as of
// September 28, 2026. Review and update these numbers (and the matching FAQ
// answers + JSON-LD schema) roughly every quarter, or whenever the local
// market shifts materially, so the page stays accurate for search and AI
// answer engines.

export const metadata: Metadata = {
  title: "Getting a Mortgage in Las Vegas, NV",
  description:
    "Current Las Vegas mortgage rates, home prices, and loan programs from a local broker. FHA, VA, conventional, and DSCR loans for Las Vegas and Henderson buyers.",
};

// Single source of truth for the FAQ. The visible Accordion and the JSON-LD
// schema are both built from this array, so they always match word for word.
const LAS_VEGAS_FAQS: FAQ[] = [
  {
    q: "What is the average home price in Las Vegas right now?",
    a: "The median sale price for a previously owned single-family home in the Las Vegas valley was $475,000 in August 2026, down from a peak of $490,000 in May and June. Prices have eased slightly as inventory has grown, but well-priced homes are still selling quickly in many neighborhoods.",
  },
  {
    q: "What loan programs work best for buyers in Las Vegas?",
    a: "FHA and conventional loans cover most owner-occupied purchases, VA loans are a strong option given the area's large military population near Nellis and Creech Air Force Bases, and DSCR loans are increasingly popular with investors who want to qualify based on a property's rental income rather than personal income.",
  },
  {
    q: "How much do I need for a down payment to buy in Las Vegas?",
    a: "FHA loans allow as little as 3.5% down, VA loans allow eligible veterans and service members to buy with 0% down, and conventional loans typically start around 5% down, though putting down 20% avoids ongoing mortgage insurance.",
  },
  {
    q: "Are VA loans a good option in Las Vegas?",
    a: "Yes. With Nellis Air Force Base and Creech Air Force Base both nearby, Las Vegas has a large population of veterans and active-duty service members eligible for VA financing. VA loans allow 0% down and carry no monthly mortgage insurance, which typically makes them the least expensive path to homeownership for eligible buyers.",
  },
  {
    q: "What credit score do I need to buy a home in Las Vegas?",
    a: "Most lenders look for a credit score of at least 620 for conventional loans and 580 for FHA loans with the lowest down payment option of 3.5%. FHA also has a program that goes down to a 500 credit score with 10% down, for buyers who don't yet qualify at 580. DSCR loans and other non-QM programs can sometimes work with scores in the 620 to 640 range depending on the lender and the rest of the file.",
  },
  {
    q: "Is now a good time to buy in Las Vegas, or should I wait for rates to drop?",
    a: "Rates are elevated compared to a year ago, but inventory is up 7.2% year over year, giving buyers more negotiating room on price and terms than earlier in 2026. Buyers who wait for rates to drop often face more competition and higher prices once that happens, so it's worth running the numbers on your specific scenario rather than trying to time the market.",
  },
  {
    q: "Can I buy an investment property in Las Vegas with a DSCR loan?",
    a: "Yes. DSCR loans qualify based on the property's projected rental income rather than your personal income or tax returns, which makes them a common tool for investors building a rental portfolio in the Las Vegas market, and for self-employed buyers whose tax returns don't reflect their full income.",
  },
  {
    q: "What's the difference between working with a broker like The Mortgage Jedi and going directly to a bank?",
    a: "A broker shops your loan across multiple lenders and loan programs to find the best combination of rate, terms, and approval odds for your specific situation, while a bank can only offer its own in-house products. That matters most for buyers who don't fit a standard conventional box, including investors, self-employed borrowers, and veterans.",
  },
  {
    q: "How long does it take to close on a house in Las Vegas?",
    a: "Most purchase loans close in 30 to 45 days from the time an offer is accepted, though VA and FHA loans can sometimes take slightly longer depending on the lender and the appraisal timeline. Getting fully pre-approved before you start shopping is the biggest factor in keeping that timeline tight.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: LAS_VEGAS_FAQS.map((item) => ({
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
    body: "remain one of the most common paths into homeownership here, especially for first-time buyers with less than 20% saved for a down payment. FHA allows down payments as low as 3.5% and is more flexible on credit history than conventional financing.",
  },
  {
    name: "VA loans",
    body: "are a major factor in the Las Vegas market given the region's military presence. Eligible veterans and active-duty service members can buy with 0% down and no monthly mortgage insurance, which makes VA one of the strongest programs available anywhere, not just locally.",
  },
  {
    name: "Conventional loans",
    body: "work well for buyers with stronger credit and a larger down payment, and they avoid the ongoing mortgage insurance cost that comes with FHA once a buyer reaches 20% equity.",
  },
  {
    name: "DSCR loans",
    body: "have become increasingly popular with the investor side of the Las Vegas market. These loans qualify based on a property's rental income rather than the borrower's personal income, which makes them a fit for investors building a rental portfolio or buyers who are self-employed and don't show enough income on paper through traditional documentation.",
  },
  {
    name: "HELOCs",
    body: "are common among longer-term Las Vegas homeowners who have built equity during the recent run-up in prices and want to access it for renovations, debt consolidation, or a down payment on an investment property without touching their existing mortgage rate.",
  },
];

const costScenarios: { label: string; body: string }[] = [
  {
    label: "Conventional, 20% down:",
    body: "a $380,000 loan at approximately 7.2% runs about $2,574 a month in principal and interest, before taxes, insurance, and HOA dues.",
  },
  {
    label: "FHA, 3.5% down:",
    body: "a loan of roughly $466,000 after financing the upfront mortgage insurance premium, at approximately 5.4%, runs about $2,613 a month in principal and interest, plus roughly $214 a month in ongoing mortgage insurance.",
  },
  {
    label: "VA, 0% down:",
    body: "a $475,000 loan at approximately 6.8% runs about $3,109 a month in principal and interest, with no monthly mortgage insurance.",
  },
];

export default function LasVegasLocationPage() {
  return (
    <>
      <JsonLd data={faqSchema} />

      <PageHero
        label="Las Vegas, Nevada"
        title="Getting a Mortgage in Las Vegas, Nevada"
      />

      <div className="container-page max-w-3xl space-y-12 py-16 sm:py-20">
        <p className="text-lg text-gray-light">
          Las Vegas remains one of the most active markets in the country for
          both first-time buyers and real estate investors, and financing here
          looks different than it does almost anywhere else. Between a high
          concentration of self-employed and 1099 workers in hospitality and
          gaming, a large military and veteran population tied to Nellis Air
          Force Base and Creech Air Force Base, and a fast-growing investor
          market, most Las Vegas buyers need a broker who can work across loan
          programs rather than a single bank product.
        </p>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-bold text-gold sm:text-3xl">
            The Las Vegas market right now
          </h2>
          <p className="text-gray-light">
            Home prices in the Las Vegas valley have eased slightly from their
            record high. The median sale price for a previously owned
            single-family home was $475,000 in August 2026, down from a peak of
            $490,000 set in May and June. Inventory is up 7.2% from a year ago,
            giving buyers more room to negotiate than they had earlier in the
            year, though just over half of homes that sold in August went under
            contract within 30 days, so well-priced properties in good condition
            are still moving quickly. Mortgage rates remain elevated compared to
            a year ago: 30-year conventional rates are running in the low 7%
            range as of late September 2026, with FHA and VA rates typically
            running one to two percentage points lower depending on the
            borrower&apos;s credit profile and the lender&apos;s pricing that
            day.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-bold text-gold sm:text-3xl">
            Loan programs popular with Las Vegas buyers
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
            What a Las Vegas home costs to finance right now
          </h2>
          <p className="text-gray-light">
            At the current median price of $475,000, here&apos;s roughly what
            monthly principal and interest looks like under a few common
            scenarios, using rates as of late September 2026:
          </p>
          <ul className="space-y-3">
            {costScenarios.map((scenario) => (
              <li
                key={scenario.label}
                className="rounded-lg border border-white/10 bg-charcoal p-4 text-gray-light"
              >
                <strong className="font-semibold text-white">
                  {scenario.label}
                </strong>{" "}
                {scenario.body}
              </li>
            ))}
          </ul>
          <p className="text-gray-light">
            These are estimates based on today&apos;s average rates and a
            median-priced home. Actual pricing depends on credit score, loan
            amount, property type, and the day&apos;s market, so the only way to
            know your real number is to run your specific scenario.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-bold text-gold sm:text-3xl">
            Work with a local broker, not just a local bank
          </h2>
          <p className="text-gray-light">
            As a broker rather than a single bank, I shop your loan across
            multiple lenders and programs to find the fit that actually works
            for your situation, whether that&apos;s a straightforward
            conventional purchase, a VA loan for a veteran buyer, or a DSCR loan
            for an investor adding to a rental portfolio. If you&apos;re buying,
            refinancing, or investing in the Las Vegas or Henderson area, reach
            out and let&apos;s map out your options.
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
          <Accordion items={LAS_VEGAS_FAQS} />
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
        title="Ready to run your Las Vegas numbers?"
        subtitle="Get a straight answer on rates, programs, and payments for your situation."
        buttonLabel="Book a Call"
        href="/get-started"
      />
    </>
  );
}
