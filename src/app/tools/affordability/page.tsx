import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import AffordabilityCalculator from "@/components/tools/AffordabilityCalculator";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Affordability Calculator",
  description:
    "Find out how much home you can comfortably afford based on your income, debts, and down payment with The Mortgage Jedi's affordability calculator.",
};

export default function AffordabilityPage() {
  return (
    <>
      <PageHero
        label="Tools"
        title="Affordability Calculator"
        subtitle="See how much home you can comfortably afford based on your income, debts, and down payment."
      />
      <div className="container-page py-16 sm:py-20">
        <AffordabilityCalculator />
        <p className="mt-8 text-sm text-gray-mid">
          These are estimates based on standard DTI guidelines. Your actual
          buying power depends on credit, loan program, and current rates.
        </p>
        <div className="mt-6">
          <a
            href={SITE.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            Book a Consultation to Get Real Numbers
          </a>
        </div>
      </div>
    </>
  );
}
