import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Accordion from "@/components/ui/Accordion";
import JsonLd from "@/components/JsonLd";
import {
  SITE,
  PHONE_DISPLAY,
  PHONE_HREF,
} from "@/lib/constants";
import type { FAQ } from "@/lib/data";

const PAGE_PATH = "/loan-options/reverse-mortgage";
const PAGE_URL = `${SITE.url}${PAGE_PATH}`;
const PAGE_TITLE = "Reverse Mortgages in Las Vegas and Henderson";
const PAGE_DESCRIPTION =
  "Plain-English reverse mortgages for Las Vegas and Henderson homeowners and their families. HECM refinance, HECM for Purchase, and jumbo reverse options from Mike Prenesti, The Mortgage Jedi.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
  },
};

const REVERSE_FAQS: FAQ[] = [
  {
    q: "Can I lose my home with a reverse mortgage?",
    a: "Yes. You can lose the home if you stop meeting the loan rules. On a HECM you still have to pay property taxes and homeowners insurance on time, keep the home in good repair, and live there as your primary residence. If those obligations are not met, the loan can become due and the lender can move toward foreclosure.",
  },
  {
    q: "Who owns the home?",
    a: "You do. Title stays in your name. The lender has a lien on the property, the same idea as a regular mortgage, until the loan is paid back.",
  },
  {
    q: "Do I still pay property taxes and insurance?",
    a: "Yes. A reverse mortgage does not replace property taxes, homeowners insurance, flood insurance if it applies, or upkeep. You remain responsible for those costs. Some HECM borrowers have a set-aside from the loan to help pay taxes and insurance. If that reserve runs out, you still have to pay.",
  },
  {
    q: "What happens to my spouse?",
    a: "If your spouse is a co-borrower, they can usually stay in the home as long as they keep meeting the same loan rules. If they are not on the loan, HUD has a separate Eligible Non-Borrowing Spouse path that can let a qualifying spouse remain after the borrower dies, without taking over the reverse mortgage proceeds. That protection is not automatic. HUD generally requires that the spouse was married to the borrower when the loan was signed, was named in the loan documents, lives in the home as a primary residence, and keeps paying property charges and upkeep.",
  },
  {
    q: "What happens to my heirs?",
    a: "When the last borrower, and any eligible non-borrowing spouse, has died or permanently left, the loan becomes due. Heirs can keep the home by paying off the balance, or sell it, repay the loan, and keep leftover equity if there is any. On a HECM, if the balance is higher than the home's value, heirs who sell generally repay the lesser of the full balance or 95 percent of the appraised value. The rest is covered by FHA mortgage insurance, not by the family writing a check for the gap.",
  },
  {
    q: "How is this different from a HELOC?",
    a: "A HELOC is a line of credit you draw from, and you make monthly payments on what you borrow. A reverse mortgage typically has no monthly principal and interest payment, but the balance grows as interest and fees are added, and you must still pay taxes, insurance, and upkeep while living in the home as your primary residence.",
  },
  {
    q: "Do I have to make monthly mortgage payments?",
    a: "On a HECM you typically do not make monthly principal and interest payments. You still pay property taxes, homeowners insurance, and upkeep. If you do not, the loan can come due.",
  },
  {
    q: "What does the counseling session involve?",
    a: "For a HECM, you must complete counseling with a HUD-approved reverse mortgage counselor before the loan can move forward. The counselor walks through how the loan works, costs, other options, and how it can affect a spouse or other people living in the home. Non-borrowing spouses and non-borrowing owners must receive that counseling too. Agencies may charge a counseling fee and have to explain charges first.",
  },
  {
    q: "Can I use a reverse mortgage to buy a home?",
    a: "Yes, through HECM for Purchase, which lets eligible borrowers buy a new primary residence with HECM proceeds. You still need cash for the difference between the loan proceeds and the purchase price, plus closing costs. You must occupy the home as your primary residence, and you still pay taxes, insurance, and upkeep. Not every property type qualifies.",
  },
  {
    q: "What about higher-value homes in Las Vegas and Henderson?",
    a: "The federal HECM program only counts a limited portion of a home's value when it sets how much you can borrow. Owners of higher-value homes sometimes look at jumbo, or proprietary, reverse mortgages instead. Those products are not FHA-insured HECMs, and terms vary by lender.",
  },
];

