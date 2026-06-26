import Link from "next/link";
import {
  Home,
  Building2,
  RefreshCw,
  Landmark,
  Briefcase,
  Sparkles,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { LOAN_SERVICES } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";

const ICONS: Record<string, LucideIcon> = {
  Home,
  Building2,
  RefreshCw,
  Landmark,
  Briefcase,
  Sparkles,
};

export default function Services() {
  return (
    <section className="bg-black py-20 sm:py-24">
      <div className="container-page">
        <Reveal>
          <h2 className="heading-lg text-center text-white">
            Loan Options for Every Situation
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-gray-light">
            With 16 years of experience and a full range of programs, I can find
            the right fit no matter where you are.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LOAN_SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon] ?? Home;
            return (
              <Reveal key={service.id} delay={i * 0.06}>
                <Link
                  href={`/loan-options#${service.id}`}
                  className="card-dark group flex h-full flex-col hover:border-gold/40"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-gold/40 bg-gold/10">
                    <Icon className="h-6 w-6 text-gold" />
                  </span>
                  <h3 className="mt-4 font-heading text-xl font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-1 flex-1 text-gray-light">{service.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-1 font-heading text-sm font-semibold uppercase tracking-wide text-gold">
                    Learn More
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link href="/loan-options" className="btn-gold">
            Explore All Loan Options
          </Link>
        </div>
      </div>
    </section>
  );
}
