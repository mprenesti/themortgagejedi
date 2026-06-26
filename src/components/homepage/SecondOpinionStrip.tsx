import Link from "next/link";
import { ArrowRight, FileSearch } from "lucide-react";

export default function SecondOpinionStrip() {
  return (
    <section className="bg-gold">
      <div className="container-page flex flex-col items-center gap-5 py-10 text-center md:flex-row md:text-left">
        <FileSearch className="h-10 w-10 flex-shrink-0 text-black" />
        <div className="flex-1">
          <h2 className="font-heading text-2xl font-bold text-black">
            Already shopping? Get a Free Second Opinion on your Loan Estimate.
          </h2>
          <p className="mt-1 text-black/80">
            Upload the Loan Estimate you received from another lender, and
            I&apos;ll personally review your rate, fees, and loan terms — for
            free.
          </p>
        </div>
        <Link
          href="/second-opinion"
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-black px-6 py-3 font-heading text-base font-semibold uppercase tracking-wide text-gold transition-colors hover:bg-charcoal"
        >
          Upload My Loan Estimate
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
