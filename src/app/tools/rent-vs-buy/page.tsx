import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import RentVsBuyCalculator from "@/components/tools/RentVsBuyCalculator";

export const metadata: Metadata = {
  title: "Rent vs Buy Calculator",
  description:
    "Compare the long-term cost of renting versus buying a home in Las Vegas, including equity, appreciation, and your break-even point.",
};

export default function RentVsBuyPage() {
  return (
    <>
      <PageHero
        label="Tools"
        title="Rent vs Buy Calculator"
        subtitle="Compare the true long-term cost of renting versus buying — including equity, appreciation, and your break-even point."
      />
      <div className="container-page py-16 sm:py-20">
        <RentVsBuyCalculator />
        <p className="mt-8 text-sm text-gray-mid">
          This is a simplified projection for educational purposes. Real
          outcomes depend on taxes, maintenance, closing costs, market
          conditions, and your specific loan terms.
        </p>
        <div className="mt-6">
          <Link href="/get-started" className="btn-gold">
            Talk to Mike About Your Situation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
