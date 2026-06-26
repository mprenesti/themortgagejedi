import Link from "next/link";
import { SITE, PHONE_DISPLAY, PHONE_HREF, EMAIL_HREF } from "@/lib/constants";
import NewsletterForm from "@/components/forms/NewsletterForm";
import EqualHousingLogo from "./EqualHousingLogo";
import {
  InstagramIcon,
  TikTokIcon,
  YouTubeIcon,
  FacebookIcon,
  LinkedInIcon,
} from "@/components/ui/SocialIcons";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Loan Options", href: "/loan-options" },
  { label: "Calculator", href: "/tools/calculator" },
  { label: "Blog", href: "/resources/blog" },
  { label: "Get Started", href: "/get-started" },
];

const resourceLinks = [
  { label: "FAQ", href: "/resources/faq" },
  { label: "First-Time Buyer Guide", href: "/resources/first-time-buyer-guide" },
  { label: "Realtor Partners", href: "/realtor-partners" },
  { label: "Contact", href: "/contact" },
  { label: "Testimonials", href: "/testimonials" },
];

const socials = [
  { label: "Instagram", href: SITE.social.instagram, Icon: InstagramIcon },
  { label: "TikTok", href: SITE.social.tiktok, Icon: TikTokIcon },
  { label: "YouTube", href: SITE.social.youtube, Icon: YouTubeIcon },
  { label: "Facebook", href: SITE.social.facebook, Icon: FacebookIcon },
  { label: "LinkedIn", href: SITE.social.linkedin, Icon: LinkedInIcon },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black pb-24 lg:pb-0">
      {/* Newsletter bar */}
      <div className="border-b border-white/10 bg-charcoal">
        <div className="container-page flex flex-col items-start justify-between gap-5 py-8 md:flex-row md:items-center">
          <div>
            <h3 className="font-heading text-xl font-semibold text-white">
              Stay in the loop on Las Vegas mortgage rates and homebuying tips.
            </h3>
          </div>
          <NewsletterForm />
        </div>
      </div>

      <div className="container-page grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-full.png"
            alt="The Mortgage Jedi — Mike Prenesti"
            className="h-14 w-auto"
          />
          <p className="mt-4 text-sm text-gray-light">{SITE.tagline}</p>
          <p className="mt-4 text-xs text-gray-mid">
            {SITE.nmls} | {SITE.company}
          </p>
          <EqualHousingLogo />
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Quick Links
          </h4>
          <ul className="mt-4 space-y-2">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-gray-light transition-colors hover:text-gold"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Resources
          </h4>
          <ul className="mt-4 space-y-2">
            {resourceLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-gray-light transition-colors hover:text-gold"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Connect
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={PHONE_HREF} className="text-gray-light hover:text-gold">
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a href={EMAIL_HREF} className="text-gray-light hover:text-gold">
                {SITE.email}
              </a>
            </li>
          </ul>
          <div className="mt-4 flex gap-3">
            {socials.map(({ label, href, Icon }) => (
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
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-center text-xs text-gray-mid md:flex-row md:text-left">
          <p>
            © {new Date().getFullYear()} Mike Prenesti | The Mortgage Jedi |{" "}
            {SITE.nmls} | {SITE.company} | Equal Housing Lender
          </p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-gold">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold">
              Terms of Use
            </Link>
            <a
              href={SITE.nmlsConsumerAccess}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold"
            >
              NMLS Consumer Access
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
