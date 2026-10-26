import { SITE, PHONE_HREF, EMAIL_HREF } from "@/lib/constants";

export default function LocationContact() {
  return (
    <div className="rounded-2xl border border-gold/30 bg-charcoal p-6">
      <p className="font-heading text-lg font-bold text-white">
        Contact The Mortgage Jedi
      </p>
      <p className="mt-2 text-gray-light">
        Mike Prenesti, {SITE.nmls}
        <br />
        {SITE.company}, {SITE.corporateNmls}
        <br />
        <a href={PHONE_HREF} className="hover:text-gold">
          {SITE.phone}
        </a>{" "}
        |{" "}
        <a href={EMAIL_HREF} className="hover:text-gold">
          {SITE.email}
        </a>
      </p>
    </div>
  );
}
