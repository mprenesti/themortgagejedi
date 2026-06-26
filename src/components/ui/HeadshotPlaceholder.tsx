/**
 * Headshot for Mike. Drop a real photo at /public/images/mike-headshot.jpg and
 * it will be displayed automatically; otherwise a styled placeholder is shown.
 *
 * Using a plain <img> with onError keeps the build resilient even when the
 * image file has not been added yet.
 */
"use client";

import { useState } from "react";

export default function HeadshotPlaceholder() {
  const [errored, setErrored] = useState(false);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-full border-4 border-gold/40 bg-gradient-to-b from-charcoal to-black shadow-[0_0_70px_rgba(255,232,26,0.25)]">
      <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-gold/30" />
      {!errored ? (
        // Circular portrait. Replace /public/images/mike-headshot.jpg to swap
        // the photo.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/mike-headshot.jpg"
          alt="Mike Prenesti, The Mortgage Jedi"
          className="h-full w-full rounded-full object-cover"
          onError={() => setErrored(true)}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-8 text-center">
          <span className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-gold/50 bg-gold/10 font-accent text-5xl text-gold">
            MP
          </span>
          <p className="font-heading text-xl font-semibold uppercase tracking-wide text-white">
            Mike Prenesti
          </p>
          <p className="font-body text-sm uppercase tracking-[0.2em] text-gray-mid">
            The Mortgage Jedi
          </p>
        </div>
      )}
    </div>
  );
}
