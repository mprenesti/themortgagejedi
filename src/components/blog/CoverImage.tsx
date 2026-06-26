"use client";

import { useState } from "react";
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
      src={src}
      alt={alt}
      className={`object-cover ${className}`}
      onError={() => setErrored(true)}
    />
  );
}
