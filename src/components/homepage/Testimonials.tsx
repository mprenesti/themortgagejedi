import Link from "next/link";
import { TESTIMONIALS } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import TestimonialCard from "@/components/ui/TestimonialCard";

export default function Testimonials() {
  return (
    <section className="bg-charcoal py-20 sm:py-24">
      <div className="container-page">
        <Reveal>
          <h2 className="heading-lg text-center text-white">
            What Clients Are Saying
          </h2>
          <p className="mt-4 text-center text-lg text-gray-light">
            Real stories from real people I&apos;ve had the privilege of
            helping.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.slice(0, 3).map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <TestimonialCard testimonial={t} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/testimonials" className="btn-outline">
            Read More Testimonials
          </Link>
        </div>
      </div>
    </section>
  );
}
