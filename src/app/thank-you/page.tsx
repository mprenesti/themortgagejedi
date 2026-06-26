import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Download } from "lucide-react";
import StarField from "@/components/ui/StarField";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Thanks for reaching out to The Mortgage Jedi.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage({
  searchParams,
}: {
  searchParams: { guide?: string };
}) {
  const isGuide = searchParams?.guide === "true";

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-black py-20">
      <StarField />
      <div className="container-page relative z-10 mx-auto max-w-2xl text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-gold" />
        <h1 className="heading-lg mt-6 text-white">
          {isGuide ? "Your Guide Is Ready!" : "Thank You!"}
        </h1>

        {isGuide ? (
          <>
            <p className="mt-4 text-lg text-gray-light">
              Thanks for grabbing the First-Time Homebuyer Guide. Click below to
              download it now — I&apos;ve also sent a copy to your inbox.
            </p>
            <a
              href="/downloads/first-time-buyer-guide.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="btn-gold mt-8 inline-flex"
            >
              <Download className="h-5 w-5" />
              Download Your Free Guide
            </a>
          </>
        ) : (
          <p className="mt-4 text-lg text-gray-light">
            Mike will reach out within one business day. Talk soon!
          </p>
        )}

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={SITE.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            Book a Time Now
          </a>
          <Link href="/" className="btn-outline">
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
