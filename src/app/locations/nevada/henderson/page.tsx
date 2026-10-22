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
// September 2026. Review and update these numbers (and the matching FAQ
// answers + JSON-LD schema) roughly every quarter, or whenever the local
// market shifts materially, so the page stays accurate for search and AI
// answer engines.
// Parks, shopping, school-link and road details verified October 14, 2026. Recheck hours, addresses and links when refreshing.

export const metadata: Metadata = {
  title: "Henderson, NV Mortgage Loans",
  description:
    "Current Henderson mortgage rates, home prices, loan limits, and programs from a local broker. FHA, VA, conventional, and jumbo loans for Henderson buyers.",
};

// Single source of truth for the FAQ. The visible Accordion and the JSON-LD
// schema are both built from this array, so they always match word for word.
const HENDERSON_FAQS: FAQ[] = [
  {
    q: "What is the median home price in Henderson right now?",
    a: "Henderson's median home sale price was $540,000 in September 2026, up 5.4% year over year. That's roughly $68,000 above the Las Vegas valley's overall median.",
  },
  {
    q: "Why are homes in Henderson more expensive than Las Vegas overall?",
    a: "Henderson's median price sits above the Las Vegas valley's overall median. Newer master-planned communities like Green Valley, Anthem, and Lake Las Vegas, higher-end areas like MacDonald Highlands, and steady demand from California buyers relocating to Nevada all play a role in pricing here.",
  },
  {
    q: "Does FHA financing cover home prices in Henderson?",
    a: "It depends on the home. The 2026 FHA loan limit for Clark County is $541,287, which sits right around Henderson's current median price. Homes above that, especially in higher-end communities like MacDonald Highlands, typically need conventional or jumbo financing instead.",
  },
  {
    q: "What loan programs work best for buyers in Henderson?",
    a: "Conventional loans cover most purchases given Henderson's higher price points, FHA works well for homes near or below the county's loan limit, VA loans are a strong option for eligible veterans and service members, and jumbo financing comes into play for higher-end communities like MacDonald Highlands and Lake Las Vegas.",
  },
  {
    q: "How much do I need for a down payment to buy in Henderson?",
    a: "FHA loans allow as little as 3.5% down for buyers who qualify, VA loans allow eligible veterans and service members to buy with 0% down, and conventional loans typically start around 5% down, though 20% down avoids ongoing mortgage insurance.",
  },
  {
    q: "What credit score do I need to buy a home in Henderson?",
    a: "Most lenders look for a credit score of at least 620 for conventional loans and 580 for FHA loans with the lowest down payment option of 3.5%. FHA also has a program that goes down to a 500 credit score with 10% down, for buyers who don't yet qualify at 580.",
  },
  {
    q: "What are Henderson's most popular master-planned communities?",
    a: "Green Valley, Anthem, Inspirada, and Lake Las Vegas are among the most established, with MacDonald Highlands representing the higher end of the market. Each has its own HOA structure and price range, which can affect financing details like condo approval or HOA fee factoring.",
  },
  {
    q: "How competitive is the Henderson housing market right now?",
    a: "Henderson currently has about 2.3 months of housing supply with homes selling in a median of 35 days, which points to a fairly balanced market. Well-priced homes in popular communities still move quickly.",
  },
  {
    q: "How long does it take to close on a house in Henderson?",
    a: "Most purchase loans close in 30 to 45 days from the time an offer is accepted, though VA and FHA loans can sometimes take slightly longer depending on the lender and the appraisal timeline. Getting fully pre-approved before you start shopping is the biggest factor in keeping that timeline tight.",
  },
  {
    q: "What parks and trails are in Henderson?",
    a: "The City of Henderson reports more than 70 parks and more than 220 miles of trails. Examples include Cornerstone Park (1600 Wigwam Pkwy), Heritage Park (350 S. Racetrack Rd), the 34-mile River Mountains Loop Trail with a Henderson trailhead at 1020 Golda Way, and the Henderson Bird Viewing Preserve (350 E. Galleria Dr). Confirm hours and amenities with the City of Henderson before you visit.",
  },
  {
    q: "Where can I shop and dine in Henderson?",
    a: "Henderson has several districts, including the Water Street District in downtown Henderson, The District at Green Valley Ranch, Galleria at Sunset (1300 W. Sunset Rd), and MonteLago Village at Lake Las Vegas.",
  },
  {
    q: "Which school district serves Henderson?",
    a: "The Clark County School District serves Henderson. Schools are assigned by address, so use the CCSD zoning lookup at ccsd.net/zoning to see which schools serve a specific home. Official school data is available from the Nevada Report Card at nevadareportcard.nv.gov/di/. This page does not rate or rank schools.",
  },
  {
    q: "What major roads connect Henderson to the rest of the Las Vegas valley?",
    a: "Major routes include I-215, US-93 and US-95 (I-515), Boulder Highway, and Lake Mead Parkway.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HENDERSON_FAQS.map((item) => ({
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
    body: "cover the majority of Henderson purchases given the area's higher price points. They work well for buyers with stronger credit and a larger down payment, and they avoid the ongoing mortgage insurance cost that comes with FHA once a buyer reaches 20% equity.",
  },
  {
    name: "FHA loans",
    body: "work well for homes near or below the 2026 Clark County loan limit of $541,287, which sits right around Henderson's median price. FHA allows down payments as low as 3.5% and is more flexible on credit history than conventional financing.",
  },
  {
    name: "VA loans",
    body: "are a strong option for the eligible veterans and active-duty service members buying in Henderson. They allow 0% down and carry no monthly mortgage insurance, which makes VA one of the most affordable paths to homeownership for those who qualify.",
  },
  {
    name: "Jumbo loans",
    body: "come into play for Henderson's higher-end communities like MacDonald Highlands and Lake Las Vegas, where prices frequently run above the 2026 conforming limit of $832,750 for Clark County. Jumbo financing has its own credit, reserve, and down payment requirements that a broker can help you navigate.",
  },
];

