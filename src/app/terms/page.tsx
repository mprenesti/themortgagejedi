import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for themortgagejedi.com.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero label="Legal" title="Terms of Use" />
      <div className="container-page max-w-3xl py-16 sm:py-20">
        <div className="prose prose-invert max-w-none prose-headings:font-heading prose-headings:text-white prose-a:text-gold">
          <p>
            By accessing and using themortgagejedi.com, you agree to the
            following terms. Please read them carefully.
          </p>

          <h2>Informational Purpose Only</h2>
          <p>
            The content on this website — including calculators, articles, and
            guides — is provided for general informational and educational
            purposes only. It does not constitute financial, legal, or tax
            advice, and is not a commitment to lend or an offer of credit. Loan
            terms, rates, and program availability are subject to change and
            require a complete application and approval.
          </p>

          <h2>Calculator Estimates</h2>
          <p>
            Calculator results are estimates only and may not reflect your
            actual loan terms. Final figures depend on your full financial
            profile, credit, the loan program, and current market rates.
          </p>

          <h2>No Warranty</h2>
          <p>
            This website is provided &quot;as is&quot; without warranties of any
            kind. We make reasonable efforts to keep information accurate and
            current but do not guarantee its completeness or accuracy.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            Our site may link to third-party websites. We are not responsible
            for the content or practices of those sites.
          </p>

          <h2>Equal Housing Lender</h2>
          <p>
            We are committed to the letter and spirit of the U.S. policy for the
            achievement of equal housing opportunity.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms? Email{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call{" "}
            {SITE.phone}.
          </p>

          <p className="text-sm text-gray-mid">
            {SITE.nmls} | {SITE.company} | Equal Housing Lender | Licensed in
            Nevada
          </p>
        </div>
      </div>
    </>
  );
}
