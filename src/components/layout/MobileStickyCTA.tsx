import Link from "next/link";
import { SMS_HREF } from "@/lib/constants";

export default function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-black/20 lg:hidden">
      <a
        href={SMS_HREF}
        className="flex items-center justify-center whitespace-nowrap bg-gold-dark px-1 py-3.5 text-center font-heading text-xs font-bold uppercase tracking-tight text-black"
      >
        Text Mike
      </a>
      <Link
        href="/apply"
        className="flex items-center justify-center whitespace-nowrap border-x border-black/20 bg-gold px-1 py-3.5 text-center font-heading text-xs font-bold uppercase tracking-tight text-black"
      >
        Apply Now
      </Link>
      <Link
        href="/get-started"
        className="flex items-center justify-center whitespace-nowrap bg-gold-dark px-1 py-3.5 text-center font-heading text-xs font-bold uppercase tracking-tight text-black"
      >
        Book a Call
      </Link>
    </div>
  );
}
