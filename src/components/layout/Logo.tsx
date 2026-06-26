"use client";

import Link from "next/link";
import { useState } from "react";

export default function Logo({ onClick }: { onClick?: () => void }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href="/"
      onClick={onClick}
      className="group flex items-center gap-3"
      aria-label="The Mortgage Jedi — Home"
    >
      {!imgError ? (
        // Transparent white mark (star background removed). Falls back to a
        // text logo if the file is missing.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/logo.png"
          alt="The Mortgage Jedi logo"
          width={44}
          height={44}
          className="h-11 w-11 object-contain"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="flex h-10 w-10 items-center justify-center rounded-md border border-gold/60 bg-gold/10 font-accent text-2xl leading-none text-gold transition-colors group-hover:bg-gold/20">
          MJ
        </span>
      )}
      <span className="flex flex-col leading-none">
        <span className="font-heading text-lg font-bold uppercase tracking-wide text-white">
          The Mortgage <span className="text-gold">Jedi</span>
        </span>
        <span className="font-body text-[10px] uppercase tracking-[0.2em] text-gray-mid">
          Mike Prenesti
        </span>
      </span>
    </Link>
  );
}
