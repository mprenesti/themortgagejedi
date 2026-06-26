import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/forms/ContactForm";
import BookingEmbed from "@/components/ui/BookingEmbed";
import {
  SITE,
  PHONE_DISPLAY,
  PHONE_HREF,
  EMAIL_HREF,
} from "@/lib/constants";
import {
  InstagramIcon,
  TikTokIcon,
  YouTubeIcon,
  FacebookIcon,
  LinkedInIcon,
} from "@/components/ui/SocialIcons";

export const metadata: Metadata = {
  title: "Contact Mike Prenesti — The Mortgage Jedi",
  description:
    "Get in touch with Mike Prenesti, The Mortgage Jedi. Call (702) 497-0584, email mike@themortgagejedi.com, or book a free consultation online.",
};

const socials = [
  { label: "Instagram", href: SITE.social.instagram, Icon: InstagramIcon },
  { label: "TikTok", href: SITE.social.tiktok, Icon: TikTokIcon },
  { label: "YouTube", href: SITE.social.youtube, Icon: YouTubeIcon },
  { label: "Facebook", href: SITE.social.facebook, Icon: FacebookIcon },
  { label: "LinkedIn", href: SITE.social.linkedin, Icon: LinkedInIcon },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title="Let's Talk"
        subtitle="Have a question or ready to get started? Reach out directly or book a time that works for you."
      />

      <div className="container-page grid gap-12 py-16 sm:py-20 lg:grid-cols-2">
        <div>
          <h2 className="font-heading text-2xl font-bold text-white">
            Get in Touch
          </h2>
          <ul className="mt-6 space-y-4">
            <li>
              <a
                href={PHONE_HREF}
                className="flex items-center gap-3 text-gray-light hover:text-gold"
              >
                <Phone className="h-5 w-5 text-gold" />
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={EMAIL_HREF}
                className="flex items-center gap-3 text-gray-light hover:text-gold"
              >
                <Mail className="h-5 w-5 text-gold" />
                {SITE.email}
              </a>
            </li>
            <li className="flex items-center gap-3 text-gray-light">
              <MapPin className="h-5 w-5 text-gold" />
              Licensed in Nevada
            </li>
          </ul>
          <p className="mt-3 text-sm text-gray-mid">
            {SITE.nmls} | {SITE.company}
          </p>

          <div className="mt-8">
            <ContactForm />
          </div>

          <div className="mt-8">
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Follow Along
            </p>
            <div className="mt-3 flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-gray-light transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-heading text-2xl font-bold text-white">
            Book a Free Consultation
          </h2>
          <p className="mt-2 text-gray-light">
            Pick a time that works for you — no pressure, no obligation.
          </p>
          <div className="mt-6">
            <BookingEmbed />
          </div>
        </div>
      </div>
    </>
  );
}
