import type { ReactNode } from "react";
import StarField from "./StarField";

type PageHeroProps = {
  label?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
};

export default function PageHero({
  label,
  title,
  subtitle,
  children,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-black py-16 sm:py-20">
      <StarField />
      <div className="container-page relative z-10 max-w-4xl">
        {label ? <p className="section-label mb-4">{label}</p> : null}
        <h1 className="heading-lg text-white">{title}</h1>
        {subtitle ? (
          <p className="mt-5 max-w-2xl text-lg text-gray-light">{subtitle}</p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
