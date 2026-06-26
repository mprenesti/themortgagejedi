"use client";

import { useState } from "react";

/**
 * Equal Housing Lender logo for the (dark) footer.
 *
 * The official mark is black artwork. It is shown on a small white chip so it
 * renders correctly whether the source PNG has a transparent or white
 * background. Drop the file at /public/images/equal-housing-lender.png.
 * Falls back to a text badge if the file is missing.
 */
export default function EqualHousingLogo() {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <span className="mt-4 inline-flex items-center gap-2 rounded border border-white/15 px-3 py-1.5 text-xs text-gray-light">
        <span className="font-bold text-gold">⌂</span> Equal Housing Lender
      </span>
    );
  }

  return (
    <span className="mt-4 inline-flex items-center rounded bg-white p-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/equal-housing-lender.png"
        alt="Equal Housing Lender"
        className="h-10 w-auto object-contain"
        onError={() => setErrored(true)}
      />
    </span>
  );
}