const howItWorks = [
  {
    title: "Talk through the real goal",
    body: "We start with why you are looking at this. Staying in the home, helping cash flow, buying a different house, or helping a parent think it through. No pitch. Just an honest fit check.",
  },
  {
    title: "Complete HUD-approved counseling",
    body: "For a HECM, counseling with a HUD-approved reverse mortgage counselor is required before the loan can move forward. I will point you to HUD's list. The counselor is independent of me. They cover costs, alternatives, and how the loan affects people who live in the home.",
  },
  {
    title: "Application, appraisal, and a financial assessment",
    body: "If you still want to proceed, we apply. The home is appraised. The lender reviews whether you can keep up with property charges. An existing mortgage on the home generally has to be paid off as part of the reverse mortgage.",
  },
  {
    title: "Closing",
    body: "You review the numbers in writing. On most reverse mortgages you have a short window after closing to cancel in writing if you change your mind. After closing, title stays in your name.",
  },
  {
    title: "Living with the loan",
    body: "You typically do not make monthly principal and interest payments. Interest and fees are added to the balance, so the amount you owe grows over time. You still pay property taxes, insurance, and upkeep, and the home has to remain your primary residence.",
  },
];

const comparisons: {
  option: string;
  payments: string;
  balance: string;
  suits: string;
  tradeoff: string;
}[] = [
  {
    option: "Reverse mortgage",
    payments:
      "Typically no monthly principal and interest. You still pay taxes, insurance, and upkeep.",
    balance: "The balance usually grows as interest and fees are added.",
    suits:
      "Homeowners who want to stay, tap equity, and not take on a new monthly mortgage payment.",
    tradeoff:
      "Costs now, a growing balance, less leftover for heirs, and strict occupancy rules.",
  },
  {
    option: "HELOC",
    payments: "Monthly payments on what you draw.",
    balance: "You repay what you borrow, on top of your first mortgage.",
    suits:
      "Homeowners who can make payments and want a revolving line they can use over time.",
    tradeoff:
      "A new payment, and you still have your first mortgage.",
  },
  {
    option: "Cash-out refinance",
    payments: "A new monthly mortgage payment on the full new loan.",
    balance: "Your first mortgage is replaced by a new, usually larger, loan.",
    suits:
      "Homeowners who can afford a new payment and want a lump sum.",
    tradeoff:
      "You give up the old first mortgage and take on a new payment.",
  },
  {
    option: "Sell and downsize",
    payments:
      "No mortgage if you buy the next home with cash, or a smaller payment if you finance less.",
    balance: "The old loan is paid off when you sell.",
    suits: "People who are ready to move and want to unlock equity by selling.",
    tradeoff: "You leave the home. Moving has its own cost and stress.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: REVERSE_FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: PAGE_TITLE,
  url: PAGE_URL,
  description: PAGE_DESCRIPTION,
  isPartOf: {
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE.url,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Loan Options",
      item: `${SITE.url}/loan-options`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Reverse Mortgage",
      item: PAGE_URL,
    },
  ],
};

