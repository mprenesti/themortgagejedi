import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import CTAStrip from "@/components/ui/CTAStrip";
import { LOCATIONS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Locations We Serve in Nevada",
  description:
    "Local mortgage guidance for buyers across Nevada. Explore home prices, loan programs, and rates for the cities we serve.",
};

export default function LocationsIndexPage() {
  return (
    <>
      <PageHero
        label="Locations"
        title="Local Mortgage Guidance Across Nevada"
        subtitle="Pick your city for current home prices, loan limits, rates, and the loan programs that fit your local market."
      />

      <div className="container-page max-w-3xl space-y-10 py-16 sm:py-20">
        <ul className="grid gap-4 sm:grid-cols-2">
          {LOCATIONS.map((location) => (
            <li key={location.href}>
              <Link
                href={location.href}
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-charcoal p-6 transition-colors hover:border-gold/40"
              >
                <span className="flex items-center justify-between font-heading text-xl font-bold text-white">
                  {location.label}
                  <ArrowRight className="h-5 w-5 text-gold transition-transform group-hover:translate-x-1" />
                </span>
                <span className="mt-2 text-gray-light">
                  {location.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="text-sm text-gray-mid">
          Don&apos;t see your city yet? I&apos;m licensed throughout Nevada.{" "}
          <Link href="/contact" className="underline hover:text-gold">
            Reach out
          </Link>{" "}
          and we&apos;ll talk through your local market.
        </p>
      </div>

      <CTAStrip
        title="Ready to run your numbers?"
        subtitle="Get a straight answer on rates, programs, and payments for your situation."
        buttonLabel="Book a Call"
        href="/get-started"
      />
    </>
  );
}
