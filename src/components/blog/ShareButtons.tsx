"use client";

import { Link2, Check } from "lucide-react";
import { useState } from "react";
import {
  FacebookIcon,
  LinkedInIcon,
  XIcon,
} from "@/components/ui/SocialIcons";

export default function ShareButtons({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;

  const links = [
    {
      label: "Share on Facebook",
      Icon: FacebookIcon,
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
    },
    {
      label: "Share on X",
      Icon: XIcon,
      href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`,
    },
    {
      label: "Share on LinkedIn",
      Icon: LinkedInIcon,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
    },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="flex items-center gap-3">
      <span className="font-heading text-sm font-semibold uppercase tracking-wide text-gray-mid">
        Share
      </span>
      {links.map(({ label, Icon, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-gray-light transition-colors hover:border-gold hover:text-gold"
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
      <button
        onClick={copy}
        aria-label="Copy link"
        className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-gray-light transition-colors hover:border-gold hover:text-gold"
      >
        {copied ? <Check className="h-4 w-4 text-gold" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  );
}
