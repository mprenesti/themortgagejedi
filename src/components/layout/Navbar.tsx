"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { PRIMARY_NAV_LINKS, SECONDARY_NAV_LINKS } from "@/lib/data";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";

const navLinkClass =
  "shrink-0 whitespace-nowrap px-1 py-1 font-heading text-xs font-medium uppercase tracking-normal text-white transition-colors hover:text-gold xl:px-2 xl:text-sm xl:tracking-wide";

function DesktopNavItem({
  link,
}: {
  link: (typeof PRIMARY_NAV_LINKS)[number];
}) {
  if (link.children) {
    return (
      <div className="group relative shrink-0">
        <button className={`flex items-center gap-0.5 ${navLinkClass} xl:gap-1`}>
          {link.label}
          <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
        </button>
        <div
          className={cn(
            "invisible absolute top-full z-[60] w-60 translate-y-2 rounded-lg border border-white/10 bg-charcoal p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100",
            link.label === "Tools" ? "right-0" : "left-0",
          )}
        >
          {link.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block rounded-md px-3 py-2 text-sm text-gray-light transition-colors hover:bg-white/5 hover:text-gold"
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Link href={link.href} className={navLinkClass}>
      {link.label}
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 overflow-visible transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/80"
          : "bg-black",
      )}
    >
      <nav
        className={cn(
          "container-page items-center overflow-visible px-4 py-3 transition-all duration-300 md:px-4 lg:px-8",
          "flex justify-between",
          "md:grid md:grid-cols-[1fr_auto_1fr] md:gap-x-2 lg:gap-x-4",
          scrolled
            ? "min-h-[7rem] sm:min-h-[9rem]"
            : "min-h-[9rem] sm:min-h-[10.5rem]",
        )}
      >
        <div className="justify-self-start">
          <Logo compact={scrolled} />
        </div>

        {/* Desktop tabs: true page center. Side 1fr columns keep logo/buttons at the edges. */}
        <div className="hidden w-max grid-cols-[repeat(6,max-content)] items-center justify-items-start gap-x-0 gap-y-1 justify-self-center overflow-visible md:grid">
          {PRIMARY_NAV_LINKS.map((link) => (
            <DesktopNavItem key={link.label} link={link} />
          ))}
          {SECONDARY_NAV_LINKS.map((link) => (
            <DesktopNavItem key={link.label} link={link} />
          ))}
        </div>

        <div className="flex shrink-0 items-center justify-end gap-2 justify-self-end lg:gap-3">
          <a
            href={SITE.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline hidden lg:inline-flex lg:px-6 lg:py-3 lg:text-base"
          >
            Apply Now
          </a>
          <Link
            href="/get-started"
            className="btn-gold hidden md:inline-flex md:px-3 md:py-2 md:text-xs lg:px-5 lg:py-2.5 lg:text-sm xl:px-6 xl:py-3 xl:text-base"
          >
            Book a Call
          </Link>
          <a
            href={SITE.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline hidden sm:inline-flex md:hidden md:px-4 md:py-2 md:text-sm"
          >
            Apply Now
          </a>
          <Link
            href="/get-started"
            className="btn-gold hidden sm:inline-flex md:hidden md:px-3 md:py-2 md:text-xs"
          >
            Book a Call
          </Link>
          <MobileMenu />
        </div>
      </nav>
      <span className="sr-only">{SITE.fullName}</span>
    </header>
  );
}
