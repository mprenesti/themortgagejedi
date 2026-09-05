import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, ListChecks, CalendarCheck } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import GuideCard from "@/components/guides/GuideCard";
import JsonLd from "@/components/JsonLd";
import { getGuide, getGuideSlugs, getRelatedGuides } from "@/lib/guides";
import { SITE } from "@/lib/constants";

const APPLY_URL =
  "https://1660690.my1003app.com/1033445/register?time=1788461595787";

export function generateStaticParams() {
  return getGuideSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const guide = getGuide(params.slug);
  if (!guide) return { title: "Guide Not Found" };
  return {
    title: guide.title,
    description: guide.description,
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: "article",
    },
  };
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = getGuide(params.slug);
  if (!guide) notFound();

  const related = getRelatedGuides(params.slug, 3);

  const guideSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: guide.title,
    provider: {
      "@type": "FinancialService",
      name: "The Mortgage Jedi",
      telephone: "+1-702-497-0584",
    },
    areaServed: "Las Vegas, NV",
  };

  return (
    <>
      <JsonLd data={guideSchema} />
      <PageHero label={guide.tag} title={guide.title} subtitle={guide.intro} />

      <div className="container-page py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Main content */}
          <article className="min-w-0">
            <Link
              href="/guides"
              className="inline-flex items-center gap-1 text-sm text-gray-mid hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4" /> All Guides
            </Link>

            {/* Table of contents (mobile shows here too) */}
            <nav className="mt-6 rounded-xl border border-white/10 bg-charcoal p-5 lg:hidden">
              <p className="flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-wide text-gold">
                <ListChecks className="h-4 w-4" /> In this guide
              </p>
              <ul className="mt-3 space-y-2">
                {guide.sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-sm text-gray-light hover:text-gold"
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-8 space-y-10">
              {guide.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28"
                >
                  <h2 className="font-heading text-2xl font-bold text-gold sm:text-3xl">
                    {section.heading}
                  </h2>
                  {section.body?.map((p, i) => (
                    <p key={i} className="mt-4 text-lg text-gray-light">
                      {p}
                    </p>
                  ))}
                  {section.bullets ? (
                    <ul className="mt-4 space-y-2">
                      {section.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-3 text-gray-light"
                        >
                          <span className="mt-1 text-gold">›</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 rounded-2xl border border-gold/30 bg-charcoal p-7 text-center sm:p-9">
              <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
                Ready to talk about your situation?
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-gray-light">
                No pressure, no obligation. Book a quick call or start your
                application whenever you are ready.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={SITE.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                >
                  Book a Call
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={APPLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </article>

          {/* Sidebar (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              <nav className="rounded-xl border border-white/10 bg-charcoal p-5">
                <p className="flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-wide text-gold">
                  <ListChecks className="h-4 w-4" /> In this guide
                </p>
                <ul className="mt-3 space-y-2">
                  {guide.sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="text-sm text-gray-light hover:text-gold"
                      >
                        {s.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="rounded-xl border border-gold/30 bg-gradient-to-b from-charcoal to-black p-5">
                <CalendarCheck className="h-7 w-7 text-gold" />
                <h3 className="mt-3 font-heading text-lg font-semibold text-white">
                  Have a question?
                </h3>
                <p className="mt-1 text-sm text-gray-light">
                  Let&apos;s talk it through. It&apos;s free and there&apos;s no
                  pressure.
                </p>
                <a
                  href={SITE.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold mt-4 w-full"
                >
                  Book a Free Consultation
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* Related guides */}
        {related.length > 0 ? (
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-bold text-white">
              Related Guides
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((g) => (
                <GuideCard key={g.slug} guide={g} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
