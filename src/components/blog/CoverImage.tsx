"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";

export default function CoverImage({
  src,
  alt,
  className = "",
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  const [errored, setErrored] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // The <img> is server-rendered (good for SEO/LCP on the many posts that do
  // have a valid cover image). But if the file is missing, the load error can
  // fire before React hydrates and attaches onError, leaving a broken-image
  // icon. On mount, detect an already-failed image and show the fallback.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setErrored(true);
    }
  }, [src]);

  if (!src || errored) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-charcoal via-black to-charcoal ${className}`}
      >
        <Sparkles className="h-10 w-10 text-gold/40" />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={`object-cover ${className}`}
      onError={() => setErrored(true)}
    />
  );
}