export default function HendersonLocationPage() {
  return (
    <>
      <JsonLd data={faqSchema} />

      <PageHero label="Henderson, Nevada" title="Henderson, NV Mortgage Loans" />

      <div className="container-page max-w-3xl space-y-12 py-16 sm:py-20">
        <p className="text-lg text-gray-light">
          Henderson sits southeast of Las Vegas and is made up largely of
          master-planned communities, including Green Valley, Anthem, Inspirada,
          and Lake Las Vegas. Its median home price runs above the rest of the
          Las Vegas valley, which means financing here often looks different
          than it does in the rest of the valley. Between higher price points
          that push up against FHA loan limits, a wave of California buyers
          relocating to Nevada, and higher-end communities that call for jumbo
          financing, most Henderson
          buyers benefit from a broker who can work across loan programs rather
          than a single bank product.
        </p>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-bold text-gold sm:text-3xl">
            The Henderson market right now
          </h2>
          <p className="text-gray-light">
            Henderson&apos;s median home sale price was $540,000 in September
            2026, up 5.4% year over year and roughly $68,000 above the Las Vegas
            valley&apos;s overall median. Newer master-planned communities,
            higher-end areas like MacDonald Highlands, and continued California
            relocation demand all contribute to that difference. Inventory sits
            at about 2.3 months of supply with a median of 35 days on market,
            which points to a fairly balanced market where
            well-priced homes in popular communities still move quickly.
            Mortgage rates remain elevated compared to a year ago: 30-year
            conventional rates are running around 7.2% as of late September
            2026, with FHA rates near 5.38% (6.11% APR) and VA rates near 6.84%
            (7.00% APR), depending on the borrower&apos;s credit profile and the
            lender&apos;s pricing that day.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-bold text-gold sm:text-3xl">
            Loan limits and what they mean in Henderson
          </h2>
          <p className="text-gray-light">
            Henderson is in Clark County, so it uses the county&apos;s 2026 loan
            limits. The FHA loan limit for a single-family home is $541,287,
            which lands right at Henderson&apos;s current median price. That
            means homes at or below the median can often be financed with FHA,
            but buyers looking above the median frequently need conventional or
            jumbo financing instead. The 2026 conforming (conventional) loan
            limit for Clark County is $832,750, and homes priced above that,
            common in communities like MacDonald Highlands and Lake Las Vegas,
            move into jumbo territory with their own guidelines.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-bold text-gold sm:text-3xl">
            Loan programs popular with Henderson buyers
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
            Henderson&apos;s master-planned communities
          </h2>
          <p className="text-gray-light">
            Much of Henderson is built around master-planned communities, each
            with its own character, price range, and HOA structure. Green
            Valley, Anthem, Inspirada, and Lake Las Vegas are among the most
            established, while MacDonald Highlands sits at the higher end and
            often requires jumbo financing. The community you buy in can affect
            more than price. HOA fees factor into your qualifying ratios, and
            condo or planned-development approval can shape which loan programs
            are available, so it pays to line up financing with your target
            neighborhood in mind.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-bold text-gold sm:text-3xl">
            Parks and trails in Henderson
          </h2>
          <p className="text-gray-light">
            The City of Henderson reports more than 70 parks and more than 220
            miles of trails. A few places that show the range:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-gray-light">
            <li>
              <strong className="font-semibold text-white">
                Cornerstone Park
              </strong>
              , 1600 Wigwam Pkwy, has a lake, trails, pavilions, and public art.
            </li>
            <li>
              <strong className="font-semibold text-white">Heritage Park</strong>
              , 350 S. Racetrack Rd, has an amphitheater, sports fields, a play
              area, and a Bark Park.
            </li>
            <li>
              <strong className="font-semibold text-white">
                River Mountains Loop Trail
              </strong>{" "}
              is a 34-mile loop with a Henderson trailhead at 1020 Golda Way.
            </li>
            <li>
              <strong className="font-semibold text-white">
                Henderson Bird Viewing Preserve
              </strong>
              , 350 E. Galleria Dr, covers about 80 acres with nine ponds. Hours
              vary by season.
            </li>
          </ul>
          <p className="text-gray-light">
            Hours, access, and amenities change, so confirm details with the
            City of Henderson before you visit.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-bold text-gold sm:text-3xl">
            Shopping, dining, and things to do
          </h2>
          <p className="text-gray-light">
            Henderson has several shopping and dining districts spread across
            the city:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-gray-light">
            <li>
              <strong className="font-semibold text-white">
                Water Street District
              </strong>
              , in downtown Henderson, is a City redevelopment area.
            </li>
            <li>
              <strong className="font-semibold text-white">
                The District at Green Valley Ranch
              </strong>
              .
            </li>
            <li>
              <strong className="font-semibold text-white">
                Galleria at Sunset
              </strong>
              , 1300 W. Sunset Rd.
            </li>
            <li>
              <strong className="font-semibold text-white">
                MonteLago Village at Lake Las Vegas
              </strong>
              .
            </li>
          </ul>
          <p className="text-gray-light">
            Dated events are published by the City of Henderson and change from
            year to year.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-bold text-gold sm:text-3xl">
            Schools and getting around
          </h2>
          <p className="text-gray-light">
            The Clark County School District (CCSD) serves Henderson. Schools
            are assigned by address, so use the CCSD zoning lookup at{" "}
            <a
              href="https://www.ccsd.net/zoning"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gold"
            >
              ccsd.net/zoning
            </a>{" "}
            to see which schools serve a specific home. For official school
            data, see the Nevada Report Card at{" "}
            <a
              href="https://nevadareportcard.nv.gov/di/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gold"
            >
              nevadareportcard.nv.gov/di/
            </a>
            . This page does not rate or rank schools.
          </p>
          <p className="text-gray-light">
            Main routes through and around Henderson include I-215, US-93 and
            US-95 (I-515), Boulder Highway, and Lake Mead Parkway.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-bold text-gold sm:text-3xl">
            Work with a local broker, not just a local bank
          </h2>
          <p className="text-gray-light">
            As a broker rather than a single bank, I shop your loan across
            multiple lenders and programs to find the fit that actually works
            for your situation, whether that&apos;s a conventional purchase in
            Green Valley, an FHA loan near the county limit, a VA loan for a
            veteran buyer, or jumbo financing for a home in MacDonald Highlands.
            If you&apos;re buying, refinancing, or investing in the Henderson
            area, reach out and let&apos;s map out your options.
          </p>
          <div className="rounded-2xl border border-gold/30 bg-charcoal p-6">
            <p className="font-heading text-lg font-bold text-white">
              Contact The Mortgage Jedi
            </p>
            <p className="mt-2 text-gray-light">
              Mike Prenesti, NMLS #1033445
              <br />
              C2 Financial Corporation, NMLS #135622
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
          <Accordion items={HENDERSON_FAQS} />
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
        title="Ready to run your Henderson numbers?"
        subtitle="Get a straight answer on rates, programs, and payments for your situation."
        buttonLabel="Book a Call"
        href="/get-started"
      />
    </>
  );
}
