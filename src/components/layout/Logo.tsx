"use client";

import Link from "next/link";
import { useState } from "react";

export default function Logo({ onClick }: { onClick?: () => void }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href="/"
      onClick={onClick}
      className="group flex items-center"
      aria-label="The Mortgage Jedi — Mike Prenesti — Home"
    >
      {!imgError ? (
        // Full brand lockup (symbol + "Mike Prenesti" + "The Mortgage Jedi"),
        // processed to transparent (star background removed). Falls back to a
        // text mark if the file is missing.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/logo-full.png"
          alt="The Mortgage Jedi — Mike Prenesti"
          className="h-11 w-auto sm:h-14"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-md border border-gold/60 bg-gold/10 font-accent text-2xl leading-none text-gold">
            MJ
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-heading text-lg font-bold uppercase tracking-wide text-white">
              The Mortgage <span className="text-gold">Jedi</span>
            </span>
            <span className="font-body text-[10px] uppercase tracking-[0.2em] text-gray-mid">
              Mike Prenesti
            </span>
          </span>
        </span>
      )}
    </Link>
  );
}
