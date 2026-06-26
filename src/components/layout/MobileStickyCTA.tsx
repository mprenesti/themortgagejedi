import Link from "next/link";
import { Phone } from "lucide-react";
import { PHONE_HREF } from "@/lib/constants";

export default function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-black/20 lg:hidden">
      <a
        href={PHONE_HREF}
        className="flex items-center justify-center gap-2 bg-gold-dark py-3.5 font-heading text-sm font-bold uppercase tracking-wide text-black"
      >
        <Phone className="h-4 w-4" />
        Call Mike
      </a>
      <Link
        href="/get-started"
        className="flex items-center justify-center bg-gold py-3.5 font-heading text-sm font-bold uppercase tracking-wide text-black"
      >
        Get Started
      </Link>
    </div>
  );
}
