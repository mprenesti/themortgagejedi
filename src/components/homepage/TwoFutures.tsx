import { X, Check, ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { SITE } from "@/lib/constants";

const without = [
  "Settle for the wrong loan and overpay",
  "Miss programs you actually qualify for",
  "Feel rushed and pressured into decisions",
  "Be treated as a file number, not a person",
  "Maximum approval. Minimum fit.",
];

const withMike = [
  "A tailored loan strategy that fits your life",
  "Payment comfort, not just max approval",
  "Feel confident and informed at every step",
  "A lifelong partner in your financial journey",
  "The right loan. For your actual life.",
];

export default function TwoFutures() {
  return (
    <section className="bg-charcoal py-20 sm:py-24">
      <div className="container-page">
        <Reveal>
          <h2 className="heading-lg text-center text-white">
            Two Paths. One Clear Choice.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-gray-light">
            The mortgage you choose today impacts your finances for decades.
            Make sure you have the right guide.
          </p>
        </Reveal>

        <div className="relative mt-14 grid items-stretch gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-xl border border-red-500/20 bg-black p-7">
              <h3 className="font-heading text-xl font-semibold text-gray-light">
                Without the Right Guidance
              </h3>
              <ul className="mt-5 space-y-3">
                {without.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-mid">
                    <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500/70" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-xl border border-gold/40 bg-black p-7 shadow-[0_0_40px_rgba(255,232,26,0.1)]">
              <h3 className="font-heading text-xl font-semibold text-gold">
                With Mike on Your Team
              </h3>
              <ul className="mt-5 space-y-3">
                {withMike.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-gray-light"
                  >
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <span className="inline-flex items-center gap-1 rounded-full bg-gold px-4 py-2 font-heading text-sm font-bold uppercase tracking-wide text-black shadow-lg">
              Better Path <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href={SITE.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            Let&apos;s Talk About Your Goals
          </a>
        </div>
      </div>
    </section>
  );
}
