"use client";

import { useEffect, useState } from "react";

/**
 * Compliance logos for the (dark) footer. Logos are white-on-transparent and
 * render directly on the dark background. Each image is preloaded and only
 * shown once it loads, otherwise a text badge is displayed (so there are no
 * broken-image icons before a file is uploaded).
 *
 * Expected files in /public/images:
 *   - nexa-logo.png                 (white "empowered by NEXA Lending")
 *   - equal-housing-lender.png      (white)
 *   - equal-housing-opportunity.png (white) — pending a usable transparent file
 */
function Logo({
  src,
  alt,
  fallback,
}: {
  src: string;
  alt: string;
  fallback: string;
}) {
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
      <span className="inline-flex items-center rounded border border-white/20 px-3 py-2 text-xs text-gray-light">
        {fallback}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className="h-12 w-auto object-contain opacity-90" />
  );
}

export default function ComplianceLogos() {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-5">
      <Logo
        src="/images/nexa-logo.png"
        alt="Empowered by NEXA Lending"
        fallback="NEXA Mortgage, LLC"
      />
      <Logo
        src="/images/equal-housing-lender.png"
        alt="Equal Housing Lender"
        fallback="Equal Housing Lender"
      />
      <Logo
        src="/images/equal-housing-opportunity.png"
        alt="Equal Housing Opportunity"
        fallback="Equal Housing Opportunity"
      />
    </div>
  );
}
