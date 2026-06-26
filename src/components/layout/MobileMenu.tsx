"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white hover:text-gold"
      >
        <Menu className="h-7 w-7" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-black">
          <div className="container-page flex h-20 items-center justify-between border-b border-white/10">
            <span className="font-heading text-lg font-bold uppercase text-white">
              The Mortgage <span className="text-gold">Jedi</span>
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white hover:text-gold"
            >
              <X className="h-7 w-7" />
            </button>
          </div>

          <div className="hide-scrollbar flex-1 overflow-y-auto px-5 py-6">
            <ul className="space-y-1">
              {NAV_LINKS.map((link) =>
                link.children ? (
                  <li key={link.label}>
                    <button
                      onClick={() =>
                        setExpanded(expanded === link.label ? null : link.label)
                      }
                      className="flex w-full items-center justify-between py-3 font-heading text-xl font-semibold uppercase text-white"
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 text-gold transition-transform",
                          expanded === link.label && "rotate-180",
                        )}
                      />
                    </button>
                    {expanded === link.label && (
                      <ul className="ml-3 space-y-1 border-l border-white/10 pl-4">
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={() => setOpen(false)}
                              className="block py-2 text-gray-light hover:text-gold"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ) : (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block py-3 font-heading text-xl font-semibold uppercase text-white hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>

            <div className="mt-8 space-y-3">
              <Link
                href="/get-started"
                onClick={() => setOpen(false)}
                className="btn-gold w-full"
              >
                Get Started
              </Link>
              <a href={PHONE_HREF} className="btn-outline w-full">
                Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
