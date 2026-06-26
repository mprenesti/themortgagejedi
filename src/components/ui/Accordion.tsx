"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FAQ } from "@/lib/data";

export default function Accordion({ items }: { items: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10 bg-charcoal">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-white/5 sm:px-6"
            >
              <span className="font-heading text-lg font-semibold text-white">
                {item.q}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 flex-shrink-0 text-gold transition-transform duration-300",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-300 ease-in-out",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-gray-light sm:px-6">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
