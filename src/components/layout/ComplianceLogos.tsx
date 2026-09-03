"use client";

import { useEffect, useState } from "react";

/**
 * Compliance logos for the footer. Each renders on a small white chip so black
 * artwork reads correctly on the dark footer, and falls back to a text badge if
 * the image file is missing.
 *
 * Expected files in /public/images:
 *   - nexa-logo.png                 (NEXA Mortgage)
 *   - equal-housing-lender.png      (already added)
 *   - equal-housing-opportunity.png (Equal Housing Opportunity)
 */
function ChipLogo({
  src,
  alt,
  fallback,
}: {
  src: string;
  alt: string;
  fallback: string;
}) {
  // Preload the image and only render it once it successfully loads. This
  // avoids a broken-image icon when the file hasn't been uploaded yet (the
  // text badge is shown instead), and works reliably with SSR.
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setLoaded(true);
    img.onerror = () => setLoaded(false);
    img.src = src;
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  if (!loaded) {
    return (
      <span className="inline-flex items-center rounded border border-white/15 px-3 py-2 text-xs text-gray-light">
        {fallback}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded bg-white p-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-10 w-auto object-contain" />
    </span>
  );
}

export default function ComplianceLogos() {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <ChipLogo
        src="/images/nexa-logo.png"
        alt="NEXA Mortgage, LLC"
        fallback="NEXA Mortgage, LLC"
      />
      <ChipLogo
        src="/images/equal-housing-lender.png"
        alt="Equal Housing Lender"
        fallback="Equal Housing Lender"
      />
      <ChipLogo
        src="/images/equal-housing-opportunity.png"
        alt="Equal Housing Opportunity"
        fallback="Equal Housing Opportunity"
      />
    </div>
  );
}
