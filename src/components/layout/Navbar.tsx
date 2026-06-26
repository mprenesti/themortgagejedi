"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";

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
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/80"
          : "bg-black",
      )}
    >
      <nav className="container-page flex h-20 items-center justify-between">
        <Logo />

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div key={link.label} className="group relative">
                <button className="flex items-center gap-1 px-3 py-2 font-heading text-sm font-medium uppercase tracking-wide text-white transition-colors hover:text-gold">
                  {link.label}
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>
                <div className="invisible absolute left-0 top-full w-60 translate-y-2 rounded-lg border border-white/10 bg-charcoal p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
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
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 font-heading text-sm font-medium uppercase tracking-wide text-white transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            ),
          )}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/get-started" className="btn-gold hidden sm:inline-flex">
            Get Started
          </Link>
          <MobileMenu />
        </div>
      </nav>
      <span className="sr-only">{SITE.fullName}</span>
    </header>
  );
}
