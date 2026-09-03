import type { Metadata } from "next";
import { ArrowRight, FileText, UserCheck, MessagesSquare, CheckSquare } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Apply for Your Loan",
  description:
    "Start your secure mortgage application with Mike Prenesti, The Mortgage Jedi. Quick, guided, and pressure free — apply online in minutes.",
};

const APPLY_URL =
  "https://1660690.my1003app.com/1033445/register?time=1788461595787";

const steps = [
  {
    Icon: FileText,
    title: "Complete Application",
    body: "Fill out the secure online application at your own pace. It takes about 10-15 minutes and everything is encrypted.",
  },
  {
    Icon: UserCheck,
    title: "Mike Reviews It",
    body: "I personally review your application and pull together the loan options that actually fit your goals — not just the biggest approval.",
  },
  {
    Icon: MessagesSquare,
    title: "We Talk Next Steps",
    body: "We hop on a call to walk through your options, answer every question, and map out a clear plan to closing.",
  },
];

const w2Docs = [
  "Last 2 years W-2s",
  "Last 2 years tax returns (federal)",
  "Last 30 days pay stubs",
  "Last 2 months bank statements",
  "Government issued ID",
  "Social Security number",
];

const selfEmployedDocs = [
  "Last 2 years tax returns (personal + business)",
  "Year-to-date P&L statement",
  "Business license",
  "12 to 24 months bank statements",
  "CPA letter (if applicable)",
];

export default function ApplyPage() {
  return (
    <>
      <PageHero
        label="Apply Now"
        title="Apply for Your Loan"
        subtitle="Ready to move forward? Start your secure application online. It's quick, guided, and there's no pressure — I'll be with you every step of the way."
      >
        <a
          href={APPLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold text-lg"
        >
          Start My Application
          <ArrowRight className="h-5 w-5" />
        </a>
      </PageHero>

      {/* What to Expect */}
      <section className="bg-black py-20 sm:py-24">
        <div className="container-page">
          <Reveal>
            <h2 className="heading-lg text-center text-white">
              What to Expect
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-gray-light">
              Three simple steps from application to a clear plan.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map(({ Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 0.1}>
                <div className="card-dark h-full">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold font-heading text-lg font-bold text-black">
                      {i + 1}
                    </span>
                    <Icon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="mt-4 font-heading text-xl font-semibold text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-gray-light">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Need */}
      <section className="bg-charcoal py-20 sm:py-24">
        <div className="container-page">
          <Reveal>
            <h2 className="heading-lg text-center text-white">
              What You&apos;ll Need
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-gray-light">
              Having these ready makes the process faster. Don&apos;t have
              everything? No problem — apply anyway and we&apos;ll sort it out.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="rounded-2xl border border-white/10 bg-black p-7">
                <h3 className="font-heading text-2xl font-bold text-gold">
                  W-2 Employees
                </h3>
                <ul className="mt-5 space-y-3">
                  {w2Docs.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckSquare className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
                      <span className="text-gray-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-white/10 bg-black p-7">
                <h3 className="font-heading text-2xl font-bold text-gold">
                  Self-Employed
                </h3>
                <ul className="mt-5 space-y-3">
                  {selfEmployedDocs.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckSquare className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
                      <span className="text-gray-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-black py-20 sm:py-24">
        <div className="container-page text-center">
          <Reveal>
            <h2 className="heading-lg text-white">Ready When You Are</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-light">
              Start your application now, or book a quick call first if
              you&apos;d like to talk it through before you apply.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                Start My Application
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={SITE.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Book a Call First
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
