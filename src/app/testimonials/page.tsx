import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import TestimonialCard from "@/components/ui/TestimonialCard";
import CTAStrip from "@/components/ui/CTAStrip";
import { TESTIMONIALS } from "@/lib/data";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Testimonials — What Clients Are Saying",
  description:
    "Real stories from real Las Vegas homebuyers Mike Prenesti has helped over 16 years in the mortgage industry.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        label="Testimonials"
        title="What Clients Are Saying"
        subtitle="Real stories from real people I've had the privilege of helping over 16 years."
      />

      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 0.08}>
              <TestimonialCard testimonial={t} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={SITE.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            See All Reviews on Google <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      <CTAStrip
        title="Ready to Be the Next Success Story?"
        buttonLabel="Get Started"
        href="/get-started"
      />
    </>
  );
}