function CallBookButtons({ size = "default" }: { size?: "default" | "lg" }) {
  const pad = size === "lg" ? "px-7 py-4 text-lg" : "";
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <a href={PHONE_HREF} className={`btn-gold ${pad}`.trim()}>
        <Phone className="h-5 w-5" aria-hidden="true" />
        Call Mike {PHONE_DISPLAY}
      </a>
      <Link href="/get-started" className={`btn-outline ${pad}`.trim()}>
        Book a Call
      </Link>
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 space-y-5">
      <h2 className="font-heading text-2xl font-bold text-gold sm:text-3xl">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function ReverseMortgagePage() {
  return (
    <>
      <JsonLd data={webPageSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      <PageHero
        label="Loan Options"
        title="Reverse Mortgages in Las Vegas"
        subtitle="A reverse mortgage lets eligible homeowners borrow against home equity without a monthly principal and interest payment, while they still pay property taxes, homeowners insurance, and upkeep, and keep the home as their primary residence."
      >
        <CallBookButtons size="lg" />
        <p className="mt-5 text-lg text-gray-light">
          Questions from adult children are welcome.{" "}
          <a href={PHONE_HREF} className="font-semibold text-gold underline">
            {PHONE_DISPLAY}
          </a>
        </p>
      </PageHero>

      <article className="container-page max-w-3xl space-y-16 py-16 text-lg leading-relaxed text-gray-light sm:py-20">
        <nav aria-label="Breadcrumb" className="text-base text-gray-mid">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link href="/" className="hover:text-gold">
                Home
              </Link>
              <span aria-hidden="true"> / </span>
            </li>
            <li>
              <Link href="/loan-options" className="hover:text-gold">
                Loan Options
              </Link>
              <span aria-hidden="true"> / </span>
            </li>
            <li className="text-white">Reverse Mortgage</li>
          </ol>
        </nav>

        <Section id="is-it-right" title="Is a reverse mortgage right for me?">
          <p>
            It can help if you want to stay in your Las Vegas or Henderson home,
            you have built up equity, and a monthly mortgage payment is the
            part that no longer fits. Some people use it to replace an existing
            mortgage. Some use it to make cash flow less tight. Some adult
            children use a call with me to help a parent look at it with clear
            eyes.
          </p>
          <p>
            It may not fit if you plan to move soon. Selling later means you
            still pay closing costs now, and the balance will have grown. It
            also may not fit if keeping up with property taxes, insurance, and
            repairs is already a stretch. Those bills do not go away. If you
            cannot keep them current, you can lose the home.
          </p>
          <p>
            A reverse mortgage is a loan, not a gift. Your heirs inherit the
            house subject to the loan. If the goal is to leave the home with no
            mortgage on it, this is probably the wrong tool.
          </p>
        </Section>

        <Section id="how-it-works" title="How it works">
          <ol className="space-y-5">
            {howItWorks.map((step, index) => (
              <li
                key={step.title}
                className="rounded-xl border border-white/10 bg-charcoal p-5 sm:p-6"
              >
                <p className="font-heading text-xl font-semibold text-white">
                  <span className="text-gold">{index + 1}.</span> {step.title}
                </p>
                <p className="mt-2">{step.body}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="loan-options" title="Loan options">
          <h3 className="font-heading text-xl font-semibold text-white">
            HECM refinance
          </h3>
          <p>
            A Home Equity Conversion Mortgage, or HECM, is the FHA-insured
            reverse mortgage. It is the most common type. Eligible homeowners
            are 62 or older. You can use it to pay off an existing mortgage and
            tap leftover equity. You typically make no monthly principal and
            interest payment. You still pay property taxes, insurance, and
            upkeep, and the home has to remain your primary residence.
          </p>
          <h3 className="font-heading text-xl font-semibold text-white">
            HECM for Purchase
          </h3>
          <p>
            HECM for Purchase lets eligible borrowers buy a new primary
            residence with HECM proceeds. You still bring cash for the gap
            between the loan amount and the purchase price, plus closing costs.
            You must occupy the home as your primary residence. Taxes,
            insurance, and upkeep still apply. Not every property type is
            eligible.
          </p>
          <h3 className="font-heading text-xl font-semibold text-white">
            Jumbo, or proprietary, reverse mortgages
          </h3>
          <p>
            The federal HECM program only counts a limited portion of a home's
            value when it sets how much you can borrow. That matters in parts
            of Las Vegas and Henderson where home values sit well above a
            typical HECM cap. Owners of higher-value homes sometimes look at
            jumbo reverse mortgages, which are proprietary products, not
            FHA-insured HECMs. Terms vary by lender. I will walk you through
            what is actually available for your property rather than promising a
            product that may not fit.
          </p>
        </Section>

        <Section id="compare" title="How it compares">
          <p>
            None of these is automatically better. The right one depends on
            whether you can make a payment, whether you want to stay, and what
            you want left for the people who come after you.
          </p>
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="min-w-[48rem] w-full border-collapse text-left text-base">
              <caption className="sr-only">
                Reverse mortgage compared with a HELOC, a cash-out refinance,
                and selling to downsize
              </caption>
              <thead>
                <tr className="bg-charcoal text-white">
                  <th scope="col" className="px-4 py-3 font-heading font-semibold">
                    {" "}
                  </th>
                  <th scope="col" className="px-4 py-3 font-heading font-semibold">
                    Reverse mortgage
                  </th>
                  <th scope="col" className="px-4 py-3 font-heading font-semibold">
                    HELOC
                  </th>
                  <th scope="col" className="px-4 py-3 font-heading font-semibold">
                    Cash-out refinance
                  </th>
                  <th scope="col" className="px-4 py-3 font-heading font-semibold">
                    Sell and downsize
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-white/10">
                  <th
                    scope="row"
                    className="bg-charcoal/60 px-4 py-3 font-semibold text-white"
                  >
                    Payments
                  </th>
                  {comparisons.map((row) => (
                    <td key={`${row.option}-pay`} className="px-4 py-3 align-top">
                      {row.payments}
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-white/10">
                  <th
                    scope="row"
                    className="bg-charcoal/60 px-4 py-3 font-semibold text-white"
                  >
                    Loan balance
                  </th>
                  {comparisons.map((row) => (
                    <td key={`${row.option}-bal`} className="px-4 py-3 align-top">
                      {row.balance}
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-white/10">
                  <th
                    scope="row"
                    className="bg-charcoal/60 px-4 py-3 font-semibold text-white"
                  >
                    Who it tends to suit
                  </th>
                  {comparisons.map((row) => (
                    <td key={`${row.option}-suit`} className="px-4 py-3 align-top">
                      {row.suits}
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-white/10">
                  <th
                    scope="row"
                    className="bg-charcoal/60 px-4 py-3 font-semibold text-white"
                  >
                    Main tradeoff
                  </th>
                  {comparisons.map((row) => (
                    <td key={`${row.option}-trade`} className="px-4 py-3 align-top">
                      {row.tradeoff}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-base text-gray-mid">
            On a phone, swipe the table sideways. You can also read{" "}
            <Link
              href="/resources/blog/heloc-vs-cash-out-refi"
              className="text-gold underline hover:text-white"
            >
              HELOC vs cash-out refinance
            </Link>
            , the{" "}
            <Link
              href="/guides/home-equity"
              className="text-gold underline hover:text-white"
            >
              home equity guide
            </Link>
            , and{" "}
            <Link
              href="/resources/blog/should-i-refinance"
              className="text-gold underline hover:text-white"
            >
              when a refinance makes sense
            </Link>
            .
          </p>
        </Section>

        <Section id="costs" title="Costs and tradeoffs">
          <p>
            HECMs have closing costs, and they have FHA mortgage insurance
            premiums, both an upfront premium and an ongoing premium added to
            the balance. Origination and third-party costs such as appraisal and
            title are part of the picture too. You can pay some costs in cash or
            roll them into the loan. Rolling them in means you take home less.
          </p>
          <p>
            Interest accrues. Fees can accrue. The loan balance grows over
            time, which is the opposite of a regular mortgage you pay down each
            month. The longer the loan is open, the more you typically owe, and
            the less equity is left.
          </p>
          <p>
            You must keep paying property taxes, homeowners insurance, and
            upkeep. The home has to remain your primary residence. If those
            obligations are not met, or you no longer live there, the loan can
            come due. That is how people lose a home with a reverse mortgage. It
            is not a trick of the product. It is the loan rules.
          </p>
          <p>
            That growing balance is also what heirs feel. They can keep the
            home by paying the loan off, or sell it. On a HECM they are not
            generally on the hook for a shortage above the home's value when
            they sell under the program rules, but they also may inherit less
            than they expected. Talk about that before anyone signs.
          </p>
          <p>
            Non-borrowing spouse protections come from HUD, not from a sales
            pitch. A spouse who is not on the loan may be able to stay if they
            qualify as an Eligible Non-Borrowing Spouse and keep the home as
            their primary residence while paying property charges. If they do
            not qualify, the loan can come due when the borrower dies. Put both
            names on the loan when that is the honest plan.
          </p>
        </Section>

        <Section
          id="family"
          title="For adult children and family"
        >
          <p>
            If your parent is looking at this, sit in on the call. You do not
            need a finance background. You need the same facts they need.
          </p>
          <p>Ask, out loud:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Can they keep paying taxes, insurance, and repairs?</li>
            <li>Do they plan to stay in this house?</li>
            <li>Who lives there now, and who is on title?</li>
            <li>What should happen to the home later?</li>
            <li>Have they completed HUD-approved counseling yet?</li>
          </ul>
          <p>
            Everyone who lives in the home, or who expects to inherit it,
            should understand that this is a loan against the house. I would
            rather have an awkward family conversation now than a surprise
            later. Adult children are welcome on the call.{" "}
            <Link href="/contact" className="text-gold underline hover:text-white">
              Contact me
            </Link>{" "}
            and we will set a time that works.
          </p>
        </Section>

        <Section
          id="luxury"
          title="Higher-value homes in Las Vegas and Henderson"
        >
          <p>
            A lot of my work is with higher-value homes across the valley,
            including Henderson. A reverse mortgage on a property like that is
            still a loan with the same core tradeoffs: costs, a growing
            balance, and rules about living in the home and paying property
            charges.
          </p>
          <p>
            Because a HECM only counts a limited portion of value, a jumbo
            reverse mortgage is sometimes the product worth comparing. I will
            tell you when it is not. Terms vary by lender, and I will not
            pretend every luxury home is a match. If you want the regular jumbo
            purchase and refinance picture as well, start with{" "}
            <Link
              href="/resources/blog/jumbo-loans-explained"
              className="text-gold underline hover:text-white"
            >
              jumbo loans explained
            </Link>
            .
          </p>
        </Section>

        <Section id="about-mike" title="About Mike">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/mike-headshot.jpg"
              alt="Mike Prenesti, The Mortgage Jedi"
              className="h-36 w-36 flex-shrink-0 rounded-full border-2 border-gold/40 object-cover"
            />
            <div className="space-y-4">
              <p>
                I am Mike Prenesti, {SITE.nmls}. I have {SITE.experiencePhrase},
                and I work with {SITE.company} (Corporate {SITE.corporateNmls}).
              </p>
              <p>
                I will explain this the way I would explain it to my own family:
                what it does, what it costs, and when I would walk away. Read
                more on the{" "}
                <Link href="/about" className="text-gold underline hover:text-white">
                  About
                </Link>{" "}
                page, or go straight to{" "}
                <Link href="/contact" className="text-gold underline hover:text-white">
                  Contact
                </Link>
                .
              </p>
            </div>
          </div>
        </Section>

        <Section id="faq" title="Frequently asked questions">
          <Accordion items={REVERSE_FAQS} />
        </Section>

        <Section id="sources" title="Sources and last verified">
          <p>
            Program rules on this page were checked against official HUD and
            CFPB materials on November 6, 2026. Figures that change, such as
            FHA mortgage insurance rates and lending limits, are described in
            words rather than outdated numbers.
          </p>
          <ul className="list-disc space-y-2 pl-6 text-base">
            <li>
              <a
                href="https://www.hud.gov/program_offices/housing/sfh/hecm/hecmhome"
                className="text-gold underline hover:text-white"
                rel="noopener noreferrer"
                target="_blank"
              >
                HUD: FHA Reverse Mortgage for Seniors (HECM)
              </a>
            </li>
            <li>
              <a
                href="https://www.ecfr.gov/current/title-24/section-206.41"
                className="text-gold underline hover:text-white"
                rel="noopener noreferrer"
                target="_blank"
              >
                24 CFR 206.41, HECM counseling
              </a>
            </li>
            <li>
              <a
                href="https://www.consumerfinance.gov/consumer-tools/reverse-mortgages/"
                className="text-gold underline hover:text-white"
                rel="noopener noreferrer"
                target="_blank"
              >
                CFPB: Reverse mortgage loans
              </a>
            </li>
            <li>
              <a
                href="https://www.consumerfinance.gov/ask-cfpb/what-is-a-reverse-mortgage-en-224/"
                className="text-gold underline hover:text-white"
                rel="noopener noreferrer"
                target="_blank"
              >
                CFPB: What is a reverse mortgage?
              </a>
            </li>
            <li>
              <a
                href="https://www.consumerfinance.gov/ask-cfpb/what-are-my-responsibilities-as-a-reverse-mortgage-loan-borrower-en-235/"
                className="text-gold underline hover:text-white"
                rel="noopener noreferrer"
                target="_blank"
              >
                CFPB: Borrower responsibilities
              </a>
            </li>
            <li>
              <a
                href="https://www.consumerfinance.gov/ask-cfpb/when-do-i-have-to-pay-back-a-reverse-mortgage-loan-en-236/"
                className="text-gold underline hover:text-white"
                rel="noopener noreferrer"
                target="_blank"
              >
                CFPB: When the loan must be repaid
              </a>
            </li>
            <li>
              <a
                href="https://www.consumerfinance.gov/ask-cfpb/how-much-does-a-reverse-mortgage-loan-cost-en-237/"
                className="text-gold underline hover:text-white"
                rel="noopener noreferrer"
                target="_blank"
              >
                CFPB: How much a reverse mortgage costs
              </a>
            </li>
            <li>
              <a
                href="https://www.consumerfinance.gov/ask-cfpb/can-i-use-a-reverse-mortgage-loan-to-buy-a-home-en-238/"
                className="text-gold underline hover:text-white"
                rel="noopener noreferrer"
                target="_blank"
              >
                CFPB: HECM for Purchase
              </a>
            </li>
            <li>
              <a
                href="https://www.consumerfinance.gov/ask-cfpb/what-happens-my-reverse-mortgage-when-i-die-en-2096/"
                className="text-gold underline hover:text-white"
                rel="noopener noreferrer"
                target="_blank"
              >
                CFPB: What happens when the borrower dies (including HUD
                Eligible Non-Borrowing Spouse rules)
              </a>
            </li>
            <li>
              <a
                href="https://www.consumerfinance.gov/ask-cfpb/with-a-reverse-mortgage-loan-can-my-heirs-keep-or-sell-my-home-after-i-die-en-242/"
                className="text-gold underline hover:text-white"
                rel="noopener noreferrer"
                target="_blank"
              >
                CFPB: What heirs can do
              </a>
            </li>
          </ul>
          <p className="text-base">
            This page is educational. It is not a loan offer, a commitment to
            lend, or legal advice. {SITE.company}, Corporate {SITE.corporateNmls}.
            Mike Prenesti, {SITE.nmls}.
          </p>
        </Section>
      </article>

      <section className="border-t border-white/10 bg-charcoal">
        <div className="container-page flex flex-col items-start gap-5 py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
              Want a straight answer for your house?
            </h2>
            <p className="mt-2 text-lg text-gray-light">
              Call or book a time. Bring whoever lives in the home, or whoever
              will inherit it.
            </p>
            <p className="mt-2 text-lg font-semibold text-white">
              <a href={PHONE_HREF} className="hover:text-gold">
                {PHONE_DISPLAY}
              </a>
            </p>
          </div>
          <CallBookButtons size="lg" />
        </div>
      </section>
    </>
  );
}
