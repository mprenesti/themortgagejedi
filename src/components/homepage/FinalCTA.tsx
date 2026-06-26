import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import StarField from "@/components/ui/StarField";
import {
  SITE,
  PHONE_DISPLAY,
  PHONE_HREF,
  EMAIL_HREF,
} from "@/lib/constants";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-black py-20 sm:py-24">
      <StarField />
      <div className="container-page relative z-10 text-center">
        <h2 className="heading-lg text-white">Ready to Find the Right Loan?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-light">
          Take 2 minutes to get started. No pressure, no obligation — just
          honest guidance.
        </p>
        <div className="mt-8 flex justify-center">
          <Link href="/get-started" className="btn-gold text-lg">
            Get Started — It&apos;s Free
          </Link>
        </div>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 text-gray-light hover:text-gold"
          >
            <Phone className="h-5 w-5 text-gold" />
            {PHONE_DISPLAY}
          </a>
          <a
            href={EMAIL_HREF}
            className="inline-flex items-center gap-2 text-gray-light hover:text-gold"
          >
            <Mail className="h-5 w-5 text-gold" />
            {SITE.email}
          </a>
        </div>
      </div>
    </section>
  );
}
