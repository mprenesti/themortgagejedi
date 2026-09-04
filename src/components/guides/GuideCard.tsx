import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Guide } from "@/lib/guides";

export default function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-white/10 bg-charcoal p-6 transition-colors hover:border-gold/40"
    >
      <span className="inline-flex w-fit rounded-full bg-gold/15 px-3 py-1 font-heading text-xs font-semibold uppercase tracking-wide text-gold">
        {guide.tag}
      </span>
      <h3 className="mt-4 font-heading text-xl font-bold text-white group-hover:text-gold">
        {guide.title}
      </h3>
      <p className="mt-2 flex-1 text-gray-light">{guide.description}</p>
      <span className="mt-4 inline-flex items-center gap-1 font-heading text-sm font-semibold uppercase tracking-wide text-gold">
        Read Guide
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
