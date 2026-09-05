import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import GuideCard from "@/components/guides/GuideCard";
import JsonLd from "@/components/JsonLd";
import { getAllGuides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Mortgage Guides & Scenarios",
  description:
    "Real strategies, real numbers, and real programs from The Mortgage Jedi. Step-by-step guides for first-time buyers, self-employed borrowers, veterans, investors, and more.",
};

export default function GuidesPage() {
  const guides = getAllGuides();

  const guidesSchema = guides.map((guide) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: guide.title,
    provider: {
      "@type": "FinancialService",
      name: "The Mortgage Jedi",
      telephone: "+1-702-497-0584",
    },
    areaServed: "Las Vegas, NV",
  }));

  return (
    <>
      <JsonLd data={guidesSchema} />
      <PageHero
        label="Learn Before You Borrow"
        title="Mortgage Guides & Scenarios"
        subtitle="Real strategies, real numbers, and real programs — not generic advice. Each guide walks you through a specific scenario so you know exactly what to expect."
      />

      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide, i) => (
            <Reveal key={guide.slug} delay={(i % 3) * 0.08}>
              <GuideCard guide={guide} />
            </Reveal>
          ))}
        </div>
      </div>

      <section className="bg-charcoal">
        <div className="container-page flex flex-col items-center gap-5 py-14 text-center">
          <h2 className="heading-lg text-white">Not Sure Where to Start?</h2>
          <p className="max-w-2xl text-lg text-gray-light">
            Take 2 minutes to get started and I&apos;ll personally review your
            situation. No pressure, no obligation.
          </p>
          <Link href="/get-started" className="btn-gold">
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
