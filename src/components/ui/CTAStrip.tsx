import Link from "next/link";
import { ArrowRight } from "lucide-react";

type CTAStripProps = {
  title: string;
  subtitle?: string;
  buttonLabel: string;
  href: string;
  external?: boolean;
};

export default function CTAStrip({
  title,
  subtitle,
  buttonLabel,
  href,
  external,
}: CTAStripProps) {
  const inner = (
    <span className="btn-gold whitespace-nowrap">
      {buttonLabel}
      <ArrowRight className="h-4 w-4" />
    </span>
  );
  return (
    <section className="bg-charcoal">
      <div className="container-page flex flex-col items-center gap-5 py-12 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
            {title}
          </h2>
          {subtitle ? <p className="mt-2 text-gray-light">{subtitle}</p> : null}
        </div>
        {external ? (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {inner}
          </a>
        ) : (
          <Link href={href}>{inner}</Link>
        )}
      </div>
    </section>
  );
}
