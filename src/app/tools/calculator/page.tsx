import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import MortgageCalculator from "@/components/tools/MortgageCalculator";

export const metadata: Metadata = {
  title: "Mortgage Calculator",
  description:
    "Estimate your monthly mortgage payment including principal, interest, taxes, and insurance with The Mortgage Jedi's free calculator.",
};

export default function CalculatorPage() {
  return (
    <>
      <PageHero
        label="Tools"
        title="Mortgage Calculator"
        subtitle="Estimate your monthly payment, including principal, interest, taxes, and insurance."
      />
      <div className="container-page py-16 sm:py-20">
        <MortgageCalculator />

        <p className="mt-8 text-sm text-gray-mid">
          This is an estimate. Actual payments may vary based on your specific
          loan terms, PMI, HOA, and other factors.
        </p>
        <div className="mt-6">
          <Link href="/get-started" className="btn-gold">
            Get Real Numbers Based on Today&apos;s Rates
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
